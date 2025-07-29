import { DataTypes, Model } from "sequelize";
import sequelize from "../config/db";

export class NewsToCategory extends Model {}

NewsToCategory.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    newsId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    categoryId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "news_to_categories",
    timestamps: true,
  }
);
