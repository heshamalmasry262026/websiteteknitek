import { Router } from "express";
import { eq } from "drizzle-orm";
import { db } from "../db";
import { settings } from "../../drizzle/schema";
import { updateSettingsSchema } from "../../shared/validation";
import { requireAuth } from "../auth";

const router = Router();

async function getOrCreateSettings() {
  const [row] = await db.select().from(settings).where(eq(settings.id, 1));
  if (row) return row;
  const [created] = await db.insert(settings).values({ id: 1 }).returning();
  return created;
}

// Public: read current store settings (used by Header/Footer/WhatsApp button)
router.get("/", async (_req, res) => {
  const row = await getOrCreateSettings();
  res.json(row);
});

// Protected: update store settings from the admin dashboard
router.put("/", requireAuth, async (req, res) => {
  const parsed = updateSettingsSchema.partial().safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ message: "بيانات غير صحيحة", errors: parsed.error.flatten() });
  }
  await getOrCreateSettings();
  const [updated] = await db
    .update(settings)
    .set({ ...parsed.data, updatedAt: new Date() })
    .where(eq(settings.id, 1))
    .returning();
  res.json(updated);
});

export default router;
