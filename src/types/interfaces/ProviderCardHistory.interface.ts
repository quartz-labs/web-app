export interface ProviderCardHistory {
  id: string;
  type: string;
  spend: {
    amount: number;
    currency: string;
    localAmount?: number;
    localCurrency?: string;
    authorizedAmount?: number;
    authorizationMethod?: string;
    memo?: string;
    receipt: boolean;
    merchantName: string;
    merchantCategory: string;
    merchantCategoryCode: string;
    enrichedMerchantIcon?: string;
    enrichedMerchantName?: string;
    enrichedMerchantCategory?: string;
    cardId: string;
    cardType: 'physical' | 'virtual';
    companyId?: string;
    userId: string;
    userFirstName: string;
    userLastName: string;
    userEmail: string;
    status: CardTransactionStatus;
    declinedReason?: string;
    authorizedAt: string;
    postedAt?: string;
  };
}


export type CardTransactionStatus = 'pending' | 'reversed' | 'declined' | 'completed';