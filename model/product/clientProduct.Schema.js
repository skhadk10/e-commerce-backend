import mongoose from "mongoose";

const ClientProductSchema = mongoose.Schema(
  {
    status: {
      type: Boolean,
      require: true,
      default: false,
    },
    name: {
      type: String,
      require: true,
      default: "",
    },
    slug: {
      type: String,
      require: true,
      default: "",
    },
    price: {
      type: Number,
      require: true,
      default: "",
    },
    salePrice: {
      type: Number,
      require: true,
      default: "",
    },
    saleEndDate: {
      type: Date,
      default: "",
    },
    qty: {
      type: Number,
      require: true,
      default: "",
    },
    description: {
      type: String,
      require: true,
      default: "",
    },
    thumbnail: {
      type: String,
    },
    images: {
      type: Array,
    },
    categories: {
      type: Array,
    },
  },
  {
    timestamp: true,
  }
);
const ClientProdSchema = mongoose.model("Product", ClientProductSchema);
export default ClientProdSchema;
