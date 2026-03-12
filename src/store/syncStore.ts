import { create } from "zustand";

interface SyncState {
  isSyncing: boolean;
  setSyncing: (syncing: boolean) => void;
  lastSync: string | null;
  setLastSync: (date: string) => void;
}

export const useSyncStore = create<SyncState>((set) => ({
  isSyncing: false,
  setSyncing: (syncing: boolean) => set({ isSyncing: syncing }),
  lastSync: null,
  setLastSync: (date: string) => set({ lastSync: date }),
}));
