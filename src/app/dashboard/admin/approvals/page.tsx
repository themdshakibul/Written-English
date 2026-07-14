"use client";

import { useEffect, useState } from "react";
import { getPendingItems, approveItem, rejectItem } from "@/app/actions/itemActions";
import { Shield, Check, X, Clock, DollarSign } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Container } from "@/components/ui/container";

export default function AdminApprovalsPage() {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchItems = () => {
    getPendingItems().then((data) => {
      setItems(data);
      setLoading(false);
    });
  };

  useEffect(() => { fetchItems() }, []);

  const handleApprove = async (id: string) => {
    await approveItem(id);
    fetchItems();
  };

  const handleReject = async (id: string) => {
    if (confirm("Reject and delete this item?")) {
      await rejectItem(id);
      fetchItems();
    }
  };

  return (
    <>
      <div className="border-b border-border bg-background">
        <Container className="py-10">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center shadow-sm">
              <Clock className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Approvals</h1>
              <p className="text-muted-foreground text-sm mt-0.5">Review and approve items submitted by users.</p>
            </div>
          </div>
        </Container>
      </div>

      <Container className="py-10">
        {loading ? (
          <p className="text-muted-foreground">Loading pending items...</p>
        ) : items.length === 0 ? (
          <Card className="border-border/60 shadow-sm">
            <CardContent className="flex flex-col items-center py-16 gap-4">
              <div className="h-16 w-16 rounded-full bg-muted flex items-center justify-center">
                <Shield className="h-8 w-8 text-muted-foreground" />
              </div>
              <CardTitle className="text-xl">All clear</CardTitle>
              <CardDescription>No pending items to review.</CardDescription>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {items.map((item) => (
              <Card key={item._id} className="border-border/60 shadow-sm">
                <CardContent className="p-5">
                  <div className="flex items-start gap-5">
                    <div className="relative h-16 w-16 rounded-xl overflow-hidden bg-muted shrink-0">
                      <Image src={item.imageUrl} alt={item.title} fill className="object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <h3 className="font-semibold text-base">{item.title}</h3>
                          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-1 text-sm text-muted-foreground">
                            <Badge variant="secondary" className="text-xs">{item.category}</Badge>
                            <span className="flex items-center gap-1 font-medium text-primary">
                              <DollarSign className="h-3.5 w-3.5" />{item.price}
                            </span>
                            <span className="text-xs">by {item.userId?.slice(0, 12)}...</span>
                          </div>
                          <p className="text-sm text-muted-foreground mt-2 line-clamp-2">{item.shortDescription}</p>
                        </div>
                        <div className="flex gap-2 shrink-0">
                          <Button size="sm" onClick={() => handleApprove(item._id)} className="shadow-sm">
                            <Check className="h-4 w-4 mr-1" /> Approve
                          </Button>
                          <Button variant="outline" size="sm" onClick={() => handleReject(item._id)} className="shadow-sm">
                            <X className="h-4 w-4 mr-1" /> Reject
                          </Button>
                        </div>
                      </div>
                    </div>
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
