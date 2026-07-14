"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

export function BuyButton({ itemId }: { itemId: string }) {
  const [loading, setLoading] = useState(false);

  const handlePurchase = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/create-checkout-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ itemId }),
      });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        alert(data.error || "Something went wrong");
      }
    } catch {
      alert("Failed to initiate checkout");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      size="lg"
      className="w-full text-base h-12 mb-3 shadow-md shadow-primary/20"
      onClick={handlePurchase}
      disabled={loading}
    >
      {loading ? "Redirecting..." : "Purchase & Download"}
    </Button>
  );
}
