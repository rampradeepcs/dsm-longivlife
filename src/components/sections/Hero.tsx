"use client";

import { useRef } from "react";
import dynamic from "next/dynamic";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
  type MotionValue,
} from "motion/react";
import { BENEFITS, MOMENT_META } from "@/lib/data";
import { Magnetic } from "@/components/ui/Magnetic";

const BottleScene = dynamic(() => import("@/components/three/BottleScene"), {
  ssr: false,
});

/** One floating benefit card, timed to a slice of the hero scroll. */
function BenefitCard({
  progress,
  index,
  title,
  copy,
  color,
  className,
}: {
  progress: MotionValue<number>;
  index: number;
  title: string;
  copy: string;
  color: string;
  className: string;
}) {
  const start = 0.46 + index * 0.035;
  const opacity = useTransform(
    progress,
    [start, start + 0.06, 0.76, 0.82],
    [0, 1, 1, 0],
  );
  const y = useTransform(progress, [start, start + 0.08], [26, 0]);

  return (
    <motion.div
      style={{ opacity, y }}
      className={`glass pointer-events-none absolute w-[190px] rounded-2xl p-4 ${className}`}
    >
      <span
        className="mb-2 block h-1.5 w-8 rounded-full"
        style={{ background: color }}
      />
      <p className="font-display text-lg leading-none">{title}</p>
      <p className="mt-1.5 text-[12px] leading-snug text-ink-soft">{copy}</p>
    </motion.div>
  );
}

export function Hero() {
  const wrap = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: wrap,
    offset: ["start start", "end end"],
  });

  // overlay copy timings
  const introOpacity = useTransform(scrollYProgress, [0, 0.08], [1, 0]);
  const introY = useTransform(scrollYProgress, [0, 0.08], [0, -40]);
  const openCopy = useTransform(scrollYProgress, [0.2, 0.28, 0.38, 0.44], [0, 1, 1, 0]);
  const momentCopy = useTransform(scrollYProgress, [0.5, 0.56, 0.72, 0.78], [0, 1, 1, 0]);
  const finaleCopy = useTransform(scrollYProgress, [0.88, 0.96], [0, 1]);
  const hintOpacity = useTransform(scrollYProgress, [0, 0.04], [1, 0]);

  const cardColors = [
    MOMENT_META.am.color,
    MOMENT_META.am.color,
    MOMENT_META.noon.color,
    MOMENT_META.pm.color,
    MOMENT_META.noon.color,
    "#1B5E44",
  ];
  const cardPositions = [
    "left-[4%] top-[22%] hidden md:block",
    "left-[10%] bottom-[18%] hidden md:block",
    "right-[5%] top-[18%] hidden md:block",
    "right-[9%] bottom-[22%] hidden md:block",
    "left-[30%] top-[10%] hidden lg:block",
    "right-[30%] top-[8%] hidden lg:block",
  ];

  return (
    <section id="top" ref={wrap} className="relative h-[520vh]">
      <div className="sticky top-0 h-screen overflow-hidden">
        {/* atmosphere */}
        <div
          className="glow h-[620px] w-[620px] bg-noon"
          style={{ top: "-220px", right: "-200px", opacity: 0.16 }}
        />
        <div
          className="glow h-[460px] w-[460px] bg-am"
          style={{ bottom: "-160px", left: "-120px", opacity: 0.2 }}
        />
        <div
          className="glow h-[400px] w-[400px] bg-sage"
          style={{ top: "30%", left: "38%", opacity: 0.3 }}
        />

        {/* 3D bottle */}
        {!reduced && (
          <div className="absolute inset-0">
            <BottleScene progress={scrollYProgress} />
          </div>
        )}

        {/* intro copy */}
        <motion.div
          style={{ opacity: introOpacity, y: introY }}
          className="absolute inset-x-0 top-[16vh] z-10 flex flex-col items-center px-6 text-center"
        >
          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="eyebrow"
          >
            Introducing LONGIVLIFE
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 26 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.65, duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="font-display mt-5 max-w-3xl text-[clamp(2.6rem,7vw,5.2rem)] font-light leading-[0.98]"
          >
            India&apos;s first daily
            <br />
            <em className="text-green">longevity system.</em>
          </motion.h1>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.85, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="mt-8"
          >
            <Magnetic>
              <a
                href="#shop"
                className="inline-block rounded-full bg-green px-8 py-4 text-sm font-semibold text-paper shadow-[0_18px_44px_-14px_rgba(27,94,68,.55)] transition-colors hover:bg-green-bright"
              >
                Start Your Journey
              </a>
            </Magnetic>
          </motion.div>
        </motion.div>

        {/* mobile static hint of the system */}
        <div className="absolute inset-x-0 bottom-[18vh] z-10 flex justify-center md:hidden">
          <motion.div style={{ opacity: momentCopy }} className="flex gap-3">
            {(["am", "noon", "pm"] as const).map((m) => (
              <span
                key={m}
                className="cap-pill sm"
                style={{ background: MOMENT_META[m].color }}
              />
            ))}
          </motion.div>
        </div>

        {/* phase captions */}
        <motion.div
          style={{ opacity: openCopy }}
          className="pointer-events-none absolute inset-x-0 bottom-[14vh] z-10 text-center"
        >
          <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-ink-faint">
            The system opens
          </p>
          <p className="font-display mt-2 text-2xl md:text-3xl">
            Three capsules. Three perfect moments.
          </p>
        </motion.div>

        <motion.div
          style={{ opacity: momentCopy }}
          className="pointer-events-none absolute inset-x-0 bottom-[10vh] z-10 text-center"
        >
          <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-ink-faint">
            Every capsule becomes a benefit
          </p>
        </motion.div>

        <motion.div
          style={{ opacity: finaleCopy }}
          className="pointer-events-none absolute inset-x-0 bottom-[14vh] z-10 text-center"
        >
          <p className="font-display text-2xl md:text-3xl">
            One bottle. Everything your day needs.
          </p>
          <p className="mt-2 font-mono text-[11px] uppercase tracking-[0.3em] text-ink-faint">
            Keep scrolling — the story continues
          </p>
        </motion.div>

        {/* floating benefit cards */}
        {BENEFITS.map((b, i) => (
          <BenefitCard
            key={b.key}
            progress={scrollYProgress}
            index={i}
            title={b.title}
            copy={b.copy}
            color={cardColors[i]}
            className={cardPositions[i]}
          />
        ))}

        {/* scroll hint */}
        <motion.div
          style={{ opacity: hintOpacity }}
          className="absolute bottom-7 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2"
        >
          <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-ink-faint">
            Scroll
          </span>
          <motion.span
            animate={{ y: [0, 7, 0] }}
            transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
            className="block h-8 w-px bg-ink-faint"
          />
        </motion.div>

        {/* reduced-motion fallback visual */}
        {reduced && (
          <div className="absolute inset-x-0 bottom-[20vh] flex justify-center gap-4">
            {(["am", "noon", "pm"] as const).map((m) => (
              <span
                key={m}
                className="cap-pill"
                style={{ background: MOMENT_META[m].color }}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
