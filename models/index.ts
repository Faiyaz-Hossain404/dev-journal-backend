import { Category } from "./category.model";
import { Comment } from "./comment.model";
import { News } from "./news.model";
import { NewsToCategory } from "./newsToCategory.model";
import { Upvote } from "./upvote.model";
import { User } from "./user.model";
import sequelize from "../config/db";
import { SavedNews } from "./savedNews.model";
import { Downvote } from "./downvote.model";

User.hasMany(News, { foreignKey: "createdBy" });
News.belongsTo(User, { foreignKey: "createdBy" });

News.hasMany(Comment, { foreignKey: "newsId" });
Comment.belongsTo(News, { foreignKey: "newsId" });
Comment.belongsTo(User, { foreignKey: "userId", as: "user" });

User.hasMany(Comment, { foreignKey: "userId" });

User.hasMany(Upvote, { foreignKey: "userId" });
News.hasMany(Upvote, { foreignKey: "newsId" });
Upvote.belongsTo(User, { foreignKey: "userId" });
Upvote.belongsTo(News, { foreignKey: "newsId" });

User.hasMany(Downvote, { foreignKey: "userId" });
Downvote.belongsTo(User, { foreignKey: "userId" });
News.hasMany(Downvote, { foreignKey: "newsId" });
Downvote.belongsTo(News, { foreignKey: "newsId" });

User.hasMany(SavedNews, { foreignKey: "userId" });
News.hasMany(SavedNews, { foreignKey: "newsId" });
SavedNews.belongsTo(User, { foreignKey: "userId" });
SavedNews.belongsTo(News, { foreignKey: "newsId" });

Category.belongsToMany(News, {
  through: NewsToCategory,
  as: "categories",
  foreignKey: "categoryId",
});

News.belongsToMany(Category, {
  through: NewsToCategory,
  as: "news",
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
  Downvote,
};
