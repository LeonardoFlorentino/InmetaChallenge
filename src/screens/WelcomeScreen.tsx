import React, { useState } from "react";
import {
  Container,
  Card,
  Logo,
  Title,
  Subtitle,
  Label,
  Footer
} from "./WelcomeScreen.styles";
import Button from "../components/Button";
import { Input } from "../components/Input";
import { useUser } from "../store/UserContext";

const WelcomeScreen = ({ navigation }: any) => {
  const { setName } = useUser();
  const [input, setInput] = useState("");

  const handleContinue = () => {
    setName(input);
    navigation.replace("OrderList");
  };

  return (
    <Container>
      <Card>
        <Logo source={require("../../assets/logo.png")} />
        <Title>Bem-vindo à InMeta!</Title>
        <Subtitle>Gestão moderna de obras na palma da sua mão</Subtitle>
        <Label>Digite seu nome para começar:</Label>
        <Input
          placeholder="Seu nome"
          value={input}
          onChangeText={setInput}
          autoFocus
        />
        <Button enabled={!!input} onPress={handleContinue} disabled={!input}>
          Entrar
        </Button>
      </Card>
      <Footer>Plataforma InMeta • {new Date().getFullYear()}</Footer>
    </Container>
  );
};


export default WelcomeScreen;
