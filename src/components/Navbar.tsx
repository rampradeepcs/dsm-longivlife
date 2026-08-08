"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { NAV } from "@/lib/data";
import { Logo } from "@/components/Logo";
import { Magnetic } from "@/components/ui/Magnetic";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-4">
      <motion.nav
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
        className={`flex w-full max-w-5xl items-center justify-between rounded-2xl px-5 py-3 transition-all duration-500 ${
          scrolled ? "glass" : "border border-transparent bg-transparent"
        }`}
      >
        <a href="#top" aria-label="LONGIVlife home">
          <Logo mark="h-5" word="text-[15px]" life="text-[20px]" />
        </a>

        <div className="hidden items-center gap-7 md:flex">
          {NAV.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-[13px] font-medium text-ink-soft transition-colors hover:text-green"
            >
              {item.label}
            </a>
          ))}
          <Magnetic strength={0.25}>
            <a
              href="#shop"
              className="rounded-full bg-green px-5 py-2.5 text-[13px] font-semibold text-paper shadow-[0_10px_30px_-12px_rgba(27,94,68,.6)] transition-colors hover:bg-green-bright"
            >
              Start Your Journey
            </a>
          </Magnetic>
        </div>

        <button
          className="flex h-10 w-10 flex-col items-center justify-center gap-1.5 md:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
        >
          <span
            className={`h-px w-6 bg-ink transition-transform ${open ? "translate-y-[3.5px] rotate-45" : ""}`}
          />
          <span
            className={`h-px w-6 bg-ink transition-transform ${open ? "-translate-y-[3.5px] -rotate-45" : ""}`}
          />
        </button>
      </motion.nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="glass absolute inset-x-4 top-[72px] rounded-2xl p-6 md:hidden"
          >
            <div className="flex flex-col gap-4">
              {NAV.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="font-display text-2xl text-ink"
                >
                  {item.label}
                </a>
              ))}
              <a
                href="#shop"
                onClick={() => setOpen(false)}
                className="mt-2 rounded-full bg-green px-5 py-3 text-center text-sm font-semibold text-paper"
              >
                Start Your Journey
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
