import jwt from "jsonwebtoken";

export const createAccessJWT = (email, _id) => {
  return new Promise((resolve, reject) => {
    try {
      var accessJWT = jwt.sign({ email }, process.env.JWT_ACCESS_SECRET, {
        expiresIn: "20m",
      });
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
      resolve(refreshJWT);
    } catch (error) {
      reject(error);
    }
  });
};
