"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useCart } from "@/hooks/use-cart";
import { demoProducts } from "@/lib/demo-data";
import { formatPrice } from "@/lib/utils";
import { ShoppingBag, ShoppingCart, Star, ArrowLeft, Filter } from "lucide-react";
import { useState } from "react";

export default function DemoStorePage() {
  const { addItem, getStoreItems } = useCart();
  const cartCount = getStoreItems("demo").reduce((sum, i) => sum + i.quantity, 0);
  const [category, setCategory] = useState("All");
  const categories = ["All", ...Array.from(new Set(demoProducts.map((p) => p.category)))];
  const filtered = category === "All" ? demoProducts : demoProducts.filter((p) => p.category === category);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex h-16 items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/" className="text-muted-foreground hover:text-foreground">
              <ArrowLeft className="h-4 w-4" />
            </Link>
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center">
                <ShoppingBag className="h-4 w-4 text-white" />
              </div>
              <span className="font-bold text-lg">The Demo Shop</span>
            </div>
          </div>
          <Link href="/store/demo/cart">
            <Button variant="outline" size="sm" className="relative">
              <ShoppingCart className="h-4 w-4 mr-2" />
              Cart
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 h-5 w-5 rounded-full bg-indigo-500 text-white text-xs flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Button>
          </Link>
        </div>
      </header>

      {/* Hero */}
      <section className="relative py-20 px-4 bg-gradient-to-br from-amber-500/5 via-orange-500/5 to-red-500/5">
        <div className="max-w-4xl mx-auto text-center">
          <Badge className="mb-4 bg-amber-500/10 text-amber-600 border-amber-500/20">Demo Store</Badge>
          <h1 className="text-4xl sm:text-6xl font-bold mb-4">The Demo Shop</h1>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto">
            Curated essentials for the modern lifestyle. This is a demo store powered by StoreCraft.
          </p>
        </div>
      </section>

      {/* Categories */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center gap-2 overflow-x-auto pb-2">
          <Filter className="h-4 w-4 text-muted-foreground flex-shrink-0" />
          {categories.map((cat) => (
            <Button
              key={cat}
              variant={category === cat ? "default" : "outline"}
              size="sm"
              onClick={() => setCategory(cat)}
              className={category === cat ? "bg-gradient-to-r from-amber-500 to-orange-600 text-white border-0" : ""}
            >
              {cat}
            </Button>
          ))}
        </div>
      </section>

      {/* Products */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {filtered.map((product) => (
            <Card key={product.id} className="group overflow-hidden border-0 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <Link href={`/store/demo/product/${product.id}`}>
                <div className="aspect-[3/4] relative overflow-hidden bg-muted">
                  <Image
                    src={product.images[0]}
                    alt={product.name}
                    fill
                    sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  {product.compareAt && (
                    <Badge className="absolute top-3 left-3 bg-red-500 text-white border-0">
                      -{Math.round((1 - product.price / product.compareAt) * 100)}%
                    </Badge>
                  )}
                </div>
              </Link>
              <CardContent className="p-3 sm:p-4">
                <p className="text-xs text-muted-foreground mb-1">{product.category}</p>
                <Link href={`/store/demo/product/${product.id}`}>
                  <h3 className="font-semibold text-sm sm:text-base hover:text-indigo-400 transition-colors line-clamp-1">
                    {product.name}
                  </h3>
                </Link>
                <div className="flex items-center gap-1 my-1.5">
                  <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                  <span className="text-xs font-medium">{product.rating}</span>
                  <span className="text-xs text-muted-foreground">({product.reviews})</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-sm">{formatPrice(product.price)}</span>
                    {product.compareAt && (
                      <span className="text-xs text-muted-foreground line-through">{formatPrice(product.compareAt)}</span>
                    )}
                  </div>
                </div>
                <Button
                  size="sm"
                  className="w-full mt-3 text-xs h-8"
                  onClick={(e) => {
                    e.preventDefault();
                    addItem({
                      id: product.id,
                      name: product.name,
                      price: product.price,
                      image: product.images[0],
                      storeSlug: "demo",
                    });
                  }}
                >
                  Add to Cart
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
