import type { MarketIndex } from "@quartz-labs/sdk/browser";
import styles from "./Modal.module.css";

interface InputSectionProps {
    label?: string;
    amountStr: string;
    setAmountStr: (amount: string) => void;
    marketIndex?: MarketIndex;
    setMarketIndex?: (marketIndex: MarketIndex) => void;
}

export default function CardSignupInputSection({
    label, 
    amountStr, 
    setAmountStr,
} : InputSectionProps ) {
    const CHARACTER_LIMIT = 100;

    return (
        <div className={styles.inputSection}>
            <p>{label ?? "Card Signup Input"}</p>
            
            <div className={styles.inputFieldWrapper}>
                <input 
                    className={`${styles.inputField} ${styles.inputFieldAmount}`}
                    type="text" 
                    placeholder={"..."} 
                    value={amountStr} 
                    onChange={(e) => 
                        setAmountStr(e.target.value.slice(0, CHARACTER_LIMIT))
                    }
                />
            </div>
        </div>
    );
}