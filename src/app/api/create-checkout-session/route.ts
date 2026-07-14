import connectToDatabase from "@/lib/mongodb";
import Item from "@/models/Item";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(req: Request) {
  try {
    const session = await auth.api.getSession({ headers: await headers() });
    if (!session) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    const { itemId } = await req.json();
    if (!itemId) {
      return NextResponse.json({ error: "Missing itemId" }, { status: 400 });
    }

    await connectToDatabase();
    const item = await Item.findById(itemId).lean() as Record<string, unknown> | null;
    if (!item) {
      return NextResponse.json({ error: "Item not found" }, { status: 404 });
    }

    const checkout = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: item.title as string,
              description: item.shortDescription as string,
              images: [item.imageUrl as string],
            },
            unit_amount: Math.round((item.price as number) * 100),
          },
          quantity: 1,
        },
      ],
      metadata: {
        itemId: String(item._id),
        itemName: item.title as string,
        userId: session.user.id,
        userEmail: session.user.email,
      },
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/payment/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/payment/cancel`,
    });

    return NextResponse.json({ url: checkout.url });
  } catch (err) {
    console.error("Stripe checkout error:", err);
    return NextResponse.json({ error: "Failed to create checkout session" }, { status: 500 });
  }
}
