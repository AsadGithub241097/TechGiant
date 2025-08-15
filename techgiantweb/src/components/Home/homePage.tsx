import FeedbackApp from "../feedback2/feedback2";
import Gallery from "../../components/carousel/c1";
import TechGiantText from "../../icons/illumination";
import ImageSlider2 from "../../components/partners/partner2";
import WhyChooseUs from "../../components/whyChooseUs/whyChooseUs";
import { HeroPage } from "../../components/LandingPageBGVideo/heroPage";
import TechnologiesWeUse from "../techWeUse/tech";

export default function HomePage() {
  return (
    <div className="bg-bgColor">
      <HeroPage />
      <Gallery />
      <div className="flex h-[170px] w-screen">
        <TechGiantText />
      </div>
      <div className="px-0 flex flex-col item-center justify-center ">
        <ImageSlider2 />
        
        <WhyChooseUs />
        <TechnologiesWeUse />
        <FeedbackApp />
      </div>
    </div>
  );
}
