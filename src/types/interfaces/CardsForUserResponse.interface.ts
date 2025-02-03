import type { CardLimit } from "./CardLimit.interface";

export interface CardsForUserResponse {
    id: string;
    companyId: string;
    userId: string;
    type: 'physical' | 'virtual';
    status: 'notActivated' | 'active' | 'locked' | 'cancelled';
    limit: CardLimit;
    last4: string;
    expirationMonth: string;
    expirationYear: string;
    tokenWallets: string[] | undefined;
}