const flowbite = require("flowbite-react/tailwind");
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    flowbite.content()
  ],
  theme: {
    extend: {
      colors: {
        themeColor: {
          100: '#fae0b7',
          200: '#f9bd5e',
          300: '#fba419',
          400: '#ff9d00',
        }
      },
    },
  },
  plugins: [
    flowbite.content()
  ],
}

