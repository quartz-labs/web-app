import { useStore } from "@/src/utils/store";
import { useAnchorWallet } from "@solana/wallet-adapter-react";
import { useState } from "react";
import { ModalVariation } from "@/src/types/enums/ModalVariation.enum";
import styles from "../../Modal.module.css";
import Buttons from "../../Components/Buttons.ModalComponent";
import { useError } from "@/src/context/error-provider";
import { captureError } from "@/src/utils/errors";
import CardSignupInputSection from "../../Components/CardSignUp/CardAccountCreate.ModalComponent";
import config from "@/src/config/config";
import { fetchAndParse } from "@/src/utils/helpers";
import type { Address } from "@/src/types/interfaces/Address.interface";
import type { QuartzCardUser } from "@/src/types/interfaces/QuartzCardUser.interface";
import { useOpenKycLink, useRefetchCardUser } from "@/src/utils/hooks";
import { DEFAULT_KYC_DATA, type KYCData } from "@/src/types/interfaces/KYCData.interface";
import type { ApplicationCompletionLink } from "@/src/types/ApplicationCompleteLink.type";

export default function CardSignupModal() {
    const wallet = useAnchorWallet();
    const { setModalVariation } = useStore();
    const { showError } = useError();
    const refetchCardUser = useRefetchCardUser();
    const openKycLink = useOpenKycLink();

    const [formData, setFormData] = useState<KYCData>(DEFAULT_KYC_DATA);
    const [loading, setLoading] = useState(false);

    const handleFormDataChange = <K extends keyof KYCData>(field: K, value: KYCData[K]) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const handleAddressChange = <K extends keyof Address>(field: K, value: Address[K]) => {
        setFormData(prev => ({
            ...prev,
            address: {
                ...prev.address,
                [field]: value
            }
        }));
    };

    const handleSubmit = async () => {
        if (!wallet?.publicKey) {
            captureError(showError, "Wallet not connected", "/CardSignupModal.tsx", "Wallet not connected", null);
            return;
        }

        setLoading(true);
        try {
            const submitData = {
                ...formData,
                walletAddress: wallet.publicKey.toBase58(),
            }

            const response: {
                quartzCardUser: QuartzCardUser;
                applicationCompletionLink: ApplicationCompletionLink;
            } = await fetchAndParse(
                `${config.NEXT_PUBLIC_INTERNAL_API_URL}/card/application/create`, 
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(submitData),
                }
            );

            openKycLink(`${response.applicationCompletionLink.url}?userId=${response.applicationCompletionLink.params.userId}`);
            refetchCardUser();
        } catch (error) {
            captureError(showError, "Failed to submit form", "/CardSignupModal.tsx", error, wallet.publicKey);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={styles.contentWrapper2}>
            <h2 className={styles.heading}>Sign up for a Quartz Card</h2>

            <div className={styles.scrollableContent}>

                <CardSignupInputSection
                    label="First Name"
                    amountStr={formData.firstName}
                    setAmountStr={(value) => handleFormDataChange("firstName", value)}
                />

                <CardSignupInputSection
                    label="Last Name"
                    amountStr={formData.lastName}
                    setAmountStr={(value) => handleFormDataChange("lastName", value)}
                />

                <div style={{display: "flex", flexDirection: "column", marginBottom: "8px"}}>
                    <label style={{marginRight: "10px"}}>Birth Date:</label>
                    <input
                        className={styles.dobInput}
                        type="date"
                        value={formData.birthDate}
                        onChange={(e) => handleFormDataChange("birthDate", e.target.value)}
                        max={new Date().toISOString().split('T')[0]} // Prevents future dates
                    />
                </div>

                <CardSignupInputSection
                    label="Email"
                    amountStr={formData.email}
                    setAmountStr={(value) => handleFormDataChange("email", value)}
                />

                <CardSignupInputSection
                    label="Phone Number"
                    amountStr={formData.phoneNumber}
                    setAmountStr={(value) => handleFormDataChange("phoneNumber", value)}
                />

                <CardSignupInputSection
                    label="Phone Country Code"
                    amountStr={formData.phoneCountryCode}
                    setAmountStr={(value) => handleFormDataChange("phoneCountryCode", value)}
                />

                <CardSignupInputSection
                    label="Address line 1"
                    amountStr={formData.address.line1}
                    setAmountStr={(value) => handleAddressChange("line1", value)}
                />

                <CardSignupInputSection
                    label="Address line 2"
                    amountStr={formData.address.line2 || ""}
                    setAmountStr={(value) => handleAddressChange("line2", value)}
                />

                <CardSignupInputSection
                    label="City"
                    amountStr={formData.address.city}
                    setAmountStr={(value) => handleAddressChange("city", value)}
                />

                <CardSignupInputSection
                    label="Postcode"
                    amountStr={formData.address.postalCode}
                    setAmountStr={(value) => handleAddressChange("postalCode", value)}
                />

                <CardSignupInputSection
                    label="State"
                    amountStr={formData.address.region}
                    setAmountStr={(value) => handleAddressChange("region", value)}
                />

                <CardSignupInputSection
                    label="Country"
                    amountStr={formData.address.country}
                    setAmountStr={(value) => handleAddressChange("country", value)}
                />

                <CardSignupInputSection
                    label="Occupation"
                    amountStr={formData.occupation}
                    setAmountStr={(value) => handleFormDataChange("occupation", value)}
                />

                <CardSignupInputSection
                    label="Annual Income"
                    amountStr={formData.annualSalary}
                    setAmountStr={(value) => handleFormDataChange("annualSalary", value)}
                />

                <CardSignupInputSection
                    label="Account purpose"
                    amountStr={formData.accountPurpose}
                    setAmountStr={(value) => handleFormDataChange("accountPurpose", value)}
                />

                <CardSignupInputSection
                    label="Expected monthly spend"
                    amountStr={formData.expectedMonthlyVolume}
                    setAmountStr={(value) => handleFormDataChange("expectedMonthlyVolume", value)}
                />

                <CardSignupInputSection
                    label="National ID number"
                    amountStr={formData.nationalId}
                    setAmountStr={(value) => handleFormDataChange("nationalId", value)}
                />

                <CardSignupInputSection
                    label="Country Code for Country of Issue (eg: US, IE)"
                    amountStr={formData.countryOfIssue}
                    setAmountStr={(value) => {
                        handleAddressChange("countryCode", value);
                        handleFormDataChange("countryOfIssue", value);
                    }}
                />

                <div style={{display: "flex", flexDirection: "column", marginBottom: "8px", alignItems: "flex-start"}}>
                    <label>Do you accept the Quartz Card <a href="#" target="_blank" rel="noopener noreferrer">terms of service</a>?</label>
                    <input 
                        type="checkbox" 
                        checked={formData.isTermsOfServiceAccepted}
                        onChange={(e) => handleFormDataChange("isTermsOfServiceAccepted", e.target.checked)}
                    />
                </div>
            </div>

            <div className={styles.fixedButtons}>
                <Buttons
                    label="Submit Application"
                    awaitingSign={loading}
                    onConfirm={handleSubmit}
                    onCancel={() => setModalVariation(ModalVariation.DISABLED)}
                />
            </div>
        </div>
    );
}