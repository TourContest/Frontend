import '@emotion/react';
import type { ThemeType } from 'src/styles/theme';

declare module '@emotion/react' {
    export interface Theme extends ThemeType {}
}