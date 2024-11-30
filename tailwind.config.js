module.exports = {
  content: [
    "./src/**/*.{html,ts}",  // Asegura que Tailwind escanee todos los archivos HTML y TypeScript
  ],
  theme: {
    extend: {
      colors: {
        jade: '#00A86B', // El color jade en formato hexadecimal
      },
    },
  },
  plugins: [],
}
