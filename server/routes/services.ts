import { Router } from "express";
import { eq, desc } from "drizzle-orm";
import { db } from "../db";
import { services } from "../../drizzle/schema";
import { insertServiceSchema } from "../../shared/validation";
import { requireAuth } from "../auth";

const router = Router();

router.get("/", async (req, res) => {
  const { category } = req.query;
  const rows = await db.select().from(services).orderBy(desc(services.createdAt));
  const filtered = category ? rows.filter((s) => s.category === category) : rows;
  res.json(filtered);
});

router.get("/:id", async (req, res) => {
  const [row] = await db.select().from(services).where(eq(services.id, Number(req.params.id)));
  if (!row) return res.status(404).json({ message: "الخدمة غير موجودة" });
  res.json(row);
});

router.post("/", requireAuth, async (req, res) => {
  const parsed = insertServiceSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ message: "بيانات غير صحيحة", errors: parsed.error.flatten() });
  }
  const [created] = await db.insert(services).values(parsed.data).returning();
  res.status(201).json(created);
});

router.put("/:id", requireAuth, async (req, res) => {
  const parsed = insertServiceSchema.partial().safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ message: "بيانات غير صحيحة", errors: parsed.error.flatten() });
  }
  const [updated] = await db
    .update(services)
    .set({ ...parsed.data, updatedAt: new Date() })
    .where(eq(services.id, Number(req.params.id)))
    .returning();
  if (!updated) return res.status(404).json({ message: "الخدمة غير موجودة" });
  res.json(updated);
});

router.delete("/:id", requireAuth, async (req, res) => {
  const [deleted] = await db
    .delete(services)
    .where(eq(services.id, Number(req.params.id)))
    .returning();
  if (!deleted) return res.status(404).json({ message: "الخدمة غير موجودة" });
  res.json({ message: "تم حذف الخدمة" });
});

export default router;
