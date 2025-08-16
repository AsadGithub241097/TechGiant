import React, {
  useLayoutEffect,
  useRef,
  useState,
  useEffect,
  memo,
  useCallback,
  useMemo,
} from "react";
import { gsap } from "gsap";
import { IMAGE_URLS } from '../../constants/mediaUrls';
import { LoadingImage } from '../ui/LoadingImage';
import { ChevronLeft, ChevronRight, Sparkles } from "lucide-react";
import "tailwindcss/tailwind.css";

interface CardProps {
  title: string;
  description: string;
  svg: string;
  isBlurred: boolean;
}

const Card: React.FC<CardProps> = memo(
  ({ title, description, svg, isBlurred }) => {
    const [isVisible, setIsVisible] = useState(false);
    const cardRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.unobserve(entry.target);
          }
        },
        { threshold: 0.1 }
      );

      if (cardRef.current) {
        observer.observe(cardRef.current);
      }

      return () => {
        if (cardRef.current) {
          observer.unobserve(cardRef.current);
        }
      };
    }, []);

    return (
      <div
        ref={cardRef}
        className={`absolute font-sans top-0 left-0 w-full h-full text-center bg-gradient-to-br from-gray-900/90 via-bgColor to-gray-900/90 backdrop-blur-sm border border-carousel2/30 rounded-2xl flex flex-col md:flex-row items-center justify-between p-6 md:p-8 lg:p-10 xl:p-12 2xl:p-16 shadow-2xl transition-all duration-500 ease-in-out hover:shadow-[0_0_40px_rgba(170,96,200,0.4)] hover:border-carousel2/60 ${isBlurred ? "filter blur-md opacity-70" : ""
          }`}
      >
        {/* Glow effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-carousel2/10 via-transparent to-carousel1/10 opacity-0 hover:opacity-100 transition-opacity duration-500 rounded-2xl"></div>
        
        {/* Icon section with enhanced styling */}
        <div className="h-24 w-24 sm:h-32 sm:w-32 md:h-40 md:w-40 lg:h-48 lg:w-48 xl:h-64 xl:w-64 2xl:h-80 2xl:w-80 relative flex justify-center items-center group">
          {isVisible ? (
            <div className="relative w-full h-full">
              {/* Enhanced background glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-carousel2/20 to-carousel1/20 rounded-full filter blur-2xl scale-90 opacity-0 group-hover:opacity-100 transition-all duration-700"></div>
              
              {/* Icon container with gradient border */}
              <div className="relative w-full h-full bg-gradient-to-br from-carousel2/20 to-carousel1/20 rounded-full p-1 group-hover:from-carousel2/40 group-hover:to-carousel1/40 transition-all duration-500">
                <div className="w-full h-full bg-gradient-to-br from-gray-900/50 to-bgColor/50 rounded-full flex items-center justify-center backdrop-blur-sm">
                  <LoadingImage
                    src={svg}
                    alt={title}
                    className="w-3/4 h-3/4 object-contain relative z-10 transition-all duration-700 group-hover:scale-110 drop-shadow-[0_10px_25px_rgba(170,96,200,0.6)]"
                    skeletonClassName="w-3/4 h-3/4 relative z-10 rounded-full"
                    aspectRatio="aspect-square"
                  />
                </div>
              </div>
              
              {/* Animated ring */}
              <div className="absolute inset-0 rounded-full border-2 border-carousel2/30 opacity-0 group-hover:opacity-100 group-hover:animate-pulse transition-opacity duration-300"></div>
            </div>
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-gray-700/50 to-gray-800/50 animate-pulse rounded-full border border-carousel2/20" />
          )}
        </div>
        
        {/* Content section with enhanced typography */}
        <div className="relative z-10 flex flex-col font-sans items-center md:items-start text-center md:text-left mt-6 md:mt-0 md:ml-8 lg:ml-10 xl:ml-12 2xl:ml-16 flex-1">
          <div className="flex items-center gap-3 mb-4 md:mb-6">
            <Sparkles className="w-6 h-6 text-carousel3 opacity-80" />
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl 2xl:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-carousel3 to-carousel2 leading-tight tracking-tight">
              {title}
            </h2>
          </div>
          <p className="text-sm md:text-base lg:text-lg xl:text-xl 2xl:text-2xl text-gray-300 hover:text-gray-200 font-light leading-relaxed max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl 2xl:max-w-3xl transition-colors duration-300">
            {description}
          </p>
        </div>

        {/* Bottom gradient line */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-carousel2/50 to-transparent hover:via-carousel1 transition-all duration-500 rounded-b-2xl"></div>
      </div>
    );
  }
);

