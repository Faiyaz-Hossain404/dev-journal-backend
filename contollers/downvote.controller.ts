import { Request, Response, NextFunction } from "express";
import * as DownvoteService from "../services/downvote.service";

export const downvoteNews = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = (req.user as any).id;
    const { id: newsId } = req.params;

    const result = await DownvoteService.downvoteNews(userId, newsId);
    if (!result) {
      return res.status(400).json({ error: "Already downvoted" });
    }

    return res.status(201).json(result);
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
    const userId = (req.user as any).id;
    const { id: newsId } = req.params;

    const found = await DownvoteService.hasUserDownvoted(userId, newsId);
    res.json({ hasDownvoted: !!found });
  } catch (err) {
    next(err);
  }
};

export const getDownvoteCount = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id: newsId } = req.params;
    const count = await DownvoteService.countDownvotes(newsId);
    res.json({ count });
  } catch (err) {
    next(err);
  }
};
