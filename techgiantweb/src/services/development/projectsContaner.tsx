import { ArrowRight } from "lucide-react";
import DevProjectScreen from "../development/devProjectScreen";
import ForestHerbs from "../../assets/forestHearbs.mp4";
import Falahzar from "../../assets/falahzar.mp4";
import Influx from "../../assets/influx1.mp4";
import PrayasVid from "../../assets/Prayas.mp4";

// Reusable section component
interface ProjectSectionProps {
  title: string;
  description: string;
  videoSrc: string;
  reverse?: boolean;
  href?: string;
  directProjectLink?: string;
}

const ProjectSection: React.FC<ProjectSectionProps> = ({
  title,
  description,
  videoSrc,
  reverse = false,
  href,
  directProjectLink,
}) => {
  return (
    <div className="max-w-7xl w-full mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center rounded-2xl ">
      {/* Conditionally render video/text based on `reverse` */}
      {reverse ? (
        <>
          {/* Video first on left */}
          <div className="flex items-center justify-center order-1 lg:order-1">
            <div className="w-full max-w-xl relative shadow-xl bg-carousel3`">
              <DevProjectScreen src={videoSrc} />
            </div>
          </div>
          {/* Text second on right */}
          <div className="flex flex-col justify-center order-2 lg:order-2">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-8 font-sans">
              {title}
            </h1>
            <p className="text-gray-300 mb-8 text-base md:text-lg font-sans leading-normal md:leading-relaxed max-w-prose mx-auto text-justify">
              {description}
            </p>
            <div>
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-white hover:text-gray-300 transition-colors border-b border-white hover:border-gray-300 pb-1 group font-sans"
              >
                {directProjectLink}
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </div>
        </>
      ) : (
        <>
          {/* Text first on left */}
          <div className="flex flex-col justify-center order-1 lg:order-1">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-8 font-sans">
              {title}
            </h1>
            <p className="text-gray-300 mb-8 text-base md:text-lg font-sans leading-normal md:leading-relaxed max-w-prose mx-auto text-justify">
              {description}
            </p>
            <div>
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-white font-sans hover:text-gray-300 transition-colors border-b border-white hover:border-gray-300 pb-1 group"
              >
                {directProjectLink}
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </div>
          {/* Video second on right */}
          <div className="flex items-center justify-center order-2 lg:order-2">
            <div className="w-full max-w-xl relative shadow-xl ">
            {/* bg-gradient-to-l from-bgColor via-carousel1 to-bgColor */}
            
              <DevProjectScreen src={videoSrc} />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

const ProjectsContaner = () => {
  return (
    <div className="min-h-screen bg-bgColor flex flex-col items-center justify-center px-4 md:px-8 py-16 space-y-16">
      <ProjectSection
        title="Interactive app development of Forest Herbs"
        description="At Tech Giant, we take pride in creating ventures that promote holistic well-being, and The Forest Herbs is a testament to that vision. This initiative is dedicated to delivering 100% pure, chemical-free, and preservative-free natural products, crafted with utmost care to preserve nature’s authenticity."
        videoSrc={ForestHerbs}
        reverse={false} // text left, video right
        href="https://theforestherbs.com/"
        directProjectLink="Forest Herbs"
      />

      <ProjectSection
        title="Falahzar – Elevating Everyday Retail Experiences"
        description="At Tech Giant, we believe in creating ventures that elevate everyday experiences, and Falahzar stands as a shining example of our commitment to quality, diversity, and customer satisfaction. Launched on 07-09-2023, Falahzar has quickly emerged as a trusted name in the retail industry, offering a curated selection of high-quality products paired with exceptional service."
        videoSrc={Falahzar}
        reverse={true}
        href="https://falahzar.com/"
        directProjectLink="Falahzar"
      />

<ProjectSection
        title="Influx – Digital Growth, Redefined"
        description="Influx is a full-service digital agency dedicated to helping businesses thrive in the online landscape. From stunning web design to data-driven marketing strategies, we provide end-to-end digital solutions tailored to elevate brands, drive engagement, and maximize ROI."
        videoSrc={Influx}
        reverse={false}
        href="https://www.influxmarketing.com/"
        directProjectLink="Influx Marketing"
      />

<ProjectSection
        title="Prayas Financial Services Pvt Ltd– Empowering Financial Inclusion"
        description="Prayas Financial Services Pvt Ltd (PFSPL) is a Reserve Bank of India (RBI)-registered Non-Banking Finance Company (NBFC – MFI) committed to fostering financial inclusion for underserved households and informal micro-enterprises. Incorporated on March 3, 2017, and commencing operations on February 6, 2020, PFSPL provides tailored financial solutions to help low-income individuals and micro-entrepreneurs achieve self-reliance and sustainable growth."
        videoSrc={PrayasVid}
        reverse={true}
        href="https://prayasfinance.com/"
        directProjectLink="Prayas"
      />
    </div>
  );
};

export default ProjectsContaner;
