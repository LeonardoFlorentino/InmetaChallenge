import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView, StyleSheet } from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import { useTheme } from "../../styles/ThemeProvider";
import { useOrdersStore } from "../../store/ordersStore";
// Removido import e uso de 'typography' pois estilos são inline
const statuses = ["Pending", "In Progress", "Completed"] as const;

const OrderDetailScreen = () => {
  const route = useRoute<any>();
  const navigation = useNavigation();
  const { order } = route.params;
  const { theme } = useTheme();
  const updateOrder = useOrdersStore((s) => s.updateOrder);

  // Cores fixas InMeta
  const green = "#2d9267";
  const orange = "#e35225";
  const isDark = theme.background === "#181818" || theme.text === "#fff";
  const cardColor = isDark ? theme.card : "#fff";
  const borderColor = green;
  const labelColor = green;
  const titleColor = orange;
  const inputTextColor = isDark ? "#fff" : "#222";
  const inputBgColor = isDark ? "#232323" : "#f7f7f7";
  const placeholderColor = isDark ? "#bbb" : "#888";
  const statusActiveColor = green;
  const statusInactiveColor = isDark ? theme.card : "#f7f7f7";
  const statusActiveText = "#fff";
  const statusInactiveText = "#888";
  const saveButtonColor = orange;
  const saveButtonTextColor = "#fff";

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
    <View style={{ flex: 1, backgroundColor: theme.background }}>
      {editing ? (
        <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === "ios" ? "padding" : undefined}>
          <ScrollView contentContainerStyle={{ backgroundColor: cardColor, padding: 28, margin: 20, borderRadius: 18, elevation: 4, shadowColor: "#000", shadowOpacity: 0.08, shadowRadius: 12, shadowOffset: { width: 0, height: 4 }, alignItems: "stretch" }}>
            <Text style={{ fontSize: 26, fontWeight: "bold", color: titleColor, marginBottom: 18, textAlign: "center" }}>Edição Ordem de Serviço</Text>
            <Text style={{ color: labelColor, fontWeight: "bold", marginTop: 16, marginBottom: 6, fontSize: 16 }}>Título</Text>
            <TextInput
              style={{ borderWidth: 1.5, borderColor, borderRadius: 10, padding: 12, fontSize: 16, backgroundColor: inputBgColor, color: inputTextColor }}
              value={title}
              onChangeText={setTitle}
              placeholder="Título da ordem"
              placeholderTextColor={placeholderColor}
            />
            <Text style={{ color: labelColor, fontWeight: "bold", marginTop: 16, marginBottom: 6, fontSize: 16 }}>Descrição</Text>
            <TextInput
              style={{ borderWidth: 1.5, borderColor, borderRadius: 10, padding: 12, fontSize: 16, backgroundColor: inputBgColor, color: inputTextColor, minHeight: 80 }}
              value={description}
              onChangeText={setDescription}
              placeholder="Descreva a ordem de serviço"
              placeholderTextColor={placeholderColor}
              multiline
            />
            <Text style={{ color: labelColor, fontWeight: "bold", marginTop: 16, marginBottom: 6, fontSize: 16 }}>Responsável</Text>
            <TextInput
              style={{ borderWidth: 1.5, borderColor, borderRadius: 10, padding: 12, fontSize: 16, backgroundColor: inputBgColor, color: inputTextColor }}
              value={assignedTo}
              onChangeText={setAssignedTo}
              placeholder="Seu nome"
              placeholderTextColor={placeholderColor}
            />
            <Text style={{ color: labelColor, fontWeight: "bold", marginTop: 16, marginBottom: 6, fontSize: 16 }}>Status</Text>
            <View style={{ flexDirection: "row", flexWrap: "wrap", marginTop: 8, marginBottom: 18, gap: 8, justifyContent: "flex-start" }}>
              {statuses.map((s) => (
                <TouchableOpacity
                  key={s}
                  style={{
                    borderWidth: 1.5,
                    borderColor: status === s ? statusActiveColor : "#bbb",
                    borderRadius: 20,
                    paddingVertical: 8,
                    paddingHorizontal: 18,
                    marginRight: 8,
                    marginBottom: 8,
                    backgroundColor: status === s ? statusActiveColor : statusInactiveColor,
                    maxWidth: 140,
                  }}
                  onPress={() => setStatus(s)}
                >
                  <Text style={{ color: status === s ? statusActiveText : statusInactiveText, fontWeight: "bold" }}>{s}</Text>
                </TouchableOpacity>
              ))}
            </View>
            <TouchableOpacity style={{ backgroundColor: saveButtonColor, paddingVertical: 16, borderRadius: 12, alignItems: "center", marginTop: 18, shadowColor: saveButtonColor, shadowOpacity: 0.15, shadowRadius: 8, shadowOffset: { width: 0, height: 2 } }} onPress={handleSave}>
              <Text style={{ color: saveButtonTextColor, fontSize: 18, fontWeight: "bold", letterSpacing: 1 }}>Salvar Ordem</Text>
            </TouchableOpacity>
          </ScrollView>
        </KeyboardAvoidingView>
      ) : (
        <View style={{ flex: 1, paddingHorizontal: 20, paddingTop: 24 }}>
          <Text style={{ color: theme.title || (theme.mode === "dark" ? "#fff" : "#181818"), fontWeight: "bold", marginTop: 0, marginBottom: 6, fontSize: 22, textAlign: "center" }}>Detalhes da Ordem</Text>
          <Text style={{ color: theme.title || (theme.mode === "dark" ? "#fff" : "#181818"), fontWeight: "bold", marginTop: 18, marginBottom: 6, fontSize: 16 }}>Título</Text>
          <Text style={{ color: theme.text, fontSize: 16, marginBottom: 8 }}>{title}</Text>
          <Text style={{ color: theme.title || (theme.mode === "dark" ? "#fff" : "#181818"), fontWeight: "bold", marginTop: 16, marginBottom: 6, fontSize: 16 }}>Descrição</Text>
          <Text style={{ color: theme.text, fontSize: 16, marginBottom: 8 }}>{description}</Text>
          <Text style={{ color: theme.title || (theme.mode === "dark" ? "#fff" : "#181818"), fontWeight: "bold", marginTop: 16, marginBottom: 6, fontSize: 16 }}>Responsável</Text>
          <Text style={{ color: theme.text, fontSize: 16, marginBottom: 8 }}>{assignedTo}</Text>
          <Text style={{ color: theme.title || (theme.mode === "dark" ? "#fff" : "#181818"), fontWeight: "bold", marginTop: 16, marginBottom: 6, fontSize: 16 }}>Status</Text>
          <Text style={{ color: theme.text, fontSize: 16, marginBottom: 8 }}>
            {status === "Pending" ? "Pendente" : status === "In Progress" ? "Em andamento" : status === "Completed" ? "Concluída" : status}
          </Text>
          <TouchableOpacity style={{ backgroundColor: theme.fab, padding: 12, borderRadius: 8, alignItems: "center", marginTop: 28 }} onPress={() => setEditing(true)}>
            <Text style={{ color: theme.fabText, fontSize: 16 }}>Editar</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

// Não é mais necessário o objeto 'styles' pois todos os estilos são inline

export default OrderDetailScreen;
