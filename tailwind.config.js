/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'pitch-black': '#000000',
        'vibrant-scarlet': '#FF0000',
        'stark-white': '#FFFFFF',
        'surface': '#131313',
        'surface-dim': '#131313',
        'surface-bright': '#393939',
        'surface-container-lowest': '#0e0e0e',
        'surface-container-low': '#1b1b1b',
        'surface-container': '#1f1f1f',
        'surface-container-high': '#2a2a2a',
        'surface-container-highest': '#353535',
        'on-surface': '#e2e2e2',
        'secondary': '#c6c6c7',
        'secondary-fixed': '#e2e2e2',
        'outline': '#b18780',
        // Alias so the event-archive components (which use `flame` as their
        // accent color name) map onto the site's existing scarlet accent.
        'flame': '#FF0000',
      },
      fontFamily: {
        'display-xl': ['Anybody', 'sans-serif'],
        'headline-lg': ['Anybody', 'sans-serif'],
        'headline-lg-mobile': ['Anybody', 'sans-serif'],
        'body-md': ['Hanken Grotesk', 'sans-serif'],
        'mono-label': ['Space Mono', 'monospace'],
        'button-text': ['Space Mono', 'monospace'],
        // Alias used by the event-archive components as `font-display`.
        'display': ['Anybody', 'sans-serif'],
      },
      fontSize: {
        'display-xl': ['120px', { lineHeight: '110px', letterSpacing: '-0.04em', fontWeight: '800' }],
        'headline-lg': ['64px', { lineHeight: '72px', letterSpacing: '-0.02em', fontWeight: '700' }],
        'headline-lg-mobile': ['40px', { lineHeight: '44px', fontWeight: '700' }],
        'body-md': ['18px', { lineHeight: '28px', fontWeight: '400' }],
        'mono-label': ['14px', { lineHeight: '20px', letterSpacing: '0.05em', fontWeight: '400' }],
        'button-text': ['16px', { lineHeight: '16px', fontWeight: '700' }],
      },
      spacing: {
        'grid-unit': '4px',
        'gutter': '2rem',
        'section-padding': '8rem',
      },
      borderRadius: {
        DEFAULT: '0px',
        'none': '0px',
        'full': '9999px',
      },
    },
  },
  plugins: [],
}
