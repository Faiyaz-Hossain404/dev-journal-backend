import { Comment } from "../models";

export const getCommentsByNewsId = async (newsId: string) => {
  return await Comment.findAll({
    where: { newsId },
    order: [["createdAt", "DESC"]],
  });
};

export const createComment = async (
  newsId: string,
  userId: string,
  content: string
) => {
  return await Comment.create({
    newsId,
    userId,
    content,
  });
};
