import React, {
  memo,
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { gsap } from "gsap";

export interface PortfolioCarouselSlide {
  id: string | number;
  title: string;
  subtitle: string;
  image: string;
  link: string;
  doodle?: React.ComponentType;
}

interface GalleryProps {
  slides: PortfolioCarouselSlide[];
}

const TRANSITION_DURATION = 1;
const EASE = "expo.inOut";

const wrapIndex = (value: number, total: number) =>
  ((value % total) + total) % total;

const shortestDistance = (from: number, to: number, total: number) => {
  let diff = from - to;
  if (diff > total / 2) diff -= total;
  if (diff < -total / 2) diff += total;
  return diff;
};

const Gallery: React.FC<GalleryProps> = memo(({ slides }) => {
  const total = slides.length;

  const [displayIndex, setDisplayIndex] = useState(0);
  const [incomingIndex, setIncomingIndex] = useState<number | null>(null);

  const viewportRef = useRef<HTMLDivElement | null>(null);
  const slideRefs = useRef<Array<HTMLDivElement | null>>([]);
  const imageLayerRefs = useRef<Array<HTMLDivElement | null>>([]);

  const currentTitleRef = useRef<HTMLDivElement | null>(null);
  const incomingTitleRef = useRef<HTMLDivElement | null>(null);
  const currentNumberRef = useRef<HTMLSpanElement | null>(null);
  const incomingNumberRef = useRef<HTMLSpanElement | null>(null);

  const activeIndexRef = useRef(0);
  const isAnimatingRef = useRef(false);
  const pointerStartXRef = useRef<number | null>(null);

  const applySlideTargets = useCallback(
    (
      targetIndex: number,
      options: {
        animate: boolean;
        fromIndex: number;
        direction: number;
        tl?: gsap.core.Timeline;
      },
    ) => {
      if (!viewportRef.current) return;

      const stageWidth = viewportRef.current.clientWidth;
      const offset = Math.min(Math.max(stageWidth * 0.54, 300), 560);

      for (let i = 0; i < total; i += 1) {
        const slideEl = slideRefs.current[i];
        const imageEl = imageLayerRefs.current[i];
        if (!slideEl) continue;

        const dist = shortestDistance(i, targetIndex, total);
        const absDist = Math.abs(dist);

        const x = dist * offset;
        const scale = absDist === 0 ? 1 : absDist === 1 ? 0.8 : 0.66;
        const opacity = absDist === 0 ? 1 : absDist === 1 ? 0.52 : 0;
        const zIndex = absDist === 0 ? 40 : absDist === 1 ? 30 : 10;
        const phaseOffset =
          i === options.fromIndex
            ? 0
            : i === targetIndex
              ? 0.06
              : i === wrapIndex(targetIndex + options.direction, total)
                ? 0.14
                : 0;

        slideEl.style.zIndex = String(zIndex);
        slideEl.style.pointerEvents = absDist <= 1 ? "auto" : "none";

        if (options.animate && options.tl) {
          options.tl.to(
            slideEl,
            {
              x,
              scale,
              opacity,
              duration: TRANSITION_DURATION,
              ease: EASE,
              overwrite: "auto",
            },
            phaseOffset,
          );
        } else {
          gsap.set(slideEl, { x, scale, opacity });
        }

        if (!imageEl) continue;

        if (options.animate && options.tl) {
          if (i === targetIndex) {
            options.tl.fromTo(
              imageEl,
              { x: options.direction * 28 },
              {
                x: 0,
                duration: TRANSITION_DURATION,
                ease: EASE,
                overwrite: "auto",
              },
              phaseOffset,
            );
          } else {
            options.tl.to(
              imageEl,
              {
                x: 0,
                duration: TRANSITION_DURATION,
                ease: EASE,
                overwrite: "auto",
              },
              phaseOffset,
            );
          }
        } else {
          gsap.set(imageEl, { x: 0 });
        }
      }
    },
    [total],
  );

  useLayoutEffect(() => {
    if (total < 1) return;
    applySlideTargets(activeIndexRef.current, {
      animate: false,
      fromIndex: activeIndexRef.current,
      direction: 1,
    });
  }, [applySlideTargets, total]);

  useEffect(() => {
    const onResize = () => {
      if (total < 1) return;
      applySlideTargets(activeIndexRef.current, {
        animate: false,
        fromIndex: activeIndexRef.current,
        direction: 1,
      });
    };

    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [applySlideTargets, total]);

  useLayoutEffect(() => {
    if (currentTitleRef.current) {
      gsap.set(currentTitleRef.current, { clearProps: "transform,opacity" });
    }
    if (currentNumberRef.current) {
      gsap.set(currentNumberRef.current, { clearProps: "transform,opacity" });
    }
  }, [displayIndex]);

  const navigateTo = useCallback(
    (nextIndex: number) => {
      if (total < 2 || isAnimatingRef.current) return;

      const currentIndex = activeIndexRef.current;
      if (nextIndex === currentIndex) return;
      const direction = shortestDistance(nextIndex, currentIndex, total) > 0 ? 1 : -1;

      isAnimatingRef.current = true;
      setIncomingIndex(nextIndex);

      requestAnimationFrame(() => {
        const tl = gsap.timeline({
          defaults: { ease: EASE },
          onComplete: () => {
            activeIndexRef.current = nextIndex;
            setDisplayIndex(nextIndex);
            setIncomingIndex(null);
            isAnimatingRef.current = false;
          },
        });

        applySlideTargets(nextIndex, {
          animate: true,
          fromIndex: currentIndex,
          direction,
          tl,
        });

        if (currentTitleRef.current) {
          tl.to(
            currentTitleRef.current,
            {
              y: -40,
              opacity: 0,
              duration: 0.5,
              ease: EASE,
            },
            0,
          );
        }

        if (incomingTitleRef.current) {
          tl.fromTo(
            incomingTitleRef.current,
            { y: 40, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.62,
              ease: EASE,
            },
            0.16,
          );
        }

        if (currentNumberRef.current) {
          tl.to(
            currentNumberRef.current,
            {
              y: -26,
              opacity: 0,
              duration: 0.45,
              ease: EASE,
            },
            0.02,
          );
        }

        if (incomingNumberRef.current) {
          tl.fromTo(
            incomingNumberRef.current,
            { y: 26, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.55,
              ease: EASE,
            },
            0.2,
          );
        }
      });
    },
    [applySlideTargets, total],
  );

  const navigate = useCallback(
    (direction: number) => {
      const currentIndex = activeIndexRef.current;
      navigateTo(wrapIndex(currentIndex + direction, total));
    },
    [navigateTo, total],
  );

  const onWheel = useCallback(
    (event: React.WheelEvent<HTMLDivElement>) => {
      if (Math.abs(event.deltaY) < 12) return;
      event.preventDefault();
      navigate(event.deltaY > 0 ? 1 : -1);
    },
    [navigate],
  );

  const onPointerDown = useCallback(
    (event: React.PointerEvent<HTMLDivElement>) => {
      pointerStartXRef.current = event.clientX;
      event.currentTarget.setPointerCapture(event.pointerId);
    },
    [],
  );

  const onPointerUp = useCallback(
    (event: React.PointerEvent<HTMLDivElement>) => {
      const startX = pointerStartXRef.current;
      pointerStartXRef.current = null;
      if (startX === null) return;
      const delta = event.clientX - startX;
      if (Math.abs(delta) > 48) {
        navigate(delta < 0 ? 1 : -1);
      }
    },
    [navigate],
  );

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowRight") {
        event.preventDefault();
        navigate(1);
      } else if (event.key === "ArrowLeft") {
        event.preventDefault();
        navigate(-1);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [navigate]);

  const activeSlide = slides[displayIndex];
  const incomingSlide = useMemo(
    () => (incomingIndex === null ? null : slides[incomingIndex]),
    [incomingIndex, slides],
  );

  if (total === 0) return null;

  return (
    <section className="relative w-full overflow-hidden py-8 sm:py-10 lg:py-12">
      <div className="relative z-30 flex items-center justify-between px-4 text-[10px] uppercase tracking-[0.35em] text-carousel3/70 sm:px-6 lg:px-8">
        <span>Core values</span>
      </div>

      <div
        ref={viewportRef}
        className="relative z-20 mt-4 h-[70vh] touch-pan-y select-none overflow-hidden px-4 sm:h-[80vh] sm:px-6 lg:h-[88vh] lg:px-8"
            onWheel={onWheel}
            onPointerDown={onPointerDown}
            onPointerUp={onPointerUp}
            onPointerCancel={() => {
              pointerStartXRef.current = null;
            }}
          >
            <span
              ref={currentNumberRef}
              className="pointer-events-none absolute left-[12%] top-[8%] z-20 select-none font-bold leading-none text-white/25"
              style={{ fontSize: "clamp(7rem, 16vw, 13rem)" }}
              aria-hidden
            >
              {String(displayIndex + 1).padStart(2, "0")}
            </span>
            {incomingSlide && (
              <span
                ref={incomingNumberRef}
                className="pointer-events-none absolute left-[12%] top-[8%] z-20 select-none font-bold leading-none text-white/25 opacity-0"
                style={{ fontSize: "clamp(7rem, 16vw, 13rem)" }}
                aria-hidden
              >
                {String(incomingIndex! + 1).padStart(2, "0")}
              </span>
            )}

            <div
              className="pointer-events-none absolute inset-y-0 left-0 z-[35] w-[42%] bg-gradient-to-r from-[#1a1424]/35 via-transparent to-transparent"
              aria-hidden
            />

            {slides.map((slide, i) => {
              const Doodle = slide.doodle;
              return (
                <div
                  key={slide.id}
                  ref={(el) => {
                    slideRefs.current[i] = el;
                  }}
                  className="absolute left-1/2 top-1/2 h-[58%] w-[56%] min-w-[220px] max-w-[720px] -translate-x-1/2 -translate-y-1/2 will-change-transform"
                >
                  <div
                    ref={(el) => {
                      imageLayerRefs.current[i] = el;
                    }}
                    className={`relative h-full w-full overflow-hidden will-change-transform ${
                      Doodle ? "" : "shadow-2xl"
                    }`}
                  >
                    {Doodle ? (
                      <Doodle />
                    ) : (
                      <img
                        src={slide.image}
                        alt={slide.title}
                        loading={i === 0 ? "eager" : "lazy"}
                        draggable={false}
                        className="h-full w-full object-cover object-center contrast-[0.96] saturate-[0.92]"
                      />
                    )}
                  </div>
                </div>
              );
            })}

            <div className="absolute left-[8.5%] top-[33%] z-50 w-[42%] max-w-[470px] sm:w-[38%]">
              <div ref={currentTitleRef}>
                <h2 className="text-4xl font-bold leading-[0.9] tracking-tight text-white sm:text-5xl lg:text-6xl">
                  {activeSlide.title}
                </h2>
                <p className="mt-4 max-w-md text-sm leading-relaxed text-zinc-300 sm:text-base lg:text-lg">
                  {activeSlide.subtitle}
                </p>
              </div>

              {incomingSlide && (
                <div
                  ref={incomingTitleRef}
                  className="pointer-events-none absolute inset-0 opacity-0"
                >
                  <h2 className="text-4xl font-bold leading-[0.9] tracking-tight text-white sm:text-5xl lg:text-6xl">
                    {incomingSlide.title}
                  </h2>
                  <p className="mt-4 max-w-md text-sm leading-relaxed text-zinc-300 sm:text-base lg:text-lg">
                    {incomingSlide.subtitle}
                  </p>
                </div>
              )}
            </div>
          </div>

      <div className="relative z-30 mt-6 flex items-center gap-3 px-4 sm:px-6 md:ml-[8%] lg:px-8">
            {slides.map((slide, i) => (
              <button
                key={`indicator-${slide.id}`}
                type="button"
                onClick={() => navigateTo(i)}
                aria-label={`Go to ${slide.title}`}
                className={`h-[2px] rounded-full transition-all duration-300 ${
                  i === displayIndex
                    ? "w-12 bg-[#ef4f5e]"
                    : "w-9 bg-zinc-600 hover:bg-zinc-400"
                }`}
              />
        ))}
      </div>
    </section>
  );
});

Gallery.displayName = "Gallery";

export default Gallery;
