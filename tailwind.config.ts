import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        title: ['Montserrat', 'sans-serif'],
        body: ['Lexend', 'sans-serif'],
      },
      colors: {
        error: {
          1: '#DE3737',
          '1-hover': '#b82c2c',
        },
        success: {
          1: '#2DAC3E',
          '1-hover': '#288c34',
        },
        secondary: {
          100: '#798645',
        },
        neutral: {
          60: '#747373',
          40: '#A2A2A2',
          20: '#D1D0D0',
        },
        white: '#FFFFFF',
        whiteish: '#F5F5F5',
      },
      fontSize: {
        base: '1rem',
      },
    },
  },
  plugins: [],
};

export default config;
