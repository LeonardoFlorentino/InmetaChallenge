import { DefaultTheme } from 'styled-components';
import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  background-color: ${(props) => props.theme.background};
  padding: 16px;
`;

export const Center = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

export const Item = styled.TouchableOpacity`
  background-color: ${(props) => props.theme.card};
  padding: 16px;
  margin-bottom: 12px;
  border-radius: 8px;
`;

export const Title = styled.Text`
  font-size: 20px;
  font-weight: bold;
  color: ${(props) => props.theme.title || '#e35225'};
  margin-bottom: 4px;
`;

export const TextStyled = styled.Text`
  color: ${(props) => props.theme.text || '#222'};
  font-size: 16px;
`;

export const Fab = styled.TouchableOpacity`
  position: absolute;
  right: 24px;
  bottom: 24px;
  background-color: ${(props) => props.theme.fab || '#e35225'};
  width: 56px;
  height: 56px;
  border-radius: 28px;
  align-items: center;
  justify-content: center;
  elevation: 6;
  shadow-color: ${(props) => props.theme.shadow || '#000'};
  shadow-opacity: 0.2;
  shadow-radius: 8px;
  shadow-offset: 0px 2px;
`;

export const FabText = styled.Text`
  color: ${(props) => props.theme.fabText || '#fff'};
  font-size: 32px;
  margin-top: -2px;
`;

export const ToggleRow = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
  margin-bottom: 8px;
`;

export const ToggleLabel = styled.Text`
  margin-right: 8px;
  color: ${(props) => props.theme.toggleLabel || '#2d9267'};
`;
