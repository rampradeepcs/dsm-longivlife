"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { INGREDIENTS, MOMENT_META } from "@/lib/data";
import { Reveal } from "@/components/ui/Reveal";

/** Ingredient explorer — floating molecular chips, click to expand. */
export function Ingredients() {
  const [openIdx, setOpenIdx] = useState<number | null>(null);
  const open = openIdx !== null ? INGREDIENTS[openIdx] : null;

  return (
    <section
      id="ingredients"
      className="relative overflow-hidden bg-paper2 py-32 md:py-44"
    >
      <div
        className="glow h-[420px] w-[420px] bg-sage"
        style={{ top: "10%", left: "-140px", opacity: 0.4 }}
      />
      <div className="mx-auto max-w-6xl px-6">
        <Reveal>
          <p className="eyebrow">Ingredient explorer</p>
        </Reveal>
        <Reveal delay={0.08}>
          <h2 className="font-display mt-6 max-w-2xl text-[clamp(2rem,4.6vw,3.6rem)] font-light leading-[1.04]">
            Nine actives.
            <br />
            <em className="text-green">Zero guesswork.</em>
          </h2>
        </Reveal>
        <Reveal delay={0.14}>
          <p className="mt-5 max-w-lg text-ink-soft">
            Tap any ingredient to see what it is, where it comes from and which
            moment of the day it belongs to.
          </p>
        </Reveal>

        {/* molecular field */}
        <div className="mt-14 flex flex-wrap gap-3 md:gap-4">
          {INGREDIENTS.map((ing, i) => {
            const m = MOMENT_META[ing.moment];
            const selected = openIdx === i;
            return (
              <motion.button
                key={ing.name}
                layout
                onClick={() => setOpenIdx(selected ? null : i)}
                aria-expanded={selected}
                style={{
                  animation: `floaty ${5 + (i % 3)}s ease-in-out ${i * 0.4}s infinite`,
                }}
                className={`flex items-center gap-3 rounded-full border px-5 py-3.5 transition-colors duration-300 ${
                  selected
                    ? "border-transparent bg-ink text-paper"
                    : "border-line bg-white/70 hover:border-ink/30"
                }`}
              >
                <span
                  className="h-2.5 w-2.5 rounded-full"
                  style={{ background: m.color }}
                />
                <span className="font-display text-lg">{ing.name}</span>
                <span
                  className={`font-mono text-[10px] uppercase tracking-widest ${selected ? "text-paper/60" : "text-ink-faint"}`}
                >
                  {m.label}
                </span>
              </motion.button>
            );
          })}
        </div>

        {/* expanded card */}
        <AnimatePresence mode="wait">
          {open && (
            <motion.div
              key={open.name}
              initial={{ opacity: 0, y: 26, scale: 0.985 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -14, scale: 0.985 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="glass mt-10 grid gap-8 rounded-3xl p-8 md:grid-cols-[auto_1fr_1fr] md:p-10"
            >
              {/* molecular doodle */}
              <svg width="110" height="110" viewBox="0 0 110 110" aria-hidden>
                <g
                  style={{
                    transformOrigin: "55px 55px",
                    animation: "spin-slow 22s linear infinite",
                  }}
                >
                  <circle cx="55" cy="55" r="42" fill="none" stroke={MOMENT_META[open.moment].color} strokeOpacity="0.3" strokeDasharray="3 6" />
                  <circle cx="97" cy="55" r="6" fill={MOMENT_META[open.moment].color} />
                  <circle cx="26" cy="26" r="4" fill={MOMENT_META[open.moment].color} opacity="0.6" />
                  <circle cx="30" cy="88" r="5" fill={MOMENT_META[open.moment].color} opacity="0.4" />
                </g>
                <circle cx="55" cy="55" r="16" fill={MOMENT_META[open.moment].color} />
              </svg>

              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink-faint">
                  {MOMENT_META[open.moment].label} capsule ·{" "}
                  {MOMENT_META[open.moment].time}
                </p>
                <h3 className="font-display mt-2 text-3xl">{open.name}</h3>
                <p className="mt-1 text-sm font-medium text-green">
                  {open.role}
                </p>
                <p className="mt-3 font-mono text-xs text-ink-faint">
                  {open.source}
                </p>
              </div>

              <p className="self-center text-[15px] leading-relaxed text-ink-soft">
                {open.detail}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
