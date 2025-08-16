import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Shield, Lock, Eye, AlertTriangle, CheckCircle, ArrowRight } from 'lucide-react';
import { IMAGE_URLS } from "../../constants/mediaUrls";
import { LoadingImage } from "../../components/ui/LoadingImage";
import { openConsultationEmail } from "../../utils/emailUtils";

gsap.registerPlugin(ScrollTrigger);

const TGCyberDefense = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(cardsRef.current, 
        { y: 60, opacity: 0, scale: 0.9 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.6,
          stagger: 0.2,
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

  const securityServices = [
    {
      icon: Shield,
      title: "Vulnerability Assessment",
      description: "Comprehensive scanning and analysis of your systems to identify security weaknesses before attackers can exploit them.",
      features: ["Network Scanning", "Web Application Testing", "Database Security", "Cloud Infrastructure"]
    },
    {
      icon: Eye,
      title: "Penetration Testing",
      description: "Ethical hacking simulations to test your defenses and validate the security posture of your digital assets.",
      features: ["External Testing", "Internal Testing", "Wireless Security", "Social Engineering"]
    },
    {
      icon: Lock,
      title: "Security Operations Center",
      description: "24/7 monitoring and incident response capabilities with AI-driven threat detection and automated response systems.",
      features: ["Real-time Monitoring", "Incident Response", "Threat Intelligence", "Compliance Reporting"]
    },
    {
      icon: AlertTriangle,
      title: "Risk Management",
      description: "Strategic cybersecurity consulting to develop comprehensive security frameworks aligned with business objectives.",
      features: ["Risk Assessment", "Security Strategy", "Compliance Audit", "Security Training"]
    }
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
              <span className="text-sm font-medium text-gray-300">What We Do</span>
            </div>
          </motion.div>

          <motion.h2 
            className="text-4xl lg:text-5xl font-bold text-white mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Build Adaptive & Scalable
            <span className="text-red-400 block">
              Cyber Defense Solutions
            </span>
          </motion.h2>

          <motion.p 
            className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
          >
            Tech Giant Security Operations and Response Services offer businesses a flexible, modular and open approach to streamline and strengthen their cybersecurity capabilities. Powered by AI and automation, our comprehensive cyber resilience services help you anticipate, protect against, withstand, and recover from cyber threats.
          </motion.p>
        </div>

        {/* Two Column Layout */}
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
          {/* Left: Image */}
          <motion.div
            className="relative order-2 lg:order-1"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-red-600/20">
              <LoadingImage
                src={IMAGE_URLS.vaptBg}
                alt="Cybersecurity operations"
                className="w-full h-[400px] object-cover"
                skeletonClassName="w-full h-[400px]"
                aspectRatio="aspect-auto"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-bgColor/50 via-transparent to-transparent"></div>
              
              {/* Overlay stats */}
              <div className="absolute bottom-6 left-6 right-6">
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-red-400">500+</div>
                    <div className="text-xs text-gray-300">Assessments</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-orange-400">24/7</div>
                    <div className="text-xs text-gray-300">Monitoring</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-red-400">99.9%</div>
                    <div className="text-xs text-gray-300">Uptime</div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right: Content */}
          <motion.div 
            className="space-y-6 order-1 lg:order-2"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-bold text-white mb-4">
              Advanced Threat Protection
            </h3>
            <p className="text-gray-300 leading-relaxed">
              Our cybersecurity experts leverage cutting-edge AI and machine learning technologies to provide real-time threat detection, automated incident response, and comprehensive security monitoring. We help organizations build resilient security postures that adapt to evolving threat landscapes.
            </p>

            <div className="space-y-3">
              {[
                "AI-powered threat detection and response",
                "Comprehensive vulnerability management",
                "24/7 security operations center monitoring",
                "Incident response and digital forensics",
                "Compliance and regulatory reporting"
              ].map((feature, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                  <span className="text-gray-300">{feature}</span>
                </div>
              ))}
            </div>

            <button 
              className="group px-6 py-3 bg-gradient-to-r from-red-600 to-orange-600 text-white font-semibold rounded-xl hover:from-red-500 hover:to-orange-500 transition-all duration-300 shadow-lg hover:shadow-red-600/25 hover:scale-105"
              onClick={() => openConsultationEmail('VAPT', 'Overview')}
            >
              <span className="flex items-center space-x-2">
                <span>Learn More</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </span>
            </button>
          </motion.div>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {securityServices.map((service, index) => {
            const IconComponent = service.icon;
            return (
              <motion.div
                key={index}
                ref={el => cardsRef.current[index] = el}
                className="group relative p-6 bg-gradient-to-br from-gray-800/50 via-bgColor to-gray-800/50 backdrop-blur-sm border border-red-600/30 rounded-2xl hover:border-red-600/60 transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl hover:shadow-red-600/25"
                whileHover={{ y: -5 }}
              >
                <div className="relative">
                  <div className="w-14 h-14 bg-gray-800/70 border border-gray-700/50 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-gray-700/70 group-hover:border-red-600/50 transition-all duration-300">
                    <IconComponent className="w-7 h-7 text-red-400 group-hover:text-white transition-colors duration-300" />
                  </div>
                  
                  <h3 className="text-lg font-bold text-white mb-3 group-hover:text-red-400 transition-colors duration-300">
                    {service.title}
                  </h3>
                  
                  <p className="text-gray-400 text-sm leading-relaxed mb-4 group-hover:text-gray-300 transition-colors duration-300">
                    {service.description}
                  </p>

                  <div className="space-y-2">
                    {service.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-center space-x-2">
                        <div className="w-1.5 h-1.5 bg-red-400 rounded-full"></div>
                        <span className="text-xs text-gray-400 group-hover:text-gray-300 transition-colors duration-300">
                          {feature}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom CTA Section */}
        <motion.div 
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="p-8 bg-gradient-to-br from-gray-800/30 via-bgColor to-gray-800/30 backdrop-blur-sm border border-red-600/20 rounded-2xl">
            <h3 className="text-2xl font-bold text-white mb-4">
              Ready to Strengthen Your Cyber Resilience?
            </h3>
            <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
              Get a comprehensive security assessment and discover how our VAPT services can protect your digital assets.
            </p>
            <button 
              className="px-8 py-4 bg-gradient-to-r from-red-600 to-orange-600 text-white font-semibold rounded-xl hover:from-red-500 hover:to-orange-500 transition-all duration-300 shadow-lg hover:shadow-red-600/25 hover:scale-105"
              onClick={() => openConsultationEmail('VAPT', 'CTA')}
            >
              <span className="flex items-center space-x-2">
                <span>Get Free Security Consultation</span>
                <ArrowRight className="w-5 h-5" />
              </span>
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TGCyberDefense;