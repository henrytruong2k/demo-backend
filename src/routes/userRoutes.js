import express from "express";
import User from "../models/userModel.js";
import { verifyToken } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", async (req, res) => {
  const users = await User.find();
  return res.json(users);
});
router.get("/dashboard", verifyToken, (req, res) => {
  return res.json({ status: true, message: "Hello from dashboard." });
});

export default router;
