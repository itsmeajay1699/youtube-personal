import { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";
import { prisma } from "../../../../../lib/prisma";
export async function POST(req: Request, res: NextApiResponse) {
  try {
    const { email, password } = await req.json();
    const user = await prisma.user.create({
      data: {
        email,
        password,
      },
    });
    return NextResponse.json({ user });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: e });
  }
}
