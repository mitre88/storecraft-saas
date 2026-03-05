"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users } from "lucide-react";

const demoCustomers = [
  { name: "Sarah Chen", email: "sarah@bloom.co", orders: 12, spent: 1284.00, status: "active" },
  { name: "Marcus Rivera", email: "marcus@urban.co", orders: 8, spent: 956.00, status: "active" },
  { name: "Aisha Patel", email: "aisha@spice.co", orders: 23, spent: 2341.00, status: "active" },
  { name: "James O'Brien", email: "james@craft.co", orders: 5, spent: 445.00, status: "inactive" },
  { name: "Yuki Tanaka", email: "yuki@studio.co", orders: 15, spent: 1890.00, status: "active" },
];

export default function CustomersPage() {
  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">Customers</h1>
        <Badge variant="secondary" className="text-sm">{demoCustomers.length} total</Badge>
      </div>
      <div className="space-y-3">
        {demoCustomers.map((c) => (
          <Card key={c.email}>
            <CardContent className="flex items-center justify-between py-4">
              <div className="flex items-center gap-4">
                <div className="h-10 w-10 rounded-full bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center text-white text-sm font-bold">
                  {c.name.split(" ").map(n => n[0]).join("")}
                </div>
                <div>
                  <p className="font-medium">{c.name}</p>
                  <p className="text-sm text-muted-foreground">{c.email}</p>
                </div>
              </div>
              <div className="flex items-center gap-6 text-sm">
                <div className="text-right hidden sm:block">
                  <p className="font-medium">{c.orders} orders</p>
                  <p className="text-muted-foreground">${c.spent.toFixed(2)} spent</p>
                </div>
                <Badge variant={c.status === "active" ? "default" : "secondary"}>{c.status}</Badge>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
