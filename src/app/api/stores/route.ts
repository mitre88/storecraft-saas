import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { slugify } from "@/lib/utils";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) return NextResponse.json([], { status: 401 });

  const user = await prisma.user.findUnique({ where: { email: session.user.email } });
  if (!user) return NextResponse.json([], { status: 401 });

  const stores = await prisma.store.findMany({ where: { userId: user.id } });
  return NextResponse.json(stores);
}

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const user = await prisma.user.findUnique({ where: { email: session.user.email } });
  if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 });

  const body = await req.json();
  const slug = slugify(body.name) + "-" + Math.random().toString(36).substring(2, 6);

  const store = await prisma.store.create({
    data: {
      name: body.name,
      slug,
      category: body.category,
      template: body.template || "minimalist",
      primaryColor: body.primaryColor || "#000000",
      secondaryColor: body.secondaryColor || "#ffffff",
      accentColor: body.accentColor || "#3b82f6",
      userId: user.id,
    },
  });

  return NextResponse.json(store);
}
