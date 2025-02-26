import { useStore } from "@/src/utils/store";
import styles from "./Assets.module.css";
import { calculateBalanceDollarValues, calculateBalances, formatDollarValue, generateAssetInfos } from "@/src/utils/helpers";
import type { AssetInfo } from "@/src/types/interfaces/AssetInfo.interface";
import AssetCard from "./AssetCard/AssetCard";
import EmptyAssetCard from "./AssetCard/EmptyAssetCard";
import { useEffect, useState } from "react";

export default function Assets({ isLoading }: { isLoading: boolean }) {
    const { prices, balances, rates, isInitialized } = useStore();

    const [suppliedAssets, setSuppliedAssets] = useState<AssetInfo[]>([]);
    const [borrowedAssets, setBorrowedAssets] = useState<AssetInfo[]>([]);
    const [suppliedValue, setSuppliedValue] = useState<string>("0.00");
    const [borrowedValue, setBorrowedValue] = useState<string>("0.00");

    useEffect(() => {
        if (!prices || !balances || !rates || !isInitialized || isLoading) {
            setSuppliedAssets([]);
            setBorrowedAssets([]);
            return;
        };
        
        const assetInfos = generateAssetInfos(prices, balances, rates);
        setSuppliedAssets(assetInfos.suppliedAssets);
        setBorrowedAssets(assetInfos.borrowedAssets);

        const balanceValues = calculateBalanceDollarValues(prices, balances);
        const { collateralBalance, loanBalance } = calculateBalances(balanceValues);
        setSuppliedValue(
            formatDollarValue(collateralBalance, 2).join(".")
        );
        setBorrowedValue(
            formatDollarValue(loanBalance, 2).join(".")
        );
    }, [prices, balances, rates, isInitialized]);

    return (
        <div className={styles.assetsWrapper}>
            <h2 className={styles.title}>Assets</h2>

            <div className={styles.assetsGrid}>
                <div className={styles.listWrapper}>
                    <h3 className={styles.subtitle}>Supplied{isInitialized ? `: $${suppliedValue}` : ""}</h3>
                    <ul className={styles.assetList}>
                        {suppliedAssets.length > 0 &&
                            suppliedAssets.map((assetInfo) => (
                                <AssetCard key={assetInfo.marketIndex} assetInfo={assetInfo} />
                            ))
                        }

                        {suppliedAssets.length === 0 && (
                            <EmptyAssetCard category="supplied" />
                        )}
                    </ul>
                </div>
                <div className={styles.listWrapper}>
                    <h3 className={styles.subtitle}>Borrowed{isInitialized ? `: $${borrowedValue}` : ""}</h3>
                    <ul className={styles.assetList}>
                        {borrowedAssets.length > 0 &&
                            borrowedAssets.map((assetInfo) => (
                                <AssetCard key={assetInfo.marketIndex} assetInfo={assetInfo} />
                            ))
                        }

                        {borrowedAssets.length === 0 && (
                            <EmptyAssetCard category="borrowed" />
                        )}
                    </ul>
                </div>
            </div>
        </div>
    );
}
