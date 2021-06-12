import ClientSessionsSchema from "./ClientSession.schema.js";

export const storeAccessJwt = async (newSession) => {
  try {
    const result = await ClientSessionsSchema(newSession).save();
    return result;
  } catch (error) {
    console.log(error);
  }
};
export const getAccessByToken = async (accessJWT) => {
  try {
    const result = await ClientSessionsSchema.findOne({ accessJWT });
    return Promise.resolve(result);
  } catch (error) {
    return Promise.resolve(false);
  }
};

export const deleteAccessTokenById = (userId) => {
  try {
    SessionSchema.findOneAndDelete( {userId} )
    .then((data)=>console.log(data)) 
    .catch((error)=>console.log(error)) 
  } catch (error) {
   console.log(error);
  }
};
