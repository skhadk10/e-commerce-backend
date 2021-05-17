import mongoose from "mongoose";
const ClientUserSchema = mongoose.Schema(
  {
    fName: {
      type: String,
      require: true,
      default: "",
    },
    lName: {
      type: String,
      require: true,
      default: "",
    },
    role: {
      type: String,
      require: true,
      default: "guest",
    },
    email: {
      type: String,
      require: true,
      unique: true,
      index: 1,
    },
    password: {
      type: String,
      require: true,
      default: "",
    },
    refreshJWT:{
      token:{
        type: String,
        require: true,
        default:""
      },
      addedAt:{
        type:Date,
        require:true,
        default:Date.now()
      }
    }
  },
  {
    timestamp: true,
  }
);
const ClientUsersSchema = mongoose.model("Client_User", ClientUserSchema);

export default ClientUsersSchema;
