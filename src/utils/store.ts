import type { Rate } from "@/src/types/interfaces/Rate.interface";
import { create } from "zustand";
import { ModalVariation } from "@/src/types/enums/ModalVariation.enum";
import type { MarketIndex } from "@quartz-labs/sdk/browser";
import type { CardsForUserResponse, ProviderCardUser, QuartzCardUser } from "../types/interfaces/CardUserResponse.interface";
import type { JwtToken } from "../types/jwtToken.types";

type State = {
  isInitialized: boolean;
  prices?: Record<MarketIndex, number>;
  rates?: Record<MarketIndex, Rate>;
  balances?: Record<MarketIndex, number>;
  withdrawLimits?: Record<MarketIndex, number>;
  health?: number;
  modalVariation: ModalVariation;
  jwtToken?: JwtToken;
  isSigningLoginMessage: boolean;
  kycLink?: string;
  quartzCardUser?: QuartzCardUser;
  providerCardUser?: ProviderCardUser;
  cardDetails?: CardsForUserResponse;
  pendingCardTopup: boolean;
  topupSignature?: string;
};

type Action = {
  setIsInitialized: (isInitialized: boolean) => void;
  setPrices: (prices?: Record<MarketIndex, number>) => void;
  setRates: (rates?: Record<MarketIndex, Rate>) => void;
  setBalances: (balances?: Record<MarketIndex, number>) => void;
  setWithdrawLimits: (withdrawLimits?: Record<MarketIndex, number>) => void;
  setHealth: (health?: number) => void;
  setModalVariation: (modalVariation: ModalVariation) => void;
  setJwtToken: (jwtToken?: JwtToken) => void;
  setIsSigningLoginMessage: (isSigningLoginMessage: boolean) => void;
  setKycLink: (kycLink?: string) => void;
  setQuartzCardUser: (quartzCardUser?: QuartzCardUser) => void;
  setProviderCardUser: (providerCardUser?: ProviderCardUser) => void;
  setCardDetails: (cardDetails?: CardsForUserResponse) => void;
  setPendingCardTopup: (pendingCardTopup: boolean) => void;
  setTopupSignature: (signature?: string) => void;
}

export const useStore = create<State & Action>((set) => ({
  isInitialized: false,
  prices: undefined,
  rates: undefined,
  balances: undefined,
  withdrawLimits: undefined,
  health: undefined,
  modalVariation: ModalVariation.DISABLED,
  jwtToken: undefined,
  isSigningLoginMessage: false,
  kycLink: undefined,
  quartzCardUser: undefined,
  providerCardUser: undefined,
  cardDetails: undefined,
  pendingCardTopup: false,
  topupSignature: undefined,
  
  setIsInitialized: (isInitialized: boolean) => set({ isInitialized }),
  setPrices: (prices?: Record<MarketIndex, number>) => set({ prices }),
  setRates: (rates?: Record<MarketIndex, Rate>) => set({ rates }),
  setBalances: (balances?: Record<MarketIndex, number>) => set({ balances }),
  setWithdrawLimits: (withdrawLimits?: Record<MarketIndex, number>) => set({ withdrawLimits }),
  setHealth: (health?: number) => set({ health }),
  setModalVariation: (modalVariation: ModalVariation) => set({ modalVariation }),
  setJwtToken: (jwtToken?: JwtToken) => set({ jwtToken }),
  setIsSigningLoginMessage: (isSigningLoginMessage: boolean) => set({ isSigningLoginMessage }),
  setKycLink: (kycLink?: string) => set({ kycLink }),
  setQuartzCardUser: (quartzCardUser?: QuartzCardUser) => set({ quartzCardUser }),
  setProviderCardUser: (providerCardUser?: ProviderCardUser) => set({ providerCardUser }),
  setCardDetails: (cardDetails?: CardsForUserResponse) => set({ cardDetails }),
  setPendingCardTopup: (pendingCardTopup: boolean) => set({ pendingCardTopup }),
  setTopupSignature: (signature?: string) => set({ topupSignature: signature }),
}));
