import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        zedu: {
          50: "#f3f1ff",
          100: "#e3d9fe",
          200: "#c6b3fc",
          300: "#aa8dfb",
          400: "#8d67fa",
          500: "#7141f8", // signature Zedu purple
          600: "#5e32d6",
          700: "#4c26b0",
          800: "#3d1f8d",
          900: "#301a6f",
        },
        sidebar: {
          bg: "#1e1b4b",
          hover: "#2e2a72",
          active: "#3b3598",
          text: "#c7d2fe",
        },
        whimsical: {
          pink: "#ff6b8b",
          yellow: "#ffd166",
          green: "#06d6a0",
          teal: "#118ab2",
          purple: "#7141f8",
          orange: "#ff9f1c",
          coral: "#f25c54",
        }
      },
      animation: {
        "float": "float 4s ease-in-out infinite",
        "float-delayed": "float 4s ease-in-out 2s infinite",
        "bounce-gentle": "bounceGentle 2s ease-in-out infinite",
        "wiggle": "wiggle 1s ease-in-out infinite",
        "pulse-slow": "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "sparkle": "sparkle 1.5s ease-in-out infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px) rotate(0deg)" },
          "50%": { transform: "translateY(-10px) rotate(2deg)" },
        },
        bounceGentle: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-6px)" },
        },
        wiggle: {
          "0%, 100%": { transform: "rotate(-3deg)" },
          "50%": { transform: "rotate(3deg)" },
        },
        sparkle: {
          "0%, 100%": { opacity: "1", transform: "scale(1)" },
          "50%": { opacity: "0.4", transform: "scale(1.2)" },
        }
      }
    },
  },
  plugins: [],
};

export default config;
