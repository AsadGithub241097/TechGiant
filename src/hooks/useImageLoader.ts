import { useState, useEffect } from 'react';

export const useImageLoader = (src: string) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    if (!src) {
      setIsLoading(false);
      setHasError(true);
      return;
    }

    setIsLoading(true);
    setHasError(false);

    const img = new Image();
    
    img.onload = () => {
      setIsLoading(false);
      setHasError(false);
    };
    
    img.onerror = () => {
      setIsLoading(false);
      setHasError(true);
    };
    
    img.src = src;

    return () => {
      img.onload = null;
      img.onerror = null;
    };
  }, [src]);

  return { isLoading, hasError };
};

export const useVideoLoader = (src: string) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    if (!src) {
      setIsLoading(false);
      setHasError(true);
      return;
    }

    setIsLoading(true);
    setHasError(false);

    const video = document.createElement('video');
    
    video.onloadeddata = () => {
      setIsLoading(false);
      setHasError(false);
    };
    
    video.onerror = () => {
      setIsLoading(false);
      setHasError(true);
    };
    
    video.src = src;

    return () => {
      video.onloadeddata = null;
      video.onerror = null;
    };
  }, [src]);

  return { isLoading, hasError };
};
