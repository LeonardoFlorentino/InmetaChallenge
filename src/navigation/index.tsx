import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import OrderListScreen from "../screens/OrderListScreen/OrderListScreen";
import OrderDetailScreen from "../screens/OrderDetailScreen/OrderDetailScreen";
import OrderFormScreen from "../screens/OrderFormScreen/OrderFormScreen";

const Stack = createStackNavigator();

const AppNavigator = () => (
  <NavigationContainer>
    <Stack.Navigator initialRouteName="OrderList">
      <Stack.Screen
        name="OrderList"
        component={OrderListScreen}
        options={{ title: "Orders" }}
      />
      <Stack.Screen
        name="OrderDetail"
        component={OrderDetailScreen}
        options={{ title: "Order Details" }}
      />
      <Stack.Screen
        name="OrderForm"
        component={OrderFormScreen}
        options={{ title: "Order Form" }}
      />
    </Stack.Navigator>
  </NavigationContainer>
);

export default AppNavigator;
