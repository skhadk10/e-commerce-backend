import express from "express";
import {
  getcategoryByCatId,
  getProduct,
  // getProductBySlug,
} from "../model/product/clientProduct.model.js";

const router = express.Router();

router.all("*", (req, res, next) => {
  next();
});

router.get("/:_id?", async (req, res) => {
  const { _id } = req.params;
  try {
    const result = await getcategoryByCatId(_id);
  
    res.json({
      status: "success",
      message: "fetch success",
      result,
    });
  } catch (error) {
    throw new Error(error.message);
  }
});
export default router;
