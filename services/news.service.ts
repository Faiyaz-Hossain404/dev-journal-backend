import { col, fn, Op, Sequelize, where as sWhere } from "sequelize";
import { Category, News, NewsToCategory } from "../models";
import { CreateNewsDTO, UpdateNewsDTO } from "../types/news.types";
import { normalizeCategories } from "./createNews.helper/createNews.helper";

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
  const { category, ...rest } = data;
  const names = normalizeCategories(category);

  // create news row
  const news = await News.create({ ...rest, createdBy });

  // upsert categories and link in the join table
  if (names.length) {
    const cats = await Promise.all(
      names.map(async (name) => {
        const [row] = await Category.findOrCreate({
          where: { name },
          defaults: { name },
        });
        return row;
      })
    );

    const newsId = news.getDataValue("id") as string;

    await Promise.all(
      cats.map(async (c) => {
        const categoryId = c.getDataValue("id") as string;
        await NewsToCategory.findOrCreate({
          where: { newsId, categoryId },
          defaults: { newsId, categoryId },
        });
      })
    );
  }

  //return with categories included (alias must match your association)
  const withCats = await News.findByPk(news.getDataValue("id") as string, {
    include: [
      {
        model: Category,
        as: "categories",
        attributes: ["id", "name"],
        through: { attributes: [] },
        required: false,
      },
    ],
  });

  return withCats!;
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
        as: "categories",
        attributes: ["id", "name"],
        through: { attributes: [] },
        required: false,
      },
    ],
    where: {
      [Op.or]: [
        { title: { [Op.iLike]: like } },
        { description: { [Op.iLike]: like } },
        { publisher: { [Op.iLike]: like } },
        sWhere(col(`categories.name`), { [Op.iLike]: like }),
      ],
    },
    order: [["createdAt", "DESC"]],
  });
};
