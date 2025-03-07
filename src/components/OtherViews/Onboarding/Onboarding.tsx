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
import config from "@/src/config/config";
import { fetchAndParse } from "@/src/utils/helpers";
import { useLoginCardUser, useOpenKycLink, useRefetchCardUser } from "@/src/utils/hooks";
import { useStore } from "@/src/utils/store";
import { getPhoneCode } from "@/src/utils/countries";
import { ModalVariation } from "@/src/types/enums/ModalVariation.enum";
import { TermsNeeded } from "@/src/types/enums/TermsNeeded.enum";

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

export default function Onboarding() {
    const wallet = useAnchorWallet();
    const { showError } = useError();
    const openKycLink = useOpenKycLink();
    const refetchCardUser = useRefetchCardUser();
    const { 
        isInitialized, 
        cardUser,
        setModalVariation,
        setIsSigningLoginMessage
    } = useStore();
    

    let startingPage: OnboardingPage;
    if (!isInitialized) {
        // If not initialized, go to PDA account creation
        startingPage = OnboardingPage.ACCOUNT_CREATION;
    } 
    else if (cardUser === null) {
        // If PDA created but no KYC, go to personal info
        startingPage = OnboardingPage.PERSONAL_INFO;
    } 
    else if (
        cardUser?.account_status === "card" 
        ||cardUser?.account_status === "kyc_approved"
    ) {
        // If KYC complete, go to account permissions
        startingPage = OnboardingPage.ACCOUNT_PERMISSIONS;
    } else {
        // If KYC pending or denied, go to ID photo
        startingPage = OnboardingPage.ID_PHOTO;
    }

    const [page, setPage] = useState<OnboardingPage>(startingPage);
    const incrementPage = () => setPage(page + 1);
    const decrementPage = () => setPage(page - 1);

    useEffect(() => {
        setPage(startingPage);
    }, [startingPage]);


    const [formData, setFormData] = useState<KYCData>(DEFAULT_KYC_DATA);
    const [terms, setTerms] = useState<Terms>(DEFAULT_TERMS);


    // Redirect to account permissions if KYC is approved
    useEffect(() => {
        if (cardUser?.account_status === "kyc_approved") {
            setPage(OnboardingPage.ACCOUNT_PERMISSIONS);
        }
    }, [cardUser?.account_status]);

    
    useEffect(() => {
        refetchCardUser();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    

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

    const [hasInitialized, setHasInitialized] = useState(false);
    useEffect(() => {
        if (!isInitialized || hasInitialized) return;

        if (!formData.isTermsOfServiceAccepted) {
            handleTermsChange("isTermsOfServiceAccepted", true);
        }
        if (!terms.privacyPolicy) {
            handleTermsChange("privacyPolicy", true);
        }
        if (!formData.isTermsOfServiceAccepted) {
            handleFormDataChange("isTermsOfServiceAccepted", true);
        }

        setHasInitialized(true);
    }, [ 
        isInitialized, 
        hasInitialized, 
        formData.isTermsOfServiceAccepted,
        terms.privacyPolicy,
        terms.isTermsOfServiceAccepted
    ]);

    const handleOpenKycLink = async () => {
        if (!wallet?.publicKey) {
            captureError(showError, "Wallet not connected", "/Onboarding.tsx", "Wallet not connected", null);
            return;
        }

        refetchCardUser();

        if (cardUser?.account_status === "kyc_approved") {
            setPage(OnboardingPage.ACCOUNT_PERMISSIONS);
            return;
        }

        if (cardUser) {
            openKycLink(cardUser.application_completion_link);
            return;
        }
    }

    const [awaitingSubmit, setAwaitingSubmit] = useState(false);
    const handleSubmit = async () => {
        if (!wallet?.publicKey) {
            captureError(showError, "Wallet not connected", "/Onboarding.tsx", "Wallet not connected", null);
            return;
        }

        setAwaitingSubmit(true);

        if (
            cardUser?.account_status === "kyc_approved"
            || cardUser?.account_status === "card"
        ) {
            setPage(OnboardingPage.ACCOUNT_PERMISSIONS);
            return;
        }

        try {
            const formattedData = {
                ...formData,
                phoneCountryCode: getPhoneCode(formData.phoneCountryCode),
            }

            const submitData = {
                ...formattedData,
                publicKey: wallet.publicKey.toBase58(),
                ...terms
            }

            await fetchAndParse(
                `${config.NEXT_PUBLIC_CARD_API_URL}/user`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(submitData),
                }
            );

            refetchCardUser();
            setPage(OnboardingPage.ID_PHOTO);
        } catch (error) {
            captureError(showError, "Failed to submit form", "/CardSignupModal.tsx", error, wallet.publicKey);
        } finally {
            setAwaitingSubmit(false);
        }
    }

    const loginCardUser = useLoginCardUser();
    const handleSetSpendLimit = async () => {
        if (!wallet?.publicKey) {
            captureError(showError, "Wallet not connected", "/Onboarding.tsx", "Wallet not connected", null);
            return;
        }

        await fetchAndParse(
            `${config.NEXT_PUBLIC_CARD_API_URL}/user/onboarding`,
            {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    publicKey: wallet.publicKey.toBase58(),
                }),
            }
        );

        setIsSigningLoginMessage(true);
        loginCardUser.mutate(TermsNeeded.ACCEPTED);
        setModalVariation(ModalVariation.DISABLED);
        refetchCardUser();
    }

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
                                submitCardData={handleSubmit}
                                awaitingSubmit={awaitingSubmit}
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
                                rejectedReason={cardUser?.application_denied_reason ?? ""}
                                handleSubmit={handleOpenKycLink}
                            />;

                        case OnboardingPage.ACCOUNT_PERMISSIONS:
                            return <AccountPermissions 
                                onSetSpendLimit={handleSetSpendLimit}
                            />;
                    }
                })()}
            </div>
        </div>
    );
}
