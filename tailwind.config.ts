import { type Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      animation: {
        "fade-in-from-top": "fade-in-from-top 0.2s ease-out",
        "fade-in-from-bottom": "fade-in-from-bottom 0.2s ease-out",
        "fade-in-from-left": "fade-in-from-left 0.2s ease-out",
        "fade-in-from-right": "fade-in-from-right 0.2s ease-out",
        "opacity": "opacity 0.2s ease-out",
      },
      keyframes: {
        "fade-in-from-top": {
          "0%": {
            opacity: "0",
            transform: "translateY(-10%)",
          },
          "100%": {
            opacity: "1",
            transform: "translateY(0)",
          },
        },
        "fade-in-from-bottom": {
          "0%": {
            opacity: "0",
            transform: "translateY(10%)",
          },
          "100%": {
            opacity: "1",
            transform: "translateY(0)",
          },
        },
        "fade-in-from-left": {
          "0%": {
            opacity: "0",
            transform: "translateX(-10%)",
          },
          "100%": {
            opacity: "1",
            transform: "translateX(0)",
          },
        },
        "fade-in-from-right": {
          "0%": {
            opacity: "0",
            transform: "translateX(10%)",
          },
          "100%": {
            opacity: "1",
            transform: "translateX(0)",
          },
        },
        "opacity": {
          "0%": {
            opacity: "0",
          },
          "100%": {
            opacity: "1",
          },
        }
      },
      transitionProperty: {
        "backdrop-filter": "backdrop-filter",
      },
      gridTemplateColumns: {
        "auto-fit": "repeat(auto-fit, minmax(200px, 1fr))",
      },
      maxWidth: {
        "8xl": "90rem", // 1440px
      },
      screens: {
        'xs': '320px',
      },
    },
  },
  plugins: [],
} satisfies Config;
