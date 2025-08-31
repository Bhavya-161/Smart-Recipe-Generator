import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
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

// import { NextRequest, NextResponse } from "next/server";

// export async function POST(req: NextRequest) {
//   try {
//     const { base64Image } = await req.json();
//     if (!base64Image) {
//       return NextResponse.json({ error: "No image provided" }, { status: 400 });
//     }

//     // Call OpenAI REST API (vision capable)
//     const completion = await fetch("https://api.openai.com/v1/chat/completions", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
//       },
//       body: JSON.stringify({
//         model: "gpt-4o",
//         messages: [
//           {
//             role: "user",
//             content: [
//               {
//                 type: "text",
//                 text: "List all visible food ingredients in this image, comma-separated, no extra text."
//               },
//               {
//                 type: "image_url",
//                 image_url: `data:image/jpeg;base64,${base64Image}`
//               }
//             ]
//           }
//         ]
//       })
//     });

//     if (!completion.ok) {
//       const errText = await completion.text();
//       return NextResponse.json({ error: "OpenAI error", details: errText }, { status: 500 });
//     }

//     const data = await completion.json();
//     const text = data.choices?.[0]?.message?.content || "";
//     const ingredients = text
//       .split(",")
//       .map((i: string) => i.trim().toLowerCase())
//       .filter(Boolean);

//     return NextResponse.json({ ingredients });

//   } catch (err) {
//     return NextResponse.json({ error: "Failed to detect ingredients", details: String(err) }, { status: 500 });
//   }
// }





// import { NextRequest, NextResponse } from "next/server";
// import OpenAI from "openai";

// const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// export async function POST(req: NextRequest) {
//   try {
//     const { base64Image } = await req.json();
//     if (!base64Image) {
//       return NextResponse.json({ error: "No image provided" }, { status: 400 });
//     }

//     const response = await client.responses.create({
//       model: "gpt-4.1-mini", // vision-capable
//       input: [
//         {
//           role: "user",
//           content: [
//             { type: "input_text", text: "List all visible food ingredients in this image, comma-separated, no extra text." },
//             { type: "input_image", image: { base64: base64Image } }
//           ]
//         }
//       ]
//     });

//     const rawText = response.output_text || "";
//     const ingredients = rawText
//       .split(",")
//       .map(i => i.trim().toLowerCase())
//       .filter(Boolean);

//     return NextResponse.json({ ingredients });

//   } catch (err) {
//     console.error("Ingredient detection failed:", err);
//     return NextResponse.json(
//       { error: "Failed to detect ingredients", details: String(err) },
//       { status: 500 }
//     );
//   }
// }


// import { NextRequest, NextResponse } from "next/server";
// import OpenAI from "openai";

// const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// export async function POST(req: NextRequest) {
//   try {
//     const { base64Image } = await req.json();
//     if (!base64Image)
//       return NextResponse.json({ error: "No image provided" }, { status: 400 });

//     // Correct OpenAI API call
//     const response = await client.responses.create({
//       model: "gpt-4.1-mini",
//       input: [
//         {
//           role: "user",
//           content: [
//             { type: "text", text: "List all visible food ingredients in this image, comma-separated, no extra text." },
//             { type: "image", image: { base64: base64Image } }
//           ]
//         }
//       ]
//     });

//     const rawText = response.output_text || "";
//     const ingredients = rawText
//       .split(",")
//       .map(i => i.trim().toLowerCase())
//       .filter(Boolean);

//     return NextResponse.json({ ingredients });
//   } catch (err: any) {
//     console.error("Ingredient detection failed:", err);
//     return NextResponse.json({ error: "Failed to detect ingredients", details: String(err) }, { status: 500 });
//   }
// }





// import { NextRequest, NextResponse } from "next/server";

// export async function POST(req: NextRequest) {
//   try {
//     const { base64Image } = await req.json();
//     if (!base64Image) {
//       return NextResponse.json({ error: "No image provided" }, { status: 400 });
//     }

