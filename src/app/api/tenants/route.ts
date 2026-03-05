import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

export async function POST(req: NextRequest) {
  const body = await req.json();

  const existing = await prisma.user.findUnique({ where: { email: body.email } });
  if (existing) return NextResponse.json({ error: "Email already registered" }, { status: 400 });

  const hashedPassword = await bcrypt.hash(body.password, 12);

  const user = await prisma.user.create({
    data: {
      email: body.email,
      name: body.name,
      hashedPassword,
    },
  });

  return NextResponse.json({ id: user.id, email: user.email, name: user.name });
}
