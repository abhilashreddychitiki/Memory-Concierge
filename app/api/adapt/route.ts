import { NextRequest } from "next/server";
import { NVIDIA_MODEL, openai } from "@/lib/openai";
import { parseJsonObject } from "@/lib/json";

type AlertData = {
  alert_title: string;
  alert_detail: string;
  actions_taken: string[];
  guest_message: string;
};

const fallbackAlert: AlertData = {
  alert_title: "Stay Plan Updated",
  alert_detail: "The concierge plan was adjusted based on the latest guest event.",
  actions_taken: ["Updated arrival timing", "Reviewed room setup", "Prepared guest message"],
  guest_message: "We have adjusted your stay details and everything will be ready when you arrive."
};

export async function POST(req: NextRequest) {
  const { guest, trigger } = await req.json();

  const completion = await openai.chat.completions.create({
    model: NVIDIA_MODEL,
    max_tokens: 350,
    temperature: 0.3,
    response_format: { type: "json_object" },
    messages: [
      {
        role: "system",
        content: `You are the AI concierge for The Aurelian Vale.
A real-time event has occurred for this guest. Adapt their stay plan accordingly.
Return a JSON object:
{
  "alert_title": "Short alert title (max 8 words)",
  "alert_detail": "One sentence explaining what changed and what was done automatically.",
  "actions_taken": ["action 1", "action 2", "action 3"],
  "guest_message": "A calm, reassuring 1-sentence message the concierge would send to the guest via SMS."
}
Only valid JSON. No markdown.`
      },
      {
        role: "user",
        content: `Guest: ${JSON.stringify(guest)}\nTrigger: ${trigger}`
      }
    ]
  });

  const raw = completion.choices[0]?.message?.content ?? "{}";
  return Response.json(parseJsonObject<AlertData>(raw, fallbackAlert));
}
