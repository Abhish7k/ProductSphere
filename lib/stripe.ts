"use server";

import { Stripe } from "stripe";
import { auth } from "@/auth";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

const priceId = process.env.STRIPE_PRICE_ID as string;

export const createCheckoutSession = async ({ email }: { email: string }) => {
  try {
    const session = await stripe.checkout.sessions.create({
      customer_email: email,
      payment_method_types: ["card"],
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      mode: "subscription",
      success_url: `http://localhost:3000/payment/success`,
      cancel_url: `http://localhost:3000/payment/failed`,
    });

    return session;
  } catch (error) {
    console.log(error);
    throw new Error("Error creating stripe checkout session");
  }
};
