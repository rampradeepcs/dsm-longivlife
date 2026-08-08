"use client";

import { motion } from "motion/react";
import { PLANS, MOMENT_META } from "@/lib/data";
import { Reveal } from "@/components/ui/Reveal";
import { Magnetic } from "@/components/ui/Magnetic";

/** Subscription — premium pricing cards. */
export function Pricing() {
  return (
    <section id="shop" className="relative overflow-hidden bg-paper py-32 md:py-44">
      <div
        className="glow h-[460px] w-[460px] bg-green"
        style={{ bottom: "-200px", right: "-160px", opacity: 0.1 }}
      />
      <div className="mx-auto max-w-6xl px-6">
        <Reveal className="text-center">
          <p className="eyebrow justify-center">Subscription</p>
        </Reveal>
        <Reveal delay={0.08} className="text-center">
          <h2 className="font-display mx-auto mt-6 max-w-2xl text-[clamp(2rem,4.6vw,3.6rem)] font-light leading-[1.04]">
            Many ways to buy.
            <br />
            <em className="text-green">One reason to stay: the routine.</em>
          </h2>
        </Reveal>

        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {PLANS.map((p, i) => (
            <Reveal key={p.name} delay={i * 0.08} amount={0.3}>
              <motion.article
                whileHover={{ y: -8 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className={`relative flex h-full flex-col rounded-3xl border p-8 ${
                  p.featured
                    ? "border-green bg-ink text-paper shadow-[0_40px_90px_-40px_rgba(16,32,26,.5)]"
                    : "border-line bg-white/60"
                }`}
              >
                {p.featured && (
                  <span className="absolute -top-3 left-8 rounded-full bg-green px-3 py-1 font-mono text-[10px] uppercase tracking-[0.16em] text-paper">
                    Most popular
                  </span>
                )}
                <p
                  className={`font-mono text-[11px] uppercase tracking-[0.22em] ${p.featured ? "text-green-bright" : "text-ink-faint"}`}
                >
                  {p.name}
                </p>
                <p className="font-display mt-5 text-5xl font-light">
                  {p.price}
                </p>
                <p
                  className={`mt-2 font-mono text-xs ${p.featured ? "text-white/50" : "text-ink-faint"}`}
                >
                  {p.per}
                </p>
                <p
                  className={`mt-5 text-sm leading-relaxed ${p.featured ? "text-white/70" : "text-ink-soft"}`}
                >
                  {p.note}
                </p>

                <ul className="mt-6 flex flex-col gap-2.5">
                  {(["am", "noon", "pm"] as const).map((m) => (
                    <li key={m} className="flex items-center gap-3">
                      <span
                        className="cap-pill sm"
                        style={{ background: MOMENT_META[m].color }}
                      />
                      <span
                        className={`font-mono text-[11px] tracking-[0.14em] ${p.featured ? "text-white/60" : "text-ink-faint"}`}
                      >
                        {MOMENT_META[m].label} · {MOMENT_META[m].title}
                      </span>
                    </li>
                  ))}
                </ul>

                <div className="mt-auto pt-8">
                  <Magnetic strength={0.2} className="block">
                    <a
                      href="#shop"
                      className={`block rounded-full py-3.5 text-center text-sm font-semibold transition-colors ${
                        p.featured
                          ? "bg-green text-paper hover:bg-green-bright"
                          : "border border-ink/20 text-ink hover:border-green hover:text-green"
                      }`}
                    >
                      Choose {p.name}
                    </a>
                  </Magnetic>
                </div>
              </motion.article>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.2} className="text-center">
          <p className="mx-auto mt-10 max-w-md font-mono text-[11px] leading-relaxed text-ink-faint">
            Every bottle is a full 30-day supply of all three daily capsules.
            Pause, reschedule or cancel anytime.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
