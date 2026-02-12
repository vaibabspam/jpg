/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        ink: '#0A0E14',
        steel: '#111827',
        cyan: '#22D3EE',
        slate: '#94A3B8'
      },
      boxShadow: {
        glow: '0 0 0 1px rgba(34,211,238,0.2),0 10px 30px rgba(2,8,23,0.35)'
      }
    }
  },
  plugins: []
};
