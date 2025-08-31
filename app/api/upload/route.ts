import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { base64Image } = await req.json();
    if (!base64Image) {
      return NextResponse.json({ error: "No image provided" }, { status: 400 });
    }

    // TODO: Upload image to storage or process it
    return NextResponse.json({ message: "Image uploaded successfully" });
  } catch (err) {
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
