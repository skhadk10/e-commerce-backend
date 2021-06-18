import CheckoutSchema from "./checkout.Schema.js";

export const CheckOutDetail = (userObj) => {
  return new Promise((resolve, reject) => {
    try {
      CheckoutSchema(userObj)
        .save()
        .then((data) => resolve(data))
        .catch((error) => reject(error));
    } catch (error) {
      reject(error);
    }
  });
};
