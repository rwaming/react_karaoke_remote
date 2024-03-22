import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      spacing: {
        '1/4vw': '25vw',
        '1/2vw': '50vw',
        '3/4vw': '75vw',
        '1/8vw': '12.5vw',
        '1/10vw': '10vw',
        '16-9vh': '56.25vw',
        '1/4vh': '25vh',
        '1/2vh': '50vh',
        '3/4vh': '75vh',
        '1/8vh': '12.5vh',
        '1/10vh': '10vh',
      },
      colors: {
        dark: '#222244',
        light: '#ffffee',
      },
    },
  },
  plugins: [],
}
export default config
