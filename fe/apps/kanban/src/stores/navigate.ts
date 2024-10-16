import { create } from "zustand";

type NavigateStore = {
  to: string;
  setNavigateTo: (to: string) => void;
  setDefaultNavigate: () => void;
};

export const useNavigateStore = create<NavigateStore>((set) => ({
  to: "",
  setNavigateTo: (to) =>
    set(() => ({
      to,
    })),
  setDefaultNavigate: () =>
    set((state) => {
      state.to = "";
      return state;
    }),
}));
