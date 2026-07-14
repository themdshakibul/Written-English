"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  LineChart, Line, AreaChart, Area, PieChart, Pie, Cell,
} from "recharts"
import { TrendingUp, DollarSign, Activity, PieChart as PieChartIcon, BarChart3, ArrowUp, ArrowDown } from "lucide-react"

const monthlyData = [
  { name: "Jan", revenue: 400, items: 24 },
  { name: "Feb", revenue: 300, items: 18 },
  { name: "Mar", revenue: 600, items: 32 },
  { name: "Apr", revenue: 800, items: 41 },
  { name: "May", revenue: 500, items: 28 },
  { name: "Jun", revenue: 900, items: 45 },
  { name: "Jul", revenue: 700, items: 36 },
  { name: "Aug", revenue: 1100, items: 52 },
  { name: "Sep", revenue: 950, items: 48 },
  { name: "Oct", revenue: 1200, items: 55 },
  { name: "Nov", revenue: 1500, items: 68 },
  { name: "Dec", revenue: 1800, items: 82 },
]

const categoryData = [
  { name: "Software", value: 35 },
  { name: "Templates", value: 25 },
  { name: "AI Models", value: 22 },
  { name: "Design Kits", value: 18 },
]

const COLORS = [
  "var(--chart-1)",
  "var(--chart-2)",
  "var(--chart-3)",
  "var(--chart-4)",
]

const weeklyData = [
  { day: "Mon", views: 240, sales: 12 },
  { day: "Tue", views: 320, sales: 18 },
  { day: "Wed", views: 280, sales: 15 },
  { day: "Thu", views: 450, sales: 24 },
  { day: "Fri", views: 380, sales: 20 },
  { day: "Sat", views: 520, sales: 30 },
  { day: "Sun", views: 490, sales: 28 },
]

const stats = [
  { label: "Total Revenue", value: "$12,450", change: "+18.2%", icon: DollarSign, up: true },
  { label: "Items Sold", value: "248", change: "+12.5%", icon: TrendingUp, up: true },
  { label: "Active Listings", value: "32", change: "-3.1%", icon: Activity, up: false },
  { label: "Conversion Rate", value: "6.4%", change: "+2.1%", icon: BarChart3, up: true },
]

const chartConfig = {
  grid: "var(--border)",
  axis: "var(--muted-foreground)",
  tooltip: {
    backgroundColor: "var(--popover)",
    border: "1px solid var(--border)",
    borderRadius: "8px",
    color: "var(--popover-foreground)",
    boxShadow: "0 4px 12px var(--border)",
    padding: "8px 12px",
    fontSize: "13px",
  },
}

