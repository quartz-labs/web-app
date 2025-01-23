export interface CardUserBase {
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

export type Address = {
    line1: string;
    line2: string | undefined;
    city: string;
    region: string;
    postalCode: string;
    countryCode: string;
    country: string;
};

export type ApplicationStatus = 'approved' | 'pending' | 'needsInformation' | 'needsVerification' | 'manualReview' | 'denied' | 'locked' | 'canceled';

export type CardApplicationStatusResponse = {
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

export type ApplicationCompletionLink = {
    url: string;
    params: {
        userId: string;
    };
};

export type UserFromDatabase = {
    id: number;
    created_at: string;
    solana_address: string;
    card_api_user_id: string;
    auth_level: string;
};
