import Image from "next/image";
import styles from "./AssetCard.module.css";
import type { AssetInfo } from "@/src/types/interfaces/AssetInfo.interface";
import { formatDollarValue, truncToDecimalPlaces } from "@/src/utils/helpers";
import { TOKENS } from "@/src/config/tokens";

export interface AssetCardProps {
    assetInfo: AssetInfo;
}

export default function AssetCard({ assetInfo }: AssetCardProps) {
    const value = Math.abs(assetInfo.balance * assetInfo.price);
    const valueDisplay = formatDollarValue(value, 2);
    
    const balance = Math.abs(assetInfo.balance);
    const balanceDisplay = balance < 999 
        ? truncToDecimalPlaces(balance, 5) 
        : balance < 99999
            ? truncToDecimalPlaces(balance, 2)
            : truncToDecimalPlaces(balance, 0);

    const rateDisplay = (assetInfo.rate * 100).toFixed(2);
    
    return (
        <li className={`${styles.assetCard} glass`}>
            <div className={styles.tokenInfo}>
                <Image 
                    src={`/tokens/${TOKENS[assetInfo.marketIndex].icon}`} 
                    alt={TOKENS[assetInfo.marketIndex].name} 
                    width={36} 
                    height={36} 
                    className={styles.assetIcon}
                />
                <p>{balanceDisplay}</p>
                <p className={"light-text"}>{TOKENS[assetInfo.marketIndex].name}</p>
            </div>

            <div className={styles.details}>
                <p className={styles.value}>
                    ${valueDisplay[0]}<span className={styles.valueDecimal}>.{valueDisplay[1]}</span>
                </p>
                <p className={styles.valueDecimal}>({rateDisplay}% {assetInfo.balance > 0 ? "APY" : "APR"})</p>
            </div>
        </li>
    );
}