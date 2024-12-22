import type { MarketIndex } from "@/src/config/constants";
import styles from "./Modal.module.css";
import TokenSelect from "./TokenSelect/TokenSelect";
import { formatTokenDisplay } from "@/src/utils/helpers";
import { useState } from "react";
import { useEffect } from "react";

interface InputSectionProps {
    label?: string;
    availableLabel?: string;
    borrowing: boolean;
    price?: number;
    rate?: number;
    available?: number;
    amountStr: string;
    setAmountStr: (amount: string) => void;
    setMaxAmount: () => void;
    setHalfAmount: () => void;
    marketIndex: MarketIndex;
    setMarketIndex: (marketIndex: MarketIndex) => void;
    selectableMarketIndices?: MarketIndex[];
}

export default function InputSection({
    label, 
    availableLabel,
    amountStr, 
    borrowing, 
    price,
    rate,
    available,
    setAmountStr,
    setMaxAmount, 
    setHalfAmount,
    marketIndex, 
    setMarketIndex,
    selectableMarketIndices
} : InputSectionProps ) {
    const CHARACTER_LIMIT = 20;
    const value = price ? price * Number(amountStr) : undefined;

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

                <TokenSelect 
                    marketIndex={marketIndex} 
                    setMarketIndex={setMarketIndex} 
                    selectableMarketIndices={selectableMarketIndices}
                />
            </div>

            <div className={styles.infoWrapper}>
                <div className={styles.infoLeft}>
                    {(value !== undefined) && (
                        <p className={"light-text small-text"}>
                            ${value.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })} {(rate !== undefined) && (
                                <span className={"tiny-text"}>({(rate * 100).toFixed(2)}% {borrowing ? "APR" : "APY"})</span>
                            )}
                        </p>
                    )}

                    {(available !== undefined) && (
                        <p className={"light-text small-text"}>{availableLabel ?? "Available"}: {formatTokenDisplay(available)}</p>
                    )}
                </div>
            
                <div className={styles.amount}>
                    <button className={`glass-button ghost ${styles.balanceButton}`} onClick={setHalfAmount}>
                        Half
                    </button>

                    <button className={`glass-button ghost ${styles.balanceButton}`} onClick={setMaxAmount}>
                        Max
                    </button>
                </div>
            </div>
        </div>
    );
}