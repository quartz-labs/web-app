export interface Address {
    line1: string;
    line2: string | undefined;
    city: string;
    region: string;
    postalCode: string;
    countryCode: string; // ISO 3166-1 alpha-2
    country: string;
}