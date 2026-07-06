import React, { useEffect, useState } from 'react';
import gsap from 'gsap';
import './webglDonutHero.css';

const BRAND_LANGUAGES = [
  'テックジャイアント',
  'тех гигант',
  'टेक जायंट',
  'تك جاينت',
  '科技巨头',
  '테크 자이언트',
  'Τεκ Γκάιαντ',
  'டெக் ஜெயண்ட்',
  'เทคไจแอนต์',
  'টেক জায়ান্ট',
];

const FINAL_BRAND = 'TECH GIANT';
const TAGLINE = 'Empowering the future through innovative software solutions.';
const FLICKER_COUNT = 32;
const FLICKER_HOLD_MS = 9000;

const WebGLHeroContent: React.FC = () => {
  const [brandText, setBrandText] = useState(FINAL_BRAND);
  const [brandSettled, setBrandSettled] = useState(false);

  useEffect(() => {
    let cancelled = false;
    let timeoutId: ReturnType<typeof setTimeout>;

    const runFlickerCycle = () => {
      if (cancelled) return;

      let count = 0;
      setBrandSettled(false);

      const tick = () => {
        if (cancelled) return;

        if (count >= FLICKER_COUNT) {
          setBrandText(FINAL_BRAND);
          setBrandSettled(true);
          timeoutId = setTimeout(runFlickerCycle, FLICKER_HOLD_MS);
          return;
        }

        const next = BRAND_LANGUAGES[Math.floor(Math.random() * BRAND_LANGUAGES.length)];
        setBrandText(next);
        count += 1;
        timeoutId = setTimeout(tick, 40 + count * 9);
      };

      timeoutId = setTimeout(tick, 250);
    };

    runFlickerCycle();
    return () => {
      cancelled = true;
      clearTimeout(timeoutId);
    };
  }, []);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const entranceTl = gsap.timeline({ delay: prefersReducedMotion ? 0 : 0.4 });
    entranceTl
      .to('.webgl-hero__title', { opacity: 1, y: 0, duration: 1.0, ease: 'power3.out' })
      .to('.webgl-hero__meta', { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' }, '-=0.5')
      .to('.webgl-hero__cta', { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }, '-=0.4');

    return () => {
      entranceTl.kill();
    };
  }, []);

  const renderBrand = (text: string) =>
    text.split(' ').map((word, wordIndex) => {
      const chars = Array.from(word);
      const [first, ...rest] = chars;
      return (
        <span key={wordIndex} className="webgl-hero__title-word">
          <span className="webgl-hero__title-char-accent">{first}</span>
          {rest.join('')}
        </span>
      );
    });

  return (
    <section className="webgl-hero__intro" id="intro" aria-label="Tech Giant hero">
      <div className="webgl-hero__content webgl-hero__content--intro">
        <div className="webgl-hero__ring-anchor">
          <div className="webgl-hero__donut-slot">
            <h1
              className={`webgl-hero__title webgl-hero__title--in-ring ${brandSettled ? 'webgl-hero__title--settled' : 'webgl-hero__title--flicker'}`}
            >
              {renderBrand(brandText)}
            </h1>
          </div>
          <p className="webgl-hero__meta webgl-hero__meta--below-ring">{TAGLINE}</p>
        </div>

        <div className="webgl-hero__cta">
          <span className="webgl-hero__cta-label">Scroll to explore</span>
          <div className="webgl-hero__cta-arrow">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
              <path
                d="M8 2v12M3 9l5 5 5-5"
                stroke="currentColor"
                strokeWidth="1.3"
                strokeLinecap="round"
              />
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WebGLHeroContent;
