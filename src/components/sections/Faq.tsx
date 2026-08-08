"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { FAQ } from "@/lib/data";
import { Reveal } from "@/components/ui/Reveal";

/** FAQ — smooth animated accordion. */
export function Faq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="relative bg-paper2 py-32 md:py-44">
      <div className="mx-auto max-w-3xl px-6">
        <Reveal className="text-center">
          <p className="eyebrow justify-center">Frequently asked questions</p>
        </Reveal>
        <Reveal delay={0.08} className="text-center">
          <h2 className="font-display mx-auto mt-6 text-[clamp(2rem,4.4vw,3.4rem)] font-light">
            Everything else <em className="text-green">you&apos;d ask.</em>
          </h2>
        </Reveal>

        <div className="mt-14 flex flex-col">
          {FAQ.map((item, i) => {
            const isOpen = open === i;
            return (
              <Reveal key={item.q} delay={i * 0.03} amount={0.5}>
                <div className="border-b border-line">
                  <button
                    onClick={() => setOpen(isOpen ? null : i)}
                    aria-expanded={isOpen}
                    className="flex w-full items-center justify-between gap-6 py-6 text-left"
                  >
                    <span className="font-display text-xl transition-colors hover:text-green md:text-2xl">
                      {item.q}
                    </span>
                    <motion.span
                      animate={{ rotate: isOpen ? 45 : 0 }}
                      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                      className="flex h-9 w-9 flex-none items-center justify-center rounded-full border border-line font-mono text-lg text-ink-soft"
                    >
                      +
                    </motion.span>
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                        className="overflow-hidden"
                      >
                        <p className="max-w-xl pb-7 leading-relaxed text-ink-soft">
                          {item.a}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
