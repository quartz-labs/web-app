export interface Card {
    id: number;
    user_id: number;
    created_at: string;
    provider_card_id: string;
    added_to_wallet: boolean;
    last4: string;
    expiration_month: string;
    expiration_year: string;
}