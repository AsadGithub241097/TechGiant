import { useEffect, useState } from "react";
import { Megaphone, Clock, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const MarketingPage = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    setIsVisible(true);
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 75) {
          clearInterval(interval);
          return 75;
        }
        return prev + 1;
      });
    }, 40);

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className={`relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-bgColor p-6 transition-opacity duration-1000 ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
    >
      {/* Brand background: grid + aurora */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.18]"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(170,96,200,0.12) 1px, transparent 1px), linear-gradient(to bottom, rgba(170,96,200,0.12) 1px, transparent 1px)",
          backgroundSize: "56px 56px",
          maskImage:
            "radial-gradient(ellipse 70% 60% at 50% 50%, #000 40%, transparent 100%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 70% 60% at 50% 50%, #000 40%, transparent 100%)",
        }}
      />
      <div className="pointer-events-none absolute left-1/2 top-1/3 h-72 w-[36rem] -translate-x-1/2 rounded-full bg-carousel1/25 blur-[120px]" />

      <div className="relative z-10 w-full max-w-lg rounded-3xl glass-panel p-10 text-center shadow-2xl">
        <div className="mb-8 flex justify-center">
          <div className="relative">
            <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-carousel2 to-carousel1 shadow-lg shadow-carousel2/30">
              <Megaphone className="h-9 w-9 text-white" />
            </div>
            <span className="absolute -right-1 -top-1 flex h-6 w-6 items-center justify-center rounded-full border border-white/20 bg-carousel3">
              <Clock className="h-3.5 w-3.5 text-bgColor" />
            </span>
          </div>
        </div>

        <span className="inline-flex items-center gap-2 rounded-full border border-carousel2/30 bg-carousel2/10 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-carousel3">
          Coming Soon
        </span>

        <h1 className="mt-5 text-3xl font-extrabold text-white sm:text-4xl">
          Marketing that{" "}
          <span className="bg-gradient-to-r from-carousel4 via-carousel3 to-carousel2 bg-clip-text text-transparent">
            moves the needle
          </span>
        </h1>
        <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-gray-400">
          We're crafting something exceptional. Our marketing services page is
          under construction — check back soon for creative strategies that grow
          your brand.
        </p>

        {/* Progress */}
        <div className="mt-8">
          <div className="mb-2 flex items-center justify-between text-xs text-gray-500">
            <span>In progress</span>
            <span className="font-semibold text-carousel3">{progress}%</span>
          </div>
          <div className="h-2 w-full overflow-hidden rounded-full bg-white/10">
            <div
              className="h-full rounded-full bg-gradient-to-r from-carousel2 to-carousel3 transition-all duration-300 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        <Link
          to="/"
          className="group mt-8 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-6 py-3 text-sm font-semibold text-white transition-all duration-300 hover:border-carousel2/60 hover:bg-white/10"
        >
          Back to Home
          <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
        </Link>
      </div>
    </div>
  );
};

export default MarketingPage;
