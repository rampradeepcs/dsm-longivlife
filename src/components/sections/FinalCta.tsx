"use client";

import { motion } from "motion/react";
import { Reveal } from "@/components/ui/Reveal";
import { Magnetic } from "@/components/ui/Magnetic";
import { MOMENT_META } from "@/lib/data";

/** Final CTA — the bottle floats again, the light gets brighter. */
export function FinalCta() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-paper via-[#FDFBF6] to-[#F6F0E2] py-36 md:py-48">
      <div
        className="glow h-[520px] w-[520px] bg-noon"
        style={{ top: "-160px", right: "-120px", opacity: 0.3 }}
      />
      <div
        className="glow h-[440px] w-[440px] bg-am"
        style={{ bottom: "-160px", left: "-120px", opacity: 0.22 }}
      />

      <div className="mx-auto flex max-w-4xl flex-col items-center px-6 text-center">
        <motion.div
          animate={{ y: [0, -14, 0] }}
          transition={{ repeat: Infinity, duration: 5.5, ease: "easeInOut" }}
          className="flex gap-3"
        >
          {(["am", "noon", "pm"] as const).map((m) => (
            <span
              key={m}
              className="cap-pill"
              style={{ background: MOMENT_META[m].color }}
            />
          ))}
        </motion.div>

        <Reveal delay={0.05} className="mt-10">
          <h2 className="font-display text-[clamp(2.2rem,5.6vw,4.6rem)] font-light leading-[1.02]">
            Your journey toward a <em className="text-green">healthier life</em>{" "}
            starts today.
          </h2>
        </Reveal>
        <Reveal delay={0.15}>
          <p className="mx-auto mt-6 max-w-md text-lg text-ink-soft">
            One bottle. One daily system. Three perfect moments.
          </p>
        </Reveal>
        <Reveal delay={0.25} className="mt-10">
          <Magnetic>
            <a
              href="#shop"
              className="inline-block rounded-full bg-green px-10 py-5 text-base font-semibold text-paper shadow-[0_24px_60px_-18px_rgba(27,94,68,.6)] transition-colors hover:bg-green-bright"
            >
              Start Your Journey
            </a>
          </Magnetic>
        </Reveal>
        <Reveal delay={0.35}>
          <p className="mt-8 font-mono text-[11px] uppercase tracking-[0.24em] text-ink-faint">
            LONGIVLIFE · by GetLongiv
          </p>
        </Reveal>
      </div>
    </section>
  );
}
