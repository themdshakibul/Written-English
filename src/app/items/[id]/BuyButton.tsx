"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useSession } from "@/lib/auth-client";
import { LogIn } from "lucide-react";

export function BuyButton({ itemId }: { itemId: string }) {
  const { data: session } = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handlePurchase = async () => {
    if (!session) {
      router.push(`/login?callbackUrl=/items/${itemId}`);
      return;
    }

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
      {!session ? (
        <>
          <LogIn className="mr-2 h-4 w-4" />
          Login to Purchase
        </>
      ) : loading ? (
        "Redirecting..."
      ) : (
        "Purchase & Download"
      )}
    </Button>
  );
}
