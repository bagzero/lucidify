import CONTACTHeroSection from "@/components/CONTACTHeroSection";
import FeaturesSection from "@/components/FeaturesSection";
import GetStartedSection from "@/components/GetStartedSection";
import Main from "@/components/Main";

export default function HomePage() {
  return (
    <Main>
      <CONTACTHeroSection />
      <FeaturesSection />
      <GetStartedSection />
    </Main>
  );
}