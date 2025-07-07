import * as tokens from 'src/styles/tokens.js';

export const theme = {
    colors: {
        primary: {
        50: tokens.ColorPrimary50,
        100: tokens.ColorPrimary100,
        200: tokens.ColorPrimary200,
        300: tokens.ColorPrimary300,
        400: tokens.ColorPrimary400,
        500: tokens.ColorPrimary500,
        600: tokens.ColorPrimary600,
        },
        gray: {
        100: tokens.ColorGrayScale100,
        200: tokens.ColorGrayScale200,
        300: tokens.ColorGrayScale300,
        400: tokens.ColorGrayScale400,
        500: tokens.ColorGrayScale500,
        600: tokens.ColorGrayScale600,
        700: tokens.ColorGrayScale700,
        800: tokens.ColorGrayScale800,
        },
        bg: {
        0: tokens.ColorBg0,
        50: tokens.ColorBg50,
        },
        base: {
        0: tokens.ColorBase0,
        100: tokens.ColorBase100,
        },
        error: {
        100: tokens.ColorError100,
        200: tokens.ColorError200,
        },
    },
    typography: {
        head1: tokens.ColorHead1Bold,
        head2: tokens.ColorHead2Semibold,
        head3: tokens.ColorHead3Semibold,
        head4: tokens.ColorHead4Bold,
        body1: tokens.ColorBody1Medium,
        body2: tokens.ColorBody2Regular,
        body3: tokens.ColorBody3Medium,
        body4: tokens.ColorBody4Regular,
        caption1: tokens.ColorCaption1Medium,
        caption2: tokens.ColorCaption2Regular,
    },
    shadow: {
        shadow1: tokens.ColorEffectShadow1,
        shadow2: tokens.ColorEffectShadow2,
    },
    grid: tokens.ColorMobile,
} as const;

export type ThemeType = typeof theme;