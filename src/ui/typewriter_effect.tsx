"use client";

import { cn } from "../lib/util";
import { motion, stagger, useAnimate, useInView } from "framer-motion";
import { useEffect, useState, useCallback } from "react";

export const TypewriterEffect = ({
  words,
  className,
  cursorClassName,
  typingSpeed = 0.1,
  loop = false,
  showCursor = true,
  cursorStyle = "line", // "line", "block", "underscore"
  soundEnabled = false,
}: {
  words: {
    text: string;
    className?: string;
  }[];
  className?: string;
  cursorClassName?: string;
  typingSpeed?: number;
  loop?: boolean;
  showCursor?: boolean;
  cursorStyle?: "line" | "block" | "underscore";
  soundEnabled?: boolean;
}) => {
  const wordsArray = words.map((word) => ({
    ...word,
    text: word.text.split(""),
  }));

  const [scope, animate] = useAnimate();
  const isInView = useInView(scope);

  // Enhanced typing sound effect
  const playTypingSound = useCallback(() => {
    if (soundEnabled && typeof window !== 'undefined') {
      const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      const audioContext = new AudioContextClass();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      oscillator.frequency.value = 800 + Math.random() * 200;
      oscillator.type = 'square';
      
      gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
      
      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + 0.1);
    }
  }, [soundEnabled]);

  useEffect(() => {
    if (isInView) {
      const animateTypewriter = async () => {
        // Smoother staggered animation with refined character-level effects
        await animate(
          "span",
          {
            display: "inline-block",
            opacity: [0, 1],
            scale: [0.8, 1.05, 1],
            y: [10, -2, 0],
            filter: [
              "blur(2px) brightness(0.5)",
              "blur(0px) brightness(1.2)",
              "blur(0px) brightness(1)"
            ],
          },
          {
            duration: 0.6,
            delay: stagger(typingSpeed * 0.8, { startDelay: 0.1 }),
            ease: [0.165, 0.84, 0.44, 1], // Smoother cubic-bezier easing
            type: "spring",
            stiffness: 120,
            damping: 25,
          }
        );

        // Smoother glow effect transition
        if (!loop) {
          await animate(
            scope.current,
            {
              textShadow: [
                "0 0 0px rgba(59, 130, 246, 0)",
                "0 0 15px rgba(59, 130, 246, 0.4)",
                "0 0 8px rgba(59, 130, 246, 0.2)",
              ],
            },
            {
              duration: 1.5,
              ease: [0.25, 0.46, 0.45, 0.94],
            }
          );
        }
      };

      animateTypewriter();
    }
  }, [isInView, typingSpeed, loop, animate, scope]);

  // Enhanced cursor styles
  const getCursorClasses = () => {
    const baseClasses = "inline-block";
    switch (cursorStyle) {
      case "block":
        return `${baseClasses} w-3 h-4 md:h-6 lg:h-10 bg-current`;
      case "underscore":
        return `${baseClasses} w-3 h-[2px] md:h-[3px] lg:h-[4px] bg-current mb-1`;
      default: // line
        return `${baseClasses} w-[2px] md:w-[3px] h-4 md:h-6 lg:h-10 bg-current`;
    }
  };

  const renderWords = () => {
    return (
      <motion.div ref={scope} className="inline">
        {wordsArray.map((word, idx) => (
          <div key={`word-${idx}`} className="inline-block">
            {word.text.map((char, index) => (
              <motion.span
                key={`char-${index}`}
                className={cn(
                  "opacity-0 hidden text-white dark:text-white font-bold",
                  word.className
                )}
                onAnimationStart={() => {
                  if (soundEnabled) playTypingSound();
                }}
                whileHover={{
                  scale: 1.1,
                  color: "#3b82f6",
                  transition: { duration: 0.2 }
                }}
              >
                {char}
              </motion.span>
            ))}
            &nbsp;
          </div>
        ))}
      </motion.div>
    );
  };

  return (
    <div
      className={cn(
        "text-base sm:text-xl md:text-3xl lg:text-5xl font-bold text-center",
        className
      )}
    >
      {renderWords()}
      {showCursor && (
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ 
            opacity: [0, 1, 1, 0],
            scale: [1, 1.02, 1.02, 1]
          }}
          transition={{
            duration: 1.2,
            repeat: Infinity,
            ease: [0.4, 0, 0.6, 1],
            times: [0, 0.1, 0.9, 1]
          }}
          className={cn(
            getCursorClasses(),
            "text-blue-500 ml-1",
            cursorClassName
          )}
          style={{
            filter: "drop-shadow(0 0 12px rgba(59, 130, 246, 0.8))",
          }}
        />
      )}
    </div>
  );
};

