import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';

export type AuthUser = {
  username: string;
  password: string;
};

interface AuthState {
  user: AuthUser | null;
  token: string | null;
  loading: boolean;
  login: (username: string, password: string) => Promise<boolean>;
  register: (username: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;
  checkAuth: () => Promise<void>;
}

const USERS_KEY = 'users';
const TOKEN_KEY = 'token';

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  token: null,
  loading: false,

  login: async (username, password) => {
    set({ loading: true });
    const usersRaw = await AsyncStorage.getItem(USERS_KEY);
    const users: AuthUser[] = usersRaw ? JSON.parse(usersRaw) : [];
    const found = users.find(u => u.username === username && u.password === password);
    if (found) {
      const token = Math.random().toString(36).substring(2);
      await AsyncStorage.setItem(TOKEN_KEY, token);
      set({ user: found, token, loading: false });
      return true;
    }
    set({ loading: false });
    return false;
  },

  register: async (username, password) => {
    set({ loading: true });
    const usersRaw = await AsyncStorage.getItem(USERS_KEY);
    const users: AuthUser[] = usersRaw ? JSON.parse(usersRaw) : [];
    if (users.find(u => u.username === username)) {
      set({ loading: false });
      return false;
    }
    const newUser = { username, password };
    users.push(newUser);
    await AsyncStorage.setItem(USERS_KEY, JSON.stringify(users));
    set({ loading: false });
    return true;
  },

  logout: async () => {
    await AsyncStorage.removeItem(TOKEN_KEY);
    set({ user: null, token: null });
  },

  checkAuth: async () => {
    set({ loading: true });
    const token = await AsyncStorage.getItem(TOKEN_KEY);
    if (token) {
      const usersRaw = await AsyncStorage.getItem(USERS_KEY);
      const users: AuthUser[] = usersRaw ? JSON.parse(usersRaw) : [];
      // Simples: pega o primeiro usuário logado
      set({ user: users[0] || null, token, loading: false });
    } else {
      set({ user: null, token: null, loading: false });
    }
  },
}));
