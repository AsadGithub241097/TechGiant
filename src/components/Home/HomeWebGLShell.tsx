import React, { useEffect, useRef } from 'react';
import { initWebGLDonutScene } from './webglDonutScene';
import './webglDonutHero.css';

interface HomeWebGLShellProps {
  children: React.ReactNode;
}

const HomeWebGLShell: React.FC<HomeWebGLShellProps> = ({ children }) => {
  const shellRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sceneRef = useRef<ReturnType<typeof initWebGLDonutScene> | null>(null);
  const heroActiveRef = useRef(true);

  useEffect(() => {
    const canvas = canvasRef.current;
    const shell = shellRef.current;
    const stage = stageRef.current;
    if (!canvas || !shell || !stage) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const updateStageVisibility = () => {
      const rect = shell.getBoundingClientRect();
      const inView = rect.bottom > 0 && rect.top < window.innerHeight;
      heroActiveRef.current = inView;
      stage.classList.toggle('webgl-hero__stage--hidden', !inView);
      sceneRef.current?.setPaused(!inView);
    };

    if (!prefersReducedMotion) {
      sceneRef.current = initWebGLDonutScene(canvas, { scrollHost: shell });
    }

    const onMouseMove = (e: MouseEvent) => {
      if (!heroActiveRef.current) return;
      sceneRef.current?.onMouseMove(
        e.clientX,
        e.clientY,
        window.innerWidth,
        window.innerHeight
      );
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('scroll', updateStageVisibility, { passive: true });
    window.addEventListener('resize', updateStageVisibility);
    updateStageVisibility();

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('scroll', updateStageVisibility);
      window.removeEventListener('resize', updateStageVisibility);
      sceneRef.current?.dispose();
      sceneRef.current = null;
    };
  }, []);

  return (
    <div ref={shellRef} className="home-webgl-shell">
      <div ref={stageRef} className="webgl-hero__stage" aria-hidden>
        <canvas ref={canvasRef} className="webgl-hero__canvas" />
        <div className="webgl-hero__scanlines" />
        <div className="webgl-hero__glow" />
        <div className="webgl-hero__vignette" />
      </div>

      <div className="home-webgl-shell__content">{children}</div>
    </div>
  );
};

export default HomeWebGLShell;
