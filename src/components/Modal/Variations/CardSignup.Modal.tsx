import { useStore } from "@/src/utils/store";
import { useAnchorWallet } from "@solana/wallet-adapter-react";
import { useState } from "react";
import { ModalVariation } from "@/src/types/enums/ModalVariation.enum";
import styles from "../Modal.module.css";
import Buttons from "../Buttons.ModalComponent";
import { useError } from "@/src/context/error-provider";
import { captureError } from "@/src/utils/errors";
import CardSignupInputSection from "../CardSignUp/CardAccountCreate.ModalComponent";

import config from "@/src/config/config";
import { fetchAndParse } from "@/src/utils/helpers";

interface CardSignupForm {
    id: string;
    firstName: string;
    lastName: string;
    birthDate: string; // YYYY-MM-DD
    nationalId: string;
    countryOfIssue: string; // ISO 3166-1 alpha-2
    email: string;
    phoneCountryCode: string;
    phoneNumber: string;
    line1: string;
    line2: string | undefined;
    city: string;
    region: string;
    postalCode: string;
    countryCode: string;
    country: string;
    walletAddress?: string;
    chainId?: string;
    contractAddress?: string;
    ipAddress: string;
    occupation: string;
    annualSalary: string;
    accountPurpose: string;
    expectedMonthlyVolume: string;
    isTermsOfServiceAccepted: boolean;
    hasExistingDocuments?: string;
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

export default function CardSignupModal() {
    const wallet = useAnchorWallet();
    const { setModalVariation, setKycLink } = useStore();
    const { showError } = useError();

    const [formData, setFormData] = useState<CardSignupForm>({
        id: "",
        firstName: "",
        lastName: "",
        birthDate: "",
        nationalId: "",
        countryOfIssue: "",
        email: "",
        phoneCountryCode: "",
        phoneNumber: "",
        line1: "",
        line2: "",
        city: "",
        region: "",
        postalCode: "",
        countryCode: "",
        country: "",
        walletAddress: "",
        chainId: "",
        contractAddress: "",
        ipAddress: "",
        occupation: "",
        annualSalary: "",
        accountPurpose: "",
        expectedMonthlyVolume: "",
        isTermsOfServiceAccepted: true,
        hasExistingDocuments: "",
    });

    const handleInputChange = (field: keyof CardSignupForm, value: string) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const handleSubmit = async () => {
        if (!wallet?.publicKey) {
            showError({
                message: "Wallet not connected",
                errorId: "WALLET_NOT_CONNECTED",
                body: "Please connect your wallet to continue."
            });
            return;
        }

        try {
            const requestData = {
                isTermsOfServiceAccepted: true,
                address: {
                    line1: formData.line1,
                    line2: formData.line2,
                    city: formData.city,
                    region: formData.region,
                    postalCode: formData.postalCode,
                    countryCode: formData.countryOfIssue,
                    country: formData.country,
                },
                nationalId: formData.nationalId,
                email: formData.email,
                phoneCountryCode: formData.phoneCountryCode,
                countryOfIssue: formData.countryOfIssue,
                birthDate: formData.birthDate,
                firstName: formData.firstName,
                lastName: formData.lastName,
                ipAddress: "192.168.1.10", // Hardcoded for now, could be fetched from an IP service
                occupation: formData.occupation,
                annualSalary: formData.annualSalary,
                accountPurpose: formData.accountPurpose,
                expectedMonthlyVolume: formData.expectedMonthlyVolume,
                phoneNumber: formData.phoneNumber
            };

            const response = await fetchAndParse(`${config.NEXT_PUBLIC_INTERNAL_API_URL}/card/application/create`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestData),
            });

            console.log('Card Signup Response:', response);

            setKycLink(`${response.applicationCompletionLink.url}?userId=${response.applicationCompletionLink.params.userId}`);

            setModalVariation(ModalVariation.CARD_KYC);
        } catch (error) {
            captureError(showError, "Failed to submit form", "/CardSignupModal.tsx", error, wallet.publicKey);
        }
    };

    return (
        <div className={styles.contentWrapper2}>
            <h2 className={styles.heading}>Sign up for a Quartz Card</h2>

            <div className={styles.scrollableContent}>

                <CardSignupInputSection
                    label="First Name"
                    amountStr={formData.firstName}
                    setAmountStr={(value) => handleInputChange("firstName", value)}
                />

                <CardSignupInputSection
                    label="Last Name"
                    amountStr={formData.lastName}
                    setAmountStr={(value) => handleInputChange("lastName", value)}
                />

                <CardSignupInputSection
                    label="Birth Date"
                    amountStr={formData.birthDate}
                    setAmountStr={(value) => handleInputChange("birthDate", value)}
                />

                <CardSignupInputSection
                    label="Email"
                    amountStr={formData.email}
                    setAmountStr={(value) => handleInputChange("email", value)}
                />

                <CardSignupInputSection
                    label="Phone Number"
                    amountStr={formData.phoneNumber}
                    setAmountStr={(value) => handleInputChange("phoneNumber", value)}
                />

                <CardSignupInputSection
                    label="Phone Country Code"
                    amountStr={formData.phoneCountryCode}
                    setAmountStr={(value) => handleInputChange("phoneCountryCode", value)}
                />

                <CardSignupInputSection
                    label="Address line 1"
                    amountStr={formData.line1}
                    setAmountStr={(value) => handleInputChange("line1", value)}
                />

                <CardSignupInputSection
                    label="Address line 2"
                    amountStr={formData.line2 || ""}
                    setAmountStr={(value) => handleInputChange("line2", value)}
                />

                <CardSignupInputSection
                    label="City"
                    amountStr={formData.city}
                    setAmountStr={(value) => handleInputChange("city", value)}
                />

                <CardSignupInputSection
                    label="Postcode"
                    amountStr={formData.postalCode}
                    setAmountStr={(value) => handleInputChange("postalCode", value)}
                />

                <CardSignupInputSection
                    label="State"
                    amountStr={formData.region}
                    setAmountStr={(value) => handleInputChange("region", value)}
                />

                <CardSignupInputSection
                    label="Country"
                    amountStr={formData.country}
                    setAmountStr={(value) => handleInputChange("country", value)}
                />

                <CardSignupInputSection
                    label="Occupation"
                    amountStr={formData.occupation}
                    setAmountStr={(value) => handleInputChange("occupation", value)}
                />

                <CardSignupInputSection
                    label="Annual Income"
                    amountStr={formData.annualSalary}
                    setAmountStr={(value) => handleInputChange("annualSalary", value)}
                />

                <CardSignupInputSection
                    label="Account purpose"
                    amountStr={formData.accountPurpose}
                    setAmountStr={(value) => handleInputChange("accountPurpose", value)}
                />

                <CardSignupInputSection
                    label="Expected monthly spend"
                    amountStr={formData.expectedMonthlyVolume}
                    setAmountStr={(value) => handleInputChange("expectedMonthlyVolume", value)}
                />

                <CardSignupInputSection
                    label="National ID number"
                    amountStr={formData.nationalId}
                    setAmountStr={(value) => handleInputChange("nationalId", value)}
                />

                <CardSignupInputSection
                    label="Country of issue (ISO 3166-1 alpha-2)"
                    amountStr={formData.countryOfIssue}
                    setAmountStr={(value) => handleInputChange("countryOfIssue", value)}
                />

                <CardSignupInputSection
                    label="Do you accept the Quartz card terms of service?"
                    amountStr={formData.isTermsOfServiceAccepted.toString()}
                    setAmountStr={(value) => handleInputChange("isTermsOfServiceAccepted", value)}
                />
            </div>

            <div className={styles.fixedButtons}>
                <Buttons
                    label="Submit Application"
                    awaitingSign={false}
                    onConfirm={handleSubmit}
                    onCancel={() => setModalVariation(ModalVariation.DISABLED)}
                />
            </div>
        </div>
    );
}