/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        transparent: "transparent",
        current: "currentColor",
        background: "#f4f6f9",
        backgroundElevated: "#fff",
        foreground: "#26272c",
        primary: "#1E40AF",
        secondary: "#10B981",
        tertiary: "#FBBF24",

        buttonBackground: "#1E40AF",
        buttonBackgroundHover: "#1E40AF",
        buttonBackgroundActive: "#1E3A8A",
        buttonColor: "#fff",
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
      },
      width: {
        '400': '400px',
        '440': '440px',
        '480': '480px',
      }
    },
  },
  plugins: [],
};
