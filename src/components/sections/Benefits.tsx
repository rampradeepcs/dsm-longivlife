"use client";

import type { ReactNode } from "react";
import { Reveal } from "@/components/ui/Reveal";

/* ---------- six bespoke animated visuals ---------- */

function SunVisual() {
  return (
    <svg viewBox="0 0 200 200" className="h-full w-full" aria-hidden>
      <g
        style={{
          transformOrigin: "100px 100px",
          animation: "spin-slow 30s linear infinite",
        }}
      >
        {Array.from({ length: 12 }).map((_, i) => (
          <line
            key={i}
            x1="100"
            y1="18"
            x2="100"
            y2="40"
            stroke="#E0A43C"
            strokeWidth="3"
            strokeLinecap="round"
            transform={`rotate(${i * 30} 100 100)`}
          />
        ))}
      </g>
      <circle cx="100" cy="100" r="38" fill="#E0A43C" />
      <circle cx="100" cy="100" r="52" fill="#E0A43C" opacity="0.18" />
    </svg>
  );
}

function NeuralVisual() {
  const nodes = [
    [40, 50], [100, 28], [160, 55], [30, 120], [100, 100],
    [170, 120], [65, 165], [140, 170],
  ];
  const edges = [
    [0, 1], [1, 2], [0, 4], [1, 4], [2, 4], [3, 4], [4, 5], [3, 6], [4, 6], [4, 7], [5, 7],
  ];
  return (
    <svg viewBox="0 0 200 200" className="h-full w-full" aria-hidden>
      {edges.map(([a, b], i) => (
        <line
          key={i}
          x1={nodes[a][0]}
          y1={nodes[a][1]}
          x2={nodes[b][0]}
          y2={nodes[b][1]}
          stroke="#5E93BA"
          strokeWidth="1.2"
          strokeDasharray="4 6"
          opacity="0.6"
          style={{ animation: `flow-dash ${5 + (i % 3)}s linear infinite` }}
        />
      ))}
      {nodes.map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r={i === 4 ? 9 : 5} fill="#5E93BA" />
      ))}
    </svg>
  );
}

function RecoveryVisual() {
  return (
    <svg viewBox="0 0 200 200" className="h-full w-full" aria-hidden>
      {Array.from({ length: 7 }).map((_, i) => (
        <path
          key={i}
          d={`M20 ${45 + i * 18} q 40 -12 80 0 t 80 0`}
          fill="none"
          stroke="#2E8B67"
          strokeWidth="3"
          strokeLinecap="round"
          strokeDasharray="90 40"
          opacity={0.35 + i * 0.08}
          style={{ animation: `flow-dash ${6 + i}s linear infinite` }}
        />
      ))}
    </svg>
  );
}

function MoonVisual() {
  return (
    <svg viewBox="0 0 200 200" className="h-full w-full" aria-hidden>
      <path
        d="M128 30a70 70 0 1 0 42 112 58 58 0 0 1-42-112Z"
        fill="#4B4A7A"
      />
      {[[40, 40, 2.5], [170, 60, 2], [50, 150, 1.8], [160, 160, 2.6], [100, 20, 1.6]].map(
        ([x, y, r], i) => (
          <circle
            key={i}
            cx={x}
            cy={y}
            r={r}
            fill="#C9A24B"
            style={{
              animation: `floaty ${4 + i}s ease-in-out ${i * 0.6}s infinite`,
            }}
          />
        ),
      )}
    </svg>
  );
}

