import ClientProdSchema from "./clientProduct.Schema.js";

export const getProduct = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const result = await ClientProdSchema.find();
      console.log("from model", result);
      resolve(result);
    } catch (error) {
      reject(error);
    }
  });
};
