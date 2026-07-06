import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Globe, Smartphone, ShoppingCart, Zap, Server, Shield } from 'lucide-react';
import DevelopmentConsultationButton from '../../components/ui/DevelopmentConsultationButton';

gsap.registerPlugin(ScrollTrigger);

const DevServices = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(cardsRef.current, 
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

  const services = [
    {
      icon: Globe,
      title: "Custom Websites",
      description: "Responsive, high-performance websites tailored to your business needs and brand identity.",
      color: "text-gray-300"
    },
    {
      icon: ShoppingCart,
      title: "E-commerce Solutions", 
      description: "Complete online stores with secure payment processing and inventory management.",
      color: "text-gray-300"
    },
    {
      icon: Smartphone,
      title: "Mobile Applications",
      description: "Native and cross-platform mobile apps for iOS and Android devices.",
      color: "text-gray-300"
    },
    {
      icon: Server,
      title: "Backend Development",
      description: "Robust server-side solutions with APIs, databases, and cloud integration.",
      color: "text-gray-300"
    },
    {
      icon: Zap,
      title: "Performance Optimization",
      description: "Speed optimization and SEO enhancement for better user experience.",
      color: "text-gray-300"
    },
    {
      icon: Shield,
      title: "Security & Maintenance",
      description: "Ongoing security updates, monitoring, and technical support services.",
      color: "text-gray-300"
    }
  ];

  return (
    <section ref={sectionRef} className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-bgColor via-gray-900/20 to-bgColor relative">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-carousel2/5 via-transparent to-transparent"></div>
      
      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-carousel2/20 to-carousel1/20 backdrop-blur-sm border border-carousel2/30 rounded-full px-6 py-3 mb-8">
              <Globe className="w-5 h-5 text-carousel2" />
              <span className="text-sm font-medium text-gray-300">Our Services</span>
            </div>
          </motion.div>

          <motion.h2 
            className="text-4xl lg:text-5xl font-bold text-white mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Achieve Your Business Goals
            <span className="block bg-gradient-to-r from-carousel3 to-carousel2 bg-clip-text text-transparent">
              With Web Development Solutions
            </span>
          </motion.h2>

          <motion.p 
            className="text-xl text-gray-300 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
          >
            Our battle-tested developers specialize in a wide range of web development services. 
            Here's what we deliver with passion and precision.
          </motion.p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const IconComponent = service.icon;
            return (
              <motion.div
                key={index}
                ref={el => cardsRef.current[index] = el}
                className="group relative p-8 bg-gradient-to-br from-gray-800/50 via-bgColor to-gray-800/50 backdrop-blur-sm border border-carousel2/30 rounded-2xl hover:border-carousel2/60 transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl hover:shadow-carousel2/25"
                whileHover={{ y: -5 }}
              >
                <div className="relative">
                  <div className="w-16 h-16 bg-gray-800/70 border border-gray-700/50 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-gray-700/70 group-hover:border-gray-600/50 transition-all duration-300">
                    <IconComponent className={`w-8 h-8 ${service.color} group-hover:text-white transition-colors duration-300`} />
                  </div>
                  
                  <h3 className="text-xl font-bold text-white mb-4 group-hover:text-carousel2 transition-colors duration-300">
                    {service.title}
                  </h3>
                  
                  <p className="text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors duration-300">
                    {service.description}
                  </p>

                  {/* Hover effect border */}
                  <div className="absolute inset-0 border-2 border-transparent group-hover:border-gradient-to-r group-hover:from-carousel2/50 group-hover:to-carousel1/50 rounded-2xl transition-all duration-500 opacity-0 group-hover:opacity-100"></div>
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
          <div className="p-8 bg-gradient-to-br from-gray-800/30 via-bgColor to-gray-800/30 backdrop-blur-sm border border-carousel2/20 rounded-2xl">
            <h3 className="text-2xl font-bold text-white mb-4">
              Ready to Start Your Project?
            </h3>
            <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
              Let's discuss your requirements and create a custom solution that drives your business forward.
            </p>
            <DevelopmentConsultationButton
              section="Services"
              className="inline-block px-8 py-4 bg-gradient-to-r from-carousel2 to-carousel1 text-white font-semibold rounded-xl hover:from-carousel1 hover:to-carousel3 transition-all duration-300 shadow-lg hover:shadow-carousel2/25 hover:scale-105"
            >
              Get Free Consultation
            </DevelopmentConsultationButton>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default DevServices;