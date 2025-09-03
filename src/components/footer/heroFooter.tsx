import React from "react";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";
import { Mail, Phone, MapPin, ArrowRight, Shield, Code, Users, Globe } from "lucide-react";
import { IMAGE_URLS } from "../../constants/mediaUrls";

const Footer: React.FC = () => {
  const services = [
    { name: "Cybersecurity", href: "/vapt", icon: Shield },
    { name: "Development", href: "/development", icon: Code },
    { name: "Training", href: "/courses", icon: Users },
    { name: "Marketing", href: "/marketing", icon: Globe }
  ];

  const quickLinks = [
    { name: "About Us", href: "/about" },
    { name: "Our Services", href: "/services" },
    { name: "Courses", href: "/courses" },
    { name: "Contact", href: "/contact" },
    { name: "Privacy Policy", href: "/privacy" },
    { name: "Terms of Service", href: "/terms" }
  ];

  const contactInfo = [
    { icon: Mail, label: "Email", value: "Info@tech-giant.in", href: "mailto:Info@tech-giant.in" },
    { icon: Phone, label: "Phone", value: "+91 8008771893", href: "tel:+918008771893" },
    { icon: MapPin, label: "Address", value: "Hyderabad, India", href: "#" }
  ];

  return (
    <footer className="relative bg-gradient-to-b from-bgColor via-gray-900/50 to-bgColor overflow-hidden">
      {/* Background decoration */}
      <div 
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `url(${IMAGE_URLS.liquid})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed'
        }}
      />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-carousel2/5 via-transparent to-transparent"></div>
      
      {/* Enhanced decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-20 -left-20 w-96 h-96 bg-gradient-to-br from-carousel2/10 to-carousel1/10 rounded-full filter blur-3xl opacity-30"></div>
        <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-gradient-to-br from-carousel1/10 to-carousel3/10 rounded-full filter blur-3xl opacity-30"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
        {/* Main footer content */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-12 mb-8 sm:mb-12">
          {/* Company Info */}
          <div className="lg:col-span-1 space-y-6">
            <div>
              <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-carousel3 to-carousel2 mb-4 font-sans">
                Tech Giant
              </h2>
              <p className="text-gray-400 leading-relaxed">
                Empowering businesses with cutting-edge technology solutions, cybersecurity expertise, and innovative digital transformation services.
              </p>
            </div>
            
            {/* Stats */}
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-3 bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-xl border border-carousel2/20 backdrop-blur-sm">
                <div className="text-lg font-bold text-carousel2">500+</div>
                <div className="text-xs text-gray-400">Clients</div>
              </div>
              <div className="text-center p-3 bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-xl border border-carousel2/20 backdrop-blur-sm">
                <div className="text-lg font-bold text-carousel2">5+</div>
                <div className="text-xs text-gray-400">Years</div>
              </div>
            </div>
          </div>

          {/* Services */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-white mb-4">Our Services</h3>
            <ul className="space-y-3">
              {services.map((service, index) => {
                const IconComponent = service.icon;
                return (
                  <li key={index}>
                    <a 
                      href={service.href} 
                      className="group flex items-center space-x-3 text-gray-400 hover:text-white transition-colors duration-300"
                    >
                      <IconComponent className="w-4 h-4 text-carousel2 group-hover:text-carousel3 transition-colors duration-300" />
                      <span className="group-hover:translate-x-1 transition-transform duration-300">
                        {service.name}
                      </span>
                      <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-all duration-300" />
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Quick Links */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-white mb-4">Quick Links</h3>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <a 
                    href={link.href} 
                    className="group text-gray-400 hover:text-white transition-colors duration-300 flex items-center space-x-2"
                  >
                    <span className="group-hover:translate-x-1 transition-transform duration-300">
                      {link.name}
                    </span>
                    <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-all duration-300" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-white mb-4">Contact Us</h3>
            <div className="space-y-4">
              {contactInfo.map((info, index) => {
                const IconComponent = info.icon;
                return (
                  <a
                    key={index}
                    href={info.href}
                    className="group flex items-start space-x-3 text-gray-400 hover:text-white transition-colors duration-300"
                  >
                    <div className="p-2 bg-gradient-to-br from-carousel2/20 to-carousel1/20 rounded-lg group-hover:from-carousel2/40 group-hover:to-carousel1/40 transition-all duration-300">
                      <IconComponent className="w-4 h-4 text-carousel3" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 uppercase tracking-wide">{info.label}</p>
                      <p className="text-sm font-medium">{info.value}</p>
                    </div>
                  </a>
                );
              })}
            </div>

            {/* Social Media */}
            <div className="pt-4">
              <h4 className="text-sm font-semibold text-white mb-3">Follow Us</h4>
              <div className="flex space-x-3">
                <a 
                  href="#" 
                  className="group p-3 bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-xl border border-carousel2/20 hover:border-carousel2/60 transition-all duration-300 hover:scale-110 backdrop-blur-sm"
                >
                  <FaFacebook className="w-5 h-5 text-gray-400 group-hover:text-blue-400 transition-colors duration-300" />
                </a>
                <a 
                  href="#" 
                  className="group p-3 bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-xl border border-carousel2/20 hover:border-carousel2/60 transition-all duration-300 hover:scale-110 backdrop-blur-sm"
                >
                  <FaTwitter className="w-5 h-5 text-gray-400 group-hover:text-blue-400 transition-colors duration-300" />
                </a>
                <a 
                  href="https://www.instagram.com/itstechgiant?igsh=MW9nd3Y2N2VkaGFn"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group p-3 bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-xl border border-carousel2/20 hover:border-carousel2/60 transition-all duration-300 hover:scale-110 backdrop-blur-sm"
                >
                  <FaInstagram className="w-5 h-5 text-gray-400 group-hover:text-pink-400 transition-colors duration-300" />
                </a>
                <a 
                  href="https://www.linkedin.com/in/tech-giant-9a42b3284"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group p-3 bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-xl border border-carousel2/20 hover:border-carousel2/60 transition-all duration-300 hover:scale-110 backdrop-blur-sm"
                >
                  <FaLinkedin className="w-5 h-5 text-gray-400 group-hover:text-blue-500 transition-colors duration-300" />
                </a>
              </div>
            </div>
          </div>
        </div>



        {/* Bottom bar */}
        <div className="border-t border-carousel2/20 pt-6 sm:pt-8">
          <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
            <p className="text-gray-500 text-xs sm:text-sm text-center sm:text-left">
              &copy; {new Date().getFullYear()} Tech Giant. All rights reserved.
            </p>
            <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-6 text-xs sm:text-sm text-gray-500">
              <span className="flex items-center space-x-2">
                <Shield className="w-3 h-3 sm:w-4 sm:h-4 text-carousel2" />
                <span>ISO 27001 Certified</span>
              </span>
              <span className="hidden sm:inline">•</span>
              <span>Made with ❤️ in India</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
