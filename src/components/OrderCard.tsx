import React from "react";
import { TouchableOpacity } from "react-native";
import { CardBox, CardTitle, CardText } from "../screens/MainScreen.styles";
import { WorkOrder } from "../services/workOrderService";

interface OrderCardProps {
  order: WorkOrder;
  onPress: () => void;
}

const OrderCard: React.FC<OrderCardProps> = ({ order, onPress }) => (
  <TouchableOpacity onPress={onPress} activeOpacity={0.8}>
    <CardBox>
      <CardTitle>{order.title}</CardTitle>
      <CardText>Status: {order.status}</CardText>
      <CardText>Responsável: {order.assignedTo}</CardText>
    </CardBox>
  </TouchableOpacity>
);

export default OrderCard;
