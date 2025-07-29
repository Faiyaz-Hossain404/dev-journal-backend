import { Router } from "express";
import * as CommentController from "../contollers/comment.controller";

const router = Router();

router.get("/:id/comments", CommentController.getCommentsByNewsId);
router.post("/:id/comments", CommentController.createComment);

export default router;
