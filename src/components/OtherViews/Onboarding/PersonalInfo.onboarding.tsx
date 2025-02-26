import { useState } from "react";
import styles from "./Onboarding.module.css";
import type { OnboardingPageProps } from "./Onboarding";
import { formatPhoneCode, getCountries, getCountryCodes } from "@/src/utils/countries";
import { getCode } from "@/src/utils/countries";
import { UNSUPPORTED_STATES } from "@/src/config/constants";

export default function PersonalInfo({
    formData,
    handleFormDataChange,
    handleAddressChange,
    incrementPage,
}: OnboardingPageProps) {
    const [missingValues, setMissingValues] = useState({
        firstName: false,
        lastName: false,
        email: false,
        birthDate: false,
        line1: false,
        city: false,
        region: false,
        postalCode: false,
        phoneNumber: false,
    });
    const [isMissingValue, setIsMissingValue] = useState(false);
    const [isUnsupportedState, setIsUnsupportedState] = useState(false);
    const [isUnderAge, setIsUnderAge] = useState(false);

    const handleSubmit = () => {
        const missingValuesData = {
            firstName: !formData.firstName,
            lastName: !formData.lastName,
            email: !formData.email,
            birthDate: !formData.birthDate,
            line1: !formData.address.line1,
            city: !formData.address.city,
            region: !formData.address.region,
            postalCode: !formData.address.postalCode,
            phoneNumber: !formData.phoneNumber,
        };
        setMissingValues(missingValuesData);
        for (const [, value] of Object.entries(missingValuesData)) {
            if (value) return setIsMissingValue(true);
        }

        if (UNSUPPORTED_STATES.includes(formData.address.region.toUpperCase())) {
            return setIsUnsupportedState(true);
        }
        setIsUnsupportedState(false);

        // Ensure over 18
        const today = new Date();
        const birthDate = new Date(formData.birthDate);
        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();
        
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
            age--; // If birthday hasn't occurred yet this year, subtract one from age
        }

        if (age < 18) {
            return setIsUnderAge(true);
        }

        incrementPage();
    }

    return (
        <div className={styles.contentWrapper}>
            <h1 className={styles.title}>Personal Info</h1>

            <div className={styles.formWrapper}>
                <div className={styles.inputSection}>
                    <p className={styles.inputLabel}>What&apos;s your full legal name? This must exactly match your ID.<sup>*</sup></p>
                    <div className={styles.inputContainer}>
                        <input 
                            type="text" 
                            className={`${styles.inputField} ${missingValues.firstName ? styles.missing : ""}`} 
                            placeholder="First Name"
                            value={formData.firstName}
                            onChange={(e) => handleFormDataChange("firstName", e.target.value)}
                        />
                        <input 
                            type="text" 
                            className={`${styles.inputField} ${missingValues.lastName ? styles.missing : ""}`} 
                            placeholder="Last Name"
                            value={formData.lastName}
                            onChange={(e) => handleFormDataChange("lastName", e.target.value)}
                        />
                    </div>
                </div>

                <div className={styles.inputSection}>
                    <p className={styles.inputLabel}>What&apos;s your phone number?<sup>*</sup></p>
                    <div className={styles.inputContainer}>
                        <select
                            className={`${styles.inputField} ${styles.inputSelect}`}
                            value={formatPhoneCode(formData.phoneCountryCode)}
                            onChange={(e) => {
                                const country = e.target.value.split(" (")[1]?.split(")")[0];
                                const countryCode = getCode(country ?? "");
                                if (!countryCode) throw new Error("Invalid country");

                                handleFormDataChange("phoneCountryCode", countryCode);
                            }}
                        >
                            {getCountryCodes().map((code) => (
                                <option key={code} value={formatPhoneCode(code)}>
                                    {formatPhoneCode(code)}
                                </option>
                            ))}
                        </select>
                        <input 
                            type="text" 
                            className={`${styles.inputField} ${missingValues.phoneNumber ? styles.missing : ""}`} 
                            placeholder="000 000 0000"
                            value={formData.phoneNumber}
                            onChange={(e) => {
                                const value = e.target.value.replace(/\D/g, '');
                                handleFormDataChange("phoneNumber", value);
                            }}
                        />
                    </div>
                </div>

                <div className={styles.inputSection}>
                    <div className={`${styles.inputContainer} ${styles.splitContent}`}>
                        <div>
                            <p className={styles.inputLabel}>What&apos;s your email?<sup>*</sup></p>
                            <input 
                                type="text" 
                                className={`${styles.inputField} ${missingValues.email ? styles.missing : ""}`} 
                                placeholder="name@example.com"
                                value={formData.email}
                                onChange={(e) => handleFormDataChange("email", e.target.value)}
                            />
                        </div>
                        <div>
                            <p className={styles.inputLabel}>What&apos;s your date of birth?<sup>*</sup></p>
                            <input
                                className={`${styles.inputField} ${(missingValues.birthDate && !formData.birthDate) ? styles.missing : ""}`}
                                type="date"
                                value={formData.birthDate}
                                onChange={(e) => handleFormDataChange("birthDate", e.target.value)}
                                max={new Date().toISOString().split('T')[0]} // Prevents future dates
                            />
                        </div>
                    </div>
                </div>

                <div className={styles.inputSection}>
                    <p className={styles.inputLabel}>What&apos;s your address?<sup>*</sup></p>
                    <div className={styles.inputContainer}>
                        <input 
                            type="text" 
                            className={`${styles.inputField} ${missingValues.line1 ? styles.missing : ""}`} 
                            placeholder="Street"
                            value={formData.address.line1}
                            onChange={(e) => handleAddressChange("line1", e.target.value)}
                        />
                        <input 
                            type="text" 
                            className={`${styles.inputField}`} 
                            placeholder="Apt./Suite (optional)"
                            value={formData.address.line2}
                            onChange={(e) => handleAddressChange("line2", e.target.value)}
                        />
                    </div>
                    <div className={styles.inputContainer}>
                        <input 
                            type="text" 
                            className={`${styles.inputField} ${missingValues.city ? styles.missing : ""}`} 
                            placeholder="City"
                            value={formData.address.city}
                            onChange={(e) => handleAddressChange("city", e.target.value)}
                        />
                        <input 
                            type="text" 
                            className={`${styles.inputField} ${missingValues.region ? styles.missing : ""}`} 
                            placeholder="State/Province/Region"
                            value={formData.address.region}
                            onChange={(e) => handleAddressChange("region", e.target.value)}
                        />
                    </div>
                    <div className={styles.inputContainer}>
                        <select
                            className={`${styles.inputField} ${styles.inputSelect}`}
                            value={formData.address.country}
                            onChange={(e) => {
                                const countryCode = getCode(e.target.value);
                                if (!countryCode) throw new Error("Invalid country");

                                handleAddressChange("countryCode", countryCode);
                                handleAddressChange("country", e.target.value);
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
                            className={`${styles.inputField} ${missingValues.postalCode ? styles.missing : ""}`} 
                            placeholder="Post Code"
                            value={formData.address.postalCode}
                            onChange={(e) => handleAddressChange("postalCode", e.target.value)}
                        />
                    </div>
                </div>
            </div>

            <div className={styles.buttonContainer}>
                {/* TODO: Add ability to skip KYC and complete later */}
                {/* <button 
                    className={`glass-button ghost ${styles.mainButton}`}
                    onClick={handleCompleteLater}
                >
                    Complete Later
                </button> */} 

                <button 
                    className={`glass-button ${styles.mainButton}`}
                    onClick={handleSubmit}
                >
                    Next
                </button>

                {isMissingValue && 
                    <p className={`error-text`}>Required fields are missing.</p>
                }
                {!isMissingValue && isUnsupportedState && 
                    <p className={`error-text`}>We can&apos;t support users from your state yet.</p>
                }
                {!isMissingValue && !isUnsupportedState && isUnderAge && 
                    <p className={`error-text`}>You must be at least 18 years old to apply for a card.</p>
                }
            </div>
        </div>
    );
}