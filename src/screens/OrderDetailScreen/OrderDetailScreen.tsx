import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Platform, KeyboardAvoidingView } from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import { useOrdersStore } from "../../store/ordersStore";
import { useTheme } from "../../styles/ThemeProvider";
import { typography } from "../../styles/typography";

const statuses = ["Pending", "In Progress", "Completed"] as const;

const OrderDetailScreen = () => {
  const route = useRoute<any>();
  const navigation = useNavigation();
  const { order } = route.params;
  const { theme } = useTheme();
  const updateOrder = useOrdersStore((s) => s.updateOrder);

  const [title, setTitle] = useState(order.title);
  const [description, setDescription] = useState(order.description);
  const [assignedTo, setAssignedTo] = useState(order.assignedTo);
  const [status, setStatus] = useState(order.status);
  const [editing, setEditing] = useState(false);

  const handleSave = () => {
    updateOrder({ ...order, title, description, assignedTo, status, synced: false, updatedAt: new Date().toISOString() });
    setEditing(false);
    navigation.goBack();
  };

  return (
    <View style={{ flex: 1, backgroundColor: theme.background, padding: 20 }}>
      {editing ? (
        <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : undefined}>
          <Text style={styles.label}>Title</Text>
          <TextInput style={styles.input} value={title} onChangeText={setTitle} />
          <Text style={styles.label}>Description</Text>
          <TextInput style={styles.input} value={description} onChangeText={setDescription} multiline />
          <Text style={styles.label}>Assigned To</Text>
          <TextInput style={styles.input} value={assignedTo} onChangeText={setAssignedTo} />
          <Text style={styles.label}>Status</Text>
          <View style={styles.statusRow}>
            {statuses.map((s) => (
              <TouchableOpacity
                key={s}
                style={[styles.statusButton, status === s && styles.statusButtonActive]}
                onPress={() => setStatus(s)}
              >
                <Text style={status === s ? styles.statusTextActive : styles.statusText}>{s}</Text>
              </TouchableOpacity>
            ))}
          </View>
          <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
            <Text style={styles.saveButtonText}>Save</Text>
          </TouchableOpacity>
        </KeyboardAvoidingView>
      ) : (
        <>
          <Text style={styles.label}>Title</Text>
          <Text style={styles.value}>{title}</Text>
          <Text style={styles.label}>Description</Text>
          <Text style={styles.value}>{description}</Text>
          <Text style={styles.label}>Assigned To</Text>
          <Text style={styles.value}>{assignedTo}</Text>
          <Text style={styles.label}>Status</Text>
          <Text style={styles.value}>{status}</Text>
          <TouchableOpacity style={styles.editButton} onPress={() => setEditing(true)}>
            <Text style={styles.editButtonText}>Edit</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  label: { marginTop: 10, ...typography.bold },
  value: { ...typography.regular, marginBottom: 8 },
  input: { borderWidth: 1, borderColor: "#ccc", borderRadius: 6, padding: 8, marginTop: 4, marginBottom: 8 },
  statusRow: { flexDirection: "row", marginBottom: 12 },
  statusButton: { padding: 8, borderRadius: 6, borderWidth: 1, borderColor: "#ccc", marginRight: 8 },
  statusButtonActive: { backgroundColor: "#007bff", borderColor: "#007bff" },
  statusText: { color: "#333" },
  statusTextActive: { color: "#fff" },
  saveButton: { backgroundColor: "#28a745", padding: 12, borderRadius: 8, alignItems: "center", marginTop: 10 },
  saveButtonText: { color: "#fff", fontSize: 16 },
  editButton: { backgroundColor: "#007bff", padding: 12, borderRadius: 8, alignItems: "center", marginTop: 20 },
  editButtonText: { color: "#fff", fontSize: 16 },
});

export default OrderDetailScreen;
