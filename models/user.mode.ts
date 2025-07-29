import { DataTypes, Model } from "sequelize";
import sequelize from "../config/db";

export class User extends Model {}

User.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      unique: true,
    },
    password: DataTypes.STRING,
  },
  {
    sequelize,
    tableName: "users",
    timestamps: true,
  }
);
