import express from "express";
import { getProduct } from "../model/product/clientProduct.model.js";

const router = express.Router();

router.all("*", (req, res, next) => {
  next();
});

router.get("/", async (req, res) => {
  console.log("hello from router");
  try {
    const product = await getProduct();

    if (product) {
      return res.json({
        status: "success",
        message: "fetch success",
        product,
      });
    }

    res.json({
      status: "fail",
      message: "fetch unsuccess",
      product,
    });
  } catch (error) {
    throw new Error(error.message);
  }
});
export default router;
