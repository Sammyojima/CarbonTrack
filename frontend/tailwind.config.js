/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#0A192F",
        accent: "#00C49A",
        secondary: "#1E293B",
        highlight: "#38BDF8",
        warning: "#F59E0B",
        danger: "#EF4444",
        background: "#F8FAFC",
        textPrimary: "#111827",
        textSecondary: "#6B7280",
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
      },
      borderRadius: {
        xl: "1rem",
        "2xl": "1.5rem",
      },
    },
  },
  plugins: [],
};

module.exports = {
  darkMode: "class",
  content: ["./src/**/*.{js,jsx}"],
  theme: { extend: {} },
  plugins: [],
};
