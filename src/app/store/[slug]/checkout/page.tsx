"use client";

import { use, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useCart } from "@/hooks/use-cart";
import { formatPrice } from "@/lib/utils";
import { ArrowLeft, Lock } from "lucide-react";

export default function CheckoutPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const { getStoreItems, getStoreTotal, clearCart } = useCart();
  const items = getStoreItems(slug);
  const total = getStoreTotal(slug);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ email: "", name: "", address: "", city: "", zip: "", country: "" });

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          storeSlug: slug,
          items: items.map((i) => ({ productId: i.id, quantity: i.quantity, variant: i.variant })),
          customer: form,
        }),
      });
      const data = await res.json();
      if (data.url) {
        clearCart(slug);
        window.location.href = data.url;
      }
    } catch {
      console.error("Checkout failed");
    } finally {
      setLoading(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-muted-foreground mb-4">Your cart is empty</p>
          <Link href={`/store/${slug}`}><Button>Return to Store</Button></Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-5xl mx-auto px-6 py-12">
        <Link href={`/store/${slug}/cart`} className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-8">
          <ArrowLeft className="h-4 w-4" /> Back to cart
        </Link>
        <h1 className="text-3xl font-bold mb-8">Checkout</h1>

        <div className="grid lg:grid-cols-5 gap-8">
          <form onSubmit={handleCheckout} className="lg:col-span-3 space-y-6">
            <Card>
              <CardHeader><CardTitle>Contact Information</CardTitle></CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label>Email</Label>
                  <Input type="email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="mt-1" />
                </div>
                <div>
                  <Label>Full Name</Label>
                  <Input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="mt-1" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader><CardTitle>Shipping Address</CardTitle></CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label>Address</Label>
                  <Input required value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} className="mt-1" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>City</Label>
                    <Input required value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })} className="mt-1" />
                  </div>
                  <div>
                    <Label>ZIP Code</Label>
                    <Input required value={form.zip} onChange={(e) => setForm({ ...form, zip: e.target.value })} className="mt-1" />
                  </div>
                </div>
                <div>
                  <Label>Country</Label>
                  <Input required value={form.country} onChange={(e) => setForm({ ...form, country: e.target.value })} className="mt-1" />
                </div>
              </CardContent>
            </Card>

            <Button type="submit" size="lg" className="w-full" disabled={loading}>
              <Lock className="h-4 w-4 mr-2" />
              {loading ? "Processing..." : `Pay ${formatPrice(total)}`}
            </Button>
          </form>

          <div className="lg:col-span-2">
            <Card className="sticky top-8">
              <CardHeader><CardTitle>Order Summary</CardTitle></CardHeader>
              <CardContent className="space-y-4">
                {items.map((item) => (
                  <div key={`${item.id}-${item.variant}`} className="flex justify-between text-sm">
                    <span>{item.name} × {item.quantity}</span>
                    <span>{formatPrice(item.price * item.quantity)}</span>
                  </div>
                ))}
                <div className="border-t pt-3 flex justify-between font-bold">
                  <span>Total</span>
                  <span>{formatPrice(total)}</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
