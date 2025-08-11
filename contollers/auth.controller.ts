import { NextFunction, Request, Response } from "express";
import * as AuthService from "../services/auth.service";
import { User } from "../models";

export const register = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name, email, password } = req.body;
    const user = await AuthService.register(name, email, password);
    res.status(201).json(user);
  } catch (err) {
    next(err);
  }
};

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body;
    const { user, token } = await AuthService.login(email, password);
    res.json({ user, token });
  } catch (err: any) {
    if (err?.message === "Invalid credentials") {
      return res.status(401).json({ error: "Invalid credentials" });
    }
    if (err?.message?.includes("JWT_SECRET")) {
      return res
        .status(500)
        .json({ error: "Server misconfig: JWT secret missing" });
    }
    next(err);
  }
};

export const me = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = req.user?.id;
    if (!id) return res.status(401).json({ error: "Unauthorized" });
    const user = await User.findByPk(id, {
      attributes: ["id", "name", "email", "createdAt"],
    });
    if (!user) return res.status(404).json({ error: "User not found" });
    res.json({ user });
  } catch (err) {
    next(err);
  }
};
