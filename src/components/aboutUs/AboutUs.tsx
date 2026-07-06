import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useNavigate } from 'react-router-dom';
import { 
  Users, 
  Target, 
  Award, 
  Lightbulb, 
  Shield, 
  TrendingUp,
  CheckCircle,
  Calendar,
  Phone,
  ArrowRight,
  ArrowLeft,
  Heart,
  Zap,
  Eye,
  Rocket,
  Building,
  BookOpen,
  Crown
} from 'lucide-react';
import { TypewriterEffectSmooth } from '../../ui/typewriter_effect';
import TeamHyperScroll from './TeamHyperScroll';
import { GraphPaperBackground } from '../ui/sectionDecor';

gsap.registerPlugin(ScrollTrigger);

const AboutUs: React.FC = () => {
  const navigate = useNavigate();
  const heroRef = useRef<HTMLElement>(null);
  const storyRef = useRef<HTMLElement>(null);
  const valuesRef = useRef<HTMLElement>(null);
  const timelineRef = useRef<HTMLElement>(null);
  const statsRef = useRef<HTMLElement>(null);
  const [activeTimeline, setActiveTimeline] = useState(0);

  // Company data
  const companyValues = [
    {
      icon: Lightbulb,
      title: "Innovation",
      description: "Pushing boundaries with cutting-edge technology solutions and creative problem-solving approaches.",
      color: "text-carousel3"
    },
    {
      icon: Shield,
      title: "Security First",
      description: "Prioritizing cybersecurity in every solution we deliver, ensuring robust protection for our clients.",
      color: "text-carousel2"
    },
    {
      icon: Heart,
      title: "Client-Centric",
      description: "Building lasting partnerships through dedicated support and understanding client needs deeply.",
      color: "text-carousel3"
    },
    {
      icon: CheckCircle,
      title: "Quality Excellence",
      description: "Maintaining the highest standards in every project with rigorous testing and quality assurance.",
      color: "text-gray-400"
    },
    {
      icon: Users,
      title: "Team Collaboration",
      description: "Fostering a collaborative environment where diverse talents unite to achieve exceptional results.",
      color: "text-carousel4"
    },
    {
      icon: Zap,
      title: "Agile Delivery",
      description: "Implementing agile methodologies for faster, more efficient project delivery and adaptability.",
      color: "text-carousel4"
    }
  ];

  const milestones = [
    {
      year: "2020",
      title: "Foundation",
      description: "Tech Giant was founded with a vision to empower businesses through innovative technology solutions."
    },
    {
      year: "2021",
      title: "First Major Client",
      description: "Secured our first enterprise client and delivered a comprehensive cybersecurity solution."
    },
    {
      year: "2022",
      title: "Team Expansion",
      description: "Expanded our team to include specialized developers, QA engineers, and security experts."
    },
    {
      year: "2023",
      title: "100+ Projects",
      description: "Successfully delivered over 100 projects across web development, security, and digital marketing."
    },
    {
      year: "2024",
      title: "500+ Clients",
      description: "Reached the milestone of serving 500+ satisfied clients with innovative digital solutions."
    }
  ];

  const stats = [
    { number: "500+", label: "Happy Clients", icon: Users },
    { number: "100+", label: "Projects Delivered", icon: CheckCircle },
    { number: "5+", label: "Years Experience", icon: Award },
    { number: "24/7", label: "Support Available", icon: Shield },
    { number: "99.9%", label: "Uptime Guarantee", icon: TrendingUp },
    { number: "50+", label: "Team Members", icon: Building }
  ];

  const typewriterWords = [
    {
      text: "Empowering",
      className: "text-white"
    },
    {
      text: "businesses",
      className: "text-white"
    },
    {
      text: "through",
      className: "text-white"
    },
    {
      text: "professional",
      className: "text-carousel3"
    },
    {
      text: "technology",
      className: "text-carousel2"
    }
  ];

  const heroPillars = [
    {
      title: "Security-First",
      description: "Enterprise-grade protection woven into every product and engagement.",
      icon: Shield,
      accent: "from-carousel3 to-carousel2",
    },
    {
      title: "End-to-End Delivery",
      description: "Strategy, design, development, and long-term support under one roof.",
      icon: Rocket,
      accent: "from-carousel2 to-carousel1",
    },
    {
      title: "Proven Track Record",
      description: "Trusted by 500+ organizations across industries and growth stages.",
      icon: Award,
      accent: "from-carousel1 to-carousel4",
    },
    {
      title: "Talent Enablement",
      description: "Upskilling programs that help teams hire, train, and scale with confidence.",
      icon: BookOpen,
      accent: "from-carousel4 to-carousel3",
    },
  ];

  const heroServices = [
    { label: "Cybersecurity", icon: Shield },
    { label: "Web Development", icon: Rocket },
    { label: "Digital Marketing", icon: TrendingUp },
    { label: "Training & Placement", icon: BookOpen },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero animations
      if (heroRef.current) {
        gsap.fromTo(heroRef.current.querySelectorAll('.hero-element'), 
          { y: 50, opacity: 0 },
          { 
            y: 0, 
            opacity: 1, 
            duration: 1, 
            stagger: 0.2,
            ease: "power3.out"
          }
        );
      }

      // Story section animation
      if (storyRef.current) {
        gsap.fromTo(storyRef.current.querySelectorAll('.story-element'),
          { x: -100, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.3,
            scrollTrigger: {
              trigger: storyRef.current,
              start: "top 80%",
              toggleActions: "play none none none"
            }
          }
        );
      }

      // Values animation
      if (valuesRef.current) {
        gsap.fromTo(valuesRef.current.querySelectorAll('.value-card'),
          { y: 80, opacity: 0, scale: 0.8 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.6,
            stagger: 0.15,
            scrollTrigger: {
              trigger: valuesRef.current,
              start: "top 75%",
              toggleActions: "play none none none"
            }
          }
        );
      }

      // Team section — let carousel handle its own motion (avoid GSAP conflict)

      // Timeline animation
      if (timelineRef.current) {
        gsap.fromTo(timelineRef.current.querySelectorAll('.timeline-item'),
          { x: 100, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 0.6,
            stagger: 0.2,
            scrollTrigger: {
              trigger: timelineRef.current,
              start: "top 80%",
              toggleActions: "play none none none"
            }
          }
        );
      }

      // Stats animation
      if (statsRef.current) {
        gsap.fromTo(statsRef.current.querySelectorAll('.stat-card'),
          { scale: 0, opacity: 0, rotationZ: 180 },
          {
            scale: 1,
            opacity: 1,
            rotationZ: 0,
            duration: 0.8,
            stagger: 0.1,
            ease: "back.out(1.7)",
            scrollTrigger: {
              trigger: statsRef.current,
              start: "top 75%",
              toggleActions: "play none none none"
            }
          }
        );
      }
    });

    return () => ctx.revert();
  }, []);

  return (
    <div 
      className="min-h-screen bg-bgColor text-white overflow-x-clip"
      style={{
        minHeight: '100vh',
        background: '#0A0A0A',
        position: 'relative'
      }}
    >
      {/* Background extender to prevent white on over-scroll */}
      <div 
        className="fixed inset-0 -z-50 bg-bgColor"
        style={{
          background: '#0A0A0A',
          top: '-100vh',
          bottom: '-100vh',
          left: '-100vw',
          right: '-100vw'
        }}
      />
      <GraphPaperBackground />
      {/* Navigation Bar */}
      <div className="relative z-50 p-4 sm:p-6">
        <div className="max-w-7xl mx-auto flex items-center justify-start">
          <motion.button
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            onClick={() => navigate('/')}
            className="flex items-center space-x-2 text-white/80 hover:text-white transition-colors group"
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            <span>Back to Home</span>
          </motion.button>
        </div>
      </div>

      {/* Hero Section */}
      <section ref={heroRef} className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 -mt-16 sm:-mt-20">
        {/* Background decoration */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-carousel2/10 via-transparent to-transparent"></div>
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-20 sm:-top-40 -right-20 sm:-right-40 w-48 sm:w-96 h-48 sm:h-96 bg-gradient-to-br from-carousel2/20 to-carousel1/20 rounded-full filter blur-3xl opacity-30"></div>
          <div className="absolute -bottom-20 sm:-bottom-40 -left-20 sm:-left-40 w-40 sm:w-80 h-40 sm:h-80 bg-gradient-to-br from-carousel1/20 to-carousel3/20 rounded-full filter blur-3xl opacity-30"></div>
        </div>

        <div className="relative z-10 max-w-6xl mx-auto text-center">
          <motion.div 
            className="hero-element mb-6 sm:mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-carousel2/20 to-carousel1/20 backdrop-blur-sm border border-carousel2/30 rounded-full px-4 sm:px-6 py-2 sm:py-3 mb-6 sm:mb-8">
              <Building className="w-4 h-4 sm:w-5 sm:h-5 text-carousel3" />
              <span className="text-xs sm:text-sm font-medium text-gray-300">About Tech Giant</span>
            </div>
          </motion.div>

          <div className="hero-element mb-8 w-full">
            <div className="w-full overflow-visible px-4">
              <TypewriterEffectSmooth 
                words={typewriterWords}
                className="mb-6"
                gradientColors={["#EABDE6", "#D69ADE", "#AA60C8", "#500073"]}
                duration={3}
              />
            </div>
          </div>

          <motion.div
            className="hero-element mx-auto mb-8 sm:mb-12 max-w-5xl px-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <p className="mx-auto mb-8 max-w-2xl text-base leading-relaxed text-gray-400 sm:text-lg">
              <span className="font-medium text-white">Tech Giant</span> is a
              professional IT services company delivering secure, scalable
              solutions — from cybersecurity and product engineering to digital
              growth and talent development.
            </p>

            <div className="mb-3 text-center">
              <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-carousel3/90">
                Why organizations choose us
              </span>
            </div>

            <div className="mb-10 grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-4">
              {heroPillars.map((pillar) => {
                const PillarIcon = pillar.icon;
                return (
                  <div
                    key={pillar.title}
                    className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] p-4 text-left backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-carousel2/40 hover:bg-white/[0.07] sm:p-5"
                  >
                    <div
                      className={`absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r ${pillar.accent} opacity-80`}
                    />
                    <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-carousel2/10">
                      <PillarIcon className="h-4 w-4 text-carousel3" />
                    </div>
                    <h3 className="text-sm font-bold leading-tight text-white sm:text-base">
                      {pillar.title}
                    </h3>
                    <p className="mt-2 text-xs leading-relaxed text-gray-400 sm:text-sm">
                      {pillar.description}
                    </p>
                  </div>
                );
              })}
            </div>

            <div className="mb-3 text-center">
              <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-carousel3/90">
                What we do
              </span>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
              {heroServices.map((service) => {
                const ServiceIcon = service.icon;
                return (
                  <span
                    key={service.label}
                    className="inline-flex items-center gap-2 rounded-full border border-carousel2/30 bg-gradient-to-r from-carousel2/10 to-carousel1/10 px-4 py-2 text-xs font-medium text-gray-200 backdrop-blur-sm transition-colors hover:border-carousel2/50 hover:text-white sm:text-sm"
                  >
                    <ServiceIcon className="h-3.5 w-3.5 text-carousel3" />
                    {service.label}
                  </span>
                );
              })}
            </div>
          </motion.div>

          <motion.div 
            className="hero-element flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <button 
              onClick={() => navigate('/')}
              className="group px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-carousel2 to-carousel1 text-white font-semibold rounded-xl hover:from-carousel1 hover:to-carousel3 transition-all duration-300 shadow-lg hover:shadow-carousel2/25 hover:scale-105 text-sm sm:text-base"
            >
              <span className="flex items-center space-x-2">
                <span>Our Services</span>
                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
              </span>
            </button>
            <button 
              onClick={() => navigate('/')}
              className="px-6 sm:px-8 py-3 sm:py-4 border border-carousel2/50 text-white font-semibold rounded-xl hover:bg-carousel2/10 transition-all duration-300 backdrop-blur-sm text-sm sm:text-base"
            >
              Contact Us
            </button>
          </motion.div>
        </div>
      </section>

      {/* Company Story Section */}
      <section ref={storyRef} className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-gray-900/20 to-transparent"></div>
        
        <div className="relative z-10 max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-center">
            <div className="space-y-6 sm:space-y-8">
              <div className="story-element">
                <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-carousel1/20 to-carousel3/20 backdrop-blur-sm border border-carousel1/30 rounded-full px-3 sm:px-4 py-2 mb-4 sm:mb-6">
                  <BookOpen className="w-3 h-3 sm:w-4 sm:h-4 text-carousel2" />
                  <span className="text-xs sm:text-sm font-medium text-gray-300">Our Story</span>
                </div>
                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6">
                  Built on a Vision of
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-carousel1 to-carousel2 block">
                    Digital Excellence
                  </span>
                </h2>
              </div>

              <div className="story-element space-y-4 sm:space-y-6 text-sm sm:text-base lg:text-lg text-gray-300 leading-relaxed">
                <p>
                  In 2020, two visionary entrepreneurs, <span className="text-carousel3 font-medium">Ibrahim (Co-Founder/CEO)</span> and 
                  <span className="text-carousel2 font-medium"> Sameer (Co-Founder/CMO)</span>, recognized a critical gap in the market: 
                  businesses struggling to navigate the complex digital landscape while maintaining robust security postures.
                </p>
                <p>
                  With their combined expertise in technology and business strategy, they founded Tech Giant with a clear mission: 
                  to empower businesses with cutting-edge technology solutions while nurturing the next generation of IT talent. 
                  Soon joined by <span className="text-carousel3 font-medium">Asad (CTO)</span> and 
                  <span className="text-gray-400 font-medium"> Md. Shahraz Sarfaraz (CIO)</span>, the leadership team was complete.
                </p>
                <p>
                  Today, we've grown from a small startup to a trusted partner for <span className="text-gray-300 font-medium">500+ clients</span>, 
                  delivering scalable digital solutions that drive real business results.
                </p>
              </div>

              <div className="story-element grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                <div className="p-4 sm:p-6 bg-gray-800/70 rounded-xl sm:rounded-2xl border border-gray-600/30 backdrop-blur-sm">
                  <Crown className="w-6 h-6 sm:w-8 sm:h-8 text-carousel3 mb-3 sm:mb-4" />
                  <h3 className="text-lg sm:text-xl font-bold text-white mb-2">Leadership</h3>
                  <p className="text-gray-400 text-xs sm:text-sm">Experienced founders driving innovation and growth</p>
                </div>
                <div className="p-4 sm:p-6 bg-gray-800/70 rounded-xl sm:rounded-2xl border border-gray-600/30 backdrop-blur-sm">
                  <Target className="w-6 h-6 sm:w-8 sm:h-8 text-carousel2 mb-3 sm:mb-4" />
                  <h3 className="text-lg sm:text-xl font-bold text-white mb-2">Mission</h3>
                  <p className="text-gray-400 text-xs sm:text-sm">Bridging technology gaps and empowering businesses</p>
                </div>
              </div>
            </div>

            <div className="story-element">
              <div className="relative">
                <div className="absolute inset-0 bg-gray-700/20 rounded-3xl transform rotate-3"></div>
                <div className="relative bg-gray-800 rounded-3xl p-8 border border-gray-600/50">
                  <div className="space-y-6">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-gray-700 border border-gray-600 rounded-full flex items-center justify-center">
                        <Eye className="w-6 h-6 text-carousel3" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-white">Our Vision</h3>
                        <p className="text-gray-400">Shaping the future of digital transformation</p>
                      </div>
                    </div>
                    <p className="text-gray-300 leading-relaxed">
                      To be the leading catalyst for digital transformation, empowering businesses of all sizes 
                      to thrive in an increasingly connected world through innovative technology solutions and 
                      exceptional cybersecurity practices.
                    </p>
                    
                    <div className="grid grid-cols-2 gap-4 pt-6 border-t border-gray-700">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-carousel3">2020</div>
                        <div className="text-sm text-gray-400">Founded</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-carousel2">India</div>
                        <div className="text-sm text-gray-400">Headquartered</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values Section */}
      <section ref={valuesRef} className="py-20 px-4 sm:px-6 lg:px-8 relative">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-carousel3/5 via-transparent to-transparent"></div>
        
        <div className="relative z-10 max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-carousel3/20 to-carousel2/20 backdrop-blur-sm border border-carousel3/30 rounded-full px-6 py-3 mb-8">
              <Heart className="w-5 h-5 text-carousel3" />
              <span className="text-sm font-medium text-gray-300">Our Values</span>
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
              What Drives Us
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-carousel3 to-carousel1 block">
                Every Single Day
              </span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Our core values shape every decision we make and every solution we deliver
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {companyValues.map((value, index) => {
              const IconComponent = value.icon;
              return (
                <motion.div
                  key={index}
                  className="value-card group relative p-8 bg-gradient-to-br from-gray-800/50 via-bgColor to-gray-800/50 backdrop-blur-sm border border-carousel2/30 rounded-2xl hover:border-carousel2/60 transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl hover:shadow-carousel2/25"
                  whileHover={{ y: -5 }}
                >
                  <div className="relative">
                    <div className="w-16 h-16 bg-gray-700 border border-gray-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-gray-600 transition-all duration-300">
                      <IconComponent className={`w-8 h-8 ${value.color} relative z-10`} />
                    </div>
                    
                    <h3 className="text-xl font-bold text-white mb-4 group-hover:text-gray-200 transition-colors duration-300">
                      {value.title}
                    </h3>
                    
                    <p className="text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors duration-300">
                      {value.description}
                    </p>

                    {/* Hover effect border */}
                    <div className="absolute inset-0 border-2 border-transparent group-hover:border-gradient-to-r group-hover:from-carousel2/50 group-hover:to-carousel1/50 rounded-2xl transition-all duration-500 opacity-0 group-hover:opacity-100"></div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Team Section — fullscreen hyper scroll */}
      {/* Team Section — fullscreen pinned hyper scroll */}
      <div className="w-full overflow-visible">
        <TeamHyperScroll />
      </div>

      {/* Statistics Section */}
      <section ref={statsRef} className="py-20 px-4 sm:px-6 lg:px-8 relative">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-carousel2/10 via-transparent to-transparent"></div>
        
        <div className="relative z-10 max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-carousel2/20 to-carousel3/20 backdrop-blur-sm border border-carousel2/30 rounded-full px-6 py-3 mb-8">
              <TrendingUp className="w-5 h-5 text-carousel3" />
              <span className="text-sm font-medium text-gray-300">Our Impact</span>
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
              Numbers That
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-carousel2 to-carousel3 block">
                Speak Volumes
              </span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Our achievements reflect our commitment to excellence and client success
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {stats.map((stat, index) => {
              const IconComponent = stat.icon;
              return (
                <motion.div
                  key={index}
                  className="stat-card text-center p-6 bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-2xl border border-carousel2/20 backdrop-blur-sm hover:border-carousel2/60 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-carousel2/25"
                  whileHover={{ y: -5 }}
                >
                  <div className="w-12 h-12 bg-gray-700 border border-gray-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <IconComponent className="w-6 h-6 text-carousel3" />
                  </div>
                  <div className="text-2xl lg:text-3xl font-bold text-white mb-1">
                    {stat.number}
                  </div>
                  <div className="text-sm text-gray-400 font-medium">
                    {stat.label}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section ref={timelineRef} className="py-20 px-4 sm:px-6 lg:px-8 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-gray-900/20 to-transparent"></div>
        
        <div className="relative z-10 max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-carousel3/20 to-carousel1/20 backdrop-blur-sm border border-carousel3/30 rounded-full px-6 py-3 mb-8">
              <Calendar className="w-5 h-5 text-carousel3" />
              <span className="text-sm font-medium text-gray-300">Our Journey</span>
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
              Milestones That
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-carousel3 to-carousel1 block">
                Define Our Growth
              </span>
            </h2>
          </div>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-8 top-0 bottom-0 w-[2px] bg-gradient-to-b from-carousel2 via-carousel1 to-carousel3"></div>
            
            <div className="space-y-12">
              {milestones.map((milestone, index) => (
                <motion.div
                  key={index}
                  className="timeline-item relative flex items-start space-x-8"
                  onMouseEnter={() => setActiveTimeline(index)}
                >
                  {/* Timeline dot */}
                  <div className={`relative z-10 w-16 h-16 rounded-full flex items-center justify-center transition-all duration-300 ${
                    activeTimeline === index 
                      ? 'bg-gradient-to-br from-carousel2 to-carousel1 scale-110 shadow-lg shadow-carousel2/50' 
                      : 'bg-gradient-to-br from-gray-700 to-gray-800 border-2 border-carousel2/30'
                  }`}>
                    <span className="text-white font-bold text-sm">
                      {milestone.year.slice(-2)}
                    </span>
                  </div>
                  
                  {/* Content */}
                  <div className={`flex-1 p-6 rounded-2xl transition-all duration-300 ${
                    activeTimeline === index 
                      ? 'bg-gradient-to-br from-carousel2/20 to-carousel1/20 border border-carousel2/50 shadow-lg shadow-carousel2/25' 
                      : 'bg-gradient-to-br from-gray-800/50 to-gray-900/50 border border-carousel2/20'
                  }`}>
                    <div className="flex items-center space-x-3 mb-3">
                      <span className="text-2xl font-bold text-carousel3">
                        {milestone.year}
                      </span>
                      <Rocket className={`w-5 h-5 transition-colors duration-300 ${
                        activeTimeline === index ? 'text-carousel2' : 'text-gray-500'
                      }`} />
                    </div>
                    <h3 className={`text-xl font-bold mb-3 transition-colors duration-300 ${
                      activeTimeline === index ? 'text-white' : 'text-gray-300'
                    }`}>
                      {milestone.title}
                    </h3>
                    <p className={`leading-relaxed transition-colors duration-300 ${
                      activeTimeline === index ? 'text-gray-300' : 'text-gray-400'
                    }`}>
                      {milestone.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 relative">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-carousel2/15 via-transparent to-transparent"></div>
        
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
              Ready to Transform
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-carousel2 to-carousel1 block">
                Your Digital Future?
              </span>
            </h2>
            <p className="text-xl text-gray-300 mb-12 max-w-3xl mx-auto">
              Join 500+ satisfied clients who trust Tech Giant for their digital transformation journey. 
              Let's build something amazing together.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
              <button 
                onClick={() => navigate('/')}
                className="group px-8 py-4 bg-gradient-to-r from-carousel2 to-carousel1 text-white font-semibold rounded-xl hover:from-carousel1 hover:to-carousel3 transition-all duration-300 shadow-lg hover:shadow-carousel2/25 hover:scale-105"
              >
                <span className="flex items-center space-x-2">
                  <span>Start Your Project</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </span>
              </button>
              <button 
                onClick={() => navigate('/')}
                className="px-8 py-4 border border-carousel2/50 text-white font-semibold rounded-xl hover:bg-carousel2/10 transition-all duration-300 backdrop-blur-sm"
              >
                <span className="flex items-center space-x-2">
                  <Phone className="w-5 h-5" />
                  <span>Schedule a Call</span>
                </span>
              </button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;
