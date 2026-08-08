"use client";

import { motion } from "motion/react";
import { Reveal } from "@/components/ui/Reveal";
import { MOMENT_META } from "@/lib/data";

const ROWS: [string, string, string][] = [
  ["Daily routine", "12 bottles, when you remember", "3 capsules, 3 fixed moments"],
  ["Design", "Bottles sold one by one", "One system, built around your day"],
  ["Timing", "Random — with or against your rhythm", "Matched to the body clock"],
  ["Consistency", "The first thing to collapse", "The entire point"],
  ["Creatine", "Filed under bodybuilding", "A daily micronutrient, measured dose"],
  ["Where it ends", "A crowded shelf", "A longevity habit"],
];

/** Problem vs solution — split screen + animated comparison table. */
export function Compare() {
  return (
    <section className="relative bg-ink py-32 text-paper md:py-44">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal>
          <p className="eyebrow" style={{ color: "#E0A43C" }}>
            Why LONGIVLIFE
          </p>
        </Reveal>
        <Reveal delay={0.08}>
          <h2 className="font-display mt-6 max-w-3xl text-[clamp(2rem,5vw,4rem)] font-light leading-[1.02]">
            Not a multivitamin. Not protein. Not collagen. Not creatine.
            <br />
            <em style={{ color: "#E0A43C" }}>Everything — in one system.</em>
          </h2>
        </Reveal>

        {/* split screen */}
        <div className="mt-16 grid gap-5 md:grid-cols-2">
          <Reveal delay={0.1}>
            <div className="h-full rounded-3xl border border-white/10 bg-white/[0.04] p-8">
              <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-white/40">
                Current lifestyle
              </p>
              <ul className="mt-6 space-y-4">
                {["Chaos of bottles", "Missed routines", "Low energy", "Zero feedback"].map(
                  (t) => (
                    <li key={t} className="flex items-center gap-3 text-white/60">
                      <span className="font-mono text-white/30">×</span>
                      <span className="font-display text-xl line-through decoration-white/25">
                        {t}
                      </span>
                    </li>
                  ),
                )}
              </ul>
            </div>
          </Reveal>
          <Reveal delay={0.18}>
            <div className="h-full rounded-3xl border border-green-bright/40 bg-green/30 p-8">
              <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-green-bright">
                With LONGIVLIFE
              </p>
              <ul className="mt-6 space-y-4">
                {["One simple system", "Three fixed moments", "Consistent energy", "A rhythm that holds"].map(
                  (t, i) => (
                    <li key={t} className="flex items-center gap-3">
                      {i < 2 ? (
                        <span
                          className="cap-pill sm"
                          style={{
                            background: [MOMENT_META.am.color, MOMENT_META.noon.color][i],
                          }}
                        />
                      ) : (
                        <span className="font-mono text-green-bright">✓</span>
                      )}
                      <span className="font-display text-xl">{t}</span>
                    </li>
                  ),
                )}
              </ul>
            </div>
          </Reveal>
        </div>

        {/* comparison table */}
        <div className="mt-16 overflow-x-auto">
          <table className="w-full min-w-[640px] border-collapse">
            <thead>
              <tr className="border-b border-white/15 text-left font-mono text-[11px] uppercase tracking-[0.18em] text-white/40">
                <th className="py-4 pr-6 font-normal">&nbsp;</th>
                <th className="py-4 pr-6 font-normal">Traditional supplements</th>
                <th className="py-4 font-normal text-green-bright">LONGIVLIFE</th>
              </tr>
            </thead>
            <tbody>
              {ROWS.map(([label, bad, good], i) => (
                <motion.tr
                  key={label}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.6 }}
                  transition={{
                    duration: 0.6,
                    ease: [0.16, 1, 0.3, 1],
                    delay: i * 0.04,
                  }}
                  className="border-b border-white/8"
                >
                  <td className="py-5 pr-6 font-mono text-xs tracking-wide text-white/40">
                    {label}
                  </td>
                  <td className="py-5 pr-6 text-white/55">{bad}</td>
                  <td className="py-5 font-medium">{good}</td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
