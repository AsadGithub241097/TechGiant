import FeedbackApp from "../feedback2/feedback2";
import Gallery, { PortfolioCarouselSlide } from "../../components/carousel/c1";
import TechGiantText from "../../icons/illumination";
import ImageSlider2 from "../../components/partners/partner2";
import WhyChooseUs from "../../components/whyChooseUs/whyChooseUs";
import { HeroPage } from "../../components/LandingPageBGVideo/heroPage";
import TechnologiesWeUse from "../techWeUse/tech";
import { SEOHomePageContent } from "../SEO/SEOOptimizedContent";
import HomeWebGLShell from "./HomeWebGLShell";
import HomeSectionBlur from "./HomeSectionBlur";
import {
  CentricDoodle,
  ReliabilityDoodle,
  InnovationDoodle,
  QualityDoodle,
} from "../../components/carousel/valueDoodles";

const HOME_CAROUSEL_SLIDES: PortfolioCarouselSlide[] = [
  {
    id: "centric",
    title: "Centric Approach",
    subtitle:
      "Our success is measured by our clients' success. We take the time to understand their unique challenges and business goals, tailoring our solutions to deliver maximum impact and value for their business.",
    image: "/carousel/centric.jpg",
    link: "/about",
    doodle: CentricDoodle,
  },
  {
    id: "reliability",
    title: "Reliability",
    subtitle:
      "Trust and dependability define our work. We ensure our solutions are robust, scalable, and future-proof, providing ongoing support and maintenance to guarantee optimal performance and longevity.",
    image: "/carousel/reliability.jpg",
    link: "/about",
    doodle: ReliabilityDoodle,
  },
  {
    id: "innovation",
    title: "Innovation",
    subtitle:
      "We embrace the latest technologies and industry trends to develop cutting-edge software solutions. Our commitment to innovation drives us to continuously explore new possibilities, ensuring that we stay ahead in a rapidly evolving digital landscape.",
    image: "/carousel/innovation.jpg",
    link: "/Development",
    doodle: InnovationDoodle,
  },
  {
    id: "quality",
    title: "Quality",
    subtitle:
      "Delivering excellence is at the core of what we do. We follow rigorous testing, coding standards, and best practices to ensure that every solution we create meets the highest standards of performance, reliability, and security.",
    image: "/carousel/quality.jpg",
    link: "/Vapt",
    doodle: QualityDoodle,
  },
];

export default function HomePage() {
  return (
    <div className="relative min-h-screen">
      <SEOHomePageContent />

      <main className="relative">
        <HomeWebGLShell>
          <HeroPage />

          <HomeSectionBlur flush>
            <Gallery slides={HOME_CAROUSEL_SLIDES} />
          </HomeSectionBlur>

          <div className="mb-5 flex h-[120px] w-full items-center sm:mb-7 sm:h-[150px] md:h-[170px]">
            <TechGiantText />
          </div>

          <HomeSectionBlur>
            <ImageSlider2 />
          </HomeSectionBlur>

          <HomeSectionBlur>
            <WhyChooseUs />
          </HomeSectionBlur>

          <HomeSectionBlur>
            <TechnologiesWeUse />
          </HomeSectionBlur>

          <HomeSectionBlur>
            <FeedbackApp />
          </HomeSectionBlur>
        </HomeWebGLShell>
      </main>
    </div>
  );
}
