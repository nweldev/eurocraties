import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: 'class',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  safelist: ['border-red-800', 'border-2', 'bg-blue-800', 'bg-sky-600', 'bg-sky-800', 'bg-blue-950', 'bg-zinc-500', 'bg-yellow-400'],
  plugins: [require('flowbite/plugin')],
  theme: {
    extend: {
      strokeWidth: {
        '4': '4px',
        '5': '5px',
      },
    },
  },
};
export default config;
