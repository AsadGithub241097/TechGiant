import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Lightbulb, Settings, Palette, Code, Rocket, ArrowRight } from "lucide-react";
import { openConsultationEmail } from "../../utils/emailUtils";

gsap.registerPlugin(ScrollTrigger);

interface ProcessStepProps {
  number: string;
  title: string;
  description: string;
  isActive: boolean;
  onHover: () => void;
  icon: React.ElementType;
  color: string;
}

const ProcessStep: React.FC<ProcessStepProps> = ({
  number,
  title,
  description,
  isActive,
  onHover,
  icon: IconComponent,
  color,
}) => {
  return (
    <motion.div 
      className="group relative cursor-pointer"
      onMouseEnter={onHover}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
    >
      <div className={`p-6 bg-gradient-to-br from-gray-800/50 via-bgColor to-gray-800/50 backdrop-blur-sm border rounded-2xl transition-all duration-500 ${
        isActive 
          ? 'border-carousel2/60 shadow-2xl shadow-carousel2/25' 
          : 'border-carousel2/30 hover:border-carousel2/50'
      }`}>
        {/* Icon and Number */}
        <div className="flex items-center space-x-4 mb-4">
          <div className={`w-12 h-12 bg-gray-800/70 border border-gray-700/50 rounded-xl flex items-center justify-center transition-all duration-300 ${
            isActive ? 'scale-110 bg-gray-700/70 border-gray-600/50' : 'group-hover:scale-105 group-hover:bg-gray-700/70 group-hover:border-gray-600/50'
          }`}>
            <IconComponent className={`w-6 h-6 ${color} ${isActive ? 'text-white' : 'group-hover:text-white'} transition-colors duration-300`} />
          </div>
          <div className={`text-3xl font-bold transition-colors duration-300 ${
            isActive ? "text-carousel2" : "text-white group-hover:text-carousel2"
          }`}>
            {number}
          </div>
        </div>

        {/* Title */}
        <h3 className={`text-lg font-semibold mb-3 transition-colors duration-300 ${
          isActive ? "text-white" : "text-gray-300 group-hover:text-white"
        }`}>
          {title}
        </h3>

        {/* Description */}
        <motion.div
          initial={{ height: isActive ? 'auto' : 0, opacity: isActive ? 1 : 0 }}
          animate={{ 
            height: isActive ? 'auto' : 0, 
            opacity: isActive ? 1 : 0 
          }}
          transition={{ duration: 0.3 }}
          className="overflow-hidden"
        >
          <p className="text-gray-400 text-sm leading-relaxed">
            {description}
          </p>
        </motion.div>

        {/* Active indicator */}
        {isActive && (
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: '100%' }}
            transition={{ duration: 0.5 }}
            className="absolute top-0 left-0 h-(0.9 rem) bg-gradient-to-r from-carousel2 to-carousel1 rounded-t-3xl"
          />
        )}
      </div>
    </motion.div>
  );
};

const WebDevelopmentProcess: React.FC = () => {
  const [activeStep, setActiveStep] = useState<number | null>(0);
  const sectionRef = useRef<HTMLElement>(null);
  const stepsRef = useRef<(HTMLDivElement | null)[]>([]);
  
  const steps = [
    {
      number: "01",
      title: "Consult Your Idea",
      description: "Set the right direction with our web development consultants and strategic planning.",
      icon: Lightbulb,
      color: "text-gray-300"
    },
    {
      number: "02",
      title: "Choose Technology",
      description: "Together, we'll decide on the tech stack and the overall approach for your project.",
      icon: Settings,
      color: "text-gray-300"
    },
    {
      number: "03",
      title: "Design & Prototype",
      description: "Create intuitive and engaging user interfaces and experiences that users love.",
      icon: Palette,
      color: "text-gray-300"
    },
    {
      number: "04",
      title: "Develop & Build",
      description: "Build robust, scalable, and high-performance web applications with clean code.",
      icon: Code,
      color: "text-gray-300"
    },
    {
      number: "05",
      title: "Launch & Optimize",
      description: "Launch and optimize your product for maximum market impact and user engagement.",
      icon: Rocket,
      color: "text-gray-300"
    },
  ];

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(stepsRef.current, 
        { y: 80, opacity: 0, scale: 0.8 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.6,
          stagger: 0.15,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
            toggleActions: "play none none none"
          }
        }
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-bgColor via-gray-900/20 to-bgColor relative">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-carousel3/5 via-transparent to-transparent"></div>
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-gradient-to-br from-carousel3/10 to-carousel1/10 rounded-full filter blur-3xl opacity-30"></div>
        <div className="absolute -bottom-40 -right-40 w-80 h-80 bg-gradient-to-br from-carousel1/10 to-carousel2/10 rounded-full filter blur-3xl opacity-30"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-carousel3/20 to-carousel2/20 backdrop-blur-sm border border-carousel3/30 rounded-full px-6 py-3 mb-8">
              <Settings className="w-5 h-5 text-carousel3" />
              <span className="text-sm font-medium text-gray-300">Our Process</span>
            </div>
          </motion.div>

          <motion.h2 
            className="text-4xl lg:text-5xl font-bold text-white mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Leverage Our Proven
            <span className="text-purple-400 block">
              Web Development Process
            </span>
          </motion.h2>

          <motion.p 
            className="text-xl text-gray-300 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
          >
            From initial consultation to final launch, our structured approach ensures your project's success at every stage.
          </motion.p>
        </div>

        {/* Process Steps */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-16">
          {steps.map((step, index) => (
            <div
              key={index}
              ref={el => stepsRef.current[index] = el}
            >
              <ProcessStep
                number={step.number}
                title={step.title}
                description={step.description}
                isActive={activeStep === index}
                onHover={() => setActiveStep(index)}
                icon={step.icon}
                color={step.color}
              />
            </div>
          ))}
        </div>

        {/* Process Flow Visualization */}
        <motion.div 
          className="flex items-center justify-center space-x-4 mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
        >
          {steps.map((_, index) => (
            <React.Fragment key={index}>
              <div className={`w-4 h-4 rounded-full transition-all duration-300 ${
                index <= (activeStep || 0) ? 'bg-carousel2' : 'bg-gray-600'
              }`} />
              {index < steps.length - 1 && (
                <ArrowRight className={`w-5 h-5 transition-colors duration-300 ${
                  index < (activeStep || 0) ? 'text-carousel2' : 'text-gray-600'
                }`} />
              )}
            </React.Fragment>
          ))}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div 
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="p-8 bg-gradient-to-br from-gray-800/30 via-bgColor to-gray-800/30 backdrop-blur-sm border border-carousel3/20 rounded-2xl">
            <h3 className="text-2xl font-bold text-white mb-4">
              Ready to Start Your Development Journey?
            </h3>
            <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
              Let's discuss your project requirements and create a roadmap for success.
            </p>
            <button 
              className="px-8 py-4 bg-gradient-to-r from-carousel3 to-carousel2 text-white font-semibold rounded-xl hover:from-carousel2 hover:to-carousel1 transition-all duration-300 shadow-lg hover:shadow-carousel3/25 hover:scale-105"
              onClick={() => openConsultationEmail('Development', 'Process')}
            >
              Start Your Project
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default WebDevelopmentProcess;