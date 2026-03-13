import React from 'react';
import styled from 'styled-components/native';
import { TextInputProps } from 'react-native';

const StyledInput = styled.TextInput`
  border-width: 1.5px;
  border-color: #2d9267;
  border-radius: 10px;
  padding: 12px;
  font-size: 16px;
  background-color: ${(props) => props.theme.inputBg};
  color: ${(props) => props.theme.inputText};
  width: 100%;
  margin-bottom: 18px;
  min-height: 48px;
`;

export const Input: React.FC<TextInputProps> = (props) => (
  <StyledInput placeholderTextColor="#bbb" {...props} />
);

export default Input;
