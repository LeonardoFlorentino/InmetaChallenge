import React from 'react';
import styled from 'styled-components/native';
import { TouchableOpacityProps } from 'react-native';

const StyledButton = styled.TouchableOpacity<{enabled?: boolean}>`
  padding-vertical: 14px;
  padding-horizontal: 32px;
  border-radius: 12px;
  align-items: center;
  width: 100%;
  margin-top: 8px;
  background-color: ${(props) => (props.enabled === false ? '#ccc' : '#2d9267')};
  shadow-color: #2d9267;
  shadow-opacity: 0.12;
  shadow-radius: 6px;
  shadow-offset: 0px 2px;
`;

const ButtonText = styled.Text`
  color: #fff;
  font-size: 18px;
  font-weight: bold;
  letter-spacing: 1px;
`;

interface ButtonProps extends TouchableOpacityProps {
  children: React.ReactNode;
  enabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({ children, enabled = true, ...rest }) => (
  <StyledButton
    enabled={enabled}
    activeOpacity={0.8}
    disabled={!enabled}
    style={{
      paddingVertical: 14,
      paddingHorizontal: 32,
      borderRadius: 12,
      alignItems: 'center',
      width: '100%',
      marginTop: 8,
      backgroundColor: enabled ? '#2d9267' : '#ccc',
      shadowColor: '#2d9267',
      shadowOpacity: 0.12,
      shadowRadius: 6,
      shadowOffset: { width: 0, height: 2 },
    }}
    {...rest}
  >
    <ButtonText>{children}</ButtonText>
  </StyledButton>
);

export default Button;
