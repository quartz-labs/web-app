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
import { useLoginCardUser, useOpenKycLink, useRefetchCardUser } from "@/src/utils/hooks";
import { useStore } from "@/src/utils/store";
import { QuartzCardAccountStatus, TandCsNeeded } from "@/src/types/enums/QuartzCardAccountStatus.enum";
import { getPhoneCode } from "@/src/utils/countries";
import { useApplicationStatusQuery } from "@/src/utils/queries/internalApi.queries";
import { ModalVariation } from "@/src/types/enums/ModalVariation.enum";

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
        quartzCardUser,
        providerCardUser,
        setModalVariation,
        setIsSigningLoginMessage
    } = useStore();
    

    let startingPage: OnboardingPage;
    if (!isInitialized) {
        // If not initialized, go to PDA account creation
        startingPage = OnboardingPage.ACCOUNT_CREATION;
    } 
    else if (quartzCardUser === null) {
        // If PDA created but no KYC, go to personal info
        startingPage = OnboardingPage.PERSONAL_INFO;
    } 
    else if (
        quartzCardUser?.account_status === QuartzCardAccountStatus.KYC_PENDING
        || quartzCardUser?.account_status === QuartzCardAccountStatus.KYC_REJECTED
    ) {
        // If KYC pending or rejected, go to ID photo
        startingPage = OnboardingPage.ID_PHOTO;
    } else {
        // If KYC complete, go to account permissions
        startingPage = OnboardingPage.ACCOUNT_PERMISSIONS;
    }

    const [page, setPage] = useState<OnboardingPage>(startingPage);
    const incrementPage = () => setPage(page + 1);
    const decrementPage = () => setPage(page - 1);

    useEffect(() => {
        setPage(startingPage);
    }, [startingPage]);


    const [formData, setFormData] = useState<KYCData>(DEFAULT_KYC_DATA);
    const [terms, setTerms] = useState<Terms>(DEFAULT_TERMS);


    const {data: applicationStatus} = useApplicationStatusQuery(
        quartzCardUser?.card_api_user_id ?? null,
        quartzCardUser?.account_status === QuartzCardAccountStatus.KYC_PENDING
    );
    useEffect(() => {
        if (applicationStatus?.applicationStatus === "approved") {
            refetchCardUser();
        }
    }, [applicationStatus?.applicationStatus, refetchCardUser]);
    

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
            handleTermsChange("acceptQuartzCardTerms", true);
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
        terms.acceptQuartzCardTerms
    ]);

    const [pendingKyc, setPendingKyc] = useState(providerCardUser?.applicationStatus === "pending");
    const handleSubmit = async () => {
        if (!wallet?.publicKey) {
            captureError(showError, "Wallet not connected", "/Onboarding.tsx", "Wallet not connected", null);
            return;
        }

        if (providerCardUser) {
            openKycLink(`${providerCardUser.applicationCompletionLink.url}?userId=${providerCardUser.applicationCompletionLink.params.userId}`);
            refetchCardUser();
            return;
        }

        setPendingKyc(true);

        try {
            const formattedData = {
                ...formData,
                phoneCountryCode: getPhoneCode(formData.phoneCountryCode),
            }

            const submitData = {
                ...formattedData,
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
            setPendingKyc(false);
        }
    }

    const loginCardUser = useLoginCardUser();
    const handleSetSpendLimit = async () => {
        await fetchAndParse(
            `${config.NEXT_PUBLIC_INTERNAL_API_URL}/card/application/set-limits`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    id: quartzCardUser?.card_api_user_id,
                }),
            }
        );
        setIsSigningLoginMessage(true);
        loginCardUser.mutate(TandCsNeeded.ACCEPTED);
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
                                awaitingApproval={pendingKyc}
                                rejectedReason={applicationStatus?.applicationReason ?? ""}
                                handleSubmit={handleSubmit}
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
