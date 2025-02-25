import styles from "./Onboarding.module.css";
import type { OnboardingPageProps } from "./Onboarding";
import { useEffect, useState } from "react";
import { getCountries, getCountry } from "@/src/utils/countries";
import { getCode } from "@/src/utils/countries";

export default function RegulatoryInfo({
    incrementPage, 
    decrementPage,
    formData,
    terms,
    handleFormDataChange,
    handleTermsChange
}: OnboardingPageProps) {

    const [missingValues, setMissingValues] = useState({
        countryOfIssue: false,
        nationalId: false,
        occupation: false,
        accountPurpose: false,
        annualSalary: false,
        expectedMonthlyVolume: false
    });
    const [isMissingValue, setIsMissingValue] = useState(false);

    const [missingTerms, setMissingTerms] = useState({
        acceptEsignConsent: false,
        openingDisclosure: false,
        informationIsAccurate: false,
        applyingForCardNotSolicitation: false
    });
    const [isMissingTerms, setIsMissingTerms] = useState(false);

    const [isInvalidSSN, setIsInvalidSSN] = useState(false);

    const DEFAULT_PURPOSE = "Daily Spending";
    const DEFAULT_VOLUME = "500";
    const DEFAULT_VOLUME_DISPLAY = "$0-499";
    useEffect(() => {
        handleFormDataChange("accountPurpose", DEFAULT_PURPOSE);
        handleFormDataChange("expectedMonthlyVolume", DEFAULT_VOLUME);
    }, [handleFormDataChange]);

    const handleSubmit = () => {
        const missingValuesData = {
            countryOfIssue: !formData.countryOfIssue,
            nationalId: !formData.nationalId,
            occupation: !formData.occupation,
            accountPurpose: !formData.accountPurpose,
            annualSalary: !formData.annualSalary,
            expectedMonthlyVolume: !formData.expectedMonthlyVolume,
        };
        setMissingValues(missingValuesData);
        for (const [, value] of Object.entries(missingValuesData)) {
            if (value) return setIsMissingValue(true);
        }
        setIsMissingValue(false);

        const missingTermsData = {
            acceptEsignConsent: !terms.acceptEsignConsent,
            openingDisclosure: !terms.openingDisclosure,
            informationIsAccurate: !terms.informationIsAccurate,
            applyingForCardNotSolicitation: !terms.applyingForCardNotSolicitation
        };
        setMissingTerms(missingTermsData);
        for (const [key, value] of Object.entries(missingTermsData)) {
            if (key === "openingDisclosure" && formData.countryOfIssue !== "US") {
                continue;
            }
            if (value) return setIsMissingTerms(true);
        }
        setIsMissingTerms(false);

        if (formData.countryOfIssue !== "US") {
            if (formData.nationalId.length !== 9) {
                return setIsInvalidSSN(true);
            }
            handleTermsChange("openingDisclosure", undefined);
        }

        incrementPage();
    }

    return (
        <div className={styles.contentWrapper}>
            <h1 className={styles.title}>Regulatory Info</h1>

            <div className={`${styles.formWrapper} ${styles.shortMargin}`}>
                <div className={styles.inputSection}>
                    <div className={styles.inputContainer}>
                        <p className={styles.inputLabel}>Where is your ID from?</p>
                        <p className={styles.inputLabel}>What&apos;s your {formData.countryOfIssue === "US" ? "Social Security Number" : "ID number"}?</p>
                    </div>
                    <div className={styles.inputContainer}>
                        <select
                            className={`${styles.inputField} ${styles.inputSelect}`}
                            value={getCountry(formData.countryOfIssue) ?? ""}
                            onChange={(e) => {
                                const countryCode = getCode(e.target.value);
                                if (!countryCode) throw new Error("Invalid country");
                                handleFormDataChange("countryOfIssue", countryCode);
                            }}
                        >
                            {getCountries().map((country) => (
                                <option key={country} value={country}>
                                    {country}
                                </option>
                            ))}
                        </select>
                        <input 
                            type="text" 
                            className={`${styles.inputField} ${missingValues.nationalId ? styles.missing : ""}`} 
                            placeholder="000 00 0000"
                            value={formData.nationalId}
                            onChange={(e) => handleFormDataChange("nationalId", e.target.value)}
                        />
                    </div>
                </div>
                <div className={styles.inputSection}>
                    <div className={styles.inputContainer}>
                        <p className={styles.inputLabel}>What&apos;s your occupation?</p>
                        <p className={styles.inputLabel}>What will you be using Quartz for?</p>
                    </div>
                    <div className={styles.inputContainer}>
                        <input 
                            type="text" 
                            className={`${styles.inputField} ${missingValues.occupation ? styles.missing : ""}`} 
                            placeholder="Occupation"
                            value={formData.occupation}
                            onChange={(e) => handleFormDataChange("occupation", e.target.value)}
                        />
                        <select
                            className={`${styles.inputField} ${styles.inputSelect}`}
                            value={formData.accountPurpose}
                            onChange={(e) => handleFormDataChange("accountPurpose", e.target.value)}
                        >
                            <option value={DEFAULT_PURPOSE}>{DEFAULT_PURPOSE}</option>
                            <option value="Receiving Salary">Receiving Salary</option>
                            <option value="Managing Investments">Managing Investments</option>
                            <option value="Subscriptions">Subscriptions</option>
                            <option value="Large Purchases">Large Purchases</option>
                        </select>
                    </div>
                </div>
                <div className={styles.inputSection}>
                    <div className={styles.inputContainer}>
                        <p className={styles.inputLabel}>What&apos;s your annual income?</p>
                        <p className={styles.inputLabel}>What&apos;s your expected monthly spend on Quartz?</p>
                    </div>
                    <div className={styles.inputContainer}>
                        <input 
                            type="text" 
                            className={`${styles.inputField} ${missingValues.annualSalary ? styles.missing : ""}`} 
                            placeholder="$"
                            value={
                                !formData.annualSalary 
                                    ? ""
                                    : formData.annualSalary.startsWith('$') 
                                        ? formData.annualSalary 
                                        : `$${formData.annualSalary}`
                            }
                            onChange={(e) => handleFormDataChange(
                                "annualSalary", 
                                e.target.value.replace("$", "").replace(/[^0-9.]/g, '').replace(/(\..*?)\..*/g, '$1')
                            )}
                        />
                        <select
                            className={`${styles.inputField} ${styles.inputSelect}`}
                            value={formData.expectedMonthlyVolume}
                            onChange={(e) => handleFormDataChange("expectedMonthlyVolume", e.target.value)}
                        >
                            <option value={DEFAULT_VOLUME}>{DEFAULT_VOLUME_DISPLAY}</option>
                            <option value="1000">$500-999</option>
                            <option value="2000">$1,000-1,999</option>
                            <option value="5000">$2,000-4,999</option>
                            <option value="10000">$5,000-9,999</option>
                            <option value="15000">$10,000+</option>
                        </select>
                    </div>
                </div>
            </div>

            <ul className={styles.checkboxes}>
                <li>
                    <label className={missingTerms.acceptEsignConsent ? styles.missingLabel : ""}>
                        <input 
                            type="checkbox" 
                            checked={terms.acceptEsignConsent} 
                            onChange={() => handleTermsChange("acceptEsignConsent", !terms.acceptEsignConsent)} 
                        />
                        <span className={styles.checkboxText}>
                            I accept the <a href="https://docs.quartzpay.io/e-sign-consent" target="_blank" rel="noopener noreferrer">e-sign consent</a>.
                        </span>
                    </label>
                </li>

                {(formData.countryOfIssue === "US") && (
                    <li>
                        <label className={missingTerms.openingDisclosure ? styles.missingLabel : ""}>
                            <input 
                                type="checkbox" 
                                checked={terms.openingDisclosure} 
                                onChange={() => handleTermsChange("openingDisclosure", !terms.openingDisclosure)} 
                            />
                            <span className={styles.checkboxText}>
                                I accept the <a href="https://docs.quartzpay.io/glba" target="_blank" rel="noopener noreferrer">account opening disclosure</a>.
                            </span>
                        </label>
                    </li>
                )}

                <li>
                    <label className={missingTerms.informationIsAccurate ? styles.missingLabel : ""}>
                        <input 
                            type="checkbox" 
                            checked={terms.informationIsAccurate} 
                            onChange={() => handleTermsChange("informationIsAccurate", !terms.informationIsAccurate)} 
                        />
                        <span className={styles.checkboxText}>
                            I certify that the information I have provided is accurate and that I will abide by all the rules and requirements that related to my Quartz Card.
                        </span>
                    </label>
                </li>

                <li>
                    <label className={missingTerms.applyingForCardNotSolicitation ? styles.missingLabel : ""}>
                        <input 
                            type="checkbox" 
                            checked={terms.applyingForCardNotSolicitation} 
                            onChange={() => handleTermsChange("applyingForCardNotSolicitation", !terms.applyingForCardNotSolicitation)} 
                        />
                        <span className={styles.checkboxText}>
                            I acknowledge that applying for the Quartz Card does not constitute an unauthorized solicitation of any kind.
                        </span>
                    </label>
                </li>
            </ul>

            <div className={styles.buttonContainer}>
                <button 
                    className={`glass-button ghost ${styles.mainButton}`}
                    onClick={decrementPage}
                >
                    Back
                </button>

                <button 
                    className={`glass-button ${styles.mainButton}`}
                    onClick={handleSubmit}
                >
                    Next
                </button>

                {isMissingValue && 
                    <p className={`error-text`}>Required fields are missing.</p>
                }

                {(!isMissingValue && isMissingTerms) &&
                    <p className={`error-text`}>You must agree to all terms.</p>
                }

                {(!isMissingValue && !isMissingTerms && isInvalidSSN) &&
                    <p className={`error-text`}>Social Security Number is invalid.</p>
                }
            </div>
        </div>
    );
}