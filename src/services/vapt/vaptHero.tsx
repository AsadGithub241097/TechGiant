import React from "react";
import { motion } from "framer-motion";
import { Shield, Zap, Lock } from "lucide-react";
import ScrollDown from "../../icons/scrollDown";

const SecurityOperationsHero: React.FC = () => {
  const securityFeatures = [
    { icon: Shield, label: "Advanced Protection" },
    { icon: Zap, label: "Rapid Response" },
    { icon: Lock, label: "Secure Infrastructure" }
  ];

  return (
    <div className="relative min-h-screen bg-bgColor overflow-hidden mt-[58px]">
      {/* Background decorations */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-red-900/10 via-transparent to-transparent"></div>
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-br from-red-600/10 to-orange-600/10 rounded-full filter blur-3xl opacity-30"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-orange-600/10 to-red-600/10 rounded-full filter blur-3xl opacity-30"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-16 xl:gap-20 items-center min-h-[80vh]">
          {/* Left Content */}
          <div className="space-y-8 max-w-2xl order-2 lg:order-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center space-x-2 bg-gray-800/30 backdrop-blur-sm border border-red-600/30 rounded-full px-6 py-3 mb-8">
                <Shield className="w-5 h-5 text-red-400" />
                <span className="text-sm font-medium text-gray-300">Cybersecurity Excellence</span>
              </div>
            </motion.div>

            <motion.h1 
              className="text-4xl lg:text-5xl xl:text-6xl font-bold text-white leading-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Advanced{" "}
              <span className="text-red-400">VAPT</span>{" "}
              <br />
              Security Solutions
            </motion.h1>

            <motion.p 
              className="text-xl text-gray-300 leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Comprehensive Vulnerability Assessment and Penetration Testing services to identify, assess, and fortify your digital infrastructure against evolving cyber threats.
            </motion.p>

            {/* Feature highlights */}
            <motion.div 
              className="flex flex-wrap gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              {securityFeatures.map((feature, index) => {
                const IconComponent = feature.icon;
                return (
                  <div key={index} className="flex items-center space-x-2 bg-gray-800/50 backdrop-blur-sm border border-gray-700/30 rounded-full px-4 py-2 hover:bg-gray-700/50 hover:border-gray-600/50 transition-all duration-300">
                    <IconComponent className="w-4 h-4 text-red-400" />
                    <span className="text-sm text-gray-300">{feature.label}</span>
                  </div>
                );
              })}
            </motion.div>
          </div>

          {/* Right Content - Security Stats Cards */}
          <motion.div 
            className="space-y-6 order-1 lg:order-2"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
          >
            <div className="grid grid-cols-2 gap-4">
              <div className="p-6 bg-gradient-to-br from-gray-800/50 via-bgColor to-gray-800/50 backdrop-blur-sm border border-red-600/30 rounded-2xl">
                <div className="text-3xl font-bold text-red-400 mb-2">500+</div>
                <div className="text-sm text-gray-400">Security Assessments</div>
              </div>
              <div className="p-6 bg-gradient-to-br from-gray-800/50 via-bgColor to-gray-800/50 backdrop-blur-sm border border-orange-600/30 rounded-2xl">
                <div className="text-3xl font-bold text-orange-400 mb-2">99.9%</div>
                <div className="text-sm text-gray-400">Threat Detection</div>
              </div>
              <div className="p-6 bg-gradient-to-br from-gray-800/50 via-bgColor to-gray-800/50 backdrop-blur-sm border border-red-600/30 rounded-2xl">
                <div className="text-3xl font-bold text-red-400 mb-2">24/7</div>
                <div className="text-sm text-gray-400">Security Monitoring</div>
              </div>
              <div className="p-6 bg-gradient-to-br from-gray-800/50 via-bgColor to-gray-800/50 backdrop-blur-sm border border-orange-600/30 rounded-2xl">
                <div className="text-3xl font-bold text-orange-400 mb-2">ISO</div>
                <div className="text-sm text-gray-400">27001 Certified</div>
              </div>
            </div>

            {/* Security methodologies */}
            <div className="p-6 bg-gradient-to-br from-gray-800/30 via-bgColor to-gray-800/30 backdrop-blur-sm border border-gray-700/30 rounded-2xl">
              <h3 className="text-lg font-semibold text-white mb-4">Security Frameworks</h3>
              <div className="flex flex-wrap gap-2">
                {['OWASP', 'NIST', 'ISO 27001', 'PTES', 'OSSTMM', 'SANS'].map((framework, index) => (
                  <span key={index} className="px-3 py-1 bg-gray-800/50 border border-gray-700/50 rounded-full text-xs text-gray-300 hover:bg-gray-700/50 hover:border-gray-600/50 hover:text-white transition-all duration-300">
                    {framework}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Scroll down indicator */}
        <motion.div 
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
        >
          <ScrollDown />
        </motion.div>
      </div>
    </div>
  );
};

export default SecurityOperationsHero;