import express from "express";
const router = express.Router();

import { deleteRefreshTokenById } from "../model/user/User.model.js";
import { deleteAccessTokenById } from "../model/ClientSession/ClientSession.model.js";

router.post("/", async (req, res, next) => {

  try {
    const { _id } = req.body;
    console.log("from logout router", _id);
    deleteAccessTokenById(_id);
    deleteRefreshTokenById(_id);

    res.json({
      status: "success",
      message: "logout successfully",
    });
  } catch (error) {
    res.send({
      status: "error",
      message: "Invalid request",
    });
  }
});

export default router;
