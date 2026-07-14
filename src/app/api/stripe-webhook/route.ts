import connectToDatabase from "@/lib/mongodb";
import Payment from "@/models/Payment";
import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

export async function POST(req: Request) {
  const body = await req.text();
  const sig = req.headers.get("stripe-signature") || "";

  let event: Stripe.Event;

  try {
    if (endpointSecret) {
      event = stripe.webhooks.constructEvent(body, sig, endpointSecret);
    } else {
      event = JSON.parse(body);
    }
  } catch {
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const checkout = event.data.object as Stripe.Checkout.Session;
    const itemId = checkout.metadata?.itemId;
    const userId = checkout.metadata?.userId;
    const userEmail = checkout.metadata?.userEmail;
    const itemName = checkout.metadata?.itemName;

    if (itemId && userId) {
      await connectToDatabase();
      await Payment.create({
        itemId,
        itemName: itemName || "Unknown",
        userId,
        userEmail: userEmail || "",
        amount: (checkout.amount_total || 0) / 100,
        currency: checkout.currency || "usd",
        stripeSessionId: checkout.id,
        stripePaymentIntent: checkout.payment_intent as string || "",
        status: checkout.payment_status || "completed",
      });
    }
  }

  return NextResponse.json({ received: true });
}

export async function GET() {
  return NextResponse.json({ error: "Method not allowed" }, { status: 405 });
}
