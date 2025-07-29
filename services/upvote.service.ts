import { Upvote } from "../models";

export const hasUserUpvoted = async (userId: string, newsId: string) => {
  const existing = await Upvote.findOne({ where: { userId, newsId } });
  return !!existing;
};

export const addUpvote = async (userId: string, newsId: string) => {
  return await Upvote.create({ userId, newsId });
};

export const countUpvotes = async (newsId: string) => {
  return await Upvote.count({ where: { newsId } });
};
