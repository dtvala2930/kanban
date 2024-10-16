import { create } from "zustand";

type Loading = {
  isLoading: boolean;
  setLoading: (isLoading: boolean) => void;
};

export const useLoading = create<Loading>((set) => ({
  isLoading: false,
  setLoading: (isLoading) =>
    set(() => ({
      isLoading: isLoading,
    })),
}));
