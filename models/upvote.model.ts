import { DataTypes, Model } from "sequelize";
import sequelize from "../config/db";

export class Upvote extends Model {}

Upvote.init(
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
    tableName: "upvotes",
    timestamps: true,
    indexes: [
      { unique: true, fields: ["userId", "newsId"] }, // <- important
      { fields: ["newsId"] },
    ],
  }
);
