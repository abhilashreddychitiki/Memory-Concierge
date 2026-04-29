"use client";

import { motion } from "framer-motion";
import { BedDouble, Sparkles, Thermometer, Wine } from "lucide-react";

type Guest = {
  upcoming_stay: { room: string };
  preferences: {
    room_temp: string;
    pillow: string;
    wine: string;
    amenities: string[];
  };
};

export default function RoomReadyCard({ guest }: { guest: Guest }) {
  const items = [
    { icon: <Thermometer size={14} aria-hidden />, label: guest.preferences.room_temp },
    { icon: <BedDouble size={14} aria-hidden />, label: `${guest.preferences.pillow} pillows` },
    { icon: <Wine size={14} aria-hidden />, label: guest.preferences.wine },
    ...guest.preferences.amenities.map((amenity) => ({
      icon: <Sparkles size={14} aria-hidden />,
      label: amenity
    }))
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.12 }}
      className="rounded-lg border border-[#312827] bg-[#140c0d] p-5"
    >
      <div className="mb-4 flex items-center justify-between gap-3">
        <p className="text-xs font-medium uppercase tracking-[0.18em] text-[#a4907e]">
          Room {guest.upcoming_stay.room} Ready
        </p>
        <span className="rounded-full border border-green-800/50 bg-green-900/40 px-2.5 py-1 text-xs text-green-400">
          Pre-set
        </span>
      </div>
      <div className="flex flex-wrap gap-2">
        {items.map((item, index) => (
          <motion.span
            key={`${item.label}-${index}`}
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 + index * 0.05 }}
            className="flex items-center gap-1.5 rounded-full border border-[#3a2a2a] bg-[#1e1010] px-3 py-1.5 text-xs text-[#d8c7b8]"
          >
            <span className="text-gold">{item.icon}</span>
            {item.label}
          </motion.span>
        ))}
      </div>
    </motion.div>
  );
}
