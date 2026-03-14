import React from "react";
import styled from "styled-components/native";
import { TouchableOpacityProps } from "react-native";

const CenteredButtonContainer = styled.TouchableOpacity`
  margin-top: 24px;
  align-self: center;
  background-color: #2d9267;
  padding: 16px 28px;
  border-radius: 24px;
  elevation: 4;
  shadow-color: #000;
  shadow-opacity: 0.15;
  shadow-radius: 6px;
  shadow-offset: 0px 2px;
`;

const CenteredButtonText = styled.Text`
  color: #fff;
  font-size: 18px;
  font-weight: bold;
`;

interface CenteredButtonProps extends TouchableOpacityProps {
  children: React.ReactNode;
}

const CenteredButton: React.FC<CenteredButtonProps> = ({ children, ...props }) => (
  <CenteredButtonContainer {...props}>
    <CenteredButtonText>{children}</CenteredButtonText>
  </CenteredButtonContainer>
);

export default CenteredButton;
