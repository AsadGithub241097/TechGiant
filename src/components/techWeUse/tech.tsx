import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

interface TechnologyLogo {
  name: string;
  logoUrl: string;
  alt: string;
  category?: string;
  description?: string;
}

const TechnologiesWeUse: React.FC = () => {
  const marqueeRef = useRef<HTMLDivElement>(null);
  const marqueeContentRef = useRef<HTMLDivElement>(null);
  const [hoveredTech, setHoveredTech] = useState<string | null>(null);

  const technologies: TechnologyLogo[] = [
    {
      name: "React",
      logoUrl:
        "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
      alt: "React logo",
      category: "Frontend",
      description: "Modern UI Library"
    },
    {
      name: "JavaScript",
      logoUrl:
        "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
      alt: "JavaScript logo",
      category: "Language",
      description: "Dynamic Programming"
    },
    {
      name: "TypeScript",
      logoUrl:
        "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
      alt: "TypeScript logo",
      category: "Language",
      description: "Type-Safe JS"
    },
    {
      name: "Node.js",
      logoUrl:
        "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
      alt: "Node.js logo",
      category: "Backend",
      description: "Server Runtime"
    },
    {
      name: "Tailwind CSS",
      logoUrl:
        "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg",
      alt: "Tailwind CSS logo",
      category: "Styling",
      description: "Utility-First CSS"
    },
    {
      name: "MySQL",
      logoUrl:
        "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg",
      alt: "MySQL logo",
      category: "Database",
      description: "Relational Database"
    },
    {
      name: "PHP",
      logoUrl:
        "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg",
      alt: "PHP logo",
      category: "Backend",
      description: "Server-Side Language"
    },
    {
      name: "WordPress",
      logoUrl:
        "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/wordpress/wordpress-plain.svg",
      alt: "WordPress logo",
      category: "CMS",
      description: "Content Management"
    },
    {
      name: "CSS3",
      logoUrl:
        "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg",
      alt: "CSS3 logo",
      category: "Styling",
      description: "Modern Styling"
    },
    {
      name: "HTML5",
      logoUrl:
        "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg",
      alt: "HTML5 logo",
      category: "Markup",
      description: "Web Structure"
    },
  ];

  // Duplicate logos for infinite seamless scrolling effect
  const scrollingLogos = [...technologies, ...technologies];

  useEffect(() => {
    if (marqueeRef.current && marqueeContentRef.current) {
      // Calculate the exact width of one set of logos (non-duplicated)
      const itemWidth = 96 + 48; // w-24 (96px) + gap-12 (48px) for md screens
      const singleSetWidth = technologies.length * itemWidth;
      const duration = singleSetWidth / 40; // Slower, more elegant speed
  
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
  }, [technologies.length]);
  

  return (
    <div className="w-full py-16 sm:py-24 bg-gradient-to-b from-bgColor via-gray-900/50 to-bgColor overflow-hidden relative">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-carousel2/5 via-transparent to-transparent"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Modern heading section */}
        <div className="relative z-10 text-center mb-16">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white flex justify-center items-center pb-4 gap-[1rem] font-sans">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-carousel3 to-carousel2 animate-pulse">
              Technologies
            </span>
            <span className="text-white">
              We Use
            </span>
          </h1>
          <p className="text-gray-400 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
            Cutting-edge tools and frameworks that power our innovative solutions
          </p>
          
          {/* Decorative line */}
          <div className="mt-8 mx-auto w-24 h-1 bg-gradient-to-r from-carousel2 to-carousel1 rounded-full"></div>
        </div>

        {/* Modern marquee container */}
        <div className="relative z-10">
          <div ref={marqueeRef} className="relative w-full overflow-hidden bg-gradient-to-r from-gray-900/20 via-gray-800/30 to-gray-900/20 rounded-2xl border border-carousel2/20 backdrop-blur-sm py-8">
            {/* Enhanced gradient masks */}
            <div className="absolute left-0 top-0 h-full w-32 bg-gradient-to-r from-gray-900 via-gray-900/80 to-transparent z-10 pointer-events-none"></div>
            <div className="absolute right-0 top-0 h-full w-32 bg-gradient-to-l from-gray-900 via-gray-900/80 to-transparent z-10 pointer-events-none"></div>

            <div
              ref={marqueeContentRef}
              className="flex gap-12 md:gap-16 whitespace-nowrap w-max px-8"
              style={{ willChange: 'transform' }} 
            >
              {scrollingLogos.map((tech, index) => (
                <div
                  key={index}
                  className="group relative flex flex-col items-center justify-center cursor-pointer"
                  onMouseEnter={() => setHoveredTech(tech.name)}
                  onMouseLeave={() => setHoveredTech(null)}
                >
                  {/* Modern tech card */}
                  <div className="relative w-20 h-20 md:w-24 md:h-24 bg-gradient-to-br from-gray-800/50 via-bgColor to-gray-800/50 rounded-2xl border border-carousel2/30 group-hover:border-carousel2/60 transition-all duration-300 group-hover:scale-110 group-hover:shadow-2xl group-hover:shadow-carousel2/25 backdrop-blur-sm">
                    {/* Glow effect */}
                    <div className="absolute inset-0 bg-gradient-to-br from-carousel2/10 via-transparent to-carousel1/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"></div>
                    
                    {/* Logo container */}
                    <div className="relative z-10 w-full h-full flex items-center justify-center p-3">
                      <img
                        src={tech.logoUrl}
                        alt={tech.alt}
                        className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-300 filter group-hover:drop-shadow-lg"
                      />
                    </div>

                    {/* Animated border */}
                    <div className="absolute inset-0 rounded-2xl border-2 border-carousel2/30 opacity-0 group-hover:opacity-100 group-hover:animate-pulse transition-opacity duration-300"></div>
                  </div>

                  {/* Tech info tooltip */}
                  <div className={`absolute -bottom-16 left-1/2 transform -translate-x-1/2 bg-gray-900/95 backdrop-blur-md border border-carousel2/40 rounded-lg px-3 py-2 text-center transition-all duration-300 ${
                    hoveredTech === tech.name ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
                  }`}>
                    <p className="text-white text-sm font-semibold">{tech.name}</p>
                    <p className="text-carousel3 text-xs">{tech.category}</p>
                    <p className="text-gray-400 text-xs">{tech.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom stats or additional info */}
          <div className="mt-12 text-center">
            <p className="text-gray-500 text-sm">
              <span className="text-carousel2 font-semibold">{technologies.length}+</span> Modern Technologies
              <span className="mx-4">•</span>
              <span className="text-carousel2 font-semibold">100%</span> Industry Standard
              <span className="mx-4">•</span>
              <span className="text-carousel2 font-semibold">Always</span> Up-to-Date
            </p>
          </div>
        </div>
      </div>

      {/* Bottom gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-bgColor to-transparent"></div>
    </div>
  );
};

export default TechnologiesWeUse;