/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        navy: {
          950: '#000000',
          900: '#050505',
          800: '#0B0B0B',
          700: '#141414',
          600: '#1F1F1F',
        },
        gold: {
          300: '#8EE47F',
          400: '#56D546',
          500: '#30C122',
          600: '#28A41D',
          700: '#1F8317',
        },
        cream: {
          50: '#FAFAF8',
          100: '#F5F4F0',
          200: '#E8E7E2',
          300: '#D4D3CE',
          400: '#B8B7B2',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      maxWidth: {
        '8xl': '88rem',
        '9xl': '96rem',
      },
      transitionTimingFunction: {
        'expo-out': 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
    },
  },
  plugins: [],
}
