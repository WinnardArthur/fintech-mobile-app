import { StateStorage } from "zustand/middleware";
import { MMKV } from "react-native-mmkv";

const storage = new MMKV({
  id: "balance-storage",
});

export const zustandStorage: StateStorage = {
  getItem: (name) => {
    const value = storage.getString(name);
    return value ?? null;
  },
  setItem: (name, value) => {
    return storage.set(name, value);
  },
  removeItem: (name) => {
    return storage.delete(name);
  },
};
