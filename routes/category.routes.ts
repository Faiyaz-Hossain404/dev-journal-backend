import { Router } from "express";
import * as CategoryController from "../contollers/category.controller";

const router = Router();

router.get("/", CategoryController.getAllCategories);

export default router;
