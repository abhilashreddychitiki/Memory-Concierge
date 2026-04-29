"use client";

import { motion } from "framer-motion";
import { History } from "lucide-react";

type HistoryItem = { date: string; note: string };

export default function MemoryTimeline({ history }: { history: HistoryItem[] }) {
  return (
    <div className="rounded-lg border border-[#312827] bg-[#140c0d] p-5">
      <div className="mb-4 flex items-center gap-2">
        <History size={14} className="text-gold" aria-hidden />
        <p className="text-xs font-medium uppercase tracking-[0.18em] text-[#a4907e]">
          Guest Memory
        </p>
      </div>
      <div className="relative space-y-4 border-l border-[#312827] pl-4">
        {history.map((item, index) => (
          <motion.div
            key={`${item.date}-${item.note}`}
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.08 }}
            className="relative"
          >
            <div className="absolute -left-[1.35rem] top-1.5 h-2 w-2 rounded-full bg-gold/70" />
            <p className="mb-1 text-xs font-medium text-gold/80">{item.date}</p>
            <p className="text-xs leading-5 text-[#a4907e]">{item.note}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
