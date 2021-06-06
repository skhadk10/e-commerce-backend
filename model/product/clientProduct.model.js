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

export const getcategoryByCatId = (_id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const result = await ClientProdSchema.find({
        categories: { $in: _id },
      });

      console.log("from model", result);
      resolve(result);
    } catch (error) {
      reject(error);
    }
  });
};
export const deleteSingleCartItem = (_id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const result = await ClientProdSchema.findByIdAndDelete({
        _id 
      });

      console.log("from model", result);
      resolve(result);
    } catch (error) {
      reject(error);
    }
  });
};
