import { Router } from "express";
import { eq, desc } from "drizzle-orm";
import { db } from "../db";
import { articles } from "../../drizzle/schema";
import { insertArticleSchema } from "../../shared/validation";
import { requireAuth } from "../auth";

const router = Router();

router.get("/", async (_req, res) => {
  const rows = await db.select().from(articles).orderBy(desc(articles.createdAt));
  res.json(rows);
});

router.get("/:id", async (req, res) => {
  const [row] = await db.select().from(articles).where(eq(articles.id, Number(req.params.id)));
  if (!row) return res.status(404).json({ message: "المقال غير موجود" });
  res.json(row);
});

router.post("/", requireAuth, async (req, res) => {
  const parsed = insertArticleSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ message: "بيانات غير صحيحة", errors: parsed.error.flatten() });
  }
  const [created] = await db.insert(articles).values(parsed.data).returning();
  res.status(201).json(created);
});

router.put("/:id", requireAuth, async (req, res) => {
  const parsed = insertArticleSchema.partial().safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ message: "بيانات غير صحيحة", errors: parsed.error.flatten() });
  }
  const [updated] = await db
    .update(articles)
    .set({ ...parsed.data, updatedAt: new Date() })
    .where(eq(articles.id, Number(req.params.id)))
    .returning();
  if (!updated) return res.status(404).json({ message: "المقال غير موجود" });
  res.json(updated);
});

router.delete("/:id", requireAuth, async (req, res) => {
  const [deleted] = await db
    .delete(articles)
    .where(eq(articles.id, Number(req.params.id)))
    .returning();
  if (!deleted) return res.status(404).json({ message: "المقال غير موجود" });
  res.json({ message: "تم حذف المقال" });
});

export default router;
