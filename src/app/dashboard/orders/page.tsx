"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatPrice } from "@/lib/utils";

interface Order {
  id: string;
  orderNumber: string;
  status: string;
  total: number;
  customerEmail: string;
  customerName: string | null;
  createdAt: string;
  items: Array<{ id: string; quantity: number; price: number; product: { name: string } }>;
}

const statusColors: Record<string, "default" | "secondary" | "destructive" | "outline"> = {
  pending: "outline",
  processing: "secondary",
  shipped: "default",
  delivered: "default",
  cancelled: "destructive",
};

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    fetch("/api/orders").then((r) => r.json()).then(setOrders).catch(() => {});
  }, []);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Orders</h1>
      {orders.length === 0 ? (
        <Card><CardContent className="py-12 text-center text-muted-foreground">No orders yet.</CardContent></Card>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <Card key={order.id}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-base">{order.orderNumber}</CardTitle>
                <Badge variant={statusColors[order.status] || "outline"} className="capitalize">{order.status}</Badge>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm">{order.customerName || order.customerEmail}</p>
                    <p className="text-xs text-muted-foreground">{new Date(order.createdAt).toLocaleDateString()}</p>
                    <div className="mt-2 space-y-1">
                      {order.items.map((item) => (
                        <p key={item.id} className="text-xs text-muted-foreground">
                          {item.quantity}x {item.product.name} — {formatPrice(item.price)}
                        </p>
                      ))}
                    </div>
                  </div>
                  <p className="text-lg font-bold">{formatPrice(order.total)}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
