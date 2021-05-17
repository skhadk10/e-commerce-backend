import express from "express";
import { hashPassword } from "../helper/bycrpt.js";
import { newUservalidation } from "../middleware/formvalidation.js";
import { createUser } from "../model/user/user.model.js";

const router = express.Router();

router.all("*", (req, res, next) => {
  next();
});

router.post("/", newUservalidation, async (req, res) => {
  try {
    //1.get and destructure password from  frontend
    const { password } = req.body;

    // 2. encrypting password by bycrypt.hash
    const hashPass = await hashPassword(password);
    // checking gareko data  haru databases ma store hunxa ki nai vanyera(spread operator ...req.body= jati aako data lai yesma rakh )

    const newuser = {
      ...req.body,
      password: hashPass,
    };
    // jun data aako xa tyo data lai createuser jun user.model.js ma xa tesle database ma save garxa
    const result = await createUser(newuser);

    // yedi result xa vanye success ra data dekha
    if (result?._id) {
      return res.json({
        status: "success",
        message: "New Account created successfully",
        result,
      });
    }
    res.json({ status: "error", message: "invalid login detail" });
  } catch (error) {
    if (error.message.includes("duplicate key error collection")) {
      return res.json({ status: "error", message: "This email already exist" });
    }
    throw new Error(error.message);
  }
});

export default router;
