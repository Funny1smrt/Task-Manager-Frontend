import { createTheme } from "@mui/material/styles";
const primaryBase = "#ff8f8f";
const primaryMain = "#ff5c5c";
import { alpha, getContrastRatio } from "@mui/material";
export const theme = createTheme({
    colorSchemes: {
        light: {
            palette: {
                mode: "light",
                primary: {
                    main: primaryMain,
                    light: alpha(primaryBase, 0.5),
                    dark: alpha(primaryBase, 0.9),
                    contrastText:
                        getContrastRatio(primaryMain, "#fff") > 4.5
                            ? "#fff"
                            : "#111",
                },
                text: {
                    primary: "#000000",
                    secondary: "#000000",
                    disabled: "#ff8f8f",
                    hint: "#ff8f8f",
                    icon: "#ff8f8f",
                    contrastText: "#ff8f8f",
                },
                button: {
                    main: "#72bef9",
                    contrastText: "#fff",
                    active: "#72bef9",
                    hover: "#c2e2fa",
                    selected: "#c2e2fa",
                    disabled: "#c2e2fa",
                    disabledBackground: "#c2e2fa",
                    focus: "#c2e2fa",
                    hoverOpacity: 0.04,
                    selectedOpacity: 0.08,
                },
                secondary: {
                    main: "#f44336",
                },
                background: {
                    default: "#fff8c7",
                    paper: "#fff8c7",
                },
            },
        },
        dark: {
            palette: {
                mode: "dark",
                primary: {
                    main: "#c2a47e",
                    dark: "#c2a47e",
                },
                secondary: {
                    main: "#f44336",
                },
                background: {
                    default: "#1e1e1e",
                    paper: "#121212",
                },
            },
        },
    },
    typography: {
        fontFamily: "Raleway, sans-serif",
    },
    breakpoints: {
        values: {
            xs: 0,
            sm: 600,
            md: 900,
            lg: 1200,
            xl: 1536,
        },
    },
});
