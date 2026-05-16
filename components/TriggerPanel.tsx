"use client";

import { motion } from "framer-motion";
import { Leaf, MoonStar, Plane, Utensils } from "lucide-react";

const triggers = [
  {
    id: "flight_delay",
    icon: <Plane size={15} aria-hidden />,
    label: "Flight delayed 2 hrs",
    color: "amber",
    prompt: "Guest flight UA 892 is delayed by 2 hours. Original check-in was 5 PM, now 7 PM."
  },
  {
    id: "dietary",
    icon: <Leaf size={15} aria-hidden />,
    label: "Guest went vegan",
    color: "green",
    prompt: "Guest has updated dietary preference to vegan. Adjust dinner and breakfast options."
  },
  {
    id: "quiet",
    icon: <MoonStar size={15} aria-hidden />,
    label: "Needs quiet room",
    color: "blue",
    prompt: "Guest called to request a quiet room away from elevator and street noise."
  },
  {
    id: "dinner",
    icon: <Utensils size={15} aria-hidden />,
    label: "Dinner moved to 9 PM",
    color: "rose",
    prompt: "Guest's meeting ran late. Dinner reservation needs to move from 8 PM to 9 PM."
  }
];

const colorMap: Record<string, string> = {
  amber: "border-amber-700/50 bg-amber-950/30 text-amber-300 hover:border-amber-500",
  green: "border-green-700/50 bg-green-950/30 text-green-300 hover:border-green-500",
  blue: "border-sky-700/50 bg-sky-950/30 text-sky-300 hover:border-sky-500",
  rose: "border-garnet/70 bg-garnet/30 text-rose-200 hover:border-rose-400"
};

export default function TriggerPanel({
  onTrigger,
  loading
}: {
  onTrigger: (prompt: string) => void;
  loading: boolean;
}) {
  return (
    <div className="rounded-lg border border-[#312827] bg-[#140c0d] p-5">
      <p className="mb-4 text-xs font-medium uppercase tracking-[0.18em] text-[#a4907e]">
        Simulate Real-Time Event
      </p>
      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
        {triggers.map((trigger) => (
          <motion.button
            key={trigger.id}
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.98 }}
            disabled={loading}
            onClick={() => onTrigger(trigger.prompt)}
            className={`flex min-h-11 items-center gap-2 rounded-lg border px-3 py-2.5 text-left text-xs transition-all duration-150 disabled:cursor-not-allowed disabled:opacity-40 ${colorMap[trigger.color]}`}
          >
            {trigger.icon}
            <span>{trigger.label}</span>
          </motion.button>
        ))}
      </div>
    </div>
  );
}
