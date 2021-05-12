import mongoose from "mongoose";

const ClientSessionSchema = mongoose.Schema(
  {
    accessJWT: {
      type: String,
      require: true,
      default: "",
    },
    userId: {
      type: mongoose.Schema.ObjectId,
      default: null,
    },
  },
  {
    timestamp: true,
  }
);

const ClientSessionsSchema = mongoose.model(
  "ClientSession",
  ClientSessionSchema
);
export default ClientSessionsSchema;
