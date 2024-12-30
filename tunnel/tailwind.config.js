/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{html,js,jsx,ts,tsx}", // Ajoutez ce chemin pour que Tailwind purge les classes inutilisées dans tous vos fichiers .tsx et .ts
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}

