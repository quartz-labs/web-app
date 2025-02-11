import type { KYCData } from "@/src/types/interfaces/KYCData.interface";
import CardSignupInputSection from "../../Components/CardSignUp/CardAccountCreate.ModalComponent";
import pageStyles from "./CardSignup.module.css";
import modalStyles from "../../Modal.module.css";
import { getCode, getCountries } from "@/src/utils/countries";
import type { Address } from "@/src/types/interfaces/Address.interface";

interface SignupPage1Props {
    formData: KYCData;
    handleFormDataChange: <K extends keyof KYCData>(field: K, value: KYCData[K]) => void;
    handleAddressChange: <K extends keyof Address>(field: K, value: Address[K]) => void;
}

export default function PagePersonalDetails({
    formData,
    handleFormDataChange,
    handleAddressChange
}: SignupPage1Props) {
    return (
        <div className={pageStyles.signupPage}>
            <div className={pageStyles.row}>
                <CardSignupInputSection
                    label="First Name"
                    amountStr={formData.firstName}
                    setAmountStr={(value) => handleFormDataChange("firstName", value)}
                />

                <CardSignupInputSection
                    label="Last Name"
                    amountStr={formData.lastName}
                    setAmountStr={(value) => handleFormDataChange("lastName", value)}
                />
            </div>

            <CardSignupInputSection
                label="Email"
                amountStr={formData.email}
                setAmountStr={(value) => handleFormDataChange("email", value)}
            />

            <div className={pageStyles.row}>
                <CardSignupInputSection
                    label="Phone Country Code (eg: +1)"
                    amountStr={
                        formData.phoneCountryCode.startsWith('+') 
                        ? formData.phoneCountryCode 
                        : `+${formData.phoneCountryCode}`
                    }
                    setAmountStr={(value) => handleFormDataChange("phoneCountryCode", value.replace("+", ""))}
                />

                <CardSignupInputSection
                    label="Phone Number"
                    amountStr={formData.phoneNumber}
                    setAmountStr={(value) => handleFormDataChange("phoneNumber", value)}
                />
            </div>

            <div className={pageStyles.row}>
                <CardSignupInputSection
                    label="Address Line 1"
                    amountStr={formData.address.line1}
                    setAmountStr={(value) => handleAddressChange("line1", value)}
                />

                <CardSignupInputSection
                    label="Address Line 2"
                    amountStr={formData.address.line2 || ""}
                    setAmountStr={(value) => handleAddressChange("line2", value)}
                />
            </div>

            <div className={pageStyles.row}>
                <CardSignupInputSection
                    label="City"
                    amountStr={formData.address.city}
                    setAmountStr={(value) => handleAddressChange("city", value)}
                />

                <CardSignupInputSection
                    label="Postcode"
                    amountStr={formData.address.postalCode}
                    setAmountStr={(value) => handleAddressChange("postalCode", value)}
                />
            </div>

            <div className={pageStyles.row}>
                <CardSignupInputSection
                    label="State"
                    amountStr={formData.address.region}
                    setAmountStr={(value) => handleAddressChange("region", value)}
                />

                <div className={modalStyles.inputGroup}>
                    <label>Country</label>
                    <select
                        className={modalStyles.select}
                        value={formData.address.country}
                        onChange={(e) => {
                            const countryCode = getCode(e.target.value);
                            if (!countryCode) throw new Error("Invalid country");

                            handleAddressChange("countryCode", countryCode);
                            handleAddressChange("country", e.target.value);
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
        </div>
    );
}