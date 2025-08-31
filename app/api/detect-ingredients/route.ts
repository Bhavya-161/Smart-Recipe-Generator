import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
   console.log("OPENAI_API_KEY =", process.env.OPENAI_API_KEY);
  try {
    const { base64Image } = await req.json();

    if (!base64Image) {
      return NextResponse.json({ error: "No image provided" }, { status: 400 });
    }

    const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
    if (!OPENAI_API_KEY) {
      return NextResponse.json({ error: "OpenAI API key not set" }, { status: 500 });
    }

    // Call OpenAI Chat Completions API
    const completion = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "user",
            content: [
              { type: "text", text: "List all visible food ingredients in this image, comma-separated, no extra text." },
              { type: "image_url", image_url: { url: `data:image/png;base64,${base64Image}` } }
            ]
          }
        ]
      })
    });

    if (!completion.ok) {
      const errText = await completion.text();
      return NextResponse.json({ error: "OpenAI error", details: errText }, { status: 500 });
    }

    const data = await completion.json();
    const text = data.choices?.[0]?.message?.content || "";
    const ingredients = text.split(",").map((i: string) => i.trim().toLowerCase()).filter(Boolean);

    return NextResponse.json({ ingredients });

  } catch (err) {
    return NextResponse.json({ error: "Failed to detect ingredients", details: String(err) }, { status: 500 });
  }
}
