export const processImageUpload = async (
  file: Express.Multer.File
): Promise<string> => {
  if (file.size > 5 * 1024 * 1024) {
    throw new Error("File size too large. Maximum 5mb allowed.");
  }
  return (file as any).path;
};
