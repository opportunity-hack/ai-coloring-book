import { createTheme } from "@mantine/core";

// Brand teal built around the site's existing accent #12b886 (index 6).
// "sunshine" is the crayon-yellow accent used for step badges and highlights.
export const theme = createTheme({
  primaryColor: "brand",
  primaryShade: 6,
  colors: {
    brand: [
      "#e6fcf5",
      "#c3fae8",
      "#96f2d7",
      "#63e6be",
      "#38d9a9",
      "#20c997",
      "#12b886",
      "#0ca678",
      "#099268",
      "#087f5b",
    ],
    sunshine: [
      "#fff9db",
      "#fff3bf",
      "#ffec99",
      "#ffe066",
      "#ffd43b",
      "#fcc419",
      "#fab005",
      "#f59f00",
      "#f08c00",
      "#e67700",
    ],
  },
  defaultRadius: "md",
  fontFamily: "var(--font-inter), system-ui, sans-serif",
  headings: {
    fontFamily: "var(--font-fredoka), var(--font-inter), system-ui, sans-serif",
    fontWeight: "600",
  },
  components: {
    Button: { defaultProps: { radius: "xl" } },
  },
});
