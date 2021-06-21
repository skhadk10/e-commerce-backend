import dotenv from "dotenv";
dotenv.config();

import express from "express";
const router = express.Router();
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_PRIVATE_KEY);
import { v4 as uuidv4 } from "uuid";
uuidv4();

router.all("*", (req, res, next) => {
  next();
});

router.post("/", (req, res) => {
  // recieve data client side
  const { token, product } = req.body;

  const idempotency_key = uuidv4(); // protect from double charge

  return (
    stripe.customers
      .create({
        email: token.email,
        source: token.id, // talk with frontend and match the id ..
      })
      // if id is match then ...
      .then(
        (customer) => {
          stripe.charges.create({
            customer: customer.id,
            amount: product.total,
            currency: "aud",
            description: "New order payment",
            receipt_email: token.email,
          });
        },
        { idempotency_key }
      )
      .then((result) => {
        res.send({
          status: "success",
          message: "payment has been taken ",
          result,
        });
      })
      .catch((error) => {
        console.log(error);
        res.send({
          status: "error",
          mesaage: "Error, unable to process the payment ",
        });
      })
  );
});

export default router;
