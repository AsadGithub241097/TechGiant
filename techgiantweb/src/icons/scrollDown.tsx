import React from 'react';
const ScrollDown: React.FC = () => {
  const size = 80;
  const speed = 3;
  const peakOpacity = 0.7;
  const borderSize = size / 3;
  const keyframes = `
    @keyframes arrows {
      0% {
        border-left: ${borderSize}px solid rgba(255,255,255,0);
        border-bottom: ${borderSize}px solid rgba(255,255,255,0);
        transform: translate(${size / -6}px, ${(size * 4) / -6}px) rotate(-45deg);
      }
      10%, 90% {
        border-left: ${borderSize}px solid rgba(255,255,255,0);
        border-bottom: ${borderSize}px solid rgba(255,255,255,0);
      }
      50% {
        border-left: ${borderSize}px solid rgba(255,255,255,${peakOpacity});
        border-bottom: ${borderSize}px solid rgba(255,255,255,${peakOpacity});
        transform: translate(${size / -6}px, 0px) rotate(-45deg);
      }
      100% {
        border-left: ${borderSize}px solid rgba(255,255,255,0);
        border-bottom: ${borderSize}px solid rgba(255,255,255,0);
        transform: translate(${size / -6}px, ${(size * 4) / 6}px) rotate(-45deg);
      }
    }
  `;

  return (
    <div className="w-full relative">
      <style>{keyframes}</style>
      
      <div 
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
        style={{
          width: `${size}px`,
          height: `${size}px`,
        }}
      >
        {/* Before pseudo-element */}
        <div
          className="absolute w-full h-full"
          style={{
            borderLeft: `${borderSize}px solid rgba(255,255,255,${peakOpacity})`,
            borderBottom: `${borderSize}px solid rgba(255,255,255,${peakOpacity})`,
            transform: `translate(${size / 3}px, ${(size * 4) / 3}px) rotate(-45deg)`,
            animation: `arrows ${speed}s linear infinite`,
          }}
        />
        
        {/* After pseudo-element */}
        <div
          className="absolute w-full h-full"
          style={{
            borderLeft: `${borderSize}px solid rgba(255,255,255,${peakOpacity})`,
            borderBottom: `${borderSize}px solid rgba(255,255,255,${peakOpacity})`,
            transform: `translate(${(size * 2) / 3}px, 0px) rotate(-45deg)`,
            animation: `arrows ${speed}s linear infinite ${speed / -2}s`,
          }}
        />
      </div>
    </div>
  );
};

export default ScrollDown;