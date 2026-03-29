import type { Config } from "tailwindcss";
import typography from "@tailwindcss/typography";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        display: ["Bricolage Grotesque", "sans-serif"],
        sans: ["Plus Jakarta Sans", "sans-serif"],
      },
      colors: {
        page: "#eef0f8",
        card: "#ffffff",
        card2: "#f5f6fb",
        accent: { DEFAULT: "#3d5af1", soft: "#e8ebff", "2": "#6b7fff" },
        violet: { DEFAULT: "#7c4dff", soft: "#f0e8ff" },
        ink: { DEFAULT: "#0d0f1a", "2": "#4a4f6a", "3": "#9599b3" },
        success: "#22c981",
        warn: "#f5a623",
        pink: "#e8619a",
        cyan: "#38c9e8",
      },
      borderRadius: {
        card: "20px",
        "card-lg": "28px",
        "card-xl": "36px",
        pill: "50px",
      },
      boxShadow: {
        card: "0 2px 16px rgba(0,0,0,0.06), 0 1px 3px rgba(0,0,0,0.04)",
        "card-lg": "0 8px 32px rgba(0,0,0,0.08), 0 2px 8px rgba(0,0,0,0.04)",
      },
      spacing: {
        "bento-gap": "12px",
        "page-x": "32px",
        "page-y": "28px",
      },
      fontSize: {
        "display-2xl": ["72px", { lineHeight: "1.0", letterSpacing: "-0.05em" }],
        "display-xl": ["56px", { lineHeight: "1.04", letterSpacing: "-0.04em" }],
        "display-lg": ["48px", { lineHeight: "1.06", letterSpacing: "-0.04em" }],
        "display-md": ["38px", { lineHeight: "1.1", letterSpacing: "-0.03em" }],
        "display-sm": ["28px", { lineHeight: "1.15", letterSpacing: "-0.03em" }],
        label: ["11px", { lineHeight: "1.4", letterSpacing: "0.08em" }],
      },
      animation: {
        "fade-up": "fadeUp .5s ease both",
        "fade-in": "fadeIn .4s ease both",
        shimmer: "shimmer 1.5s infinite linear",
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-1000px 0" },
          "100%": { backgroundPosition: "1000px 0" },
        },
      },
      gridTemplateColumns: {
        "bento-hero": "1fr 300px 220px",
        "bento-content": "220px 1fr 1fr 180px",
      },
    },
  },
  plugins: [typography],
};

export default config;
