module.exports = {
  content: [
    "./src/**/*.{html,ts}",  // Asegura que Tailwind escanee todos los archivos HTML y TypeScript
  ],
  theme: {
    extend: {
      fontFamily: {
        // Añadir una fuente personalizada
        custom: ['MyFont', 'sans-serif'],
        inter: ['Inter', 'sans-serif'],
      },
      colors: {
        jade: '#00A86B', // El color jade en formato hexadecimal
      },
    },
  },
  plugins: [],
}
