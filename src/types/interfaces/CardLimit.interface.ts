import type { LimitFrequency } from "../LimitFrequency.type";

export interface CardLimit {
    amount: number;
    frequency: LimitFrequency;
}