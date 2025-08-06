import { Upvote } from "../models";

export const hasUserUpvoted = async (userId: string, newsId: string) => {
  const existing = await Upvote.findOne({ where: { userId, newsId } });
  return !!existing;
};

export const addUpvote = async (userId: string, newsId: string) => {
  const alreadyExists = await Upvote.findOne({ where: { userId, newsId } });
  if (alreadyExists) return null;
  return await Upvote.create({ userId, newsId });
};

export const countUpvotes = async (newsId: string) => {
  return await Upvote.count({ where: { newsId } });
};
