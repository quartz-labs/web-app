import { useStore } from "@/src/utils/store";
import { useAnchorWallet } from "@solana/wallet-adapter-react";
import { useState } from "react";
import { ModalVariation } from "@/src/types/enums/ModalVariation.enum";
import styles from "../Modal.module.css";
import { useError } from "@/src/context/error-provider";
import { captureError } from "@/src/utils/errors";
import config from "@/src/config/config";
import { fetchAndParse } from "@/src/utils/helpers";
import type { Address } from "@/src/types/interfaces/Address.interface";
import type { QuartzCardUser } from "@/src/types/interfaces/QuartzCardUser.interface";
import { useOpenKycLink, useRefetchCardUser } from "@/src/utils/hooks";
import { DEFAULT_KYC_DATA, DEFAULT_TERMS, type KYCData, type Terms } from "@/src/types/interfaces/KYCData.interface";
import type { ApplicationCompletionLink } from "@/src/types/ApplicationCompleteLink.type";
import PagePersonalDetails from "../Components/CardSignUp/PagePersonalDetails.ModalComponent";
import PageCompliance from "../Components/CardSignUp/PageCompliance.ModalComponent";
import PageTerms from "../Components/CardSignUp/PageTerms.ModalComponent";
import CardSignUpButtons from "../Components/CardSignUp/CardSignUpButtons";

export default function CardSignupModal() {
    const wallet = useAnchorWallet();
    const { setModalVariation } = useStore();
    const { showError } = useError();
    const refetchCardUser = useRefetchCardUser();
    const openKycLink = useOpenKycLink();

    const [formData, setFormData] = useState<KYCData>(DEFAULT_KYC_DATA);
    const [loading, setLoading] = useState(false);
    const [terms, setTerms] = useState<Terms>(DEFAULT_TERMS);

    const PAGE_COUNT = 3;
    const [page, setPage] = useState(0);
    const incrementPage = () => page < PAGE_COUNT - 1 && setPage(prev => prev + 1);
    const decrementPage = () => page > 0 && setPage(prev => prev - 1);

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

    const handleTermsChange = <K extends keyof Terms>(field: K, value: Terms[K]) => {
        setTerms(prev => ({
            ...prev,
            [field]: value
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
                ...terms
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
            <div>
                <div className={styles.signupHeader}>
                    <h2 className={styles.heading}>Sign up for a Quartz Card</h2>
                </div>

                {page === 0 && (
                    <PagePersonalDetails
                        formData={formData}
                        handleFormDataChange={handleFormDataChange}
                        handleAddressChange={handleAddressChange}
                    />
                )}

                {page === 1 && (
                    <PageCompliance
                        formData={formData}
                        handleFormDataChange={handleFormDataChange}
                    />
                )}

                {page === 2 && (
                    <PageTerms
                        terms={terms}
                        formData={formData}
                        handleFormDataChange={handleFormDataChange}
                        handleTermsChange={handleTermsChange}
                    />
                )}
            </div>

            <CardSignUpButtons
                page={page}
                pageCount={PAGE_COUNT}
                incrementPage={incrementPage}
                decrementPage={decrementPage}
                loading={loading}
                onSubmit={handleSubmit}
                onCancel={() => setModalVariation(ModalVariation.DISABLED)}
            />
        </div>
    );
}