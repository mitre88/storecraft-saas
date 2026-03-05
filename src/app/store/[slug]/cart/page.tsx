"use client";

import { use } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useCart } from "@/hooks/use-cart";
import { formatPrice } from "@/lib/utils";
import { Minus, Plus, Trash2, ArrowLeft, ShoppingBag } from "lucide-react";

export default function CartPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const { getStoreItems, getStoreTotal, updateQuantity, removeItem } = useCart();
  const items = getStoreItems(slug);
  const total = getStoreTotal(slug);

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-3xl mx-auto px-6 py-12">
        <Link href={`/store/${slug}`} className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-8">
          <ArrowLeft className="h-4 w-4" /> Back to store
        </Link>
        <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>

        {items.length === 0 ? (
          <Card>
            <CardContent className="py-16 text-center">
              <ShoppingBag className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <p className="text-muted-foreground">Your cart is empty</p>
              <Link href={`/store/${slug}`}>
                <Button variant="outline" className="mt-4">Continue Shopping</Button>
              </Link>
            </CardContent>
          </Card>
        ) : (
          <>
            <div className="space-y-4 mb-8">
              {items.map((item) => (
                <Card key={`${item.id}-${item.variant}`}>
                  <CardContent className="flex items-center gap-4 py-4">
                    <div className="h-16 w-16 rounded-lg bg-muted flex items-center justify-center flex-shrink-0">
                      {item.image ? (
                        <img src={item.image} alt={item.name} className="h-full w-full object-cover rounded-lg" />
                      ) : (
                        <span className="text-lg font-bold text-muted-foreground">{item.name[0]}</span>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium truncate">{item.name}</p>
                      {item.variant && <p className="text-xs text-muted-foreground">{item.variant}</p>}
                      <p className="text-sm font-semibold">{formatPrice(item.price)}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => updateQuantity(item.id, item.quantity - 1, item.variant)}>
                        <Minus className="h-3 w-3" />
                      </Button>
                      <span className="w-8 text-center text-sm">{item.quantity}</span>
                      <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => updateQuantity(item.id, item.quantity + 1, item.variant)}>
                        <Plus className="h-3 w-3" />
                      </Button>
                    </div>
                    <div className="text-right w-20">
                      <p className="font-semibold">{formatPrice(item.price * item.quantity)}</p>
                    </div>
                    <Button variant="ghost" size="icon" onClick={() => removeItem(item.id, item.variant)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span>Subtotal</span>
                  <span>{formatPrice(total)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Shipping</span>
                  <span className="text-muted-foreground">Calculated at checkout</span>
                </div>
                <div className="border-t pt-3 flex justify-between font-bold">
                  <span>Total</span>
                  <span>{formatPrice(total)}</span>
                </div>
                <Link href={`/store/${slug}/checkout`}>
                  <Button className="w-full mt-4" size="lg">Proceed to Checkout</Button>
                </Link>
              </CardContent>
            </Card>
          </>
        )}
      </div>
    </div>
  );
}
