"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CalendarClock, Loader2, MessageSquareText } from "lucide-react";
import AlertBanner from "@/components/AlertBanner";
import DashboardHeader from "@/components/DashboardHeader";
import GuestSelector from "@/components/GuestSelector";
import ItineraryCard from "@/components/ItineraryCard";
import MemoryTimeline from "@/components/MemoryTimeline";
import RoomReadyCard from "@/components/RoomReadyCard";
import TriggerPanel from "@/components/TriggerPanel";
import VoiceButton from "@/components/VoiceButton";
import guests from "@/data/guests.json";

type Guest = (typeof guests)[number];

type WelcomeData = {
  welcome_message: string;
  room_status: string;
  dinner_note: string;
  tomorrow_brief: string;
  concierge_note: string;
};

type AlertData = {
  alert_title: string;
  alert_detail: string;
  actions_taken: string[];
  guest_message: string;
};

async function postJson<T>(url: string, body: unknown): Promise<T> {
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body)
  });

  if (!res.ok) {
    throw new Error(`Request failed: ${res.status}`);
  }

  return (await res.json()) as T;
}

export default function Home() {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [welcome, setWelcome] = useState<WelcomeData | null>(null);
  const [alert, setAlert] = useState<AlertData | null>(null);
  const [loading, setLoading] = useState(false);
  const [adaptLoading, setAdaptLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const selectedGuest = useMemo(
    () => guests.find((guest) => guest.id === selectedId) ?? null,
    [selectedId]
  );

  async function handleSelectGuest(id: string) {
    const guest = guests.find((item) => item.id === id);
    if (!guest) return;

    setSelectedId(id);
    setAlert(null);
    setWelcome(null);
    setError(null);
    setLoading(true);

    try {
      const data = await postJson<WelcomeData>("/api/welcome", { guest });
      setWelcome(data);
    } catch {
      setError("The concierge model could not prepare the welcome. Check NVIDIA_API_KEY and try again.");
    } finally {
      setLoading(false);
    }
  }

  async function handleTrigger(prompt: string) {
    if (!selectedGuest) return;

    setAdaptLoading(true);
    setError(null);

    try {
      const data = await postJson<AlertData>("/api/adapt", {
        guest: selectedGuest,
        trigger: prompt
      });
      setAlert(data);
    } catch {
      setError("The stay adaptation could not be generated. Check NVIDIA_API_KEY and try again.");
    } finally {
      setAdaptLoading(false);
    }
  }

  return (
    <main className="min-h-screen px-4 py-6 md:px-8">
      <div className="mx-auto flex max-w-7xl flex-col gap-6">
        <DashboardHeader guest={selectedGuest} />

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[22rem_1fr]">
          <aside className="space-y-4">
            <div className="rounded-lg border border-[#312827] bg-[#110b0c]/92 p-5">
              <p className="mb-3 text-xs font-medium uppercase tracking-[0.18em] text-[#7e6b5b]">
                Select Arriving Guest
              </p>
              <GuestSelector guests={guests} selectedId={selectedId} onSelect={handleSelectGuest} />
            </div>

            {selectedGuest && (
              <MemoryTimeline history={selectedGuest.history} />
            )}
          </aside>

          <section className="min-h-[34rem]">
            <AnimatePresence mode="wait">
              {!selectedGuest && (
                <motion.div
                  key="empty"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  className="grid min-h-[34rem] place-items-center rounded-lg border border-dashed border-[#3a2a2a] bg-[#120d0d]/70 p-8 text-center"
                >
                  <div className="max-w-md">
                    <CalendarClock className="mx-auto mb-4 text-gold" size={34} aria-hidden />
                    <h2 className="font-serif text-3xl text-linen">Arrival intelligence is standing by</h2>
                    <p className="mt-3 text-sm leading-6 text-[#a4907e]">
                      Select Sarah Chen to run the delayed-flight demo, or James Okafor to see a quieter on-time stay.
                    </p>
                  </div>
                </motion.div>
              )}

              {selectedGuest && (
                <motion.div
                  key={selectedGuest.id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  className="space-y-4"
                >
                  {error && (
                    <div className="rounded-lg border border-red-900/70 bg-red-950/30 p-4 text-sm text-red-200">
                      {error}
                    </div>
                  )}

                  {loading && (
                    <div className="grid min-h-64 place-items-center rounded-lg border border-[#312827] bg-[#140c0d] p-8">
                      <div className="text-center">
                        <Loader2 className="mx-auto mb-3 animate-spin text-gold" size={30} aria-hidden />
                        <p className="text-sm text-[#a4907e]">Preparing guest experience...</p>
                      </div>
                    </div>
                  )}

                  {welcome && !loading && (
                    <>
                      <div className="rounded-lg border border-gold/25 bg-[#140c0d] p-5">
                        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-start">
                          <div className="max-w-2xl">
                            <p className="mb-2 text-xs font-medium uppercase tracking-[0.18em] text-gold/70">
                              Welcome Back
                            </p>
                            <p className="text-sm leading-6 text-linen">{welcome.welcome_message}</p>
                            <div className="mt-4 grid gap-3 text-xs leading-5 text-[#a4907e] md:grid-cols-2">
                              <p>{welcome.room_status}</p>
                              <p>{welcome.dinner_note}</p>
                            </div>
                          </div>
                          <VoiceButton text={welcome.welcome_message} />
                        </div>
                      </div>

                      <AlertBanner alert={alert} />

                      <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
                        <RoomReadyCard guest={selectedGuest} />
                        <ItineraryCard welcome={welcome} />
                      </div>

                      <TriggerPanel onTrigger={handleTrigger} loading={adaptLoading} />

                      {adaptLoading && (
                        <div className="flex items-center gap-2 rounded-lg border border-[#312827] bg-[#140c0d] p-4 text-sm text-[#a4907e]">
                          <Loader2 className="animate-spin text-gold" size={16} aria-hidden />
                          Adapting the stay plan...
                        </div>
                      )}

                      <div className="rounded-lg border border-[#312827] bg-[#140c0d] p-5">
                        <div className="flex items-start gap-3">
                          <MessageSquareText className="mt-0.5 text-gold" size={18} aria-hidden />
                          <div>
                            <p className="mb-1 text-xs font-medium uppercase tracking-[0.18em] text-[#a4907e]">
                              Tomorrow Brief
                            </p>
                            <p className="text-sm leading-6 text-[#d8c7b8]">{welcome.tomorrow_brief}</p>
                          </div>
                        </div>
                      </div>
                    </>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </section>
        </div>

        <footer className="pb-4 pt-6 text-center text-xs text-[#5f5047]">
          The Aurelian Vale guest memory demo. Powered by NVIDIA NIM and ElevenLabs.
        </footer>
      </div>
    </main>
  );
}
