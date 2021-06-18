import express from "express";

import { newUservalidation } from "../middleware/formvalidation.js";
import { CheckOutDetail } from "../model/checkout/checkout.model.js";

const router = express.Router();

router.all("*", (req, res, next) => {
  next();
});

router.post("/", newUservalidation, async (req, res) => {
  try {
    const result = await CheckOutDetail(req.body);
    if (!result?._id) {
      return res.json({ status: "error", message: "invalid login detail" });
    }
  } catch (error) {
    throw new Error(error.message);
  }
});

export default router;
