import React from 'react';
import clsx from 'clsx';
import './homeSectionBlur.css';

interface HomeSectionBlurProps {
  children: React.ReactNode;
  className?: string;
  /** Full width — no side margin (e.g. carousel) */
  flush?: boolean;
  /** Lighter panel for hero intro text */
  hero?: boolean;
}

const HomeSectionBlur: React.FC<HomeSectionBlurProps> = ({
  children,
  className,
  flush = false,
  hero = false,
}) => (
  <div
    className={clsx(
      'home-section-blur',
      flush && 'home-section-blur--flush',
      hero && 'home-section-blur--hero',
      className
    )}
  >
    {children}
  </div>
);

export default HomeSectionBlur;
