import React from "react";
import { motion } from "framer-motion";
import { Handshake } from "lucide-react";
import { IMAGE_URLS } from "../../constants/mediaUrls";
import { LoadingImage } from "../ui/LoadingImage";
import {
  SectionBackground,
  Eyebrow,
  GradientText,
} from "../ui/sectionDecor";

const images = [
  IMAGE_URLS.logo,
  IMAGE_URLS.partners.axis,
  IMAGE_URLS.partners.falahzar,
  IMAGE_URLS.partners.imflux,
  IMAGE_URLS.partners.iStaff,
  IMAGE_URLS.partners.forest,
  IMAGE_URLS.partners.keyCube,
];

const MarqueeRow: React.FC<{ reverse?: boolean }> = ({ reverse }) => {
  const track = [...images, ...images];
  return (
    <div className="group/marquee relative w-full overflow-hidden">
      {/* edge fades */}
      <div className="absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-[#1a1424]/90 to-transparent sm:w-40" />
      <div className="absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-[#1a1424]/90 to-transparent sm:w-40" />

      <div
        className={`flex w-max ${
          reverse ? "animate-marquee-reverse" : "animate-marquee"
        } group-hover/marquee:[animation-play-state:paused]`}
      >
        {track.map((src, index) => (
          <div
            key={`${reverse ? "rev" : "fwd"}-${index}`}
            className="mx-3 flex h-24 w-44 flex-shrink-0 items-center justify-center rounded-2xl glass-panel px-7 transition-all duration-300 hover:border-carousel2/50 hover:bg-white/[0.06] sm:mx-4 sm:w-52"
          >
            <LoadingImage
              src={src}
              alt={`Partner ${index}`}
              className="max-h-12 w-full object-contain opacity-60 grayscale transition-all duration-300 hover:opacity-100 hover:grayscale-0"
              skeletonClassName="w-full h-full"
              aspectRatio="aspect-auto"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

const ImageSlider: React.FC = () => {
  return (
    <section className="relative w-full overflow-hidden py-20 sm:py-28">
      <SectionBackground />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-14 max-w-3xl text-center">
          <Eyebrow icon={Handshake}>Our Partners</Eyebrow>
          <motion.h2
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, delay: 0.05 }}
            className="mt-5 text-3xl font-extrabold leading-tight text-white sm:text-4xl lg:text-5xl"
          >
            Trusted by <GradientText>forward-thinking</GradientText> brands
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, delay: 0.12 }}
            className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-gray-400 sm:text-base"
          >
            We collaborate with ambitious teams across industries to build,
            secure and scale their digital products.
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="space-y-5"
        >
          <MarqueeRow />
          <MarqueeRow reverse />
        </motion.div>
      </div>
    </section>
  );
};

export default ImageSlider;
