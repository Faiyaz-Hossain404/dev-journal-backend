import { User } from "../models/user.model";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const JWT_SECRET =
  process.env.JWT_SECRET ||
  "b8e7fff948d70cd2da8059a0ad486eeb16db76c3291cb5b6ab0dd6ba139df038";

export const register = async (
  name: string,
  email: string,
  password: string
) => {
  const existing = await User.findOne({ where: { email } });
  if (existing) throw new Error("Email already in use");

  const hashed = await bcrypt.hash(password, 10);
  const user = await User.create({ name, email, password: hashed });
};

export const login = async (email: string, password: string) => {
  const user = await User.findOne({ where: { email } });
  if (!user) throw new Error("Invalid credentials");

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new Error("Invalid credentials");

  const token = jwt.sign({ id: user.id, name: user.name }, JWT_SECRET, {
    expiresIn: "1h",
  });

  return { user, token };
};

export const getUserFromToken = (token: string) => {
  return jwt.verify(token, JWT_SECRET);
};
