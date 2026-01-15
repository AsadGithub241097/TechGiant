import React from 'react';

interface SimpleInfiniteSymbolProps {
  size?: number;
  color?: string;
  className?: string;
}

export const SimpleInfiniteSymbol: React.FC<SimpleInfiniteSymbolProps> = ({
  size = 100,
  color = '#763CAC',
  className = '',
}) => {
  return (
    <div className={`${className}`} style={{ width: size, height: size }}>
      <svg
        viewBox="0 0 100 100"
        className="w-full h-full animate-spin"
        style={{ animationDuration: '3s' }}
      >
        {/* Left loop of infinity symbol */}
        <circle
          cx="35"
          cy="50"
          r="15"
          fill="none"
          stroke={color}
          strokeWidth="3"
          opacity="0.8"
        />
        
        {/* Right loop of infinity symbol */}
        <circle
          cx="65"
          cy="50"
          r="15"
          fill="none"
          stroke={color}
          strokeWidth="3"
          opacity="0.8"
        />
        
        {/* Connecting lines to create infinity shape */}
        <path
          d="M 20 50 Q 35 35 50 50 Q 35 65 20 50"
          fill="none"
          stroke={color}
          strokeWidth="2"
          opacity="0.6"
        />
        <path
          d="M 80 50 Q 65 35 50 50 Q 65 65 80 50"
          fill="none"
          stroke={color}
          strokeWidth="2"
          opacity="0.6"
        />
      </svg>
    </div>
  );
};

export default SimpleInfiniteSymbol;





