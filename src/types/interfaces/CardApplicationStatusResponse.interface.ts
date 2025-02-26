import type { ApplicationStatus } from "../ApplicationStatus.type";

export type CardApplicationStatusResponse = {
    id: string;
    applicationStatus: ApplicationStatus;
    applicationCompletionLink: {
        url: string;
        params: {
            userId: string;
        };
    } | undefined;
    applicationReason: string;
};