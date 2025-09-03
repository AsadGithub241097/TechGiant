import React from 'react';

export const SimpleInfiniteBackground: React.FC = () => {
  console.log('SimpleInfiniteBackground is rendering');
  
  return (
    <div className="fixed top-0 left-0 w-full h-full bg-red-500 z-50 flex items-center justify-center">
      <div className="text-white text-6xl font-bold">
        INFINITE SYMBOL TEST
      </div>
      <div className="absolute top-10 left-10 w-32 h-32 bg-blue-500 animate-spin rounded-full"></div>
      <div className="absolute bottom-10 right-10 w-32 h-32 bg-green-500 animate-bounce"></div>
    </div>
  );
};

export default SimpleInfiniteBackground;
