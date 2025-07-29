import { DataTypes, Model } from "sequelize";
import sequelize from "../config/db";

export class SavedNews extends Model {}

SavedNews.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    newsId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "saved_news",
    timestamps: true,
  }
);
