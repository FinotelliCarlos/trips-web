/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'search-background': 'url(/world-map.png)',
      },

      colors: {
        primary: '#2a9d8f',
        primaryLighter: '#DDD5EA',
        primaryDarker: '#246a73',
        primaryGray: '#717171',
        primaryGrayLighter: '#BBBFBF',
        walterWhite: '#f5f5f5'
      },
      textColor: {
        dark: "#717171"
      }
    },
  },
  plugins: [],
}
