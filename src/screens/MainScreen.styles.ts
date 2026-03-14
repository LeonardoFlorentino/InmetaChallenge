import styled from 'styled-components/native';
import { ImageBackground as RNImageBackground } from 'react-native';
import { Dimensions } from 'react-native';

export const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

export const ImageBackground = styled(RNImageBackground)`
  flex: 1;
  width: 100%;
  height: 100%;
`;

export const MainOverlay = styled.View`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(20, 20, 20, 0.70);
  justify-content: center;
  align-items: center;
`;

export const CardBox = styled.View`
  background-color: ${(props) => props.theme.card};
  border-radius: 14px;
  padding: 18px 16px 14px 16px;
  margin-bottom: 14px;
  width: 92%;
  min-width: 260px;
  max-width: 340px;
  min-height: 90px;
  align-self: center;
  shadow-color: #000;
  shadow-opacity: 0.18;
  shadow-radius: 10px;
  shadow-offset: 0px 2px;
  elevation: 4;
`;

export const CardTitle = styled.Text`
  font-size: 18px;
  font-weight: bold;
  color: ${(props) => props.theme.title};
  margin-bottom: 4px;
`;

export const CardText = styled.Text`
  color: ${(props) => props.theme.text};
  font-size: 14px;
  margin-bottom: 2px;
`;

