import styled from 'styled-components/native';
import { Overlay } from '../../components/Overlay';

export const Container = styled.View`
  flex: 1;
`;


export const Card = styled.View`
  width: 90%;
  background-color: #232323cc;
  border-radius: 18px;
  padding: 32px 20px 24px 20px;
  align-items: stretch;
`;

export const Title = styled.Text`
  color: #fff;
  font-size: 28px;
  font-weight: bold;
  text-align: center;
  margin-bottom: 24px;
`;

export const Link = styled.Text`
  color: #e35225;
  text-align: center;
  margin-top: 18px;
  font-size: 16px;
`;

export const ErrorText = styled.Text`
  color: #ffb3b3;
  text-align: center;
  margin-bottom: 8px;
`;

export const SuccessText = styled.Text`
  color: #b3ffb3;
  text-align: center;
  margin-bottom: 8px;
`;

export const EyeButton = styled.TouchableOpacity`
  position: absolute;
  right: 10px;
  top: 12px;
`;

export const InputWrapper = styled.View`
  position: relative;
  width: 100%;
`;

export const Button = styled.TouchableOpacity`
  background-color: #2d9267;
  border-radius: 10px;
  padding-vertical: 14px;
  align-items: center;
  margin-top: 18px;
`;

export const ButtonText = styled.Text`
  color: #fff;
  font-weight: bold;
  font-size: 18px;
`;
