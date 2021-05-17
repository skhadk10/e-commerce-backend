import ClientProdSchema from "./clientProduct.Schema.js";

export const getProductById = (_id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const result = await ClientProdSchema.findById(_id);
      resolve(result);
    } catch (error) {
      reject(error);
    }
  });
};
