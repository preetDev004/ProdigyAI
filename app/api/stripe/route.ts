import { auth, currentUser } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import prismadb from "@/lib/prismadb";
import { absoluteUrl } from "@/lib/utils";

const settingsUrl = absoluteUrl("/settings");

export const GET = async () => {
  try {
    const { userId } = auth();
    const user = await currentUser();
    if (!userId || !user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    const userSubscription = await prismadb.userSubscription.findUnique({
      where: {
        userId: userId,
      },
    });
    if (userSubscription && userSubscription.stripeCustomerId) {
      // in this case, Redirect user to the billing page to manage subscription!
      const stripeSession = await stripe.billingPortal.sessions.create({
        customer: userSubscription.stripeCustomerId,
        return_url: settingsUrl,
      });
      return new NextResponse(JSON.stringify({ url: stripeSession.url }));
    }
    const stripeSession = await stripe.checkout.sessions.create({
      success_url: settingsUrl,
      cancel_url: settingsUrl,
      payment_method_types: ["card"],
      mode: "subscription",
      billing_address_collection: "auto",
      customer_email: user.emailAddresses[0].emailAddress,
      line_items: [
        {
          price_data: {
            currency: "USD",
            product_data: {
              name: "ProdigyAI Pro",
              description: "Unlimited AI Generation",
            },
            unit_amount: 2000,
            recurring: {
              interval: "month",
            },
          },
          quantity: 1,
        },
      ],
      // Metadata will be used after the user completes the payment. To grab the info of the user
      // who started the subscription.
      metadata:{
        userId:userId,

      }
    });
    return new NextResponse(JSON.stringify({ url: stripeSession.url }));
  } catch (error:any) {
    console.log("[STRIPE_ERROR]", error.message);
    return new NextResponse("Internal erro", { status: 500 });
  }
};
