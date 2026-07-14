"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  LineChart, Line, AreaChart, Area, PieChart, Pie, Cell,
} from "recharts"
import { TrendingUp, DollarSign, Activity, PieChart as PieChartIcon, BarChart3, Package } from "lucide-react"
import { getAllItems, getRevenueData } from "@/app/actions/itemActions"
import { Container } from "@/components/ui/container"

const COLORS = [
  "var(--chart-1)",
  "var(--chart-2)",
  "var(--chart-3)",
  "var(--chart-4)",
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
  const [items, setItems] = useState<any[]>([])
  const [revenue, setRevenue] = useState<{ monthly: { name: string; revenue: number }[]; total: number }>({ monthly: [], total: 0 })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    Promise.all([getAllItems(), getRevenueData()]).then(([itemsData, revenueData]) => {
      setItems(itemsData)
      setRevenue(revenueData)
      setLoading(false)
    })
  }, [])

  const totalItems = items.length
  const avgPrice = totalItems ? Math.round(items.reduce((s, i) => s + i.price, 0) / totalItems) : 0

  const categoryMap: Record<string, number> = {}
  items.forEach((i) => {
    categoryMap[i.category] = (categoryMap[i.category] || 0) + 1
  })
  const categoryData = Object.entries(categoryMap).map(([name, value]) => ({ name, value }))

  const monthMap: Record<string, number> = {}
  items.forEach((i) => {
    const d = i.date ? new Date(i.date) : null
    if (d && !isNaN(d.getTime())) {
      const key = d.toLocaleString("en-US", { month: "short" })
      monthMap[key] = (monthMap[key] || 0) + 1
    }
  })
  const allMonths = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"]
  const monthlyData = allMonths.map((name) => ({
    name,
    items: monthMap[name] || 0,
    revenue: revenue.monthly.find((m) => m.name === name)?.revenue || 0,
  }))

  const weekDays = ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"]
  const weeklyData = weekDays.map((day) => ({
    day,
    views: 0,
    sales: 0,
  }))

  const stats = [
    { label: "Total Items", value: String(totalItems), icon: Package },
    { label: "Avg. Price", value: totalItems ? `$${avgPrice}` : "—", icon: TrendingUp },
    { label: "Categories", value: String(categoryData.length), icon: Activity },
    { label: "Total Revenue", value: revenue.total ? `$${revenue.total.toLocaleString()}` : "$0", icon: DollarSign },
  ]

  return (
    <>
      <div className="border-b border-border bg-background">
        <Container className="py-10">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center shadow-sm">
              <Activity className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Analytics</h1>
              <p className="text-muted-foreground text-sm mt-0.5">Track your performance and growth metrics.</p>
            </div>
          </div>
        </Container>
      </div>

      <Container className="py-10 space-y-6">
        {loading ? (
          <p className="text-center text-muted-foreground py-12">Loading analytics...</p>
        ) : (
          <>
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
                    {totalItems === 0 ? (
                      <div className="h-full flex items-center justify-center text-sm text-muted-foreground">No data yet</div>
                    ) : (
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
                    )}
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
                    {totalItems === 0 ? (
                      <div className="h-full flex items-center justify-center text-sm text-muted-foreground">No data yet</div>
                    ) : (
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
                    )}
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
                  <div className="h-80 flex items-center justify-center relative">
                    {categoryData.length === 0 ? (
                      <div className="text-sm text-muted-foreground">No data yet</div>
                    ) : (
                      <>
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
                          <span className="text-2xl font-bold">{totalItems}</span>
                          <span className="text-xs text-muted-foreground">Total</span>
                        </div>
                      </>
                    )}
                  </div>
                  {categoryData.length > 0 && (
                    <div className="flex justify-center gap-6 mt-4 flex-wrap">
                      {categoryData.map((item, index) => (
                        <div key={item.name} className="flex items-center gap-2">
                          <div className="h-3 w-3 rounded-sm" style={{ backgroundColor: COLORS[index] }} />
                          <span className="text-xs text-muted-foreground">{item.name}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </>
        )}
      </Container>
    </>
  )
}
