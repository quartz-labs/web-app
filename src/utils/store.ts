import type { Rate } from "@/src/types/interfaces/Rate.interface";
import { create } from "zustand";
import { ModalVariation } from "@/src/types/enums/ModalVariation.enum";
import type { MarketIndex } from "@quartz-labs/sdk/browser";

type State = {
  isInitialized: boolean;
  prices?: Record<MarketIndex, number>;
  rates?: Record<MarketIndex, Rate>;
  balances?: Record<MarketIndex, number>;
  withdrawLimits?: Record<MarketIndex, number>;
  borrowLimits?: Record<MarketIndex, number>;
  health?: number;
  depositLimits?: Record<MarketIndex, number>;
  modalVariation: ModalVariation;
};

type Action = {
  setIsInitialized: (isInitialized: boolean) => void;
  setPrices: (prices?: Record<MarketIndex, number>) => void;
  setRates: (rates?: Record<MarketIndex, Rate>) => void;
  setBalances: (balances?: Record<MarketIndex, number>) => void;
  setWithdrawLimits: (withdrawLimits?: Record<MarketIndex, number>) => void;
  setBorrowLimits: (borrowLimits?: Record<MarketIndex, number>) => void;
  setHealth: (health?: number) => void;
  setDepositLimits: (depositLimits?: Record<MarketIndex, number>) => void;
  setModalVariation: (modalVariation: ModalVariation) => void;
}

export const useStore = create<State & Action>((set) => ({
  isInitialized: false,
  prices: undefined,
  rates: undefined,
  balances: undefined,
  withdrawLimits: undefined,
  borrowLimits: undefined,
  health: undefined,
  depositLimits: undefined,
  modalVariation: ModalVariation.DISABLED,

  setIsInitialized: (isInitialized: boolean) => set({ isInitialized }),
  setPrices: (prices?: Record<MarketIndex, number>) => set({ prices }),
  setRates: (rates?: Record<MarketIndex, Rate>) => set({ rates }),
  setBalances: (balances?: Record<MarketIndex, number>) => set({ balances }),
  setWithdrawLimits: (withdrawLimits?: Record<MarketIndex, number>) => set({ withdrawLimits }),
  setBorrowLimits: (borrowLimits?: Record<MarketIndex, number>) => set({ borrowLimits }),
  setHealth: (health?: number) => set({ health }),
  setDepositLimits: (depositLimits?: Record<MarketIndex, number>) => set({ depositLimits }),
  setModalVariation: (modalVariation: ModalVariation) => set({ modalVariation }),
}));
