import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "./cloudinary";
import multer from "multer";

const storage = new CloudinaryStorage({
  cloudinary,
  params: async () => ({
    folder: "the-dev-journal",
    allowed_formats: ["jpg", "jpeg", "png", "webp"],
  }),
});

const parser = multer({ storage });
export default parser;
