import React, { useEffect, useState } from "react";
import { MainOverlay, CardBox, CardTitle, CardText, ImageBackground } from "./MainScreen.styles";
import { FlatList, ActivityIndicator, View } from 'react-native';
import { useTheme } from "../styles/ThemeProvider";
import Header from "../components/Header";
import { useUser } from "../store/UserContext";
import { getWorkOrders, WorkOrder } from "../services/workOrderService";
import OrderCard from "../components/OrderCard";
import CenteredButton from "../components/CenteredButton";
import EmptyOrders from "../components/EmptyOrders";

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
    <>
      <Header navigation={navigation} showBack={true} />
      {/* Substitua por seu próprio layout de fundo, se necessário */}
      <ImageBackground source={require("../assets/home-background/home.jpg")} resizeMode="cover">
        <MainOverlay>
          <View style={{ flex: 1, width: '100%', maxWidth: 400, alignSelf: 'center', paddingHorizontal: 24, paddingTop: 32, paddingBottom: 32, justifyContent: 'space-between' }}>
            <View style={{ marginTop: 48 }}>
              <CardTitle style={{ color: '#ff6a2b', textAlign: 'center', fontWeight: 'bold', fontSize: 26, marginBottom: 8 }}>Bem-vindo ao Viagaos!</CardTitle>
              <CardText style={{ color: '#6ad1b8', textAlign: 'center', fontWeight: 'bold', marginBottom: 8, fontSize: 18 }}>
                Visualizador Inteligente de Gestão de Atividades e Ordens de Serviço
              </CardText>
              <CardText style={{ color: '#fff', textAlign: 'center', fontSize: 14, marginBottom: 18 }}>
                Olá, {name || "Técnico"}! Veja suas ordens de serviço abaixo:
              </CardText>
            </View>
            <View style={{ flex: 1, justifyContent: 'center' }}>
              {loading ? (
                <ActivityIndicator size="large" />
              ) : error ? (
                <CardText style={{ color: '#fff', textAlign: 'center' }}>{error}</CardText>
              ) : (
                <FlatList
                  data={orders}
                  keyExtractor={(item) => item.id}
                  renderItem={({ item }) => (
                    <OrderCard
                      order={item}
                      onPress={() => navigation.navigate("OrderDetail", { order: item })}
                    />
                  )}
                  ListEmptyComponent={() => (
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', minHeight: 220 }}>
                      <EmptyOrders />
                    </View>
                  )}
                  contentContainerStyle={orders.length === 0 ? { flex: 1 } : undefined}
                  style={{ width: '100%', marginBottom: 60 }}
                />
              )}
            </View>
            <View style={{ marginTop: 24 }}>
              <CenteredButton onPress={() => navigation.navigate("OrderForm")}
                accessibilityLabel="Criar nova ordem">
                Crie uma nova ordem de serviço
              </CenteredButton>
              <CardText style={{ color: '#bbb', textAlign: 'center', marginTop: 24, fontSize: 13 }}>
                Plataforma Viagaos • {new Date().getFullYear()}
              </CardText>
            </View>
          </View>
        </MainOverlay>
      </ImageBackground>
    </>
  );
};

export default MainScreen;
