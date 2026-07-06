import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Shield, Server, AlertCircle, FileSearch, CheckCircle } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface SecurityCardProps {
  title: string;
  description: string;
  icon: React.ElementType;
  features: string[];
  index: number;
}

const SecurityCard: React.FC<SecurityCardProps> = ({
  title,
  description,
  icon: IconComponent,
  features,
  index 
}) => {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!cardRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(cardRef.current, 
        { y: 80, opacity: 0, scale: 0.9 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.8,
          delay: index * 0.2,
          scrollTrigger: {
            trigger: cardRef.current,
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
      ref={cardRef}
      className="group bg-gradient-to-br from-gray-800/50 via-bgColor to-gray-800/50 backdrop-blur-sm border border-red-600/30 rounded-2xl p-8 hover:border-red-600/60 transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl hover:shadow-red-600/25"
      whileHover={{ y: -5 }}
    >
      {/* Icon and Title */}
      <div className="flex items-start space-x-4 mb-6">
        <div className="w-16 h-16 bg-gray-800/70 border border-gray-700/50 rounded-xl flex items-center justify-center group-hover:scale-110 group-hover:bg-gray-700/70 group-hover:border-red-600/50 transition-all duration-300">
          <IconComponent className="w-8 h-8 text-red-400 group-hover:text-white transition-colors duration-300" />
        </div>
        <div className="flex-1">
          <h3 className="text-xl font-bold text-white mb-2 group-hover:text-red-400 transition-colors duration-300">
            {title}
          </h3>
        </div>
      </div>

      {/* AI Doodle Illustration */}
      <div className="relative rounded-xl overflow-hidden mb-6 bg-gray-900/50 p-6">
        <div className="w-full h-48 flex items-center justify-center">
          {title === "Security Operations Center" && (
            <svg viewBox="0 0 300 200" className="w-full h-full">
              <defs>
                <linearGradient id="socGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#ef4444" />
                  <stop offset="100%" stopColor="#f97316" />
                </linearGradient>
              </defs>
              {/* Monitor screens */}
              <rect x="20" y="40" width="80" height="50" rx="8" fill="none" stroke="url(#socGradient)" strokeWidth="2" strokeDasharray="5,5" />
              <rect x="120" y="30" width="90" height="60" rx="8" fill="none" stroke="url(#socGradient)" strokeWidth="2" strokeDasharray="5,5" />
              <rect x="230" y="45" width="70" height="45" rx="8" fill="none" stroke="url(#socGradient)" strokeWidth="2" strokeDasharray="5,5" />
              {/* Screen content lines */}
              <line x1="30" y1="50" x2="90" y2="50" stroke="#ef4444" strokeWidth="1.5" opacity="0.7" />
              <line x1="30" y1="60" x2="80" y2="60" stroke="#f97316" strokeWidth="1.5" opacity="0.7" />
              <line x1="130" y1="45" x2="190" y2="45" stroke="#ef4444" strokeWidth="1.5" opacity="0.7" />
              <line x1="130" y1="55" x2="200" y2="55" stroke="#f97316" strokeWidth="1.5" opacity="0.7" />
              <line x1="130" y1="65" x2="180" y2="65" stroke="#ef4444" strokeWidth="1.5" opacity="0.7" />
              {/* Shield icon */}
              <path d="M150 120 Q150 110 160 110 Q170 110 170 120 L170 140 Q170 150 160 150 Q150 150 150 140 Z" fill="url(#socGradient)" opacity="0.8" />
              <circle cx="160" cy="130" r="8" fill="none" stroke="#fff" strokeWidth="2" />
              {/* Alert indicators */}
              <circle cx="50" cy="25" r="5" fill="#ef4444" opacity="0.8">
                <animate attributeName="opacity" values="0.3;1;0.3" dur="2s" repeatCount="indefinite" />
              </circle>
              <circle cx="180" cy="15" r="4" fill="#f97316" opacity="0.8">
                <animate attributeName="opacity" values="0.5;1;0.5" dur="1.5s" repeatCount="indefinite" />
              </circle>
            </svg>
          )}
          
          {title === "Security Operations Platform" && (
            <svg viewBox="0 0 300 200" className="w-full h-full">
              <defs>
                <linearGradient id="platformGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#ef4444" />
                  <stop offset="100%" stopColor="#f97316" />
                </linearGradient>
              </defs>
              {/* Dashboard container */}
              <rect x="30" y="30" width="240" height="140" rx="12" fill="none" stroke="url(#platformGradient)" strokeWidth="2" strokeDasharray="8,4" />
              {/* Charts and graphs */}
              <circle cx="80" cy="80" r="25" fill="none" stroke="#ef4444" strokeWidth="2" opacity="0.7" />
              <path d="M80 55 A25 25 0 0 1 105 80" fill="none" stroke="#f97316" strokeWidth="3" />
              {/* Bar chart */}
              <rect x="140" y="70" width="8" height="30" fill="#ef4444" opacity="0.6" />
              <rect x="155" y="60" width="8" height="40" fill="#f97316" opacity="0.6" />
              <rect x="170" y="75" width="8" height="25" fill="#ef4444" opacity="0.6" />
              <rect x="185" y="55" width="8" height="45" fill="#f97316" opacity="0.6" />
              {/* Network nodes */}
              <circle cx="220" cy="60" r="6" fill="#ef4444" opacity="0.8" />
              <circle cx="240" cy="80" r="6" fill="#f97316" opacity="0.8" />
              <circle cx="200" cy="90" r="6" fill="#ef4444" opacity="0.8" />
              {/* Connecting lines */}
              <line x1="220" y1="60" x2="240" y2="80" stroke="url(#platformGradient)" strokeWidth="1.5" opacity="0.5" strokeDasharray="3,3" />
              <line x1="240" y1="80" x2="200" y2="90" stroke="url(#platformGradient)" strokeWidth="1.5" opacity="0.5" strokeDasharray="3,3" />
              {/* Data flow indicators */}
              <path d="M60 120 Q150 110 240 120" fill="none" stroke="#f97316" strokeWidth="2" opacity="0.6" strokeDasharray="6,4">
                <animate attributeName="stroke-dashoffset" values="0;-20" dur="3s" repeatCount="indefinite" />
              </path>
            </svg>
          )}
          
          {title === "Incident Response & Forensics" && (
            <svg viewBox="0 0 300 200" className="w-full h-full">
              <defs>
                <linearGradient id="forensicsGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#ef4444" />
                  <stop offset="100%" stopColor="#f97316" />
                </linearGradient>
              </defs>
              {/* Magnifying glass */}
              <circle cx="120" cy="80" r="30" fill="none" stroke="url(#forensicsGradient)" strokeWidth="3" />
              <line x1="143" y1="103" x2="165" y2="125" stroke="url(#forensicsGradient)" strokeWidth="3" strokeLinecap="round" />
              {/* Code/data under magnifying glass */}
              <line x1="105" y1="70" x2="135" y2="70" stroke="#ef4444" strokeWidth="1.5" opacity="0.8" />
              <line x1="105" y1="80" x2="125" y2="80" stroke="#f97316" strokeWidth="1.5" opacity="0.8" />
              <line x1="105" y1="90" x2="130" y2="90" stroke="#ef4444" strokeWidth="1.5" opacity="0.8" />
              {/* Alert/warning triangle */}
              <path d="M200 40 L230 90 L170 90 Z" fill="none" stroke="#ef4444" strokeWidth="2" />
              <circle cx="200" cy="80" r="2" fill="#ef4444" />
              <line x1="200" y1="60" x2="200" y2="70" stroke="#ef4444" strokeWidth="2" strokeLinecap="round" />
              {/* Investigation tools */}
              <rect x="50" y="130" width="200" height="30" rx="6" fill="none" stroke="url(#forensicsGradient)" strokeWidth="2" strokeDasharray="4,4" />
              <circle cx="70" cy="145" r="4" fill="#ef4444" opacity="0.7" />
              <circle cx="90" cy="145" r="4" fill="#f97316" opacity="0.7" />
              <circle cx="110" cy="145" r="4" fill="#ef4444" opacity="0.7" />
              {/* Scanning lines */}
              <line x1="40" y1="50" x2="260" y2="50" stroke="#f97316" strokeWidth="1" opacity="0.5">
                <animate attributeName="y1" values="40;160;40" dur="4s" repeatCount="indefinite" />
                <animate attributeName="y2" values="40;160;40" dur="4s" repeatCount="indefinite" />
              </line>
            </svg>
          )}
          
          {title === "Vulnerability & Patch Management" && (
            <svg viewBox="0 0 300 200" className="w-full h-full">
              <defs>
                <linearGradient id="vulnGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#ef4444" />
                  <stop offset="100%" stopColor="#f97316" />
                </linearGradient>
              </defs>
              {/* Code blocks */}
              <rect x="40" y="40" width="60" height="40" rx="6" fill="none" stroke="url(#vulnGradient)" strokeWidth="2" />
              <rect x="120" y="30" width="70" height="50" rx="6" fill="none" stroke="url(#vulnGradient)" strokeWidth="2" />
              <rect x="210" y="45" width="55" height="35" rx="6" fill="none" stroke="url(#vulnGradient)" strokeWidth="2" />
              {/* Code lines */}
              <line x1="50" y1="50" x2="90" y2="50" stroke="#ef4444" strokeWidth="1.5" opacity="0.6" />
              <line x1="50" y1="60" x2="80" y2="60" stroke="#f97316" strokeWidth="1.5" opacity="0.6" />
              <line x1="130" y1="45" x2="180" y2="45" stroke="#ef4444" strokeWidth="1.5" opacity="0.6" />
              <line x1="130" y1="55" x2="170" y2="55" stroke="#f97316" strokeWidth="1.5" opacity="0.6" />
              <line x1="130" y1="65" x2="175" y2="65" stroke="#ef4444" strokeWidth="1.5" opacity="0.6" />
              {/* Vulnerability indicators */}
              <circle cx="85" cy="35" r="5" fill="#ef4444" opacity="0.8">
                <animate attributeName="r" values="3;6;3" dur="2s" repeatCount="indefinite" />
              </circle>
              <circle cx="165" cy="25" r="4" fill="#f97316" opacity="0.8">
                <animate attributeName="r" values="2;5;2" dur="1.8s" repeatCount="indefinite" />
              </circle>
              {/* Patch/fix indicators */}
              <path d="M60 120 Q150 100 240 120" fill="none" stroke="url(#vulnGradient)" strokeWidth="3" strokeDasharray="8,4">
                <animate attributeName="stroke-dashoffset" values="0;-24" dur="2s" repeatCount="indefinite" />
              </path>
              {/* Security shield */}
              <path d="M150 140 Q140 130 150 130 Q160 130 150 140 L150 160 Q150 170 150 160 Z" fill="url(#vulnGradient)" opacity="0.7" />
              <text x="150" y="150" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">✓</text>
              {/* Scanning progress */}
              <rect x="80" y="180" width="140" height="8" rx="4" fill="none" stroke="url(#vulnGradient)" strokeWidth="1" />
              <rect x="80" y="180" width="90" height="8" rx="4" fill="url(#vulnGradient)" opacity="0.6">
                <animate attributeName="width" values="0;140;0" dur="3s" repeatCount="indefinite" />
              </rect>
            </svg>
          )}
        </div>
      </div>

      {/* Description */}
      <p className="text-gray-400 leading-relaxed mb-6 group-hover:text-gray-300 transition-colors duration-300">
        {description}
      </p>

      {/* Features */}
      <div className="space-y-2 mb-6">
        {features.map((feature, featureIndex) => (
          <div key={featureIndex} className="flex items-center space-x-3">
            <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0" />
            <span className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors duration-300">
              {feature}
            </span>
          </div>
        ))}
    </div>
    </motion.div>
  );
};

const TechgiantSecurityComponent: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);

  const securityCards = [
    {
      title: "Security Operations Center",
      description: "Tech Giant Security Operations Center provides comprehensive support and protection throughout the entire lifecycle of cyber threats using AI, machine learning and integrated automation systems. Our hybrid model allows businesses to integrate their existing security teams with Tech Giant's cybersecurity experts.",
      icon: Shield,
      features: [
        "24/7 threat monitoring and detection",
        "AI-powered incident response",
        "Integrated security automation",
        "Expert cybersecurity team support"
      ]
    },
    {
      title: "Security Operations Platform",
      description: "Security Operations as a platform provides secure infrastructure that integrates SOAR, SIEM, endpoint detection response, and vulnerability management. Tech Giant supports customers at any stage of their cyber resilience journey with centralized insights.",
      icon: Server,
      features: [
        "SOAR & SIEM integration",
        "Endpoint detection & response",
        "Vulnerability management",
        "Centralized security insights"
      ]
    },
    {
      title: "Incident Response & Forensics",
      description: "Tech Giant's Cybersecurity Incident Response and Forensics (CSIRF) service offers preventive and proactive threat detection. During cyber disruptions like ransomware, our CSIRF team provides hands-on support to identify, investigate, and resolve threats.",
      icon: AlertCircle,
      features: [
        "Rapid incident response",
        "Digital forensics analysis",
        "Threat investigation",
        "Recovery planning & execution"
      ]
    },
    {
      title: "Vulnerability & Patch Management",
      description: "Comprehensive vulnerability assessment and patch management services to identify security weaknesses and ensure your systems are protected against known vulnerabilities and emerging threats.",
      icon: FileSearch,
      features: [
        "Automated vulnerability scanning",
        "Risk-based patch prioritization",
        "Compliance reporting",
        "Continuous security monitoring"
      ]
    },
  ];

  return (
    <section ref={sectionRef} className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-bgColor via-gray-900/20 to-bgColor relative">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-red-900/5 via-transparent to-transparent"></div>
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-gradient-to-br from-red-600/10 to-orange-600/10 rounded-full filter blur-3xl opacity-30"></div>
        <div className="absolute -bottom-40 -right-40 w-80 h-80 bg-gradient-to-br from-orange-600/10 to-red-600/10 rounded-full filter blur-3xl opacity-30"></div>
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
              <span className="text-sm font-medium text-gray-300">How Tech Giant Helps</span>
            </div>
          </motion.div>

          <motion.h2 
            className="text-4xl lg:text-5xl font-bold text-white mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Comprehensive Security
            <span className="text-red-400 block">
              Solutions & Services
            </span>
          </motion.h2>

          <motion.p 
            className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
          >
            From proactive threat detection to incident response, our integrated cybersecurity services provide end-to-end protection for your digital infrastructure.
          </motion.p>
        </div>

        {/* Security Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {securityCards.map((card, index) => (
            <SecurityCard
              key={index}
              title={card.title}
              description={card.description}
              icon={card.icon}
              features={card.features}
              index={index}
            />
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div 
          className="mt-20 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="p-8 bg-gradient-to-br from-gray-800/30 via-bgColor to-gray-800/30 backdrop-blur-sm border border-red-600/20 rounded-2xl">
            <h3 className="text-3xl font-bold text-white mb-4">
              Ready to Secure Your Digital Assets?
            </h3>
            <p className="text-gray-300 max-w-2xl mx-auto text-lg">
              Contact our cybersecurity experts to discuss how our comprehensive VAPT services can protect your organization.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TechgiantSecurityComponent;