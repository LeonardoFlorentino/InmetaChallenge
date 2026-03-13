import styled from 'styled-components/native';
import type { DefaultTheme } from 'styled-components/native';

export const Container = styled.View<{ theme: DefaultTheme }>`
  flex: 1;
  background-color: ${(props) => props.theme.background};
`;

export const Card = styled.ScrollView<{ theme: DefaultTheme }>`
  background-color: ${(props) => props.theme.card || '#fff'};
  padding: 28px;
  margin: 20px;
  border-radius: 18px;
  elevation: 4;
  shadow-color: #000;
  shadow-opacity: 0.08;
  shadow-radius: 12px;
  shadow-offset: 0px 4px;
`;

export const Title = styled.Text<{ theme: DefaultTheme }>`
  font-size: 26px;
  font-weight: bold;
  color: #e35225;
  margin-bottom: 18px;
  text-align: center;
`;

export const Label = styled.Text`
  color: #e35225;
  font-weight: bold;
  margin-top: 16px;
  margin-bottom: 6px;
  font-size: 16px;
`;

export const StyledInput = styled.TextInput<{ theme: DefaultTheme }>`
  border-width: 1.5px;
  border-color: #2d9267;
  border-radius: 10px;
  padding: 12px;
  font-size: 16px;
  background-color: ${(props) => props.theme.inputBg};
  color: ${(props) => props.theme.inputText};
`;

export const StatusRow = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  margin-top: 8px;
  margin-bottom: 18px;
  gap: 8px;
  justify-content: flex-start;
`;

export const StatusButton = styled.TouchableOpacity<{active: boolean; theme: DefaultTheme}>`
  border-width: 1.5px;
  border-color: ${(props) => (props.active ? '#2d9267' : '#bbb')};
  border-radius: 20px;
  padding-vertical: 8px;
  padding-horizontal: 18px;
  margin-right: 8px;
  margin-bottom: 8px;
  background-color: ${(props) => (props.active ? '#2d9267' : props.theme.card || '#f7f7f7')};
  max-width: 140px;
`;

export const StatusText = styled.Text<{active: boolean}>`
  color: ${(props) => (props.active ? '#fff' : '#888')};
  font-weight: bold;
`;

export const SaveButton = styled.TouchableOpacity`
  background-color: #e35225;
  padding-vertical: 16px;
  border-radius: 12px;
  align-items: center;
  margin-top: 18px;
  shadow-color: #e35225;
  shadow-opacity: 0.15;
  shadow-radius: 8px;
  shadow-offset: 0px 2px;
`;

export const SaveButtonText = styled.Text`
  color: #fff;
  font-size: 18px;
  font-weight: bold;
  letter-spacing: 1px;
`;

export const DetailsContainer = styled.View`
  flex: 1;
  padding-horizontal: 20px;
  padding-top: 24px;
`;

export const DetailsTitle = styled.Text`
  color: ${(props) => props.theme.title || '#e35225'};
  font-weight: bold;
  margin-top: 0px;
  margin-bottom: 6px;
  font-size: 22px;
  text-align: center;
`;

export const DetailsLabel = styled.Text`
  color: ${(props) => props.theme.title || '#2d9267'};
  font-weight: bold;
  margin-top: 18px;
  margin-bottom: 6px;
  font-size: 16px;
`;

export const DetailsText = styled.Text`
  color: ${(props) => props.theme.text || '#222'};
  font-size: 16px;
  margin-bottom: 8px;
`;

export const EditButton = styled.TouchableOpacity`
  background-color: ${(props) => props.theme.fab || '#2d9267'};
  padding: 12px;
  border-radius: 8px;
  align-items: center;
  margin-top: 28px;
`;

export const EditButtonText = styled.Text`
  color: ${(props) => props.theme.fabText || '#fff'};
  font-size: 16px;
`;
