import { Hero } from "@/components/sections/Hero";
import { Crisis } from "@/components/sections/Crisis";
import { Chaos } from "@/components/sections/Chaos";
import { System } from "@/components/sections/System";
import { BodyClock } from "@/components/sections/BodyClock";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { Ingredients } from "@/components/sections/Ingredients";
import { Benefits } from "@/components/sections/Benefits";
import { Compare } from "@/components/sections/Compare";
import { Lifestyle } from "@/components/sections/Lifestyle";
import { Science } from "@/components/sections/Science";
import { Journey } from "@/components/sections/Journey";
import { Testimonials } from "@/components/sections/Testimonials";
import { Pricing } from "@/components/sections/Pricing";
import { Faq } from "@/components/sections/Faq";
import { FinalCta } from "@/components/sections/FinalCta";

export default function Home() {
  return (
    <main>
      <Hero />
      <Crisis />
      <Chaos />
      <System />
      <BodyClock />
      <HowItWorks />
      <Ingredients />
      <Benefits />
      <Compare />
      <Lifestyle />
      <Science />
      <Journey />
      <Testimonials />
      <Pricing />
      <Faq />
      <FinalCta />
    </main>
  );
}
