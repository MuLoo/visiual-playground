import { alpha, createTheme } from "@mui/material/styles";
import type { Color, PaletteColor, PaletteOptions } from "@mui/material";

// --------- type -----------

export type CustomGrey = Omit<Color, 50 | "A100" | "A200" | "A400" | "A700"> & {
  0: string;
  500_8: string;
  500_12: string;
  500_16: string;
  500_24: string;
  500_32: string;
  500_48: string;
  500_56: string;
  500_80: string;
};

export type ColorTypeCustom = PaletteColor & {
  lighter: string;
  darker: string;
};

export type GradientCustom = {
  primary: string;
  info: string;
  success: string;
  warning: string;
  error: string;
};

export type ChartColorCustom = {
  violet: [string, string, string, string];
  blue: [string, string, string, string];
  green: [string, string, string, string];
  yellow: [string, string, string, string];
  red: [string, string, string, string];
};

// export type CustomActionType = {
//   active: string;
//   hover: string;
//   selected: string;
//   disabled: string;
//   disabledBackground: string;
//   focus: string;
//   hoverOpacity: number;
//   disabledOpacity: number;
// };

export type CustomPalette = Omit<PaletteOptions, "grey"> & {
  grey: CustomGrey;
  chart: ChartColorCustom;
  gradients: GradientCustom;
} & Record<
    "primary" | "secondary" | "info" | "success" | "warning" | "error",
    ColorTypeCustom
  >;

function createGradient(color1: string, color2: string) {
  return `linear-gradient(to bottom, ${color1}, ${color2})`;
}

// ----------- variable -------------
const defaultTheme = createTheme();
// SETUP COLORS
const GREY: CustomGrey = {
  0: "#FFFFFF",
  100: "#F9FAFB",
  200: "#F4F6F8",
  300: "#DFE3E8",
  400: "#C4CDD5",
  500: "#919EAB",
  600: "#637381",
  700: "#454F5B",
  800: "#212B36",
  900: "#161C24",
  500_8: alpha("#919EAB", 0.08),
  500_12: alpha("#919EAB", 0.12),
  500_16: alpha("#919EAB", 0.16),
  500_24: alpha("#919EAB", 0.24),
  500_32: alpha("#919EAB", 0.32),
  500_48: alpha("#919EAB", 0.48),
  500_56: alpha("#919EAB", 0.56),
  500_80: alpha("#919EAB", 0.8),
};

const PRIMARY: ColorTypeCustom = {
  lighter: "#D1E9FC",
  light: "#76B0F1",
  main: "#2065D1",
  dark: "#103996",
  darker: "#061B64",
  contrastText: "#fff",
};

const SECONDARY: ColorTypeCustom = {
  lighter: "#D6E4FF",
  light: "#84A9FF",
  main: "#3366FF",
  dark: "#1939B7",
  darker: "#091A7A",
  contrastText: "#fff",
};

const INFO: ColorTypeCustom = {
  lighter: "#D0F2FF",
  light: "#74CAFF",
  main: "#1890FF",
  dark: "#0C53B7",
  darker: "#04297A",
  contrastText: "#fff",
};

const SUCCESS: ColorTypeCustom = {
  lighter: "#E9FCD4",
  light: "#AAF27F",
  main: "#54D62C",
  dark: "#229A16",
  darker: "#08660D",
  contrastText: GREY[800],
};

const WARNING: ColorTypeCustom = {
  lighter: "#FFF7CD",
  light: "#FFE16A",
  main: "#FFC107",
  dark: "#B78103",
  darker: "#7A4F01",
  contrastText: GREY[800],
};

const ERROR: ColorTypeCustom = {
  lighter: "#FFE7D9",
  light: "#FFA48D",
  main: "#FF4842",
  dark: "#B72136",
  darker: "#7A0C2E",
  contrastText: "#fff",
};

const GRADIENTS: GradientCustom = {
  primary: createGradient(PRIMARY.light, PRIMARY.main),
  info: createGradient(INFO.light, INFO.main),
  success: createGradient(SUCCESS.light, SUCCESS.main),
  warning: createGradient(WARNING.light, WARNING.main),
  error: createGradient(ERROR.light, ERROR.main),
};

const CHART_COLORS: ChartColorCustom = {
  violet: ["#826AF9", "#9E86FF", "#D0AEFF", "#F7D2FF"],
  blue: ["#2D99FF", "#83CFFF", "#A5F3FF", "#CCFAFF"],
  green: ["#2CD9C5", "#60F1C8", "#A4F7CC", "#C0F2DC"],
  yellow: ["#FFE700", "#FFEF5A", "#FFF7AE", "#FFF3D6"],
  red: ["#FF6C40", "#FF8F6D", "#FFBD98", "#FFF2D4"],
};

const CUSTOMACTION = {
  active: GREY[600],
  hover: GREY[500_8],
  selected: GREY[500_16],
  disabled: GREY[500_80],
  disabledBackground: GREY[500_24],
  focus: GREY[500_24],
  hoverOpacity: 0.08,
  disabledOpacity: 0.48,
};

const palette: CustomPalette = {
  ...defaultTheme.palette,
  common: { black: "#000", white: "#fff" },
  primary: { ...PRIMARY },
  secondary: { ...SECONDARY },
  info: { ...INFO },
  success: { ...SUCCESS },
  warning: { ...WARNING },
  error: { ...ERROR },
  grey: GREY,
  gradients: GRADIENTS,
  chart: CHART_COLORS,
  divider: GREY[500_24],
  text: { primary: GREY[800], secondary: GREY[600], disabled: GREY[500] },
  background: { paper: "#fff", default: GREY[100] },
  action: CUSTOMACTION,
};

export default palette;
