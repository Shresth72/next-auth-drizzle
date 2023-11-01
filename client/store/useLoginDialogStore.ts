import { create } from "zustand";

type Store = {
  open: boolean;
};

type Actions = {
  setOpen: (open: boolean) => void;
};

export const useLoginDialog = create<Store & Actions>((set) => ({
  open: false,
  setOpen: (open) => set({ open }),
}));
