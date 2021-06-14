import express from "express";
import { comparePassword } from "../helper/bycrpt.js";
import { createAccessJWT, createRefreshJWT, verifyRefreshjwt } from "../helper/jwt.helper.js";
import { loginValidation } from "../middleware/formvalidation.js";
import { getUserByEmail,getUserByEmailAndRefreshJWT } from "../model/user/user.model.js";

const router = express.Router();

router.all("*", (req, res, next) => {
  next();
});

router.get("/",  async (req, res) => {
  console.log(req.body);
  try {
  
    if (authorization){
      // call the function to get the accessjwt

      // 1. verify storeRefreshJwt
    const {authorization } = req.headers;
      const {email}= await verifyRefreshjwt(authorization)

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
router.post("/", async (req, res) => {

  try {
    const { token } = req.body;
    console.log("userprofile",token);
    if (token) {
      const { email } = await verifyRefreshjwt(token);
      if (email) {
        const user = await getUserByEmail(email);
        user._id &&
          res.json({
            status: "user detail here",
            message: "welcome to the user page",
            user,
          });
      }
    }
  } catch (error) {
    res.json({
      status: "error",
      message: "user not here",
    });
  }
});
export default router;
