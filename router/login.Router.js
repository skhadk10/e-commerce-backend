import express from "express";
import { comparePassword } from "../helper/bycrpt.js";
import { loginValidation } from "../middleware/formvalidation.js";
import { getUserByEmail } from "../user/user.model.js";
const router = express.Router();

router.all("*", (req, res, next) => {
  next();
});

// router.post("/", newUservalidation, async (req, res) => {
//   try {
//     const { email, password } = req.body;
//     const user = await getUserByEmail(email);
//     console.log(user);
//     console.log(user);
//     if (!user._id) {
//       return res.json({
//         status: "error",
//         message: "fail there is no email",
//       });
//     }

//     const dbmashPass = user.password;
//     const result = await comparePassword(password, dbmashPass);
//     if (!result) {
//       return res.json({
//         status: "error",
//         message: "invalid login",
//       });
//     }

//     res.json({
//       status: "success",
//       message: "welcome to the page",
//       result,
//     });
//   } catch (error) {
//     throw new Error(error.message);
//   }
// });
router.post("/", loginValidation, async (req, res) => {
  try {
    //1.get and destructure email,password from  frontend
    const { email, password } = req.body;
    // 2. get the email from database and wait
    const user = await getUserByEmail(email);
    // 3. if user._id is not valid run error
    if (!user?._id) {
      return res.status(403).json({
        status: "error",
        message: "fail no email is there",
      });
    }
    // 4. compare the new encrypted password with login password . if they are same then return success, invalid if not
    // user.password is password from database which we store when
    const dbMashPass = user.password;
    const result = await comparePassword(password, dbMashPass);
    user.password = undefined;
    user.refreshJWT = undefined;
    if (!result) {
      return res.json({
        status: "error",
        message: "Invalid login details",
      });
    }

    // create accessJWT
    // const accessJWT = await createAccessJWT(user.email, user._id);
    // const refreshJWT = await createRefreshJWT(user.email, user._id);

    res.json({
      status: "success",
      message: "login success",
      user,
      // accessJWT,
      // refreshJWT,
    });
  } catch (error) {
    throw new Error(error.message);
  }
});
export default router;
