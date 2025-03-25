/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'dark-teal': '#114b5f',
        'primary-green': '#1a936f',
        'light-green': '#88d498',
        'pastel-green': '#c6dabf',
        'beige': '#f3e9d2',
      },
      fontFamily: {
        sans: ['Inter var', 'sans-serif'],
      },
    },
  },
  plugins: [],
};