function ShieldVisual() {
  return (
    <svg viewBox="0 0 200 200" className="h-full w-full" aria-hidden>
      <path
        d="M100 26 156 48v46c0 40-24 66-56 80-32-14-56-40-56-80V48Z"
        fill="none"
        stroke="#1B5E44"
        strokeWidth="3"
      />
      <path
        d="M100 46 140 62v34c0 28-17 47-40 58-23-11-40-30-40-58V62Z"
        fill="#1B5E44"
        opacity="0.14"
      />
      <g
        style={{
          transformOrigin: "100px 100px",
          animation: "spin-slow 18s linear infinite",
        }}
      >
        {[0, 90, 180, 270].map((deg) => (
          <circle
            key={deg}
            cx={100 + 78 * Math.cos((deg * Math.PI) / 180)}
            cy={100 + 78 * Math.sin((deg * Math.PI) / 180)}
            r="4"
            fill="#2E8B67"
          />
        ))}
      </g>
      <path
        d="M84 100l12 12 22-26"
        fill="none"
        stroke="#1B5E44"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function HelixVisual() {
  const rungs = Array.from({ length: 9 });
  return (
    <svg viewBox="0 0 200 200" className="h-full w-full" aria-hidden>
      <path
        d="M60 12 C 140 46, 60 88, 140 122 C 60 156, 140 178, 100 196"
        fill="none"
        stroke="#1B5E44"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <path
        d="M140 12 C 60 46, 140 88, 60 122 C 140 156, 60 178, 100 196"
        fill="none"
        stroke="#C9A24B"
        strokeWidth="3"
        strokeLinecap="round"
      />
      {rungs.map((_, i) => {
        const y = 22 + i * 20;
        const spread = Math.abs(Math.sin((i / 8) * Math.PI * 2)) * 34 + 6;
        return (
          <line
            key={i}
            x1={100 - spread}
            y1={y}
            x2={100 + spread}
            y2={y}
            stroke="#2E8B67"
            strokeWidth="2"
            strokeDasharray="2 4"
            opacity="0.7"
            style={{ animation: `flow-dash ${7 + i}s linear infinite` }}
          />
        );
      })}
    </svg>
  );
}

/* ---------- section ---------- */

const BLOCKS: {
  key: string;
  title: string;
  headline: string;
  copy: string;
  visual: ReactNode;
  tint: string;
}[] = [
  {
    key: "energy",
    title: "Energy",
    headline: "Steady, not spiky.",
    copy: "B-vitamins and iron support the pathways your cells use to make energy — so mornings start on time and afternoons don't collapse.",
    visual: <SunVisual />,
    tint: "#FAF1DE",
  },
  {
    key: "focus",
    title: "Focus",
    headline: "A clearer signal.",
    copy: "Oxygen, micronutrients and rhythm — the unglamorous infrastructure of concentration, delivered when your brain actually uses it.",
    visual: <NeuralVisual />,
    tint: "#EAF1F6",
  },
  {
    key: "recovery",
    title: "Recovery",
    headline: "Rebuild by default.",
    copy: "A measured daily dose of creatine plus minerals supports strength and everyday recovery — training day or not.",
    visual: <RecoveryVisual />,
    tint: "#E4EFE9",
  },
  {
    key: "sleep",
    title: "Sleep",
    headline: "End the day on purpose.",
    copy: "Magnesium and ashwagandha complement your natural wind-down, so deep rest stops being a lottery.",
    visual: <MoonVisual />,
    tint: "#EBEAF3",
  },
  {
    key: "immunity",
    title: "Immunity",
    headline: "The basics, done daily.",
    copy: "Zinc, selenium and daily sufficiency — resilience is mostly consistency, and consistency is the whole product.",
    visual: <ShieldVisual />,
    tint: "#E4EFE9",
  },
  {
    key: "longevity",
    title: "Longevity",
    headline: "Compound interest for your body.",
    copy: "No single capsule changes your life. Three a day, every day, for years — that curve bends differently.",
    visual: <HelixVisual />,
    tint: "#F6EDE4",
  },
];

export function Benefits() {
  return (
    <section id="benefits" className="relative bg-paper py-32 md:py-44">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal className="text-center">
          <p className="eyebrow justify-center">The benefits</p>
        </Reveal>
        <Reveal delay={0.08} className="text-center">
          <h2 className="font-display mx-auto mt-6 max-w-2xl text-[clamp(2rem,4.6vw,3.6rem)] font-light leading-[1.04]">
            Six ways your days
            <br />
            <em className="text-green">quietly improve.</em>
          </h2>
        </Reveal>

        <div className="mt-20 grid gap-6 md:grid-cols-2">
          {BLOCKS.map((b, i) => (
            <Reveal key={b.key} delay={(i % 2) * 0.08} amount={0.3}>
              <article
                className="group relative flex h-full flex-col justify-between overflow-hidden rounded-3xl border border-line-soft p-8 transition-shadow duration-500 hover:shadow-[0_30px_70px_-40px_rgba(16,32,26,.35)] md:p-10"
                style={{ background: b.tint }}
              >
                <div className="relative z-10 max-w-sm">
                  <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-ink-faint">
                    {b.title}
                  </p>
                  <h3 className="font-display mt-3 text-3xl font-light">
                    {b.headline}
                  </h3>
                  <p className="mt-4 leading-relaxed text-ink-soft">{b.copy}</p>
                </div>
                <div className="pointer-events-none mt-8 h-44 w-44 self-end opacity-80 transition-transform duration-700 group-hover:scale-105 md:h-52 md:w-52">
                  {b.visual}
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
