"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Loader2, Volume2 } from "lucide-react";

export default function VoiceButton({ text }: { text: string }) {
  const [loading, setLoading] = useState(false);
  const [playing, setPlaying] = useState(false);

  async function handlePlay() {
    setLoading(true);
    try {
      const res = await fetch("/api/voice", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text })
      });

      if (!res.ok) {
        throw new Error("Voice generation failed");
      }

      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const audio = new Audio(url);
      setPlaying(true);
      audio.onended = () => {
        setPlaying(false);
        URL.revokeObjectURL(url);
      };
      await audio.play();
    } finally {
      setLoading(false);
    }
  }

  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={handlePlay}
      disabled={loading || playing || !text}
      className="flex min-h-11 items-center gap-2 rounded-lg bg-gold px-4 py-2.5 text-sm font-semibold text-ink shadow-lg transition-all disabled:cursor-not-allowed disabled:opacity-60"
      title="Play welcome message"
    >
      {loading ? (
        <motion.span
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 0.8, ease: "linear" }}
        >
          <Loader2 size={16} aria-hidden />
        </motion.span>
      ) : (
        <Volume2 size={16} aria-hidden />
      )}
      <span>{playing ? "Playing" : loading ? "Generating" : "Play Welcome"}</span>
    </motion.button>
  );
}
