import { ElevenLabsClient } from "elevenlabs";

export const elevenlabs = new ElevenLabsClient({
  apiKey: process.env.ELEVENLABS_API_KEY ?? "missing-elevenlabs-api-key"
});

export const CONCIERGE_VOICE_ID = "EXAVITQu4vr4xnSDxMaL";
