import { Category } from "./category.model";
import { Comment } from "./comment.mode";
import { News } from "./news.model";
import { NewsToCategory } from "./newsToCategory.model";
import { Upvote } from "./upvote.model";
import { User } from "./user.mode";
import sequelize from "../config/db";
import { SavedNews } from "./savedNews.model";

User.hasMany(News, { foreignKey: "createdBy" });
News.belongsTo(User, { foreignKey: "createdBy" });

News.hasMany(Comment, { foreignKey: "newsId" });
Comment.belongsTo(News, { foreignKey: "newsId" });
Comment.belongsTo(User, { foreignKey: "userId" });

User.hasMany(Comment, { foreignKey: "userId" });

User.hasMany(Upvote, { foreignKey: "userId" });
News.hasMany(Upvote, { foreignKey: "newsId" });
Upvote.belongsTo(User, { foreignKey: "userId" });
Upvote.belongsTo(News, { foreignKey: "newsId" });

User.hasMany(SavedNews, { foreignKey: "userId" });
News.hasMany(SavedNews, { foreignKey: "newsId" });
SavedNews.belongsTo(User, { foreignKey: "userId" });
SavedNews.belongsTo(News, { foreignKey: "newsId" });

Category.belongsToMany(News, {
  through: NewsToCategory,
  foreignKey: "categoryId",
});

News.belongsToMany(Category, {
  through: NewsToCategory,
  foreignKey: "newsId",
});

export {
  sequelize,
  User,
  News,
  Comment,
  Upvote,
  Category,
  NewsToCategory,
  SavedNews,
};
