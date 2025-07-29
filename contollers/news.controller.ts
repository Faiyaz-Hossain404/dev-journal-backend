import { News } from "../models";

export const getAllNews = async () => {
  return await News.findAll({ order: [["createdAt", "DESC"]] });
};

export const createNews = async (data: any, crea) => {
  return await News.findAll({ order: [["createdAt", "DESC"]] });
};
