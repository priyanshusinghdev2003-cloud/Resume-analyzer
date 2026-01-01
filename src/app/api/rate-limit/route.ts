import { NextRequest, NextResponse } from "next/server";
import { fetchLimit } from "../../../../lib/rateLimit";

export async function POST(req: NextRequest) {
  try {
    const { key } = await req.json();
    const limit = await fetchLimit(key);
    if (!limit) {
      return NextResponse.json({ message: "error", limit: 5 });
    }
    if (Number(limit) >= 5) {
      return NextResponse.json({ message: "Used All Token", limit: 0 });
    }

    return NextResponse.json({ message: "success", limit: 5 - Number(limit) });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "error", limit: 5 });
  }
}
