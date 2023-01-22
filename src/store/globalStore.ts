import { AxiosInstance } from "axios";
import create from "zustand";

type globalStore = {
  client: AxiosInstance;
  setClient: (client: AxiosInstance) => void;
  isClient: boolean;
  setIsClient: (isClient: boolean) => void;
};

export const useGlobalStore = create<globalStore>((set) => ({
  client: {} as AxiosInstance,
  setClient: (client) => set({ client }),
  isClient: false,
  setIsClient: (isClient) => set({ isClient }),
}));
