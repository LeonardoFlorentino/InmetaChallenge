# Tecnologias Utilizadas

<p align="center">
   <img src="https://img.shields.io/badge/React%20Native-0.83.x-61dafb?logo=react"/>
   <img src="https://img.shields.io/badge/Expo-55.x-000020?logo=expo"/>
   <img src="https://img.shields.io/badge/TypeScript-5.x-3178c6?logo=typescript"/>
   <img src="https://img.shields.io/badge/Realm-20.x-5d3fd3?logo=realm"/>
   <img src="https://img.shields.io/badge/Zustand-5.x-ff9100?logo=react"/>
   <img src="https://img.shields.io/badge/Styled--components-6.x-db7093?logo=styled-components"/>
   <img src="https://img.shields.io/badge/Axios-1.x-5a29e4?logo=axios"/>
   <img src="https://img.shields.io/badge/Root%20Toast-4.x-4caf50"/>
</p>


# InMeta Work Orders App

Aplicativo React Native (Expo) para gerenciamento de ordens de serviço, desenvolvido como solução para o desafio INMETA – React Native Pleno.

## 📋 Desafio

Este projeto implementa **100% dos requisitos** do teste INMETA, incluindo:

- Listagem de ordens de serviço (armazenadas localmente via Realm)
- Visualização, criação e edição de ordens offline (título, descrição, status, técnico)
- Sincronização automática com a API quando online
- Detecção e resolução de conflitos de dados
- Gerenciamento de estado com Zustand
- Tipagem forte com TypeScript
- Interface responsiva, moderna e com suporte a tema claro/escuro

> **Observação:** Este projeto é apenas o frontend mobile. Não há backend incluso, mas a integração com a API REST fornecida pelo desafio está pronta.

---

## 🚀 Funcionalidades

- Exibir lista de ordens de serviço (Realm.js)
- Adicionar, editar e visualizar ordens offline
- Sincronização automática ao voltar para o modo online
- Resolução de conflitos de dados
- Interface intuitiva, responsiva e com feedback visual
- Suporte a tema claro/escuro
- Componentização e organização de código para fácil manutenção

---

## 🛠️ Tecnologias Utilizadas

- [React Native](https://reactnative.dev/) + [Expo](https://expo.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Realm](https://realm.io/) (armazenamento local/offline-first)
- [Zustand](https://zustand-demo.pmnd.rs/) (state management)
- [Styled-components](https://styled-components.com/) (temas e estilos)
- [react-native-root-toast](https://github.com/magicismight/react-native-root-toast) (feedback visual)
- [Axios](https://axios-http.com/) (requisições HTTP)

---

## 📦 Como rodar o projeto

1. **Clone o repositório:**
   ```
   git clone https://github.com/LeonardoFlorentino/InmetaChallenge.git
   cd InmetaChallenge
   ```

2. **Instale as dependências:**
   ```
   npm install
   ```

3. **Execute o app:**
   ```
   npx expo start
   ```

> O app pode ser testado em emulador Android/iOS ou dispositivo físico via Expo Go.

---

## 📑 Estrutura de Pastas

```
assets/
src/
  assets/
  components/
  hooks/
  models/
  navigation/
  screens/
  services/
  store/
  styles/
  types/
  utils/
```

---

## 📝 Observações

- **API:** O app está pronto para consumir a API REST do desafio (https://fieldsync.onrender.com/).
- **Backend:** Este projeto não inclui backend, apenas o frontend mobile.
- **Imagens:** Não há imagens ilustrativas neste README.
- **Internacionalização:** Todos os textos estão em português, mas o projeto está pronto para expansão.

---

## ✅ Requisitos atendidos

- [x] Listagem, criação, edição e visualização de ordens offline
- [x] Sincronização e resolução de conflitos
- [x] Uso de Realm.js e Zustand
- [x] Tipagem TypeScript
- [x] Código limpo, componentizado e pronto para produção

---

Desenvolvido para o desafio INMETA – React Native Pleno.