const Gallery: React.FC = memo(() => {
  const galleryRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLUListElement>(null);
  const playhead = useRef({ offset: 0 });
  const seamlessLoopRef = useRef<gsap.core.Timeline | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  // const [progress, setProgress] = useState(0);

  const cardsData = useMemo(
    () => [
      {
        title: "Innovation",
        description: `We embrace the latest technologies and industry trends to develop cutting-edge software solutions. Our commitment to innovation drives us to continuously explore new possibilities, ensuring that we stay ahead in a rapidly evolving digital landscape.`,
        svg: IMAGE_URLS.icons.innovation,
      },
      {
        title: "Quality",
        description: `Delivering excellence is at the core of what we do. We follow rigorous testing, coding standards, and best practices to ensure that every solution we create meets the highest standards of performance, reliability, and security.`,
        svg: IMAGE_URLS.icons.quality,
      },
      {
        title: "Centric Approach",
        description: `Our success is measured by our clients' success. We take the time to understand their unique challenges and business goals, tailoring our solutions to deliver maximum impact and value for their business.`,
        svg: IMAGE_URLS.icons.centric,
      },
      {
        title: "Reliability",
        description: `Trust and dependability define our work. We ensure our solutions are robust, scalable, and future-proof, providing ongoing support and maintenance to guarantee optimal performance and longevity.`,
        svg: IMAGE_URLS.icons.reliability,
      },
    ],
    []
  );

  // useEffect(() => {
  //   setProgress((currentIndex / (cardsData.length - 1)) * 100);
  // }, [currentIndex, cardsData.length]);

  const buildSeamlessLoop = useCallback(
    (
      items: HTMLElement[],
      spacing: number,
      animateFunc: (el: HTMLElement) => gsap.core.Timeline
    ) => {
      const rawSequence = gsap.timeline({ paused: true });
      const seamlessLoop = gsap.timeline({ paused: true, repeat: -1 });
      const cycleDuration = spacing * items.length;
      let dur: number;

      items
        .concat(items)
        .concat(items)
        .forEach((_item, i) => {
          const anim = animateFunc(items[i % items.length]);
          rawSequence.add(anim, i * spacing);
          dur = anim.duration();
        });

      seamlessLoop.fromTo(
        rawSequence,
        { time: cycleDuration + dur! / 2 },
        { time: "+=" + cycleDuration, duration: cycleDuration, ease: "none" }
      );
      return seamlessLoop;
    },
    []
  );

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      if (!cardsRef.current || !galleryRef.current) return;

      const spacing = 0.25;
      const cards = gsap.utils.toArray(
        cardsRef.current.children
      ) as HTMLElement[];
      gsap.set(cards, { xPercent: 400, opacity: 0, scale: 0 });

      const animateFunc = (element: HTMLElement) => {
        const tl = gsap.timeline();
        tl.fromTo(
          element,
          { scale: 0, opacity: 0 },
          {
            scale: 1,
            opacity: 1,
            zIndex: 100,
            duration: 0.5,
            yoyo: true,
            repeat: 1,
            ease: "power2.out",
          }
        ).fromTo(
          element,
          { xPercent: 130 },
          { xPercent: -130, duration: 1, ease: "power1.inOut" },
          0
        );
        return tl;
      };

      const seamlessLoop = buildSeamlessLoop(cards, spacing, animateFunc);
      seamlessLoopRef.current = seamlessLoop;

      const wrapTime = gsap.utils.wrap(0, seamlessLoop.duration());
      gsap.to(playhead.current, {
        offset: 0,
        onUpdate: () => {
          seamlessLoop.time(wrapTime(playhead.current.offset));
        },
        duration: 0.5,
        ease: "power3",
        paused: true,
      });

      gsap.to(cards[0], {
        scale: 1,
        opacity: 1,
        xPercent: 0,
        duration: 0.75,
        ease: "back.out(1.7)",
      });
    }, galleryRef);

    return () => ctx.revert();
  }, [buildSeamlessLoop]);

  const handleNext = useCallback(() => {
    if (seamlessLoopRef.current && !isAnimating) {
      setIsAnimating(true);
      gsap.to(playhead.current, {
        offset: "+=0.25",
        duration: 0.6,
        ease: "power2.inOut",
        onUpdate: () => {
          seamlessLoopRef.current?.time(playhead.current.offset);
        },
        onComplete: () => {
          setIsAnimating(false);
          setCurrentIndex((prev) => (prev + 1) % cardsData.length);
        },
      });
    }
  }, [cardsData.length, isAnimating]);

  const handlePrev = useCallback(() => {
    if (seamlessLoopRef.current && !isAnimating) {
      setIsAnimating(true);
      gsap.to(playhead.current, {
        offset: "-=0.25",
        duration: 0.6,
        ease: "power2.inOut",
        onUpdate: () => {
          seamlessLoopRef.current?.time(playhead.current.offset);
        },
        onComplete: () => {
          setIsAnimating(false);
          setCurrentIndex(
            (prev) => (prev - 1 + cardsData.length) % cardsData.length
          );
        },
      });
    }
  }, [cardsData.length, isAnimating]);
  const handleDotClick = useCallback(
    (index: number) => {
      if (seamlessLoopRef.current && !isAnimating && index !== currentIndex) {
        setIsAnimating(true);
        const direction = index > currentIndex ? "+=" : "-=";
        const steps = Math.abs(currentIndex - index);

        gsap.to(playhead.current, {
          offset: `${direction}${0.25 * steps}`,
          duration: 0.6,
          ease: "power2.inOut",
          onUpdate: () => {
            seamlessLoopRef.current?.time(playhead.current.offset);
          },
          onComplete: () => {
            setIsAnimating(false);
            setCurrentIndex(index);
          },
        });
      }
    },
    [currentIndex, isAnimating]
  );

  const cards = useMemo(() => {
    return cardsData.map((card, i) => (
      <li key={i} className="absolute top-0 left-0 w-full h-full">
        <Card
          title={card.title}
          description={card.description}
          svg={card.svg}
          isBlurred={Math.abs(currentIndex - i) === 1}
        />
      </li>
    ));
  }, [cardsData, currentIndex]);

  useEffect(() => {
    const autoAdvance = setTimeout(() => {
      if (!isAnimating) {
        handleNext();
      }
    }, 8000);

    return () => clearTimeout(autoAdvance);
  }, [currentIndex, handleNext, isAnimating]);

  return (
    <div
      ref={galleryRef}
      className="relative w-full overflow-hidden flex flex-col items-center justify-center bg-gradient-to-b from-bgColor via-gray-900/50 to-bgColor h-screen transition-all"
      style={{backgroundImage: `url(${IMAGE_URLS.liquid})`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundAttachment: 'fixed'}}
    >
      {/* Enhanced background decoration */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-carousel2/10 via-transparent to-transparent"></div>
      
      {/* Enhanced decorative elements */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute w-96 h-96 -top-48 -left-48 bg-gradient-to-br from-carousel2/20 to-carousel1/20 rounded-full filter blur-3xl opacity-30 animate-pulse"></div>
        <div className="absolute w-96 h-96 -bottom-48 -right-48 bg-gradient-to-br from-carousel1/20 to-carousel3/20 rounded-full filter blur-3xl opacity-30 animate-pulse"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-br from-carousel3/5 to-carousel2/5 rounded-full filter blur-3xl opacity-20"></div>
      </div>
      
      <div className="relative z-10 w-full max-w-6xl px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight font-sans">
            Our Core{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-carousel3 to-carousel2 animate-pulse">
              Values
            </span>
          </h1>
          <p className="text-gray-400 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
            The fundamental principles that guide our innovation, shape our culture, and drive our commitment to excellence
          </p>
          
          {/* Decorative line */}
          <div className="mt-6 mx-auto w-24 h-1 bg-gradient-to-r from-carousel2 to-carousel1 rounded-full"></div>
        </div>
        <div className="relative w-full h-96 md:h-[30rem] lg:h-[35rem] mt-4 mb-16">
          {/* Enhanced Previous Button */}
          <button
            onClick={handlePrev}
            disabled={isAnimating}
            className={`absolute -left-4 top-1/2 transform -translate-y-1/2 z-20 p-4 rounded-2xl bg-gradient-to-br from-gray-900/80 via-bgColor/80 to-gray-900/80 backdrop-blur-sm border border-carousel2/30 hover:border-carousel2/60 hover:scale-110 transition-all duration-300 shadow-2xl hover:shadow-carousel2/25 ${isAnimating
                ? "opacity-50 cursor-not-allowed"
                : "hover:from-carousel2/20 hover:to-carousel1/20"
              }`}
            aria-label="Previous Value"
          >
            <ChevronLeft className="h-6 w-6 text-white" />
          </button>

          {/* Carousel Container */}
          <ul
            ref={cardsRef}
            className="absolute w-full max-w-6xl top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-full"
          >
            {cards}
          </ul>
          
          {/* Enhanced Next Button */}
          <button
            onClick={handleNext}
            disabled={isAnimating}
            className={`absolute -right-4 top-1/2 transform -translate-y-1/2 z-20 p-4 rounded-2xl bg-gradient-to-br from-gray-900/80 via-bgColor/80 to-gray-900/80 backdrop-blur-sm border border-carousel2/30 hover:border-carousel2/60 hover:scale-110 transition-all duration-300 shadow-2xl hover:shadow-carousel2/25 ${isAnimating
                ? "opacity-50 cursor-not-allowed"
                : "hover:from-carousel2/20 hover:to-carousel1/20"
              }`}
            aria-label="Next Value"
          >
            <ChevronRight className="h-6 w-6 text-white" />
          </button>
        </div>
        {/* Enhanced navigation and stats */}
        <div className="flex flex-col items-center gap-8">
          {/* Modern navigation dots */}
          <div className="flex gap-4 bg-gradient-to-r from-gray-900/50 via-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-carousel2/20 rounded-full px-6 py-3">
            {cardsData.map((_, i) => (
              <button
                key={i}
                onClick={() => handleDotClick(i)}
                className={`relative w-4 h-4 rounded-full transition-all duration-300 group ${i === currentIndex
                    ? "bg-gradient-to-r from-carousel2 to-carousel1 scale-125 shadow-lg shadow-carousel2/50"
                    : "bg-gray-600 hover:bg-carousel2/60 hover:scale-110"
                  }`}
                aria-label={`Go to ${cardsData[i].title}`}
              >
                {i === currentIndex && (
                  <div className="absolute inset-0 rounded-full border-2 border-carousel2/50 animate-pulse"></div>
                )}
              </button>
            ))}
          </div>
          
          {/* Value counter */}
          <div className="text-center">
            <p className="text-sm text-gray-500">
              <span className="text-carousel2 font-semibold">{currentIndex + 1}</span> of <span className="text-carousel2 font-semibold">{cardsData.length}</span> Core Values
            </p>
          </div>
        </div>
      </div>
    </div>
  );
});

export default Gallery;
