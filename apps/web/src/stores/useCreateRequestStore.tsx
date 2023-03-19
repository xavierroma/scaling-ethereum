import { create } from "zustand";

interface CreateRequestStore {
  description: string;
  setDescription: (description: string) => void;
  amount?: number;
  setAmount: (amount: number) => void;
}

export const useCreateRequestStore = create<CreateRequestStore>((set) => ({
  description: "",
  setDescription: (description) => set({ description }),
  amount: undefined,
  setAmount: (amount) => set({ amount }),
}));
