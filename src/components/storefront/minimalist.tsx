"use client";

import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/hooks/use-cart";
import type { StoreData } from "@/types/store";
import { formatPrice } from "@/lib/utils";

export function MinimalistStore({ store }: { store: StoreData }) {
  const { addItem, getStoreItems } = useCart();
  const cartCount = getStoreItems(store.slug).reduce((s, i) => s + i.quantity, 0);

  return (
    <div className="min-h-screen bg-white text-neutral-900">
      {/* Header */}
      <header className="border-b sticky top-0 bg-white/90 backdrop-blur-sm z-40">
        <div className="max-w-6xl mx-auto px-6 flex items-center justify-between h-16">
          <h1 className="text-xl font-light tracking-widest uppercase">{store.name}</h1>
          <Link href={`/store/${store.slug}/cart`} className="relative">
            <ShoppingCart className="h-5 w-5" />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-neutral-900 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </Link>
        </div>
      </header>

      {/* Hero */}
      <section className="py-24 px-6 text-center border-b">
        <h2 className="text-5xl font-light tracking-tight mb-4">{store.name}</h2>
        {store.description && (
          <p className="text-lg text-neutral-500 max-w-xl mx-auto">{store.description}</p>
        )}
      </section>

      {/* Products */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {store.products.map((product) => (
            <div key={product.id} className="group">
              <div className="aspect-square bg-neutral-100 rounded-sm mb-4 flex items-center justify-center overflow-hidden">
                {product.images[0] ? (
                  <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                ) : (
                  <span className="text-4xl font-light text-neutral-300">{product.name[0]}</span>
                )}
              </div>
              <div className="space-y-2">
                <h3 className="font-light text-lg tracking-wide">{product.name}</h3>
                <div className="flex items-center gap-2">
                  <span className="font-medium">{formatPrice(product.price)}</span>
                  {product.compareAt && (
                    <span className="text-sm text-neutral-400 line-through">{formatPrice(product.compareAt)}</span>
                  )}
                </div>
                <Button
                  variant="outline"
                  className="w-full rounded-none border-neutral-900 text-neutral-900 hover:bg-neutral-900 hover:text-white transition-colors"
                  onClick={() => addItem({ id: product.id, name: product.name, price: product.price, image: product.images[0], storeSlug: store.slug })}
                >
                  Add to Cart
                </Button>
              </div>
            </div>
          ))}
        </div>
        {store.products.length === 0 && (
          <p className="text-center text-neutral-400 py-20">No products available yet.</p>
        )}
      </section>

      {/* Footer */}
      <footer className="border-t py-12 text-center">
        <p className="text-sm text-neutral-400">© {new Date().getFullYear()} {store.name}. Powered by StoreCraft.</p>
      </footer>
    </div>
  );
}
