import { Upvote } from "../models";
import { Downvote } from "../models/downvote.model";

export const hasUserDownvoted = async (userId: string, newsId: string) => {
  const existing = await Downvote.findOne({ where: { userId, newsId } });
  return !!existing;
};

export const addDownvote = async (userId: string, newsId: string) => {
  await Upvote.destroy({ where: { userId, newsId } });
  return await Downvote.create({ userId, newsId });
};

export const removeDownvote = async (userId: string, newsId: string) => {
  return await Downvote.destroy({ where: { userId, newsId } });
};

export const countDownvotes = async (newsId: string) => {
  return await Downvote.count({ where: { newsId } });
};
