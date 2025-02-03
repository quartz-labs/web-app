import type { Address } from "./Address.interface";

export interface KYCData {
    id: string;
    firstName: string;
    lastName: string;
    birthDate: string; // YYYY-MM-DD
    nationalId: string;
    countryOfIssue: string; // ISO 3166-1 alpha-2
    email: string;
    phoneCountryCode: string;
    phoneNumber: string;
    address: Address;
    walletAddress: string;
    chainId: string;
    contractAddress: string;
    ipAddress: string;
    occupation: string;
    annualSalary: string;
    accountPurpose: string;
    expectedMonthlyVolume: string;
    isTermsOfServiceAccepted: boolean;
    hasExistingDocuments?: string;
}

export const DEFAULT_KYC_DATA: KYCData = {
    id: "",
    firstName: "",
    lastName: "",
    birthDate: "",
    nationalId: "",
    countryOfIssue: "",
    email: "",
    phoneCountryCode: "",
    phoneNumber: "",
    address: {
        line1: "",
        line2: "",
        city: "",
        region: "",
        postalCode: "",
        countryCode: "",
        country: "",
    },
    walletAddress: "",
    chainId: "",
    contractAddress: "",
    ipAddress: "",
    occupation: "",
    annualSalary: "",
    accountPurpose: "",
    expectedMonthlyVolume: "",
    isTermsOfServiceAccepted: false,
    hasExistingDocuments: "",
}