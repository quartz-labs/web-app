import { useState } from "react";
import styles from "./Onboarding.module.css";
import type { OnboardingPageProps } from "./Onboarding";
import { formatPhoneCode, getCountries, getCountryCodes } from "@/src/utils/countries";
import { getCode } from "@/src/utils/countries";

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

        incrementPage();
    }

    return (
        <div className={styles.contentWrapper}>
            <h1 className={styles.title}>Personal Info</h1>

            <div className={styles.formWrapper}>
                <div className={styles.inputSection}>
                    <p className={styles.inputLabel}>What&apos;s your full legal name? This must exactly match your ID.</p>
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
                    <p className={styles.inputLabel}>What&apos;s your phone number?</p>
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
                    <div className={styles.inputContainer}>
                        <p className={styles.inputLabel}>What&apos;s your email?</p>
                        <p className={styles.inputLabel}>What&apos;s your date of birth?</p>
                    </div>
                    <div className={styles.inputContainer}>
                        <input 
                            type="text" 
                            className={`${styles.inputField} ${missingValues.email ? styles.missing : ""}`} 
                            placeholder="name@example.com"
                            value={formData.email}
                            onChange={(e) => handleFormDataChange("email", e.target.value)}
                        />
                        <input
                            className={`${styles.inputField} ${(missingValues.birthDate && !formData.birthDate) ? styles.missing : ""}`}
                            type="date"
                            value={formData.birthDate}
                            onChange={(e) => handleFormDataChange("birthDate", e.target.value)}
                            max={new Date().toISOString().split('T')[0]} // Prevents future dates
                        />
                    </div>
                </div>

                <div className={styles.inputSection}>
                    <p className={styles.inputLabel}>What&apos;s your address?</p>
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
                            placeholder="Apt./Suite"
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
            </div>
        </div>
    );
}