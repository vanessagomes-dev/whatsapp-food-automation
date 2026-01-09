/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class', 
  
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}"
  ],
  theme: {
    extend: {
      // Aqui personaliza cores específicas para o modo escuro 
    },
  },
  plugins: [],
}