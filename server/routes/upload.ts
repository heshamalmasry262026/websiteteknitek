import { Router } from "express";
import multer from "multer";
import { requireAuth } from "../auth";
import { uploadImageBuffer } from "../cloudinary";

const router = Router();

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
  fileFilter: (_req, file, cb) => {
    if (!file.mimetype.startsWith("image/")) {
      return cb(new Error("الملف يجب أن يكون صورة"));
    }
    cb(null, true);
  },
});

// Protected: admin uploads a product image / logo / banner -> returns a Cloudinary URL
router.post("/", requireAuth, upload.single("image"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "لم يتم إرفاق أي صورة" });
    }
    const folder = typeof req.query.folder === "string" ? req.query.folder : "teknitek";
    const url = await uploadImageBuffer(req.file.buffer, folder);
    res.json({ url });
  } catch (err) {
    console.error("Upload error:", err);
    res.status(500).json({ message: "فشل رفع الصورة، تحقق من إعدادات Cloudinary" });
  }
});

export default router;
