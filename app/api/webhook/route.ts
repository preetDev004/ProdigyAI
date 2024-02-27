// creating a stripe webhook

import Stripe from "stripe";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import prismadb from "@/lib/prismadb";
import { stripe } from "@/lib/stripe";

export const POST = async (req: Request) => {
  const body = await req.text();
  const signature = headers().get("Stripe-Signature") as string;

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOKS_SECRET!
    );
  } catch (error: any) {
    return new NextResponse(`[WEBHOOK_ERROR]: ${error.message}`, {
      status: 400,
    });
  }
  // we mostly have two events either we have existing subscription (billing portal) or new subscription.
  const session = event.data.object as Stripe.Checkout.Session;

  if (event.type === "invoice.payment_succeeded") {
    const subscription = await stripe.subscriptions.retrieve(
      session.subscription as string
    );

    const existingSubscription = await prismadb.userSubscription.findUnique({
      where: {
        stripeSubscriptionId: subscription.id,
      },
    });
    if (existingSubscription) {
      console.log("--Worked--\n");
      await prismadb.userSubscription.update({
        where: {
          stripeSubscriptionId: subscription.id,
        },
        data: {
          stripePriceId: subscription.items.data[0].price.id,
          stripeCurrentPeriodEnd: new Date(
            subscription.current_period_end * 1000
          ),
        },
      });
    }
  }

  if (event.type === "checkout.session.completed") {
    const subscription = await stripe.subscriptions.retrieve(
      session.subscription as string
    );

    if (!session?.metadata?.userId) {
      // we dont know to whom this subscription belong
      return new NextResponse("User ID is required", { status: 400 });
    }
    // we cannot use clerk directly here because this hook will be running saprately from our
    // application. Hence, we passed userId in metadata to keep track!
    await prismadb.userSubscription.create({
      data: {
        userId: session?.metadata?.userId,
        stripeSubscriptionId: subscription.id,
        stripeCustomerId: subscription.customer as string,
        stripePriceId: subscription.items.data[0].price.id,
        stripeCurrentPeriodEnd: new Date(
          subscription.current_period_end * 1000
        ),
      },
    });
  }

  return new NextResponse(null, { status: 200 });
};
