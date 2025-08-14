import { NextFunction, Request, Response } from "express";
import * as UpvoteService from "../services/upvote.service";
import * as DownvoteService from "../services/downvote.service";

export const upvoteNews = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.user!.id;
    const newsId = req.params.id;

    const already = await UpvoteService.hasUserUpvoted(userId, newsId);
    if (already) {
      const upvotes = await UpvoteService.countUpvotes(newsId);
      const downvotes = await DownvoteService.countDownvotes(newsId);
      return res.status(200).json({ upvotes, downvotes, created: false });
    }

    await UpvoteService.addUpvote(userId, newsId);
    const upvotes = await UpvoteService.countUpvotes(newsId);
    const downvotes = await DownvoteService.countDownvotes(newsId);
    return res.status(201).json({ upvotes, downvotes, created: true });
  } catch (err) {
    next(err);
  }
};

export const checkUpvoted = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.user!.id;
    const newsId = req.params.id;
    const found = await UpvoteService.hasUserUpvoted(userId, newsId);
    res.json({ hasUpvoted: !!found });
  } catch (err) {
    next(err);
  }
};

export const undoUpvote = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.user!.id;
    const newsId = req.params.id;
    await UpvoteService.removeUpvote(userId, newsId);
    const upvotes = await UpvoteService.countUpvotes(newsId);
    const downvotes = await DownvoteService.countDownvotes(newsId);
    return res.status(200).json({ upvotes, downvotes, deleted: true });
  } catch (err) {
    next(err);
  }
};
// export const getUpvoteCount = async (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   try {
//     const { id: newsId } = req.params;
//     const count = await UpvoteService.countUpvotes(newsId);
//     res.json({ count });
//   } catch (err) {
//     next(err);
//   }
// };
