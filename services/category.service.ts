import { Category } from "../models";

export const getAllCategories = async () => {
  return await Category.findAll({ order: [["createdAt", "ASC"]] });
};
