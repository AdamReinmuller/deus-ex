import { extendTheme } from "@chakra-ui/react";
import { createBreakpoints } from "@chakra-ui/theme-tools";

import styles from "./globalStyle";
import colors from "./colors";
import shadows from "./shadows";
import { headingStyles, textStyles } from "./typoStyles";

const fonts = {
  body: "'Montserrat', sans-serif",
  heading: "'Montserrat', sans-serif",
  mono: "'Montserrat', sans-serif",
};

enum Breakpoints {
  sm = "40em", // 640px
  md = "52em", // 832px
  lg = "75em", // 1200px
  xl = "100em", // 1600px
}

const breakpoints = createBreakpoints({
  sm: Breakpoints.sm,
  md: Breakpoints.md,
  lg: Breakpoints.lg,
  xl: Breakpoints.xl,
});

const theme = extendTheme({
  fonts,
  colors,
  shadows,
  styles,
  components: {
    Heading: headingStyles,
    Text: textStyles,
  },
  fontSizes: {
    xs: "12px",
    sm: "14px",
    md: "16px",
    lg: "18px",
    xl: "20px",
    "2xl": "24px",
    "3xl": "28px",
    "4xl": "36px",
    "5xl": "48px",
    "6xl": "64px",
  },
  breakpoints,
});

export default theme;
