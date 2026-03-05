"use client";

import Link from "next/link";
import { useState, useMemo } from "react";
import { ShoppingCart, Search, Star, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/hooks/use-cart";
import type { StoreData } from "@/types/store";
import { formatPrice } from "@/lib/utils";

export function MinimalistStore({ store }: { store: StoreData }) {
  const { addItem, getStoreItems } = useCart();
  const cartCount = getStoreItems(store.slug).reduce((s, i) => s + i.quantity, 0);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [addedId, setAddedId] = useState<string | null>(null);

  const categories = useMemo(() => {
    const cats = store.products.map((p) => p.category).filter(Boolean) as string[];
    return [...new Set(cats)];
  }, [store.products]);

  const filteredProducts = useMemo(() => {
    return store.products.filter((p) => {
      const matchSearch = !searchQuery || p.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchCat = !selectedCategory || p.category === selectedCategory;
      return matchSearch && matchCat;
    });
  }, [store.products, searchQuery, selectedCategory]);

  const handleAdd = (product: typeof store.products[0]) => {
    addItem({ id: product.id, name: product.name, price: product.price, image: product.images[0], storeSlug: store.slug });
    setAddedId(product.id);
    setTimeout(() => setAddedId(null), 1200);
  };

  return (
    <div className="min-h-screen bg-[#FAF9F7] text-[#1a1a1a]" style={{ fontFamily: "'Georgia', 'Times New Roman', serif" }}>
      {/* Header */}
      <header className="border-b border-[#e8e4df] sticky top-0 bg-[#FAF9F7]/90 backdrop-blur-xl z-40">
        <div className="max-w-6xl mx-auto px-6 flex items-center justify-between h-20">
          <h1 className="text-2xl tracking-[0.25em] uppercase font-light">{store.name}</h1>
          <div className="flex items-center gap-6">
            {/* Search */}
            <div className="hidden sm:flex items-center border border-[#d4cfc8] rounded-none px-3 py-2 bg-white/50 focus-within:border-[#1a1a1a] transition-colors">
              <Search className="h-4 w-4 text-[#999] mr-2" />
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-transparent outline-none text-sm w-40 placeholder:text-[#bbb]"
                style={{ fontFamily: "inherit" }}
              />
            </div>
            <Link href={`/store/${store.slug}/cart`} className="relative group">
              <ShoppingCart className="h-5 w-5 group-hover:scale-110 transition-transform" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-[#1a1a1a] text-white text-[10px] rounded-full h-5 w-5 flex items-center justify-center font-sans">
                  {cartCount}
                </span>
              )}
            </Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="py-28 px-6 text-center border-b border-[#e8e4df] relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#f5f0eb] to-[#FAF9F7]" />
        <div className="relative">
          <p className="text-xs tracking-[0.3em] uppercase text-[#999] mb-4">Curated Collection</p>
          <h2 className="text-5xl md:text-7xl font-light tracking-tight mb-6 leading-[1.1]">{store.name}</h2>
          {store.description && (
            <p className="text-lg text-[#777] max-w-lg mx-auto leading-relaxed font-light italic">{store.description}</p>
          )}
          <div className="w-16 h-px bg-[#ccc] mx-auto mt-8" />
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-6 py-16 flex gap-12">
        {/* Sidebar */}
        {categories.length > 0 && (
          <aside className="hidden lg:block w-52 flex-shrink-0">
            <h3 className="text-xs tracking-[0.2em] uppercase text-[#999] mb-6">Categories</h3>
            <ul className="space-y-3">
              <li>
                <button
                  onClick={() => setSelectedCategory(null)}
                  className={`text-sm transition-colors ${!selectedCategory ? "text-[#1a1a1a] font-medium" : "text-[#999] hover:text-[#1a1a1a]"}`}
                >
                  All Products
                </button>
              </li>
              {categories.map((cat) => (
                <li key={cat}>
                  <button
                    onClick={() => setSelectedCategory(cat)}
                    className={`text-sm transition-colors ${selectedCategory === cat ? "text-[#1a1a1a] font-medium" : "text-[#999] hover:text-[#1a1a1a]"}`}
                  >
                    {cat}
                  </button>
                </li>
              ))}
            </ul>
          </aside>
        )}

        {/* Products */}
        <section className="flex-1">
          {/* Mobile search */}
          <div className="sm:hidden mb-6">
            <div className="flex items-center border border-[#d4cfc8] px-3 py-2 bg-white/50">
              <Search className="h-4 w-4 text-[#999] mr-2" />
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-transparent outline-none text-sm flex-1 placeholder:text-[#bbb]"
                style={{ fontFamily: "inherit" }}
              />
            </div>
          </div>

          {/* Mobile category pills */}
          {categories.length > 0 && (
            <div className="lg:hidden flex gap-2 overflow-x-auto pb-4 mb-6 -mx-1 px-1">
              <button
                onClick={() => setSelectedCategory(null)}
                className={`text-xs px-4 py-2 rounded-full whitespace-nowrap border transition-colors ${!selectedCategory ? "bg-[#1a1a1a] text-white border-[#1a1a1a]" : "border-[#d4cfc8] text-[#777] hover:border-[#1a1a1a]"}`}
              >
                All
              </button>
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`text-xs px-4 py-2 rounded-full whitespace-nowrap border transition-colors ${selectedCategory === cat ? "bg-[#1a1a1a] text-white border-[#1a1a1a]" : "border-[#d4cfc8] text-[#777] hover:border-[#1a1a1a]"}`}
                >
                  {cat}
                </button>
              ))}
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {filteredProducts.map((product) => (
              <div key={product.id} className="group">
                <div className="aspect-[3/4] bg-[#f0ebe5] mb-5 overflow-hidden relative">
                  {product.images[0] ? (
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      className="w-full h-full object-cover img-zoom"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <span className="text-6xl font-light text-[#d4cfc8]">{product.name[0]}</span>
                    </div>
                  )}
                  {product.compareAt && (
                    <div className="absolute top-4 left-4 bg-[#1a1a1a] text-white text-[10px] tracking-[0.15em] uppercase px-3 py-1.5">
                      Sale
                    </div>
                  )}
                  <button className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity bg-white/80 backdrop-blur-sm rounded-full p-2 hover:bg-white">
                    <Heart className="h-4 w-4 text-[#1a1a1a]" />
                  </button>
                </div>
                <div className="space-y-2">
                  {/* Ratings */}
                  <div className="flex gap-0.5">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star key={s} className="h-3 w-3 fill-[#c9a96e] text-[#c9a96e]" />
                    ))}
                    <span className="text-[10px] text-[#999] ml-1 font-sans">(24)</span>
                  </div>
                  <h3 className="text-base tracking-wide">{product.name}</h3>
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-medium">{formatPrice(product.price)}</span>
                    {product.compareAt && (
                      <span className="text-sm text-[#bbb] line-through">{formatPrice(product.compareAt)}</span>
                    )}
                  </div>
                  <Button
                    variant="outline"
                    className={`w-full rounded-none border-[#1a1a1a] text-[#1a1a1a] hover:bg-[#1a1a1a] hover:text-white transition-all duration-300 text-xs tracking-[0.15em] uppercase h-11 ${addedId === product.id ? "bg-[#1a1a1a] text-white" : ""}`}
                    onClick={() => handleAdd(product)}
                  >
                    {addedId === product.id ? "✓ Added" : "Add to Cart"}
                  </Button>
                </div>
              </div>
            ))}
          </div>
          {filteredProducts.length === 0 && (
            <p className="text-center text-[#bbb] py-20 italic">
              {searchQuery ? "No products match your search." : "No products available yet."}
            </p>
          )}
        </section>
      </div>

      {/* Footer */}
      <footer className="border-t border-[#e8e4df] py-16 text-center">
        <p className="text-xs tracking-[0.2em] uppercase text-[#bbb]">
          © {new Date().getFullYear()} {store.name}
        </p>
        <p className="text-[10px] text-[#ddd] mt-2">Powered by StoreCraft</p>
      </footer>
    </div>
  );
}
