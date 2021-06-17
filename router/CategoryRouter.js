import express from "express";
import { getCategories } from "../model/category/Category.model.js";

const router = express.Router();

router.all("*", (req, res, next) => {
  next();
});

router.get("/", async (req, res) => {

  try {
    const result = await getCategories(req.body);

    return res.json({
      status: "success",
      message: "fetch success",
      result,
    });
  } catch (error) {
    throw new Error(error.message);
  }
});

export default router;
