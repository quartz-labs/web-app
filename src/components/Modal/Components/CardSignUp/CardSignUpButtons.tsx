import { PuffLoader } from "react-spinners";
import styles from "./CardSignup.ModalComponent.module.css";

interface CardSignUpButtonsProps {
    onSubmit: () => void;
    onCancel: () => void;
    page: number;
    pageCount: number;
    incrementPage: () => void;
    decrementPage: () => void;
    loading: boolean;
}

export default function CardSignUpButtons({
    onSubmit, 
    onCancel,
    page,
    pageCount,
    incrementPage,
    decrementPage,
    loading
} : CardSignUpButtonsProps) {
    const handleBack = () => {
        if (page > 0) {
            decrementPage();
        } else {
            onCancel();
        }
    }

    const handleNext = () => {
        if (page < pageCount - 1) {
            incrementPage();
        } else {
            onSubmit();
        }
    }

    return (
        <div className={styles.signUpButtons}>
            <button 
                className={`glass-button ghost ${styles.mainButton}`}
                onClick={handleBack}
            >
                {page > 0 ? "Back" : "Cancel"}
            </button>
            <button 
                className={`glass-button ${styles.mainButton}`}
                onClick={handleNext}
            >
                {loading &&
                    <PuffLoader
                        color={"#ffffff"}
                        size={30}
                        aria-label="Loading"
                        data-testid="loader"
                    />
                }

                {!loading &&
                    <p>{page < pageCount - 1 ? "Next" : "Submit"}</p>
                }
            </button>
        </div>        
    )
}