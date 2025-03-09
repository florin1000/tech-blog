/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // Adjust paths as needed
    "./public/index.html",
  ],
  theme: {
    extend: {
      boxShadow: {
        'custom': '0 8px 20px #eaeaea',
      },
    },
  },
  plugins: [],
}
