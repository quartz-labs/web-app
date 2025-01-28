import type { Rate } from "@/src/types/interfaces/Rate.interface";
import { create } from "zustand";
import { ModalVariation } from "@/src/types/enums/ModalVariation.enum";
import type { MarketIndex } from "@quartz-labs/sdk/browser";
import { useWallet } from '@solana/wallet-adapter-react'
import {
  PublicKey,
} from '@solana/web3.js'
import { useMutation } from '@tanstack/react-query'
import type { CardsForUserResponse, CardUserBase, UserFromDatabase } from "../types/interfaces/CardUserResponse.interface";

type State = {
  isInitialized: boolean;
  prices?: Record<MarketIndex, number>;
  rates?: Record<MarketIndex, Rate>;
  balances?: Record<MarketIndex, number>;
  withdrawLimits?: Record<MarketIndex, number>;
  health?: number;
  modalVariation: ModalVariation;
  jwtToken?: string;
  kycLink?: string;
  userFromDb?: UserFromDatabase;
  cardUserInfo?: CardUserBase;
  cardDetails?: CardsForUserResponse[];
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
  setJwtToken: (jwtToken?: string) => void;
  setKycLink: (kycLink?: string) => void;
  setUserFromDb: (userFromDb?: UserFromDatabase) => void;
  setCardUserInfo: (cardUserInfo?: CardUserBase) => void;
  setCardDetails: (cardDetails?: CardsForUserResponse[]) => void;
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
  kycLink: undefined,
  userFromDb: undefined,
  cardUserInfo: undefined,
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
  setJwtToken: (jwtToken?: string) => set({ jwtToken }),
  setKycLink: (kycLink?: string) => set({ kycLink }),
  setUserFromDb: (userFromDb?: UserFromDatabase) => set({ userFromDb }),
  setCardUserInfo: (cardUserInfo?: CardUserBase) => set({ cardUserInfo }),
  setCardDetails: (cardDetails?: CardsForUserResponse[]) => set({ cardDetails }),
  setPendingCardTopup: (pendingCardTopup: boolean) => set({ pendingCardTopup }),
  setTopupSignature: (signature?: string) => set({ topupSignature: signature }),
}));

export function useSignMessage({ address }: { address: PublicKey | null }) {
  if (!address) {
    console.log("Failed to sign message: no address provided to sign message");
  }

  const wallet = useWallet()

  return useMutation({
    mutationKey: ['sign-message', { address }],
    mutationFn: async (message: string) => {
      try {
        if (!wallet.signMessage) {
          throw new Error('Wallet does not support message signing')
        }

        // Convert message to Uint8Array and sign it
        const messageBytes = new TextEncoder().encode(message)
        const signature = await wallet.signMessage(messageBytes)

        return Buffer.from(signature).toString('base64')
      } catch (error: unknown) {
        console.error('Signing failed!', error)
        throw error
      }
    },
    onError: (error) => {
      //TODO: ASK iarla how to handle errors
      console.log("Failed to sign message: ", error);
    },
  })
}