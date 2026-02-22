module.exports = {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}', './node_modules/flowbite/**/*.js'],
  theme: {
    extend: {
      textColor: {
        DEFAULT: '#000000', // Sets the default text color
      },
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
      fontSize: {
        clamp: 'clamp(1rem, 5vw, 3rem)',
      },
    },
    plugins: [require('flowbite/plugin')],
  },
};

// text-[clamp(0.80rem,1.2cqw,2rem)]
