import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: #f7f7f7;
  padding: 24px;
`;

export const Card = styled.View`
  background-color: #fff;
  border-radius: 18px;
  padding: 32px;
  align-items: center;
  shadow-color: #000;
  shadow-opacity: 0.08;
  shadow-radius: 12px;
  shadow-offset: 0px 4px;
  width: 100%;
  max-width: 380px;
`;

export const Logo = styled.Image`
  width: 72px;
  height: 72px;
  margin-bottom: 18px;
  resize-mode: contain;
`;

export const Title = styled.Text`
  font-size: 28px;
  font-weight: bold;
  color: #e35225;
  margin-bottom: 8px;
  text-align: center;
`;

export const Subtitle = styled.Text`
  font-size: 16px;
  color: #2d9267;
  margin-bottom: 18px;
  text-align: center;
`;

export const Label = styled.Text`
  color: #2d9267;
  font-weight: bold;
  margin-bottom: 6px;
  font-size: 15px;
  align-self: flex-start;
`;

export const StyledInput = styled.TextInput`
  border-width: 1.5px;
  border-color: #2d9267;
  border-radius: 10px;
  padding: 12px;
  font-size: 16px;
  background-color: #f7f7f7;
  color: #222;
  width: 100%;
  margin-bottom: 18px;
`;

export const Button = styled.TouchableOpacity<{enabled: boolean}>`
  padding-vertical: 14px;
  padding-horizontal: 32px;
  border-radius: 12px;
  align-items: center;
  width: 100%;
  margin-top: 8px;
  background-color: ${(props) => (props.enabled ? '#2d9267' : '#ccc')};
  shadow-color: #2d9267;
  shadow-opacity: 0.12;
  shadow-radius: 6px;
  shadow-offset: 0px 2px;
`;

export const ButtonText = styled.Text`
  color: #fff;
  font-size: 18px;
  font-weight: bold;
  letter-spacing: 1px;
`;

export const Footer = styled.Text`
  margin-top: 32px;
  color: #bbb;
  font-size: 13px;
  text-align: center;
`;
