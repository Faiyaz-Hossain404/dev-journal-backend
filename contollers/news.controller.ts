import { NextFunction, Request, Response } from "express";
import * as NewsService from "../services/news.service";
import { CreateNewsDTO } from "../types/news.types";
import { Upvote } from "../models";

export const getAllNews = async (
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const news = await NewsService.getAllNews();
    res.json(news); //200 ok status sent
  } catch (error) {
    next(error);
  }
};

export const createNews = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.user?.id || "00000000-0000-0000-0000-000000000000";
    const data = req.body as CreateNewsDTO;
    const news = await NewsService.createNews(data, userId);
    res.status(201).json(news);
  } catch (error) {
    next(error);
  }
};

export const getUserNews = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.user?.id;
    if (!userId) return res.status(401).json({ error: "Unauthorized" });

    const body = req.body as Partial<CreateNewsDTO> & { category?: string };

    // Basic required-field checks
    const required = [
      "title",
      "description",
      "imageUrl",
      "link",
      "releaseDate",
      "publisher",
    ] as const;
    for (const key of required) {
      if (!body[key]) {
        return res
          .status(400)
          .json({ error: `Missing required field: ${key}` });
      }
    }

    // Normalize the category field (accept either 'category' or the existing 'catergory' key)
    const normalized: CreateNewsDTO = {
      title: body.title!,
      description: body.description!,
      imageUrl: body.imageUrl!,
      link: body.link!,
      releaseDate: body.releaseDate!,
      publisher: body.publisher!,
      // keep your existing DTO shape (typo included), but fill from either key
      catergory: body.catergory ?? body.category, // <- normalization
    };

    const news = await NewsService.createNews(normalized, userId);
    return res.status(201).json(news);
  } catch (err) {
    next(err);
  }
};

export const getNewsById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const news = await NewsService.getSingleNews(req.params.id);
    if (!news) return res.status(404).json({ error: "News not found" });
    res.json(news);
  } catch (err) {
    next(err);
  }
};

export const updateNews = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const updated = await NewsService.updateNews(req.params.id, req.body);
    if (!updated) return res.status(404).json({ error: "News not found" });
    res.json(updated);
  } catch (err) {
    next(err);
  }
};

export const deleteNews = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const deleted = await NewsService.deleteNews(req.params.id);
    if (!deleted) return res.status(404).json({ error: "News not found" });
    res.json({ message: "News deleted" });
  } catch (err) {
    next(err);
  }
};

export const checkUpvoteStatus = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const userId = req.user?.id;

    const hasUpvoted = await Upvote.findOne({ where: { userId, newsId: id } });
    res.status(200).json({ hasUpvoted: !hasUpvoted });
  } catch (err) {
    next(err);
  }
};
