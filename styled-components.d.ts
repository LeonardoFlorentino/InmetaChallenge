import type { ThemeType } from './src/styles/theme';
import type { lightTheme } from './src/styles/theme';

type Theme = typeof lightTheme;

declare module 'styled-components' {
  export interface DefaultTheme extends Theme {}
}
