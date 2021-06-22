import express from "express";
const app = express();

import dotenv from "dotenv";
dotenv.config();

import cors from "cors";
app.use(cors());

import morgan from "morgan";
app.use(morgan("tiny"));
// parse application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: false }));

// parse application/json
app.use(express.json());
const PORT = process.env.PORT || 8000;

import mongoClient from "./config/db.js";
mongoClient();

// LOAD ROUTERS
import userRouter from "./router/user.Router.js";
import ClientloginRouter from "./router/login.Router.js";
import productDisplayRouter from "./router/product.Router.js";
import productDisplayBySlugRouter from "./router/slugproduct.Router.js";
import CategoryRouter from "./router/CategoryRouter.js";
import CategoryProductRouter from "./router/CategoryProductRouter.js";
import TokenRouter from "./router/TokenRouter.js";
import LogOutRouter from "./router/LogOut.js";
import userProileRouter from "./router/UserProfile.js";
import CheckOutRouter from "./router/CheckOutRouter.js";
import PaymentRouter from "./router/PaymentRouter.js";
// APIS
app.use("/api/v1/Clientuser", userRouter);
app.use("/api/v1/Clientlogin", ClientloginRouter);
app.use("/api/v1/productdisplay", productDisplayRouter);
app.use("/api/v1/Categoryproductdisplay", CategoryProductRouter);
app.use("/api/v1/Prodslug", productDisplayBySlugRouter);
app.use("/api/v1/Category", CategoryRouter);
app.use("/api/v1/token", TokenRouter);
app.use("/api/v1/profile", userProileRouter);
app.use("/api/v1/logOut", LogOutRouter);
app.use("/api/v1/checkout", CheckOutRouter);
app.use("/api/v1/payment", PaymentRouter);

app.use("/", (req, res) => {
  res.send("hellow there");
});

app.listen(PORT, (error) => {
  if (error) console.log(error);
  console.log(`server is running at http://localhost:${PORT}`);
});
