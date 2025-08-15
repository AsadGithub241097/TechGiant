import { useEffect, useState } from 'react';

const MarketingPage = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    setIsVisible(true);
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 1;
      });
    }, 50);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className={`min-h-screen flex flex-col items-center justify-center bg-bgColor p-6 transition-opacity duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
      <div className="max-w-md w-full bg-white rounded-xl shadow-lg overflow-hidden p-8 transform transition-all duration-500 hover:scale-105">
        <div className="flex flex-col items-center">
          <div className="relative mb-6">
            <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center animate-pulse">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-12 w-12 text-blue-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <div className="absolute -inset-2 border-4 border-blue-200 rounded-full animate-spin-slow opacity-70"></div>
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2 transform transition-transform duration-700 hover:translate-x-1">
            Page Under Maintenance
          </h1>
          <p className="text-gray-600 text-center mb-6">
            We're currently working on improving our website. Please check back soon.
          </p>
          <div className="w-full bg-gray-200 rounded-full h-2.5 mb-6">
            <div
              className="bg-bgColor h-2.5 rounded-full transition-all duration-300 ease-out"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <p className="text-sm text-gray-500 font-medium">
            {progress < 100 ? 'Work in progress...' : 'Maintenance complete soon!'}
          </p>
        </div>
      </div>
    </div>
  );
};

export default MarketingPage;