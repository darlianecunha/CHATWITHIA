// app/api/edit-image/route.ts
import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

export const runtime = "edge"; // opcional

function toBase64(buf: ArrayBuffer) {
  return Buffer.from(new Uint8Array(buf)).toString("base64");
}

export async function POST(req: Request) {
  try {
    const form = await req.formData();
    const file = form.get("image") as File | null;
    const instruction = (form.get("instruction") as string) || "";

    if (!file) {
      return NextResponse.json({ error: "Image is required (field 'image')" }, { status: 400 });
    }

    const apiKey = process.env.GOOGLE_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: "Missing GOOGLE_API_KEY" }, { status: 500 });
    }

    const arrayBuf = await file.arrayBuffer();
    const base64 = toBase64(arrayBuf);

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

    const result = await model.generateContent([
      { text: instruction || "Improve this image" },
      {
        inlineData: {
          mimeType: file.type || "image/png",
          data: base64,
        },
      },
    ]);

    const text = result.response.text();
    return NextResponse.json({ result: text });
  } catch (err: any) {
    return NextResponse.json({ error: err?.message ?? "Unknown error" }, { status: 500 });
  }
}
