// TODO: write documentation for colors and palette in own markdown file and add links from here

const palette = {
  neutral100: "#FFFFFF",
  neutral200: "#FEFEFE",
  neutral250: "#f0ecec",
  neutral300: "#D7CEC9",
  neutral400: "#B6ACA6",
  neutral500: "#978F8A",
  neutral600: "#564E4A",
  neutral700: "#3C3836",
  neutral800: "#191015",
  neutral900: "#000000",

  primary100: "#0060B1",
  primary200: "#0083E2",
  primary300: "#44aaf2",
  primary400: "#619acc",
  primary500: "#C76542",
  primary600: "#A54F31",

  primaryOverlay15: "rgba(0,131,226,0.15)",
  primaryOverlay80: "rgba(0,131,226,0.8)",

  secondary100: "#DCDDE9",
  secondary200: "#BCC0D6",
  secondary300: "#9196B9",
  secondary400: "#626894",
  secondary500: "#41476E",

  accent100: "#FFEED4",
  accent200: "#FFE1B2",
  accent300: "#FDD495",
  accent400: "#FBC878",
  accent500: "#FFBB50",

  angry100: "#F2D6CD",
  angry500: "#C03403",

  status: { offline: "#ff0000", online: "#00ff00", away: "#ffff00" },

  overlay20: "rgba(25, 16, 21, 0.2)",
  overlay50: "rgba(25, 16, 21, 0.5)",

  grey: "#e5e5eb",
  greyOverlay100: "rgba(180,180,180,0.5)",

  overlayNeutral50: "rgba(255,255,255,0.5)",

  glow100: "#4EFFDF",
}

export const colors = {
  /**
   * The palette is available to use, but prefer using the name.
   * This is only included for rare, one-off cases. Try to use
   * semantic names as much as possible.
   */
  palette,
  /**
   * A helper for making something see-thru.
   */
  transparent: "rgba(0, 0, 0, 0)",
  /**
   * The default text color in many components.
   */
  text: palette.neutral800,
  /**
   * Secondary text information.
   */
  textDim: palette.overlayNeutral50,
  /**
   * The default color of the screen background.
   */
  background: palette.neutral250,
  /**
   * The default border color.
   */
  border: palette.neutral400,
  /**
   * The main tinting color.
   */
  tint: palette.primary300,
  /**
   * A subtle color used for lines.
   */
  separator: palette.neutral300,
  /**
   * Error messages.
   */
  error: palette.glow100,
  /**
   * Error Background.
   *
   */

  backgroundGrey: palette.neutral250,
  errorBackground: palette.angry100,
}
