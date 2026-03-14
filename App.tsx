import React, { useEffect, useRef } from "react";
import AppNavigator from "./src/navigation";
import { ThemeProvider as CustomThemeProvider, useTheme } from "./src/styles/ThemeProvider";
import { ThemeProvider as StyledThemeProvider } from "styled-components/native";
import { useNetworkStatus } from "./src/hooks/useNetworkStatus";
import { syncOrders } from "./src/services/sync";
import { UserProvider } from "./src/store/UserContext";
import { AuthProvider } from "./src/contexts/AuthProvider";


function AppContent() {
  const { theme } = useTheme();
  return (
    <StyledThemeProvider theme={theme}>
      <AppNavigator />
    </StyledThemeProvider>
  );
}

export default function App() {
  const isOnline = useNetworkStatus();
  const wasOnline = useRef(isOnline);

  useEffect(() => {
    if (!wasOnline.current && isOnline) {
      syncOrders();
    }
    wasOnline.current = isOnline;
  }, [isOnline]);

  return (
    <AuthProvider>
      <UserProvider>
        <CustomThemeProvider initialMode="dark">
          <AppContent />
        </CustomThemeProvider>
      </UserProvider>
    </AuthProvider>
  );
}
