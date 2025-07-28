import dotenv from "dotenv";
import app from "./app";
dotenv.config();

const PORT = process.env.PORT;

const startServer = async () => {
  try {
    // await sequelize.authenticate();
    // console.log("✅ DB connection synced");

    // await sequelize.sync({
    //   force: false,
    //   alter: process.env.NODE_ENV === "development",
    // });
    // console.log("✅ DB models synced");

    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
      //   console.log(`📍 Health check: http://localhost:${PORT}/health`);
      //   console.log(`🔐 Auth endpoints: http://localhost:${PORT}/api/auth`);
    });
  } catch (error) {
    console.error("❌ Unable to start server:", error);
    process.exit(1);
  }
};

startServer();
