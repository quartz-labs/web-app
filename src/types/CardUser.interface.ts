import type { CardAccountStatus } from "./CardAccountStatus.type";

export interface CardUser {
    id: number;
    created_at: string;
    solana_address: string;
    provider_user_id: string;
    account_status: CardAccountStatus;
    application_completion_link: string;
    email: string;
    application_denied_reason: string | null;
    first_name: string;
}
