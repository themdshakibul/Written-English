"use client";

import { useEffect, useState } from "react";
import { getAllPurchases } from "@/app/actions/itemActions";
import { ShoppingBag, Calendar, DollarSign, ExternalLink } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Container } from "@/components/ui/container";

export default function AdminPurchasesPage() {
  const [purchases, setPurchases] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAllPurchases().then((data) => {
      setPurchases(data);
      setLoading(false);
    });
  }, []);

  return (
    <>
      <div className="border-b border-border bg-background">
        <Container className="py-10">
          <div className="flex items-center gap-3 mb-6">
            <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center shadow-sm">
              <ShoppingBag className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold tracking-tight">All Purchases</h1>
              <p className="text-muted-foreground text-sm mt-0.5">Every purchase across the marketplace.</p>
            </div>
          </div>
        </Container>
      </div>

      <Container className="py-10">
        {loading ? (
          <p className="text-muted-foreground">Loading purchases...</p>
        ) : purchases.length === 0 ? (
          <Card className="border-border/60 shadow-sm">
            <CardContent className="flex flex-col items-center py-16 gap-4">
              <div className="h-16 w-16 rounded-full bg-muted flex items-center justify-center">
                <ShoppingBag className="h-8 w-8 text-muted-foreground" />
              </div>
              <CardTitle className="text-xl">No purchases yet</CardTitle>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {purchases.map((p) => (
              <Card key={p._id} className="border-border/60 shadow-sm">
                <CardContent className="p-5">
                  <div className="flex items-center gap-5">
                    <div className="h-14 w-14 rounded-xl bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center shrink-0">
                      <DollarSign className="h-6 w-6 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold truncate">{p.itemName}</h3>
                      <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-1.5 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1.5">
                          <Calendar className="h-3.5 w-3.5" />
                          {new Date(p.createdAt).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
                        </span>
                        <span className="flex items-center gap-1.5 font-medium text-primary">
                          <DollarSign className="h-3.5 w-3.5" />
                          {p.amount.toFixed(2)} {p.currency.toUpperCase()}
                        </span>
                        <span className="text-xs text-muted-foreground truncate max-w-[200px]">{p.userEmail || p.userId}</span>
                      </div>
                    </div>
                    <Button variant="outline" size="sm" asChild className="shrink-0 shadow-sm">
                      <Link href={`/items/${p.itemId}`}><ExternalLink className="h-4 w-4 mr-1.5" />View</Link>
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
