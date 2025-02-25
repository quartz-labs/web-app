import { useEffect, useState } from "react";
import Progress from "./Progress.onboarding";
import AccountCreation from "./AccountCreation.onboarding";
import PersonalInfo from "./PersonalInfo.onboarding";
import RegulatoryInfo from "./RegulatoryInfo.onboarding";
import IdPhoto from "./IdPhoto.onboarding";
import AccountPermissions from "./AccountPermissions.onboarding";
import { DEFAULT_KYC_DATA, DEFAULT_TERMS, type KYCData, type Terms } from "@/src/types/interfaces/KYCData.interface";
import type { Address } from "@/src/types/interfaces/Address.interface";
import styles from "./Onboarding.module.css";
import { useAnchorWallet } from "@solana/wallet-adapter-react";
import { captureError } from "@/src/utils/errors";
import { useError } from "@/src/context/error-provider";
import type { ApplicationCompletionLink } from "@/src/types/ApplicationCompleteLink.type";
import config from "@/src/config/config";
import type { QuartzCardUser } from "@/src/types/interfaces/QuartzCardUser.interface";
import { fetchAndParse } from "@/src/utils/helpers";
import { useOpenKycLink, useRefetchCardUser } from "@/src/utils/hooks";
import { useStore } from "@/src/utils/store";
import { AuthLevel } from "@/src/types/enums/AuthLevel.enum";

export enum OnboardingPage {
    ACCOUNT_CREATION = 0,
    PERSONAL_INFO = 1,
    REGULATORY_INFO = 2,
    ID_PHOTO = 3,
    ACCOUNT_PERMISSIONS = 4
}

export interface OnboardingPageProps {
    incrementPage: () => void;
    decrementPage: () => void;
    handleFormDataChange: <K extends keyof KYCData>(field: K, value: KYCData[K]) => void;
    handleAddressChange: <K extends keyof Address>(field: K, value: Address[K]) => void;
    handleTermsChange: <K extends keyof Terms>(field: K, value: Terms[K]) => void;
    formData: KYCData;
    terms: Terms;
}

export interface OnboardingProps {
    onCompleteOnboarding: () => void;
}

export default function Onboarding({ onCompleteOnboarding }: OnboardingProps) {
    const wallet = useAnchorWallet();
    const { showError } = useError();
    const openKycLink = useOpenKycLink();
    const refetchCardUser = useRefetchCardUser();
    const { 
        isInitialized, 
        quartzCardUser, 
        providerCardUser, 
        cardDetails 
    } = useStore();
    
    const [page, setPage] = useState(OnboardingPage.ACCOUNT_CREATION);
    const incrementPage = () => setPage(page + 1);
    const decrementPage = () => setPage(page - 1);

    const [formData, setFormData] = useState<KYCData>(DEFAULT_KYC_DATA);
    const [terms, setTerms] = useState<Terms>(DEFAULT_TERMS);

    const [kycLink, setKycLink] = useState<string | undefined>(undefined);
    const [awaitingApproval, setAwaitingApproval] = useState(false);
    const [rejectedReason, setRejectedReason] = useState<string | undefined>(undefined);

    useEffect(() => {
        if (isInitialized) {
            setTerms(prev => ({
                ...prev,
                acceptQuartzCardTerms: true,
                privacyPolicy: true
            }));
            setPage(OnboardingPage.PERSONAL_INFO);
        }
    }, [isInitialized]);

    useEffect(() => {
        if (quartzCardUser?.auth_level === AuthLevel.BASE) {
            setKycLink(providerCardUser?.applicationCompletionLink ? (
                `${providerCardUser.applicationCompletionLink.url}?userId=${providerCardUser.applicationCompletionLink.params.userId}`
            ) : undefined);
            setPage(OnboardingPage.ID_PHOTO);
        } else if (quartzCardUser?.auth_level === AuthLevel.CARD) {
            if (!cardDetails) {
                // Fix this error
                captureError(showError, "Could not create card", "/Onboarding.tsx", "Could not create card", wallet?.publicKey ?? null, true);
            }

            setPage(OnboardingPage.ACCOUNT_PERMISSIONS);
            setAwaitingApproval(false);
            setRejectedReason(undefined);
        }
    }, [quartzCardUser?.auth_level, providerCardUser, cardDetails, showError, wallet?.publicKey]);

    const handleSubmit = async () => {
        if (!wallet?.publicKey) {
            captureError(showError, "Wallet not connected", "/Onboarding.tsx", "Wallet not connected", null);
            return;
        }

        setAwaitingApproval(true);
        setRejectedReason(undefined);

        if (kycLink) {
            openKycLink(kycLink);
            refetchCardUser();
            return;
        }

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
            setAwaitingApproval(false);
        }
    }

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

    return (
        <div className={styles.onboardingContainer}>
            <Progress page={page} />

            <div className={"glass panel"}>
                {(() => {
                    switch (page) {
                        case OnboardingPage.ACCOUNT_CREATION:
                            return <AccountCreation 
                                incrementPage={incrementPage}
                                decrementPage={decrementPage}
                                handleFormDataChange={handleFormDataChange}
                                handleAddressChange={handleAddressChange}
                                handleTermsChange={handleTermsChange}
                                formData={formData}
                                terms={terms}
                            />;

                        case OnboardingPage.PERSONAL_INFO:
                            return <PersonalInfo 
                                incrementPage={incrementPage}
                                decrementPage={decrementPage}
                                handleFormDataChange={handleFormDataChange}
                                handleAddressChange={handleAddressChange}
                                handleTermsChange={handleTermsChange}   
                                formData={formData}
                                terms={terms}
                            />;

                        case OnboardingPage.REGULATORY_INFO:
                            return <RegulatoryInfo 
                                incrementPage={incrementPage}
                                decrementPage={decrementPage}
                                handleFormDataChange={handleFormDataChange}
                                handleAddressChange={handleAddressChange}
                                handleTermsChange={handleTermsChange}
                                formData={formData}
                                terms={terms}
                            />;

                        case OnboardingPage.ID_PHOTO:
                            return <IdPhoto 
                                incrementPage={incrementPage}
                                decrementPage={decrementPage}
                                handleFormDataChange={handleFormDataChange}
                                handleAddressChange={handleAddressChange}
                                handleTermsChange={handleTermsChange}
                                formData={formData}
                                terms={terms}   
                                awaitingApproval={awaitingApproval}
                                rejectedReason={rejectedReason}
                                handleSubmit={handleSubmit}
                            />;

                        case OnboardingPage.ACCOUNT_PERMISSIONS:
                            return <AccountPermissions 
                                incrementPage={incrementPage}
                                decrementPage={decrementPage}
                                handleFormDataChange={handleFormDataChange}
                                handleAddressChange={handleAddressChange}
                                handleTermsChange={handleTermsChange}
                                formData={formData}
                                terms={terms}
                                onCompleteOnboarding={onCompleteOnboarding}
                            />;
                    }
                })()}
            </div>
        </div>
    );
}
