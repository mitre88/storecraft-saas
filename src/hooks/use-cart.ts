"use client";
import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface CartItem {
  id: string;
  name: string;
  price: number;
  image?: string;
  variant?: string;
  quantity: number;
  storeSlug: string;
}

interface CartState {
  items: CartItem[];
  addItem: (item: Omit<CartItem, "quantity">) => void;
  removeItem: (id: string, variant?: string) => void;
  updateQuantity: (id: string, quantity: number, variant?: string) => void;
  clearCart: (storeSlug?: string) => void;
  getStoreItems: (storeSlug: string) => CartItem[];
  getStoreTotal: (storeSlug: string) => number;
}

export const useCart = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (item) =>
        set((state) => {
          const existing = state.items.find(
            (i) => i.id === item.id && i.variant === item.variant && i.storeSlug === item.storeSlug
          );
          if (existing) {
            return {
              items: state.items.map((i) =>
                i.id === item.id && i.variant === item.variant && i.storeSlug === item.storeSlug
                  ? { ...i, quantity: i.quantity + 1 }
                  : i
              ),
            };
          }
          return { items: [...state.items, { ...item, quantity: 1 }] };
        }),
      removeItem: (id, variant) =>
        set((state) => ({
          items: state.items.filter((i) => !(i.id === id && i.variant === variant)),
        })),
      updateQuantity: (id, quantity, variant) =>
        set((state) => ({
          items: quantity <= 0
            ? state.items.filter((i) => !(i.id === id && i.variant === variant))
            : state.items.map((i) =>
                i.id === id && i.variant === variant ? { ...i, quantity } : i
              ),
        })),
      clearCart: (storeSlug) =>
        set((state) => ({
          items: storeSlug ? state.items.filter((i) => i.storeSlug !== storeSlug) : [],
        })),
      getStoreItems: (storeSlug) => get().items.filter((i) => i.storeSlug === storeSlug),
      getStoreTotal: (storeSlug) =>
        get()
          .items.filter((i) => i.storeSlug === storeSlug)
          .reduce((sum, i) => sum + i.price * i.quantity, 0),
    }),
    { name: "storecraft-cart" }
  )
);
