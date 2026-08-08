"use client";

import { useMemo, useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  type MotionValue,
} from "motion/react";

const LABELS = [
  "Vitamin C",
  "Magnesium",
  "Creatine",
  "Omega-3",
  "Collagen",
  "Iron",
  "CoQ10",
  "B12",
  "Ashwagandha",
  "Zinc",
  "Vitamin D",
  "Biotin",
];

/** One stray supplement bottle that drifts into chaos, then collapses to centre. */
function StrayBottle({
  progress,
  index,
}: {
  progress: MotionValue<number>;
  index: number;
}) {
  // deterministic pseudo-random layout
  const seed = useMemo(() => {
    const r = (n: number) => {
      const x = Math.sin(index * 127.1 + n * 311.7) * 43758.5453;
      return x - Math.floor(x);
    };
    return {
      x0: (r(1) - 0.5) * 70, // vw
      y0: (r(2) - 0.5) * 56, // vh
      rot0: (r(3) - 0.5) * 30,
      xChaos: (r(4) - 0.5) * 95,
      yChaos: (r(5) - 0.5) * 74,
      rotChaos: (r(6) - 0.5) * 160,
    };
  }, [index]);

  const x = useTransform(
    progress,
    [0.05, 0.42, 0.55, 0.75],
    [`${seed.x0}vw`, `${seed.xChaos}vw`, `${seed.xChaos}vw`, "0vw"],
  );
  const y = useTransform(
    progress,
    [0.05, 0.42, 0.55, 0.75],
    [`${seed.y0}vh`, `${seed.yChaos}vh`, `${seed.yChaos}vh`, "0vh"],
  );
  const rotate = useTransform(
    progress,
    [0.05, 0.42, 0.75],
    [seed.rot0, seed.rotChaos, 0],
  );
  const scale = useTransform(progress, [0.62, 0.78], [1, 0.1]);
  const opacity = useTransform(progress, [0.7, 0.79], [1, 0]);

  return (
    <motion.div
      style={{ x, y, rotate, scale, opacity }}
      className="absolute left-1/2 top-1/2 -ml-8 -mt-14"
    >
      <div className="flex h-28 w-16 flex-col items-center rounded-lg border border-line bg-white/70 shadow-sm">
        <div className="-mt-2 h-4 w-7 rounded-t-md bg-ink/20" />
        <span className="mt-6 rotate-0 font-mono text-[8px] uppercase tracking-wider text-ink-faint">
          {LABELS[index]}
        </span>
      </div>
    </motion.div>
  );
}

/**
 * Why supplements fail → the morph. 12 bottles drift, collide into mess,
 * then collapse into ONE Longivlife bottle.
 */
