import React from "react";
import AppNavigator from "./src/navigation";
import { ThemeProvider } from "./src/styles/ThemeProvider";

export default function App() {
  return (
    <ThemeProvider initialMode="dark">
      <AppNavigator />
    </ThemeProvider>
  );
}
