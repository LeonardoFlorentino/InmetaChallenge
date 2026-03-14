import React, { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { Platform, ActivityIndicator } from "react-native";
import Toast from 'react-native-root-toast';
import {
  Container,
  Card,
  Title,
  Label,
  StatusRow,
  StatusButton,
  StatusText,
  OnlineStatus,
  OnlineStatusText,
  ButtonRow
} from "./OrderFormForm.styles";
import Button from "../../components/Button";
import { Input } from "../../components/Input";
import { KeyboardAvoidingView } from "react-native";
import { ScrollView } from "react-native";
import { useNetworkStatus } from "../../hooks/useNetworkStatus";
import { useTheme } from "../../styles/ThemeProvider";
import { useUser } from "../../store/UserContext";
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { createWorkOrder, getErrorMessage } from '../../services/workOrderService';
import { OnlineStatusBadge, OnlineStatusBadgeText } from './OrderFormForm.styles';

const statuses = [
  { value: "Pending", label: "Pendente" },
  { value: "In Progress", label: "Em andamento" },
  { value: "Completed", label: "Concluída" }
] as const;

interface OrderFormScreenProps {
  order?: any;
  onClose?: () => void;
}

const OrderFormScreen: React.FC<OrderFormScreenProps> = ({ order, onClose }) => {
  const { theme } = useTheme();
  const { name } = useUser();
  const navigation = useNavigation();
  const [title, setTitle] = useState(order?.title || "");
  const [description, setDescription] = useState(order?.description || "");
  const [assignedTo, setAssignedTo] = useState(order?.assignedTo || name);
  const [status, setStatus] = useState(order?.status || "Pending");
  const [loading, setLoading] = useState(false);
  const [loadingButton, setLoadingButton] = useState<null | 'save' | 'saveClose'>(null);
  const isOnline = useNetworkStatus();

  useFocusEffect(
    React.useCallback(() => {
      setAssignedTo(order?.assignedTo || name);
    }, [name, order])
  );

  const handleSave = async (close: boolean) => {
    setLoadingButton(close ? 'saveClose' : 'save');
    try {
      if (order) {
        // Atualizar ordem existente
        // TODO: chamar updateWorkOrder(order.id, { title, description, assignedTo, status })
        Toast.show('Order updated successfully!', { duration: Toast.durations.SHORT, backgroundColor: '#4caf50' });
      } else {
        await createWorkOrder({ title, description, assignedTo });
        setTitle("");
        setDescription("");
        setAssignedTo(name);
        setStatus("Pending");
        Toast.show('Order created successfully!', { duration: Toast.durations.SHORT, backgroundColor: '#4caf50' });
      }
      if (close && onClose) onClose();
      if (close && !onClose) navigation.goBack();
    } catch (e) {
      Toast.show(getErrorMessage(e), { duration: Toast.durations.SHORT, backgroundColor: '#e53935' });
    } finally {
      setLoadingButton(null);
    }
  };

  return (
    <Container>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <Card>
          {/* Botão X absoluto no topo direito do Card */}
          {onClose && (
            <TouchableOpacity
              onPress={onClose}
              style={{
                position: 'absolute',
                top: -20,
                right: -12,
                width: 40,
                height: 40,
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: 'transparent',
                padding: 0,
                zIndex: 10
              }}
              accessibilityLabel="Fechar"
              activeOpacity={0.7}
            >
              <Text style={{ color: '#fff', fontSize: 26, fontWeight: 'bold', textAlign: 'center', includeFontPadding: false }}>×</Text>
            </TouchableOpacity>
          )}
          {/* Título centralizado abaixo do X */}
          <Title style={{ textAlign: 'center', marginTop: 12, marginBottom: 20 }}>{order ? 'Editar Ordem de Serviço' : 'Nova Ordem de Serviço'}</Title>
          <Label>Título</Label>
          <Input
            value={title}
            onChangeText={setTitle}
            placeholder="Título da ordem"
            editable={!loading}
          />
          <Label>Descrição</Label>
          <Input
            value={description}
            onChangeText={setDescription}
            placeholder="Descreva a ordem de serviço"
            multiline
            editable={!loading}
          />
          <Label>Responsável</Label>
          <Input
            value={assignedTo}
            onChangeText={setAssignedTo}
            placeholder="Seu nome"
            editable={!loading}
          />
          <Label>Status</Label>
          <StatusRow>
            {statuses.map((s) => (
              <StatusButton
                key={s.value}
                active={status === s.value}
                onPress={() => setStatus(s.value)}
                disabled={loading}
              >
                <StatusText active={status === s.value}>{s.label}</StatusText>
              </StatusButton>
            ))}
          </StatusRow>
          <ButtonRow>
            <Button
              onPress={() => handleSave(true)}
              enabled={!!title && !!description && !!assignedTo && !loadingButton}
              style={{ width: '100%' }}
            >
              {loadingButton === 'saveClose' ? <ActivityIndicator color="#fff" /> : 'Salvar e fechar'}
            </Button>
            <Button
              onPress={() => handleSave(false)}
              enabled={!!title && !!description && !!assignedTo && !loadingButton}
              style={{ width: '100%' }}
            >
              {loadingButton === 'save' ? <ActivityIndicator color="#fff" /> : 'Salvar'}
            </Button>
          </ButtonRow>
        </Card>
        <OnlineStatus>
          <OnlineStatusText online={isOnline}>
            {isOnline ? "Online" : "Offline"}
          </OnlineStatusText>
        </OnlineStatus>
      </KeyboardAvoidingView>
    </Container>
  );
};

export default OrderFormScreen;
