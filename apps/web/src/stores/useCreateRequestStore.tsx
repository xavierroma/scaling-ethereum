import { create } from "zustand";

interface CreateRequestStore {
  description: string;
  setDescription: (description: string) => void;
  amount?: number;
  setAmount: (amount: number) => void;
  splits: string[];
  setSplits: (splits: string[]) => void;
}

export const useCreateRequestStore = create<CreateRequestStore>((set) => ({
  description: "",
  setDescription: (description) => set({ description }),
  amount: undefined,
  setAmount: (amount) => set({ amount }),
  splits: [],
  setSplits: (splits) => set({ splits }),
}));