export function Chaos() {
  const wrap = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: wrap,
    offset: ["start start", "end end"],
  });

  const messCopy = useTransform(scrollYProgress, [0.1, 0.2, 0.5, 0.6], [0, 1, 1, 0]);
  const oneScale = useTransform(scrollYProgress, [0.68, 0.85], [0.35, 1]);
  const oneOpacity = useTransform(scrollYProgress, [0.68, 0.8], [0, 1]);
  const solutionCopy = useTransform(scrollYProgress, [0.8, 0.9], [0, 1]);
  const solutionY = useTransform(scrollYProgress, [0.8, 0.9], [30, 0]);

  return (
    <section ref={wrap} className="relative h-[400vh]">
      <div className="sticky top-0 flex h-screen items-center justify-center overflow-hidden bg-paper">
        <div
          className="glow h-[500px] w-[500px] bg-green"
          style={{ bottom: "-200px", right: "-160px", opacity: 0.12 }}
        />

        {/* chaos copy */}
        <motion.div
          style={{ opacity: messCopy }}
          className="pointer-events-none absolute inset-x-0 top-[12vh] z-20 px-6 text-center"
        >
          <p className="eyebrow justify-center">Why supplements fail</p>
          <h2 className="font-display mt-5 text-[clamp(1.9rem,4.5vw,3.4rem)] font-light leading-tight">
            Too many bottles.
            <br />
            Too many routines. <em className="text-ink-faint">Too much confusion.</em>
          </h2>
        </motion.div>

        {/* the stray dozen */}
        <div className="absolute inset-0">
          {LABELS.map((_, i) => (
            <StrayBottle key={i} progress={scrollYProgress} index={i} />
          ))}
        </div>

        {/* the ONE bottle they morph into */}
        <motion.div
          style={{ scale: oneScale, opacity: oneOpacity }}
          className="relative z-10 flex flex-col items-center"
        >
          <svg
            width="150"
            height="270"
            viewBox="0 0 150 270"
            fill="none"
            aria-hidden
          >
            {/* white ribbed cap */}
            <rect x="47" y="2" width="56" height="28" rx="7" fill="#F6F3EB" stroke="rgba(16,32,26,.14)" />
            {[57, 66, 75, 84, 93].map((x) => (
              <line key={x} x1={x} y1="7" x2={x} y2="25" stroke="rgba(16,32,26,.12)" />
            ))}
            {/* clear glass jar */}
            <path
              d="M34 46C34 38 44 32 56 32h38c12 0 22 6 22 14v196c0 10-9 18-20 18H54c-11 0-20-8-20-18V46Z"
              fill="#EAF2EB"
              stroke="rgba(16,32,26,.14)"
            />
            {/* capsules visible through the glass */}
            {(
              [
                [46, 42, -20], [66, 48, 15], [86, 40, -8], [58, 56, 30], [80, 58, -25],
                [44, 238, 12], [64, 244, -18], [84, 236, 24], [56, 226, -30], [92, 226, 8],
              ] as const
            ).map(([cx, cy, r], i) => (
              <rect
                key={i}
                x={cx - 9}
                y={cy - 4}
                width="18"
                height="8"
                rx="4"
                fill={i % 3 ? "#F7F4EA" : "#EFE8D6"}
                stroke="rgba(16,32,26,.08)"
                transform={`rotate(${r} ${cx} ${cy})`}
              />
            ))}
            {/* green product label */}
            <rect x="34" y="72" width="102" height="118" fill="#7FBC3C" />
            {/* lockup: wave + LONGIVlife */}
            <g transform="translate(48 84) scale(0.42)" stroke="#FFFFFF" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M2 21 H10 C13 21 14 13 17 13 C20 13 21 21 24 21 C27 21 28 4 31 4 C34.5 4 35.5 38 39 38 C42.5 38 43.5 6 47 6 C50.5 6 51 21 54 21 H62" fill="none" />
              <path d="M27.9 7.4 C28.8 5 29.7 4 31 4 C32.3 4 33.2 5.1 34 7.4" stroke="#F2CE73" fill="none" />
            </g>
            <text x="80" y="99" fontFamily="Arial, sans-serif" fontWeight="300" fontSize="11" letterSpacing="1.5" fill="#FFFFFF">
              LONGIV
            </text>
            <text x="120" y="99" fontFamily="Georgia, serif" fontStyle="italic" fontSize="12" fill="#FFFFFF">
              life
            </text>
            <text x="85" y="130" textAnchor="middle" fontFamily="Arial, sans-serif" fontWeight="700" fontSize="15" fill="#FFFFFF">
              LONGIV
            </text>
            <text x="85" y="150" textAnchor="middle" fontFamily="Arial, sans-serif" fontWeight="400" fontSize="9" letterSpacing="1" fill="#FFFFFF">
              DAILY LONGEVITY SYSTEM
            </text>
            <g>
              <rect x="53" y="160" width="20" height="9" rx="4.5" fill="#5E93BA" />
              <rect x="75" y="160" width="20" height="9" rx="4.5" fill="#E0A43C" />
              <rect x="97" y="160" width="20" height="9" rx="4.5" fill="#4B4A7A" />
            </g>
            {/* cream strip with veg mark */}
            <rect x="34" y="176" width="102" height="14" fill="#F5F1E3" />
            <text x="70" y="186" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="8" fill="#10201A">
              30 Days
            </text>
            <rect x="108" y="178" width="10" height="10" fill="none" stroke="#1B5E44" strokeWidth="1.5" />
            <circle cx="113" cy="183" r="2.6" fill="#1B5E44" />
          </svg>
        </motion.div>

        {/* solution copy */}
        <motion.div
          style={{ opacity: solutionCopy, y: solutionY }}
          className="pointer-events-none absolute inset-x-0 bottom-[10vh] z-20 px-6 text-center"
        >
          <h2 className="font-display text-[clamp(1.8rem,4vw,3rem)] font-light">
            One bottle. One daily system.
            <br />
            <em className="text-green">Three perfect moments.</em>
          </h2>
        </motion.div>
      </div>
    </section>
  );
}
