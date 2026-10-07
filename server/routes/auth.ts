import { Router } from "express";
import { eq } from "drizzle-orm";
import { db } from "../db";
import { users } from "../../drizzle/schema";
import { loginSchema } from "../../shared/validation";
import { verifyPassword, signToken, setAuthCookie, clearAuthCookie, requireAuth } from "../auth";

const router = Router();

router.post("/login", async (req, res) => {
  const parsed = loginSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ message: "بيانات الدخول غير صحيحة", errors: parsed.error.flatten() });
  }

  const { username, password } = parsed.data;
  const [user] = await db.select().from(users).where(eq(users.username, username)).limit(1);

  if (!user || !(await verifyPassword(password, user.passwordHash))) {
    return res.status(401).json({ message: "اسم المستخدم أو كلمة المرور غير صحيحة" });
  }

  const token = signToken({ userId: user.id, username: user.username, role: user.role });
  setAuthCookie(res, token);
  res.json({ id: user.id, username: user.username, role: user.role });
});

router.post("/logout", (_req, res) => {
  clearAuthCookie(res);
  res.json({ message: "تم تسجيل الخروج" });
});

router.get("/me", requireAuth, (req, res) => {
  res.json(req.user);
});

export default router;
