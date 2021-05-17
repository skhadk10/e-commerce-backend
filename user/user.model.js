import ClientUsersSchema from "./user.Schema.js";

export const createUser = (userObj) => {
  return new Promise((resolve, reject) => {
    try {
      ClientUsersSchema(userObj)
        .save()
        .then((data) => resolve(data))
        .catch((error) => reject(error));
    } catch (error) {
      reject(error);
    }
  });
};
export const getUserByEmail = (email) => {
  return new Promise((resolve, reject) => {
    try {
      ClientUsersSchema.findOne({ email })
        .then((data) => resolve(data))
        .catch((error) => reject(error));
    } catch (error) {
      reject(error);
    }
  });
};
export const storeRefresJWT = (_id, token) => {
  return new Promise((resolve, reject) => {
    try {
      ClientUsersSchema.findOneAndUpdate({ _id },
        {
         $set:{"refreshJWT.token":token,"refreshJWT.addedAt":Date.now()}
      },
      {new:true}
       )
        .then((data) => resolve(data))
        .catch((error) => reject(error));
    } catch (error) {
      reject(error);
    }
  });
};
