// app/api/chat-voice/route.ts
import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

export const runtime = "edge"; // opcional

function toBase64(buf: ArrayBuffer) {
  return Buffer.from(new Uint8Array(buf)).toString("base64");
}

export async function POST(req: Request) {
  try {
    const form = await req.formData();
    const file = form.get("audio") as File | null;
    const instruction = (form.get("instruction") as string) || "Transcribe and respond to the user's audio briefly in Portuguese.";

    if (!file) {
      return NextResponse.json({ error: "Audio is required (field 'audio')" }, { status: 400 });
    }

    const apiKey = process.env.GOOGLE_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: "Missing GOOGLE_API_KEY" }, { status: 500 });
    }

    const arrayBuf = await file.arrayBuffer();
    const base64 = toBase64(arrayBuf);

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

    const parts: any[] = [{ text: instruction }];
    parts.push({
      inlineData: {
        mimeType: file.type || "audio/webm",
        data: base64,
      },
    });

    const result = await model.generateContent(parts);
    const text = result.response.text();
    return NextResponse.json({ text });
  } catch (err: any) {
    return NextResponse.json({ error: err?.message ?? "Unknown error" }, { status: 500 });
  }
}
