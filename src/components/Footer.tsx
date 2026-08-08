import { NAV, DISCLAIMER } from "@/lib/data";
import { Logo } from "@/components/Logo";

export function Footer() {
  return (
    <footer className="border-t border-line-soft bg-paper2">
      <div className="mx-auto max-w-6xl px-6 py-16">
        <div className="flex flex-col gap-12 md:flex-row md:items-start md:justify-between">
          <div>
            <Logo mark="h-5" word="text-[15px]" life="text-[20px]" />
            <p className="mt-4 max-w-xs text-sm text-ink-soft">
              India&apos;s first daily longevity system. One bottle, one
              rhythm, three perfect moments.
            </p>
            <p className="mt-4 font-mono text-xs tracking-wide text-ink-faint">
              by GetLongiv · getlongiv.com
            </p>
          </div>

          <nav className="grid grid-cols-2 gap-x-16 gap-y-3 text-sm">
            {[{ label: "Home", href: "#top" }, ...NAV, { label: "Shop", href: "#shop" }].map(
              (item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="text-ink-soft transition-colors hover:text-green"
                >
                  {item.label}
                </a>
              ),
            )}
          </nav>
        </div>

        <p className="mt-14 max-w-3xl border-t border-line-soft pt-6 font-mono text-[11px] leading-relaxed text-ink-faint">
          {DISCLAIMER}
        </p>
        <p className="mt-4 font-mono text-[11px] text-ink-faint">
          © {new Date().getFullYear()} GetLongiv. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
