import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                sans: ["var(--font-poppins)", "sans-serif"],
            },
            colors: {
                background: "var(--background)",
                foreground: "var(--foreground)",
                olive: "#5a6c42", // Muted olive green
            },
            borderRadius: {
                'none': '0px',
                'sm': '0px',
                DEFAULT: '0px',
                'md': '0px',
                'lg': '0px',
                'xl': '0px',
                '2xl': '0px',
                '3xl': '0px',
                'full': '0px',
            },
            boxShadow: {
                'sm': 'none',
                DEFAULT: 'none',
                'md': 'none',
                'lg': 'none',
                'xl': 'none',
                '2xl': 'none',
                'inner': 'none',
            },
            dropShadow: {
                'sm': '0 0 0 transparent',
                DEFAULT: '0 0 0 transparent',
                'md': '0 0 0 transparent',
                'lg': '0 0 0 transparent',
                'xl': '0 0 0 transparent',
                '2xl': '0 0 0 transparent',
                'none': '0 0 0 transparent',
            }
        },
    },
    plugins: [],
};
export default config;
