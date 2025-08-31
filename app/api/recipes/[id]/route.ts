import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  if (!id) {
    return NextResponse.json({ error: "Recipe ID missing" }, { status: 400 });
  }

  // TODO: Fetch recipe by ID from DB / data file
  const recipe = { id, title: "Sample Recipe", ingredients: ["tomato", "cheese"] };
  return NextResponse.json(recipe);
}

