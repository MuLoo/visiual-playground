import PropTypes from "prop-types";
import { useMemo } from "react";
// material
import { CssBaseline } from "@mui/material";
import {
  ThemeProvider as MUIThemeProvider,
  createTheme,
  StyledEngineProvider,
  ThemeOptions,
} from "@mui/material/styles";
import type {
  Theme as MuiTheme,
  TypographyVariantsOptions,
  Palette,
} from "@mui/material/styles";
// import type { CustomGrey } from './palette';

import palette from "./palette";
import typography from "./typography";
import componentsOverride from "./overrides";
import shadows, { customShadows } from "./shadows";
import type { GradientCustom, CustomPalette } from "./palette";

console.log("palette ----", palette);
// --------------------------------------------------

declare module "@mui/material/styles" {
  interface Theme {
    customShadows: { [prop: string]: string };
    palette: CustomPalette;
  }
  interface ThemeOptions {
    customShadows?: Theme["customShadows"];
  }
}

export default function ThemeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const themeOptions: ThemeOptions = useMemo(
    () => ({
      palette,
      shape: { borderRadius: 8 },
      typography: typography as TypographyVariantsOptions,
      shadows,
      customShadows,
    }),
    []
  );

  const theme = createTheme(themeOptions);
  theme.components = componentsOverride(theme);

  return (
    <StyledEngineProvider injectFirst>
      <MUIThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </MUIThemeProvider>
    </StyledEngineProvider>
  );
}
