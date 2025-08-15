import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const WhyChooseUs: React.FC = () => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const leftRef = useRef<HTMLDivElement | null>(null);
  const rightRef = useRef<HTMLDivElement | null>(null);
  const featureCards = useRef<(HTMLDivElement | null)[]>([]);

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

  return (
    <section
      ref={sectionRef}
      className="relative bg- text-white py-16 px-6 md:px-12 lg:px-24 xl:px-32 flex flex-col md:flex-row items-center justify-between gap-12 max-w-[105rem] mx-auto "
    >
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden ">
        <div className="absolute top-0 left-0 w-32 h-32 bg-blue-700 rounded-full filter blur-3xl opacity-20"></div>
        <div className="absolute bottom-0 right-0 w-40 h-40 bg-purple-700 rounded-full filter blur-3xl opacity-20"></div>
      </div>

      {/* Left Section - Always visible */}
      <div 
        ref={leftRef} 
        className="md:w-1/2 z-10 opacity-100" // Force opacity to 100
      >
        <span className="inline-block px-3 py-1 mb-4 text-xs font-semibold tracking-wider text-blue-200 uppercase bg-blue-800 bg-opacity-50 rounded-full">
          Features of Our Courses
        </span>
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
          Why <span className="text-blue-300">Choose</span> Us?
        </h2>
        <ul className="space-y-4">
          {[
            "Expert-led training that bridges theory and practice",
            "Proven track record of successful placements in the software testing industry",
            "Unparalleled expertise in software training in Hyderabad"
          ].map((item, index) => (
            <li key={index} className="flex items-start">
              <svg className="w-5 h-5 mt-1 mr-3 text-blue-300 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
              </svg>
              <span className="text-lg text-blue-100">{item}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Right Section - Always visible */}
      <div
        ref={rightRef}
        className="md:w-1/2 z-10 opacity-100 grid grid-cols-1 md:grid-cols-2 gap-6" // Force opacity to 100
      >
        {[
          {
            icon: "👑",
            title: "Best Industry Leaders",
            description: "Learn from the best industry leaders in software testing in Hyderabad."
          },
          {
            icon: "⏳",
            title: "Learn At Your Own Pace",
            description: "Flexible learning at your own pace for optimal progress."
          },
          {
            icon: "🎯",
            title: "Placement Community",
            description: "Join our thriving placement community and connect with industry professionals."
          },
          {
            icon: "🔄",
            title: "Hands-on Projects",
            description: "Practical experience with real-world projects and case studies."
          }
        ].map((feature, index) => (
          <div 
            key={index}
            ref={el => addToRefs(el, index)}
            className="p-6 bg-white bg-opacity-10 backdrop-filter backdrop-blur-sm rounded-xl border border-white border-opacity-10 hover:bg-opacity-20 transition-all duration-300 hover:-translate-y-1 shadow-lg opacity-100" // Force opacity to 100
          >
            <div className="flex items-start space-x-4">
              <span className="text-3xl">{feature.icon}</span>
              <div>
                <h3 className="text-lg font-bold text-white mb-2">{feature.title}</h3>
                <p className="text-blue-100 text-sm leading-relaxed">{feature.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default WhyChooseUs;