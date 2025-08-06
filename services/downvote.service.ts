import { Downvote } from "../models/downvote.model";

export const hasUserDownvoted = async (userId: string, newsId: string) => {
  return await Downvote.findOne({ where: { userId, newsId } });
};

export const downvoteNews = async (userId: string, newsId: string) => {
  const existing = await hasUserDownvoted(userId, newsId);
  if (existing) return null;

  return await Downvote.create({ userId, newsId });
};

export const countDownvotes = async (newsId: string) => {
  return await Downvote.count({ where: { newsId } });
};
