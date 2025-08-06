import { NextFunction, Request, Response } from "express";
import { processImageUpload } from "../services/upload.service";

export const uploadImage = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.file) return res.status(400).json({ error: "No file uploaded" });

    const imageUrl = await processImageUpload(req.file);

    res.status(200).json({ imageUrl });
  } catch (err) {
    if (err instanceof Error) {
      return res.status(400).json({ error: err.message });
    }
    next(err);
  }
};
