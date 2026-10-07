import { Router } from "express";
import { eq, desc } from "drizzle-orm";
import { db } from "../db";
import { products } from "../../drizzle/schema";
import { insertProductSchema } from "../../shared/validation";
import { requireAuth } from "../auth";

const router = Router();

// Public: list active products (optionally filter by category)
router.get("/", async (req, res) => {
  const { category } = req.query;
  const rows = await db.select().from(products).orderBy(desc(products.createdAt));
  const filtered = category ? rows.filter((p) => p.category === category) : rows;
  res.json(filtered);
});

router.get("/:id", async (req, res) => {
  const [row] = await db.select().from(products).where(eq(products.id, Number(req.params.id)));
  if (!row) return res.status(404).json({ message: "المنتج غير موجود" });
  res.json(row);
});

// Protected: admin CRUD
router.post("/", requireAuth, async (req, res) => {
  const parsed = insertProductSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ message: "بيانات غير صحيحة", errors: parsed.error.flatten() });
  }
  const [created] = await db.insert(products).values(parsed.data).returning();
  res.status(201).json(created);
});

router.put("/:id", requireAuth, async (req, res) => {
  const parsed = insertProductSchema.partial().safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ message: "بيانات غير صحيحة", errors: parsed.error.flatten() });
  }
  const [updated] = await db
    .update(products)
    .set({ ...parsed.data, updatedAt: new Date() })
    .where(eq(products.id, Number(req.params.id)))
    .returning();
  if (!updated) return res.status(404).json({ message: "المنتج غير موجود" });
  res.json(updated);
});

router.delete("/:id", requireAuth, async (req, res) => {
  const [deleted] = await db
    .delete(products)
    .where(eq(products.id, Number(req.params.id)))
    .returning();
  if (!deleted) return res.status(404).json({ message: "المنتج غير موجود" });
  res.json({ message: "تم حذف المنتج" });
});

export default router;
