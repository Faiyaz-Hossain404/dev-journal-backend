import { NextFunction, Request, Response } from "express";
import * as UpvoteService from "../services/upvote.service";

export const upvoteNews = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = (req.user as any).id;
    const { id: newsId } = req.params;

    const { created, upvotes } = await UpvoteService.addUpvote(userId, newsId);

    if (!created) {
      return res.status(400).json({ error: "Already upvoted" });
    }

    return res.status(201).json({ created, upvotes });
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
    const userId = (req.user as any).id;
    const { id: newsId } = req.params;

    const found = await UpvoteService.hasUserUpvoted(userId, newsId);
    res.json({ hasUpvoted: !!found });
  } catch (err) {
    next(err);
  }
};

export const getUpvoteCount = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id: newsId } = req.params;
    const count = await UpvoteService.countUpvotes(newsId);
    res.json({ count });
  } catch (err) {
    next(err);
  }
};
