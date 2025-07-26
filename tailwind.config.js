/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        suit: ["'SUIT Variable'", "sans-serif"], // ✅ 요거 추가
      },
      colors: {
        black: {
          100: "#3A3B491A",
          200: "#3A3B494D",
          300: "#3A3B4966",
          400: "#54566A",
          500: "#3A3B49",
        },
        gray: {
          100: "#E6E6E6",
          200: "#BBBBBB",
          300: "#BABABA",
        },
        main: {
          100: "#8DC5FF80",
          200: "#B0D7FF",
          300: "#8DC5FF",
          400: "#73A7DD",
          500: "#498CD2",
        },
        white: {
          100: "#F9F9F9",
        },
      },
    },
  },
  plugins: [],
};