//     // Call OpenAI Chat Completion API with vision (image understanding)
//     const completion = await fetch("https://api.openai.com/v1/chat/completions", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
//       },
//       body: JSON.stringify({
//         model: "gpt-4o", // or "gpt-4-vision-preview"
//         messages: [
//           {
//             role: "user",
//             content: [
//               { type: "text", text: "List the visible food ingredients in this image, comma separated. No extra text." },
//               { type: "image_url", image_url: { url: `data:image/jpeg;base64,${base64Image}` } }
//             ],
//           },
//         ],
//       }),
//     });

//     if (!completion.ok) {
//       const errText = await completion.text();
//       return NextResponse.json({ error: "OpenAI error", details: errText }, { status: 500 });
//     }

//     const data = await completion.json();
//     const text = data.choices?.[0]?.message?.content || "";
//     const ingredients = text
//       .split(",")
//       .map((i: string) => i.trim().toLowerCase())
//       .filter(Boolean);

//     return NextResponse.json({ ingredients });
//   } catch (err) {
//     return NextResponse.json({ error: "Failed to detect ingredients", details: String(err) }, { status: 500 });
//   }
// }



















// // route.ts
// import { NextRequest, NextResponse } from "next/server";

// export async function POST(req: NextRequest) {
//   try {
//     const { base64Image } = await req.json();
//     if (!base64Image) return NextResponse.json({ error: "No image provided" }, { status: 400 });

//     const resp = await fetch("https://api.openai.com/v1/responses", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
//       },
//       body: JSON.stringify({
//         model: "gpt-4.1-mini",
//         input: [
//           {
//             role: "user",
//             content: [
//               { type: "text", text: "List all visible food ingredients in this image, comma separated." },
//               { type: "image", image: { base64: base64Image } }
//             ]
//           }
//         ]
//       }),
//     });

//     if (!resp.ok) {
//       const errText = await resp.text();
//       console.error("OpenAI API error:", errText);
//       return NextResponse.json({ error: "Failed to detect ingredients" }, { status: 500 });
//     }

//     const data = await resp.json();
//     const raw = data.output_text || "";
//     const ingredients = raw.split(",").map((i: string) => i.trim().toLowerCase()).filter(Boolean);

//     return NextResponse.json({ ingredients });
//   } catch (err) {
//     console.error("Ingredient detection failed:", err);
//     return NextResponse.json({ error: "Failed to detect ingredients" }, { status: 500 });
//   }
// }















// import { NextRequest, NextResponse } from "next/server";

// export async function POST(req: NextRequest) {
//   try {
//     const { base64Image } = await req.json();
//     if (!base64Image) return NextResponse.json({ error: "No image provided" }, { status: 400 });

//     const resp = await fetch("https://api.openai.com/v1/responses", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
//       },
//       body: JSON.stringify({
//         model: "gpt-4.1-mini",
//         input: [
//           {
//             role: "user",
//             content: [
//               { type: "text", text: "Identify all visible food ingredients in this image. Reply only with a comma-separated list." },
//               { type: "image", image: { base64: base64Image } }
//             ]
//           }
//         ]
//       }),
//     });

//     if (!resp.ok) {
//       const errText = await resp.text();
//       console.error("OpenAI API error:", errText);
//       return NextResponse.json({ error: "Failed to detect ingredients" }, { status: 500 });
//     }

//     const data = await resp.json();

//     // Extract text output
//     const raw = data.output_text || "";
//     const ingredients = raw.split(",").map((i: string) => i.trim().toLowerCase()).filter(Boolean);

//     return NextResponse.json({ ingredients });
//   } catch (err) {
//     console.error("Ingredient detection failed:", err);
//     return NextResponse.json({ error: "Failed to detect ingredients" }, { status: 500 });
//   }
// }


// import { NextRequest, NextResponse } from "next/server";
// import OpenAI from "openai";

