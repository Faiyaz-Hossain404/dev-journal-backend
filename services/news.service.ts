import { Sequelize } from "sequelize";
import { News } from "../models";
import { CreateNewsDTO, UpdateNewsDTO } from "../types/news.types";

export const getAllNews = async () => {
  return await News.findAll({
    attributes: {
      include: [
        [
          Sequelize.literal(`(
            SELECT COUNT(*) FROM "upvotes" u WHERE u."newsId" = "News"."id"
          )`),
          "upvotes",
        ],
        [
          Sequelize.literal(`(
            SELECT COUNT(*) FROM "downvotes" d WHERE d."newsId" = "News"."id"
          )`),
          "downvotes",
        ],
        [
          Sequelize.literal(`(
            SELECT COUNT(*) FROM "comments" c WHERE c."newsId" = "News"."id"
          )`),
          "commentsCount",
        ],
      ],
    },
    order: [["createdAt", "DESC"]],
  });
};

export const createNews = async (data: CreateNewsDTO, createdBy: string) => {
  return await News.create({ ...data, createdBy });
};

export const getUserNews = async (userId: string) => {
  return await News.findAll({
    where: { createdBy: userId },
    attributes: {
      include: [
        [
          Sequelize.literal(`(
            SELECT COUNT(*) FROM "upvotes" u WHERE u."newsId" = "News"."id"
          )`),
          "upvotes",
        ],
        [
          Sequelize.literal(`(
            SELECT COUNT(*) FROM "downvotes" d WHERE d."newsId" = "News"."id"
          )`),
          "downvotes",
        ],
        [
          Sequelize.literal(`(
            SELECT COUNT(*) FROM "comments" c WHERE c."newsId" = "News"."id"
          )`),
          "commentsCount",
        ],
      ],
    },
    order: [["createdAt", "DESC"]],
  });
};

export const getSingleNews = async (id: string) => {
  const rows = await News.findAll({
    where: { id },
    attributes: {
      include: [
        [
          Sequelize.literal(`(
            SELECT COUNT(*) FROM "upvotes" u WHERE u."newsId" = "News"."id"
          )`),
          "upvotes",
        ],
        [
          Sequelize.literal(`(
            SELECT COUNT(*) FROM "downvotes" d WHERE d."newsId" = "News"."id"
          )`),
          "downvotes",
        ],
        [
          Sequelize.literal(`(
            SELECT COUNT(*) FROM "comments" c WHERE c."newsId" = "News"."id"
          )`),
          "commentsCount",
        ],
      ],
    },
    limit: 1,
  });
  return rows[0] || null;
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
