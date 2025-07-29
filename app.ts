import express from "express";
import cors from "cors";
import newsRoutes from "./routes/news.routes";
import commentRoutes from "./routes/comment.routes";
import upvoteRoutes from "./routes/upvote.routes";

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/news", newsRoutes);
app.use("/api/comments", commentRoutes);
app.use("/api/news", upvoteRoutes);

export default app;
