import { useState, useEffect, useMemo, lazy, Suspense, memo } from "react";

// Lazy load the RotatingAnimation component (for named exports)
const RotatingAnimation = lazy(() =>
  import("./rotatingAnimation").then((module) => ({
    default: module.RotatingAnimation,
  }))
);

export const HeroPage = memo(() => {
  const words = useMemo(
    () => [
      "Empowering the future through innovative",
      "software solutions </>",
    ],
    []
  );

  const [lines, setLines] = useState<string[]>(["", ""]);
  const [wordIndex, setWordIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [typingComplete, setTypingComplete] = useState(false);

  useEffect(() => {
    if (wordIndex >= words.length) {
      setTypingComplete(true);
      return;
    }

    const currentWord = words[wordIndex];
    const typingSpeed = 100;

    const typeEffect = setTimeout(() => {
      if (charIndex < currentWord.length) {
        setLines((prev) => {
          const updatedLines = [...prev];
          updatedLines[wordIndex] = currentWord.substring(0, charIndex + 1);
          return updatedLines;
        });
        setCharIndex((prev) => prev + 1);
      } else {
        setTimeout(() => {
          setCharIndex(0);
          setWordIndex((prev) => prev + 1);
        }, 200);
      }
    }, typingSpeed);

    return () => clearTimeout(typeEffect);
  }, [charIndex, wordIndex, words]);

  return (
    <div
      className="h-screen md:h-screen w-screen overflow-hidden flex-col relative"
      id="intro"
    >
      {/* Background Text */}
      <div
        className="absolute inset-0 flex items-center justify-center opacity-10 pointer-events-none "
        style={{
          fontSize: "20vw", // Adjust size as needed
          fontWeight: "bold",
          color: "white",
          zIndex: 0, // Ensure it stays in the background
        }}
      >
        TECH GIANT
      </div>

      {/* Main Text */}
      <div
        className="z-10 flex flex-col justify-center h-full text-center text-white bg-bgColor items-baseline font-bigShoulders"
        style={{
          background:
            "radial-gradient(circle at left, rgba(118,60,172,1) 0%, rgba(17, 7, 31, 1) 30%)",
        }}
      >
        {/* <span className="pl-[1rem] text-base sm:text-lg md:text-xl lg:text-2xl font-bigShoulders">
          Benefit from our software solutions.
        </span> */}

        {/* Typing Animation */}
        <div className="relative">
          <h1 className="sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl 2xl:text-6xl leading-tight text-left pl-[5%] backdrop-blur-lg rounded-lg font-sans font-bold text-600">
            {lines.map((line, index) => (
              <span key={index} className="block">
                {line}
                {index === wordIndex && !typingComplete && (
                  <span className="animate-blink">_</span>
                )}
                {index === words.length - 1 && typingComplete && (
                  <span className="animate-blink">|</span>
                )}
              </span>
            ))}
          </h1>
        </div>
      </div>

      {/* Rotating Logo */}
      <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-[40%] max-w-[600px] min-w-[150px] hidden sm:block">
        <Suspense fallback={<div>Loading...</div>}>
          <RotatingAnimation />
        </Suspense>
      </div>
    </div>
  );
});
