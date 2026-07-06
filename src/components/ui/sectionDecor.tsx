import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import "../../styles/graphPaper.css";

/**
 * Shared visual primitives that give the marketing sections a single,
 * modern design language: a faint blueprint grid, soft brand aurora,
 * consistent eyebrow badges, gradient headings and a tasteful
 * mouse-tracking spotlight for interactive cards.
 */

/** Full-page graph paper grid for marketing layouts. */
export const GraphPaperBackground: React.FC<{
  className?: string;
  variant?: "page" | "overlay";
}> = ({ className = "", variant = "page" }) => (
  <div
    className={`tg-graph-paper ${
      variant === "overlay" ? "tg-graph-paper--overlay" : "tg-graph-paper--page"
    } ${className}`}
    aria-hidden
  />
);

/** Faint grid + single soft aurora glow. Replaces the old stacked blobs. */
export const SectionBackground: React.FC<{ className?: string }> = ({
  className = "",
}) => (
  <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}>
    {/* blueprint grid */}
    <div
      className="absolute inset-0 opacity-[0.18]"
      style={{
        backgroundImage:
          "linear-gradient(to right, rgba(170,96,200,0.12) 1px, transparent 1px), linear-gradient(to bottom, rgba(170,96,200,0.12) 1px, transparent 1px)",
        backgroundSize: "56px 56px",
        maskImage:
          "radial-gradient(ellipse 80% 60% at 50% 40%, #000 50%, transparent 100%)",
        WebkitMaskImage:
          "radial-gradient(ellipse 80% 60% at 50% 40%, #000 50%, transparent 100%)",
      }}
    />
    {/* single soft aurora */}
      <div className="absolute left-1/2 top-0 h-[28rem] w-[44rem] -translate-x-1/2 -translate-y-1/3 rounded-full bg-carousel1/15 blur-[120px]" />
    <div className="absolute bottom-0 right-[10%] h-72 w-72 rounded-full bg-carousel2/10 blur-[110px]" />
  </div>
);

/** Small pill label above a heading. */
export const Eyebrow: React.FC<{
  icon?: LucideIcon;
  children: React.ReactNode;
  className?: string;
}> = ({ icon: Icon, children, className = "" }) => (
  <motion.span
    initial={{ opacity: 0, y: 12 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-80px" }}
    transition={{ duration: 0.5 }}
    className={`inline-flex items-center gap-2 rounded-full border border-carousel2/30 bg-carousel2/10 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-carousel3 backdrop-blur-sm ${className}`}
  >
    {Icon && <Icon className="h-3.5 w-3.5" />}
    {children}
  </motion.span>
);

/** Heading where a chosen word is rendered in the brand gradient. */
export const GradientText: React.FC<{
  children: React.ReactNode;
  className?: string;
}> = ({ children, className = "" }) => (
  <span
    className={`bg-gradient-to-r from-carousel4 via-carousel3 to-carousel2 bg-clip-text text-transparent ${className}`}
  >
    {children}
  </span>
);

/**
 * Card wrapper with a cursor-following radial spotlight + lift on hover.
 * Wrap any content; pass `as` to control the element. Keeps markup minimal
 * at call sites so every section feels cohesive.
 */
export const SpotlightCard: React.FC<{
  children: React.ReactNode;
  className?: string;
}> = ({ children, className = "" }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [active, setActive] = useState(false);

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    setPos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  return (
    <div
      ref={ref}
      onMouseMove={handleMove}
      onMouseEnter={() => setActive(true)}
      onMouseLeave={() => setActive(false)}
      className={`group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-carousel2/50 ${className}`}
    >
      <div
        className="pointer-events-none absolute -inset-px opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          opacity: active ? 1 : 0,
          background: `radial-gradient(420px circle at ${pos.x}px ${pos.y}px, rgba(170,96,200,0.18), transparent 60%)`,
        }}
      />
      <div className="relative z-10 h-full">{children}</div>
    </div>
  );
};
