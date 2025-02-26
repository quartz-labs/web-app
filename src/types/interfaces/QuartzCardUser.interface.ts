import type { QuartzCardAccountStatus } from "../enums/QuartzCardAccountStatus.enum";

export interface QuartzCardUser {
    id: number;
    created_at: string;
    solana_address: string;
    card_api_user_id: string;
    account_status: QuartzCardAccountStatus;
};