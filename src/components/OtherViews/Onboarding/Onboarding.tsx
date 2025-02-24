import { useState } from "react";
import Progress from "./Progress.onboarding";
import AccountCreation from "./AccountCreation.onboarding";
import PersonalInfo from "./PersonalInfo.onboarding";
import RegulatoryInfo from "./RegulatoryInfo.onboarding";
import IdPhoto from "./IdPhoto.onboarding";
import AccountPermissions from "./AccountPermissions.onboarding";
import { DEFAULT_KYC_DATA, DEFAULT_TERMS, type KYCData, type Terms } from "@/src/types/interfaces/KYCData.interface";
import type { Address } from "@/src/types/interfaces/Address.interface";
import styles from "./Onboarding.module.css";

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
    const [page, setPage] = useState(OnboardingPage.REGULATORY_INFO);
    const incrementPage = () => setPage(page + 1);
    const decrementPage = () => setPage(page - 1);

    const [formData, setFormData] = useState<KYCData>(DEFAULT_KYC_DATA);
    const [terms, setTerms] = useState<Terms>(DEFAULT_TERMS);

    // If account initialized, set t&c and privacy policy terms to true

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
                            />;
                    }
                })()}
            </div>
        </div>
    );
}
