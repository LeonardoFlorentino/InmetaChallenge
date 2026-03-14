import React, { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { ImageBackground, ActivityIndicator } from 'react-native';
import { useAuth } from '../../contexts/AuthProvider';
import { Input } from '../../components/Input';
import {
  Container,
  Card,
  Title,
  Link,
  ErrorText,
  SuccessText,
  EyeButton,
  InputWrapper,
  Button,
  ButtonText
} from './RegisterScreen.styles';

import { Overlay } from '../../components/Overlay';

// Imagem fixa: mulher da construção civil
const bg = require('../../assets/login-backgrounds/mulher-da-construcao-civil.png');

export default function RegisterScreen({ navigation }: any) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const { register, loading } = useAuth();

  const handleRegister = async () => {
    setError('');
    setSuccess('');
    if (!username || !password || !confirm) {
      setError('Preencha todos os campos.');
      return;
    }
    if (password !== confirm) {
      setError('As senhas não coincidem.');
      return;
    }
    const ok = await register(username, password);
    if (!ok) {
      setError('Usuário já existe.');
    } else {
      setSuccess('Cadastro realizado! Faça login.');
      setTimeout(() => navigation.goBack(), 1200);
    }
  };

  return (
    <Container>
      <ImageBackground source={bg} style={{ flex: 1 }} resizeMode="cover">
        <Overlay>
          <Card>
            <Title>Cadastro</Title>
            <Input
              placeholder="Usuário"
              value={username}
              onChangeText={setUsername}
              autoCapitalize="none"
              autoCorrect={false}
            />
            <InputWrapper>
              <Input
                placeholder="Senha"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
                style={{ paddingRight: 44 }}
              />
              <EyeButton
                onPress={() => setShowPassword((prev) => !prev)}
                accessibilityLabel={showPassword ? 'Ocultar senha' : 'Mostrar senha'}
              >
                <Ionicons
                  name={showPassword ? 'eye-off' : 'eye'}
                  size={24}
                  color="#bbb"
                />
              </EyeButton>
            </InputWrapper>
            <InputWrapper>
              <Input
                placeholder="Confirmar senha"
                value={confirm}
                onChangeText={setConfirm}
                secureTextEntry={!showConfirm}
                style={{ paddingRight: 44 }}
              />
              <EyeButton
                onPress={() => setShowConfirm((prev) => !prev)}
                accessibilityLabel={showConfirm ? 'Ocultar senha' : 'Mostrar senha'}
              >
                <Ionicons
                  name={showConfirm ? 'eye-off' : 'eye'}
                  size={24}
                  color="#bbb"
                />
              </EyeButton>
            </InputWrapper>
            {error ? <ErrorText>{error}</ErrorText> : null}
            {success ? <SuccessText>{success}</SuccessText> : null}
            <Button onPress={handleRegister} disabled={loading}>
              {loading ? <ActivityIndicator color="#fff" /> : <ButtonText>Cadastrar</ButtonText>}
            </Button>
            <Button onPress={() => navigation.goBack()} style={{ backgroundColor: 'transparent', marginTop: 0 }}>
              <Link>Já tem conta? Entrar</Link>
            </Button>
          </Card>
        </Overlay>
      </ImageBackground>
    </Container>
  );
}
