/** @type {import('tailwindcss').Config} */
export default {
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  content: [],
  theme: {
    extend: {},
    screens: {
      phone: '370px', // sm
      tablet: '640px', // md
      laptop: '1024px', // lg
      desktop: '1280px', // xl

      sm: '370px',
      md: '640px',
      lg: '1024px',
      xl: '1280px',
    },
  },
  plugins: [],
}
