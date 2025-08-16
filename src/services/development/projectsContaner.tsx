import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight, ExternalLink, Rocket, Eye } from "lucide-react";
import { openConsultationEmail } from "../../utils/emailUtils";
import DevProjectScreen from "../development/devProjectScreen";
import { VIDEO_URLS } from "../../constants/mediaUrls";

gsap.registerPlugin(ScrollTrigger);

// Reusable section component
interface ProjectSectionProps {
  title: string;
  description: string;
  videoSrc: string;
  reverse?: boolean;
  href?: string;
  directProjectLink?: string;
  index: number;
}

const ProjectSection: React.FC<ProjectSectionProps> = ({
  title,
  description,
  videoSrc,
  reverse = false,
  href,
  index,
}) => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(sectionRef.current, 
        { y: 100, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            toggleActions: "play none none none"
          }
        }
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <motion.div 
      ref={sectionRef}
      className="w-full max-w-7xl mx-auto"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: index * 0.2 }}
      viewport={{ once: true }}
    >
      <div className="p-8 bg-gradient-to-br from-gray-800/30 via-bgColor to-gray-800/30 backdrop-blur-sm border border-carousel2/20 rounded-3xl hover:border-carousel2/40 transition-all duration-500 hover:shadow-2xl hover:shadow-carousel2/25 min-h-[500px]">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {reverse ? (
            <>
              {/* Video First (Left Side) */}
              <motion.div 
                className="flex items-center justify-center h-full"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <div className="w-full relative group">
                  <div className="absolute -inset-4 bg-gradient-to-r from-carousel2/20 to-carousel1/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="relative bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-carousel2/30 rounded-2xl overflow-hidden shadow-2xl">
                    <DevProjectScreen src={videoSrc} />
                    <div className="absolute inset-0 bg-gradient-to-t from-bgColor/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                </div>
              </motion.div>

              {/* Content Second (Right Side) */}
              <motion.div 
                className="flex flex-col justify-center space-y-6 h-full"
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                viewport={{ once: true }}
              >
                {/* Project Badge */}
                <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-carousel2/20 to-carousel1/20 backdrop-blur-sm border border-carousel2/30 rounded-full px-4 py-2 w-fit">
                  <Rocket className="w-4 h-4 text-carousel2" />
                  <span className="text-sm font-medium text-gray-300">Featured Project</span>
                </div>

                {/* Title */}
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight">
                  {title}
                </h2>

                {/* Description */}
                <p className="text-gray-400 text-lg leading-relaxed">
                  {description}
                </p>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-carousel2 to-carousel1 text-white font-semibold rounded-xl hover:from-carousel1 hover:to-carousel3 transition-all duration-300 shadow-lg hover:shadow-carousel2/25 hover:scale-105"
                  >
                    <Eye className="w-5 h-5 mr-2" />
                    <span>View Live Project</span>
                    <ExternalLink className="w-4 h-4 ml-2 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </a>

                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center justify-center px-6 py-3 border border-carousel2/50 text-white font-semibold rounded-xl hover:bg-carousel2/10 transition-all duration-300 backdrop-blur-sm"
                  >
                    <span>Learn More</span>
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </a>
                </div>

                {/* Project Stats */}
                <div className="grid grid-cols-3 gap-4 pt-6 border-t border-carousel2/20">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-carousel2 mb-1">100%</div>
                    <div className="text-xs text-gray-500">Performance</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-carousel2 mb-1">Mobile</div>
                    <div className="text-xs text-gray-500">Responsive</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-carousel2 mb-1">SEO</div>
                    <div className="text-xs text-gray-500">Optimized</div>
                  </div>
                </div>
              </motion.div>
            </>
          ) : (
            <>
              {/* Content First (Left Side) */}
              <motion.div 
                className="flex flex-col justify-center space-y-6 h-full"
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                viewport={{ once: true }}
              >
                {/* Project Badge */}
                <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-carousel2/20 to-carousel1/20 backdrop-blur-sm border border-carousel2/30 rounded-full px-4 py-2 w-fit">
                  <Rocket className="w-4 h-4 text-carousel2" />
                  <span className="text-sm font-medium text-gray-300">Featured Project</span>
                </div>

                {/* Title */}
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight">
                  {title}
                </h2>

                {/* Description */}
                <p className="text-gray-400 text-lg leading-relaxed">
                  {description}
                </p>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-carousel2 to-carousel1 text-white font-semibold rounded-xl hover:from-carousel1 hover:to-carousel3 transition-all duration-300 shadow-lg hover:shadow-carousel2/25 hover:scale-105"
                  >
                    <Eye className="w-5 h-5 mr-2" />
                    <span>View Live Project</span>
                    <ExternalLink className="w-4 h-4 ml-2 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </a>

                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center justify-center px-6 py-3 border border-carousel2/50 text-white font-semibold rounded-xl hover:bg-carousel2/10 transition-all duration-300 backdrop-blur-sm"
                  >
                    <span>Learn More</span>
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </a>
                </div>

                {/* Project Stats */}
                <div className="grid grid-cols-3 gap-4 pt-6 border-t border-carousel2/20">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-carousel2 mb-1">100%</div>
                    <div className="text-xs text-gray-500">Performance</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-carousel2 mb-1">Mobile</div>
                    <div className="text-xs text-gray-500">Responsive</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-carousel2 mb-1">SEO</div>
                    <div className="text-xs text-gray-500">Optimized</div>
                  </div>
                </div>
              </motion.div>

              {/* Video Second (Right Side) */}
              <motion.div 
                className="flex items-center justify-center h-full"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <div className="w-full relative group">
                  <div className="absolute -inset-4 bg-gradient-to-r from-carousel2/20 to-carousel1/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="relative bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-carousel2/30 rounded-2xl overflow-hidden shadow-2xl">
                    <DevProjectScreen src={videoSrc} />
                    <div className="absolute inset-0 bg-gradient-to-t from-bgColor/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                </div>
              </motion.div>
            </>
          )}
        </div>
      </div>
    </motion.div>
  );
};

