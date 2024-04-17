import React from 'react';

import ThemeContext, { ThemeKind } from './ThemeContext';
import ClashDisplayVariableFont from '../assets/fonts/ClashDisplay-Variable.woff2';

import { ThemeProvider as MuiThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

const ThemeProvider: React.FC<{ children: React.ReactNode }> = (props) => {
    const [theme, setTheme] = React.useState<ThemeKind>(ThemeKind.Dark);

    // Create a theme instance.
    const themeConfig = React.useMemo(
        () =>
            createTheme({
                typography: {
                    fontFamily: 'ClashDisplay-Variable',
                },
                components: {
                    MuiCssBaseline: {
                        styleOverrides: `
                        @font-face {
                            font-family: 'ClashDisplay-Variable';
                            src: url(${ClashDisplayVariableFont}) format('woff2');
                            font-weight: 200 700;
                            font-display: swap;
                            font-style: normal;
                          }
                        `,
                    },
                },
                palette: {
                    mode: theme,
                    primary: {
                        light: '#69a9ff',
                        main: '#eeff41',
                        dark: '#0050cb',
                    },
                    secondary: {
                        light: '#FFF',
                        main: '#FFF',
                        dark: '#cccccc',
                    },
                },
            }),
        [theme],
    );

    return (
        <MuiThemeProvider theme={themeConfig}>
            <CssBaseline />
            <ThemeContext.Provider
                value={{
                    theme,
                    setTheme,
                }}
            >
                {props.children}
            </ThemeContext.Provider>
        </MuiThemeProvider>
    );
};

export default ThemeProvider;
