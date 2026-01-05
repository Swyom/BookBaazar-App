/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./App.{js,ts,tsx}', './components/**/*.{js,ts,tsx}', './screens/**/*.{js,ts,tsx}'],

  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      // fontFamily: {
      //   agbalumo: ['Agbalumo_400Regular'],
      //   abhaya: ['AbhayaLibre_400Regular'],
      //   abhayaBold: ['AbhayaLibre_700Bold'],
      // },
    },
  },
  plugins: [],
};
