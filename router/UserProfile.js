import express from "express";

import { verifyRefreshjwt } from "../helper/jwt.helper.js";

import { getUserByEmail } from "../model/user/user.model.js";

const router = express.Router();

router.all("*", (req, res, next) => {
  next();
});

router.post("/", async (req, res) => {
  console.log("from user router", req.body);
  try {
    // getting refresh token from localstorage(userAutoLogin) as we have detail of user inside token and checking if we have user detail inside token then verifyrefreshjwt and decode and get all detail of that users if we have email of that user
    const { token } = req.body;
    console.log("from token for userprofile", token);
    if (token) {
      const { email } = await verifyRefreshjwt(token);
      if (email) {
        const user = await getUserByEmail(email);
        user._id &&
          res.json({
            status: "success",
            message: "welcome to the user page",
            user,
          });
        return;
      }
    }
    res.json({
      status: "error",
      message: "user unavailable",
    });
  } catch (error) {
    res.json({
      status: "error",
      message: "user not here",
    });
  }
});
export default router;
