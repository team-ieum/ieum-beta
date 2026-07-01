/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        'main-blue': '#007ba7',
        'deep-blue': '#29537c',
        'light-blue': '#e0f6ff',
        neutral: {
          50: '#fafafa',
          100: '#f5f5f5',
          200: '#e7e7e7',
          400: '#959595',
          500: '#767676',
          600: '#595959',
          700: '#333333',
          900: '#111111',
        },
      },
      fontFamily: {
        pretendard: ['Pretendard', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        logo: ['RixInooAriDuri', 'Pretendard', 'sans-serif'],
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
      },
    },
  },
  plugins: [],
};
