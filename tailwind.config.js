/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./App.{js,ts,tsx}', './src/**/*.{js,ts,tsx}'],

  theme: {
    extend: {
      colors: {
        primary: {
          default: '#4D50F4',
          lighter: '#CACBFC',
        },
        merino: '#F4EADF',
        grey: {
          150: '#EDEEFE',
          500: '#7F8590',
          800: '#212836',
        },
      },
      fontFamily: {
        'raleway-extrabold': ['Raleway-ExtraBold'],
        'inter-medium': ['Inter-Medium'],
        'inter-bold': ['Inter-Bold'],
      },
      fontSize: {
        '3xl': ['28px', '32.87px'],
      },
      borderRadius: {
        lg: '10px',
      },
    },
  },
  plugins: [],
};