// const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// export async function POST(req: NextRequest) {
//   try {
//     const { base64Image } = await req.json();

//     if (!base64Image) {
//       return NextResponse.json({ error: "No image provided" }, { status: 400 });
//     }

//     // ✅ Latest working syntax without TS errors
//     const response = await client.chat.completions.create({
//       model: "gpt-4o-mini",
//       messages: [
//         {
//           role: "user",
//           content: [
//             {
//               type: "input_text",
//               text: "Identify all visible food ingredients in this image. Reply only with a comma-separated list."
//             },
//             {
//               type: "input_image",
//               image_url: `data:image/jpeg;base64,${base64Image}`
//             }
//           ]
//         }
//       ]
//     });

//     const raw = response.choices?.[0]?.message?.content || "";
//     const ingredients = raw
//       .split(",")
//       .map((i) => i.trim().toLowerCase())
//       .filter(Boolean);

//     return NextResponse.json({ ingredients });
//   } catch (err) {
//     console.error("Ingredient detection failed:", err);
//     return NextResponse.json({ error: "Failed to detect ingredients" }, { status: 500 });
//   }
// }



















// import { NextRequest, NextResponse } from "next/server";
// import OpenAI from "openai";

// const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// export async function POST(req: NextRequest) {
//   try {
//     const { base64Image } = await req.json();

//     if (!base64Image) {
//       return NextResponse.json({ error: "No image provided" }, { status: 400 });
//     }

//     // Send to OpenAI Vision
//     const response = await client.chat.completions.create({
//       model: "gpt-4o-mini", // vision-capable
//       messages: [
//         {
//           role: "user",
//           content: [
//             {
//               type: "input_text",
//               text: "Identify all visible food ingredients in this image. Reply only with a comma-separated list."
//             },
//             {
//               type: "input_image",
//               image_url: `data:image/jpeg;base64,${base64Image}`
//             }
//           ]
//         }
//       ]
//     });

//     const raw = response.choices[0].message?.content || "";
//     const ingredients = raw
//       .split(",")
//       .map((i) => i.trim().toLowerCase())
//       .filter(Boolean);

//     return NextResponse.json({ ingredients });
//   } catch (err: any) {
//     console.error("Ingredient detection failed:", err);
//     return NextResponse.json(
//       { error: "Failed to detect ingredients", details: err.message || err },
//       { status: 500 }
//     );
//   }
// }




// // app/api/detect-ingredients/route.ts
// import { NextRequest, NextResponse } from "next/server";
// import OpenAI from "openai";

// const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// // Helper to upload base64 image to ImgBB
// async function uploadImageToImgBB(base64: string) {
//   const form = new FormData();
//   form.append("image", base64);
//   form.append("key", process.env.IMGBB_API_KEY!);

//   const res = await fetch("https://api.imgbb.com/1/upload", {
//     method: "POST",
//     body: form,
//   });
//   const data = await res.json();
//   return data.data.url; // public URL
// }

// export async function POST(req: NextRequest) {
//   try {
//     const { base64Image } = await req.json();
//     if (!base64Image) return NextResponse.json({ error: "No image provided" }, { status: 400 });

//     const imageUrl = await uploadImageToImgBB(base64Image);

//     const response = await client.chat.completions.create({
//       model: "gpt-4o-mini",
//       messages: [
//         {
//           role: "user",
//           content: `Identify all visible food ingredients in this image: ${imageUrl}. Reply only with a comma-separated list.`
//         }
//       ]
//     });

//     const raw = response.choices[0].message?.content || "";
//     const ingredients = raw.split(",").map(i => i.trim().toLowerCase()).filter(Boolean);

//     return NextResponse.json({ ingredients });

//   } catch (err) {
//     console.error("Ingredient detection failed:", err);
//     return NextResponse.json({ error: "Failed to detect ingredients" }, { status: 500 });
//   }
// }


