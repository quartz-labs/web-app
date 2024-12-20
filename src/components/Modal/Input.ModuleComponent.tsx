import type { MarketIndex } from "@/src/config/constants";
import styles from "./Modal.module.css";
import TokenSelect from "./TokenSelect/TokenSelect";

interface InputSectionProps {
    label?: string;
    borrowing: boolean;
    value?: number;
    rate?: number;
    available?: number;
    amountStr: string;
    setAmountStr: (amount: string) => void;
    setMaxAmount: () => void;
    setHalfAmount: () => void;
    marketIndex: MarketIndex;
    setMarketIndex: (marketIndex: MarketIndex) => void;
}

export default function InputSection({
    label, 
    amountStr, 
    borrowing, 
    value,
    rate,
    available,
    setAmountStr,
    setMaxAmount, 
    setHalfAmount,
    marketIndex, 
    setMarketIndex
} : InputSectionProps ) {
    const CHARACTER_LIMIT = 20;

    return (
        <div className={styles.inputSection}>
            <p>{label ?? "Amount"}</p>

            <div className={styles.inputFieldWrapper}>
                <input 
                    className={`${styles.inputField} ${styles.inputFieldAmount}`}
                    type="text" 
                    placeholder={"0.0"} 
                    value={amountStr} 
                    onChange={(e) => 
                        setAmountStr(e.target.value.slice(0, CHARACTER_LIMIT).replace(/[^0-9.]/g, '').replace(/(\..*?)\..*/g, '$1'))
                    }
                />

                <TokenSelect marketIndex={marketIndex} setMarketIndex={setMarketIndex} />
            </div>

            <div className={styles.infoWrapper}>
                {(value !== undefined) && (
                    <p className={"light-text small-text"}>
                        ${value.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })} {(rate !== undefined) && (
                            <span className={"tiny-text"}>({rate.toFixed(2)}% {borrowing ? "APR" : "APY"})</span>
                        )}
                    </p>
                )}
                <div/>

                <div className={styles.amount}>
                    {(available !== undefined) && (
                        <p className={"light-text small-text"}>Available: ${available}</p>
                    )}
                    
                    <button className={`glass-button ghost ${styles.balanceButton}`} onClick={setHalfAmount}>
                        Half
                    </button>

                    <button className={`glass-button ghost ${styles.balanceButton}`} onClick={setMaxAmount}>
                        Max
                    </button>
                </div>
            </div>
        </div>
    )
}