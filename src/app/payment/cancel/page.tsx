import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { XCircle } from "lucide-react";

export default function PaymentCancelPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Navbar />
      <main className="flex-1 flex items-center justify-center py-12 px-4">
        <Card className="w-full max-w-md text-center border-border/60 shadow-lg">
          <CardHeader>
            <XCircle className="h-16 w-16 text-destructive mx-auto mb-2" />
            <CardTitle className="text-2xl font-bold">Payment Cancelled</CardTitle>
            <CardDescription>Your payment was not processed. No charges were made.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button asChild className="w-full">
              <Link href="/explore">Browse Items</Link>
            </Button>
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  );
}
