import { DataTypes, Model } from "sequelize";
import sequelize from "../config/db";

export class Downvote extends Model {}

Downvote.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
  },
  { sequelize, tableName: "downvotes", timestamps: true }
);
