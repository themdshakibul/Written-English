import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { LayoutDashboard, TrendingUp, DollarSign, Star, Package } from "lucide-react"

const stats = [
  { label: "Total Items", value: "12", icon: Package, change: "+2 this month" },
  { label: "Active Listings", value: "8", icon: TrendingUp, change: "3 sold" },
  { label: "Total Revenue", value: "$2,450", icon: DollarSign, change: "+$890 this month" },
  { label: "Avg. Rating", value: "4.8", icon: Star, change: "Across all items" },
]

export default function DashboardPage() {
  return (
    <>
      <div className="border-b border-border bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="flex items-center gap-3 mb-2">
            <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center">
              <LayoutDashboard className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
              <p className="text-muted-foreground text-sm mt-0.5">Welcome back! Here&apos;s an overview of your account.</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
        {/* Stats Grid */}
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

        {/* Recent Activity */}
        <Card className="border-border/50 shadow-sm">
          <CardHeader>
            <CardTitle className="text-xl">Recent Activity</CardTitle>
            <CardDescription>Your latest actions and updates</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              { action: "Listed a new item", detail: "Premium SaaS Analytics Dashboard", time: "2 days ago" },
              { action: "Item purchased", detail: "Fintech Mobile App UI Kit", time: "1 week ago" },
              { action: "Profile updated", detail: "Changed display name and avatar", time: "2 weeks ago" },
            ].map((activity, i) => (
              <div key={i} className="flex items-start gap-4 pb-4 border-b border-border/50 last:border-0 last:pb-0">
                <div className="h-2 w-2 rounded-full bg-primary mt-2 shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium">{activity.action}</p>
                  <p className="text-xs text-muted-foreground truncate">{activity.detail}</p>
                </div>
                <span className="text-xs text-muted-foreground shrink-0">{activity.time}</span>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </>
  )
}
