tailwind.config = {
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: "#8c25f4",
        accent: "#39ff14",
        "background-light": "#f7f5f8",
        "background-dark": "#0a0a0c",
        "surface-dark": "#141118",
        discord: "#5865F2",
      },
      fontFamily: {
        display: ["Lexend", "sans-serif"],
        mono: ["Share Tech Mono", "monospace"],
      },
      borderRadius: {
        DEFAULT: "0.125rem",
        lg: "0.25rem",
        xl: "0.5rem",
        full: "0.75rem",
      },
      animation: {
        "spin-slow": "spin 12s linear infinite",
        "pulse-fast": "pulse 1.5s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        glitch: "glitch 1s linear infinite",
        matrix: "matrix 20s linear infinite",
        float: "float 6s ease-in-out infinite",
        "plug-in": "plugIn 2s ease-out forwards",
        scan: "scan 3s ease-in-out infinite",
        flicker: "flicker 0.15s infinite",
      },
      keyframes: {
        glitch: {
          "2%, 64%": { transform: "translate(2px,0) skew(0deg)" },
          "4%, 60%": { transform: "translate(-2px,0) skew(0deg)" },
          "62%": { transform: "translate(0,0) skew(5deg)" },
        },
        matrix: {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(100%)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-20px)" },
        },
        plugIn: {
          "0%": { transform: "translateX(-100%) scale(0.8)", opacity: "0" },
          "60%": { transform: "translateX(10%) scale(1.1)", opacity: "1" },
          "100%": { transform: "translateX(0) scale(1)", opacity: "1" },
        },
        scan: {
          "0%": { top: "0%", opacity: "0" },
          "10%": { opacity: "1" },
          "90%": { opacity: "1" },
          "100%": { top: "100%", opacity: "0" },
        },
        flicker: {
          "0%": { opacity: "0.9" },
          "5%": { opacity: "0.8" },
          "10%": { opacity: "0.9" },
          "15%": { opacity: "0.85" },
          "100%": { opacity: "1" },
        },
      },
    },
  },
};
