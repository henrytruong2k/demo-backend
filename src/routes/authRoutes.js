import express from "express";
import userCtrl from "../controllers/authCtrl.js";
import {
  verifyRefreshToken,
  verifyToken,
} from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/register", userCtrl.register);
router.post("/login", userCtrl.login);
router.post("/logout", verifyToken, userCtrl.logout);
router.post("/refresh-token", verifyRefreshToken, userCtrl.getToken);

export default router;
