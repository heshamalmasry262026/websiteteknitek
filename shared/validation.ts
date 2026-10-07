import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";
import { products, services, articles, settings, users } from "../drizzle/schema";

export const insertProductSchema = createInsertSchema(products, {
  name: (s) => s.min(2, "اسم المنتج قصير جداً"),
  price: (s) => s,
}).omit({ id: true, createdAt: true, updatedAt: true });

export const insertServiceSchema = createInsertSchema(services, {
  name: (s) => s.min(2, "اسم الخدمة قصير جداً"),
}).omit({ id: true, createdAt: true, updatedAt: true });

export const insertArticleSchema = createInsertSchema(articles, {
  title: (s) => s.min(2, "عنوان المقال قصير جداً"),
}).omit({ id: true, createdAt: true, updatedAt: true });

export const updateSettingsSchema = createInsertSchema(settings).omit({
  id: true,
  updatedAt: true,
});

export const loginSchema = z.object({
  username: z.string().min(1, "اسم المستخدم مطلوب"),
  password: z.string().min(1, "كلمة المرور مطلوبة"),
});

export const insertUserSchema = createInsertSchema(users, {
  username: (s) => s.min(3),
}).omit({ id: true, createdAt: true });

export type InsertProduct = z.infer<typeof insertProductSchema>;
export type InsertService = z.infer<typeof insertServiceSchema>;
export type InsertArticle = z.infer<typeof insertArticleSchema>;
export type UpdateSettings = z.infer<typeof updateSettingsSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
