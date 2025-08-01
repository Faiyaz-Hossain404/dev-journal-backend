import { NextFunction, Request, Response } from "express";
import * as CategoryService from "../services/category.service";

export const getAllCategories = async (
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const categories = await CategoryService.getAllCategories();
    res.json(categories);
  } catch (err) {
    next(err);
  }
};
