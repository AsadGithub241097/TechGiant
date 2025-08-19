import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X } from 'lucide-react';

const WhatsAppFloat: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);

  // WhatsApp number and default message
  const whatsappNumber = '+918008771893';
  const defaultMessage = encodeURIComponent(
    'Hi! I found your website and I\'m interested in your services. Could you please provide more information?'
  );

  // Show button after page loads
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  // Auto-show tooltip after button appears
  useEffect(() => {
    if (isVisible) {
      const tooltipTimer = setTimeout(() => {
        setShowTooltip(true);
        // Auto-hide tooltip after 3 seconds
        setTimeout(() => setShowTooltip(false), 3000);
      }, 1000);

      return () => clearTimeout(tooltipTimer);
    }
  }, [isVisible]);

  const handleWhatsAppClick = () => {
    const whatsappUrl = `https://wa.me/${whatsappNumber.replace(/[^0-9]/g, '')}?text=${defaultMessage}`;
    window.open(whatsappUrl, '_blank');
  };

  const handleTooltipClose = () => {
    setShowTooltip(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Tooltip */}
      <AnimatePresence>
        {showTooltip && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, x: 20 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            exit={{ opacity: 0, scale: 0.8, x: 20 }}
            className="absolute bottom-16 right-0 mb-2"
          >
            <div className="relative">
              <div className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white px-4 py-3 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 max-w-xs">
                <button
                  onClick={handleTooltipClose}
                  className="absolute top-1 right-1 p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
                >
                  <X className="w-3 h-3" />
                </button>
                <p className="text-sm font-medium mb-1">Need Help?</p>
                <p className="text-xs text-gray-600 dark:text-gray-400">
                  Chat with us on WhatsApp for instant support!
                </p>
              </div>
              {/* Arrow */}
              <div className="absolute top-full right-4 w-0 h-0 border-l-8 border-r-8 border-t-8 border-l-transparent border-r-transparent border-t-white dark:border-t-gray-800"></div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* WhatsApp Button */}
      <motion.button
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={handleWhatsAppClick}
        className="group relative w-14 h-14 bg-[#25D366] hover:bg-[#20b954] text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center"
        aria-label="Chat on WhatsApp"
      >
        {/* Background glow effect */}
        <div className="absolute inset-0 bg-[#25D366] rounded-full opacity-30 group-hover:opacity-50 transition-opacity duration-300 animate-pulse"></div>
        
        {/* WhatsApp Icon */}
        <MessageCircle className="w-7 h-7 relative z-10" />
        
        {/* Ripple effect on hover */}
        <div className="absolute inset-0 rounded-full border-2 border-[#25D366] opacity-0 group-hover:opacity-100 group-hover:animate-ping"></div>
      </motion.button>

      {/* Floating animation dots */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: [0, 1, 0] }}
        transition={{
          duration: 2,
          repeat: Infinity,
          repeatDelay: 3
        }}
        className="absolute top-0 right-0 w-3 h-3 bg-red-500 rounded-full"
      />
    </div>
  );
};

export default WhatsAppFloat;
