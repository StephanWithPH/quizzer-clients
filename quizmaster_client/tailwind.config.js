/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  safelist: [
    { pattern: /^bg-/ },
    { pattern: /^text-/ },
    { pattern: /^border-/ },
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
