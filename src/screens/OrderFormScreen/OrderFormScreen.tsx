import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import { useNetworkStatus } from "../../hooks/useNetworkStatus";
import { useTheme } from "../../styles/ThemeProvider";
import { useUser } from "../../store/UserContext";

  const statuses = ["Pending", "In Progress", "Completed"] as const;

  const OrderFormScreen = () => {
    const { theme } = useTheme();
    const { name } = useUser();
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [assignedTo, setAssignedTo] = useState(name);
    const [status, setStatus] = useState<(typeof statuses)[number]>("Pending");
    const isOnline = useNetworkStatus();
    // Removido showForm: o formulário será exibido sempre

    // Sempre sincroniza o nome do usuário salvo no contexto ao abrir o formulário
    React.useEffect(() => {
      setAssignedTo(name);
    }, [name]);

    const handleSubmit = () => {
      // Salvar ordem (implementar integração)
      setTitle("");
      setDescription("");
      setAssignedTo(name);
      setStatus("Pending");
    };

    // Cores do tema
    const isDark = theme.background === "#181818" || theme.text === "#fff";
    // Cores fixas InMeta
    const green = "#2d9267";
    const orange = "#e35225";
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
    return (
      <View style={{ flex: 1, backgroundColor: theme.background }}>
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS === "ios" ? "padding" : undefined}
        >
          <ScrollView contentContainerStyle={{
            backgroundColor: cardColor,
            padding: 28,
            margin: 20,
            borderRadius: 18,
            elevation: 4,
            shadowColor: "#000",
            shadowOpacity: 0.08,
            shadowRadius: 12,
            shadowOffset: { width: 0, height: 4 },
            alignItems: "stretch"
          }}>
            <Text style={{ fontSize: 26, fontWeight: "bold", color: titleColor, marginBottom: 18, textAlign: "center" }}>Nova Ordem de Serviço</Text>
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
            <TouchableOpacity style={{ backgroundColor: saveButtonColor, paddingVertical: 16, borderRadius: 12, alignItems: "center", marginTop: 18, shadowColor: saveButtonColor, shadowOpacity: 0.15, shadowRadius: 8, shadowOffset: { width: 0, height: 2 } }} onPress={handleSubmit}>
              <Text style={{ color: saveButtonTextColor, fontSize: 18, fontWeight: "bold", letterSpacing: 1 }}>Salvar Ordem</Text>
            </TouchableOpacity>
          </ScrollView>
        </KeyboardAvoidingView>
        <View style={{ position: "absolute", left: 0, right: 0, bottom: 0, alignItems: "center", padding: 8 }}>
          <Text style={{ color: isOnline ? green : orange }}>
            {isOnline ? "Online" : "Offline"}
          </Text>
        </View>
      </View>
    );
  };

  // O objeto styles não é mais necessário, pois todos os estilos são definidos inline acima

  export default OrderFormScreen;
