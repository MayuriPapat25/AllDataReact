/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx,css}", // <--- Ensure Tailwind scans CSS files too
  ],
  theme: {
    extend: {
      fontFamily: {
        avenirRegular: ["AvenirRegular", "sans-serif"],
        avenirBold: ["AvenirBold", "sans-serif"],
      },
      fontSize: {
        // Custom font sizes
        "display-lg": "48px",
        "display-sm": "40px",
        "title-lg": "32px",
        "title-md": "24px",
        "title-sm": "20px",
        "body-lg": "16px", // <-- This is REQUIRED
        "body-md": "14px",
        "body-sm": "12px",
      },
      colors: {
        "ink-black-500": "#000000",
      },
    },
  },
  plugins: [],
};
