import type { ApplicationStatus } from "../ApplicationStatus.type";

export interface CardApplicationStatusResponse {
    id: string;
    applicationStatus: ApplicationStatus;
    applicationCompletionLink: {
        url: string;
        params: {
            userId: string;
        };
    };
    applicationReason: string;
};