/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        bg: "#0A0C10", // industrial black
        surface: "#11141B", // primary panels
        surfaceAlt: "#161A22", // secondary panels
        border: "#242936", // cold system borders
        fg: "#E6E8EB", // enterprise white
        muted: "#9AA3B2", // muted telemetry text
        signal: "#22D3EE", // restrained cyan (ONLY signal)
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
    },
  },
  plugins: [],
};
