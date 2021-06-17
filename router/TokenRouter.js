import express from "express";

import {
  createAccessJWT,
  createRefreshJWT,
  verifyRefreshjwt,
} from "../helper/jwt.helper.js";

import { getUserByEmailAndRefreshJWT } from "../model/user/user.model.js";

const router = express.Router();

router.all("*", (req, res, next) => {
  next();
});

router.get("/", async (req, res) => {
  console.log(req.body);
  try {
    if (authorization) {
      // call the function to get the accessjwt

      // 1. verify storeRefreshJwt
      const { authorization } = req.headers;
      const { email } = await verifyRefreshjwt(authorization);

      // 3. find out the user who the code belongs too

      if (email) {
        // 2. check if it is in the database

        const user = await getUserByEmailAndRefreshJWT({
          email,
          refreshJWT: authorization,
        });
      }

      if (user._id) {
        const tokenExp = user.refreshJWT.addedAt;
        tokenExp.setDate(
          tokenExp.getDate() + +process.env.JWT_REFRESH_SECRECT_EXP_DAY
        );
        const today = Date.now();
        // check if the token is still valid

        if (tokenExp > today) {
          // 4. create new accessjwt and store in the session table in db
          const accessJwt = await createAccessJWT(email, user._id);
          console.log(accessJwt);
          return res.json({
            status: "success",
            message: "here is your new accessjwt",
            accessJwt,
          });
        }
      }
    }
    res.status(403).json({
      status: "error",
      message: "unathorized",
    });
  } catch (error) {
    throw new Error(error.message);
  }
});

export default router;
