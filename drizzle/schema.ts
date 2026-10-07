import {
  pgTable,
  serial,
  text,
  varchar,
  integer,
  numeric,
  boolean,
  timestamp,
} from "drizzle-orm/pg-core";

// ---------- Admin users ----------
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: varchar("username", { length: 100 }).notNull().unique(),
  passwordHash: text("password_hash").notNull(),
  role: varchar("role", { length: 20 }).notNull().default("admin"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// ---------- Products (الأكسسوارات وغيرها) ----------
export const products = pgTable("products", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  description: text("description").default(""),
  price: numeric("price", { precision: 10, scale: 2 }).notNull().default("0"),
  imageUrl: text("image_url").default(""),
  category: varchar("category", { length: 100 }).default("accessories"), // accessories | other
  stock: integer("stock").notNull().default(0),
  isActive: boolean("is_active").notNull().default(true),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// ---------- Services (خدمات الصيانة وخدمات أخرى) ----------
export const services = pgTable("services", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  description: text("description").default(""),
  price: numeric("price", { precision: 10, scale: 2 }).default("0"),
  imageUrl: text("image_url").default(""),
  category: varchar("category", { length: 100 }).notNull().default("maintenance"), // maintenance | other
  isActive: boolean("is_active").notNull().default(true),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// ---------- Articles (المدونة) ----------
export const articles = pgTable("articles", {
  id: serial("id").primaryKey(),
  title: varchar("title", { length: 255 }).notNull(),
  excerpt: text("excerpt").default(""),
  content: text("content").notNull().default(""),
  imageUrl: text("image_url").default(""),
  isPublished: boolean("is_published").notNull().default(true),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// ---------- Store settings (single row, id = 1) ----------
export const settings = pgTable("settings", {
  id: serial("id").primaryKey(),
  storeName: varchar("store_name", { length: 255 }).notNull().default("Teknitek"),
  storeNameAr: varchar("store_name_ar", { length: 255 }).notNull().default("تكنيتك"),
  phone: varchar("phone", { length: 50 }).notNull().default("+963984342337"),
  whatsapp: varchar("whatsapp", { length: 50 }).notNull().default("+963984342337"),
  email: varchar("email", { length: 255 }).notNull().default("info@teknitek.com"),
  address: varchar("address", { length: 255 }).notNull().default("دمشق، سوريا"),
  workingHours: varchar("working_hours", { length: 255 })
    .notNull()
    .default("يومياً من 9 صباحاً حتى 9 مساءً"),
  facebookUrl: text("facebook_url").default(""),
  twitterUrl: text("twitter_url").default(""),
  instagramUrl: text("instagram_url").default(""),
  logoUrl: text("logo_url").default(""),
  bannerUrl: text("banner_url").default(""),
  heroTitle: text("hero_title").default(
    "منصتك الموثوقة للصيانة والأكسسوارات والخدمات التقنية المتخصصة"
  ),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;
export type Product = typeof products.$inferSelect;
export type NewProduct = typeof products.$inferInsert;
export type Service = typeof services.$inferSelect;
export type NewService = typeof services.$inferInsert;
export type Article = typeof articles.$inferSelect;
export type NewArticle = typeof articles.$inferInsert;
export type Settings = typeof settings.$inferSelect;
