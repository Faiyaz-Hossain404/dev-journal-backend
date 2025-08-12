import express from "express";
import cors from "cors";
import newsRoutes from "./routes/news.routes";
import commentRoutes from "./routes/comment.routes";
import upvoteRoutes from "./routes/upvote.routes";
import categoryRoutes from "./routes/category.routes";
import authRoutes from "./routes/auth.routes";
import { errorHandler } from "./middleware/errorHandler";
import downvoteRoutes from "./routes/downvote.routes";
import uploadRoutes from "./routes/upload.routes";

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/news", newsRoutes);
app.use("/api/news", commentRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/news/upvotes", upvoteRoutes);
app.use("/api/news/downvotes", downvoteRoutes);
app.use("/api/upload", uploadRoutes);

app.use(errorHandler);

export default app;
