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
  background-color: rgba(30, 30, 30, 0.85);
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
  color: #fff;
  margin-bottom: 4px;
`;

export const CardText = styled.Text`
  color: #eee;
  font-size: 14px;
  margin-bottom: 2px;
`;
import styled from 'styled-components/native';
import { ImageBackground as RNImageBackground } from 'react-native';
import { Dimensions } from 'react-native';

export const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

export const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: 24px 0;
`;

export const ImageBackground = styled(RNImageBackground)`
  flex: 1;
  height: ${() => SCREEN_HEIGHT + 100}px;
  width: ${() => SCREEN_WIDTH + 100}px;
  justify-content: center;
  align-items: center;
`;

export const Card = styled.View`
  background-color: #fff;
  border-radius: 22px;
  padding: 32px 20px 28px 20px;
  align-items: center;
  shadow-color: #000;
  shadow-opacity: 0.10;
  shadow-radius: 16px;
  shadow-offset: 0px 6px;
  width: 95%;
  max-width: 350px;
  elevation: 6;
`;

export const Logo = styled.Image`
  width: 60px;
  height: 60px;
  margin-bottom: 12px;
  margin-top: -18px;
  resize-mode: contain;
`;

export const Title = styled.Text`
  font-size: 26px;
  font-weight: bold;
  color: #e35225;
  margin-bottom: 8px;
  text-align: center;
`;

export const Subtitle = styled.Text`
  font-size: 15px;
  color: #2d9267;
  margin-bottom: 16px;
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
  margin-top: 24px;
  color: #bbb;
  font-size: 13px;
  text-align: center;
`;

