import React, { useEffect, useRef } from 'react';
import { createTimeline, scrambleText, stagger } from 'animejs';
import './loginScrambleIntro.css';

const LoginScrambleIntro: React.FC = () => {
  const rootRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    const bg = bgRef.current;
    if (!root || !bg) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      root.classList.add('login-scramble-intro--static');
      const center = root.querySelector('.login-scramble-center');
      if (center) center.textContent = 'Tech Giant';
      return;
    }

    const slide1 = root.querySelector('.login-scramble-intro__slide--intro');
    const slide2 = root.querySelector('.login-scramble-intro__slide--features');
    const slide3 = root.querySelector('.login-scramble-intro__slide--outro');
    const center = root.querySelector('.login-scramble-center');
    const outer = root.querySelectorAll('.login-scramble-intro__slide--intro p:not(.login-scramble-center)');
    const features = root.querySelectorAll('.login-scramble-intro__slide--features p');
    const outro = root.querySelector('.login-scramble-intro__slide--outro p');

    if (!slide1 || !slide2 || !slide3 || !center || !outro) return;

    const tl = createTimeline({ loop: true });

    tl.add(slide1, {
      opacity: { to: 1, duration: 250, ease: 'linear' },
      scale: [{ from: 0.75, to: 1, duration: 1500, ease: 'inOut(3.5)' }],
      ease: 'inOut(3)',
    });

    tl.add(center, {
      scale: { from: 3 },
      color: { from: 'var(--tg-yellow-1)', to: 'var(--tg-orange-1)' },
      innerHTML: scrambleText({
        override: ' ',
        ease: 'inQuad',
        duration: 500,
        from: 'center',
        cursor: '░▒▓█',
      }),
    }, '<<');

    tl.add(bg, {
      background: 'var(--tg-red-5)',
    }, '<<+=50');

    tl.add(outer, {
      scale: { from: 0.75 },
      color: { to: 'var(--tg-red-1)' },
      innerHTML: scrambleText({
        override: ' ',
        from: 'center',
        duration: 500,
        revealDelay: 250,
        cursor: '░▒▓',
        perturbation: 0.25,
      }),
    }, stagger([250, 750], { grid: true, from: 'center', ease: 'out(3)', start: '<<' }));

    tl.add(outer, {
      innerHTML: scrambleText({
        text: '',
        override: false,
        from: 'center',
        ease: 'outQuad',
        reversed: true,
        duration: 800,
        cursor: '░▒▓',
      }),
    }, '<+=150');

    tl.add(bg, {
      background: 'var(--tg-black-1)',
    }, '<-=600');

    tl.add(center, {
      scale: 1.5,
      color: { to: 'var(--tg-lime-1)' },
      ease: 'inOutExpo',
      duration: 1500,
      innerHTML: scrambleText({
        text: 'Tech Giant',
        ease: 'inQuad',
        override: false,
        from: 'center',
        duration: 1000,
        perturbation: 0.25,
      }),
    }, '<<');

    tl.add(center, {
      scale: 1,
      color: 'var(--tg-white-1)',
      ease: 'inOutExpo',
      duration: 1150,
      innerHTML: scrambleText({
        override: false,
        text: 'Your secure learning portal.',
        from: 'right',
        duration: 950,
        settleDuration: 500,
        ease: 'inOut',
      }),
    }, '<+=250');

    tl.add(center, {
      innerHTML: scrambleText({
        text: '',
        override: false,
        from: 'random',
        reversed: true,
        duration: 850,
        perturbation: 0.5,
      }),
    }, '<+=500');

    tl.set(slide2, { opacity: 1 }, '<<');

    tl.add(features, {
      innerHTML: scrambleText({
        override: ' ',
        from: 'center',
        duration: 500,
        revealDelay: 250,
        cursor: '░▒▓',
        perturbation: 0.5,
      }),
    }, stagger([0, 1000], { grid: true, from: 'center', ease: 'out(3)', start: '<<+=250', reversed: true }));

    tl.add(features, {
      scale: [0.8, 1],
    }, stagger([0, 150], { grid: true, from: 'center', ease: 'out(3)', start: '<<', reversed: true }));

    tl.add(features, {
      innerHTML: scrambleText({
        text: '&nbsp;',
        override: false,
        from: 'center',
        reversed: true,
        duration: 500,
        cursor: '░▒▓',
      }),
    }, stagger([0, 750], { grid: true, from: 'center', ease: 'out(3)', start: '<+=500' }));

    tl.set(slide3, { opacity: 1 }, '<<');

    tl.add(outro, {
      color: 'var(--tg-white-1)',
      scale: 1.5,
      ease: 'inOutExpo',
      innerHTML: scrambleText({
        override: ' ',
        from: 'center',
        settleDuration: 500,
        revealRate: 33,
        perturbation: 0.2,
      }),
    }, '-=250');

    tl.add(outro, {
      color: { to: 'var(--tg-orange-1)', duration: 750 },
      ease: 'inOutExpo',
      duration: 1250,
      innerHTML: scrambleText({
        text: 'tech-giant.in',
        override: false,
        from: 'right',
        cursor: '░▒▓',
        duration: 750,
        ease: 'inOut',
      }),
    }, '<+=750');

    tl.add(outro, {
      color: 'var(--tg-yellow-1)',
      scale: 2,
      ease: 'inOutExpo',
      duration: 750,
      innerHTML: scrambleText({
        text: ' ',
        chars: '#!%░▒▓_01',
        override: false,
        duration: 750,
        ease: 'out(2)',
        from: 'right',
      }),
    }, '<+=1000');

    tl.add(bg, {
      background: 'var(--tg-orange-5)',
      duration: 750,
    }, '<<');

    tl.init();

    return () => {
      tl.revert();
    };
  }, []);

  return (
    <div ref={rootRef} className="login-scramble-intro" aria-hidden="true">
      <div ref={bgRef} className="login-scramble-intro__bg" />
      <main className="login-scramble-intro__main">
        <div className="login-scramble-intro__slide login-scramble-intro__slide--intro">
          <div className="login-scramble-intro__row"><p>Welcome</p><p>Welcome</p></div>
          <div className="login-scramble-intro__row"><p>Welcome</p><p>Welcome</p><p>Welcome</p></div>
          <div className="login-scramble-intro__row"><p>Welcome</p><p>Welcome</p><p>Welcome</p><p>Welcome</p></div>
          <div className="login-scramble-intro__row">
            <p>Welcome</p>
            <p>Welcome</p>
            <p className="login-scramble-center">Welcome</p>
            <p>Welcome</p>
            <p>Welcome</p>
          </div>
          <div className="login-scramble-intro__row"><p>Welcome</p><p>Welcome</p><p>Welcome</p><p>Welcome</p></div>
          <div className="login-scramble-intro__row"><p>Welcome</p><p>Welcome</p><p>Welcome</p></div>
          <div className="login-scramble-intro__row"><p>Welcome</p><p>Welcome</p></div>
        </div>

        <div className="login-scramble-intro__slide login-scramble-intro__slide--features login-scramble-intro__features">
          <div className="login-scramble-intro__row">
            <p data-color="3">Cyber Security</p>
            <p data-color="8">VAPT Testing</p>
          </div>
          <div className="login-scramble-intro__row">
            <p data-color="14">Web Development</p>
            <p data-color="0">Cloud Solutions</p>
            <p data-color="6">AI &amp; ML</p>
          </div>
          <div className="login-scramble-intro__row">
            <p data-color="3">Digital Marketing</p>
            <p data-color="16">Secure Portal</p>
            <p data-color="4">Training</p>
            <p data-color="1">Expert Support</p>
          </div>
          <div className="login-scramble-intro__row">
            <p data-color="11">LMS Access</p>
            <p data-color="5">Recordings</p>
            <p data-color="10">Live Sessions</p>
          </div>
          <div className="login-scramble-intro__row">
            <p data-color="13">Innovation</p>
            <p data-color="2">Growth</p>
          </div>
        </div>

        <div className="login-scramble-intro__slide login-scramble-intro__slide--outro">
          <p>tech-giant.in</p>
        </div>
      </main>
    </div>
  );
};

export default LoginScrambleIntro;
