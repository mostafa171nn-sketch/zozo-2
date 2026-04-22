/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        'gradient-start': '#ff758c',
        'gradient-end': '#ff7eb3',
        'love-pink': '#ff2e63',
        'love-pink-light': '#f47b8f',
        'love-pink-hover': '#f44a91',
        'love-pink-dark': '#fa4a67',
        'flower-glow': '#f374c0',
      },
      boxShadow: {
        'love': '10px 20px 15px rgba(0, 0, 0, 0.2)',
        'book': 'none',
        'book-glow': '0px 0px 0px transparent',
        'flower': '0 0 35px #f374c0cc, 0 0 35px rgba(238, 180, 203, 0.6), 0 0 50px rgba(242, 174, 190, 0.4)',
      },
      animation: {
        'float': 'float 6s linear infinite',
        'fadeIn': 'fadeIn 1s ease-in-out',
      },
      keyframes: {
        float: {
          '0%': { transform: 'translateY(0)', opacity: 1 },
          '100%': { transform: 'translateY(-100vh)', opacity: 0 },
        },
        fadeIn: {
          '0%': { opacity: 0, transform: 'scale(0.5)' },
          '100%': { opacity: 1, transform: 'scale(1)' },
        },
      },
    },
  },
  plugins: [],
}

