import React from "react";
import { motion } from "framer-motion";
import { Cpu } from "lucide-react";
import {
  SectionBackground,
  Eyebrow,
  GradientText,
} from "../ui/sectionDecor";

interface TechnologyLogo {
  name: string;
  logoUrl: string;
  alt: string;
  category: string;
}

const technologies: TechnologyLogo[] = [
  {
    name: "React",
    logoUrl:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
    alt: "React logo",
    category: "Frontend",
  },
  {
    name: "JavaScript",
    logoUrl:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
    alt: "JavaScript logo",
    category: "Language",
  },
  {
    name: "TypeScript",
    logoUrl:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
    alt: "TypeScript logo",
    category: "Language",
  },
  {
    name: "Node.js",
    logoUrl:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
    alt: "Node.js logo",
    category: "Backend",
  },
  {
    name: "Tailwind CSS",
    logoUrl:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg",
    alt: "Tailwind CSS logo",
    category: "Styling",
  },
  {
    name: "MySQL",
    logoUrl:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg",
    alt: "MySQL logo",
    category: "Database",
  },
  {
    name: "PHP",
    logoUrl:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg",
    alt: "PHP logo",
    category: "Backend",
  },
  {
    name: "WordPress",
    logoUrl:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/wordpress/wordpress-plain.svg",
    alt: "WordPress logo",
    category: "CMS",
  },
  {
    name: "CSS3",
    logoUrl:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg",
    alt: "CSS3 logo",
    category: "Styling",
  },
  {
    name: "HTML5",
    logoUrl:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg",
    alt: "HTML5 logo",
    category: "Markup",
  },
];

const TechCard: React.FC<{ tech: TechnologyLogo }> = ({ tech }) => (
  <div className="mx-2.5 flex w-40 flex-shrink-0 flex-col items-center gap-3 rounded-2xl glass-panel px-5 py-6 transition-all duration-300 hover:-translate-y-1.5 hover:border-carousel2/50 hover:bg-white/[0.06] sm:w-44">
    <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-bgColor/60 ring-1 ring-white/5">
      <img
        src={tech.logoUrl}
        alt={tech.alt}
        loading="lazy"
        className="h-10 w-10 object-contain transition-transform duration-300 group-hover:scale-110"
      />
    </div>
    <div className="text-center">
      <p className="text-sm font-semibold text-white">{tech.name}</p>
      <p className="text-[11px] uppercase tracking-wide text-carousel3/80">
        {tech.category}
      </p>
    </div>
  </div>
);

const TechnologiesWeUse: React.FC = () => {
  const track = [...technologies, ...technologies];

  return (
    <section className="relative w-full overflow-hidden py-20 sm:py-28">
      <SectionBackground />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-14 max-w-3xl text-center">
          <Eyebrow icon={Cpu}>Our Stack</Eyebrow>
          <motion.h2
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, delay: 0.05 }}
            className="mt-5 text-3xl font-extrabold leading-tight text-white sm:text-4xl lg:text-5xl"
          >
            Technologies <GradientText>we use</GradientText>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, delay: 0.12 }}
            className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-gray-400 sm:text-base"
          >
            A modern, battle-tested toolkit that powers fast, scalable and
            secure products.
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="group/marquee relative w-full overflow-hidden"
        >
          <div className="absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-[#1a1424]/90 to-transparent sm:w-40" />
          <div className="absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-[#1a1424]/90 to-transparent sm:w-40" />

          <div className="flex w-max animate-marquee py-4 group-hover/marquee:[animation-play-state:paused]">
            {track.map((tech, index) => (
              <div key={index} className="group">
                <TechCard tech={tech} />
              </div>
            ))}
          </div>
        </motion.div>

        <div className="relative z-10 mt-12 flex max-w-3xl flex-wrap items-center justify-center gap-x-8 gap-y-3 text-center text-sm text-gray-500 mx-auto">
          <span>
            <span className="font-semibold text-carousel3">
              {technologies.length}+
            </span>{" "}
            modern technologies
          </span>
          <span className="hidden h-1 w-1 rounded-full bg-carousel2/60 sm:block" />
          <span>
            <span className="font-semibold text-carousel3">100%</span> industry
            standard
          </span>
          <span className="hidden h-1 w-1 rounded-full bg-carousel2/60 sm:block" />
          <span>
            <span className="font-semibold text-carousel3">Always</span>{" "}
            up-to-date
          </span>
        </div>
      </div>
    </section>
  );
};

export default TechnologiesWeUse;
