import express from "express";
import {validatePromoCode, addPromoCode,listPromoCodes, deletePromoCode } from "../controllers/SaleController.js";

const router = express.Router();

router.post("/add-promo", addPromoCode);

router.get("/list", listPromoCodes);
router.post("/validate-promo", validatePromoCode);


router.delete("/delete/:id", deletePromoCode);
export default router;
