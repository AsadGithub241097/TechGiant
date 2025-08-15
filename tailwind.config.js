const defaultTheme = require("tailwindcss/defaultTheme");
const colors = require("tailwindcss/colors");

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  safelist: [
    /^bg-/,
    /^text-/,
    /^border-/,
    /^hover:/,
    /^focus:/,
    /^active:/,
    /^disabled:/,
  ],
  theme: {
    screens: {
      xs: { max: "400px" },
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
    },
    extend: {
      fontFamily: {
        sans: ["Roboto", ...defaultTheme.fontFamily.sans],
        bigShoulders: ["Big Shoulders Stencil", "sans-serif"],
        doto: ["Doto", "sans-serif"],
      },
      colors: {
        bgColor: "#11071F",
        navBg: "#1A0B2E",
        cardBg: "#726EFF",
        carousel1: "#500073",
        carousel2: "#AA60C8",
        carousel3: "#D69ADE",
        carousel4: "#EABDE6",
      },
      animation: {
        typewriter: "typewriter 2s steps(11) forwards",
        blink: "blink 0.8s infinite",
        scroll: "scroll 40s linear infinite",
        scrollReverse: "scrollReverse 40s linear infinite",
        "fade-in": "fadeIn 0.5s ease-in-out",
        "slide-up": "slideUp 0.5s ease-out",
      },
      keyframes: {
        blink: {
          "50%": { opacity: "0" },
        },
        typewriter: {
          to: {
            left: "100%",
          },
        },
        scroll: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-1750px)" },
        },
        scrollReverse: {
          "0%": { transform: "translateX(-1000px)" },
          "100%": { transform: "translateX(0)" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { transform: "translateY(20px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
      },
      spacing: {
        "header-height": "80px",
      },
    },
  },
  plugins: [
    function ({ addUtilities }) {
      addUtilities({
        ".scroll-animation": {
          animation: "scroll 40s forwards linear infinite",
        },
      });
    },
    function ({ addUtilities }) {
      addUtilities({
        ".user-modify": {
          "-webkit-user-modify": "read-write-plaintext-only",
        },
      });
    },
  ],
  future: {
    hoverOnlyWhenSupported: true,
  },
  variants: {
    extend: {
      opacity: ["disabled"],
      cursor: ["disabled"],
    },
  },
  corePlugins: {
    preflight: true,
  },
  important: false,
};
