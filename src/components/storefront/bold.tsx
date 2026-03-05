"use client";

import Link from "next/link";
import { useState, useMemo } from "react";
import { ShoppingCart, Sparkles, Search, Star, Zap, Heart, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useCart } from "@/hooks/use-cart";
import type { StoreData } from "@/types/store";
import { formatPrice } from "@/lib/utils";

export function BoldStore({ store }: { store: StoreData }) {
  const { addItem, getStoreItems } = useCart();
  const cartCount = getStoreItems(store.slug).reduce((s, i) => s + i.quantity, 0);
  const featured = store.products.filter((p) => p.featured);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [addedId, setAddedId] = useState<string | null>(null);
  const [showFilters, setShowFilters] = useState(false);

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

  const discount = (price: number, compare: number | null) => {
    if (!compare || compare <= price) return null;
    return Math.round(((compare - price) / compare) * 100);
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white" style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>
      {/* Header */}
      <header className="sticky top-0 z-40 bg-gradient-to-r from-indigo-600 via-violet-600 to-purple-600 shadow-lg shadow-indigo-500/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16">
          <h1 className="text-xl font-black tracking-tight flex items-center gap-2">
            <Zap className="h-5 w-5 text-yellow-300" />
            {store.name}
          </h1>
          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center bg-white/15 backdrop-blur-sm rounded-full px-4 py-2 focus-within:bg-white/25 transition-colors">
              <Search className="h-4 w-4 text-white/70 mr-2" />
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-transparent outline-none text-sm w-32 placeholder:text-white/50 text-white"
              />
            </div>
            <Link href={`/store/${store.slug}/cart`} className="relative group">
              <div className="bg-white/15 rounded-full p-2.5 group-hover:bg-white/25 transition-colors">
                <ShoppingCart className="h-5 w-5" />
              </div>
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-yellow-400 text-black text-[10px] rounded-full h-5 w-5 flex items-center justify-center font-bold cart-bounce">
                  {cartCount}
                </span>
              )}
            </Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-600 via-violet-600 to-fuchsia-600 opacity-90" />
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMiIvPjwvZz48L2c+PC9zdmc+')] opacity-50" />
        <div className="relative py-20 sm:py-28 px-4 sm:px-6 text-center max-w-4xl mx-auto">
          <Badge className="mb-6 bg-white/15 text-white border-white/20 backdrop-blur-sm px-4 py-2">
            <Sparkles className="mr-2 h-3.5 w-3.5 text-yellow-300" /> New arrivals are here
          </Badge>
          <h2 className="text-5xl sm:text-7xl font-black tracking-tight mb-6 leading-[0.95] drop-shadow-lg">
            {store.name}
          </h2>
          {store.description && (
            <p className="text-xl text-white/80 max-w-2xl mx-auto leading-relaxed">{store.description}</p>
          )}
          <div className="flex flex-col sm:flex-row gap-3 justify-center mt-10">
            <Button className="bg-white text-violet-700 hover:bg-white/90 font-bold text-lg px-8 h-14 rounded-full shadow-xl hover:scale-105 transition-all">
              <Sparkles className="mr-2 h-5 w-5" /> Shop Now
            </Button>
            <Button variant="outline" className="border-white/30 text-white hover:bg-white/10 font-bold text-lg px-8 h-14 rounded-full backdrop-blur-sm">
              View Collection
            </Button>
          </div>
        </div>
      </section>

      {/* Featured */}
      {featured.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
          <div className="flex items-center gap-3 mb-8">
            <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center">
              <Sparkles className="h-5 w-5 text-white" />
            </div>
            <h3 className="text-2xl font-black">Featured Picks</h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {featured.slice(0, 2).map((product) => {
              const pct = discount(product.price, product.compareAt);
              return (
                <div key={product.id} className="rounded-2xl overflow-hidden bg-gradient-to-br from-neutral-900 to-neutral-800 border border-white/5 group hover:border-violet-500/30 transition-all shadow-xl hover:shadow-violet-500/10">
                  <div className="aspect-video overflow-hidden relative">
                    {product.images[0] ? (
                      <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover img-zoom" />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-violet-600/20 to-fuchsia-600/20 flex items-center justify-center">
                        <span className="text-6xl font-black opacity-20">{product.name[0]}</span>
                      </div>
                    )}
                    {pct && (
                      <div className="absolute top-4 left-4 bg-red-500 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg">
                        -{pct}%
                      </div>
                    )}
                    <Badge className="absolute top-4 right-4 bg-yellow-400 text-black border-0 font-bold">
                      <Star className="h-3 w-3 mr-1 fill-current" /> Featured
                    </Badge>
                  </div>
                  <div className="p-6">
                    <div className="flex gap-0.5 mb-2">
                      {[1, 2, 3, 4, 5].map((s) => (
                        <Star key={s} className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" />
                      ))}
                      <span className="text-xs text-white/40 ml-1">(128)</span>
                    </div>
                    <h4 className="text-xl font-bold">{product.name}</h4>
                    <div className="flex items-center gap-3 mt-2">
                      <p className="text-2xl font-black bg-gradient-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-transparent">
                        {formatPrice(product.price)}
                      </p>
                      {product.compareAt && (
                        <p className="text-sm text-white/30 line-through">{formatPrice(product.compareAt)}</p>
                      )}
                    </div>
                    <Button
                      className={`w-full mt-4 rounded-full font-bold h-12 transition-all ${addedId === product.id ? "bg-emerald-500 hover:bg-emerald-500" : "bg-gradient-to-r from-violet-500 to-fuchsia-500 hover:from-violet-600 hover:to-fuchsia-600"} text-white shadow-lg hover:shadow-violet-500/25 hover:scale-[1.02]`}
                      onClick={() => handleAdd(product)}
                    >
                      {addedId === product.id ? "✓ Added to Cart!" : "Add to Cart"}
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* All Products with Filters */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="flex items-center justify-between mb-8">
          <h3 className="text-2xl font-black">All Products</h3>
          <div className="flex items-center gap-3">
            {/* Mobile search */}
            <div className="sm:hidden">
              <div className="flex items-center bg-white/10 rounded-full px-3 py-2">
                <Search className="h-4 w-4 text-white/50 mr-2" />
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="bg-transparent outline-none text-sm w-24 placeholder:text-white/30 text-white"
                />
              </div>
            </div>
            {categories.length > 0 && (
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="lg:hidden flex items-center gap-2 bg-white/10 rounded-full px-4 py-2 text-sm hover:bg-white/15 transition-colors"
              >
                <Filter className="h-4 w-4" /> Filter
              </button>
            )}
          </div>
        </div>

        {/* Category pills */}
        {categories.length > 0 && (
          <div className={`flex flex-wrap gap-2 mb-8 ${showFilters ? "" : "hidden lg:flex"}`}>
            <button
              onClick={() => setSelectedCategory(null)}
              className={`text-xs px-5 py-2.5 rounded-full font-medium transition-all ${!selectedCategory ? "bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white shadow-lg" : "bg-white/10 text-white/60 hover:bg-white/15 hover:text-white"}`}
            >
              All
            </button>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`text-xs px-5 py-2.5 rounded-full font-medium transition-all ${selectedCategory === cat ? "bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white shadow-lg" : "bg-white/10 text-white/60 hover:bg-white/15 hover:text-white"}`}
              >
                {cat}
              </button>
            ))}
          </div>
        )}

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {filteredProducts.map((product) => {
            const pct = discount(product.price, product.compareAt);
            return (
              <div key={product.id} className="rounded-2xl overflow-hidden bg-neutral-900 border border-white/5 group hover:border-violet-500/20 transition-all hover:-translate-y-1 hover:shadow-xl hover:shadow-violet-500/5">
                <div className="aspect-square overflow-hidden relative">
                  {product.images[0] ? (
                    <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover img-zoom" />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-neutral-800 to-neutral-900 flex items-center justify-center">
                      <span className="text-4xl font-black text-white/10">{product.name[0]}</span>
                    </div>
                  )}
                  {pct && (
                    <div className="absolute top-3 left-3 bg-red-500 text-white text-[10px] font-bold px-2.5 py-1 rounded-full">
                      -{pct}%
                    </div>
                  )}
                  {product.featured && (
                    <div className="absolute top-3 right-3 bg-yellow-400 text-black text-[10px] font-bold px-2.5 py-1 rounded-full">
                      ⭐ HOT
                    </div>
                  )}
                  <button className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-all bg-black/50 backdrop-blur-sm rounded-full p-2.5 hover:bg-black/70">
                    <Heart className="h-4 w-4 text-white" />
                  </button>
                </div>
                <div className="p-4">
                  <div className="flex gap-0.5 mb-1.5">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star key={s} className={`h-3 w-3 ${s <= 4 ? "fill-yellow-400 text-yellow-400" : "fill-white/10 text-white/10"}`} />
                    ))}
                    <span className="text-[10px] text-white/30 ml-1">(42)</span>
                  </div>
                  <h4 className="font-bold text-sm truncate">{product.name}</h4>
                  <div className="flex items-center gap-2 mt-1.5">
                    <span className="font-black text-sm bg-gradient-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-transparent">
                      {formatPrice(product.price)}
                    </span>
                    {product.compareAt && (
                      <span className="text-[11px] text-white/25 line-through">{formatPrice(product.compareAt)}</span>
                    )}
                  </div>
                  {product.category && (
                    <Badge variant="secondary" className="mt-2 text-[10px] bg-white/5 text-white/50 border-white/10">{product.category}</Badge>
                  )}
                  <Button
                    size="sm"
                    className={`w-full mt-3 rounded-full font-bold text-xs h-10 transition-all ${addedId === product.id ? "bg-emerald-500 hover:bg-emerald-500" : "bg-gradient-to-r from-violet-500 to-fuchsia-500 hover:from-violet-600 hover:to-fuchsia-600"} text-white hover:scale-[1.02]`}
                    onClick={() => handleAdd(product)}
                  >
                    {addedId === product.id ? "✓ Added!" : "Quick Add"}
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
        {filteredProducts.length === 0 && (
          <div className="text-center py-20">
            <p className="text-white/30 text-lg">{searchQuery ? "No products match your search." : "No products available yet."}</p>
          </div>
        )}
      </section>

      {/* Footer */}
      <footer className="py-12 text-center border-t border-white/5 bg-black/30">
        <p className="text-sm text-white/30">© {new Date().getFullYear()} {store.name}. Powered by StoreCraft.</p>
      </footer>
    </div>
  );
}
