import { Comment, User } from "../models";

export const getCommentsByNewsId = async (newsId: string) => {
  return await Comment.findAll({
    where: { newsId },
    order: [["createdAt", "DESC"]],
    include: [{ model: User, as: "user", attributes: ["id", "name"] }],
  });
};

export const createComment = async (
  newsId: string,
  userId: string,
  content: string
) => {
  const created = await Comment.create({
    newsId,
    userId,
    content,
  });

  return await Comment.findByPk(created.id, {
    include: [{ model: User, as: "user", attributes: ["id", "name"] }],
  });
};

export const deleteComment = async (commentId: string, userId: string) => {
  const existing = await Comment.findByPk(commentId);
  if (!existing) throw new Error("Comment not found.");
  if (existing.userId !== userId) throw new Error("Forbidden");
  await existing.destroy();
};
