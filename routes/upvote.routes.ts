import { Router } from "express";
import * as UpvoteController from "../contollers/upvote.controller";

const router = Router();

router.post("/:id/upvote", UpvoteController.upvoteNews);

export default router;
