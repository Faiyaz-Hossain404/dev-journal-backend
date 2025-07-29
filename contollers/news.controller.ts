import { NextFunction, Request, Response } from "express";
import * as NewsService from "../services/news.service";
import { CreateNewsDTO } from "../types/news.types";

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
    const userId = req.user?.id || "00000000-0000-0000-0000-000000000000";
    const news = await NewsService.getUserNews(userId);
    res.json(news);
  } catch (err) {
    next(err);
  }
};

export const getSingleNews = async (
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
