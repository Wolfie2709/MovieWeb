import type { Config } from "tailwindcss"
import scrollbarHide from 'tailwind-scrollbar-hide'
import animate from 'tailwindcss-animate'


const config: Config = {
    darkMode: "class",
    content: [
        './pages/**/*.{ts,tsx}',
        './components/**/*.{ts,tsx}',
        './app/**/*.{ts,tsx}',
        './src/**/*.{ts,tsx}',
    ],
    prefix: "",
    theme: {
        container: {
            center: true,
            padding: "2rem",
            screens: {
                "2xl": "1400px",
            },
        },
        extend: {
            colors: {
                mainColor: "#121212",
                "red-main": "#ef4444",
            },
            boxShadow: {
                "btn": "0 10px 24px rgba(239, 68, 68, 0.45)",
                "btn-hover": "0 16px 30px rgba(239, 68, 68, 0.6)",
            },
            keyframes: {
                "accordion-down": {
                    from: {height: "0"},
                    to: {height: "var(--radix-accordion-content-height)"}
                },
                "accordion-up": {
                    from: {height: "var(--radix-accordion-content-height)"},
                    to: {height: "0"}
                },
            },
            animation: {
                "accordion-down": "accordion-down 0.2s ease-out",
                "accordion-up": "accordion-up 0.2s ease-out",
            },
        }
    },
    plugins: [scrollbarHide, animate]
}

export default config;