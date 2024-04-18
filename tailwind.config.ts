import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        color1: "var(--color1)",
        color2: "var(--color2)",
        color3: "var(--color3)",
        color4: "var(--color4)",
        color5: "var(--color5)",
        color6: "var(--color6)",
        color7: "var(--color7)",
        color8: "var(--color8)",
        xblue: "var(--xblue)",
        xpurple: "var(--xpurple)",
        xindigo: "var(--xindigo)",
        xred: "var(--xred)",
        xpink: "var(--xpink)",
        xorange: "var(--xred)",
        xyellow: "var(--xyellow)",
        xteal: "var(--xteal)",
        xcyan: "var(--xcyan)",
        xgray: "var(--xgray)",
        xgraydark: "var(--xgraydark)",
        xgrayhover: "var(--xgrayhover)",
        xdanger: "var(--xdanger)",
        xwarning: "var(--xwarning)",
        xsuccess: "var(--xsuccess)",
        xlight: "var(--xlight)",
        xdark: "var(--xdark)",
        xgraynavtext: "var(--xgraynavtext)",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};
export default config;
