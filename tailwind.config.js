/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        bg: "#0A0C10",
        surface: "#11141B",
        surfaceAlt: "#161A22",
        border: "#242936",
        borderLight: "#343B4A",
        fg: "#E6E8EB",
        muted: "#9AA3B2",
        signal: "#22D3EE",
        signalMuted: "rgba(34, 211, 238, 0.15)",
        critical: "#EF4444",
        criticalMuted: "rgba(239, 68, 68, 0.15)",
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
      boxShadow: {
        glow: "0 0 20px rgba(34, 211, 238, 0.15)",
        "glow-strong": "0 0 30px rgba(34, 211, 238, 0.3)",
        "glow-critical": "0 0 20px rgba(239, 68, 68, 0.25)",
      },
      animation: {
        "pulse-slow": "pulse-slow 2s ease-in-out infinite",
        "pulse-critical": "pulse-critical 0.8s ease-in-out infinite",
        "border-glow": "border-glow 2s ease-in-out infinite",
      },
      keyframes: {
        "pulse-slow": {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.6" },
        },
        "pulse-critical": {
          "0%, 100%": { opacity: "1", transform: "scale(1)" },
          "50%": { opacity: "0.7", transform: "scale(0.98)" },
        },
        "border-glow": {
          "0%, 100%": { borderColor: "rgba(34, 211, 238, 0.5)" },
          "50%": { borderColor: "rgba(34, 211, 238, 1)" },
        },
      },
    },
  },
  plugins: [],
};
