# InMeta Challenge App

Este projeto é um aplicativo React Native/Expo para gestão de ordens de serviço, totalmente componentizado, com baixo acoplamento, alta coesão e estilização moderna usando styled-components.

## Principais Características
- **Componentização:** Telas e elementos reutilizáveis (Button, Input, Card, etc).
- **Estilização:** Todos os estilos centralizados com styled-components e suporte a tema claro/escuro.
- **Organização:** Estrutura de pastas clara para componentes, hooks, serviços, modelos, estilos e utilitários.
- **Padronização:** Código limpo, sem duplicidade, nomes padronizados e textos centralizados para fácil tradução.
- **Responsividade:** Layout adaptado para diferentes tamanhos de tela.
- **Pronto para Crescimento:** Fácil manutenção e expansão.

## Estrutura de Pastas
```
assets/                # Imagens e recursos estáticos
src/
  assets/              # Recursos específicos do app
  components/          # Componentes reutilizáveis (Button, Input, etc)
  hooks/               # Hooks customizados
  models/              # Modelos de dados (Order, Technician)
  navigation/          # Configuração de navegação
  screens/             # Telas principais do app
  services/            # Serviços de API, sincronização, etc
  store/               # Gerenciamento de estado
  styles/              # Temas, ThemeProvider, tipografia
  types/               # Tipos globais
  utils/               # Funções utilitárias
```

## Temas
- Cores e variáveis centralizadas em `src/styles/theme.ts`.
- Suporte a dark/light mode.

## Como rodar o projeto
1. Instale as dependências:
   ```
   npm install
   ```
2. Rode o projeto:
   ```
   npx expo start
   ```

## Observações
- Todos os textos visíveis ao usuário estão em português.
- O projeto está pronto para internacionalização e expansão.
- Siga o padrão dos componentes e estilos para novas implementações.

---
Desenvolvido para o desafio InMeta.
