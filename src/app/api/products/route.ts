import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    products: [
      { name: "nokia", price: 700 },
      { name: "iphone", price: 1000 },
      { name: "samsung", price: 800 },
    ],
  });
}
