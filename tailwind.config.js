/** @type {import('tailwindcss').Config} */
export default {
  // Wraps every hover: utility in @media (hover: hover). Without it, tapping a
  // card on a phone triggers hover and it stays lifted until you tap elsewhere.
  future: { hoverOnlyWhenSupported: true },
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        mono: ['"IBM Plex Mono"', 'monospace'],
      },
      colors: {
        // Sky-blue surface system for the Projects page.
        page: '#EEF5FB',
        surface: '#D9E8F5',
        // Card hover. Must stay distinct from `plate`, or the image area
        // disappears into the card on hover.
        'surface-deep': '#C9DFF1',
        // Image placeholder / cover backing.
        plate: '#BCD8EE',
        'plate-rule': '#A3C8E4',
        accent: '#A8CDE8',
        'accent-deep': '#93BFE0',
        hairline: '#BFD8EC',
        ink: '#0F1720',
        'ink-muted': '#40566B',
      },
    },
  },
  plugins: [],
};
