import React from "react";
import { View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { CardText } from "../screens/MainScreen.styles";

const EmptyOrders = () => (
  <View style={{ flex: 1, justifyContent: "center", alignItems: "center", minHeight: 180 }}>
    <MaterialCommunityIcons name="dump-truck" size={54} color="#ccc" style={{ marginBottom: 12 }} />
    <CardText style={{ color: "#fff", textAlign: "center", fontSize: 18 }}>
      Nenhuma ordem de serviço encontrada.
    </CardText>
  </View>
);

export default EmptyOrders;
