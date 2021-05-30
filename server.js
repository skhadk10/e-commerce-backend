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
// APIS
app.use("/api/v1/Clientuser", userRouter);
app.use("/api/v1/Clientlogin", ClientloginRouter);
app.use("/api/v1/productdisplay", productDisplayRouter);
app.use("/api/v1/Prodslug", productDisplayBySlugRouter);
app.use("/api/v1/Category", CategoryRouter);

app.use("/", (req, res) => {
  res.send("hellow there");
});

app.listen(PORT, (error) => {
  if (error) console.log(error);
  console.log(`server is running at http://localhost:${PORT}`);
});
