import React, { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../../contexts/AuthProvider';
import { useUser } from '../../store/UserContext';
import { Input } from '../../components/Input';
import {
  Container,
  Card,
  Title,
  Link,
  ErrorText,
  EyeButton,
  InputWrapper,
  Button,
  ButtonText,
  ImageBackground,
  ActivityIndicator
} from './LoginScreen.styles';

import { Overlay } from '../../components/Overlay';

// Imagem fixa: homem da construção civil
const bg = require('../../assets/login-backgrounds/homem-da-construcao-civil.png');

export default function LoginScreen({ navigation }: any) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const { login, loading } = useAuth();
  const { setName } = useUser();

  const handleLogin = async () => {
    setError('');
    if (!username || !password) {
      setError('Preencha todos os campos.');
      return;
    }
    const ok = await login(username, password);
    if (ok) {
      setName(username);
    } else {
      setError('Usuário ou senha inválidos.');
    }
  };

  return (
    <Container>
      <ImageBackground source={bg} resizeMode="cover">
        <Overlay>
          <Card>
            <Title>Entrar</Title>
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
            {error ? <ErrorText>{error}</ErrorText> : null}
            <Button onPress={handleLogin} disabled={loading}>
              {loading ? <ActivityIndicator color="#fff" /> : <ButtonText>Entrar</ButtonText>}
            </Button>
            <Button onPress={() => navigation.navigate('Register')} style={{ backgroundColor: 'transparent', marginTop: 0 }}>
              <Link>Não tem conta? Cadastre-se</Link>
            </Button>
          </Card>
        </Overlay>
      </ImageBackground>
    </Container>
  );
}
