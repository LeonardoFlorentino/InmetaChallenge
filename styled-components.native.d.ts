import type { Theme } from './src/styles/theme';

declare module 'styled-components/native' {
  export interface DefaultTheme extends Theme {}
}