export const TypewriterEffectSmooth = ({
  words,
  className,
  cursorClassName,
  duration = 2,
  delay = 1,
  gradientColors = ["#3b82f6", "#8b5cf6", "#ec4899"],
  showCursor = true,
  cursorStyle = "line",
}: {
  words: {
    text: string;
    className?: string;
  }[];
  className?: string;
  cursorClassName?: string;
  duration?: number;
  delay?: number;
  gradientColors?: string[];
  showCursor?: boolean;
  cursorStyle?: "line" | "block" | "underscore";
}) => {
  const wordsArray = words.map((word) => ({
    ...word,
    text: word.text.split(""),
  }));

  const getCursorClasses = () => {
    const baseClasses = "block rounded-sm";
    switch (cursorStyle) {
      case "block":
        return `${baseClasses} w-3 h-4 sm:h-6 xl:h-12`;
      case "underscore":
        return `${baseClasses} w-6 h-[2px] sm:h-[3px] xl:h-[4px] mb-1`;
      default: // line
        return `${baseClasses} w-[4px] h-4 sm:h-6 xl:h-12`;
    }
  };

  const renderWords = () => {
    return (
      <div>
        {wordsArray.map((word, idx) => (
          <div key={`word-${idx}`} className="inline-block">
            {word.text.map((char, index) => (
              <span
                key={`char-${index}`}
                className={cn(
                  "text-white dark:text-white font-bold",
                  word.className
                )}
              >
                {char}
              </span>
            ))}
            &nbsp;
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className={cn("flex items-center space-x-1 my-6 w-full justify-center", className)}>
      <motion.div
        className="pb-2 text-wrap text-clip relative"
        initial={{ 
          width: "0%",
          opacity: 0.8
        }}
        whileInView={{ 
          width: "fit-content",
          opacity: 1
        }}
        transition={{
          duration,
          ease: [0.25, 0.46, 0.45, 0.94], // Smoother easing curve
          delay,
        }}
        style={{
          background: `linear-gradient(90deg, ${gradientColors.join(", ")})`,
          backgroundClip: "text",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundSize: "200% 100%",
          overflow: "visible",
          minWidth: "max-content"
        }}
      >
        <motion.div
          className="text-xs sm:text-base md:text-xl lg:text-3xl xl:text-5xl font-bold"
          style={{ 
            whiteSpace: "nowrap",
            minWidth: "max-content"
          }}
          animate={{
            backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: [0.4, 0, 0.6, 1], // Smoother easing for gradient movement
          }}
        >
          {renderWords()}
        </motion.div>

        {/* Enhanced glow effect */}
        <motion.div
          className="absolute inset-0 blur-sm opacity-30"
          style={{
            background: `linear-gradient(90deg, ${gradientColors.join(", ")})`,
            backgroundClip: "text",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundSize: "200% 100%",
          }}
          animate={{
            backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: [0.4, 0, 0.6, 1], // Matching smoother easing
          }}
        >
          <div
            className="text-xs sm:text-base md:text-xl lg:text-3xl xl:text-5xl font-bold"
            style={{ 
              whiteSpace: "nowrap",
              minWidth: "max-content"
            }}
          >
            {renderWords()}
          </div>
        </motion.div>
      </motion.div>

      {showCursor && (
        <motion.span
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ 
            opacity: [0, 1, 1, 0],
            scale: [0.8, 1.05, 1.05, 0.8],
            filter: [
              "drop-shadow(0 0 8px rgba(59, 130, 246, 0.4))",
              "drop-shadow(0 0 16px rgba(59, 130, 246, 1))",
              "drop-shadow(0 0 16px rgba(59, 130, 246, 1))",
              "drop-shadow(0 0 8px rgba(59, 130, 246, 0.4))"
            ]
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: [0.4, 0, 0.6, 1],
            times: [0, 0.2, 0.8, 1]
          }}
          className={cn(
            getCursorClasses(),
            "bg-gradient-to-b from-blue-400 to-purple-600",
            cursorClassName
          )}
        />
      )}
    </div>
  );
};

// New Advanced Typewriter Effect with Multiple Lines
export const TypewriterEffectAdvanced = ({
  lines,
  className,
  typingSpeed = 100,
  deletingSpeed = 50,
  pauseDuration = 2000,
  loop = true,
  showCursor = true,
  cursorStyle = "line",
}: {
  lines: string[];
  className?: string;
  typingSpeed?: number;
  deletingSpeed?: number;
  pauseDuration?: number;
  loop?: boolean;
  showCursor?: boolean;
  cursorStyle?: "line" | "block" | "underscore";
}) => {
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (lines.length === 0) return;

    const currentLine = lines[currentLineIndex];
    const timeout = setTimeout(() => {
      if (isPaused) {
        setIsPaused(false);
        if (loop && currentLineIndex === lines.length - 1) {
          setIsDeleting(true);
        } else if (currentLineIndex < lines.length - 1) {
          setCurrentLineIndex(prev => prev + 1);
          setCurrentText("");
        }
        return;
      }

      if (isDeleting) {
        setCurrentText(currentLine.substring(0, currentText.length - 1));
        if (currentText === "") {
          setIsDeleting(false);
          setCurrentLineIndex(0);
        }
      } else {
        setCurrentText(currentLine.substring(0, currentText.length + 1));
        if (currentText === currentLine) {
          setIsPaused(true);
        }
      }
    }, isPaused ? pauseDuration : isDeleting ? deletingSpeed : typingSpeed);

    return () => clearTimeout(timeout);
  }, [currentText, isDeleting, isPaused, currentLineIndex, lines, typingSpeed, deletingSpeed, pauseDuration, loop]);

  const getCursorClasses = () => {
    const baseClasses = "inline-block ml-1";
    switch (cursorStyle) {
      case "block":
        return `${baseClasses} w-3 h-4 md:h-6 lg:h-10 bg-current`;
      case "underscore":
        return `${baseClasses} w-3 h-[2px] md:h-[3px] lg:h-[4px] bg-current mb-1`;
      default:
        return `${baseClasses} w-[2px] md:w-[3px] h-4 md:h-6 lg:h-10 bg-current`;
    }
  };

  return (
    <div className={cn("text-base sm:text-xl md:text-3xl lg:text-5xl font-bold text-center text-white", className)}>
      <motion.span
        key={currentText}
        initial={{ 
          opacity: 0,
          y: 5,
          filter: "blur(1px)"
        }}
        animate={{ 
          opacity: 1,
          y: 0,
          filter: "blur(0px)"
        }}
        transition={{ 
          duration: 0.3,
          ease: [0.25, 0.46, 0.45, 0.94]
        }}
      >
        {currentText}
      </motion.span>
      {showCursor && (
        <motion.span
          animate={{ 
            opacity: [0, 1, 1, 0],
            scale: [1, 1.02, 1.02, 1]
          }}
          transition={{
            duration: 1.2,
            repeat: Infinity,
            ease: [0.4, 0, 0.6, 1],
            times: [0, 0.1, 0.9, 1]
          }}
          className={cn(
            getCursorClasses(),
            "text-blue-500"
          )}
          style={{
            filter: "drop-shadow(0 0 12px rgba(59, 130, 246, 0.8))",
          }}
        />
      )}
    </div>
  );
};

