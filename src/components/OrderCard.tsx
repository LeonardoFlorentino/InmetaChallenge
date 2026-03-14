import React from "react";
import { TouchableOpacity, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { CardBox, CardTitle, CardText } from "../screens/MainScreen.styles";
import { WorkOrder } from "../services/workOrderService";

interface OrderCardProps {
  order: WorkOrder;
  onPress: () => void;
}

const OrderCard: React.FC<OrderCardProps> = ({ order, onPress }) => (
  <TouchableOpacity onPress={onPress} activeOpacity={0.8} style={{ position: "relative" }}>
    <CardBox>
      <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
        <CardTitle>{order.title}</CardTitle>
        <MaterialCommunityIcons name="pencil" size={22} color="#bbb" style={{ marginLeft: 8 }} />
      </View>
      <CardText>Status: {order.status}</CardText>
      <CardText>Responsável: {order.assignedTo}</CardText>
      <CardText style={{ color: "#bbb", fontSize: 13, marginTop: 8, textAlign: "right" }}>
        Toque para editar
      </CardText>
    </CardBox>
  </TouchableOpacity>
);

export default OrderCard;
