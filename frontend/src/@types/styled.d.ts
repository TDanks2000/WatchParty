import "styled-components";
import { darkTheme } from "../assets/themes/dark";
type CustomTheme = typeof defaultTheme;

declare module "styled-components" {
  export interface DefaultTheme extends darkTheme {
    base: {
      mainColor: string;
      SecondColor: string;

      bg: string;
      navBg: string;
      darkBg: string;
      offDarkBg: string;
      gold: string;
    };

    spacing: {
      paddingLeft: string;
      paddingRight: string;
      paddingTop: string;
      paddingBottom: string;
    };

    text: {
      primary: string;
      secondary: string;
      offWhite: string;

      warning: string;
      success: string;
      confused: string;
      danger: string;
      fonts: {
        NunitoSans: string;
      };
    };
  }
}
