import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from "react-native";
import { useUser } from "../store/UserContext";

const WelcomeScreen = ({ navigation }: any) => {
  const { setName } = useUser();
  const [input, setInput] = useState("");

  const handleContinue = () => {
    setName(input);
    navigation.replace("OrderList");
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Image source={require("../../assets/logo.png")} style={styles.logo} />
        <Text style={styles.title}>Bem-vindo à InMeta!</Text>
        <Text style={styles.subtitle}>Gestão moderna de obras na palma da sua mão</Text>
        <Text style={styles.label}>Digite seu nome para começar:</Text>
        <TextInput
          style={styles.input}
          placeholder="Seu nome"
          value={input}
          onChangeText={setInput}
          autoFocus
          placeholderTextColor="#bbb"
        />
        <TouchableOpacity
          style={[styles.button, { backgroundColor: input ? "#2d9267" : "#ccc" }]}
          onPress={handleContinue}
          disabled={!input}
        >
          <Text style={styles.buttonText}>Entrar</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.footer}>Plataforma InMeta • {new Date().getFullYear()}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f7f7f7",
    padding: 24,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 18,
    padding: 32,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 },
    width: "100%",
    maxWidth: 380,
  },
  logo: {
    width: 72,
    height: 72,
    marginBottom: 18,
    resizeMode: "contain",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#e35225",
    marginBottom: 8,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    color: "#2d9267",
    marginBottom: 18,
    textAlign: "center",
  },
  label: {
    color: "#2d9267",
    fontWeight: "bold",
    marginBottom: 6,
    fontSize: 15,
    alignSelf: "flex-start",
  },
  input: {
    borderWidth: 1.5,
    borderColor: "#2d9267",
    borderRadius: 10,
    padding: 12,
    fontSize: 16,
    backgroundColor: "#f7f7f7",
    color: "#222",
    width: "100%",
    marginBottom: 18,
  },
  button: {
    paddingVertical: 14,
    paddingHorizontal: 32,
    borderRadius: 12,
    alignItems: "center",
    width: "100%",
    marginTop: 8,
    shadowColor: "#2d9267",
    shadowOpacity: 0.12,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    letterSpacing: 1,
  },
  footer: {
    marginTop: 32,
    color: "#bbb",
    fontSize: 13,
    textAlign: "center",
  },
});

export default WelcomeScreen;
