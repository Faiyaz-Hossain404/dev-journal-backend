import { Router } from "express";
import * as NewsController from "../contollers/news.controller";
import { requireAuth } from "../middleware/auth";

const router = Router();

router.get("/", NewsController.getAllNews);
router.post("/", requireAuth, NewsController.createNews);
router.get("/my-news", requireAuth, NewsController.getUserNews);
router.get("/:id", NewsController.getNewsById);
router.put("/:id", requireAuth, NewsController.updateNews);
router.delete("/:id", requireAuth, NewsController.deleteNews);
router.get("/:id/upvotes", requireAuth, NewsController.checkUpvoteStatus);

export default router;
