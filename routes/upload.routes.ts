import { Router } from "express";
import { requireAuth } from "../middleware/auth";
import parser from "../config/multer";

const router = Router();

router.post("/image", requireAuth, parser.single("image"), (req, res) => {
  const file = req.file as Express.Multer.File & { path: string };

  if (!file) return res.status(400).json({ error: "No file uploaded" });

  res.status(200).json({ imageUrl: file.path });
});

export default router;
