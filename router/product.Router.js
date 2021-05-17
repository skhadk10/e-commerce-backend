import express from "express";
import { getProductById } from "../model/product/clientProduct.model.js";

const router = express.Router();

router.all("*", (req, res, next) => {
  next();
});

router.get("/:_id?", async (req, res) => {
  console.log(req.params);
  try {
    const { _id } = req.params;
    const user = await getProductById(_id);
    console.log(user);

    if (user._id) {
      return res.json({
        status: "success",
        message: "fetch success",
        user,
      });
    }
  } catch (error) {
    throw new Error(error.message);
  }
});
export default router;
