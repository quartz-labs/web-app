import type { MarketIndex } from "@quartz-labs/sdk/browser";
import styles from "./CardSignup.ModalComponent.module.css";

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
        <div className={styles.inputWrapper}>
            {label &&
                <p>{label}</p>
            }
            
            <input 
                className={styles.kycInput}
                type="text"
                value={amountStr} 
                onChange={(e) => 
                    setAmountStr(e.target.value.slice(0, CHARACTER_LIMIT))
                }
            />
        </div>
    );
}