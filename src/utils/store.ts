import type { MarketIndex } from "@/src/config/constants";
import type { Rate } from "@/src/types/interfaces/Rate.interface";
import { create } from "zustand";
import { ModalVariation } from "@/src/types/enums/ModalVariation.enum";

type State = {
  isInitialized: boolean;
  prices?: Record<MarketIndex, number>;
  rates?: Record<MarketIndex, Rate>;
  balances?: Record<MarketIndex, number>;
  withdrawLimits?: Record<MarketIndex, number>;
  health?: number;
  modalVariation: ModalVariation;
};

type Action = {
  setIsInitialized: (isInitialized: boolean) => void;
  setPrices: (prices?: Record<MarketIndex, number>) => void;
  setRates: (rates?: Record<MarketIndex, Rate>) => void;
  setBalances: (balances?: Record<MarketIndex, number>) => void;
  setWithdrawLimits: (withdrawLimits?: Record<MarketIndex, number>) => void;
  setHealth: (health?: number) => void;
  setModalVariation: (modalVariation: ModalVariation) => void;
}

export const useStore = create<State & Action>((set) => ({
  isInitialized: false,
  prices: undefined,
  rates: undefined,
  balances: undefined,
  withdrawLimits: undefined,
  health: undefined,
  modalVariation: ModalVariation.DISABLED,

  setIsInitialized: (isInitialized: boolean) => set({ isInitialized }),
  setPrices: (prices?: Record<MarketIndex, number>) => set({ prices }),
  setRates: (rates?: Record<MarketIndex, Rate>) => set({ rates }),
  setBalances: (balances?: Record<MarketIndex, number>) => set({ balances }),
  setWithdrawLimits: (withdrawLimits?: Record<MarketIndex, number>) => set({ withdrawLimits }),
  setHealth: (health?: number) => set({ health }),
  setModalVariation: (modalVariation: ModalVariation) => set({ modalVariation }),
}));
