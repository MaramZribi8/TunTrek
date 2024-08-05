// tailwind.config.js

module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#09caa4',
        secondary: '#F5385D',
        third:'#FF4500'
      },
      padding: {
        'frame': '20px',
       
      },
    },
  },
  plugins: [],
};
