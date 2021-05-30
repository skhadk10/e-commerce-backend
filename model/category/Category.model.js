import CategorySchema from "./Category.schema.js";

export const getCategories = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const result = await CategorySchema.find();
      resolve(result);
    } catch (error) {
      reject(error);
    }
  });
};
export const deleteCategories = (catArg) => {
  return new Promise(async (resolve, reject) => {
    try {
      const result = await CategorySchema.deleteMany({ _id: { $in: catArg } });
      resolve(result);
    } catch (error) {
      reject(error);
    }
  });
};
