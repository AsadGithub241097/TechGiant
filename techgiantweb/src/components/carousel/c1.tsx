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
import "tailwindcss/tailwind.css";
import innovationSvg from "../../assets/svg/innovation.svg";
import qualitySvg from "../../assets/svg/quality.svg";
import centricSvg from "../../assets/svg/centric.svg";
import reliabilitySvg from "../../assets/svg/reliability.svg";

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
        className={`absolute font-sans top-0 left-0 w-full h-full text-center bg-gradient-to-br from-[#11071f] via-[#452170] to-[#11071f] rounded-xl flex flex-col md:flex-row items-center justify-between p-6 md:p-8 lg:p-10 xl:p-12 2xl:p-16 shadow-2xl transition-all duration-500 ease-in-out hover:shadow-[0_0_30px_rgba(139,92,246,0.3)] ${isBlurred ? "filter blur-md" : ""
          }`}
      >
        <div className="h-24 w-24 sm:h-32 sm:w-32 md:h-40 md:w-40 lg:h-48 lg:w-48 xl:h-64 xl:w-64 2xl:h-80 2xl:w-80 relative flex justify-center items-center group">
          {isVisible ? (
            <div className="relative w-full h-full">
              <div className="absolute inset-0 bg-purple-500 bg-opacity-20 rounded-full filter blur-xl scale-75 opacity-0 group-hover:opacity-70 transition-all duration-700"></div>
              <img
                src={svg}
                alt={title}
                className="w-full h-full object-contain relative z-10 transition-all duration-700 group-hover:scale-110 drop-shadow-[0_5px_15px_rgba(139,92,246,0.4)]"
              />
            </div>
          ) : (
            <div className="w-full h-full bg-gray-700/50 animate-pulse rounded-full" />
          )}
        </div>
        <div className="flex flex-col font-sans items-center md:items-start text-center md:text-left mt-6 md:mt-0 md:ml-8 lg:ml-10 xl:ml-12 2xl:ml-16 flex-1">
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl 2xl:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-300 to-indigo-200 mb-4 md:mb-6 leading-tight tracking-tight">
            {title}
          </h2>
          <p className="text-sm md:text-base lg:text-lg xl:text-xl 2xl:text-2xl text-gray-300 font-light leading-relaxed max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl 2xl:max-w-3xl">
            {description}
          </p>
        </div>
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
        svg: innovationSvg,
      },
      {
        title: "Quality",
        description: `Delivering excellence is at the core of what we do. We follow rigorous testing, coding standards, and best practices to ensure that every solution we create meets the highest standards of performance, reliability, and security.`,
        svg: qualitySvg,
      },
      {
        title: "Centric Approach",
        description: `Our success is measured by our clients' success. We take the time to understand their unique challenges and business goals, tailoring our solutions to deliver maximum impact and value for their business.`,
        svg: centricSvg,
      },
      {
        title: "Reliability",
        description: `Trust and dependability define our work. We ensure our solutions are robust, scalable, and future-proof, providing ongoing support and maintenance to guarantee optimal performance and longevity.`,
        svg: reliabilitySvg,
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

  const isFirstCard = currentIndex === 0;
  const isLastCard = currentIndex === cardsData.length - 1;
  useEffect(() => {
    const autoAdvance = setTimeout(() => {
      if (!isLastCard && !isAnimating) {
        handleNext();
      }
    }, 8000);

    return () => clearTimeout(autoAdvance);
  }, [currentIndex, isLastCard, handleNext, isAnimating]);

  return (
    <div
      ref={galleryRef}
      className="relative w-full overflow-hidden flex flex-col items-center justify-center bg-bgColor h-screen bg-[url('/Users/asad.mulla/Documents/TechGiant/TechGiant/techgiantweb/src/assets/liquid.jpg')] bg-fixed transition-all bg-cover"
    >
      <div className="absolute inset-0 z-0 opacity-20 h-screen">
        {/* <div className="absolute w-96 h-96 -top-48 -left-48 bg-purple-600 rounded-full filter blur-3xl opacity-20 animate-pulse"></div> */}
        <div className="absolute w-96 h-96 -bottom-48 -right-48 bg-indigo-600 rounded-full filter blur-3xl opacity-20 animate-pulse"></div>
      </div>
      <div className="relative z-10 w-full max-w-6xl px-4">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-2">
            Our Core{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-300 to-indigo-200">
              Values
            </span>
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto">
            What drives our passion for excellence and innovation in everything
            we do
          </p>
        </div>
        <div className="relative w-full h-96 md:h-[30rem] lg:h-[35rem] mt-4 mb-16">
          <button
            onClick={handlePrev}
            disabled={isFirstCard || isAnimating}
            className={`absolute left-0 top-1/2 transform -translate-y-1/2 z-20 p-3 rounded-full bg-black bg-opacity-50 hover:bg-opacity-70 transition-all duration-300 ${isFirstCard || isAnimating
                ? "opacity-50 cursor-not-allowed"
                : "hover:shadow-lg"
              }`}
            aria-label="Previous"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>

          <ul
            ref={cardsRef}
            className="absolute w-full max-w-6xl top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-full"
          >
            {cards}
          </ul>
          <button
            onClick={handleNext}
            disabled={isLastCard || isAnimating}
            className={`absolute right-0 top-1/2 transform -translate-y-1/2 z-20 p-3 rounded-full bg-black bg-opacity-50 hover:bg-opacity-70 transition-all duration-300 ${isLastCard || isAnimating
                ? "opacity-50 cursor-not-allowed"
                : "hover:shadow-lg"
              }`}
            aria-label="Next"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>
        <div className="flex flex-col items-center gap-8">
          <div className="flex gap-3">
            {cardsData.map((_, i) => (
              <button
                key={i}
                onClick={() => handleDotClick(i)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${i === currentIndex
                    ? "bg-purple-500 scale-125"
                    : "bg-gray-600 hover:bg-gray-500"
                  }`}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
});

export default Gallery;
