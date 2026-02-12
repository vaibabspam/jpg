/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        bg: '#050816',
        panel: '#0b1224',
        line: '#1e2a4a',
        brand: '#4ea3ff',
        accent: '#67f0cf'
      },
      boxShadow: {
        glow: '0 0 0 1px rgba(78,163,255,.5),0 10px 25px rgba(8,19,40,.4)'
      }
    }
  },
  plugins: []
};
