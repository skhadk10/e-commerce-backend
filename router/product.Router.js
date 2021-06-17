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

router.get("/", async (req, res) => {
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
// router.get("/:slug", async (req, res) => {
//   console.log("hello from router");
//   try {
//     const { slug } = req.params;
//     const product = await getProductBySlug(slug);
//     console.log(product);
//     if (product) {
//       return res.json({
//         status: "success",
//         message: "fetch success",
//         product,
//       });
//     }
//     res.json({
//       status: "fail",
//       message: "fetch unsuccess",
//       product,
//     });
//   } catch (error) {
//     throw new Error(error.message);
//   }
// });

export default router;
