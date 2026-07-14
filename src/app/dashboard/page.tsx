import connectToDatabase from "@/lib/mongodb";
import Item from "@/models/Item";
import Payment from "@/models/Payment";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { LayoutDashboard, TrendingUp, DollarSign, Star, Package, ShoppingBag, Shield, Users } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";

async function getRole() {
  const session = await auth.api.getSession({ headers: await headers() });
  return (session?.user as Record<string, unknown>)?.role as string || null;
}

export default async function DashboardPage() {
  const role = await getRole();
  if (!role) redirect("/login");

  const db = await connectToDatabase();

  if (role === "admin") {
    let totalItems = 0;
    let totalPurchases = 0;
    let totalRevenue = 0;
    let totalUsers = 0;
    let recentPayments: Record<string, unknown>[] = [];

    if (db) {
      totalItems = await Item.countDocuments();
      const payments = await Payment.find().lean();
      totalPurchases = payments.length;
      totalRevenue = payments.reduce((s: number, p) => s + (p.amount || 0), 0);
      recentPayments = await Payment.find().sort({ createdAt: -1 }).limit(5).lean();
      const { MongoClient } = require("mongodb");
      const client = new MongoClient(process.env.MONGODB_URI!);
      await client.connect();
      totalUsers = await client.db().collection("user").countDocuments();
      await client.close();
    }

    const adminStats = [
      { label: "Total Items", value: String(totalItems), icon: Package, href: "/dashboard/admin/items" },
      { label: "Purchases", value: String(totalPurchases), icon: ShoppingBag, href: "/dashboard/admin/purchases" },
      { label: "Revenue", value: `$${totalRevenue.toLocaleString("en-US", { minimumFractionDigits: 2 })}`, icon: DollarSign, href: "/dashboard/admin/purchases" },
      { label: "Users", value: String(totalUsers), icon: Users, href: "/dashboard/admin/users" },
    ];

    return (
      <>
        <div className="border-b border-border bg-background">
          <Container className="py-10">
            <div className="flex items-center gap-3 mb-2">
              <div className="h-10 w-10 rounded-xl bg-red-500/10 flex items-center justify-center">
                <Shield className="h-6 w-6 text-red-600 dark:text-red-400" />
              </div>
              <div>
                <h1 className="text-3xl font-bold tracking-tight">Admin Dashboard</h1>
                <p className="text-muted-foreground text-sm mt-0.5">Full marketplace overview.</p>
              </div>
            </div>
          </Container>
        </div>

        <Container className="py-10 space-y-10">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {adminStats.map((stat) => (
              <Link key={stat.label} href={stat.href}>
                <Card className="border-border/50 shadow-sm hover:shadow-md transition-shadow cursor-pointer">
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground">{stat.label}</CardTitle>
                    <div className="h-8 w-8 rounded-lg bg-red-500/10 flex items-center justify-center">
                      <stat.icon className="h-4 w-4 text-red-600 dark:text-red-400" />
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{stat.value}</div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>

          <Card className="border-border/50 shadow-sm">
            <CardHeader>
              <CardTitle className="text-xl">Recent Purchases</CardTitle>
              <CardDescription>Latest transactions on the marketplace</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {recentPayments.length === 0 ? (
                <p className="text-sm text-muted-foreground text-center py-6">No purchases yet.</p>
              ) : (
                recentPayments.map((p) => (
                  <div key={String(p._id)} className="flex items-start gap-4 pb-4 border-b border-border/50 last:border-0 last:pb-0">
                    <div className="h-2 w-2 rounded-full bg-red-500 mt-2 shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium">{p.itemName as string}</p>
                      <p className="text-xs text-muted-foreground">{(p.userEmail as string) || (p.userId as string)}</p>
                    </div>
                    <span className="text-sm font-semibold shrink-0">${(p.amount as number)?.toFixed(2)}</span>
                  </div>
                ))
              )}
            </CardContent>
          </Card>
        </Container>
      </>
    );
  }

  // ── Regular user dashboard ──
  let totalItems = 0;
  let avgRating = 0;
  let recentItems: Record<string, unknown>[] = [];

  if (db) {
    totalItems = await Item.countDocuments();
    const ratingResult = await Item.aggregate([
      { $group: { _id: null, avg: { $avg: "$rating" } } },
    ]);
    avgRating = ratingResult[0]?.avg || 0;
    recentItems = await Item.find().sort({ createdAt: -1 }).limit(5).lean();
  }

  const stats = [
    { label: "Total Items", value: String(totalItems), icon: Package, change: "In marketplace" },
    { label: "Active Listings", value: String(totalItems), icon: TrendingUp, change: totalItems > 0 ? "Listed" : "No listings yet" },
    { label: "Total Revenue", value: "$0", icon: DollarSign, change: "Stripe connected" },
    { label: "Avg. Rating", value: avgRating ? avgRating.toFixed(1) : "—", icon: Star, change: avgRating ? `Across ${totalItems} item(s)` : "No ratings yet" },
  ];

  return (
    <>
      <div className="border-b border-border bg-background">
        <Container className="py-10">
          <div className="flex items-center gap-3 mb-2">
            <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center">
              <LayoutDashboard className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
              <p className="text-muted-foreground text-sm mt-0.5">Welcome back! Here&apos;s an overview of your account.</p>
            </div>
          </div>
        </Container>
      </div>

      <Container className="py-10 space-y-10">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <Card key={stat.label} className="border-border/50 shadow-sm">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">{stat.label}</CardTitle>
                <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center">
                  <stat.icon className="h-4 w-4 text-primary" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-muted-foreground mt-1">{stat.change}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="border-border/50 shadow-sm">
          <CardHeader>
            <CardTitle className="text-xl">Recent Items</CardTitle>
            <CardDescription>Latest additions to the marketplace</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentItems.length === 0 ? (
              <p className="text-sm text-muted-foreground text-center py-6">
                No items yet.{" "}
                <Link href="/dashboard/items/add" className="text-primary hover:underline">Add your first item</Link>
              </p>
            ) : (
              recentItems.map((item) => (
                <div key={String(item._id)} className="flex items-start gap-4 pb-4 border-b border-border/50 last:border-0 last:pb-0">
                  <div className="h-2 w-2 rounded-full bg-primary mt-2 shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium">Listed &ldquo;{item.title as string}&rdquo;</p>
                    <p className="text-xs text-muted-foreground truncate">{(item.shortDescription as string)?.slice(0, 80)}{(item.shortDescription as string)?.length > 80 ? "..." : ""}</p>
                  </div>
                  <span className="text-xs text-muted-foreground shrink-0">${item.price as number}</span>
                </div>
              ))
            )}
          </CardContent>
        </Card>
      </Container>
    </>
  );
}
