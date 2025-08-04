import express from "express";
import cors from "cors";
import newsRoutes from "./routes/news.routes";
import commentRoutes from "./routes/comment.routes";
import upvoteRoutes from "./routes/upvote.routes";
import categoryRoutes from "./routes/category.routes";
import authRoutes from "./routes/auth.routes";
import { errorHandler } from "./middleware/errorHandler";

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/news", newsRoutes);
app.use("/api/comments", commentRoutes);
app.use("/api/news", upvoteRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/auth", authRoutes);

app.use(errorHandler);

export default app;
