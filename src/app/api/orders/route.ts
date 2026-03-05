import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) return NextResponse.json([]);

  const user = await prisma.user.findUnique({ where: { email: session.user.email } });
  if (!user) return NextResponse.json([]);

  const stores = await prisma.store.findMany({ where: { userId: user.id }, select: { id: true } });
  const storeIds = stores.map((s) => s.id);

  const orders = await prisma.order.findMany({
    where: { storeId: { in: storeIds } },
    include: { items: { include: { product: { select: { name: true } } } } },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json(orders);
}
