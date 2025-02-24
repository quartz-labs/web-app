import { getCountry } from "@/src/utils/countries";
import type { Address } from "./Address.interface";

export interface KYCData {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    birthDate: string; // YYYY-MM-DD
    address: Address;
    countryOfIssue: string; // ISO 3166-1 alpha-2
    nationalId: string;
    occupation: string;
    accountPurpose: string;
    annualSalary: string;
    expectedMonthlyVolume: string;
    walletAddress: string;
    ipAddress: string;
    isTermsOfServiceAccepted: boolean;
}

const DEFAULT_COUNTRY = "US";
export const DEFAULT_KYC_DATA: KYCData = {
    id: "",
    firstName: "",
    lastName: "",
    email: "",
    birthDate: "",
    address: {
        line1: "",
        line2: "",
        city: "",
        region: "",
        postalCode: "",
        countryCode: DEFAULT_COUNTRY,
        country: getCountry(DEFAULT_COUNTRY) ?? "",
    },
    countryOfIssue: DEFAULT_COUNTRY,
    nationalId: "",
    occupation: "",
    accountPurpose: "",
    annualSalary: "",
    expectedMonthlyVolume: "",
    walletAddress: "",
    ipAddress: "",
    isTermsOfServiceAccepted: false,
}


export interface Terms {
    acceptEsignConsent: boolean;
    openingDisclosure: boolean | undefined;
    acceptQuartzCardTerms: boolean;
    privacyPolicy: boolean;
    informationIsAccurate: boolean;
    applyingForCardNotSolicitation: boolean;
}

export const DEFAULT_TERMS: Terms = {
    acceptEsignConsent: false,
    openingDisclosure: undefined,
    acceptQuartzCardTerms: false,
    privacyPolicy: false,
    informationIsAccurate: false,
    applyingForCardNotSolicitation: false,
}