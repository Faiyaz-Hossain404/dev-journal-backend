import { col, fn, Op, Sequelize, where as sWhere } from "sequelize";
import { Category, News } from "../models";
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

export const searchNews = async (q: string) => {
  const like = `%${q.trim()}%`;

  return await News.findAll({
    attributes: {
      include: [
        [
          Sequelize.literal(
            `(SELECT COUNT(*) FROM "upvotes" u WHERE u."newsId" = "News"."id")`
          ),
          "upvotes",
        ],
        [
          Sequelize.literal(
            `(SELECT COUNT(*) FROM "downvotes" d WHERE d."newsId" = "News"."id")`
          ),
          "downvotes",
        ],
        [
          Sequelize.literal(
            `(SELECT COUNT(*) FROM "comments" c WHERE c."newsId" = "News"."id")`
          ),
          "commentsCount",
        ],
      ],
    },
    include: [
      {
        model: Category,
        as: "categories", // ← alias (see association note below)
        attributes: ["id", "name"],
        through: { attributes: [] },
        required: false, // left join (so OR won’t drop non-categorized matches)
      },
    ],
    where: {
      [Op.or]: [
        { title: { [Op.iLike]: like } },
        { description: { [Op.iLike]: like } }, // if your model has it
        { publisher: { [Op.iLike]: like } },
        // allow category-name matches in the same OR:
        sWhere(col(`categories.name`), { [Op.iLike]: like }),
      ],
    },
    order: [["createdAt", "DESC"]],
  });
};
