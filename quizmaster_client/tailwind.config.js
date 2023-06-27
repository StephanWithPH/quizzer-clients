/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  safelist: [
    {
      pattern: /^bg-/,
      variants: ['dark'],
    },
    {
      pattern: /^text-/,
      variants: ['dark'],
    },
    {
      pattern: /^border-/,
      variants: ['dark'],
    },
  ],
  theme: {},
  plugins: [],
};
