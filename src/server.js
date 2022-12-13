import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import morgan from "morgan";
import connectDB from "./config/database.js";
import redisClient from "./config/redis.js";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoute.js";

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());
app.use(morgan("dev"));
dotenv.config();
connectDB();

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/", async (req, res) => {
  const value = await redisClient.get("key");
  return res.json({ msg: value });
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
