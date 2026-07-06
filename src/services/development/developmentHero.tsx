import React, { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import { Code, Zap, Star, CheckCircle } from "lucide-react";
import { TypewriterEffectSmooth } from "../../ui/typewriter_effect";


const DevelopmentHero: React.FC = () => {
  const [isMobile, setIsMobile] = useState(false);
  const iframeContainerRef = useRef<HTMLDivElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const typewriterWords = [
    {
      text: "Expert",
      className: "text-white"
    },
    {
      text: "Web",
      className: "text-carousel3"
    },
    {
      text: "Development",
      className: "text-carousel2"
    },
    {
      text: "Solutions",
      className: "text-white"
    }
  ];

  const features = [
    { icon: Code, label: "Custom Solutions" },
    { icon: Zap, label: "Fast Delivery" },
    { icon: CheckCircle, label: "Quality Assured" }
  ];

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 640);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    // Block all interactions with the iframe
    const container = iframeContainerRef.current;
    const iframe = iframeRef.current;

    const blockInteraction = (e: Event) => {
      e.preventDefault();
      e.stopPropagation();
      
      // Refresh iframe source to restart if paused
      if (iframe && iframe.src) {
        const currentSrc = iframe.src;
        iframe.src = '';
        setTimeout(() => {
          iframe.src = currentSrc;
        }, 50);
      }
    };

    if (container && iframe) {
      // Block mouse events
      container.addEventListener('click', blockInteraction, true);
      container.addEventListener('mousedown', blockInteraction, true);
      
      // Block touch events
      container.addEventListener('touchstart', blockInteraction, true);
      container.addEventListener('touchend', blockInteraction, true);
    }

    return () => {
      window.removeEventListener("resize", handleResize);
      if (container) {
        container.removeEventListener('click', blockInteraction, true);
        container.removeEventListener('mousedown', blockInteraction, true);
        container.removeEventListener('touchstart', blockInteraction, true);
        container.removeEventListener('touchend', blockInteraction, true);
      }
    };
  }, []);

  return (
    <div className="relative w-full min-h-screen overflow-hidden bg-bgColor">


      {/* Background video for desktop */}
      {!isMobile && (
        <div 
          className="absolute inset-0 z-0 opacity-50"
          ref={iframeContainerRef}
          style={{ pointerEvents: 'none' }}
        >
          <iframe
            ref={iframeRef}
            className="w-full h-full object-cover bg-bgColor"
            src="https://www.youtube.com/embed/rA7fwt-cBuc?autoplay=1&mute=1&loop=1&playlist=rA7fwt-cBuc&controls=0&rel=0&disablekb=1"
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            style={{ pointerEvents: 'none' }}
          />
        </div>
      )}
      
      <div className="relative z-10 max-w-full mx-auto min-h-screen flex flex-col justify-center px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-16 xl:gap-20 items-start lg:items-center backdrop-blur-xl p-11 rounded-2xl">
          {/* Left Content */}
          <div className="space-y-8 max-w-full lg:max-w-none order-2 lg:order-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center space-x-2 glass-eyebrow border border-gray-700/30 rounded-full px-6 py-3 mb-8">
                <Code className="w-5 h-5 text-gray-300" />
                <span className="text-sm font-medium text-gray-300">Web Development Excellence</span>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="w-full overflow-visible"
            >
              <div className="w-full max-w-full overflow-visible">
                <TypewriterEffectSmooth 
                  words={typewriterWords}
                  className="mb-6 w-full overflow-visible"
                  gradientColors={["#EABDE6", "#D69ADE", "#AA60C8", "#500073"]}
                  duration={3}
                />
              </div>
            </motion.div>

            <motion.p 
              className="text-xl text-gray-300 max-w-2xl leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              We design and build industry-leading digital experiences that engage your customers and drive sustainable business growth.
            </motion.p>

            {/* Feature highlights */}
            <motion.div 
              className="flex flex-wrap gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              {features.map((feature, index) => {
                const IconComponent = feature.icon;
                return (
                  <div key={index} className="flex items-center space-x-2 glass-chip border border-gray-700/30 rounded-full px-4 py-2 hover:bg-gray-700/50 hover:border-gray-600/50 transition-all duration-300">
                    <IconComponent className="w-4 h-4 text-gray-300" />
                    <span className="text-sm text-gray-300">{feature.label}</span>
                  </div>
                );
              })}
            </motion.div>

            {/* CTA buttons */}
            <motion.div 
              className="flex flex-col sm:flex-row gap-4 items-start sm:items-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              {/* <button 
                className="group px-8 py-4 bg-gradient-to-r from-carousel2 to-carousel1 text-white font-semibold rounded-xl hover:from-carousel1 hover:to-carousel3 transition-all duration-300 shadow-lg hover:shadow-carousel2/25 hover:scale-105"
                onClick={() => openConsultationEmail('Development', 'Hero')}
              >
                <span className="flex items-center space-x-2">
                  <span>Get Free Consultation</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </span>
              </button> */}
              
              <div className="flex items-center space-x-3">
                <div className="flex items-center space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-amber-400 fill-current" />
                  ))}
                </div>
                <span className="text-sm text-gray-300">
                  Rated 5.0 by 200+ clients
                </span>
              </div>
            </motion.div>
          </div>

          {/* Right Content - Stats Cards */}
          <motion.div 
            className="space-y-6 order-1 lg:order-2"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
          >
            <div className="grid grid-cols-2 gap-4">
              <div className="p-6 glass-panel border border-carousel2/30 rounded-2xl">
                <div className="text-3xl font-bold text-carousel2 mb-2">500+</div>
                <div className="text-sm text-gray-400">Projects Delivered</div>
              </div>
              <div className="p-6 glass-panel border border-carousel1/30 rounded-2xl">
                <div className="text-3xl font-bold text-carousel1 mb-2">99%</div>
                <div className="text-sm text-gray-400">Client Satisfaction</div>
              </div>
              <div className="p-6 glass-panel border border-carousel3/30 rounded-2xl">
                <div className="text-3xl font-bold text-carousel3 mb-2">24/7</div>
                <div className="text-sm text-gray-400">Support Available</div>
              </div>
              <div className="p-6 glass-panel border border-carousel2/30 rounded-2xl">
                <div className="text-3xl font-bold text-carousel2 mb-2">5+</div>
                <div className="text-sm text-gray-400">Years Experience</div>
              </div>
            </div>

            {/* Technology badges */}
            <div className="p-6 glass-section border border-gray-700/30 rounded-2xl">
              <h3 className="text-lg font-semibold text-white mb-4">Technologies We Master</h3>
              <div className="flex flex-wrap gap-2">
                {['React', 'Node.js', 'Next.js', 'TypeScript', 'Python', 'AWS'].map((tech, index) => (
                  <span key={index} className="px-3 py-1 bg-gray-800/50 border border-gray-700/50 rounded-full text-xs text-gray-300 hover:bg-gray-700/50 hover:border-gray-600/50 hover:text-white transition-all duration-300">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default DevelopmentHero;