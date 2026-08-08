/**
 * LONGIVLIFE content — sourced from the GetLongiv pitch deck and the
 * existing brand site. Structure/function positioning only: products are
 * dietary supplements, not intended to diagnose, treat, cure or prevent
 * any disease.
 */

export type Moment = "am" | "noon" | "pm";

export const MOMENT_META: Record<
  Moment,
  { label: string; time: string; color: string; soft: string; title: string; sub: string }
> = {
  am: {
    label: "AM",
    time: "Morning",
    color: "#5E93BA",
    soft: "#EAF1F6",
    title: "Energy & Focus",
    sub: "Start the day supported — designed around daytime energy and alertness.",
  },
  noon: {
    label: "NOON",
    time: "Afternoon",
    color: "#E0A43C",
    soft: "#FAF1DE",
    title: "Sustain & Strength",
    sub: "Creatine, electrolytes and minerals to support strength and daily performance.",
  },
  pm: {
    label: "PM",
    time: "Night",
    color: "#4B4A7A",
    soft: "#EBEAF3",
    title: "Recovery & Rest",
    sub: "Formulated to complement the wind-down, rest and recovery window.",
  },
};

export const CAPSULES: {
  moment: Moment;
  ingredients: string[];
  benefits: string[];
}[] = [
  {
    moment: "am",
    ingredients: ["Vitamin B Complex", "Iron", "Energy Blend"],
    benefits: ["Energy", "Mental Focus", "Metabolism"],
  },
  {
    moment: "noon",
    ingredients: ["Creatine", "Electrolytes", "Minerals"],
    benefits: ["Strength", "Performance", "Recovery"],
  },
  {
    moment: "pm",
    ingredients: ["Magnesium", "Ashwagandha", "Recovery Complex"],
    benefits: ["Deep Sleep", "Recovery", "Stress Relief"],
  },
];

export const PROBLEMS = [
  { label: "Poor sleep", note: "chronic" },
  { label: "Everyday stress & burnout", note: "rising" },
  { label: "Low energy", note: "daily crashes" },
  { label: "Vitamin & mineral gaps", note: "widespread" },
  { label: "Hormonal imbalance", note: "under-supported" },
  { label: "Low recovery", note: "untracked" },
];

export const INGREDIENTS: {
  name: string;
  moment: Moment;
  role: string;
  source: string;
  detail: string;
}[] = [
  {
    name: "Vitamin B Complex",
    moment: "am",
    role: "Daytime energy support",
    source: "B1 · B2 · B6 · B12 · Folate",
    detail:
      "B-vitamins are cofactors in the pathways your cells use to convert food into usable energy — the foundation of the morning capsule.",
  },
  {
    name: "Iron",
    moment: "am",
    role: "Oxygen transport",
    source: "Gentle, non-constipating form",
    detail:
      "Iron supports haemoglobin, which carries oxygen to working muscles and the brain. Gaps are widespread — especially in vegetarian diets.",
  },
  {
    name: "Energy Blend",
    moment: "am",
    role: "Alertness & metabolism",
    source: "Botanical actives",
    detail:
      "A measured blend designed to support alertness and metabolism through the first half of the day — without the crash cycle.",
  },
  {
    name: "Creatine",
    moment: "noon",
    role: "Strength & performance",
    source: "Creatine monohydrate",
    detail:
      "The most-studied sports nutrient in the world — established for muscle and strength, with emerging research into everyday recovery and cognition. We believe it's becoming the new Vitamin D.",
  },
  {
    name: "Electrolytes",
    moment: "noon",
    role: "Hydration balance",
    source: "Sodium · Potassium",
    detail:
      "Electrolytes support fluid balance and normal muscle function — the quiet infrastructure behind an active afternoon.",
  },
  {
    name: "Minerals",
    moment: "noon",
    role: "Daily micronutrient base",
    source: "Zinc · Selenium · Chromium",
    detail:
      "Trace minerals your body can't make, dosed for daily sufficiency rather than megadosing.",
  },
  {
    name: "Magnesium",
    moment: "pm",
    role: "Rest & relaxation",
    source: "Highly absorbable glycinate",
    detail:
      "Magnesium contributes to normal muscle and nervous-system function — the anchor of the night capsule's wind-down window.",
  },
  {
    name: "Ashwagandha",
    moment: "pm",
    role: "Stress support",
    source: "Root extract, standardised",
    detail:
      "A traditional adaptogen studied for its role in how the body responds to everyday stress.",
  },
  {
    name: "Recovery Complex",
    moment: "pm",
    role: "Overnight recovery",
    source: "Glycine · Zinc · botanicals",
    detail:
      "Designed to complement the body's natural overnight repair rhythm, so tomorrow starts from a better baseline.",
  },
];

