import { Router } from "express";
import * as NewsController from "../contollers/news.controller";
import { requireAuth } from "../middleware/auth";

const router = Router();

router.get("/", NewsController.getAllNews);
router.post("/", NewsController.createNews);
router.get("/my-news", NewsController.getUserNews);
router.get("/my-news", NewsController.getSingleNews);
router.get("/:id", NewsController.updateNews);
router.put("/:id", NewsController.deleteNews);
router.get("/:id/upvotes", requireAuth, NewsController.checkUpvoteStatus);

export default router;
