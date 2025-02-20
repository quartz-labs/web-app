import type { KYCData } from "@/src/types/interfaces/KYCData.interface";
import CardSignupInputSection from "./CardAccountCreate.ModalComponent";
import componentStyles from "./CardSignup.ModalComponent.module.css";
import modalStyles from "../../Modal.module.css";
import { getCountries, getCountry } from "@/src/utils/countries";
import { getCode } from "@/src/utils/countries";

interface PageComplianceProps {
    formData: KYCData;
    handleFormDataChange: <K extends keyof KYCData>(field: K, value: KYCData[K]) => void;
}

export default function PageCompliance({
    formData,
    handleFormDataChange
}: PageComplianceProps) {
    return (
        <div className={componentStyles.signupPage}>
            <div className={componentStyles.dateSelectWrapper}>
                <label style={{ marginRight: "10px" }}>Birth Date:</label>
                <input
                    className={componentStyles.dateSelect}
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

            <div className={componentStyles.row}>
                <CardSignupInputSection
                    label="Annual Income"
                    amountStr={
                        formData.annualSalary.startsWith('$') 
                        ? formData.annualSalary 
                        : `$${formData.annualSalary}`
                    }
                    setAmountStr={(value) => handleFormDataChange("annualSalary", value.replace("$", ""))}
                />

                <CardSignupInputSection
                    label="Expected Monthly Spend"
                        amountStr={
                        formData.expectedMonthlyVolume.startsWith('$') 
                        ? formData.expectedMonthlyVolume 
                        : `$${formData.expectedMonthlyVolume}`
                    }
                    setAmountStr={(value) => handleFormDataChange("expectedMonthlyVolume", value.replace("$", ""))}
                />
            </div>

            <CardSignupInputSection
                label="Account Purpose"
                amountStr={formData.accountPurpose}
                setAmountStr={(value) => handleFormDataChange("accountPurpose", value)}
            />

            <CardSignupInputSection
                label="National ID Number"
                amountStr={formData.nationalId}
                setAmountStr={(value) => handleFormDataChange("nationalId", value)}
            />

            <div className={modalStyles.inputGroup}>
                <label>National ID Country of Issue</label>
                <select
                    className={modalStyles.select}
                    value={getCountry(formData.countryOfIssue) ?? ""}
                    onChange={(e) => {
                        const countryCode = getCode(e.target.value);
                        if (!countryCode) throw new Error("Invalid country");
                        handleFormDataChange("countryOfIssue", countryCode)
                    }}
                >
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