import { type Config } from 'tailwindcss';

const config: Config = {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: 'hsl(220, 98%, 61%)',
        check: {
          from: 'hsl(192, 100%, 67%)',
          to: 'hsl(280, 87%, 65%)',
        },
        light: {
          bg: 'hsl(0, 0%, 98%)',
          grayishBlue: 'hsl(236, 33%, 92%)',
          lightGrayishBlue: 'hsl(233, 11%, 84%)',
          darkGrayishBlue: 'hsl(236, 9%, 61%)',
          veryDarkGrayishBlue: 'hsl(235, 19%, 35%)',
        },
        dark: {
          bg: 'hsl(235, 21%, 11%)',
          desaturatedBlue: 'hsl(235, 24%, 19%)',
          lightGrayishBlue: 'hsl(234, 39%, 85%)',
          lightGrayishBlueHover: 'hsl(236, 33%, 92%)',
          darkGrayishBlue: 'hsl(234, 11%, 52%)',
          veryDarkGrayishBlue1: 'hsl(233, 14%, 35%)',
          veryDarkGrayishBlue2: 'hsl(237, 14%, 26%)',
        },
      },
      fontFamily: {
        sans: ["'Josefin Sans'", 'sans-serif'],
      },
      fontSize: {
        base: '18px',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
  darkMode: 'class',
};

export default config;
