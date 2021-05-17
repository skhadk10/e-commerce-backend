import jwt from "jsonwebtoken";
import {

  storeAccessJwt,
} from "../ClientSession/ClientSession.model.js";
import { storeRefresJWT } from "../user/user.model.js";

export const createAccessJWT = (email, _id) => {
  return new Promise((resolve, reject) => {
    try {
      var accessJWT = jwt.sign({ email }, process.env.JWT_ACCESS_SECRET, {
        expiresIn: "20m",
      });
      // creating new table and storing accessJWT and user_id. its storing the accessJWT of individual user email and id in database
      const newSession = {
        accessJWT,
        userId: _id,
      };
      // save new token in session of database
      storeAccessJwt(newSession);
      resolve(accessJWT);
    } catch (error) {
      reject(error);
    }
  });
};


export const createRefreshJWT = (email, _id) => {
  return new Promise((resolve, reject) => {
    try {
      var refreshJWT = jwt.sign({ email }, process.env.JWT_REFRESH_SECRET, {
        expiresIn: "20d",
      });
      storeRefresJWT(_id, refreshJWT);
      resolve(refreshJWT);
    } catch (error) {
      reject(error);
    }
  });
};
export const verifyAccessjwt=accessJWT=>{
  return new Promise((resolve,reject)=>{
    try {
      const decoded = jwt.verify(accessJWT, process.env.JWT_ACCESS_SECRECT);
      resolve(decoded);
    } catch (error) {
      reject(false);
    }
  })
}

export const verifyRefreshjwt = (refreshJWT) => {
  return new Promise((resolve, reject) => {
    try {
      const decoded = jwt.verify(refreshJWT, process.env.JWT_REFRESH_SECRECT);
      resolve(decoded);
    } catch (error) {
      reject(false);
    }
  });
};