import express from "express";
import {
  getProduct,
  getProductBySlug,
} from "../model/product/clientProduct.model.js";

const router = express.Router();

router.all("*", (req, res, next) => {
  next();
});

router.get("/:slug", async (req, res) => {
  console.log("hello from router");
  try {
    let { slug } = req.params;
    const product = await getProductBySlug(slug);
    console.log(product);
    if (slug) {
      return res.json({
        status: "success",
        message: "fetch success",
        product,
      });
    }
    res.json({
      status: "fail",
      message: "fetch unsuccess",
    });
  } catch (error) {
    throw new Error(error.message);
  }
});
export default router;
