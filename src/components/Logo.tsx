/**
 * LONGIVlife brand lockup — waveform mark (gold-tipped peak), "LONGIV" in
 * light sans, "life" in italic serif.
 */

export function LogoMark({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 42" fill="none" className={className} aria-hidden="true">
      <path
        d="M2 21 H10 C13 21 14 13 17 13 C20 13 21 21 24 21 C27 21 28 4 31 4 C34.5 4 35.5 38 39 38 C42.5 38 43.5 6 47 6 C50.5 6 51 21 54 21 H62"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M27.9 7.4 C28.8 5 29.7 4 31 4 C32.3 4 33.2 5.1 34 7.4"
        stroke="#C9A24B"
        strokeWidth="2.4"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function Logo({
  mark = "h-6",
  word = "text-[15px]",
  life = "text-[20px]",
  className = "",
}: {
  mark?: string;
  word?: string;
  life?: string;
  className?: string;
}) {
  return (
    <span className={`inline-flex items-center gap-2 ${className}`}>
      <LogoMark className={`${mark} w-auto shrink-0`} />
      <span className="inline-flex items-baseline whitespace-nowrap leading-none">
        <span
          className={`font-sans font-light uppercase tracking-[0.12em] ${word}`}
        >
          Longiv
        </span>
        <em
          className={`font-display -ml-px font-light lowercase italic ${life}`}
        >
          life
        </em>
      </span>
    </span>
  );
}