const ProjectsContaner = () => {
  const sectionRef = useRef<HTMLElement>(null);

  const projects = [
    {
      title: "Forest Herbs – Pure Natural Wellness",
      description: "At Tech Giant, we take pride in creating ventures that promote holistic well-being, and The Forest Herbs is a testament to that vision. This e-commerce platform delivers 100% pure, chemical-free, and preservative-free natural products, crafted with utmost care to preserve nature's authenticity.",
      videoSrc: VIDEO_URLS.forestHearbs,
      reverse: false,
      href: "https://theforestherbs.com/",
      directProjectLink: "Forest Herbs"
    },
    {
      title: "Falahzar – Elevating Retail Experiences",
      description: "At Tech Giant, we believe in creating ventures that elevate everyday experiences, and Falahzar stands as a shining example of our commitment to quality, diversity, and customer satisfaction. This comprehensive retail platform offers a curated selection of high-quality products paired with exceptional service.",
      videoSrc: VIDEO_URLS.falahzar,
      reverse: true,
      href: "https://falahzar.com/",
      directProjectLink: "Falahzar"
    },
    {
      title: "Influx – Digital Growth Redefined",
      description: "Influx is a full-service digital agency dedicated to helping businesses thrive in the online landscape. From stunning web design to data-driven marketing strategies, we provide end-to-end digital solutions tailored to elevate brands, drive engagement, and maximize ROI.",
      videoSrc: VIDEO_URLS.influx,
      reverse: false,
      href: "https://www.influxmarketing.com/",
      directProjectLink: "Influx Marketing"
    },
    {
      title: "Prayas – Empowering Financial Inclusion",
      description: "Prayas Financial Services Pvt Ltd (PFSPL) is a Reserve Bank of India (RBI)-registered Non-Banking Finance Company (NBFC – MFI) committed to fostering financial inclusion for underserved households and informal micro-enterprises, providing tailored financial solutions for sustainable growth.",
      videoSrc: VIDEO_URLS.prayas,
      reverse: true,
      href: "https://prayasfinance.com/",
      directProjectLink: "Prayas"
    }
  ];

  return (
    <section ref={sectionRef} className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-bgColor via-gray-900/20 to-bgColor relative">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-carousel2/5 via-transparent to-transparent"></div>
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-gradient-to-br from-carousel2/10 to-carousel3/10 rounded-full filter blur-3xl opacity-30"></div>
        <div className="absolute -bottom-40 -right-40 w-80 h-80 bg-gradient-to-br from-carousel3/10 to-carousel1/10 rounded-full filter blur-3xl opacity-30"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-carousel2/20 to-carousel3/20 backdrop-blur-sm border border-carousel2/30 rounded-full px-6 py-3 mb-8">
              <Rocket className="w-5 h-5 text-carousel2" />
              <span className="text-sm font-medium text-gray-300">Our Portfolio</span>
            </div>
          </motion.div>

          <motion.h2 
            className="text-4xl lg:text-6xl font-bold text-white mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Featured
            <span className="text-cyan-400 block">
              Success Stories
            </span>
          </motion.h2>

          <motion.p 
            className="text-xl text-gray-300 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
          >
            Discover how we've helped businesses transform their digital presence and achieve remarkable growth through innovative web solutions.
          </motion.p>
        </div>

        {/* Projects Grid */}
        <div className="space-y-20">
          {projects.map((project, index) => (
            <ProjectSection
              key={index}
              title={project.title}
              description={project.description}
              videoSrc={project.videoSrc}
              reverse={project.reverse}
              href={project.href}
              directProjectLink={project.directProjectLink}
              index={index}
            />
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div 
          className="mt-20 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="p-8 bg-gradient-to-br from-gray-800/30 via-bgColor to-gray-800/30 backdrop-blur-sm border border-carousel2/20 rounded-2xl">
            <h3 className="text-3xl font-bold text-white mb-4">
              Ready to Build Your Success Story?
            </h3>
            <p className="text-gray-300 mb-8 max-w-2xl mx-auto text-lg">
              Join our portfolio of successful clients and let us help you create a digital solution that drives real results.
            </p>
            <button 
              className="px-8 py-4 bg-gradient-to-r from-carousel2 to-carousel3 text-white font-semibold rounded-xl hover:from-carousel3 hover:to-carousel1 transition-all duration-300 shadow-lg hover:shadow-carousel2/25 hover:scale-105"
              onClick={() => openConsultationEmail('Development', 'Projects')}
            >
              <span className="flex items-center space-x-2">
                <span>Start Your Project</span>
                <ArrowRight className="w-5 h-5" />
              </span>
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ProjectsContaner;