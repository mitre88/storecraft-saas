"use client";

import { use, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useCart } from "@/hooks/use-cart";
import { demoProducts, demoReviews } from "@/lib/demo-data";
import { formatPrice } from "@/lib/utils";
import { ShoppingBag, ShoppingCart, Star, ArrowLeft, Minus, Plus, Check } from "lucide-react";

export default function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const product = demoProducts.find((p) => p.id === id);
  const { addItem, getStoreItems } = useCart();
  const cartCount = getStoreItems("demo").reduce((sum, i) => sum + i.quantity, 0);
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-2">Product not found</h1>
          <Link href="/store/demo"><Button variant="outline">Back to store</Button></Link>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    const variant = [selectedSize, selectedColor].filter(Boolean).join(" / ") || undefined;
    for (let i = 0; i < quantity; i++) {
      addItem({ id: product.id, name: product.name, price: product.price, image: product.images[0], variant, storeSlug: "demo" });
    }
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex h-16 items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/store/demo" className="text-muted-foreground hover:text-foreground">
              <ArrowLeft className="h-4 w-4" />
            </Link>
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center">
                <ShoppingBag className="h-4 w-4 text-white" />
              </div>
              <span className="font-bold">The Demo Shop</span>
            </div>
          </div>
          <Link href="/store/demo/cart">
            <Button variant="outline" size="sm" className="relative">
              <ShoppingCart className="h-4 w-4 mr-2" /> Cart
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 h-5 w-5 rounded-full bg-indigo-500 text-white text-xs flex items-center justify-center">{cartCount}</span>
              )}
            </Button>
          </Link>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Image Gallery */}
          <div>
            <div className="aspect-[3/4] relative rounded-2xl overflow-hidden bg-muted mb-4">
              <Image
                src={product.images[selectedImage]}
                alt={product.name}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
                priority
              />
              {product.compareAt && (
                <Badge className="absolute top-4 left-4 bg-red-500 text-white border-0 text-sm px-3 py-1">
                  Sale
                </Badge>
              )}
            </div>
            {product.images.length > 1 && (
              <div className="flex gap-3">
                {product.images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedImage(i)}
                    className={`relative w-20 h-20 rounded-xl overflow-hidden border-2 transition-all ${
                      selectedImage === i ? "border-indigo-500 ring-2 ring-indigo-500/20" : "border-transparent opacity-60 hover:opacity-100"
                    }`}
                  >
                    <Image src={img} alt="" fill sizes="80px" className="object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div>
            <p className="text-sm text-muted-foreground mb-2">{product.category}</p>
            <h1 className="text-3xl sm:text-4xl font-bold mb-3">{product.name}</h1>
            <div className="flex items-center gap-2 mb-4">
              <div className="flex items-center gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className={`h-4 w-4 ${i < Math.floor(product.rating) ? "fill-amber-400 text-amber-400" : "text-muted"}`} />
                ))}
              </div>
              <span className="text-sm font-medium">{product.rating}</span>
              <span className="text-sm text-muted-foreground">({product.reviews} reviews)</span>
            </div>
            <div className="flex items-center gap-3 mb-6">
              <span className="text-3xl font-bold">{formatPrice(product.price)}</span>
              {product.compareAt && (
                <>
                  <span className="text-lg text-muted-foreground line-through">{formatPrice(product.compareAt)}</span>
                  <Badge variant="secondary" className="bg-red-500/10 text-red-500 border-red-500/20">
                    Save {formatPrice(product.compareAt - product.price)}
                  </Badge>
                </>
              )}
            </div>
            <p className="text-muted-foreground leading-relaxed mb-8">{product.description}</p>

            {/* Size Selector */}
            {product.sizes && (
              <div className="mb-6">
                <label className="text-sm font-medium block mb-3">Size</label>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`h-10 min-w-[44px] px-4 rounded-lg border-2 text-sm font-medium transition-all ${
                        selectedSize === size
                          ? "border-indigo-500 bg-indigo-500/10 text-indigo-400"
                          : "border-muted hover:border-muted-foreground/30"
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Color Selector */}
            {product.colors && (
              <div className="mb-6">
                <label className="text-sm font-medium block mb-3">Color{selectedColor && `: ${selectedColor}`}</label>
                <div className="flex flex-wrap gap-2">
                  {product.colors.map((color) => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={`h-10 px-4 rounded-lg border-2 text-sm font-medium transition-all ${
                        selectedColor === color
                          ? "border-indigo-500 bg-indigo-500/10 text-indigo-400"
                          : "border-muted hover:border-muted-foreground/30"
                      }`}
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity */}
            <div className="mb-8">
              <label className="text-sm font-medium block mb-3">Quantity</label>
              <div className="flex items-center gap-3">
                <Button variant="outline" size="icon" onClick={() => setQuantity(Math.max(1, quantity - 1))} className="h-10 w-10">
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="w-12 text-center font-medium">{quantity}</span>
                <Button variant="outline" size="icon" onClick={() => setQuantity(quantity + 1)} className="h-10 w-10">
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Add to Cart */}
            <Button
              size="lg"
              className="w-full h-14 text-base bg-gradient-to-r from-indigo-500 to-violet-600 hover:from-indigo-600 hover:to-violet-700 text-white border-0 shadow-lg"
              onClick={handleAddToCart}
            >
              {added ? (
                <><Check className="mr-2 h-5 w-5" /> Added to Cart!</>
              ) : (
                <><ShoppingCart className="mr-2 h-5 w-5" /> Add to Cart — {formatPrice(product.price * quantity)}</>
              )}
            </Button>
          </div>
        </div>

        {/* Reviews Section */}
        <section className="mt-16 pt-12 border-t">
          <h2 className="text-2xl font-bold mb-8">Customer Reviews</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {demoReviews.map((review, i) => (
              <Card key={i} className="border-0 shadow-sm">
                <CardContent className="pt-6">
                  <div className="flex items-center gap-1 mb-2">
                    {Array.from({ length: review.rating }).map((_, j) => (
                      <Star key={j} className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <p className="text-sm mb-3">{review.text}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">{review.author}</span>
                    <span className="text-xs text-muted-foreground">{review.date}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
