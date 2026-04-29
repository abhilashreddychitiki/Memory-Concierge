"use client";

import { motion } from "framer-motion";
import { Car, Clock, Coffee, Dumbbell } from "lucide-react";

type WelcomeData = {
  welcome_message: string;
  room_status: string;
  dinner_note: string;
  tomorrow_brief: string;
  concierge_note: string;
};

const morningItems = [
  { time: "6:50 AM", icon: <Clock size={13} aria-hidden />, label: "Wake-up call" },
  { time: "7:30 AM", icon: <Dumbbell size={13} aria-hidden />, label: "Gym reserved - Level 2" },
  { time: "8:15 AM", icon: <Coffee size={13} aria-hidden />, label: "Green tea and light breakfast" },
  { time: "8:45 AM", icon: <Car size={13} aria-hidden />, label: "Car to The Battery, SF" }
];

export default function ItineraryCard({ welcome }: { welcome: WelcomeData | null }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.18 }}
      className="rounded-lg border border-[#312827] bg-[#140c0d] p-5"
    >
      <p className="mb-4 text-xs font-medium uppercase tracking-[0.18em] text-[#a4907e]">
        Tomorrow Morning
      </p>
      <div className="space-y-3">
        {morningItems.map((item, index) => (
          <motion.div
            key={item.time}
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.26 + index * 0.06 }}
            className="grid grid-cols-[4.25rem_1rem_1fr] items-center gap-3"
          >
            <span className="text-xs text-[#7e6b5b]">{item.time}</span>
            <span className="text-gold">{item.icon}</span>
            <span className="text-sm leading-5 text-[#d8c7b8]">{item.label}</span>
          </motion.div>
        ))}
      </div>
      {welcome && (
        <div className="mt-4 border-t border-[#312827] pt-4">
          <p className="mb-2 text-xs font-medium uppercase tracking-[0.18em] text-[#a4907e]">
            Concierge Note
          </p>
          <p className="text-sm italic leading-6 text-[#d8c7b8]">{welcome.concierge_note}</p>
        </div>
      )}
    </motion.div>
  );
}
