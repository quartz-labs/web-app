import { truncateToDecimalPlaces } from "@/utils/helpers";
import styles from "./DefaultLayout.module.css";

interface ModalDefaultContentProps {
    title: string;
    denomination: string;
    amountStr: string;
    maxAmount: number;
    maxDecimals: number;
    setAmountStr: (amount: string) => void;
}

export default function ModalDefaultContent(
    {title, denomination, amountStr, maxAmount, maxDecimals, setAmountStr} : ModalDefaultContentProps
) {
    const halfMax = truncateToDecimalPlaces((maxAmount / 2), maxDecimals);

    return (
        <div className={styles.contentWrapper}>
            <h2 className={styles.heading}>{title}</h2>
        
            <div className={styles.inputSection}>
                <div className={styles.stretchWidth}>
                    <p>Amount</p>

                    <div className={styles.amountButtons}>
                        <button className={`glass-button ghost ${styles.balanceButton}`} onClick={() => setAmountStr(halfMax.toString())}>
                            Half
                        </button>
                        <button className={`glass-button ghost ${styles.balanceButton}`} onClick={() => setAmountStr(maxAmount.toString())}>
                            Max
                        </button>
                    </div>
                </div>

                <div className={styles.inputFieldWrapper}>
                    <input 
                        className={styles.inputField}
                        type="text" 
                        placeholder={"0.0 " + denomination} 
                        value={amountStr} 
                        onChange={(e) => 
                            setAmountStr(e.target.value.replace(/[^0-9.]/g, '').replace(/(\..*?)\..*/g, '$1'))
                        }
                    />
                </div>
            </div>
        </div>
    )
}