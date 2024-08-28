import CaseStudySection from "@/components/CaseStudySection";
import FeaturesSection from "@/components/FeaturesSection";
import GetStartedSection from "@/components/GetStartedSection";
import HeroSection from "@/components/HeroSection";
import Main from "@/components/Main";
import ProcessSection from "@/components/ProcessSection";
import QuoteSection from "@/components/QuoteSection";

export default function HomePage() {
  return (
    <Main>
      <HeroSection />
      <CaseStudySection />
      <ProcessSection />
      <QuoteSection />
      <FeaturesSection />
      <GetStartedSection />
    </Main>
  );
}