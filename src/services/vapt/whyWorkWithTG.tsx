import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Shield, Clock, Users, Award, CheckCircle, Star } from 'lucide-react';
import { StreamlineThreatBrowser1 } from "../../icons/threat";
import { SecurityOprations } from "../../icons/securityOprations";
import { ProtectionIcon } from "../../icons/protectionIcon";

gsap.registerPlugin(ScrollTrigger);

interface SecurityBenefitProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  features: string[];
  index: number;
}

const SecurityBenefit: React.FC<SecurityBenefitProps> = ({ 
  icon, 
  title, 
  description, 
  features, 
  index 
}) => {
  const benefitRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!benefitRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(benefitRef.current, 
        { y: 60, opacity: 0, scale: 0.9 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.6,
          delay: index * 0.2,
          scrollTrigger: {
            trigger: benefitRef.current,
            start: "top 85%",
            toggleActions: "play none none none"
          }
        }
      );
    });

    return () => ctx.revert();
  }, [index]);

  return (
    <motion.div 
      ref={benefitRef}
      className="group p-8 bg-gradient-to-br from-gray-800/50 via-bgColor to-gray-800/50 backdrop-blur-sm border border-red-600/30 rounded-2xl hover:border-red-600/60 transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl hover:shadow-red-600/25"
      whileHover={{ y: -5 }}
    >
      <div className="text-center">
        {/* Icon */}
        <div className="w-20 h-20 bg-gray-800/70 border border-gray-700/50 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 group-hover:bg-gray-700/70 group-hover:border-red-600/50 transition-all duration-300">
          {icon}
        </div>

        {/* Title */}
        <h3 className="text-xl font-bold text-white mb-4 group-hover:text-red-400 transition-colors duration-300">
          {title}
        </h3>

        {/* Description */}
        <p className="text-gray-400 leading-relaxed mb-6 group-hover:text-gray-300 transition-colors duration-300">
          {description}
        </p>

        {/* Features */}
        <div className="space-y-3">
          {features.map((feature, featureIndex) => (
            <div key={featureIndex} className="flex items-center space-x-3">
              <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0" />
              <span className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors duration-300 text-left">
                {feature}
              </span>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

const WhyWorkWithUsSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const statsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(statsRef.current, 
        { y: 40, opacity: 0, scale: 0.9 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.6,
          stagger: 0.1,
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

  const securityBenefits = [
    {
      icon: <StreamlineThreatBrowser1 className="w-12 h-12 text-red-400 stroke-1 group-hover:text-white transition-colors duration-300" />,
      title: "24/7 Threat Defense",
      description: "Continuous threat detection and faster response with advanced threat intelligence and proactive threat hunting capabilities.",
      features: [
        "Real-time threat monitoring",
        "Advanced threat intelligence",
        "Proactive threat hunting",
        "Automated incident response"
      ]
    },
    {
      icon: <SecurityOprations className="w-12 h-12 text-red-400 stroke-1 group-hover:text-white transition-colors duration-300" />,
      title: "Simplified Security Operations",
      description: "Improve productivity and efficiency with integrated SIEM, SOAR, MDR and EDR capabilities in a single platform.",
      features: [
        "Unified security platform",
        "SIEM & SOAR integration",
        "MDR & EDR capabilities",
        "Streamlined workflows"
      ]
    },
    {
      icon: <ProtectionIcon className="w-12 h-12 text-red-400 stroke-1 group-hover:text-white transition-colors duration-300" />,
      title: "Comprehensive Protection",
      description: "Integrate existing security tools into a cohesive platform for better threat management and improved ROI.",
      features: [
        "Multi-layered security",
        "Tool integration & orchestration",
        "Better ROI on security investments",
        "Cohesive threat management"
      ]
    },
  ];

  const stats = [
    { icon: Shield, number: "500+", label: "Security Assessments Completed", color: "text-red-400" },
    { icon: Clock, number: "24/7", label: "Security Monitoring", color: "text-orange-400" },
    { icon: Users, number: "100+", label: "Enterprise Clients Protected", color: "text-red-400" },
    { icon: Award, number: "99.9%", label: "Threat Detection Accuracy", color: "text-orange-400" }
  ];

  return (
    <section ref={sectionRef} className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-bgColor via-gray-900/20 to-bgColor relative">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-red-900/5 via-transparent to-transparent"></div>
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-br from-red-600/10 to-orange-600/10 rounded-full filter blur-3xl opacity-30"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-orange-600/10 to-red-600/10 rounded-full filter blur-3xl opacity-30"></div>
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
            <div className="inline-flex items-center space-x-2 bg-gray-800/30 backdrop-blur-sm border border-red-600/30 rounded-full px-6 py-3 mb-8">
              <Shield className="w-5 h-5 text-red-400" />
              <span className="text-sm font-medium text-gray-300">Why Choose Us</span>
            </div>
          </motion.div>

          <motion.h2 
            className="text-4xl lg:text-5xl font-bold text-white mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Why Work With
            <span className="text-red-400 block">
              Tech Giant Security?
            </span>
          </motion.h2>

          <motion.p 
            className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
          >
            Experience the difference with our proven cybersecurity expertise, cutting-edge technology, and commitment to protecting your digital assets.
          </motion.p>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, index) => {
            const IconComponent = stat.icon;
            return (
              <motion.div
                key={index}
                ref={el => statsRef.current[index] = el}
                className="text-center p-6 bg-gradient-to-br from-gray-800/50 via-bgColor to-gray-800/50 backdrop-blur-sm border border-red-600/30 rounded-2xl hover:border-red-600/60 hover:scale-105 transition-all duration-300"
                whileHover={{ y: -5 }}
              >
                <div className="w-12 h-12 bg-gray-800/70 border border-gray-700/50 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <IconComponent className={`w-6 h-6 ${stat.color}`} />
                </div>
                <div className={`text-3xl font-bold ${stat.color} mb-2`}>{stat.number}</div>
                <div className="text-sm text-gray-400">{stat.label}</div>
              </motion.div>
            );
          })}
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {securityBenefits.map((benefit, index) => (
            <SecurityBenefit
              key={index}
              icon={benefit.icon}
              title={benefit.title}
              description={benefit.description}
              features={benefit.features}
              index={index}
            />
          ))}
        </div>

        {/* Client Testimonial Section */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="p-8 bg-gradient-to-br from-gray-800/30 via-bgColor to-gray-800/30 backdrop-blur-sm border border-red-600/20 rounded-2xl max-w-4xl mx-auto">
            <div className="flex justify-center mb-4">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-6 h-6 text-yellow-400 fill-current" />
              ))}
            </div>
            <blockquote className="text-xl text-gray-300 leading-relaxed mb-6">
              "Tech Giant's VAPT services helped us identify critical vulnerabilities and strengthen our security posture. Their 24/7 monitoring gives us peace of mind knowing our systems are protected."
            </blockquote>
            <div className="text-white font-semibold">Chief Technology Officer</div>
            <div className="text-gray-400 text-sm">Fortune 500 Financial Services Company</div>
          </div>
        </motion.div>

        {/* Final CTA */}
        <motion.div 
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="p-8 bg-gradient-to-br from-gray-800/30 via-bgColor to-gray-800/30 backdrop-blur-sm border border-red-600/20 rounded-2xl">
            <h3 className="text-3xl font-bold text-white mb-4">
              Experience Enterprise-Grade Security
            </h3>
            <p className="text-gray-300 max-w-2xl mx-auto text-lg">
              Join hundreds of organizations who trust Tech Giant to protect their digital infrastructure.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default WhyWorkWithUsSection;