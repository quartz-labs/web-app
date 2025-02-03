import type { ApplicationCompletionLink } from "../ApplicationCompleteLink.type";
import type { ApplicationStatus } from "../ApplicationStatus.type";
import type { Address } from "./Address.interface";

export interface ProviderCardUser {
    id: string;
    companyId: string | undefined;
    firstName: string;
    lastName: string;
    email: string;
    isActive: boolean;
    isTermsOfServiceAccepted: boolean;
    address: Address;
    phoneCountryCode: string;
    phoneNumber: string;
    applicationStatus: ApplicationStatus;
    applicationCompletionLink: ApplicationCompletionLink;
    applicationReason: string | undefined;
}