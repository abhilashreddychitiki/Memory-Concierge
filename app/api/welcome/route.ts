import { NextRequest } from "next/server";
import { NVIDIA_MODEL, openai } from "@/lib/openai";
import { parseJsonObject } from "@/lib/json";

type WelcomeData = {
  welcome_message: string;
  room_status: string;
  dinner_note: string;
  tomorrow_brief: string;
  concierge_note: string;
};

const fallbackWelcome: WelcomeData = {
  welcome_message: "Welcome back. Your stay has been prepared with your usual preferences in mind.",
  room_status: "Your room has been pre-set based on the guest profile.",
  dinner_note: "Dinner timing has been reviewed against the latest arrival details.",
  tomorrow_brief: "Tomorrow morning has been arranged around the guest routine and meetings.",
  concierge_note: "A personal touch from the guest history has been added to the arrival plan."
};

export async function POST(req: NextRequest) {
  const { guest } = await req.json();

  const completion = await openai.chat.completions.create({
    model: NVIDIA_MODEL,
    max_tokens: 400,
    temperature: 0.3,
    response_format: { type: "json_object" },
    messages: [
      {
        role: "system",
        content: `You are the AI concierge for The Aurelian Vale, a world-class luxury hotel.
You have full memory of this guest's history, preferences, and current trip details.
Return a JSON object with exactly these fields:
{
  "welcome_message": "A warm, personal 2-sentence spoken welcome for this guest. Use their name. Reference something specific from their history or preferences.",
  "room_status": "One sentence on what is pre-set in their room based on preferences.",
  "dinner_note": "One sentence about dinner reservation; adjust if flight is delayed.",
  "tomorrow_brief": "One sentence previewing tomorrow morning based on their routine and meetings.",
  "concierge_note": "One subtle personal touch; reference a past stay memory or preference."
}
Tone: warm, unhurried, luxury. Never robotic. Never generic.
Only return valid JSON. No markdown. No extra text.`
      },
      {
        role: "user",
        content: JSON.stringify(guest)
      }
    ]
  });

  const raw = completion.choices[0]?.message?.content ?? "{}";
  return Response.json(parseJsonObject<WelcomeData>(raw, fallbackWelcome));
}
