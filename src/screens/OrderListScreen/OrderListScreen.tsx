import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
  Switch,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

type RootStackParamList = {
  OrderList: undefined;
  OrderDetail: { order: any };
  OrderForm: undefined;
};
import { getWorkOrders, WorkOrder } from "../../services/workOrderService";
import { useTheme } from "../../styles/ThemeProvider";
import { typography } from "../../styles/typography";

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

  const themedStyles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.background,
      padding: 16,
    },
    item: {
      backgroundColor: theme.card,
      padding: 16,
      marginBottom: 12,
      borderRadius: 8,
    },
    title: {
      ...typography.title,
      color: theme.title,
      marginBottom: 4,
    },
    text: {
      ...typography.regular,
      color: theme.text,
    },
    center: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
    },
    fab: {
      position: "absolute",
      right: 24,
      bottom: 24,
      backgroundColor: theme.fab,
      width: 56,
      height: 56,
      borderRadius: 28,
      alignItems: "center",
      justifyContent: "center",
      elevation: 6,
      shadowColor: theme.shadow,
      shadowOpacity: 0.2,
      shadowRadius: 8,
      shadowOffset: { width: 0, height: 2 },
    },
    fabText: {
      color: theme.fabText,
      fontSize: 32,
      marginTop: -2,
    },
    toggleRow: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "flex-end",
      marginBottom: 8,
    },
    toggleLabel: {
      marginRight: 8,
      color: theme.toggleLabel,
    },
  });

  if (loading) {
    return (
      <View style={themedStyles.center}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={themedStyles.center}>
        <Text style={themedStyles.text}>{error}</Text>
      </View>
    );
  }

  return (
    <View style={themedStyles.container}>
      <View style={themedStyles.toggleRow}>
        <Text style={themedStyles.toggleLabel}>Dark Mode</Text>
        <Switch
          value={mode === "dark"}
          onValueChange={(v) => setMode(v ? "dark" : "light")}
        />
      </View>
      <FlatList
        data={orders}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={themedStyles.item}
            onPress={() => navigation.navigate("OrderDetail", { order: item })}
          >
            <Text style={themedStyles.title}>{item.title}</Text>
            <Text style={themedStyles.text}>Status: {item.status}</Text>
            <Text style={themedStyles.text}>
              Assigned to: {item.assignedTo}
            </Text>
          </TouchableOpacity>
        )}
        ListEmptyComponent={
          <Text style={themedStyles.text}>No work orders found.</Text>
        }
      />
      <TouchableOpacity
        style={themedStyles.fab}
        onPress={() => navigation.navigate("OrderForm" as never)}
        accessibilityLabel="Add Work Order"
      >
        <Text style={themedStyles.fabText}>+</Text>
      </TouchableOpacity>
    </View>
  );
};

export default OrderListScreen;
