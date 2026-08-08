"use client";

import { Reveal } from "@/components/ui/Reveal";

const STEPS = [
  {
    n: "01",
    title: "Research first",
    copy: "Built from a hundred-plus research papers on micronutrients, chronobiology and everyday performance — turned into something a busy person can actually follow.",
  },
  {
    n: "02",
    title: "Clinical formulation",
    copy: "Formulated with wellness experts around clinically studied ingredients at meaningful daily doses — no fairy-dusting, no megadosing.",
  },
  {
    n: "03",
    title: "Quality & compliance",
    copy: "Manufactured to FSSAI-compliant standards with batch-level quality control, in vegetarian-friendly capsules.",
  },
  {
    n: "04",
    title: "Honest claims",
    copy: "Structure/function positioning only. Where the science is still emerging — like creatine's broader role — we say 'researching', not 'proven'.",
  },
];

/** The science behind it — an elegant staggered timeline. */
export function Science() {
  return (
    <section className="relative bg-paper2 py-32 md:py-44">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid gap-16 md:grid-cols-[1fr_1.4fr]">
          <div className="md:sticky md:top-32 md:self-start">
            <Reveal>
              <p className="eyebrow">The science behind it</p>
            </Reveal>
            <Reveal delay={0.08}>
              <h2 className="font-display mt-6 text-[clamp(2rem,4.4vw,3.4rem)] font-light leading-[1.04]">
                Serious about
                <br />
                <em className="text-green">the boring parts.</em>
              </h2>
            </Reveal>
            <Reveal delay={0.16}>
              <p className="mt-6 max-w-sm leading-relaxed text-ink-soft">
                It started with a family health scare and a stack of
                prescriptions no one could keep straight. The answer wasn&apos;t
                another miracle pill — it was <em>rhythm</em>.
              </p>
            </Reveal>
          </div>

          <ol className="flex flex-col">
            {STEPS.map((s, i) => (
              <Reveal key={s.n} delay={i * 0.05} amount={0.4}>
                <li className="group grid grid-cols-[64px_1fr] gap-6 border-b border-line py-10 first:pt-0 last:border-0">
                  <span className="font-display text-4xl font-light text-ink-faint transition-colors group-hover:text-green">
                    {s.n}
                  </span>
                  <div>
                    <h3 className="font-display text-2xl">{s.title}</h3>
                    <p className="mt-3 max-w-md leading-relaxed text-ink-soft">
                      {s.copy}
                    </p>
                  </div>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
