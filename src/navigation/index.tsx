import React from "react";
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import MainScreen from "../screens/MainScreen";
import OrderDetailScreen from "../screens/OrderDetailScreen/OrderDetailScreen";
import OrderFormScreen from "../screens/OrderFormScreen/OrderFormScreen";
import AuthNavigator from "./AuthNavigator";
import { useAuth } from "../contexts/AuthProvider";

const Stack = createStackNavigator();

import { useTheme } from "../styles/ThemeProvider";

const AppNavigator = () => {
  const { theme, mode } = useTheme();
  const { user, loading } = useAuth();
  const navTheme = {
    dark: mode === "dark",
    colors: {
      ...(mode === "dark" ? DarkTheme.colors : DefaultTheme.colors),
      background: theme.background,
      card: theme.background,
      text: theme.title,
      border: theme.border,
      primary: theme.fab,
    },
    fonts: (mode === "dark" ? DarkTheme.fonts : DefaultTheme.fonts),
  };
  if (loading) return null;
  return (
    <NavigationContainer theme={navTheme}>
      {user ? (
        <Stack.Navigator
          initialRouteName="MainScreen"
          screenOptions={{
            headerStyle: { backgroundColor: theme.background },
            headerTitleStyle: {
              fontWeight: "700",
              fontSize: 20,
              color: theme.title,
            },
            headerTintColor: theme.title,
          }}
        >
          <Stack.Screen
            name="MainScreen"
            component={MainScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="OrderDetail"
            component={OrderDetailScreen}
            options={{ title: "Detalhes da Ordem" }}
          />
          <Stack.Screen
            name="OrderForm"
            component={OrderFormScreen}
            options={{ title: "Nova Ordem" }}
          />
        </Stack.Navigator>
      ) : (
        <AuthNavigator />
      )}
    </NavigationContainer>
  );
};

export default AppNavigator;
