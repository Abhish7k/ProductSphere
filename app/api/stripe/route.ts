import { NextResponse, NextRequest } from "next/server";

import Stripe from "stripe";

import { db } from "@/lib/db";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: "2024-10-28.acacia",
});

const webhookSigningSecret = process.env
  .STRIPE_WEBHOOK_SIGNING_SECRET as string;

const handlePremiumSubscription = async (event: Stripe.Event) => {
  const session = event.data.object as Stripe.Checkout.Session;
  const email = session.customer_email as string;

  if (!email) {
    return;
  }

  const user = await db.user.findUnique({
    where: {
      email: email,
    },
  });

  if (user) {
    await db.user.update({
      where: { id: user.id },
      data: { isPremium: true },
    });

    console.log(`User with email: ${email} updated to premium`);
  } else {
    console.log(`User with email: ${email} not found`);
  }
};

const handleCancelledSubscription = async (event: Stripe.Event) => {
  const subscription = event.data.object as Stripe.Subscription;
  const customerId = subscription.customer as string;

  try {
    const customerResponse = await stripe.customers.retrieve(customerId);

    if (!("email" in customerResponse)) {
      console.log(
        `Customer not found or has been deleted for customer ID ${customerId}.`
      );
      return;
    }

    const customerEmail = customerResponse.email;

    if (!customerEmail) {
      console.log(`Customer email not found for customer ID ${customerId}.`);
      return;
    }

    // Find user by email and set isPremium to false
    const user = await db.user.findFirst({
      where: { email: customerEmail },
    });

    if (user) {
      await db.user.update({
        where: { id: user.id },
        data: { isPremium: false },
      });
      console.log(`User ${customerEmail} updated to non-premium.`);
    } else {
      console.log(`User with email ${customerEmail} not found.`);
    }
  } catch (error: any) {
    console.error(`Error handling cancelled subscription: ${error.message}`);
  }
};

export async function POST(req: NextRequest) {
  const body = await req.text();

  const signature = req.headers.get("stripe-signature") as string;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      webhookSigningSecret
    );
  } catch (error: any) {
    console.log("Error: ", error);

    return new NextResponse(`Webhook Error: ${error.message}`, {
      status: 400,
    });
  }

  console.log(`Webhook recieved: ${event.id}: ${event.type}`);

  // create subscription
  if (event.type === "checkout.session.completed") {
    await handlePremiumSubscription(event);
  }

  // cancelled subscription
  if (event.type === "customer.subscription.deleted") {
    await handleCancelledSubscription(event);
  }

  return new NextResponse(null, { status: 200 });
}
