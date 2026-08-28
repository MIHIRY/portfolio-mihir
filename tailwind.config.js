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
        // Dark set, used only by /skills. Same blue-black family as `ink`, so
        // the page reads as this site with the lights off rather than as a
        // different site. Steps chosen for separation, not taste: card/page is
        // 1.28:1 and pill/card 1.33:1, which is what makes a box look like a
        // box on near-black. All text pairings clear WCAG AA.
        // Skills page. Neutral monochrome, not a tinted dark — the only colour
        // on that page comes from the technology marks themselves.
        // The load-bearing relationship is page -> card -> ink -> muted.
        night: '#0D0D0D',
        'night-card': '#1C1C1C',
        'night-card-hover': '#222222',
        // Deliberately *darker* than the card, so pills and icon plates read as
        // inset rather than raised.
        'night-pill': '#171717',
        'night-ink': '#F2F2F2',
        'night-muted': '#9C9C9C',
        'night-pill-ink': '#B0B0B0',
        // 2.6:1 on the card — decorative only, never body text.
        'night-dim': '#5D5D5D',
        'night-border': '#252525',
      },
    },
  },
  plugins: [],
};
