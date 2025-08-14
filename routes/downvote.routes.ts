import { Router } from "express";
import * as DownvoteController from "../contollers/downvote.controller";
import { requireAuth } from "../middleware/auth";

const router = Router();

router.post("/:id/downvote", requireAuth, DownvoteController.downvoteNews);
router.get("/:id/downvotes", requireAuth, DownvoteController.checkDownvoted);
router.delete("/:id/downvote", requireAuth, DownvoteController.undoDownvote);

export default router;
