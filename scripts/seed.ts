import "dotenv/config";
import { db } from "../server/db";
import { users, settings } from "../drizzle/schema";
import { hashPassword } from "../server/auth";
import { eq } from "drizzle-orm";

async function seed() {
  const adminUsername = process.env.ADMIN_USERNAME || "admin";
  const adminPassword = process.env.ADMIN_PASSWORD || "ChangeMe123!";

  const [existing] = await db.select().from(users).where(eq(users.username, adminUsername));
  if (!existing) {
    const passwordHash = await hashPassword(adminPassword);
    await db.insert(users).values({ username: adminUsername, passwordHash, role: "admin" });
    console.log(`✅ تم إنشاء حساب المدير: ${adminUsername} / ${adminPassword}`);
    console.log("⚠️  غيّر كلمة المرور بعد أول تسجيل دخول.");
  } else {
    console.log("ℹ️ حساب المدير موجود مسبقاً، تم التخطي.");
  }

  const [existingSettings] = await db.select().from(settings).where(eq(settings.id, 1));
  if (!existingSettings) {
    await db.insert(settings).values({ id: 1 });
    console.log("✅ تم إنشاء إعدادات المتجر الافتراضية.");
  } else {
    console.log("ℹ️ إعدادات المتجر موجودة مسبقاً، تم التخطي.");
  }

  process.exit(0);
}

seed().catch((err) => {
  console.error("❌ فشل التهيئة:", err);
  process.exit(1);
});
