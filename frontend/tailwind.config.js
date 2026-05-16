/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        iris: {
          950: "#0a0f1a",
          900: "#0f1729",
          800: "#1a2332",
          700: "#243044",
          accent: "#22d3ee",
          violet: "#a78bfa",
          rose: "#fb7185",
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        display: ["Outfit", "system-ui", "sans-serif"],
      },
      boxShadow: {
        glow: "0 0 40px -10px rgba(34, 211, 238, 0.35)",
      },
    },
  },
  plugins: [],
};