export default function AnalyticsPage() {
  return (
    <>
      <div className="border-b border-border bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center shadow-sm">
              <Activity className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Analytics</h1>
              <p className="text-muted-foreground text-sm mt-0.5">Track your performance and growth metrics.</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-6">
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
                <div className={`flex items-center gap-1 text-xs mt-1 ${stat.up ? "text-emerald-600 dark:text-emerald-400" : "text-red-500 dark:text-red-400"}`}>
                  {stat.up ? <ArrowUp className="h-3 w-3" /> : <ArrowDown className="h-3 w-3" />}
                  {stat.change}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <Card className="border-border/50 shadow-sm">
            <CardHeader>
              <div className="flex items-center gap-2">
                <DollarSign className="h-5 w-5 text-primary" />
                <CardTitle className="text-lg">Revenue Overview</CardTitle>
              </div>
              <CardDescription>Monthly revenue for the current year</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={monthlyData}>
                    <defs>
                      <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="var(--chart-1)" stopOpacity={0.35} />
                        <stop offset="95%" stopColor="var(--chart-1)" stopOpacity={0.02} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="4 4" stroke={chartConfig.grid} strokeOpacity={0.5} />
                    <XAxis dataKey="name" stroke={chartConfig.axis} fontSize={12} tickLine={false} axisLine={false} dy={8} />
                    <YAxis stroke={chartConfig.axis} fontSize={12} tickLine={false} axisLine={false} dx={-4} />
                    <Tooltip contentStyle={chartConfig.tooltip} />
                    <Area type="monotone" dataKey="revenue" stroke="var(--chart-1)" fill="url(#revenueGradient)" strokeWidth={2.5} dot={{ r: 0 }} activeDot={{ r: 5, stroke: "var(--background)", strokeWidth: 2 }} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <Card className="border-border/50 shadow-sm">
            <CardHeader>
              <div className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5 text-primary" />
                <CardTitle className="text-lg">Items Listed</CardTitle>
              </div>
              <CardDescription>Monthly items added to the marketplace</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={monthlyData} barGap={4}>
                    <defs>
                      <linearGradient id="itemsGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="var(--chart-2)" stopOpacity={0.9} />
                        <stop offset="100%" stopColor="var(--chart-2)" stopOpacity={0.6} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="4 4" stroke={chartConfig.grid} strokeOpacity={0.5} vertical={false} />
                    <XAxis dataKey="name" stroke={chartConfig.axis} fontSize={12} tickLine={false} axisLine={false} dy={8} />
                    <YAxis stroke={chartConfig.axis} fontSize={12} tickLine={false} axisLine={false} dx={-4} />
                    <Tooltip contentStyle={chartConfig.tooltip} cursor={{ fill: "var(--muted)", opacity: 0.3 }} />
                    <Bar dataKey="items" radius={[6, 6, 0, 0]} fill="url(#itemsGradient)" maxBarSize={40} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <Card className="border-border/50 shadow-sm">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Activity className="h-5 w-5 text-primary" />
                <CardTitle className="text-lg">Weekly Performance</CardTitle>
              </div>
              <CardDescription>Views and sales over the last 7 days</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={weeklyData}>
                    <defs>
                      <linearGradient id="viewsGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="var(--chart-1)" stopOpacity={0.15} />
                        <stop offset="100%" stopColor="var(--chart-1)" stopOpacity={0} />
                      </linearGradient>
                      <linearGradient id="salesGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="var(--chart-3)" stopOpacity={0.15} />
                        <stop offset="100%" stopColor="var(--chart-3)" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="4 4" stroke={chartConfig.grid} strokeOpacity={0.5} vertical={false} />
                    <XAxis dataKey="day" stroke={chartConfig.axis} fontSize={12} tickLine={false} axisLine={false} dy={8} />
                    <YAxis stroke={chartConfig.axis} fontSize={12} tickLine={false} axisLine={false} dx={-4} />
                    <Tooltip contentStyle={chartConfig.tooltip} />
                    <Line type="monotone" dataKey="views" stroke="var(--chart-1)" strokeWidth={2.5} dot={{ r: 3, fill: "var(--background)", stroke: "var(--chart-1)", strokeWidth: 2 }} activeDot={{ r: 5, stroke: "var(--background)", strokeWidth: 2 }} />
                    <Line type="monotone" dataKey="sales" stroke="var(--chart-3)" strokeWidth={2.5} dot={{ r: 3, fill: "var(--background)", stroke: "var(--chart-3)", strokeWidth: 2 }} activeDot={{ r: 5, stroke: "var(--background)", strokeWidth: 2 }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <Card className="border-border/50 shadow-sm">
            <CardHeader>
              <div className="flex items-center gap-2">
                <PieChartIcon className="h-5 w-5 text-primary" />
                <CardTitle className="text-lg">Category Distribution</CardTitle>
              </div>
              <CardDescription>Items grouped by category type</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80 flex items-center justify-center">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={categoryData}
                      cx="50%"
                      cy="50%"
                      innerRadius={72}
                      outerRadius={110}
                      paddingAngle={3}
                      dataKey="value"
                      stroke="var(--background)"
                      strokeWidth={2}
                    >
                      {categoryData.map((_, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip contentStyle={chartConfig.tooltip} />
                  </PieChart>
                </ResponsiveContainer>
                <div className="absolute flex flex-col items-center pointer-events-none">
                  <span className="text-2xl font-bold">100</span>
                  <span className="text-xs text-muted-foreground">Total Items</span>
                </div>
              </div>
              <div className="flex justify-center gap-6 mt-4">
                {categoryData.map((item, index) => (
                  <div key={item.name} className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-sm" style={{ backgroundColor: COLORS[index] }} />
                    <span className="text-xs text-muted-foreground">{item.name}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  )
}
