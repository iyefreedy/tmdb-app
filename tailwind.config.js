import plugin from 'tailwindcss/plugin'

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "selector",
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        "roboto": ["Roboto", "sans-serif"]
      },
      gridTemplateColumns: {
        'card': 'repeat(auto-fill, minmax(200px, 1fr));'
      },
      textShadow: {
        sm: '0px 1px 3px var(--tw-shadow-color)',
        DEFAULT: '0px 2px 5px var(--tw-shadow-color)',
        lg: '0px 3px 7px var(--tw-shadow-color)',
        xl: '0px 5px 10px var(--tw-shadow-color)'
      },
      animation: {
        "fade-in": "fadeIn 1s ease-in",
        "fade-card": "fadeCard .3s ease-in"
      },
      keyframes: {
        fadeCard: {
          from: {
            opacity: 0.8,
          },
          to: {
            opacity: 1
          }
        },
        fadeIn: {
          from: {
            opacity: 0,
          },
          to: {
            opacity: 1
          }
        }
      }
    },
  },
  plugins: [

    plugin(function ({ matchUtilities, theme }) {
      matchUtilities({
        'text-shadow': (value) => ({
          textShadow: value
        })
      }, {
        values: theme('textShadow')
      })
    })
  ],
}

