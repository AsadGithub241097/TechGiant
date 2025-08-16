import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Crown, Clock, Target, RefreshCw, CheckCircle, Users, BookOpen, Award } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const WhyChooseUs: React.FC = () => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const leftRef = useRef<HTMLDivElement | null>(null);
  const rightRef = useRef<HTMLDivElement | null>(null);
  const featureCards = useRef<(HTMLDivElement | null)[]>([]);
  // const [hoveredCard, setHoveredCard] = useState<number | null>(null); // Removed unused state

  useEffect(() => {
    if (!sectionRef.current || !leftRef.current || !rightRef.current) return;

    let ctx = gsap.context(() => {
      // Initial setup - ensure content is visible before animation
      gsap.set([leftRef.current, rightRef.current, ...featureCards.current], { opacity: 1 });
      
      // Section animation
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
          end: "top 50%",
          toggleActions: "play none none none",
        }
      });

      // Animate from initial positions (but don't hide initially)
      tl.from(leftRef.current, {
        x: -80,
        duration: 0.8,
        ease: "power3.out"
      }).from(
        rightRef.current, 
        { x: 80, duration: 0.8, ease: "power3.out" },
        "-=0.4"
      );

      // Staggered animation for feature cards
      gsap.from(featureCards.current, {
        y: 30,
        duration: 0.6,
        stagger: 0.15,
        delay: 0.4,
        scrollTrigger: {
          trigger: rightRef.current,
          start: "top 70%",
          toggleActions: "play none none none"
        }
      });
    });

    return () => ctx.revert();
  }, []);

  const addToRefs = (el: HTMLDivElement | null, index: number) => {
    if (el && !featureCards.current.includes(el)) {
      featureCards.current[index] = el;
    }
  };

  const features = [
    {
      icon: Crown,
      title: "Best Industry Leaders",
      description: "Learn from the best industry leaders in software testing in Hyderabad.",
      color: "from-yellow-400 to-orange-500"
    },
    {
      icon: Clock,
      title: "Learn At Your Own Pace",
      description: "Flexible learning at your own pace for optimal progress.",
      color: "from-blue-400 to-cyan-500"
    },
    {
      icon: Target,
      title: "Placement Community",
      description: "Join our thriving placement community and connect with industry professionals.",
      color: "from-green-400 to-emerald-500"
    },
    {
      icon: RefreshCw,
      title: "Hands-on Projects",
      description: "Practical experience with real-world projects and case studies.",
      color: "from-purple-400 to-violet-500"
    }
  ];

  const benefits = [
    "Expert-led training that bridges theory and practice",
    "Proven track record of successful placements in the software testing industry",
    "Unparalleled expertise in software training in Hyderabad"
  ];

  return (
    <section
      ref={sectionRef}
      className="relative bg-gradient-to-b from-bgColor via-gray-900/50 to-bgColor text-white py-16 sm:py-24 overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-carousel2/5 via-transparent to-transparent"></div>
      
      {/* Enhanced decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-0 w-64 h-64 bg-gradient-to-br from-carousel2/20 to-carousel1/20 rounded-full filter blur-3xl opacity-30"></div>
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-gradient-to-br from-carousel1/20 to-carousel3/20 rounded-full filter blur-3xl opacity-30"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-carousel3/10 to-carousel2/10 rounded-full filter blur-3xl opacity-20"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-start justify-between gap-16">
          {/* Left Section - Enhanced */}
          <div 
            ref={leftRef} 
            className="lg:w-1/2 z-10 relative"
          >
            {/* Modern badge */}
            <div className="inline-flex items-center space-x-2 px-4 py-2 mb-6 bg-gradient-to-r from-carousel2/20 to-carousel1/20 backdrop-blur-sm border border-carousel2/30 rounded-full">
              <Award className="w-4 h-4 text-carousel3" />
              <span className="text-sm font-semibold tracking-wider text-carousel3 uppercase">
                Features of Our Courses
              </span>
            </div>

            {/* Modern heading */}
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-8 leading-tight font-sans">
              Why{" "}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-carousel3 to-carousel2 animate-pulse">
                Choose
              </span>{" "}
              Us?
            </h2>

            {/* Enhanced benefits list */}
            <ul className="space-y-6 mb-8">
              {benefits.map((item, index) => (
                <li key={index} className="group flex items-start space-x-4">
                  <div className="flex-shrink-0 w-6 h-6 mt-1 bg-gradient-to-br from-carousel2 to-carousel1 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <CheckCircle className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-lg text-gray-300 group-hover:text-white transition-colors duration-300 leading-relaxed">
                    {item}
                  </span>
                </li>
              ))}
            </ul>

            {/* Stats section */}
            <div className="grid grid-cols-2 gap-6 mt-8">
              <div className="text-center p-4 bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-xl border border-carousel2/20 backdrop-blur-sm">
                <div className="text-2xl font-bold text-carousel2 mb-1">500+</div>
                <div className="text-sm text-gray-400">Students Placed</div>
              </div>
              <div className="text-center p-4 bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-xl border border-carousel2/20 backdrop-blur-sm">
                <div className="text-2xl font-bold text-carousel2 mb-1">95%</div>
                <div className="text-sm text-gray-400">Success Rate</div>
              </div>
            </div>
          </div>

          {/* Right Section - Modern Cards */}
          <div
            ref={rightRef}
            className="lg:w-1/2 z-10 grid grid-cols-1 sm:grid-cols-2 gap-6"
          >
            {features.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <div 
                  key={index}
                  ref={el => addToRefs(el, index)}
                  className="group relative cursor-pointer"
                  onMouseEnter={() => {/* Future hover logic */}}
                  onMouseLeave={() => {/* Future hover logic */}}
                >
                  {/* Modern feature card */}
                  <div className="relative p-6 bg-gradient-to-br from-gray-800/50 via-bgColor to-gray-800/50 backdrop-blur-sm border border-carousel2/30 rounded-2xl group-hover:border-carousel2/60 transition-all duration-500 group-hover:scale-[1.02] group-hover:shadow-2xl group-hover:shadow-carousel2/25 h-full">
                    {/* Glow effect */}
                    <div className="absolute inset-0 bg-gradient-to-br from-carousel2/10 via-transparent to-carousel1/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"></div>
                    
                    {/* Content */}
                    <div className="relative z-10">
                      {/* Icon with gradient background */}
                      <div className={`inline-flex p-3 mb-4 bg-gradient-to-br ${feature.color} rounded-xl group-hover:scale-110 transition-transform duration-300`}>
                        <IconComponent className="w-6 h-6 text-white" />
                      </div>

                      {/* Title */}
                      <h3 className="text-xl font-bold text-white mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-carousel3 group-hover:to-carousel2 transition-all duration-300">
                        {feature.title}
                      </h3>

                      {/* Description */}
                      <p className="text-gray-400 text-sm leading-relaxed group-hover:text-gray-300 transition-colors duration-300">
                        {feature.description}
                      </p>
                    </div>

                    {/* Bottom gradient line */}
                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-carousel2/50 to-transparent group-hover:via-carousel1 transition-all duration-500 rounded-b-2xl"></div>

                    {/* Animated border */}
                    <div className="absolute inset-0 rounded-2xl border-2 border-carousel2/30 opacity-0 group-hover:opacity-100 group-hover:animate-pulse transition-opacity duration-300"></div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom CTA section */}
        <div className="mt-16 text-center">
          <div className="inline-flex items-center space-x-2 text-gray-500 text-sm">
            <Users className="w-4 h-4 text-carousel2" />
            <span>Join <span className="text-carousel2 font-semibold">1000+</span> successful graduates</span>
            <span className="mx-4">•</span>
            <BookOpen className="w-4 h-4 text-carousel2" />
            <span><span className="text-carousel2 font-semibold">Industry-verified</span> curriculum</span>
          </div>
        </div>
      </div>

      {/* Bottom gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-bgColor to-transparent"></div>
    </section>
  );
};

export default WhyChooseUs;