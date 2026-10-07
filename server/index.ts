import "dotenv/config";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import path from "path";
import { fileURLToPath } from "url";

import authRoutes from "./routes/auth";
import productRoutes from "./routes/products";
import serviceRoutes from "./routes/services";
import articleRoutes from "./routes/articles";
import settingsRoutes from "./routes/settings";
import uploadRoutes from "./routes/upload";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const PORT = Number(process.env.PORT) || 3000;
const isProd = process.env.NODE_ENV === "production";

app.use(
  cors({
    origin: isProd ? true : "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json({ limit: "5mb" }));
app.use(cookieParser());

// ---------- API routes ----------
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/services", serviceRoutes);
app.use("/api/articles", articleRoutes);
app.use("/api/settings", settingsRoutes);
app.use("/api/upload", uploadRoutes);

app.get("/api/health", (_req, res) => res.json({ status: "ok" }));

// ---------- Serve built React client in production ----------
if (isProd) {
  const clientDist = path.resolve(__dirname, "public");
  app.use(express.static(clientDist));
  app.get("*", (_req, res) => {
    res.sendFile(path.join(clientDist, "index.html"));
  });
}

// ---------- Error handler ----------
app.use((err: any, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  console.error(err);
  res.status(err.status || 500).json({ message: err.message || "خطأ في الخادم" });
});

app.listen(PORT, () => {
  console.log(`✅ Teknitek server running on port ${PORT} (${isProd ? "production" : "development"})`);
});
