import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        tan: "#F5DEB3",
        gray: {
          800: "#4F4F4F",
          900: "#2F2F2F",
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
