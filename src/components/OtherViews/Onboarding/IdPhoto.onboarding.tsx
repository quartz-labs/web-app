import styles from "./Onboarding.module.css";
import type { OnboardingPageProps } from "./Onboarding";
import { TailSpin } from "react-loader-spinner";

export interface IdPhotoProps extends OnboardingPageProps {
    awaitingApproval: boolean;
    rejectedReason: string | undefined;
    handleSubmit: () => void;
}

export default function IdPhoto({
    decrementPage,
    awaitingApproval,
    rejectedReason,
    handleSubmit
}: IdPhotoProps) {
    const formatRejection = (rejection: string): string[] => {
        const reasons: string[] = [];

        if (rejection.includes("WRONG_USER_REGION")) {
            reasons.push("We can't support users from your region yet.");
        }

        if (rejection.includes("PEP")) {
            reasons.push("You were found to be a Politically Exposed Person.");
        }

        if (rejection.includes("SELFIE_MISMATCH")) {
            reasons.push("The photo you provided does not match the ID photo.");
        }

        if (rejection.includes("EXPIRATION_DATE")) {
            reasons.push("Your ID has expired.");
        }

        if (rejection.includes("ID_INVALID")) {
            reasons.push("The document you provided is invalid.");
        }

        if (rejection.includes("ID_EXPIRED")) {
            reasons.push("Your ID has expired.");
        }
        
        if (rejection.length === 0) {
            reasons.push("Unknown error.");
        }

        return reasons;
    }

    return (
        <div className={`${styles.contentWrapper} ${styles.textContent}`}>
            <div className={styles.heading}>
                <h1 className={styles.title}>Time to take a photo of your ID</h1>
                <div className={styles.textBody}>
                    <p className={styles.subtitle}>
                        Clicking the button below will redirect you to Sumsub to complete KYC. Make sure your ID hasn&apos;t expired, and is clear and fully visible <span className={"no-wrap"}>in the photo.</span>
                    </p>
                    <p className={styles.subtitle}>
                        Return to this page after submitting your document to finish creating your account.
                    </p>
                </div>
            </div>

            <div className={styles.buttonContainer}>
                {rejectedReason && (
                    <div className={styles.applicationRejected}>
                        <div>
                            <p className={"error-text"}>
                                Unfortunately we could not approve your application, reason:
                            </p>
                            <ul>
                                {formatRejection(rejectedReason).map((reason, index) => (
                                    <li key={index} className={"error-text"}>- {reason}</li>
                                ))}
                            </ul>
                        </div>
                        <p className={styles.subtitle}>
                            Please contact support at <a href="mailto:support@quartzpay.io">support@quartzpay.io</a>.
                        </p>
                    </div>
                )}

                {!rejectedReason && awaitingApproval && (
                    <TailSpin
                        height="30"
                        width="30"
                        color="#ffffffA5"
                        ariaLabel="loading-spinner"
                        wrapperStyle={{
                            width: "30px"
                        }}
                    />
                )}

                {!rejectedReason && !awaitingApproval && (
                    <>
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
                            Complete KYC
                        </button>
                    </>
                )}
            </div>
        </div>
    );
}