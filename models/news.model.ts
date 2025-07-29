import { DataTypes, Model } from "sequelize";
import sequelize from "../config/db";

export class News extends Model {}

News.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    description: DataTypes.TEXT,
    imageUrl: DataTypes.STRING,
    link: DataTypes.STRING,
    releaseDate: DataTypes.DATEONLY,
    publisher: DataTypes.STRING,
    createdBy: {
      type: DataTypes.UUID,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "news",
    timestamps: true,
  }
);
