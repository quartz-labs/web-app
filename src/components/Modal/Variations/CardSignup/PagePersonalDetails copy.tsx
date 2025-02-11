import type { KYCData } from "@/src/types/interfaces/KYCData.interface";
import CardSignupInputSection from "../../Components/CardSignUp/CardAccountCreate.ModalComponent";
import pageStyles from "./CardSignup.module.css";
import modalStyles from "../../Modal.module.css";
import { getCountries, getCountry } from "@/src/utils/countries";
import { getCode } from "@/src/utils/countries";

interface SignupPage1Props {
    formData: KYCData;
    handleFormDataChange: <K extends keyof KYCData>(field: K, value: KYCData[K]) => void;
}

export default function PageCompliance({
    formData,
    handleFormDataChange
}: SignupPage1Props) {
    return (
        <div className={pageStyles.signupPage}>

            <div style={{ display: "flex", flexDirection: "column", marginBottom: "8px" }}>
                <label style={{ marginRight: "10px" }}>Birth Date:</label>
                <input
                    className={modalStyles.dobInput}
                    type="date"
                    value={formData.birthDate}
                    onChange={(e) => handleFormDataChange("birthDate", e.target.value)}
                    max={new Date().toISOString().split('T')[0]} // Prevents future dates
                />
            </div>

            <CardSignupInputSection
                label="Occupation"
                amountStr={formData.occupation}
                setAmountStr={(value) => handleFormDataChange("occupation", value)}
            />

            <CardSignupInputSection
                label="Annual Income"
                amountStr={formData.annualSalary}
                setAmountStr={(value) => handleFormDataChange("annualSalary", value)}
            />

            <CardSignupInputSection
                label="Account Purpose"
                amountStr={formData.accountPurpose}
                setAmountStr={(value) => handleFormDataChange("accountPurpose", value)}
            />

            <CardSignupInputSection
                label="Expected Monthly Spend"
                amountStr={formData.expectedMonthlyVolume}
                setAmountStr={(value) => handleFormDataChange("expectedMonthlyVolume", value)}
            />

            <CardSignupInputSection
                label="National ID Number"
                amountStr={formData.nationalId}
                setAmountStr={(value) => handleFormDataChange("nationalId", value)}
            />

            <div className={pageStyles.inputGroup}>
                <label>National ID Country of Issue</label>
                <select
                    className={pageStyles.select}
                    value={getCountry(formData.countryOfIssue) ?? ""}
                    onChange={(e) => {
                        const countryCode = getCode(e.target.value);
                        if (!countryCode) throw new Error("Invalid country");
                        handleFormDataChange("countryOfIssue", countryCode)
                    }}
                >
                    <option value="">Select a country</option>
                    {getCountries().map((country) => (
                        <option key={country} value={country}>
                            {country}
                        </option>
                    ))}
                </select>
            </div>
        </div>
    );
}