// Matrix-style Typewriter Effect
export const TypewriterEffectMatrix = ({
  text,
  className,
  revealSpeed = 0.1,
  glitchIntensity = 0.2,
}: {
  text: string;
  className?: string;
  revealSpeed?: number;
  glitchIntensity?: number;
}) => {
  const [displayText, setDisplayText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [scope] = useAnimate();
  const isInView = useInView(scope);

  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()";

  useEffect(() => {
    if (!isInView || currentIndex >= text.length) return;

    const interval = setInterval(() => {
      setDisplayText(prev => {
        let newText = prev;
        const targetChar = text[currentIndex];
        
        // Add glitch effect
        if (Math.random() < glitchIntensity) {
          const randomChar = characters[Math.floor(Math.random() * characters.length)];
          newText = prev + randomChar;
        } else {
          newText = prev + targetChar;
          setCurrentIndex(prev => prev + 1);
        }
        
        return newText;
      });
    }, revealSpeed * 1000);

    return () => clearInterval(interval);
  }, [isInView, currentIndex, text, revealSpeed, glitchIntensity, characters]);

  return (
    <motion.div
      ref={scope}
      className={cn(
        "text-base sm:text-xl md:text-3xl lg:text-5xl font-mono font-bold text-center text-green-400",
        className
      )}
      style={{
        textShadow: "0 0 15px rgba(34, 197, 94, 0.6)",
        filter: "drop-shadow(0 0 25px rgba(34, 197, 94, 0.4))",
      }}
      initial={{ filter: "brightness(0.8)" }}
      animate={{ filter: "brightness(1)" }}
      transition={{ duration: 0.5 }}
    >
      <motion.span
        key={displayText}
        initial={{ opacity: 0.8 }}
        animate={{ opacity: 1 }}
        transition={{ 
          duration: 0.2,
          ease: [0.25, 0.46, 0.45, 0.94]
        }}
      >
        {displayText}
      </motion.span>
      <motion.span
        animate={{ 
          opacity: [0, 1, 1, 0],
          scale: [1, 1.1, 1.1, 1],
          boxShadow: [
            "0 0 5px rgba(34, 197, 94, 0.3)",
            "0 0 15px rgba(34, 197, 94, 0.8)",
            "0 0 15px rgba(34, 197, 94, 0.8)",
            "0 0 5px rgba(34, 197, 94, 0.3)"
          ]
        }}
        transition={{
          duration: 1,
          repeat: Infinity,
          ease: [0.4, 0, 0.6, 1],
          times: [0, 0.2, 0.8, 1]
        }}
        className="inline-block w-[3px] h-4 md:h-6 lg:h-10 bg-green-400 ml-1 rounded-sm"
      />
    </motion.div>
  );
};
