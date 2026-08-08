"use client";

import { Reveal } from "@/components/ui/Reveal";

const STOPS = [
  { title: "Purchase", copy: "Pick a plan. One bottle covers all three moments for 30 days." },
  { title: "Delivery", copy: "At your door across India — and shipping to the global map from day one." },
  { title: "Daily routine", copy: "AM with breakfast. NOON with lunch. PM before bed. That's the whole manual." },
  { title: "Feel the shift", copy: "Steadier energy first, better mornings next. Quiet, compounding change." },
  { title: "Subscription", copy: "The routine renews itself, so the streak never breaks. Pause anytime." },
  { title: "Community", copy: "Not customers — members. Challenges, streaks and progress, tracked together." },
];

/** Customer journey — a horizontally scrolling strip of chapters. */
export function Journey() {
  return (
    <section className="relative overflow-hidden bg-paper py-32 md:py-40">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal>
          <p className="eyebrow">Your journey</p>
        </Reveal>
        <Reveal delay={0.08}>
          <h2 className="font-display mt-6 max-w-xl text-[clamp(2rem,4.4vw,3.4rem)] font-light leading-[1.04]">
            From first bottle
            <br />
            <em className="text-green">to lifelong rhythm.</em>
          </h2>
        </Reveal>
      </div>

      <Reveal delay={0.15}>
        <div className="mt-14 flex snap-x snap-mandatory gap-5 overflow-x-auto px-6 pb-6 [scrollbar-width:thin] md:px-[max(24px,calc((100vw-72rem)/2))]">
          {STOPS.map((s, i) => (
            <article
              key={s.title}
              className="glass relative w-[270px] flex-none snap-start rounded-3xl p-7"
            >
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink-faint">
                Chapter {i + 1}
              </p>
              <h3 className="font-display mt-3 text-2xl">{s.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-ink-soft">
                {s.copy}
              </p>
              {i < STOPS.length - 1 && (
                <span className="absolute -right-4 top-1/2 hidden -translate-y-1/2 font-mono text-ink-faint md:block">
                  →
                </span>
              )}
            </article>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
