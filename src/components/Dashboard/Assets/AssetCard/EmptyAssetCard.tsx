import styles from "./AssetCard.module.css";
import type { AssetInfo } from "@/src/types/interfaces/Asset.interface";

export interface EmptyAssetCardProps {
    category: string;
}

export default function EmptyAssetCard({ category }: EmptyAssetCardProps) {
    return (
        <li className={`${styles.assetCard} glass`}>
            <p className={styles.emptyCardText}>No {category} assets</p>
        </li>
    )
}