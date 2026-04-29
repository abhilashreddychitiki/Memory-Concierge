"use client";

import { motion } from "framer-motion";
import { Crown, Star } from "lucide-react";

type Guest = {
  id: string;
  name: string;
  title: string;
  tier: string;
  avatar_initials: string;
  stays: number;
};

export default function GuestSelector({
  guests,
  selectedId,
  onSelect
}: {
  guests: Guest[];
  selectedId: string | null;
  onSelect: (id: string) => void;
}) {
  return (
    <div className="grid grid-cols-1 gap-3">
      {guests.map((guest, index) => (
        <motion.button
          key={guest.id}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.08 }}
          whileHover={{ y: -2 }}
          whileTap={{ scale: 0.99 }}
          onClick={() => onSelect(guest.id)}
          className={`w-full rounded-lg border p-4 text-left transition-all duration-200 ${
            selectedId === guest.id
              ? "border-gold bg-[#1a120a] gold-pulse"
              : "border-[#312827] bg-[#140c0d] hover:border-gold/50"
          }`}
        >
          <div className="mb-3 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gold text-sm font-bold text-ink">
              {guest.avatar_initials}
            </div>
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold text-linen">{guest.name}</p>
              <p className="truncate text-xs text-[#a4907e]">{guest.title}</p>
            </div>
          </div>
          <div className="flex items-center justify-between gap-3">
            <span className="flex min-w-0 items-center gap-1 text-xs text-gold">
              <Crown size={12} aria-hidden />
              <span className="truncate">{guest.tier}</span>
            </span>
            <span className="flex shrink-0 items-center gap-1 text-xs text-[#7e6b5b]">
              <Star size={12} aria-hidden />
              {guest.stays} stays
            </span>
          </div>
        </motion.button>
      ))}
    </div>
  );
}
