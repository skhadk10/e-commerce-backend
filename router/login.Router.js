import express from "express";
import { comparePassword } from "../helper/bycrpt.js";
import { createAccessJWT, createRefreshJWT } from "../helper/jwt.helper.js";
import { loginValidation } from "../middleware/formvalidation.js";
import { getUserByEmail } from "../user/user.model.js";
const router = express.Router();

router.all("*", (req, res, next) => {
  next();
});

router.post("/", loginValidation, async (req, res) => {
  console.log(req.body);
  try {
    const { email, password } = req.body;
    const user = await getUserByEmail(email);
    console.log(user);

    if (!user._id) {
      return res.json({
        status: "error",
        message: "fail there is no email",
      });
    }

    const dbmashPass = user.password;
    const result = await comparePassword(password, dbmashPass);
    user.password = undefined;
    if (!result) {
      return res.json({
        status: "error",
        message: "invalid login",
      });
    }

    const accessJWT = await createAccessJWT(user.email, user._id);
    const refreshJWT = await createRefreshJWT(user.email, user._id);
    res.json({
      status: "success",
      message: "welcome to the page",
      user,
      accessJWT,
      refreshJWT,
    });
  } catch (error) {
    throw new Error(error.message);
  }
});
export default router;
