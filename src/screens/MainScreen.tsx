import React, { useEffect, useState } from "react";
import {
  Container,
  Card,
  Logo,
  Title,
  Subtitle,
  Label,
  Footer,
  Button,
  ButtonText,
  ImageBackground,
  MainOverlay,
  CardBox,
  CardTitle,
  CardText
} from "./MainScreen.styles";
import { TouchableOpacity, FlatList, Switch, ActivityIndicator, View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useTheme } from "../styles/ThemeProvider";
import Header from "../components/Header";
import { Input } from "../components/Input";
import { useUser } from "../store/UserContext";
import { getWorkOrders, WorkOrder } from "../services/workOrderService";
import styled from 'styled-components/native';

const Overlay = styled.View`
  flex: 1;
  background-color: rgba(0,0,0,0.35);
  justify-content: center;
  align-items: center;
`;

const ToggleRow = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
  margin-bottom: 8px;
`;

const ToggleLabel = styled.Text`
  margin-right: 8px;
  color: #fff;
`;

const Fab = styled.TouchableOpacity`
  position: absolute;
  right: 24px;
  bottom: 24px;
  background-color: #2d9267;
  width: 56px;
  height: 56px;
  border-radius: 28px;
  align-items: center;
  justify-content: center;
  elevation: 6;
  shadow-color: #000;
  shadow-opacity: 0.2;
  shadow-radius: 8px;
  shadow-offset: 0px 2px;
`;
const FabText = styled.Text`
  color: #fff;
  font-size: 32px;
  margin-top: -2px;
`;

const CenteredButton = styled.TouchableOpacity`
  margin-top: 24px;
  align-self: center;
  background-color: #2d9267;
  padding: 16px 28px;
  border-radius: 24px;
  elevation: 4;
  shadow-color: #000;
  shadow-opacity: 0.15;
  shadow-radius: 6px;
  shadow-offset: 0px 2px;
`;
const CenteredButtonText = styled.Text`
  color: #fff;
  font-size: 18px;
  font-weight: bold;
`;

const MainScreen = ({ navigation }: any) => {
  const { name } = useUser();
  const { mode, setMode, theme } = useTheme();
  const [orders, setOrders] = useState<WorkOrder[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const data = await getWorkOrders();
        setOrders(data);
      } catch (err) {
        setError("Erro ao carregar ordens de serviço");
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  return (
    <Container>
      <Header navigation={navigation} showBack={true} />
      <ImageBackground
        source={require("../assets/home-background/home.jpg")}
        resizeMode="cover"
      >
        <MainOverlay>
          <Container>
            <Logo source={require("../../assets/icon.png")} />
            <Title style={{ color: '#ff6a2b' }}>Bem-vindo ao Viagaos!</Title>
            <Subtitle style={{ color: '#6ad1b8', fontWeight: 'bold', marginBottom: 2, marginHorizontal: 16, textAlign: 'center', maxWidth: 340, alignSelf: 'center' }}>
              Visualizador Inteligente de Gestão de Atividades e Ordens de Serviço
            </Subtitle>
            <Subtitle style={{ color: '#fff', fontSize: 14, marginBottom: 10 }}>
              Olá, {name || "Técnico"}! Veja suas ordens de serviço abaixo:
            </Subtitle>
              {loading ? (
                <ActivityIndicator size="large" />
              ) : error ? (
                <Subtitle style={{ color: '#fff' }}>{error}</Subtitle>
              ) : (
                <FlatList
                  data={orders}
                  keyExtractor={(item) => item.id}
                  renderItem={({ item }) => (
                    <TouchableOpacity
                      style={{ marginBottom: 12, backgroundColor: '#232323', borderRadius: 8, padding: 16 }}
                      onPress={() => navigation.navigate("OrderDetail", { order: item })}
                    >
                      <Title style={{ color: '#fff', fontSize: 20 }}>{item.title}</Title>
                      <Subtitle style={{ color: '#fff', fontSize: 16 }}>Status: {item.status}</Subtitle>
                      <Subtitle style={{ color: '#fff', fontSize: 16 }}>Responsável: {item.assignedTo}</Subtitle>
                    </TouchableOpacity>
                  )}
                  ListEmptyComponent={<Subtitle style={{ color: '#fff' }}>Nenhuma ordem de serviço encontrada.</Subtitle>}
                  style={{ width: '100%', marginBottom: 60 }}
                />
              )}
              <CenteredButton onPress={() => navigation.navigate("OrderForm")}
                accessibilityLabel="Criar nova ordem">
                <CenteredButtonText>Crie uma nova ordem de serviço</CenteredButtonText>
              </CenteredButton>
            <Footer style={{ color: '#bbb' }}>Plataforma Viagaos • {new Date().getFullYear()}</Footer>
          </Container>
        </MainOverlay>
      </ImageBackground>
    </Container>
  );
};

export default MainScreen;
