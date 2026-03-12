import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useNetworkStatus } from "../../hooks/useNetworkStatus";
import { useTheme } from "../../styles/ThemeProvider";
import { typography } from "../../styles/typography";

const statuses = ["Pending", "In Progress", "Completed"] as const;

const OrderFormScreen = () => {
  const { theme } = useTheme();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [assignedTo, setAssignedTo] = useState("");
  const [status, setStatus] = useState<(typeof statuses)[number]>("Pending");
  const isOnline = useNetworkStatus();
  const [showForm, setShowForm] = useState(false);

  const handleSubmit = () => {
    // Aqui você pode implementar a lógica de salvar localmente (Realm) ou online
    // Exemplo: chamar função de store ou serviço
    setShowForm(false);
    setTitle("");
    setDescription("");
    setAssignedTo("");
    setStatus("Pending");
  };

  return (
    <View style={{ flex: 1, backgroundColor: theme.background }}>
      {showForm && (
        <KeyboardAvoidingView
          style={styles.formContainer}
          behavior={Platform.OS === "ios" ? "padding" : undefined}
        >
          <Text style={styles.label}>Title</Text>
          <TextInput
            style={styles.input}
            value={title}
            onChangeText={setTitle}
            placeholder="Title"
          />
          <Text style={styles.label}>Description</Text>
          <TextInput
            style={styles.input}
            value={description}
            onChangeText={setDescription}
            placeholder="Description"
            multiline
          />
          <Text style={styles.label}>Assigned To</Text>
          <TextInput
            style={styles.input}
            value={assignedTo}
            onChangeText={setAssignedTo}
            placeholder="Technician Name"
          />
          <Text style={styles.label}>Status</Text>
          <View style={styles.statusRow}>
            {statuses.map((s) => (
              <TouchableOpacity
                key={s}
                style={[
                  styles.statusButton,
                  status === s && styles.statusButtonActive,
                ]}
                onPress={() => setStatus(s)}
              >
                <Text
                  style={
                    status === s ? styles.statusTextActive : styles.statusText
                  }
                >
                  {s}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
          <TouchableOpacity style={styles.saveButton} onPress={handleSubmit}>
            <Text style={styles.saveButtonText}>Save</Text>
          </TouchableOpacity>
        </KeyboardAvoidingView>
      )}
      <TouchableOpacity
        style={styles.fab}
        onPress={() => setShowForm((v) => !v)}
        accessibilityLabel="Add Work Order"
      >
        <Text style={styles.fabText}>+</Text>
      </TouchableOpacity>
      <View style={styles.statusBar}>
        <Text style={{ color: isOnline ? "green" : "red" }}>
          {isOnline ? "Online" : "Offline"}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  formContainer: {
    backgroundColor: "#fff",
    padding: 20,
    margin: 20,
    borderRadius: 12,
    elevation: 4,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
  },
  label: {
    marginTop: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 6,
    padding: 8,
    marginTop: 4,
    marginBottom: 8,
  },
  statusRow: {
    flexDirection: "row",
    marginBottom: 12,
  },
  statusButton: {
    padding: 8,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: "#ccc",
    marginRight: 8,
  },
  statusButtonActive: {
    backgroundColor: "#007bff",
    borderColor: "#007bff",
  },
  statusText: {
    color: "#333",
  },
  statusTextActive: {
    color: "#fff",
  },
  saveButton: {
    backgroundColor: "#28a745",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
  },
  saveButtonText: {
    color: "#fff",
    fontSize: 16,
  },
  fab: {
    position: "absolute",
    right: 24,
    bottom: 24,
    backgroundColor: "#007bff",
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: "center",
    justifyContent: "center",
    elevation: 6,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
  },
  fabText: {
    color: "#fff",
    fontSize: 32,
    marginTop: -2,
  },
  statusBar: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: "center",
    padding: 8,
  },
});

export default OrderFormScreen;
