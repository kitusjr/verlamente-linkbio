import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        premium: {
          light: '#FFD700',
          DEFAULT: '#B8860B',
          dark: '#8B6914'
        }
      },
      keyframes: {
        pulseGlow: {
          '0%': { transform: 'scale(1)', filter: 'brightness(1)' },
          '50%': { transform: 'scale(1.2)', filter: 'brightness(1.3)' },
          '100%': { transform: 'scale(1)', filter: 'brightness(1)' }
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-4px)' }
        },
        shimmer: {
          '0%': { backgroundPosition: '200% 0' },
          '100%': { backgroundPosition: '-200% 0' }
        }
      },
      animation: {
        'pulse-glow': 'pulseGlow 2s ease-in-out infinite, float 3s ease-in-out infinite',
        'shimmer': 'shimmer 8s ease-in-out infinite'
      }
    },
  },
  plugins: [],
} satisfies Config;
