import React, { useEffect, useRef } from "react";
import AppNavigator from "./src/navigation";
import { ThemeProvider } from "./src/styles/ThemeProvider";
import { useNetworkStatus } from "./src/hooks/useNetworkStatus";
import { syncOrders } from "./src/services/sync";

export default function App() {
  const isOnline = useNetworkStatus();
  const wasOnline = useRef(isOnline);

  useEffect(() => {
    if (!wasOnline.current && isOnline) {
      // Voltou a ficar online
      syncOrders();
    }
    wasOnline.current = isOnline;
  }, [isOnline]);

  return (
    <ThemeProvider initialMode="dark">
      <AppNavigator />
    </ThemeProvider>
  );
}
