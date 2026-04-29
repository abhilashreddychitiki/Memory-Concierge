"use client";

import { motion } from "framer-motion";
import { Bell, Crown, Sparkles } from "lucide-react";

type Guest = {
  name: string;
  title: string;
  tier: string;
  upcoming_stay: {
    room: string;
    flight: string;
    flight_status: string;
  };
};

export default function DashboardHeader({ guest }: { guest: Guest | null }) {
  return (
    <motion.header
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      className="suite-photo overflow-hidden rounded-lg border border-[#322421] shadow-lift"
    >
      <div className="grid min-h-[260px] grid-cols-1 gap-6 p-6 md:grid-cols-[1fr_auto] md:p-8">
        <div className="flex max-w-xl flex-col justify-between gap-10">
          <div>
            <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-gold/30 bg-black/30 px-3 py-1 text-xs font-medium text-gold">
              <Crown size={13} aria-hidden />
              The Aurelian Vale
            </span>
            <h1 className="font-serif text-4xl leading-tight text-linen md:text-5xl">
              Memory Concierge
            </h1>
            <p className="mt-3 max-w-md text-sm leading-6 text-[#d8c7b8]">
              Returning guests are recognized, prepared for, and cared for before the front desk hears the first request.
            </p>
          </div>

          <div className="grid grid-cols-3 gap-2 text-xs text-[#d8c7b8]">
            <div className="rounded-lg border border-white/10 bg-black/28 p-3">
              <p className="text-[#8f7c69]">Memory</p>
              <p className="mt-1 font-semibold text-linen">Live</p>
            </div>
            <div className="rounded-lg border border-white/10 bg-black/28 p-3">
              <p className="text-[#8f7c69]">Room</p>
              <p className="mt-1 font-semibold text-linen">{guest?.upcoming_stay.room ?? "Awaiting"}</p>
            </div>
            <div className="rounded-lg border border-white/10 bg-black/28 p-3">
              <p className="text-[#8f7c69]">Status</p>
              <p className="mt-1 font-semibold text-linen">{guest ? "Prepared" : "Select guest"}</p>
            </div>
          </div>
        </div>

        <div className="flex w-full flex-col gap-3 md:w-72">
          <div className="rounded-lg border border-white/10 bg-black/32 p-4 backdrop-blur">
            <div className="mb-3 flex items-center justify-between gap-3">
              <span className="text-xs uppercase tracking-[0.18em] text-[#a4907e]">Arrival Desk</span>
              <Bell size={15} className="text-gold" aria-hidden />
            </div>
            {guest ? (
              <div>
                <p className="text-lg font-semibold text-linen">{guest.name}</p>
                <p className="text-sm text-[#b9a797]">{guest.title}</p>
                <div className="mt-4 space-y-2 text-xs text-[#d8c7b8]">
                  <p>{guest.tier}</p>
                  <p>{guest.upcoming_stay.flight}</p>
                  <p className="capitalize">{guest.upcoming_stay.flight_status.replaceAll("_", " ")}</p>
                </div>
              </div>
            ) : (
              <div className="flex min-h-32 flex-col justify-center gap-3 text-sm text-[#b9a797]">
                <Sparkles size={18} className="text-gold" aria-hidden />
                <p>Choose an arriving guest to prepare a personalized stay plan.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.header>
  );
}
