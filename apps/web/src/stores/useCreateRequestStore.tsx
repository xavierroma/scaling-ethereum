import { create } from "zustand";

interface CreateRequestStore {
  description: string;
  setDescription: (description: string) => void;
  amount: number;
  setAmount: (amount: number) => void;
  splits: Split[];
  setSplits: (splits: Split[]) => void;
  clear: () => void;
}

type Split = {
  address: string;
  ens: string;
  amount: number;
};

export const useCreateRequestStore = create<CreateRequestStore>((set) => ({
  description: "",
  setDescription: (description) => set({ description }),
  amount: 0,
  setAmount: (amount) => set({ amount }),
  splits: [],
  setSplits: (splits) => set({ splits }),
  clear: () => set({ description: "", amount: 0, splits: [] }),
}));
