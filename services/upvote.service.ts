import { Upvote } from "../models";

export interface AddUpvoteResult {
  created: boolean;
  upvotes: number;
}

export const hasUserUpvoted = async (userId: string, newsId: string) => {
  const existing = await Upvote.findOne({ where: { userId, newsId } });
  return !!existing;
};

export const addUpvote = async (
  userId: string,
  newsId: string
): Promise<AddUpvoteResult> => {
  const [_, created] = await Upvote.findOrCreate({
    where: { userId, newsId },
    defaults: { userId, newsId },
  });

  const upvotes = await Upvote.count({ where: { newsId } });
  return { created, upvotes };
};

export const countUpvotes = async (newsId: string) => {
  return await Upvote.count({ where: { newsId } });
};
