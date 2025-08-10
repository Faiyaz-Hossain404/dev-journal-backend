import { Router } from "express";
import * as UpvoteController from "../contollers/upvote.controller";
import { requireAuth } from "../middleware/auth";

const router = Router();

router.post("/:id/upvote", requireAuth, UpvoteController.upvoteNews);
router.post("/:id/upvotes", requireAuth, UpvoteController.checkUpvoted);

export default router;
