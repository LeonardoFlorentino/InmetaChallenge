import React from "react";
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import OrderListScreen from "../screens/OrderListScreen/OrderListScreen";
import OrderDetailScreen from "../screens/OrderDetailScreen/OrderDetailScreen";
import OrderFormScreen from "../screens/OrderFormScreen/OrderFormScreen";

const Stack = createStackNavigator();

import { useTheme } from "../styles/ThemeProvider";

const AppNavigator = () => {
  const { theme, mode } = useTheme();
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
  return (
    <NavigationContainer theme={navTheme}>
      <Stack.Navigator
        initialRouteName="OrderList"
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
          name="OrderList"
          component={OrderListScreen}
          options={{ title: "Ordens de Serviço" }}
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
    </NavigationContainer>
  );
};

export default AppNavigator;
