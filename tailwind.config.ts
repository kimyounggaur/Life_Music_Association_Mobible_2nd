import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        bg: "var(--bg)",
        surface: { DEFAULT: "var(--surface)", 2: "var(--surface-2)" },
        primary: {
          DEFAULT: "var(--primary)",
          pressed: "var(--primary-pressed)",
          soft: "var(--primary-soft)",
        },
        secondary: "var(--secondary)",
        accent: "var(--accent)",
        ink: {
          DEFAULT: "var(--text)",
          muted: "var(--text-muted)",
          disabled: "var(--text-disabled)",
        },
        line: { DEFAULT: "var(--border)", strong: "var(--border-strong)" },
        success: "var(--success)",
        warning: "var(--warning)",
        danger: "var(--danger)",
        "on-primary": "var(--on-primary)",
        "on-accent": "var(--on-accent)",
        "on-danger": "var(--on-danger)",
      },
      borderRadius: {
        sm: "var(--r-sm)",
        md: "var(--r-md)",
        lg: "var(--r-lg)",
        xl: "var(--r-xl)",
        pill: "var(--r-pill)",
      },
      boxShadow: {
        e1: "var(--e-1)",
        e2: "var(--e-2)",
        e3: "var(--e-3)",
      },
      spacing: {
        "safe-t": "var(--safe-top)",
        "safe-b": "var(--safe-bottom)",
      },
      fontFamily: {
        sans: [
          "Pretendard Variable",
          "Pretendard",
          "-apple-system",
          "BlinkMacSystemFont",
          "system-ui",
          "sans-serif",
        ],
        display: ["Pretendard Variable", "Pretendard", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
