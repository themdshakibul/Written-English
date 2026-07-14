"use client";

import { useEffect, useState } from "react";
import { getUserPurchases } from "@/app/actions/itemActions";
import { ShoppingBag, Calendar, DollarSign, ExternalLink } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Container } from "@/components/ui/container";

interface Purchase {
  _id: string;
  itemId: string;
  itemName: string;
  amount: number;
  currency: string;
  createdAt: string;
  status: string;
}

export default function PurchasesPage() {
  const [purchases, setPurchases] = useState<Purchase[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getUserPurchases().then((data) => {
      setPurchases(data);
      setLoading(false);
    });
  }, []);

  const totalSpent = purchases.reduce((s, p) => s + p.amount, 0);

  return (
    <>
      <div className="border-b border-border bg-background">
        <Container className="py-10">
          <div className="flex items-center gap-3 mb-6">
            <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center shadow-sm">
              <ShoppingBag className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold tracking-tight">My Purchases</h1>
              <p className="text-muted-foreground text-sm mt-0.5">Digital assets you&apos;ve bought on Nexus.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Card className="border-border/60 shadow-sm">
              <CardHeader className="pb-2">
                <CardDescription>Total Purchases</CardDescription>
              </CardHeader>
              <CardContent>
                <CardTitle className="text-2xl">{purchases.length}</CardTitle>
              </CardContent>
            </Card>
            <Card className="border-border/60 shadow-sm">
              <CardHeader className="pb-2">
                <CardDescription>Total Spent</CardDescription>
              </CardHeader>
              <CardContent>
                <CardTitle className="text-2xl text-primary">
                  ${totalSpent.toLocaleString("en-US", { minimumFractionDigits: 2 })}
                </CardTitle>
              </CardContent>
            </Card>
            <Card className="border-border/60 shadow-sm">
              <CardHeader className="pb-2">
                <CardDescription>Last Purchase</CardDescription>
              </CardHeader>
              <CardContent>
                <CardTitle className="text-2xl">
                  {purchases.length > 0
                    ? new Date(purchases[0].createdAt).toLocaleDateString()
                    : "—"}
                </CardTitle>
              </CardContent>
            </Card>
          </div>
        </Container>
      </div>

      <Container className="py-10">
        {loading ? (
          <div className="flex items-center justify-center h-40">
            <p className="text-muted-foreground">Loading your purchases...</p>
          </div>
        ) : purchases.length === 0 ? (
          <Card className="border-border/60 shadow-sm">
            <CardContent className="flex flex-col items-center justify-center py-16 gap-4">
              <div className="h-16 w-16 rounded-full bg-muted flex items-center justify-center">
                <ShoppingBag className="h-8 w-8 text-muted-foreground" />
              </div>
              <div className="text-center">
                <CardTitle className="text-xl mb-1">No purchases yet</CardTitle>
                <CardDescription>Browse the marketplace to find something you love.</CardDescription>
              </div>
              <Button asChild className="mt-2 shadow-sm">
                <Link href="/explore">Explore Marketplace</Link>
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {purchases.map((purchase) => (
              <Card key={purchase._id} className="border-border/60 shadow-sm hover:shadow-md transition-shadow">
                <CardContent className="p-5">
                  <div className="flex items-center gap-5">
                    <div className="h-16 w-16 rounded-xl bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center shrink-0">
                      <DollarSign className="h-7 w-7 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-base truncate">{purchase.itemName}</h3>
                      <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-1.5 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1.5">
                          <Calendar className="h-3.5 w-3.5" />
                          {new Date(purchase.createdAt).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })}
                        </span>
                        <span className="flex items-center gap-1.5 font-medium text-primary">
                          <DollarSign className="h-3.5 w-3.5" />
                          {purchase.amount.toFixed(2)} {purchase.currency.toUpperCase()}
                        </span>
                      </div>
                    </div>
                    <Button variant="outline" size="sm" asChild className="shrink-0 shadow-sm">
                      <Link href={`/items/${purchase.itemId}`}>
                        <ExternalLink className="h-4 w-4 mr-1.5" />
                        View
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </Container>
    </>
  );
}
