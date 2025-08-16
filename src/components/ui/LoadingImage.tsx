import React from 'react';
import { useImageLoader } from '../../hooks/useImageLoader';
import { ImageSkeleton } from './skeleton';

interface LoadingImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  skeletonClassName?: string;
  aspectRatio?: string;
  fallbackSrc?: string;
  onLoadComplete?: () => void;
  onError?: () => void;
}

export const LoadingImage: React.FC<LoadingImageProps> = ({
  src,
  alt,
  className = '',
  skeletonClassName = '',
  aspectRatio = 'aspect-auto',
  fallbackSrc,
  onLoadComplete,
  onError,
  ...props
}) => {
  const { isLoading, hasError } = useImageLoader(src);

  React.useEffect(() => {
    if (!isLoading && !hasError && onLoadComplete) {
      onLoadComplete();
    }
    if (hasError && onError) {
      onError();
    }
  }, [isLoading, hasError, onLoadComplete, onError]);

  if (isLoading) {
    return (
      <ImageSkeleton 
        className={skeletonClassName}
        aspectRatio={aspectRatio}
        width={props.width}
        height={props.height}
      />
    );
  }

  if (hasError && fallbackSrc) {
    return (
      <img
        {...props}
        src={fallbackSrc}
        alt={alt}
        className={className}
      />
    );
  }

  if (hasError) {
    return (
      <div className={`bg-gray-200 dark:bg-gray-700 flex items-center justify-center ${className}`}>
        <div className="text-gray-500 dark:text-gray-400 text-center p-4">
          <svg className="w-8 h-8 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <p className="text-xs">Failed to load image</p>
        </div>
      </div>
    );
  }

  return (
    <img
      {...props}
      src={src}
      alt={alt}
      className={`transition-opacity duration-300 ${className}`}
    />
  );
};
