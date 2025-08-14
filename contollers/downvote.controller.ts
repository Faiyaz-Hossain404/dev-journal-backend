import { Request, Response, NextFunction } from "express";
import * as DownvoteService from "../services/downvote.service";
import * as UpvoteService from "../services/upvote.service";

export const downvoteNews = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.user!.id;
    const newsId = req.params.id;

    const already = await DownvoteService.hasUserDownvoted(userId, newsId);
    if (already) {
      const downvotes = await DownvoteService.countDownvotes(newsId);
      const upvotes = await UpvoteService.countUpvotes(newsId);
      return res.status(200).json({ downvotes, upvotes, created: false });
    }

    await DownvoteService.addDownvote(userId, newsId);
    const downvotes = await DownvoteService.countDownvotes(newsId);
    const upvotes = await UpvoteService.countUpvotes(newsId);

    return res.status(201).json({ downvotes, upvotes, created: true });
  } catch (err) {
    next(err);
  }
};

export const checkDownvoted = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.user!.id;
    const newsId = req.params.id;
    const found = await DownvoteService.hasUserDownvoted(userId, newsId);
    res.json({ hasDownvoted: !!found });
  } catch (err) {
    next(err);
  }
};

// export const getDownvoteCount = async (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   try {
//     const { id: newsId } = req.params;
//     const count = await DownvoteService.countDownvotes(newsId);
//     res.json({ count });
//   } catch (err) {
//     next(err);
//   }
// };
