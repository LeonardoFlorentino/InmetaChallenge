import React from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useTheme } from "../styles/ThemeProvider";
import { StatusBar, Platform } from "react-native";

interface HeaderProps {
  navigation: any;
  showBack?: boolean;
}

const Header: React.FC<HeaderProps> = ({ navigation, showBack = true }) => {
  const { mode, setMode } = useTheme();
  React.useEffect(() => {
    StatusBar.setBarStyle(mode === 'dark' ? 'light-content' : 'dark-content');
    if (Platform.OS === 'android') {
      StatusBar.setBackgroundColor('transparent');
      StatusBar.setTranslucent(true);
    }
  }, [mode]);
  return (
    <View style={styles.header}>
      {showBack && (
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            if (navigation.canGoBack && navigation.canGoBack()) {
              navigation.goBack();
            }
            // Se não pode voltar, não faz nada
          }}
          accessibilityLabel="Voltar"
        >
          <MaterialCommunityIcons name="arrow-left" size={22} color="#fff" />
        </TouchableOpacity>
      )}
      <View style={{ flex: 1 }} />
      <TouchableOpacity
        style={styles.button}
        onPress={() => setMode(mode === 'dark' ? 'light' : 'dark')}
        accessibilityLabel="Alternar modo escuro"
      >
        <MaterialCommunityIcons
          name={mode === 'dark' ? 'white-balance-sunny' : 'moon-waning-crescent'}
          size={22}
          color="#fff"
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    width: '100%',
    height: 80,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 30,
    paddingHorizontal: 16,
    backgroundColor: 'transparent',
    paddingTop: Platform.OS === 'android' ? (StatusBar.currentHeight || 32) + 8 : 40,
  },
  button: {
    backgroundColor: 'rgba(40,40,40,0.7)',
    borderRadius: 18,
    padding: 7,
    marginHorizontal: 2,
  },
});

export default Header;