export const BENEFITS: {
  key: string;
  title: string;
  copy: string;
  moment: Moment;
}[] = [
  {
    key: "energy",
    title: "Energy",
    copy: "Steady daytime energy, built on B-vitamins and iron — not stimulant spikes.",
    moment: "am",
  },
  {
    key: "focus",
    title: "Focus",
    copy: "Support for the mental clarity your mornings run on.",
    moment: "am",
  },
  {
    key: "recovery",
    title: "Recovery",
    copy: "Creatine and minerals to support strength today and recovery tomorrow.",
    moment: "noon",
  },
  {
    key: "sleep",
    title: "Sleep",
    copy: "Magnesium and ashwagandha to complement your natural wind-down.",
    moment: "pm",
  },
  {
    key: "immunity",
    title: "Immunity",
    copy: "Daily micronutrient sufficiency — zinc, selenium and the basics done right.",
    moment: "noon",
  },
  {
    key: "longevity",
    title: "Longevity",
    copy: "One consistent daily rhythm, compounding quietly for the long run.",
    moment: "pm",
  },
];

export const TESTIMONIALS = [
  {
    quote:
      "I've tried multiple wellness supplements before, but LONGIVLIFE feels different. Within a few weeks, my energy levels became more stable and I stopped feeling constantly drained after work.",
    name: "Colin Clarke",
  },
  {
    quote:
      "The ingredients list was the first thing that impressed me. Clean, plant-based, and actually made for modern lifestyles. My focus and recovery during workouts have noticeably improved.",
    name: "Michele Knight",
  },
  {
    quote:
      "Finding products that genuinely support hormonal balance without harsh side effects felt impossible. LONGIVLIFE has been a game changer.",
    name: "Dan Preston",
  },
];

export const FAQ = [
  {
    q: "What makes LONGIVLIFE different from other supplements?",
    a: "LONGIVLIFE products are thoughtfully designed around modern wellness needs using plant-based, clinically researched ingredients without unnecessary synthetic fillers — organised into one daily rhythm instead of a shelf of separate bottles.",
  },
  {
    q: "Are LONGIVLIFE products safe for daily use?",
    a: "Yes. Our formulations are developed with wellness experts using carefully selected ingredients suitable for long-term daily wellness support when used as directed.",
  },
  {
    q: "How do I take the system?",
    a: "Three capsules, three moments: AM with breakfast, NOON with lunch, PM about an hour before bed. Every bottle is a full 30-day supply of all three.",
  },
  {
    q: "Why is creatine in a daily wellness product?",
    a: "Creatine is one of the most-studied nutrients in sports science, established for muscle and strength — and research is now exploring a much broader everyday role. We include a measured daily dose, not a bodybuilding megadose.",
  },
  {
    q: "Is it vegetarian-friendly?",
    a: "Yes — the system is designed to be vegetarian-friendly, and several of its ingredients (like iron, B12 and creatine) matter most for vegetarian diets.",
  },
  {
    q: "Can I pause or cancel my subscription?",
    a: "Anytime. Subscriptions can be paused, rescheduled or cancelled from your account in a couple of taps — no calls, no lock-in.",
  },
];

export const PLANS = [
  {
    name: "Monthly",
    price: "₹1,299",
    per: "per bottle · 30 days",
    note: "One bottle. Three daily moments. Cancel anytime.",
    featured: false,
  },
  {
    name: "Quarterly",
    price: "₹1,169",
    per: "per bottle · billed ₹3,507 / 3 mo",
    note: "Save 10% and never break the streak.",
    featured: true,
  },
  {
    name: "Yearly",
    price: "₹999",
    per: "per bottle · billed ₹11,988 / yr",
    note: "The full commitment. Save 23%.",
    featured: false,
  },
];

export const NAV = [
  { label: "Science", href: "#science" },
  { label: "Benefits", href: "#benefits" },
  { label: "Ingredients", href: "#ingredients" },
  { label: "Reviews", href: "#reviews" },
  { label: "FAQs", href: "#faq" },
];

export const DISCLAIMER =
  "Structure / function positioning only. LONGIVLIFE products are dietary supplements and are not intended to diagnose, treat, cure or prevent any disease. Final formulations subject to FSSAI compliance. Consult your physician before use if pregnant, nursing or on medication.";
