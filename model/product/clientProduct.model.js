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
export const getProductBySlug = (slugvalue) => {
  return new Promise(async (resolve, reject) => {
    try {
      const result = await ClientProdSchema.find({
        slug: { $in: slugvalue },
      });

      console.log("from model", result);
      resolve(result);
    } catch (error) {
      reject(error);
    }
  });
};

export const getcategoryByCatId = (category) => {
  return new Promise(async (resolve, reject) => {
    try {
      const result = await ClientProdSchema.find({
        categories: { $in: category },
      });

      console.log("from model", result);
      resolve(result);
    } catch (error) {
      reject(error);
    }
  });
};
