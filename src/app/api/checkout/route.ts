import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { stripe } from "@/lib/stripe";
import { generateOrderNumber } from "@/lib/utils";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { storeSlug, items, customer } = body;

  const store = await prisma.store.findUnique({ where: { slug: storeSlug } });
  if (!store) return NextResponse.json({ error: "Store not found" }, { status: 404 });

  // Fetch products
  const productIds = items.map((i: { productId: string }) => i.productId);
  const products = await prisma.product.findMany({ where: { id: { in: productIds } } });

  const lineItems = items.map((item: { productId: string; quantity: number }) => {
    const product = products.find((p) => p.id === item.productId);
    if (!product) throw new Error(`Product ${item.productId} not found`);
    return {
      price_data: {
        currency: store.currency.toLowerCase(),
        product_data: { name: product.name },
        unit_amount: Math.round(product.price * 100),
      },
      quantity: item.quantity,
    };
  });

  // Calculate total
  const total = items.reduce((sum: number, item: { productId: string; quantity: number }) => {
    const product = products.find((p) => p.id === item.productId);
    return sum + (product?.price || 0) * item.quantity;
  }, 0);

  // Create order
  const order = await prisma.order.create({
    data: {
      orderNumber: generateOrderNumber(),
      total,
      subtotal: total,
      customerEmail: customer.email,
      customerName: customer.name,
      shippingAddress: { address: customer.address, city: customer.city, zip: customer.zip, country: customer.country },
      storeId: store.id,
      items: {
        create: items.map((item: { productId: string; quantity: number; variant?: string }) => {
          const product = products.find((p) => p.id === item.productId);
          return {
            productId: item.productId,
            quantity: item.quantity,
            price: product?.price || 0,
            variant: item.variant,
          };
        }),
      },
    },
  });

  // Create Stripe session
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: "payment",
      success_url: `${req.nextUrl.origin}/store/${storeSlug}?order=${order.id}&success=true`,
      cancel_url: `${req.nextUrl.origin}/store/${storeSlug}/cart`,
      metadata: { orderId: order.id },
    });

    return NextResponse.json({ url: session.url, orderId: order.id });
  } catch {
    // If Stripe is not configured, return order directly
    return NextResponse.json({ url: `/store/${storeSlug}?order=${order.id}&success=true`, orderId: order.id });
  }
}
