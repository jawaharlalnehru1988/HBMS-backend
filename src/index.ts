import dotenv from "dotenv";
dotenv.config(); // Load environment variables

import express from "express";
import mongoose from "mongoose";
import userRoutes from "./routes/userRoutes";
import logger from "./utils/logger";

logger.info(`Environment Variables: PORT=${process.env.PORT}, MONGO_URI=${process.env.MONGO_URI}, JWT_SECRET=${process.env.JWT_SECRET}`);

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use("/api/users", userRoutes);

mongoose
  .connect(process.env.MONGO_URI as string)
  .then(() => {
    logger.info("Connected to MongoDB");
    app.listen(port, () => {
      logger.info(`Server running on port ${port}`);
    });
  })
  .catch((error) => {
    logger.error("Error connecting to MongoDB:", error);
  });