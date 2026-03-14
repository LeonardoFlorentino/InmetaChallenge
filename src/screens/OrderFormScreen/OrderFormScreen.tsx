import React, { useState } from "react";
import { Platform } from "react-native";
import {
  Container,
  Card,
  Title,
  Label,
  StatusRow,
  StatusButton,
  StatusText,
  OnlineStatus,
  OnlineStatusText
} from "./OrderFormForm.styles";
import Button from "../../components/Button";
import { Input } from "../../components/Input";
import { KeyboardAvoidingView } from "react-native";
import { ScrollView } from "react-native";
import { useNetworkStatus } from "../../hooks/useNetworkStatus";
import { useTheme } from "../../styles/ThemeProvider";
import { useUser } from "../../store/UserContext";
import { useFocusEffect } from '@react-navigation/native';

  const statuses = ["Pending", "In Progress", "Completed"] as const;

  const OrderFormScreen = () => {
    const { theme } = useTheme();
    const { name } = useUser();
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [assignedTo, setAssignedTo] = useState(name);
    const [status, setStatus] = useState<(typeof statuses)[number]>("Pending");
    const isOnline = useNetworkStatus();

    useFocusEffect(
      React.useCallback(() => {
        setAssignedTo(name);
      }, [name])
    );

    const handleSubmit = () => {
      // Salvar ordem (implementar integração)
      setTitle("");
      setDescription("");
      setAssignedTo(name);
      setStatus("Pending");
    };

    return (
      <Container>
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS === "ios" ? "padding" : undefined}
        >
          <Card>
            <Title>Nova Ordem de Serviço</Title>
            <Label>Título</Label>
            <Input
              value={title}
              onChangeText={setTitle}
              placeholder="Título da ordem"
            />
            <Label>Descrição</Label>
            <Input
              value={description}
              onChangeText={setDescription}
              placeholder="Descreva a ordem de serviço"
              multiline
            />
            <Label>Responsável</Label>
            <Input
              value={assignedTo}
              onChangeText={setAssignedTo}
              placeholder="Seu nome"
            />
            <Label>Status</Label>
            <StatusRow>
              {statuses.map((s) => (
                <StatusButton
                  key={s}
                  active={status === s}
                  onPress={() => setStatus(s)}
                >
                  <StatusText active={status === s}>{s}</StatusText>
                </StatusButton>
              ))}
            </StatusRow>
            <Button onPress={handleSubmit} enabled={!!title && !!description && !!assignedTo}>
              Salvar Ordem
            </Button>
          </Card>
        </KeyboardAvoidingView>
        <OnlineStatus>
          <OnlineStatusText online={isOnline}>
            {isOnline ? "Online" : "Offline"}
          </OnlineStatusText>
        </OnlineStatus>
      </Container>
    );
  };

  // O objeto styles não é mais necessário, pois todos os estilos são definidos inline acima

  export default OrderFormScreen;
