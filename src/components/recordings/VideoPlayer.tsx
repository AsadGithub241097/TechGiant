import React, { useEffect, useRef, useState, useMemo, useCallback } from 'react';
import { X } from 'lucide-react';
import { Recording } from '../../services/recordingsService';

interface VideoPlayerProps {
  recording: Recording;
  onClose: () => void;
  onProgressUpdate?: (progress: number, watchedDuration: number, totalDuration: number) => void;
  userId?: string;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ 
  recording, 
  onClose, 
  onProgressUpdate,
}) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [progress, setProgress] = useState(0);
  const progressIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Extract YouTube video ID from URL (handles multiple formats)
  const getYouTubeVideoId = (url: string): string | null => {
    if (!url) return null;
    
    // Handle different YouTube URL formats
    const patterns = [
      /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/,
      /youtube\.com\/watch\?.*v=([^&\n?#]+)/,
      /youtu\.be\/([^&\n?#]+)/
    ];
    
    for (const pattern of patterns) {
      const match = url.match(pattern);
      if (match && match[1] && match[1].length === 11) {
        return match[1];
      }
    }
    
    return null;
  };

  // Memoize video ID and embed URL to prevent unnecessary recalculations
  const videoId = useMemo(() => getYouTubeVideoId(recording.youtubeUrl), [recording.youtubeUrl]);
  const embedUrl = useMemo(() => {
    if (!videoId) return null;
    return `https://www.youtube.com/embed/${videoId}?enablejsapi=1&origin=${window.location.origin}&autoplay=1`;
  }, [videoId]);

  // Memoize the progress update callback to prevent useEffect from re-running
  const stableOnProgressUpdate = useCallback((progress: number, watchedDuration: number, totalDuration: number) => {
    if (onProgressUpdate) {
      onProgressUpdate(progress, watchedDuration, totalDuration);
    }
  }, [onProgressUpdate]);

  useEffect(() => {
    // Track video progress using YouTube iframe API
    // Note: For full progress tracking, you'd need to implement YouTube IFrame API
    // This is a simplified version that tracks time spent on the page
    
    // Clear any existing interval
    if (progressIntervalRef.current) {
      clearInterval(progressIntervalRef.current);
      progressIntervalRef.current = null;
    }

    // Only start tracking if onProgressUpdate is provided
    if (!stableOnProgressUpdate) {
      return;
    }

    // Simulate progress tracking (in production, use YouTube IFrame API)
    let watchedTime = 0;
    const estimatedTotalDuration = 600; // 10 minutes default

    progressIntervalRef.current = setInterval(() => {
      watchedTime += 1; // Increment by 1 second
      const newProgress = Math.min((watchedTime / estimatedTotalDuration) * 100, 100);
      setProgress(newProgress);
      
      // Update progress every 5 seconds
      if (watchedTime % 5 === 0) {
        stableOnProgressUpdate(newProgress, watchedTime, estimatedTotalDuration);
      }
    }, 1000);

    return () => {
      if (progressIntervalRef.current) {
        clearInterval(progressIntervalRef.current);
        progressIntervalRef.current = null;
      }
    };
  }, [stableOnProgressUpdate]); // Only depend on the stable callback

  if (!embedUrl) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4">
        <div className="w-full max-w-md rounded-2xl border border-white/10 bg-navBg p-8">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-bold text-white">Invalid Video URL</h3>
            <button
              onClick={onClose}
              className="text-white hover:text-gray-300 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
          <p className="text-white mb-4">The provided YouTube URL is invalid.</p>
          <button
            onClick={onClose}
            className="w-full bg-gray-800 hover:bg-gray-700 text-white py-2 px-4 rounded-lg transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 p-4">
      <div className="w-full max-w-6xl overflow-hidden rounded-2xl border border-white/10 bg-navBg shadow-2xl shadow-carousel2/10">
        <div className="flex items-center justify-between border-b border-white/10 p-4 sm:p-5">
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-white">{recording.title}</h3>
            {recording.description && (
              <p className="text-sm text-gray-300 mt-1">{recording.description}</p>
            )}
          </div>
          <button
            onClick={onClose}
            className="ml-4 text-white hover:text-gray-300 transition-colors p-2"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Video Container */}
        <div className="relative bg-black" style={{ paddingBottom: '56.25%' }}>
          {embedUrl && (
            <iframe
              key={videoId} // Key prevents iframe reload on re-renders
              ref={iframeRef}
              src={embedUrl}
              className="absolute top-0 left-0 w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              title={recording.title}
            />
          )}
        </div>

        {/* Progress Bar */}
        {onProgressUpdate && (
          <div className="border-t border-white/10 p-4 sm:p-5">
            <div className="flex items-center space-x-4">
              <div className="flex-1">
                <div className="h-2 w-full rounded-full bg-white/10">
                  <div
                    className="h-2 rounded-full bg-gradient-to-r from-carousel2 to-carousel3 transition-all duration-300"
                    style={{ width: `${progress}%` }}
                  />
                </div>
                <div className="flex justify-between text-xs text-gray-400 mt-1">
                  <span>{Math.round(progress)}% Complete</span>
                  <span>{progress >= 90 ? 'Completed' : 'In Progress'}</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default VideoPlayer;
