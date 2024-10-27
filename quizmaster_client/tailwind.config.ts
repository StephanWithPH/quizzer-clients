import type { Config } from "tailwindcss"

export default  {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
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
} satisfies Config;
