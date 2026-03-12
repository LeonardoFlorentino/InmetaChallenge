import React, { createContext, useContext, useState, ReactNode } from "react";
import { lightTheme, darkTheme, ThemeType } from "./theme";

export type ThemeContextType = {
  theme: typeof lightTheme;
  mode: ThemeType;
  setMode: (mode: ThemeType) => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = () => {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within ThemeProvider");
  return ctx;
};

interface ThemeProviderProps {
  children: ReactNode;
  initialMode?: ThemeType;
}

export const ThemeProvider = ({
  children,
  initialMode = "light",
}: ThemeProviderProps) => {
  const [mode, setMode] = useState<ThemeType>(initialMode);
  const theme = mode === "dark" ? darkTheme : lightTheme;
  return (
    <ThemeContext.Provider value={{ theme, mode, setMode }}>
      {children}
    </ThemeContext.Provider>
  );
};
