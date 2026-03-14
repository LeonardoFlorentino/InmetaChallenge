import React from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useTheme } from "../styles/ThemeProvider";
import { StatusBar, Platform } from "react-native";
import { useAuth } from '../contexts/AuthProvider';
import { useNetworkStatus } from '../hooks/useNetworkStatus';
import { Text } from 'react-native';

interface HeaderProps {
  navigation: any;
  showBack?: boolean;
}

const Header: React.FC<HeaderProps> = ({ navigation, showBack = true }) => {
  const { mode, setMode } = useTheme();
  const { logout } = useAuth();
  const isOnline = useNetworkStatus();
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
          onPress={async () => {
            if (navigation.canGoBack && navigation.canGoBack()) {
              navigation.goBack();
            } else {
              await logout();
            }
          }}
          accessibilityLabel="Voltar"
        >
          <MaterialCommunityIcons name="arrow-left" size={22} color="#fff" />
        </TouchableOpacity>
      )}
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <View style={{
          flexDirection: 'row',
          alignItems: 'center',
          backgroundColor: isOnline ? 'rgba(45,146,103,0.92)' : 'rgba(227,82,37,0.45)',
          borderRadius: 16,
          paddingVertical: 6,
          paddingHorizontal: 18,
          alignSelf: 'center',
        }}>
          <MaterialCommunityIcons name={isOnline ? 'wifi' : 'wifi-off'} size={22} color="#fff" style={{ marginRight: 8 }} />
          <HeaderStatusText>{isOnline ? 'Online' : 'Offline'}</HeaderStatusText>
        </View>
      </View>
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

const HeaderStatusText = ({ children }: { children: React.ReactNode }) => (
  <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 15, textAlign: 'center', marginLeft: 4 }}>{children}</Text>
);

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
