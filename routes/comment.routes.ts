import { Router } from "express";
import * as CommentController from "../contollers/comment.controller";
import { requireAuth } from "../middleware/auth";

const router = Router();

router.get("/:id/comments", CommentController.getCommentsByNewsId);
router.post("/:id/comments", requireAuth, CommentController.createComment);
router.delete(
  "/:id/comments/:commentId",
  requireAuth,
  CommentController.deleteComment
);

export default router;
