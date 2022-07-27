const colors = require('tailwindcss/colors');

/** @type {import('tailwindcss').Config} */
module.exports = {
  important: true,
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    colors: {
      ...colors,
      app: {
        'bg-2': '#F6FAFF',
        'text-1': '#2C4074',
        'text-2': '#727FA2',
        'text-3': '#354779',
        'text-4': '#C0C6D6',
        'accent-1': '#A974FF',
        'accent-2': '#F4F8FE',
        'accent-3': '#58B9FF',
      },
    },
  },
  plugins: [],
};
