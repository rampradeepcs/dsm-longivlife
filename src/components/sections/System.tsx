"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { CAPSULES, MOMENT_META, type Moment } from "@/lib/data";
import { Reveal } from "@/components/ui/Reveal";

/** Interactive 3-capsule product experience — click a capsule to expand it. */
export function System() {
  const [active, setActive] = useState<Moment>("am");
  const current = CAPSULES.find((c) => c.moment === active)!;
  const meta = MOMENT_META[active];

  return (
    <section id="system" className="relative overflow-hidden py-32 md:py-44">
      <div
        className="glow h-[480px] w-[480px]"
        style={{
          background: meta.color,
          top: "-160px",
          right: "-140px",
          opacity: 0.16,
          transition: "background 600ms ease",
        }}
      />
      <div className="mx-auto max-w-6xl px-6">
        <Reveal>
          <p className="eyebrow">The product experience</p>
        </Reveal>
        <Reveal delay={0.08}>
          <h2 className="font-display mt-6 max-w-2xl text-[clamp(2rem,4.6vw,3.6rem)] font-light leading-[1.04]">
            Open the day.
            <br />
            <em className="text-green">Explore each moment.</em>
          </h2>
        </Reveal>

        {/* capsule selector */}
        <Reveal delay={0.16}>
          <div className="mt-12 flex flex-wrap gap-3">
            {CAPSULES.map((c) => {
              const m = MOMENT_META[c.moment];
              const selected = active === c.moment;
              return (
                <button
                  key={c.moment}
                  onClick={() => setActive(c.moment)}
                  aria-pressed={selected}
                  className={`flex items-center gap-3 rounded-full border px-5 py-3 transition-all duration-300 ${
                    selected
                      ? "border-transparent bg-ink text-paper shadow-lg"
                      : "border-line bg-white/50 text-ink-soft hover:border-ink/30"
                  }`}
                >
                  <span
                    className="cap-pill sm"
                    style={{ background: m.color }}
                  />
                  <span className="font-mono text-xs tracking-[0.14em]">
                    {m.label} · {m.time}
                  </span>
                </button>
              );
            })}
          </div>
        </Reveal>

        {/* expanded capsule */}
        <div className="relative mt-14 min-h-[430px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 30, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.98 }}
              transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
              className="grid items-center gap-12 md:grid-cols-[1fr_auto_1fr]"
            >
              {/* ingredients */}
              <div className="order-2 md:order-1">
                <p
                  className="font-mono text-[11px] uppercase tracking-[0.22em]"
                  style={{ color: meta.color }}
                >
                  Inside the capsule
                </p>
                <ul className="mt-5 flex flex-col">
                  {current.ingredients.map((ing, i) => (
                    <motion.li
                      key={ing}
                      initial={{ opacity: 0, x: -22 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.15 + i * 0.09, duration: 0.5 }}
                      className="flex items-center gap-4 border-b border-line-soft py-4 last:border-0"
                    >
                      <span
                        className="h-2 w-2 rounded-full"
                        style={{ background: meta.color }}
                      />
                      <span className="font-display text-xl">{ing}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>

              {/* the capsule itself, with connection lines */}
              <div className="order-1 flex justify-center md:order-2">
                <div className="relative">
                  <svg
                    width="300"
                    height="330"
                    viewBox="0 0 300 330"
                    className="overflow-visible"
                    aria-hidden
                  >
                    {/* connection lines */}
                    {[0, 1, 2].map((i) => (
                      <motion.path
                        key={`l${i}`}
                        d={`M150 ${140 + i * 12} C ${60 - i * 10} ${120 + i * 40}, ${40} ${60 + i * 90}, 18 ${50 + i * 100}`}
                        fill="none"
                        stroke={meta.color}
                        strokeWidth="1"
                        strokeDasharray="4 5"
                        initial={{ pathLength: 0, opacity: 0 }}
                        animate={{ pathLength: 1, opacity: 0.6 }}
                        transition={{ delay: 0.25 + i * 0.1, duration: 0.8 }}
                      />
                    ))}
                    {[0, 1, 2].map((i) => (
                      <motion.path
                        key={`r${i}`}
                        d={`M150 ${150 + i * 12} C ${240 + i * 10} ${130 + i * 40}, ${260} ${70 + i * 90}, 282 ${60 + i * 100}`}
                        fill="none"
                        stroke={meta.color}
                        strokeWidth="1"
                        strokeDasharray="4 5"
                        initial={{ pathLength: 0, opacity: 0 }}
                        animate={{ pathLength: 1, opacity: 0.6 }}
                        transition={{ delay: 0.35 + i * 0.1, duration: 0.8 }}
                      />
                    ))}
                    {/* capsule */}
                    <motion.g
                      initial={{ rotate: -14 }}
                      animate={{ rotate: [-14, -10, -14] }}
                      transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
                      style={{ transformOrigin: "150px 150px" }}
                    >
                      <rect
                        x="85"
                        y="115"
                        width="130"
                        height="70"
                        rx="35"
                        fill={meta.color}
                      />
                      <path
                        d="M85 150a35 35 0 0 1 35-35h30v70h-30a35 35 0 0 1-35-35Z"
                        fill="#F3EFE4"
                      />
                      <rect
                        x="100"
                        y="128"
                        width="26"
                        height="8"
                        rx="4"
                        fill="rgba(255,255,255,.7)"
                      />
                    </motion.g>
                    {/* orbiting micro particles */}
                    <g
                      style={{
                        transformOrigin: "150px 150px",
                        animation: "spin-slow 26s linear infinite",
                      }}
                    >
                      {[0, 60, 130, 200, 270, 320].map((deg) => (
                        <circle
                          key={deg}
                          cx={150 + 110 * Math.cos((deg * Math.PI) / 180)}
                          cy={150 + 110 * Math.sin((deg * Math.PI) / 180)}
                          r="2.5"
                          fill={meta.color}
                          opacity="0.4"
                        />
                      ))}
                    </g>
                  </svg>
                </div>
              </div>

              {/* benefits */}
              <div className="order-3 md:text-right">
                <p
                  className="font-mono text-[11px] uppercase tracking-[0.22em]"
                  style={{ color: meta.color }}
                >
                  What it unlocks
                </p>
                <ul className="mt-5 flex flex-col">
                  {current.benefits.map((b, i) => (
                    <motion.li
                      key={b}
                      initial={{ opacity: 0, x: 22 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2 + i * 0.09, duration: 0.5 }}
                      className="border-b border-line-soft py-4 last:border-0"
                    >
                      <span className="font-display text-xl">{b}</span>
                    </motion.li>
                  ))}
                </ul>
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5, duration: 0.6 }}
                  className="mt-6 text-sm leading-relaxed text-ink-soft md:ml-auto md:max-w-[260px]"
                >
                  {meta.sub}
                </motion.p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
