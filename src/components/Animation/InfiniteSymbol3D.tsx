import React, { useEffect, useRef } from 'react';

interface InfiniteSymbol3DProps {
  size?: number;
  rotationSpeed?: number;
  color?: string;
  opacity?: number;
  className?: string;
}

export const InfiniteSymbol3D: React.FC<InfiniteSymbol3DProps> = ({
  size = 400,
  rotationSpeed = 0.5,
  color = '#763CAC',
  opacity = 0.3,
  className = '',
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  const rotationRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) {
      console.log('Canvas not found');
      return;
    }

    const ctx = canvas.getContext('2d');
    if (!ctx) {
      console.log('Canvas context not found');
      return;
    }

    console.log('Canvas initialized with size:', size);

    // Set canvas size
    canvas.width = size;
    canvas.height = size;

    const centerX = size / 2;
    const centerY = size / 2;
    const radius = size * 0.3;

    const drawInfiniteSymbol = (rotation: number) => {
      // Clear canvas
      ctx.clearRect(0, 0, size, size);

      // Set up gradient for 3D effect
      const gradient = ctx.createRadialGradient(
        centerX, centerY, 0,
        centerX, centerY, radius * 2
      );
      gradient.addColorStop(0, color);
      gradient.addColorStop(0.5, color + '80');
      gradient.addColorStop(1, color + '20');

      ctx.strokeStyle = gradient;
      ctx.lineWidth = size * 0.02;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';

      // Draw the infinite symbol (∞) with 3D effect
      ctx.save();
      ctx.translate(centerX, centerY);
      ctx.rotate((rotation * Math.PI) / 180);

      // Create the infinite symbol path
      ctx.beginPath();
      
      // Left loop
      ctx.arc(-radius * 0.5, 0, radius * 0.8, 0, 2 * Math.PI);
      
      // Right loop
      ctx.arc(radius * 0.5, 0, radius * 0.8, 0, 2 * Math.PI);
      
      ctx.stroke();

      // Add 3D shadow effect
      ctx.save();
      ctx.translate(2, 2);
      ctx.globalAlpha = 0.3;
      ctx.strokeStyle = '#000';
      ctx.stroke();
      ctx.restore();

      // Add highlight effect
      ctx.save();
      ctx.translate(-1, -1);
      ctx.globalAlpha = 0.6;
      ctx.strokeStyle = '#fff';
      ctx.lineWidth = size * 0.01;
      ctx.stroke();
      ctx.restore();

      // Add animated trail effect
      const trailLength = 20;
      for (let i = 0; i < trailLength; i++) {
        const trailRotation = rotation - (i * 2);
        const trailOpacity = (trailLength - i) / trailLength * 0.1;
        
        ctx.save();
        ctx.translate(centerX, centerY);
        ctx.rotate((trailRotation * Math.PI) / 180);
        ctx.globalAlpha = trailOpacity;
        ctx.strokeStyle = color;
        ctx.lineWidth = size * 0.015;
        
        ctx.beginPath();
        ctx.arc(-radius * 0.5, 0, radius * 0.8, 0, 2 * Math.PI);
        ctx.arc(radius * 0.5, 0, radius * 0.8, 0, 2 * Math.PI);
        ctx.stroke();
        ctx.restore();
      }

      ctx.restore();
    };

    const animate = () => {
      rotationRef.current += rotationSpeed;
      drawInfiniteSymbol(rotationRef.current);
      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [size, rotationSpeed, color]);

  return (
    <div className={`absolute inset-0 w-full h-full ${className}`} style={{ opacity, zIndex: 1 }}>
      <canvas
        ref={canvasRef}
        className="w-full h-full"
        style={{
          pointerEvents: 'none',
        }}
      />
      {/* Fallback for debugging */}
      <div className="absolute inset-0 flex items-center justify-center text-white text-xs">
        Infinite Symbol {size}
      </div>
    </div>
  );
};

export default InfiniteSymbol3D;
