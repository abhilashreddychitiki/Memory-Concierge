"use client";

import { AnimatePresence, motion } from "framer-motion";
import { AlertTriangle, CheckCircle } from "lucide-react";

type AlertData = {
  alert_title: string;
  alert_detail: string;
  actions_taken: string[];
  guest_message: string;
};

export default function AlertBanner({ alert }: { alert: AlertData | null }) {
  return (
    <AnimatePresence>
      {alert && (
        <motion.div
          initial={{ opacity: 0, y: -10, scale: 0.99 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ type: "spring", stiffness: 420, damping: 32 }}
          className="rounded-lg border border-amber-700/50 bg-amber-950/40 p-5"
        >
          <div className="mb-3 flex items-start gap-3">
            <AlertTriangle size={18} className="mt-0.5 shrink-0 text-amber-400" aria-hidden />
            <div>
              <p className="text-sm font-semibold text-amber-300">{alert.alert_title}</p>
              <p className="mt-1 text-xs leading-5 text-amber-200/80">{alert.alert_detail}</p>
            </div>
          </div>
          <div className="mb-3 space-y-2">
            {alert.actions_taken.map((action, index) => (
              <motion.div
                key={action}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.08 }}
                className="flex items-center gap-2 text-xs text-[#d8c7b8]"
              >
                <CheckCircle size={13} className="shrink-0 text-green-500" aria-hidden />
                <span>{action}</span>
              </motion.div>
            ))}
          </div>
          <div className="rounded-lg border border-amber-900/40 bg-[#1a1408] px-4 py-3">
            <p className="mb-1 text-xs font-medium uppercase tracking-[0.18em] text-[#a4907e]">
              Guest SMS Sent
            </p>
            <p className="text-sm italic leading-6 text-linen">"{alert.guest_message}"</p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
