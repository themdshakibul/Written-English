import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { CheckCircle, DollarSign, FileText, Hash } from "lucide-react";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

type Props = {
  searchParams: Promise<{ session_id?: string }>;
};

export default async function PaymentSuccessPage({ searchParams }: Props) {
  const { session_id } = await searchParams;

  let itemName = "your item";
  let amount = "";
  let paymentStatus = "completed";
  let transactionId = "";

  if (session_id) {
    try {
      const checkout = await stripe.checkout.sessions.retrieve(session_id, {
        expand: ["line_items"],
      });
      amount = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: (checkout.currency || "usd").toUpperCase(),
      }).format((checkout.amount_total || 0) / 100);
      itemName = checkout.metadata?.itemName || checkout.line_items?.data?.[0]?.description || itemName;
      paymentStatus = checkout.payment_status || "completed";
      transactionId = checkout.payment_intent as string || "";
    } catch {
      // Session lookup failed — show generic success
    }
  }

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Navbar />
      <main className="flex-1 flex items-center justify-center py-12 px-4">
        <Card className="w-full max-w-md border-border/60 shadow-lg">
          <CardHeader className="text-center">
            <CheckCircle className="h-16 w-16 text-emerald-500 mx-auto mb-2" />
            <CardTitle className="text-2xl font-bold">Payment Successful!</CardTitle>
            <CardDescription>Thank you for your purchase.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-5">
            <div className="rounded-xl bg-muted/50 p-4 space-y-3 text-sm">
              <div className="flex items-center gap-3">
                <FileText className="h-4 w-4 text-muted-foreground shrink-0" />
                <span className="text-muted-foreground">Item:</span>
                <span className="font-medium ml-auto truncate">{itemName}</span>
              </div>
              {amount && (
                <div className="flex items-center gap-3">
                  <DollarSign className="h-4 w-4 text-muted-foreground shrink-0" />
                  <span className="text-muted-foreground">Amount:</span>
                  <span className="font-medium ml-auto">{amount}</span>
                </div>
              )}
              <div className="flex items-center gap-3">
                <CheckCircle className="h-4 w-4 text-emerald-500 shrink-0" />
                <span className="text-muted-foreground">Status:</span>
                <span className="font-medium text-emerald-600 dark:text-emerald-400 ml-auto capitalize">{paymentStatus}</span>
              </div>
              {transactionId && (
                <div className="flex items-center gap-3">
                  <Hash className="h-4 w-4 text-muted-foreground shrink-0" />
                  <span className="text-muted-foreground">Transaction:</span>
                  <span className="font-mono text-xs ml-auto truncate max-w-[180px]">{transactionId}</span>
                </div>
              )}
            </div>

            <Button asChild className="w-full">
              <Link href="/dashboard/items/manage">View My Items</Link>
            </Button>
            <Button variant="outline" asChild className="w-full">
              <Link href="/explore">Continue Exploring</Link>
            </Button>
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  );
}
