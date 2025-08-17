import { NextFunction, Request, Response } from "express";
import * as CommentService from "../services/comment.service";
import { CreateCommentDTO } from "../types/comment.types";

export const getCommentsByNewsId = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const newsId = req.params.id;
    const comments = await CommentService.getCommentsByNewsId(newsId);
    res.json(comments);
  } catch (err) {
    next(err);
  }
};

export const createComment = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const newsId = req.params.id;
    const userId = req.user!.id;
    const { content } = req.body as CreateCommentDTO;
    if (!content || !content.trim()) {
      return res.status(400).json({ error: "Content is required" });
    }
    if (!req.user?.id) {
      return res.status(401).json({ error: "You are not logged in!" });
    }

    const comment = await CommentService.createComment(
      newsId,
      userId,
      content.trim()
    );

    res.status(201).json(comment);
    // const userId = req.user?.id;
    // if (!userId)
    //   return res.status(403).json({ message: "You are not logged in!" });
    // const { content } = req.body as CreateCommentDTO;
    // const comment = await CommentService.createComment(
    //   req.params.id,
    //   userId,
    //   content
    // );
    // res.status(201).json(comment);
  } catch (err) {
    next(err);
  }
};

const deleteComment = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { commentId } = req.params;
    const userId = req.user!.id;

    if (!userId) {
      return res.status(401).json({ error: "You are not logged in!" });
    }

    await CommentService.deleteComment(commentId, userId);
    return res.status(204).send();
  } catch (err: any) {
    if (err.message === "Comment not found.") {
      return res.status(404).json({ error: "Comment not found" });
    }
    if (err.message === "Forbidden") {
      return res.status(403).json({ error: "Forbidden" });
    }
    next(err);
  }
};
