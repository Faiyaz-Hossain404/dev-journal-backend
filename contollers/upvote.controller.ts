import { NextFunction, Request, Response } from "express";
import * as UpvoteService from "../services/upvote.service";

export const upvoteNews = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.user?.id || "00000000-0000-0000-0000-000000000000";
    const newsId = req.params.id;

    const alreadyUpvoted = await UpvoteService.hasUserUpvoted(userId, newsId);
    if (alreadyUpvoted) {
      return res.status(400).json({ error: "Already upvoted" });
    }

    await UpvoteService.addUpvote(userId, newsId);
    const total = await UpvoteService.countUpvotes(newsId);

    res.status(201).json({ message: "Upvoted", upvotes: total });
  } catch (err) {
    next(err);
  }
};
