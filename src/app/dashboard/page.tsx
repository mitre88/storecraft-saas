"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DollarSign,
  Package,
  ShoppingCart,
  TrendingUp,
  Plus,
  Settings,
  Eye,
  ArrowUpRight,
  ArrowDownRight,
  BarChart3,
  Users,
} from "lucide-react";
import { formatPrice } from "@/lib/utils";
import Link from "next/link";

interface Stats {
  totalRevenue: number;
  totalOrders: number;
  totalProducts: number;
  recentOrders: Array<{
    id: string;
    orderNumber: string;
    total: number;
    status: string;
    customerEmail: string;
    createdAt: string;
  }>;
}

const statusConfig: Record<string, { label: string; className: string }> = {
  pending: { label: "Pending", className: "bg-amber-500/10 text-amber-500 border-amber-500/20" },
  processing: { label: "Processing", className: "bg-blue-500/10 text-blue-500 border-blue-500/20" },
  shipped: { label: "Shipped", className: "bg-sky-500/10 text-sky-500 border-sky-500/20" },
  delivered: { label: "Delivered", className: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20" },
  cancelled: { label: "Cancelled", className: "bg-red-500/10 text-red-500 border-red-500/20" },
};

export default function DashboardPage() {
  const [stats, setStats] = useState<Stats>({
    totalRevenue: 0,
    totalOrders: 0,
    totalProducts: 0,
    recentOrders: [],
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/admin/stats")
      .then((r) => r.json())
      .then((d) => { setStats(d); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  const cards = [
    { title: "Total Revenue", value: formatPrice(stats.totalRevenue), icon: DollarSign, trend: "+18.2%", up: true, color: "from-emerald-500 to-teal-600" },
    { title: "Orders", value: stats.totalOrders.toString(), icon: ShoppingCart, trend: "+12.5%", up: true, color: "from-blue-500 to-indigo-600" },
    { title: "Products", value: stats.totalProducts.toString(), icon: Package, trend: "+3", up: true, color: "from-violet-500 to-purple-600" },
    { title: "Visitors", value: "1,284", icon: Users, trend: "-2.4%", up: false, color: "from-amber-500 to-orange-600" },
  ];

  const quickActions = [
    { label: "Add Product", icon: Plus, href: "/dashboard/products", color: "from-indigo-500 to-violet-600" },
    { label: "View Store", icon: Eye, href: "/store/demo", color: "from-emerald-500 to-teal-600" },
    { label: "Analytics", icon: BarChart3, href: "/dashboard", color: "from-amber-500 to-orange-600" },
    { label: "Settings", icon: Settings, href: "/dashboard/settings", color: "from-pink-500 to-rose-600" },
  ];

  // Placeholder chart bars
  const chartData = [40, 65, 45, 80, 55, 90, 75, 95, 60, 85, 70, 100];
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground mt-1">Welcome back! Here&apos;s what&apos;s happening.</p>
        </div>
        <Link href="/dashboard/products">
          <Button className="bg-gradient-to-r from-indigo-500 to-violet-600 text-white border-0 shadow-lg shadow-indigo-500/25">
            <Plus className="mr-2 h-4 w-4" /> Add Product
          </Button>
        </Link>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
        {cards.map((card) => (
          <Card key={card.title} className="hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between mb-4">
                <div className={`h-10 w-10 rounded-xl bg-gradient-to-br ${card.color} flex items-center justify-center shadow-lg`}>
                  <card.icon className="h-5 w-5 text-white" />
                </div>
                <div className={`flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-full ${card.up ? "bg-emerald-500/10 text-emerald-500" : "bg-red-500/10 text-red-500"}`}>
                  {card.up ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
                  {card.trend}
                </div>
              </div>
              {loading ? (
                <div className="space-y-2">
                  <div className="skeleton h-8 w-24" />
                  <div className="skeleton h-4 w-20" />
                </div>
              ) : (
                <>
                  <div className="text-2xl font-bold">{card.value}</div>
                  <p className="text-xs text-muted-foreground mt-1">{card.title}</p>
                </>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-8">
        {quickActions.map((action) => (
          <Link key={action.label} href={action.href}>
            <Card className="hover:shadow-md transition-all duration-300 hover:-translate-y-0.5 cursor-pointer group">
              <CardContent className="pt-4 pb-4 flex items-center gap-3">
                <div className={`h-9 w-9 rounded-lg bg-gradient-to-br ${action.color} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                  <action.icon className="h-4 w-4 text-white" />
                </div>
                <span className="font-medium text-sm">{action.label}</span>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      <div className="grid lg:grid-cols-5 gap-6">
        {/* Revenue Chart */}
        <Card className="lg:col-span-3">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-base">Revenue Overview</CardTitle>
                <p className="text-sm text-muted-foreground mt-1">Monthly revenue for 2026</p>
              </div>
              <Badge variant="secondary" className="bg-emerald-500/10 text-emerald-500 border-emerald-500/20">
                <TrendingUp className="h-3 w-3 mr-1" /> +18.2%
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex items-end gap-2 h-48">
              {chartData.map((val, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-2">
                  <div
                    className="w-full rounded-t-md bg-gradient-to-t from-indigo-500 to-violet-500 opacity-80 hover:opacity-100 transition-opacity cursor-default min-h-[4px]"
                    style={{ height: `${val}%` }}
                    title={`${months[i]}: $${(val * 120).toLocaleString()}`}
                  />
                  <span className="text-[10px] text-muted-foreground">{months[i]}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Orders by Status */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-base">Orders by Status</CardTitle>
            <p className="text-sm text-muted-foreground mt-1">Current distribution</p>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { status: "Delivered", pct: 45, color: "bg-emerald-500" },
                { status: "Shipped", pct: 25, color: "bg-sky-500" },
                { status: "Processing", pct: 18, color: "bg-blue-500" },
                { status: "Pending", pct: 12, color: "bg-amber-500" },
              ].map((item) => (
                <div key={item.status}>
                  <div className="flex items-center justify-between text-sm mb-1.5">
                    <span>{item.status}</span>
                    <span className="text-muted-foreground">{item.pct}%</span>
                  </div>
                  <div className="h-2 rounded-full bg-muted overflow-hidden">
                    <div className={`h-full rounded-full ${item.color} transition-all duration-1000`} style={{ width: `${item.pct}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Orders */}
      <Card className="mt-6">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-base">Recent Orders</CardTitle>
              <p className="text-sm text-muted-foreground mt-1">Latest transactions from your store</p>
            </div>
            <Link href="/dashboard/orders">
              <Button variant="ghost" size="sm">View All <ArrowUpRight className="ml-1 h-3 w-3" /></Button>
            </Link>
          </div>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex items-center justify-between">
                  <div className="space-y-2">
                    <div className="skeleton h-4 w-32" />
                    <div className="skeleton h-3 w-48" />
                  </div>
                  <div className="skeleton h-4 w-20" />
                </div>
              ))}
            </div>
          ) : stats.recentOrders.length === 0 ? (
            <div className="text-center py-12">
              <ShoppingCart className="h-12 w-12 text-muted-foreground/30 mx-auto mb-3" />
              <p className="text-muted-foreground text-sm">No orders yet. Share your store to start selling!</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="text-left text-xs text-muted-foreground border-b">
                    <th className="pb-3 font-medium">Order</th>
                    <th className="pb-3 font-medium">Customer</th>
                    <th className="pb-3 font-medium">Status</th>
                    <th className="pb-3 font-medium text-right">Amount</th>
                    <th className="pb-3 font-medium text-right">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {stats.recentOrders.map((order) => {
                    const sc = statusConfig[order.status] || statusConfig.pending;
                    return (
                      <tr key={order.id} className="border-b last:border-0 hover:bg-muted/30 transition-colors">
                        <td className="py-3">
                          <span className="font-medium text-sm">{order.orderNumber}</span>
                        </td>
                        <td className="py-3">
                          <span className="text-sm text-muted-foreground">{order.customerEmail}</span>
                        </td>
                        <td className="py-3">
                          <Badge variant="outline" className={`text-xs ${sc.className}`}>
                            {sc.label}
                          </Badge>
                        </td>
                        <td className="py-3 text-right">
                          <span className="font-medium text-sm">{formatPrice(order.total)}</span>
                        </td>
                        <td className="py-3 text-right">
                          <span className="text-xs text-muted-foreground">
                            {new Date(order.createdAt).toLocaleDateString()}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
