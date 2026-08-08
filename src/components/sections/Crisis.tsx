"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { PROBLEMS } from "@/lib/data";
import { Reveal } from "@/components/ui/Reveal";

/** The Modern Health Crisis — problems surface one by one as you scroll. */
export function Crisis() {
  const wrap = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: wrap,
    offset: ["start end", "end start"],
  });
  const bgShift = useTransform(scrollYProgress, [0, 1], ["#FBFAF8", "#F3F1EB"]);

  return (
    <motion.section style={{ background: bgShift }} className="relative py-32 md:py-44">
      <div ref={wrap} className="mx-auto max-w-6xl px-6">
        <div className="grid items-start gap-14 md:grid-cols-2 md:gap-24">
          <div className="md:sticky md:top-32">
            <Reveal>
              <p className="eyebrow">The modern health crisis</p>
            </Reveal>
            <Reveal delay={0.08}>
              <h2 className="font-display mt-6 text-[clamp(2rem,4.6vw,3.6rem)] font-light leading-[1.04]">
                We&apos;re living longer.
                <br />
                <em className="text-green">Not healthier.</em>
              </h2>
            </Reveal>
            <Reveal delay={0.16}>
              <p className="mt-6 max-w-md text-lg leading-relaxed text-ink-soft">
                This generation has more gyms, more protein and more awareness
                than any before it — and is more tired, stressed and depleted
                than ever.
              </p>
            </Reveal>

            <Reveal delay={0.24}>
              <div className="mt-10 grid grid-cols-3 divide-x divide-line-soft border border-line-soft bg-paper">
                {[
                  ["3 in 4", "report low daily energy"],
                  ["12+", "bottles on the wellness shelf"],
                  ["0", "systems built for your day"],
                ].map(([n, l]) => (
                  <div key={l} className="p-5">
                    <p className="font-display text-3xl">{n}</p>
                    <p className="mt-2 font-mono text-[10px] uppercase leading-snug tracking-[0.12em] text-ink-faint">
                      {l}
                    </p>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>

          <ul className="flex flex-col">
            {PROBLEMS.map((p, i) => (
              <motion.li
                key={p.label}
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.6 }}
                transition={{
                  duration: 0.7,
                  ease: [0.16, 1, 0.3, 1],
                  delay: i * 0.05,
                }}
                className="group flex items-baseline justify-between gap-6 border-b border-line-soft py-7 first:pt-0"
              >
                <span className="font-display text-2xl transition-colors group-hover:text-green md:text-3xl">
                  {p.label}
                </span>
                <span className="font-mono text-xs tracking-wide text-ink-faint">
                  {p.note}
                </span>
              </motion.li>
            ))}
          </ul>
        </div>
      </div>
    </motion.section>
  );
}
