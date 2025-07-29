import { News } from "../models";
import { CreateNewsDTO, UpdateNewsDTO } from "../types/news.types";

export const getAllNews = async () => {
  return await News.findAll({ order: [["createdAt", "DESC"]] });
};

export const createNews = async (data: CreateNewsDTO, createdBy: string) => {
  return await News.create({ ...data, createdBy });
};

export const getUserNews = async (userId: string) => {
  return await News.findAll({ where: { createdBy: userId } });
};

export const getSingleNews = async (id: string) => {
  return await News.findByPk(id);
};

export const updateNews = async (id: string, updates: UpdateNewsDTO) => {
  const news = await News.findByPk(id);
  if (!news) return null;
  await news.update(updates);
  return news;
};

export const deleteNews = async (id: string) => {
  const news = await News.findByPk(id);
  if (!news) return null;
  await news.destroy();
  return true;
};
