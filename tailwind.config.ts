import type { Config } from "tailwindcss";

export default {
  darkMode: "class",
  content: ["./client/index.html", "./client/src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        background: "#0B132B",
        "background-deep": "#070D1A",
        surface: "#1C2541",
        "surface-border": "#2A3655",
        accent: {
          DEFAULT: "#00B4D8",
          hover: "#009CBF",
          foreground: "#052A33",
        },
        success: {
          DEFAULT: "#10B981",
          hover: "#0EA271",
        },
        muted: "#8A94B3",
      },
      fontFamily: {
        sans: ["Cairo", "Tajawal", "sans-serif"],
      },
      boxShadow: {
        card: "0 4px 24px rgba(0,0,0,0.35)",
        glow: "0 0 24px rgba(0,180,216,0.35)",
      },
      borderRadius: {
        xl2: "1.25rem",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(12px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.5s ease-out both",
      },
    },
  },
  plugins: [],
} satisfies Config;
