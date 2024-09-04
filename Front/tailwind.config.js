/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'original': ['Georgia', 'sans-serif'],
        'serif': ['Merriweather', 'serif'],
        'hover': ['Georgia', 'serif'],
      },
      transitionProperty: {
        'font-family': 'font-family',
      },
    },
  },
  plugins: [],
}
