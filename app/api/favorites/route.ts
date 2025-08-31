import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  // TODO: Fetch saved recipes from DB/localStorage
  return NextResponse.json({ savedRecipes: [] });
}

export async function POST(req: NextRequest) {
  try {
    const { recipeId } = await req.json();
    if (!recipeId) {
      return NextResponse.json({ error: "No recipe ID provided" }, { status: 400 });
    }

    // TODO: Add recipe to favorites (DB/localStorage)
    return NextResponse.json({ message: "Recipe saved" });
  } catch (err) {
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
