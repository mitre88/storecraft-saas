import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { slugify } from "@/lib/utils";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) return NextResponse.json([]);

  const user = await prisma.user.findUnique({ where: { email: session.user.email } });
  if (!user) return NextResponse.json([]);

  const stores = await prisma.store.findMany({ where: { userId: user.id }, select: { id: true } });
  const storeIds = stores.map((s) => s.id);

  const products = await prisma.product.findMany({
    where: { storeId: { in: storeIds } },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json(products);
}

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    include: { stores: { take: 1 } },
  });

  if (!user || user.stores.length === 0) return NextResponse.json({ error: "No store" }, { status: 400 });

  const body = await req.json();
  const storeId = body.storeId || user.stores[0].id;
  const slug = slugify(body.name);

  const product = await prisma.product.create({
    data: {
      name: body.name,
      slug,
      description: body.description,
      price: body.price,
      compareAt: body.compareAt,
      images: body.images || [],
      category: body.category,
      tags: body.tags || [],
      variants: body.variants,
      inventory: body.inventory || 0,
      active: body.active ?? true,
      featured: body.featured ?? false,
      storeId,
    },
  });

  return NextResponse.json(product);
}
