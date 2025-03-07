import type { CardTransactionProcessSteps } from "./CardTransactionProcessSteps.types";
import type { CardTransactionStatus } from "./CardTransactionStatus.type";

export interface CardTransaction {
    id: number;
    user_id: number;
    card_id: number;
    created_at: string;
    authorized_at: string;
    amount: number;
    on_chain_hash: string | null;
    local_amount: number | null;
    local_currency: string | null;
    currency: string;
    authorized_amount: number;
    authorization_method: string | null;
    provider_transaction_id: string;
    status: CardTransactionStatus;
    merchant_name: string;
    merchant_city: string;
    merchant_country: string;
    merchant_category: string;
    merchant_category_code: string;
    declined_reason: string | null;
    enriched_merchant_icon: string | null;
    enriched_merchant_name: string | null;
    last_completed_process: CardTransactionProcessSteps;
    updated_transaction_id: number | null;
}