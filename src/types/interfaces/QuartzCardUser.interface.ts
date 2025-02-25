import type { AuthLevel } from "../enums/AuthLevel.enum";

export interface QuartzCardUser {
    id: number;
    created_at: string;
    solana_address: string;
    card_api_user_id: string;
    auth_level: AuthLevel;
    set_initial_spend_limit: boolean;
};