import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        gold: "#c9a84c",
        "gold-light": "#f5e6c0",
        "gold-dark": "#9a7a2e",
        garnet: "#6b1f2a",
        ink: "#0f0a0b",
        linen: "#f5f0eb"
      },
      fontFamily: {
        serif: ["Georgia", "serif"]
      },
      boxShadow: {
        lift: "0 16px 48px rgba(0, 0, 0, 0.28)"
      }
    }
  },
  plugins: []
};

export default config;
