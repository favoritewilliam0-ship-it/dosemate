/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        teal:"#0F766E",
        mint:"#CCFBF1",
        orange:"#F97316",
        slate:"#0F172A",
        offwhite:"#F8FAFC"
        },
    },
  },
  plugins: [],
}