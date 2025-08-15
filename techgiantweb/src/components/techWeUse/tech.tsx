import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";

interface TechnologyLogo {
  name: string;
  logoUrl: string;
  alt: string;
}

const TechnologiesWeUse: React.FC = () => {
  const marqueeRef = useRef<HTMLDivElement>(null);
  const marqueeContentRef = useRef<HTMLDivElement>(null);

  const technologies: TechnologyLogo[] = [
    {
      name: "React",
      logoUrl:
        "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
      alt: "React logo",
    },
    {
      name: "JavaScript",
      logoUrl:
        "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
      alt: "JavaScript logo",
    },
    {
      name: "TypeScript",
      logoUrl:
        "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
      alt: "TypeScript logo",
    },
    {
      name: "Node.js",
      logoUrl:
        "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
      alt: "Node.js logo",
    },
    {
      name: "Tailwind CSS",
      logoUrl:
        "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg",
      alt: "Tailwind CSS logo",
    },
    {
      name: "MySQL",
      logoUrl:
        "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg",
      alt: "MySQL logo",
    },
    {
      name: "PHP",
      logoUrl:
        "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg",
      alt: "PHP logo",
    },
    {
      name: "WordPress",
      logoUrl:
        "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/wordpress/wordpress-plain.svg",
      alt: "WordPress logo",
    },
    {
      name: "CSS3",
      logoUrl:
        "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg",
      alt: "CSS3 logo",
    },
    {
      name: "HTML5",
      logoUrl:
        "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg",
      alt: "HTML5 logo",
    },
  ];

  // Duplicate logos for infinite seamless scrolling effect
  const scrollingLogos = [...technologies, ...technologies];

  useEffect(() => {
    if (marqueeRef.current && marqueeContentRef.current) {
      // Calculate the exact width of one set of logos (non-duplicated)
      const itemWidth = 64 + 40; // w-16 (64px) + gap-10 (40px)
      const singleSetWidth = technologies.length * itemWidth;
      const duration = singleSetWidth / 50; // Adjust 50 for speed control
  
      gsap.fromTo(marqueeContentRef.current,
        { x: 0 },
        {
          x: -singleSetWidth, // Move by exactly one set width
          duration: duration,
          ease: "none",
          repeat: -1,
          // Reset position when complete for perfect loop
          onRepeat: () => {
            gsap.set(marqueeContentRef.current, { x: 0 });
          }
        }
      );
    }
  }, []);
  

  return (
    <div className="w-full py-12 bg-bgColor overflow-hidden relative mt-[120px] md:mt-[150px] ">
      <div className="max-w-[105rem] mx-auto px-4 ">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white flex justify-center items-center pb-32 gap-[1rem]">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-300 to-indigo-200 h-auto">
            Technologies{""}
          </span>
          
          We Use
        </h1>
        <div ref={marqueeRef} className="relative w-full overflow-hidden">
          <div className="absolute left-0 top-0 h-full w-24 bg-gradient-to-r from-bgColor to-transparent z-10 pointer-events-none"></div>
          <div className="absolute right-0 top-0 h-full w-24 bg-gradient-to-l from-bgColor to-transparent z-10 pointer-events-none"></div>

          <div
            ref={marqueeContentRef}
            className="flex gap-10 md:gap-16 whitespace-nowrap w-max"
            style={{ willChange: 'transform' }} 
          >
            {scrollingLogos.map((tech, index) => (
              <div
                key={index}
                className="w-16 h-16 md:w-16 md:h-16 flex items-center justify-center"
              >
                <img
                  src={tech.logoUrl}
                  alt={tech.alt}
                  className="w-full h-full object-contain"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TechnologiesWeUse;