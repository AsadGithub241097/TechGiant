import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Users, CheckCircle, TrendingUp, Award, Star, ArrowRight } from 'lucide-react';
import { IMAGE_URLS } from "../../constants/mediaUrls";
import { LoadingImage } from "../../components/ui/LoadingImage";
import DevelopmentConsultationButton from "../../components/ui/DevelopmentConsultationButton";

gsap.registerPlugin(ScrollTrigger);

const SupportDev = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const clientsRef = useRef<(HTMLDivElement | null)[]>([]);

  const clients = [
    { id: 1, logo: IMAGE_URLS.partners.falahzar, alt: "Falahzar", name: "Falahzar" },
    { id: 2, logo: IMAGE_URLS.partners.forest, alt: "Forest Herbs", name: "Forest Herbs" },
    { id: 3, logo: IMAGE_URLS.partners.imflux, alt: "Influx", name: "Influx" },
    { id: 4, logo: IMAGE_URLS.partners.iStaff, alt: "iStaff", name: "iStaff" },
    { id: 5, logo: IMAGE_URLS.partners.keyCube, alt: "KeyCube", name: "KeyCube" },
    { id: 6, logo: IMAGE_URLS.partners.prayas, alt: "Prayas", name: "Prayas" },
  ];

  const benefits = [
    {
      icon: TrendingUp,
      title: "Faster Time-to-Market",
      description: "Accelerate your product launch with our streamlined development process",
      color: "text-gray-300"
    },
    {
      icon: Award,
      title: "Premium User Experience",
      description: "Deliver exceptional user experiences that keep customers engaged",
      color: "text-gray-300"
    },
    {
      icon: CheckCircle,
      title: "Flawless Performance",
      description: "Ensure optimal performance and reliability across all devices",
      color: "text-gray-300"
    },
    {
      icon: Users,
      title: "Scalable Solutions",
      description: "Build applications that grow with your business needs",
      color: "text-gray-300"
    }
  ];

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(clientsRef.current, 
        { y: 30, opacity: 0, scale: 0.8 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.5,
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

  return (
    <section ref={sectionRef} className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-bgColor via-gray-900/20 to-bgColor relative">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-carousel1/5 via-transparent to-transparent"></div>
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-br from-carousel1/10 to-carousel3/10 rounded-full filter blur-3xl opacity-30"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-carousel3/10 to-carousel2/10 rounded-full filter blur-3xl opacity-30"></div>
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
            <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-carousel1/20 to-carousel3/20 backdrop-blur-sm border border-carousel1/30 rounded-full px-6 py-3 mb-8">
              <Users className="w-5 h-5 text-carousel1" />
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
            Why Seek Support With
            <span className="block bg-gradient-to-r from-carousel3 to-carousel2 bg-clip-text text-transparent">
              Web Development?
            </span>
          </motion.h2>

          <motion.p 
            className="text-xl text-gray-300 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
          >
            Businesses that we've worked with reported measurable improvements in performance, 
            user engagement, and market reach. Here's what we deliver:
          </motion.p>
        </div>

        {/* Benefits Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {benefits.map((benefit, index) => {
            const IconComponent = benefit.icon;
            return (
              <motion.div
                key={index}
                className="group p-6 bg-gradient-to-br from-gray-800/50 via-bgColor to-gray-800/50 backdrop-blur-sm border border-carousel1/30 rounded-2xl hover:border-carousel1/60 transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl hover:shadow-carousel1/25"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
              >
                <div className="w-12 h-12 bg-gray-800/70 border border-gray-700/50 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 group-hover:bg-gray-700/70 group-hover:border-gray-600/50 transition-all duration-300">
                  <IconComponent className={`w-6 h-6 ${benefit.color} group-hover:text-white transition-colors duration-300`} />
                </div>
                
                <h3 className="text-lg font-semibold text-white mb-3 group-hover:text-carousel1 transition-colors duration-300">
                  {benefit.title}
                </h3>
                
                <p className="text-gray-400 text-sm leading-relaxed group-hover:text-gray-300 transition-colors duration-300">
                  {benefit.description}
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* Trusted By Section */}
        <motion.div 
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="p-8 bg-gradient-to-br from-gray-800/30 via-bgColor to-gray-800/30 backdrop-blur-sm border border-carousel1/20 rounded-2xl">
            <div className="flex items-center justify-center space-x-2 mb-6">
              <Star className="w-6 h-6 text-yellow-400 fill-current" />
              <h3 className="text-2xl font-bold text-white">Trusted by Industry Leaders</h3>
              <Star className="w-6 h-6 text-yellow-400 fill-current" />
            </div>
            
            <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
              Join the ranks of successful businesses who have transformed their digital presence with our expertise.
            </p>

            {/* Client Logos */}
            <div className="grid grid-cols-3 md:grid-cols-6 gap-8 items-center mb-8">
              {clients.map((client, index) => (
                <motion.div
                  key={client.id}
                  ref={el => clientsRef.current[index] = el}
                  className="group flex justify-center"
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="p-4 bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-carousel1/20 rounded-xl hover:border-carousel1/40 transition-all duration-300 hover:shadow-lg hover:shadow-carousel1/25">
                    <LoadingImage
                      src={client.logo}
                      alt={client.alt}
                      className="h-8 w-auto object-contain filter brightness-0 invert opacity-70 group-hover:opacity-100 transition-all duration-300"
                      skeletonClassName="h-8 w-16"
                      aspectRatio="aspect-auto"
                    />
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Statistics */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-carousel1 mb-1">500+</div>
                <div className="text-sm text-gray-400">Projects Delivered</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-carousel1 mb-1">99%</div>
                <div className="text-sm text-gray-400">Client Satisfaction</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-carousel1 mb-1">5+</div>
                <div className="text-sm text-gray-400">Years Experience</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-carousel1 mb-1">24/7</div>
                <div className="text-sm text-gray-400">Support Available</div>
              </div>
            </div>

            <DevelopmentConsultationButton
              section="Support"
              className="inline-flex items-center space-x-2 px-8 py-4 bg-gradient-to-r from-carousel1 to-carousel3 text-white font-semibold rounded-xl hover:from-carousel3 hover:to-carousel2 transition-all duration-300 shadow-lg hover:shadow-carousel1/25 hover:scale-105"
            >
              <span>Join Our Success Stories</span>
              <ArrowRight className="w-5 h-5" />
            </DevelopmentConsultationButton>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default SupportDev;