/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",  // root HTML
    "./src/**/*.{js,jsx,ts,tsx}", // all JS/JSX/TS/TSX files in src and nested folders
    "./src/Cart/**/*.{js,jsx,ts,tsx}",  // explicitly include Cart
    "./src/Checkout/**/*.{js,jsx,ts,tsx}",  // explicitly include Checkout
    "./src/ProfCustomPortal/**/*.{js,jsx,ts,tsx}",  // explicitly include ProfCustomPortal
    "./src/components/**/*.{js,jsx,ts,tsx}",  // all components
    "./templates/**/*.twig", // Twig templates
  ],
  theme: {
    container: {
      center: true,
      padding: "1rem",
      screens: {
        DEFAULT: "1336px", // 👈 global max-width for container
      },
    },
    extend: {
      fontFamily: {
        gotham: ["Gotham", "sans-serif"],
        primary: "var(--font-primary)",
      },
      fontSize: {
        h1: "var(--text-h1)",
        h2: "var(--text-h2)",
        h3: "var(--text-h3)",
        h4: "var(--text-h4)",
        h5: "var(--text-h5)",
        h6: "var(--text-h6)",
        base: "var(--text-base)",
        sm: "var(--text-sm)",
        xs: "var(--text-xs)",
      },
      colors: {
        primary: "var(--color-primary)",
        "primary-dark": "var(--color-primary-dark)",
        "primary-light": "var(--color-primary-light)",
        secondary: "var(--color-secondary)",
        success: "var(--color-success)",
        info: "var(--color-info)",
        warning: "var(--color-warning)",
        danger: "var(--color-danger)",
        black: "var(--color-black)",
        white: "var(--color-white)",
        "light-smoky-white": "var(--color-light-smoky-white)",
        "dark-smoky-white": "var(--color-dark-smoky-white)",
        transparent: "var(--color-transparent)",
        error: "--color-error"
      },
      fontWeight: {
        thin: "100",
        light: "300",
        book: "400",
        medium: "500",
        bold: "600",
        ultra: "700",
      },
      boxShadow: {
        lg: '0 22px 44px 0 rgba(0,0,0,.05)'
      },
    },
  },
};
