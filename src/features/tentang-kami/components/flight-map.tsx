"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Plane, Box, Navigation, Radio } from "lucide-react";

const routeNodes = [
  { code: "KNO", city: "Medan", left: "6%", top: "12%", delay: 0 },
  { code: "PLM", city: "Palembang", left: "8%", top: "36%", delay: 0.4 },
  { code: "SUB", city: "Surabaya", left: "48%", top: "78%", delay: 0.8 },
  { code: "BPN", city: "Balikpapan", left: "60%", top: "10%", delay: 1.2 },
  { code: "PNK", city: "Pontianak", left: "40%", top: "28%", delay: 1.4 },
  { code: "UPG", city: "Makassar", left: "78%", top: "32%", delay: 1.6 },
  { code: "DPS", city: "Denpasar", left: "70%", top: "82%", delay: 2 },
  { code: "DJJ", city: "Jayapura", left: "76%", top: "56%", delay: 2.4 },
];

interface FlightMapProps {
  whatsappUrl?: string;
}

export default function FlightMap({ whatsappUrl }: FlightMapProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      className="relative h-80 sm:h-96 lg:h-112.5 w-full max-w-5xl mx-auto flex items-center justify-center select-none overflow-hidden px-2 sm:px-4"
      initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, x: 50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Background CGK */}
      <span className="absolute text-[28vw] sm:text-[22vw] lg:text-[180px] font-black text-slate-200/60 font-mono tracking-tighter pointer-events-none leading-none select-none">CGK</span>

      {/* Circle Radar */}
      <div className="absolute size-56 sm:size-72 lg:size-88 rounded-full border border-dashed border-red-300/40 pointer-events-none animate-spin-slow" />
      <div className="absolute size-64 sm:size-96 lg:size-105 rounded-full border border-slate-200/60 pointer-events-none" />

      {/* Flight Route SVG */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none stroke-red-500/50" viewBox="0 0 400 300" fill="none" strokeWidth="1.8" strokeDasharray="4 4" preserveAspectRatio="xMidYMid meet">
        <path d="M130 150 Q70 60 30 40" />
        <path d="M130 150 Q70 120 35 110" />
        <path d="M130 150 Q170 200 200 235" />
        <path d="M130 150 Q210 60 250 35" />
        <path d="M130 150 Q150 100 170 85" />
        <path d="M130 150 Q240 110 320 95" />
        <path d="M130 150 Q220 220 290 250" />
        <path d="M130 150 Q260 170 310 170" />
      </svg>

      {/* Live Dispatch */}
      <div className="absolute top-2 left-2 sm:top-3 sm:left-3 flex items-center gap-1.5 bg-white/95 backdrop-blur-md px-2 py-1 sm:px-2.5 rounded-full border border-slate-200 shadow-sm text-[9px] sm:text-[10px] font-mono font-bold text-slate-800 z-20">
        <Radio className="size-2.5 sm:size-3 text-red-600 animate-pulse" />
        CGK LIVE DISPATCH
      </div>

      {/* Speed Badge */}
      <div className="absolute top-2 right-2 sm:top-3 sm:right-3 bg-red-600 text-white px-2 py-1 sm:px-2.5 rounded-xl shadow-md text-[9px] sm:text-[10px] font-bold flex items-center gap-1 z-20">
        <Plane className="size-2.5 sm:size-3 text-yellow-300" />
        1-2 HARI PORT TO PORT
      </div>

      {/* Central CGK */}
      <div className="absolute left-[32%] top-[50%] -translate-x-1/2 -translate-y-1/2 z-20">
        <span className="absolute inset-0 m-auto size-12 sm:size-14 rounded-full bg-red-500/20 animate-ping" />
        <div className="relative size-10 sm:size-12 rounded-2xl bg-red-600 text-white flex items-center justify-center shadow-xl">
          <Plane className="size-5 sm:size-6 rotate-45" />
        </div>
        <div className="absolute top-12 sm:top-14 left-1/2 -translate-x-1/2 whitespace-nowrap bg-white/95 px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full border border-red-200 text-[9px] sm:text-[10px] font-black shadow-md">
          <span className="text-red-600 mr-1">●</span>
          TERMINAL KARGO CGK
        </div>
      </div>

      {/* Route Nodes */}
      {routeNodes.map((node) => (
        <motion.div key={node.code} className="absolute z-10" style={{ left: node.left, top: node.top }} animate={{ y: [0, -6, 0] }} transition={{ duration: 3.5, repeat: Infinity, delay: node.delay, ease: "easeInOut" }}>
          <div className="flex items-center gap-1 sm:gap-1.5 bg-white/95 backdrop-blur-md px-1.5 py-0.5 sm:px-2 sm:py-1 rounded-xl border border-slate-200 shadow-sm whitespace-nowrap scale-[0.85] sm:scale-100 origin-top-left">
            <span className="size-1.5 sm:size-2 rounded-full bg-emerald-500" />
            <span className="text-[9px] sm:text-[10px] font-mono font-bold">{node.code}</span>
            <span className="text-[8px] sm:text-[9px] text-slate-600 font-bold">· {node.city}</span>
            <Navigation className="size-2.5 sm:size-3 text-red-500 rotate-45" />
          </div>
        </motion.div>
      ))}

      {/* Minimum Weight */}
      <div className="absolute bottom-2 left-2 sm:bottom-3 sm:left-3 bg-white/90 backdrop-blur-sm px-2 py-1 sm:px-2.5 rounded-xl border border-slate-200 shadow-sm flex items-center gap-1 sm:gap-1.5 text-[9px] sm:text-[10px] font-bold z-20">
        <Box className="size-3 sm:size-3.5 text-red-600" />
        MIN. 10 KG
      </div>

      {/* CTA */}
      {whatsappUrl && (
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="absolute bottom-2 right-2 sm:bottom-3 sm:right-3 bg-slate-900 hover:bg-red-600 text-white px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-2xl text-[10px] sm:text-xs font-bold shadow-lg transition z-20"
        >
          Cek Rute Flight ↗
        </a>
      )}
    </motion.div>
  );
}
