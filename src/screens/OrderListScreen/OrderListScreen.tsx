import React, { useEffect, useState } from "react";
import { FlatList, ActivityIndicator, Switch } from "react-native";
import {
  Container,
  Center,
  Item,
  Title,
  TextStyled,
  Fab,
  FabText,
  ToggleRow,
  ToggleLabel
} from "./OrderListScreen.styles";
import { useNavigation } from "@react-navigation/native";

type RootStackParamList = {
  OrderList: undefined;
  OrderDetail: { order: any };
  OrderForm: undefined;
};
import { getWorkOrders, WorkOrder } from "../../services/workOrderService";
import { useTheme } from "../../styles/ThemeProvider";


const OrderListScreen = () => {
  const [orders, setOrders] = useState<WorkOrder[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigation = useNavigation<any>();
  const { theme, mode, setMode } = useTheme();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const data = await getWorkOrders();
        setOrders(data);
      } catch (err) {
        setError("Failed to load work orders");
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);


  if (loading) {
    return (
      <Center>
        <ActivityIndicator size="large" />
      </Center>
    );
  }

  if (error) {
    return (
      <Center>
        <TextStyled>{error}</TextStyled>
      </Center>
    );
  }

  return (
    <Container>
      <ToggleRow>
        <ToggleLabel>Dark Mode</ToggleLabel>
        <Switch
          value={mode === "dark"}
          onValueChange={(v) => setMode(v ? "dark" : "light")}
        />
      </ToggleRow>
      <FlatList
        data={orders}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Item onPress={() => navigation.navigate("OrderDetail", { order: item })}>
            <Title>{item.title}</Title>
            <TextStyled>Status: {item.status}</TextStyled>
            <TextStyled>Assigned to: {item.assignedTo}</TextStyled>
          </Item>
        )}
        ListEmptyComponent={<TextStyled>No work orders found.</TextStyled>}
      />
      <Fab onPress={() => navigation.navigate("OrderForm" as never)} accessibilityLabel="Add Work Order">
        <FabText>+</FabText>
      </Fab>
    </Container>
  );
};

export default OrderListScreen;
