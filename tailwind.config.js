/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        "line-left": "line-left 4s ease-in-out infinite",
        "line-right": "line-right 4s ease-in-out infinite",
      },
      keyframes: {
        "line-left": {
          "0%, 100%": { transform: "translateX(-100%)" },
          "50%": { transform: "translateX(0%)" },
        },
        "line-right": {
          "0%, 100%": { transform: "translateX(0%)" },
          "50%": { transform: "translateX(100%)" },
        },
      },
    }
  },
  plugins: [],
}