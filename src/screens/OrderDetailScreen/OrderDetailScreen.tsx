import React, { useState } from "react";
import { Platform } from "react-native";
import { KeyboardAvoidingView } from "react-native";
import { ScrollView } from "react-native";
import {
  Container,
  Card,
  Title,
  Label,
  StatusRow,
  StatusButton,
  StatusText,
  DetailsContainer,
  DetailsTitle,
  DetailsLabel,
  DetailsText,
  EditButton,
  EditButtonText
} from "./OrderDetailScreen.styles";
import Button from "../../components/Button";
import { Input } from "../../components/Input";
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
    <Container>
      {editing ? (
        <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === "ios" ? "padding" : undefined}>
          <Card>
            <Title>Edição Ordem de Serviço</Title>
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
            <Button onPress={handleSave} enabled={!!title && !!description && !!assignedTo}>
              Salvar Ordem
            </Button>
          </Card>
        </KeyboardAvoidingView>
      ) : (
        <DetailsContainer>
          <DetailsTitle>Detalhes da Ordem</DetailsTitle>
          <DetailsLabel>Título</DetailsLabel>
          <DetailsText>{title}</DetailsText>
          <DetailsLabel>Descrição</DetailsLabel>
          <DetailsText>{description}</DetailsText>
          <DetailsLabel>Responsável</DetailsLabel>
          <DetailsText>{assignedTo}</DetailsText>
          <DetailsLabel>Status</DetailsLabel>
          <DetailsText>
            {status === "Pending" ? "Pendente" : status === "In Progress" ? "Em andamento" : status === "Completed" ? "Concluída" : status}
          </DetailsText>
          <EditButton onPress={() => setEditing(true)}>
            <EditButtonText>Editar</EditButtonText>
          </EditButton>
        </DetailsContainer>
      )}
    </Container>
  );
};

// Não é mais necessário o objeto 'styles' pois todos os estilos são inline

export default OrderDetailScreen;
