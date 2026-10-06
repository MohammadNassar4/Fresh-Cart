import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const token = await getToken({ req: req });

  if (!token) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const response = await fetch(`${process.env.API_BASE_URL}orders/user/${token.id}`);

  if (!response.ok) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });;

  const payload = await response.json();
  return NextResponse.json(payload);

}
