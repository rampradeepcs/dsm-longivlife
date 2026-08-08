"use client";

import { TESTIMONIALS } from "@/lib/data";
import { Reveal } from "@/components/ui/Reveal";

/** Floating glass cards on an auto-moving marquee. */
export function Testimonials() {
  const doubled = [...TESTIMONIALS, ...TESTIMONIALS];

  return (
    <section id="reviews" className="relative overflow-hidden bg-paper2 py-32 md:py-40">
      <div
        className="glow h-[420px] w-[420px] bg-noon"
        style={{ top: "-140px", left: "20%", opacity: 0.18 }}
      />
      <div className="mx-auto max-w-6xl px-6">
        <Reveal className="text-center">
          <p className="eyebrow justify-center">What our community says</p>
        </Reveal>
        <Reveal delay={0.08} className="text-center">
          <h2 className="font-display mx-auto mt-6 max-w-xl text-[clamp(2rem,4.4vw,3.4rem)] font-light leading-[1.04]">
            Members, <em className="text-green">not customers.</em>
          </h2>
        </Reveal>
      </div>

      <div className="relative mt-16">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-paper2 to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-paper2 to-transparent" />
        <div className="marquee-track flex w-max gap-6 px-6">
          {doubled.map((t, i) => (
            <figure
              key={i}
              className="glass w-[340px] flex-none rounded-3xl p-8 md:w-[420px]"
              style={{
                animation: `floaty ${6 + (i % 3)}s ease-in-out ${i * 0.7}s infinite`,
              }}
            >
              <div className="flex gap-1 text-noon" aria-label="5 star rating">
                {"★★★★★".split("").map((s, j) => (
                  <span key={j} className="text-sm">
                    {s}
                  </span>
                ))}
              </div>
              <blockquote className="font-display mt-4 text-lg font-light leading-relaxed text-ink">
                “{t.quote}”
              </blockquote>
              <figcaption className="mt-5 font-mono text-xs tracking-wide text-ink-faint">
                — {t.name}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
