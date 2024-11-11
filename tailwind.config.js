/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  // darkMode: "class",
  theme: {
    spacing: {
      0: "0px",
      1: "5px",
      2: "10px",
      3: "15px",
      4: "20px",
      5: "25px",
      6: "30px",
      7: "35px",
      8: "40px",
      9: "45px",
    },
    fontFamily: {
      roboto: ["Roboto", "sans-serif"],
      nunito: ["Nunito", "sans-serif"],
    },

    fontSize: {
      sm: "0.8rem",
      base: "1rem",
      xl: "1.3rem",
      "2xl": "1.563rem",
      "3xl": "1.953rem",
      "4xl": "2.441rem",
      "5xl": "3.052rem",
    },
    fontWeight: {
      thin: "100",
      hairline: "100",
      extralight: "200",
      light: "300",
      normal: "400",
      medium: "500",
      semibold: "600",
      bold: "700",
      extrabold: "800",
      "extra-bold": "800",
      black: "900",
    },

    screens: {
      sm: "375px",
      md: "600px",
      lg: "768px",
      xl: "1024px",
      "2xl": "1280px",
    },
    container: {
      center: true,
    },

    borderWidth: {
      DEFAULT: "1px",
      0: "0",
      1: "1px",
      2: "2px",
      3: "3px",
      4: "4px",
      6: "6px",
      8: "8px",
    },

    extend: {
      colors: {
        primary: "#2b2d42",
        secondary: "#8d99ae",
        red: "#ef233c",
        darkred: "#d90429",
        winter: "#edf2f4",
        yellow: "#E8BD00",
        green: "#12A336FF",
      },
    },
  },
  plugins: [require("tailwind-scrollbar")],
};
