"use client";

import { useSession } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { data: session, isPending } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (!isPending && (session?.user as Record<string, unknown>)?.role !== "admin") {
      router.replace("/dashboard");
    }
  }, [session, isPending, router]);

  if (isPending) return null;
  if ((session?.user as Record<string, unknown>)?.role !== "admin") return null;

  return <>{children}</>;
}
