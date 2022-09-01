module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      height: {
        search: "4rem",
        menu: "4rem",
      },
      width: {
        sidebar: "10rem",
        menu: "8rem",
      },
      spacing: {
        base: "1rem",
      },
      transitionProperty: {
        height: "height",
      },
    },
  },
  plugins: [require("tailwind-scrollbar-hide")],
};
