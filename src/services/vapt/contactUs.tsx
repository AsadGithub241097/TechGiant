import { ArrowRight, Shield, Mail, Phone, MapPin, Users } from "lucide-react";
import { motion } from "framer-motion";

const ConnectWithUsSection: React.FC = () => {
  // Define your company's email and optional subject/body
  const companyEmail = "Info@tech-giant.in";
  const emailSubject = "Request for Consultation";
  const emailBody = "Hello, I would like to request a consultation about your services.";

  // Construct the mailto link
  const mailtoLink = `mailto:${companyEmail}?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;

  const handleClick = () => {
    window.open(mailtoLink, '_blank');
  };

  const contactInfo = [
    {
      icon: Mail,
      label: "Email",
      value: "Info@tech-giant.in",
      color: "from-blue-400 to-cyan-500"
    },
    {
      icon: Phone,
      label: "Phone",
      value: "+91 8008771893",
      color: "from-green-400 to-emerald-500"
    },
    {
      icon: MapPin,
      label: "Location",
      value: "Hyderabad, India",
      color: "from-purple-400 to-violet-500"
    }
  ];

  return (
    <div className="w-full relative py-16 sm:py-24 bg-gradient-to-b from-bgColor via-gray-900/50 to-bgColor overflow-hidden">
      {/* Enhanced background decoration */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-carousel2/5 via-transparent to-transparent"></div>
      
      {/* Enhanced decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -right-20 -top-20 w-96 h-96 bg-gradient-to-br from-carousel2/20 to-carousel1/20 rounded-full filter blur-3xl opacity-30"></div>
        <div className="absolute -left-20 -bottom-20 w-80 h-80 bg-gradient-to-br from-carousel1/20 to-carousel3/20 rounded-full filter blur-3xl opacity-30"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-br from-carousel3/5 to-carousel2/5 rounded-full filter blur-3xl opacity-20"></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left side - Enhanced CTA */}
          <div className="space-y-8">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="inline-flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-carousel2/20 to-carousel1/20 backdrop-blur-sm border border-carousel2/30 rounded-full"
            >
              <Shield className="w-5 h-5 text-carousel3" />
              <span className="text-sm font-semibold text-carousel3 uppercase tracking-wider">
                Cyber Security Experts
              </span>
            </motion.div>

            {/* Main heading */}
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight font-sans"
            >
              Ready to strengthen your{" "}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-carousel3 to-carousel2">
                cyber resilience?
              </span>
            </motion.h2>
            
            {/* Description */}
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-gray-300 text-lg md:text-xl leading-relaxed max-w-2xl"
            >
              Partner with our cybersecurity experts to build a robust defense strategy. We provide comprehensive solutions tailored to your unique business needs and threat landscape.
            </motion.p>

            {/* Enhanced CTA button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <button 
                onClick={handleClick}
                className="group relative px-8 py-4 bg-gradient-to-r from-carousel2 to-carousel1 text-white font-semibold rounded-xl hover:from-carousel1 hover:to-carousel3 transition-all duration-300 shadow-2xl hover:shadow-carousel2/25 hover:scale-105 overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative flex items-center space-x-3">
                  <span>Request Consultation</span>
                  <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
                </div>
              </button>
              
              <div className="flex items-center space-x-2 text-gray-400 text-sm">
                <Users className="w-4 h-4" />
                <span>Free 30-minute consultation</span>
              </div>
            </motion.div>
          </div>

          {/* Right side - Contact info cards */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            {/* Contact cards */}
            <div className="space-y-4">
              {contactInfo.map((info, index) => {
                const IconComponent = info.icon;
                return (
                  <div 
                    key={index}
                    className="group p-6 bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-carousel2/20 rounded-2xl hover:border-carousel2/60 transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl hover:shadow-carousel2/25"
                  >
                    <div className="flex items-center space-x-4">
                      <div className={`p-3 bg-gradient-to-br ${info.color} rounded-xl group-hover:scale-110 transition-transform duration-300`}>
                        <IconComponent className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-400 font-medium">{info.label}</p>
                        <p className="text-white font-semibold">{info.value}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Stats section */}
            <div className="grid grid-cols-2 gap-4 mt-8">
              <div className="text-center p-4 bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-xl border border-carousel2/20 backdrop-blur-sm">
                <div className="text-2xl font-bold text-carousel2 mb-1">24/7</div>
                <div className="text-sm text-gray-400">Expert Support</div>
              </div>
              <div className="text-center p-4 bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-xl border border-carousel2/20 backdrop-blur-sm">
                <div className="text-2xl font-bold text-carousel2 mb-1">500+</div>
                <div className="text-sm text-gray-400">Clients Protected</div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <div className="inline-flex items-center space-x-2 text-gray-500 text-sm">
            <Shield className="w-4 h-4 text-carousel2" />
            <span>Trusted by <span className="text-carousel2 font-semibold">enterprises</span> worldwide</span>
            <span className="mx-4">•</span>
            <span><span className="text-carousel2 font-semibold">ISO 27001</span> certified</span>
          </div>
        </motion.div>
      </div>

      {/* Bottom gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-bgColor to-transparent"></div>
    </div>
  );
};

export default ConnectWithUsSection;