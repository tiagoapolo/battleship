import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {},
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: "#00a7a1",

          secondary: "#00b7bf",

          accent: "#805700",

          neutral: "#00282f",

          "base-100": "#21203b",

          info: "#1b8af1",

          success: "#00eba9",

          warning: "#c25b00",

          error: "#ff93a9",
        },
      },
    ],
  },
};
export default config;
