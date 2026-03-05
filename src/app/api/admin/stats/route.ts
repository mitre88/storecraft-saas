import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) return NextResponse.json({ totalRevenue: 0, totalOrders: 0, totalProducts: 0, recentOrders: [] });

  const user = await prisma.user.findUnique({ where: { email: session.user.email } });
  if (!user) return NextResponse.json({ totalRevenue: 0, totalOrders: 0, totalProducts: 0, recentOrders: [] });

  const stores = await prisma.store.findMany({ where: { userId: user.id }, select: { id: true } });
  const storeIds = stores.map((s) => s.id);

  const [orders, totalProducts] = await Promise.all([
    prisma.order.findMany({
      where: { storeId: { in: storeIds } },
      orderBy: { createdAt: "desc" },
      take: 10,
    }),
    prisma.product.count({ where: { storeId: { in: storeIds } } }),
  ]);

  const totalRevenue = orders.reduce((s, o) => s + o.total, 0);

  return NextResponse.json({
    totalRevenue,
    totalOrders: orders.length,
    totalProducts,
    recentOrders: orders.slice(0, 5),
  });
}
