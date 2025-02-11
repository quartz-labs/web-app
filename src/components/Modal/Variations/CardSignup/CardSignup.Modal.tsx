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
import { DEFAULT_KYC_DATA, DEFAULT_TANDCS, type KYCData, type TandCs } from "@/src/types/interfaces/KYCData.interface";
import type { ApplicationCompletionLink } from "@/src/types/ApplicationCompleteLink.type";
import { getCode, getCountry, getCountries } from "@/src/utils/countries";
import PagePersonalDetails from "./PagePersonalDetails";

export default function CardSignupModal() {
    const wallet = useAnchorWallet();
    const { setModalVariation } = useStore();
    const { showError } = useError();
    const refetchCardUser = useRefetchCardUser();
    const openKycLink = useOpenKycLink();

    const [formData, setFormData] = useState<KYCData>(DEFAULT_KYC_DATA);
    const [loading, setLoading] = useState(false);
    const [tandCs, setTandCs] = useState<TandCs>(DEFAULT_TANDCS);

    const handleFormDataChange = <K extends keyof KYCData>(field: K, value: KYCData[K]) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const handleTandCsChange = <K extends keyof TandCs>(field: K, value: TandCs[K]) => {
        setTandCs(prev => ({
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
                ...tandCs
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
        <div className={styles.contentWrapperSignup}>
            <div className={styles.signupHeader}>
                <h2 className={styles.heading}>Sign up for a Quartz Card</h2>
            </div>

            <PagePersonalDetails
                formData={formData}
                handleFormDataChange={handleFormDataChange}
                handleAddressChange={handleAddressChange}
            />

            <div className={styles.scrollableContent}>
                <div style={{ display: "flex", flexDirection: "column", marginBottom: "8px", alignItems: "flex-start" }}>
                    <label>I accept the <a href="#" target="_blank" rel="noopener noreferrer">E-Sign Consent</a></label>
                    <input
                        type="checkbox"
                        checked={tandCs.acceptEsignConsent}
                        onChange={(e) => handleTandCsChange("acceptEsignConsent", e.target.checked)}
                    />
                </div>

                {formData.address.country === "US" || formData.address.country === "United States" && (
                    <div style={{ display: "flex", flexDirection: "column", marginBottom: "8px", alignItems: "flex-start" }}>
                        <label>I accept the <a href="https://docs.quartzpay.io/glba" target="_blank" rel="noopener noreferrer">Account Opening Disclosure</a></label>
                        <input
                            type="checkbox"
                            checked={tandCs.openingDisclosure}
                            onChange={(e) => handleTandCsChange("openingDisclosure", e.target.checked)}
                        />
                    </div>
                )}

                <div style={{ display: "flex", flexDirection: "column", marginBottom: "8px", alignItems: "flex-start" }}>
                    <label>I accept the Quartz Card <a href="#" target="_blank" rel="noopener noreferrer">terms of service</a></label>
                    <input
                        type="checkbox"
                        checked={formData.isTermsOfServiceAccepted}
                        onChange={(e) => {
                            handleFormDataChange("isTermsOfServiceAccepted", e.target.checked)
                            handleTandCsChange("acceptQuartzCardTerms", e.target.checked)
                        }}
                    />
                </div>
                <div style={{ display: "flex", flexDirection: "column", marginBottom: "8px", alignItems: "flex-start" }}>
                    <label>I accept the <a href="https://docs.quartzpay.io/card-privacy-policy" target="_blank" rel="noopener noreferrer">privacy policy</a>.</label>
                    <input
                        type="checkbox"
                        checked={tandCs.privacyPolicy}
                        onChange={(e) => handleTandCsChange("privacyPolicy", e.target.checked)}
                    />
                </div>

                <div style={{ display: "flex", flexDirection: "column", marginBottom: "8px", alignItems: "flex-start" }}>
                    <label>I certify that the information I have provided is accurate and that I will abide by all the rules and requirements that related to my Quartz Spend Card.</label>
                    <input
                        type="checkbox"
                        checked={tandCs.informationIsAccurate}
                        onChange={(e) => handleTandCsChange("informationIsAccurate", e.target.checked)}
                    />
                </div>

                <div style={{ display: "flex", flexDirection: "column", marginBottom: "8px", alignItems: "flex-start" }}>
                    <label>I acknowledge that applying for the Quartz Spend Card does not constitute an unauthorized solicitation of any kind.</label>
                    <input
                        type="checkbox"
                        checked={tandCs.applyingForCardNotSolicitation}
                        onChange={(e) => handleTandCsChange("applyingForCardNotSolicitation", e.target.checked)}
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