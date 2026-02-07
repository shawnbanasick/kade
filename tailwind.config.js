module.exports = {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}', './node_modules/flowbite/**/*.js'],
  theme: {
    extend: {
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeOut: {
          '0%': { opacity: '1' },
          '100%': { opacity: '0' },
        },
      },
      animation: {
        fadeIn: 'fadeIn 0.5s linear',
        fadeOut: 'fadeOut 0.5s linear',
      },
    },
    plugins: [require('flowbite/plugin')],
  },
};
