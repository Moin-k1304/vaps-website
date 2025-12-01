import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Custom VAPS colors from your CSS
        'purple-primary': '#9810FA',
        'purple-light': '#8b0ff8',
        'purple-dark': '#553C9A',
        'blue-primary': '#03297B',
        'blue-light': '#3B82F6',
        'dark-bg': '#1A1A1A',
        'orange': '#FF7B00',
        'green': '#10B981',
        'gray-light': '#FAFAFA',
        'gray-medium': '#898990',
        'gray-dark': '#717171',
      },
      fontFamily: {
        'poppins': ['Poppins', 'sans-serif'],
        'inter': ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
      },
      animation: {
        'float': 'float 3s ease-in-out infinite',
        'particle-float': 'particleFloat 20s infinite',
        'platform-pulse': 'platformPulse 3s infinite',
        'rotate': 'rotate 20s linear infinite',
        'orbit-rotate': 'orbitRotate 20s linear infinite',
        'robot-idle': 'robotIdle 4s ease-in-out infinite',
        'screen-pulse': 'screenPulse 3s ease-in-out infinite',
        'robot-interact': 'robotInteract 5s ease-in-out infinite',
        'human-breathe': 'humanBreathe 4s ease-in-out infinite',
        'karnataka-glow': 'karnatakaGlow 3s ease-in-out infinite',
        'hand-reach': 'handReach 4s ease-in-out infinite',
        'pulse-ring': 'pulseRing 1s ease-out infinite',
        'fade-in': 'fadeIn 1s ease-in',
        'fade-in-up': 'fadeInUp 0.8s ease-out',
        'gradient': 'gradient 3s ease infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' }
        },
        particleFloat: {
          '0%, 100%': { transform: 'translateY(0) scale(1)' },
          '50%': { transform: 'translateY(-20px) scale(1.1)' }
        },
        platformPulse: {
          '0%, 100%': { transform: 'scale(1)', opacity: '0.6' },
          '50%': { transform: 'scale(1.2)', opacity: '0.8' }
        },
        rotate: {
          from: { transform: 'rotate(0deg)' },
          to: { transform: 'rotate(360deg)' }
        },
        orbitRotate: {
          from: { transform: 'translate(-50%, -50%) rotate(0deg)' },
          to: { transform: 'translate(-50%, -50%) rotate(360deg)' }
        },
        robotIdle: {
          '0%, 100%': { transform: 'translateY(0) scale(1)' },
          '50%': { transform: 'translateY(-5px) scale(1.02)' }
        },
        screenPulse: {
          '0%, 100%': { opacity: '0.6', boxShadow: '0 0 40px rgba(139, 92, 246, 0.5)' },
          '50%': { opacity: '1', boxShadow: '0 0 60px rgba(139, 92, 246, 0.8)' }
        },
        robotInteract: {
          '0%, 100%': { transform: 'translateX(0) rotate(0deg)' },
          '50%': { transform: 'translateX(20px) rotate(5deg)' }
        },
        humanBreathe: {
          '0%, 100%': { transform: 'translateY(0) scale(1)' },
          '50%': { transform: 'translateY(-10px) scale(1.05)' }
        },
        karnatakaGlow: {
          '0%, 100%': { opacity: '0.8' },
          '50%': { opacity: '1' }
        },
        handReach: {
          '0%, 100%': { transform: 'translateX(0) translateY(0)' },
          '50%': { transform: 'translateX(-20px) translateY(-10px)' }
        },
        pulseRing: {
          '0%': { transform: 'scale(1)', opacity: '1' },
          '100%': { transform: 'scale(1.5)', opacity: '0' }
        },
        fadeIn: {
          from: { opacity: '0' },
          to: { opacity: '1' }
        },
        fadeInUp: {
          from: { opacity: '0', transform: 'translateY(30px)' },
          to: { opacity: '1', transform: 'translateY(0)' }
        },
        gradient: {
          '0%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '0% 50%' }
        }
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
}

export default config
