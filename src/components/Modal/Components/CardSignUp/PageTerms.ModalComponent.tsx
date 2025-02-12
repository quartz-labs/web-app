import styles from "./CardSignup.ModalComponent.module.css";
import type { Terms, KYCData } from "@/src/types/interfaces/KYCData.interface";

interface PageTermsProps {
    terms: Terms;
    formData: KYCData;
    handleTermsChange: <K extends keyof Terms>(field: K, value: Terms[K]) => void;
    handleFormDataChange: <K extends keyof KYCData>(field: K, value: KYCData[K]) => void;
}

export default function PageTerms({
    terms,
    formData,
    handleTermsChange,
    handleFormDataChange
}: PageTermsProps) {
    const ESIGN_CONTRACT_URL = "#";
    const TERMS_OF_SERVICE = "#";
    const PRIVACY_POLICY = "https://docs.quartzpay.io/card-privacy-policy";
    const ACCOUNT_OPENING_DISCLOSURE = "https://docs.quartzpay.io/glba";

    return (
        <div className={styles.signupPage}>
            <h3 className={styles.subheading}>Terms and Conditions</h3>

            <ul className={styles.checkboxes}>
                <li>
                    <label>
                        <input 
                            type="checkbox" 
                            checked={terms.acceptEsignConsent}
                            onChange={(e) => handleTermsChange("acceptEsignConsent", e.target.checked)}
                        />
                        <span className={styles.checkboxText}>
                            I accept the <a href={ESIGN_CONTRACT_URL} target="_blank" rel="noopener noreferrer">E-Sign Consent</a>
                        </span>
                    </label>
                </li>

                <li>
                    <label>
                        <input 
                            type="checkbox" 
                            checked={formData.isTermsOfServiceAccepted}
                            onChange={(e) => {
                                handleFormDataChange("isTermsOfServiceAccepted", e.target.checked)
                                handleTermsChange("acceptQuartzCardTerms", e.target.checked)
                            }}
                        />
                        <span className={styles.checkboxText}>
                            I accept the Quartz Card <a href={TERMS_OF_SERVICE} target="_blank" rel="noopener noreferrer">Terms of Service</a>
                        </span>
                    </label>
                </li>

                <li>
                    <label>
                        <input 
                            type="checkbox" 
                            checked={terms.privacyPolicy}
                            onChange={(e) => handleTermsChange("privacyPolicy", e.target.checked)}
                        />
                        <span className={styles.checkboxText}>
                            I accept the <a href={PRIVACY_POLICY} target="_blank" rel="noopener noreferrer">Privacy Policy</a>
                        </span>
                    </label>
                </li>

                {(formData.countryOfIssue === "US") && (
                    <li>
                        <label>
                            <input 
                                type="checkbox" 
                                checked={terms.openingDisclosure}
                                onChange={(e) => handleTermsChange("openingDisclosure", e.target.checked)}
                            />
                            <span className={styles.checkboxText}>
                                I accept the <a href={ACCOUNT_OPENING_DISCLOSURE} target="_blank" rel="noopener noreferrer">Account Opening Disclosure</a>
                            </span>
                        </label>
                    </li>
                )}

                <li>
                    <label>
                        <input 
                            type="checkbox" 
                            checked={terms.informationIsAccurate}
                            onChange={(e) => handleTermsChange("informationIsAccurate", e.target.checked)}
                        />
                        <span className={styles.checkboxText}>
                            I certify that the information I have provided is accurate and that I will abide by all the rules and requirements that related to my Quartz Spend Card.
                        </span>
                    </label>
                </li>

                <li>
                    <label>
                        <input 
                            type="checkbox" 
                            checked={terms.applyingForCardNotSolicitation}
                            onChange={(e) => handleTermsChange("applyingForCardNotSolicitation", e.target.checked)}
                        />
                        <span className={styles.checkboxText}>
                            I acknowledge that applying for the Quartz Spend Card does not constitute an unauthorized solicitation of any kind.
                        </span>
                    </label>
                </li>
            </ul>
        </div>
    );
}