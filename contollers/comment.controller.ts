import { NextFunction, Request, Response } from "express";
import * as CommentService from "../services/comment.service";
import { CreateCommentDTO } from "../types/comment.types";

export const getCommentsByNewsId = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const comments = await CommentService.getCommentsByNewsId(req.params.id);
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
    const userId = req.user?.id || "00000000-0000-0000-0000-000000000000";
    const { content } = req.body as CreateCommentDTO;
    const comment = await CommentService.createComment(
      req.params.id,
      userId,
      content
    );
    res.status(201).json(comment);
  } catch (err) {
    next(err);
  }
};
