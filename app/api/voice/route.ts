import { NextRequest } from "next/server";
import { CONCIERGE_VOICE_ID, elevenlabs } from "@/lib/elevenlabs";

export async function POST(req: NextRequest) {
  const { text } = await req.json();

  if (!text || typeof text !== "string") {
    return Response.json({ error: "Text is required" }, { status: 400 });
  }

  const audioStream = await elevenlabs.textToSpeech.convert(CONCIERGE_VOICE_ID, {
    text,
    model_id: "eleven_v3",
    output_format: "mp3_44100_128",
    voice_settings: {
      stability: 0.6,
      similarity_boost: 0.85,
      style: 0.2,
      use_speaker_boost: true
    }
  });

  const chunks: Uint8Array[] = [];
  for await (const chunk of audioStream) {
    chunks.push(chunk);
  }
  const buffer = Buffer.concat(chunks);

  return new Response(buffer, {
    headers: {
      "Content-Type": "audio/mpeg",
      "Content-Length": buffer.length.toString()
    }
  });
}
