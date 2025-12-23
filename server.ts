import dotenv from "dotenv";
import app from "./app";
import { sequelize } from "./models";
dotenv.config();

const PORT = process.env.PORT || 3000;

const startServer = async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ DB connection synced");

    await sequelize.sync({
      force: false,
    });
    console.log("✅ DB models synced");

    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("❌ Unable to start server:", error);
    process.exit(1);
  }
};

startServer();
