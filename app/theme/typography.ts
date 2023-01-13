import { Platform } from "react-native"
import {
  HelveticaNeue300Light,
  HelveticaNeue400Regular,
  HelveticaNeue500Medium,
  HelveticaNeue600SemiBold,
  HelveticaNeue700Bold,
} from "../theme/fonts"

export const customFontsToLoad = {
  HelveticaNeue300Light,
  HelveticaNeue400Regular,
  HelveticaNeue500Medium,
  HelveticaNeue600SemiBold,
  HelveticaNeue700Bold,
}

const fonts = {
  spaceGrotesk: {
    // Cross-platform Google font.
    light: "HelveticaNeue300Light",
    normal: "HelveticaNeue400Regular",
    medium: "HelveticaNeue500Medium",
    semiBold: "HelveticaNeue600SemiBold",
    bold: "HelveticaNeue700Bold",
  },
  helveticaNeue: {
    // iOS only font.
    thin: "HelveticaNeue-Thin",
    light: "HelveticaNeue-Light",
    normal: "Helvetica Neue",
    medium: "HelveticaNeue-Medium",
  },
  courier: {
    // iOS only font.
    normal: "Courier",
  },
  sansSerif: {
    // Android only font.
    thin: "sans-serif-thin",
    light: "sans-serif-light",
    normal: "sans-serif",
    medium: "sans-serif-medium",
  },
  monospace: {
    // Android only font.
    normal: "monospace",
  },
}

export const typography = {
  /**
   * The fonts are available to use, but prefer using the semantic name.
   */
  fonts,
  /**
   * The primary font. Used in most places.
   */
  primary: fonts.spaceGrotesk,
  /**
   * An alternate font used for perhaps titles and stuff.
   */
  secondary: Platform.select({ ios: fonts.helveticaNeue, android: fonts.sansSerif }),
  /**
   * Lets get fancy with a monospace font!
   */
  code: Platform.select({ ios: fonts.courier, android: fonts.monospace }),
}
