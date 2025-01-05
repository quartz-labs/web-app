import { useStore } from "@/src/utils/store";
import styles from "./Assets.module.css";
import { generateAssetInfos } from "@/src/utils/helpers";
import type { AssetInfo } from "@/src/types/interfaces/AssetInfo.interface";
import AssetCard from "./AssetCard/AssetCard";
import EmptyAssetCard from "./AssetCard/EmptyAssetCard";
import { useEffect, useState } from "react";

export default function Assets() {
    const { prices, balances, rates, isInitialized } = useStore();

    const [suppliedAssets, setSuppliedAssets] = useState<AssetInfo[]>([]);
    const [borrowedAssets, setBorrowedAssets] = useState<AssetInfo[]>([]);

    useEffect(() => {
        if (!prices || !balances || !rates || !isInitialized) {
            setSuppliedAssets([]);
            setBorrowedAssets([]);
            return;
        };
        const assetInfos = generateAssetInfos(prices, balances, rates);
        setSuppliedAssets(assetInfos.suppliedAssets);
        setBorrowedAssets(assetInfos.borrowedAssets);
    }, [prices, balances, rates, isInitialized]);

    return (
        <>
            <div className={styles.listWrapper}>
                <h3 className={styles.title}>Supplied</h3>
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
                <h3 className={styles.title}>Borrwed</h3>
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
        </>
    );
}
