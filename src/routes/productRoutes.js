import express from "express";
import productCtrl from "../controllers/productCtrl.js";
const router = express.Router();

router.get("/", productCtrl.getProducts);
router.get("/:slug", productCtrl.getProduct);
router.post("/create", productCtrl.addProduct);

export default router;
