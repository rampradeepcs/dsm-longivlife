"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { MOMENT_META } from "@/lib/data";

const PANELS = [
  {
    time: "06:00 — Morning",
    color: MOMENT_META.am.color,
    soft: MOMENT_META.am.soft,
    capsule: "AM",
    title: "The day begins supported",
    body: "B-vitamins and iron move in with breakfast — oxygen to the brain, fuel pathways switched on.",
    organs: ["Brain wakes", "Metabolism rises", "Focus sharpens"],
  },
  {
    time: "13:00 — Afternoon",
    color: MOMENT_META.noon.color,
    soft: MOMENT_META.noon.soft,
    capsule: "NOON",
    title: "Strength through the slump",
    body: "Creatine, electrolytes and minerals hold the line where most days fall apart — the 3pm crash.",
    organs: ["Muscles fuelled", "Hydration balanced", "Energy sustained"],
  },
  {
    time: "19:00 — Evening",
    color: "#B98A6A",
    soft: "#F6EDE4",
    capsule: "—",
    title: "The wind-down window opens",
    body: "The system steps back. Dinner, family, life — while the day's nutrients keep working quietly.",
    organs: ["Cortisol eases", "Digestion settles", "Body downshifts"],
  },
  {
    time: "22:00 — Night",
    color: MOMENT_META.pm.color,
    soft: MOMENT_META.pm.soft,
    capsule: "PM",
    title: "Recovery takes over",
    body: "Magnesium and ashwagandha complement the natural overnight repair rhythm, so tomorrow starts ahead.",
    organs: ["Deep sleep supported", "Muscles repair", "Stress unwinds"],
  },
];

/** Horizontal-scroll body-clock — capsules travel across your day. */
export function BodyClock() {
  const wrap = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const [shift, setShift] = useState(0);
  const { scrollYProgress } = useScroll({
    target: wrap,
    offset: ["start start", "end end"],
  });

  // measure how far the track must travel so the last panel lands in view,
  // on every viewport size
  useEffect(() => {
    const measure = () => {
      if (!track.current) return;
      setShift(Math.max(0, track.current.scrollWidth - window.innerWidth));
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  const x = useTransform(scrollYProgress, [0.05, 0.95], [0, -shift]);
  const marker = useTransform(scrollYProgress, [0.05, 0.95], ["2%", "98%"]);

  return (
    <section ref={wrap} className="relative h-[380vh]">
      <div className="sticky top-0 flex h-screen flex-col justify-center overflow-hidden bg-paper2">
        <div className="mx-auto mb-10 w-full max-w-6xl px-6">
          <p className="eyebrow">The body clock</p>
          <h2 className="font-display mt-4 text-[clamp(1.8rem,4vw,3rem)] font-light">
            Your body runs on rhythm. <em className="text-green">Now your nutrition does too.</em>
          </h2>
        </div>

        {/* day timeline with travelling marker */}
        <div className="relative mx-auto mb-10 h-px w-[86%] max-w-5xl bg-line">
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(90deg,#5E93BA 0%,#E0A43C 40%,#B98A6A 70%,#4B4A7A 100%)",
              opacity: 0.6,
            }}
          />
          <motion.span
            style={{ left: marker }}
            className="absolute top-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white bg-ink shadow-md"
          />
        </div>

        {/* horizontal panels */}
        <motion.div
          ref={track}
          style={{ x }}
          className="flex w-max gap-6 pl-[7vw] pr-[10vw]"
        >
          {PANELS.map((p) => (
            <article
              key={p.time}
              className="relative flex h-[52vh] w-[78vw] max-w-[520px] flex-col justify-between overflow-hidden rounded-3xl border border-line-soft p-8 md:w-[42vw]"
              style={{ background: p.soft }}
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink-soft">
                    {p.time}
                  </span>
                  {p.capsule !== "—" && (
                    <span
                      className="cap-pill sm"
                      style={{ background: p.color }}
                    />
                  )}
                </div>
                <h3 className="font-display mt-6 text-3xl font-light leading-tight">
                  {p.title}
                </h3>
                <p className="mt-4 max-w-sm leading-relaxed text-ink-soft">
                  {p.body}
                </p>
              </div>
              <ul className="flex flex-wrap gap-2">
                {p.organs.map((o) => (
                  <li
                    key={o}
                    className="rounded-full border border-ink/10 bg-white/60 px-4 py-2 font-mono text-[11px] tracking-wide text-ink-soft"
                  >
                    {o}
                  </li>
                ))}
              </ul>
              {/* soft organ glow */}
              <div
                className="glow h-64 w-64"
                style={{
                  background: p.color,
                  right: "-80px",
                  bottom: "-80px",
                  opacity: 0.25,
                }}
              />
            </article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
