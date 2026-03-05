"use client";

import Link from "next/link";
import { ShoppingCart, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useCart } from "@/hooks/use-cart";
import type { StoreData } from "@/types/store";
import { formatPrice } from "@/lib/utils";

export function BoldStore({ store }: { store: StoreData }) {
  const { addItem, getStoreItems } = useCart();
  const cartCount = getStoreItems(store.slug).reduce((s, i) => s + i.quantity, 0);
  const featured = store.products.filter((p) => p.featured);

  return (
    <div className="min-h-screen" style={{ backgroundColor: store.secondaryColor, color: store.primaryColor }}>
      {/* Header */}
      <header className="sticky top-0 z-40" style={{ backgroundColor: store.primaryColor }}>
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-16">
          <h1 className="text-xl font-black tracking-tight" style={{ color: store.secondaryColor }}>
            {store.name}
          </h1>
          <Link href={`/store/${store.slug}/cart`} className="relative" style={{ color: store.secondaryColor }}>
            <ShoppingCart className="h-6 w-6" />
            {cartCount > 0 && (
              <span
                className="absolute -top-2 -right-2 text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold"
                style={{ backgroundColor: store.accentColor, color: store.secondaryColor }}
              >
                {cartCount}
              </span>
            )}
          </Link>
        </div>
      </header>

      {/* Hero */}
      <section
        className="py-20 px-6 text-center"
        style={{ background: `linear-gradient(135deg, ${store.primaryColor}, ${store.accentColor})` }}
      >
        <h2 className="text-6xl font-black tracking-tight mb-4" style={{ color: store.secondaryColor }}>
          {store.name}
        </h2>
        {store.description && (
          <p className="text-xl max-w-2xl mx-auto opacity-80" style={{ color: store.secondaryColor }}>
            {store.description}
          </p>
        )}
        <Button
          className="mt-8 text-lg px-8 py-6 rounded-full font-bold"
          style={{ backgroundColor: store.secondaryColor, color: store.primaryColor }}
        >
          <Sparkles className="mr-2 h-5 w-5" /> Shop Now
        </Button>
      </section>

      {/* Featured */}
      {featured.length > 0 && (
        <section className="max-w-7xl mx-auto px-6 py-12">
          <h3 className="text-2xl font-black mb-6 flex items-center gap-2">
            <Sparkles className="h-6 w-6" style={{ color: store.accentColor }} /> Featured
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {featured.slice(0, 2).map((product) => (
              <div key={product.id} className="rounded-2xl overflow-hidden shadow-lg" style={{ backgroundColor: store.primaryColor }}>
                <div className="aspect-video flex items-center justify-center" style={{ backgroundColor: store.accentColor + "22" }}>
                  {product.images[0] ? (
                    <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover" />
                  ) : (
                    <span className="text-6xl font-black opacity-20">{product.name[0]}</span>
                  )}
                </div>
                <div className="p-6" style={{ color: store.secondaryColor }}>
                  <h4 className="text-xl font-bold">{product.name}</h4>
                  <p className="text-2xl font-black mt-2" style={{ color: store.accentColor }}>
                    {formatPrice(product.price)}
                  </p>
                  <Button
                    className="w-full mt-4 rounded-full font-bold"
                    style={{ backgroundColor: store.accentColor, color: store.secondaryColor }}
                    onClick={() => addItem({ id: product.id, name: product.name, price: product.price, image: product.images[0], storeSlug: store.slug })}
                  >
                    Add to Cart
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* All Products */}
      <section className="max-w-7xl mx-auto px-6 py-12">
        <h3 className="text-2xl font-black mb-6">All Products</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {store.products.map((product) => (
            <div key={product.id} className="rounded-xl overflow-hidden shadow-md bg-white">
              <div className="aspect-square flex items-center justify-center bg-neutral-100">
                {product.images[0] ? (
                  <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover" />
                ) : (
                  <span className="text-3xl font-black text-neutral-200">{product.name[0]}</span>
                )}
              </div>
              <div className="p-3">
                <h4 className="font-bold text-sm text-neutral-900 truncate">{product.name}</h4>
                <div className="flex items-center gap-2 mt-1">
                  <span className="font-black text-sm" style={{ color: store.accentColor }}>{formatPrice(product.price)}</span>
                  {product.compareAt && (
                    <span className="text-xs text-neutral-400 line-through">{formatPrice(product.compareAt)}</span>
                  )}
                </div>
                {product.category && <Badge variant="secondary" className="mt-2 text-xs">{product.category}</Badge>}
                <Button
                  size="sm"
                  className="w-full mt-3 rounded-full font-bold text-xs"
                  style={{ backgroundColor: store.primaryColor, color: store.secondaryColor }}
                  onClick={() => addItem({ id: product.id, name: product.name, price: product.price, image: product.images[0], storeSlug: store.slug })}
                >
                  Add to Cart
                </Button>
              </div>
            </div>
          ))}
        </div>
        {store.products.length === 0 && (
          <p className="text-center py-20 opacity-50">No products available yet.</p>
        )}
      </section>

      {/* Footer */}
      <footer className="py-8 text-center border-t" style={{ borderColor: store.primaryColor + "22" }}>
        <p className="text-sm opacity-50">© {new Date().getFullYear()} {store.name}. Powered by StoreCraft.</p>
      </footer>
    </div>
  );
}
