import React, { useState } from 'react';
import { useVideoLoader } from '../../hooks/useImageLoader';
import { VideoSkeleton } from './skeleton';

interface LoadingVideoProps extends React.VideoHTMLAttributes<HTMLVideoElement> {
  src: string;
  skeletonClassName?: string;
  fallbackSrc?: string;
  onLoadComplete?: () => void;
  onError?: () => void;
  poster?: string;
}

export const LoadingVideo: React.FC<LoadingVideoProps> = ({
  src,
  className = '',
  skeletonClassName = '',
  fallbackSrc,
  onLoadComplete,
  onError,
  poster,
  ...props
}) => {
  const { isLoading, hasError } = useVideoLoader(src);
  const [videoError, setVideoError] = useState(false);

  React.useEffect(() => {
    if (!isLoading && !hasError && onLoadComplete) {
      onLoadComplete();
    }
    if ((hasError || videoError) && onError) {
      onError();
    }
  }, [isLoading, hasError, videoError, onLoadComplete, onError]);

  const handleVideoError = () => {
    setVideoError(true);
  };

  if (isLoading) {
    return (
      <VideoSkeleton 
        className={skeletonClassName}
        width={props.width}
        height={props.height}
      />
    );
  }

  if ((hasError || videoError) && fallbackSrc) {
    return (
      <video
        {...props}
        src={fallbackSrc}
        className={className}
        onError={handleVideoError}
        poster={poster}
      />
    );
  }

  if (hasError || videoError) {
    return (
      <div className={`bg-gray-200 dark:bg-gray-700 flex items-center justify-center ${className}`}>
        <div className="text-gray-500 dark:text-gray-400 text-center p-4">
          <svg className="w-8 h-8 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
          </svg>
          <p className="text-xs">Failed to load video</p>
        </div>
      </div>
    );
  }

  return (
    <video
      {...props}
      src={src}
      className={`transition-opacity duration-300 ${className}`}
      onError={handleVideoError}
      poster={poster}
    />
  );
};
