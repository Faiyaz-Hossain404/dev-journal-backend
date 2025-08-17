import { DataTypes, Model } from "sequelize";
import sequelize from "../config/db";

interface CommentAttributes {
  id?: string;
  content: string;
  newsId: string;
  userId: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export class Comment extends Model<CommentAttributes> {
  public id!: string;
  public content!: string;
  public newsId!: string;
  public userId!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Comment.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    newsId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "comments",
    timestamps: true,
  }
);
