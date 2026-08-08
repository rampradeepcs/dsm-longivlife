"use client";

import { Reveal } from "@/components/ui/Reveal";

const MOMENTS = [
  { word: "Morning rituals", tint: "#EAF1F6", accent: "#5E93BA", span: "md:col-span-3" },
  { word: "Training", tint: "#E4EFE9", accent: "#2E8B67", span: "md:col-span-2" },
  { word: "Deep work", tint: "#FAF1DE", accent: "#E0A43C", span: "md:col-span-2" },
  { word: "Travel", tint: "#F6EDE4", accent: "#B98A6A", span: "md:col-span-3" },
  { word: "Eating well", tint: "#E4EFE9", accent: "#1B5E44", span: "md:col-span-3" },
  { word: "Sleep", tint: "#EBEAF3", accent: "#4B4A7A", span: "md:col-span-2" },
];

/** Lifestyle — editorial typographic panels in place of photography. */
export function Lifestyle() {
  return (
    <section className="relative bg-paper py-32 md:py-40">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal>
          <p className="eyebrow">Built for real life</p>
        </Reveal>
        <Reveal delay={0.08}>
          <h2 className="font-display mt-6 max-w-2xl text-[clamp(2rem,4.4vw,3.4rem)] font-light leading-[1.04]">
            The system disappears
            <br />
            <em className="text-green">into your day.</em>
          </h2>
        </Reveal>

        <div className="mt-14 grid gap-4 md:grid-cols-5">
          {MOMENTS.map((m, i) => (
            <Reveal key={m.word} delay={(i % 3) * 0.07} amount={0.3} className={m.span}>
              <div
                className="group relative flex h-44 items-end overflow-hidden rounded-3xl border border-line-soft p-6 md:h-56"
                style={{ background: m.tint }}
              >
                <span
                  className="absolute right-5 top-5 h-3 w-3 rounded-full transition-transform duration-500 group-hover:scale-[1.8]"
                  style={{ background: m.accent }}
                />
                <span className="font-display text-2xl font-light transition-transform duration-500 group-hover:-translate-y-1.5 md:text-3xl">
                  {m.word}
                </span>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
