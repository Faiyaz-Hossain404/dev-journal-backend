import { Router } from "express";
import { requireAuth } from "../middleware/auth";
import parser from "../config/multer";
import { uploadImage } from "../contollers/upload.controller";

const router = Router();

router.post("/image", requireAuth, parser.single("image"), uploadImage);

export default router;
