import React from 'react';

interface SkeletonProps {
  className?: string;
  variant?: 'rectangular' | 'circular' | 'text';
  width?: string | number;
  height?: string | number;
}

export const Skeleton: React.FC<SkeletonProps> = ({
  className = '',
  variant = 'rectangular',
  width = '100%',
  height = '100%',
}) => {
  const baseClasses = 'bg-gray-300 animate-pulse';
  
  const variantClasses = {
    rectangular: 'rounded',
    circular: 'rounded-full',
    text: 'rounded-sm'
  };

  const style = {
    width: typeof width === 'number' ? `${width}px` : width,
    height: typeof height === 'number' ? `${height}px` : height,
  };

  return (
    <div
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
      style={style}
    />
  );
};

// Specialized skeleton components
export const ImageSkeleton: React.FC<{ 
  className?: string; 
  aspectRatio?: string;
  width?: string | number;
  height?: string | number;
}> = ({ 
  className = '', 
  aspectRatio = 'aspect-video',
  width = '100%',
  height 
}) => {
  return (
    <div className={`${aspectRatio} ${className}`} style={{ width: typeof width === 'number' ? `${width}px` : width }}>
      <Skeleton 
        className="w-full h-full" 
        height={height}
      />
    </div>
  );
};

export const VideoSkeleton: React.FC<{ 
  className?: string;
  width?: string | number;
  height?: string | number;
}> = ({ 
  className = '',
  width = '100%',
  height = '200px'
}) => {
  return (
    <div className={`relative ${className}`}>
      <Skeleton 
        width={width}
        height={height}
        className="rounded-lg"
      />
      {/* Play button skeleton */}
      <div className="absolute inset-0 flex items-center justify-center">
        <Skeleton 
          variant="circular"
          width={60}
          height={60}
          className="opacity-70"
        />
      </div>
    </div>
  );
};

export const CardSkeleton: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <div className={`p-4 border rounded-lg ${className}`}>
      <Skeleton height={200} className="mb-4" />
      <Skeleton height={20} className="mb-2" />
      <Skeleton height={16} width="80%" className="mb-2" />
      <Skeleton height={16} width="60%" />
    </div>
  );
};

export const AvatarSkeleton: React.FC<{ 
  size?: number;
  className?: string;
}> = ({ 
  size = 40,
  className = ''
}) => {
  return (
    <Skeleton 
      variant="circular"
      width={size}
      height={size}
      className={className}
    />
  );
};
