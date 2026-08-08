"use client";

import { Reveal } from "@/components/ui/Reveal";

const STEPS = [
  { title: "Bottle", copy: "One bottle. Thirty days. Three moments a day." },
  { title: "Ingredients", copy: "Clinically researched actives, dosed for daily sufficiency." },
  { title: "Absorption", copy: "Timed to meals and the body's own uptake windows." },
  { title: "Cells", copy: "Micronutrients reach the pathways that run on them." },
  { title: "Energy", copy: "Steadier days — energy, focus, strength, sleep." },
  { title: "Longevity", copy: "Consistency compounds. That's the whole secret." },
];

/** How LONGIVLIFE works — a connected ecosystem with flowing particles. */
export function HowItWorks() {
  return (
    <section id="science" className="relative overflow-hidden bg-paper py-32 md:py-44">
      <div className="mx-auto max-w-4xl px-6">
        <Reveal className="text-center">
          <p className="eyebrow justify-center">How it works</p>
        </Reveal>
        <Reveal delay={0.08} className="text-center">
          <h2 className="font-display mt-6 text-[clamp(2rem,4.6vw,3.6rem)] font-light">
            From bottle <em className="text-green">to biology.</em>
          </h2>
        </Reveal>

        <div className="relative mt-20">
          {/* flowing spine */}
          <svg
            className="absolute left-4 top-0 h-full w-px overflow-visible md:left-1/2 md:-translate-x-1/2"
            aria-hidden
          >
            <line
              x1="0"
              y1="0"
              x2="0"
              y2="100%"
              stroke="rgba(16,32,26,.14)"
              strokeWidth="1"
            />
            <line
              x1="0"
              y1="0"
              x2="0"
              y2="100%"
              stroke="#2E8B67"
              strokeWidth="1.5"
              strokeDasharray="6 14"
              style={{ animation: "flow-dash 6s linear infinite" }}
            />
          </svg>

          <ol className="relative flex flex-col gap-14">
            {STEPS.map((s, i) => (
              <Reveal key={s.title} amount={0.5}>
                <li
                  className={`relative flex justify-start ${i % 2 ? "md:justify-end" : ""}`}
                >
                  <div
                    className={`w-full pl-12 text-left md:w-[calc(50%-34px)] md:max-w-[300px] md:pl-0 ${i % 2 ? "md:text-left" : "md:text-right"}`}
                  >
                    <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink-faint">
                      {String(i + 1).padStart(2, "0")}
                    </p>
                    <h3 className="font-display mt-1 text-2xl">{s.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-ink-soft">
                      {s.copy}
                    </p>
                  </div>
                  {/* node */}
                  <span className="absolute left-4 top-2 h-3.5 w-3.5 -translate-x-1/2 rounded-full border-2 border-paper bg-green shadow-[0_0_0_4px_rgba(46,139,103,.15)] md:left-1/2" />
                </li>
              </Reveal>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
