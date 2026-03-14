import { DefaultTheme } from 'styled-components';
import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  background-color: ${(props) => props.theme.background};
`;

export const Card = styled.ScrollView`
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

export const Title = styled.Text`
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

export const StyledInput = styled.TextInput`
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

export const StatusButton = styled.TouchableOpacity<{active: boolean}>`
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

export const OnlineStatus = styled.View`
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  align-items: center;
  padding: 8px;
`;

export const OnlineStatusText = styled.Text<{online: boolean}>`
  color: ${(props) => (props.online ? '#2d9267' : '#e35225')};
`;

export const OnlineStatusBadge = styled.View<{online: boolean}>`
  align-self: center;
  margin-vertical: 8px;
  padding-vertical: 6px;
  padding-horizontal: 18px;
  border-radius: 16px;
  background-color: ${(props) => (props.online ? '#2d9267' : '#e35225')};
`;

export const OnlineStatusBadgeText = styled.Text`
  color: #fff;
  font-weight: bold;
  font-size: 15px;
`;

export const ButtonRow = styled.View`
  flex-direction: column;
  justify-content: flex-start;
  margin-top: 24px;
  gap: 12px;
`;
