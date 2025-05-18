import { create } from "zustand";

export type AuthState = {
  isLogin: boolean;
  userInfo: null | string;
  login: () => void;
  logout: () => void;
  setUserInfo: (userInfo: string) => void;
  cleanUserInfo: () => void;
};

export const useAuth = create<AuthState>((set) => ({
  isLogin: true,
  userInfo: null,
  login: () => set({ isLogin: true }),
  logout: () => set({ isLogin: false, userInfo: null }),
  setUserInfo: (userInfo) => set({ userInfo }),
  cleanUserInfo: () => set({ userInfo: null }),
}));
