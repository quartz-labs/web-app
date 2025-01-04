import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import styles from './TokenSelect.module.css';
import { TOKENS_METADATA } from "@/src/config/tokensMetadata";
import type { MarketIndex } from '@quartz-labs/sdk/browser';
import type { TokenMetadata } from '@/src/types/interfaces/TokenMetadata.interface';

export interface TokenSelectProps {
    marketIndex: MarketIndex;
    setMarketIndex: (marketIndex: MarketIndex) => void;
    selectableMarketIndices?: MarketIndex[];
}

export default function TokenSelect({ 
    marketIndex, 
    setMarketIndex, 
    selectableMarketIndices 
}: TokenSelectProps) {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        }

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const filteredTokens: Record<MarketIndex, TokenMetadata> = selectableMarketIndices 
        ? Object.fromEntries(
            selectableMarketIndices.map(index => [index, TOKENS_METADATA[index]])
        ) as Record<MarketIndex, TokenMetadata>
        : TOKENS_METADATA;

    return (
        <div className={styles.tokenSelectWrapper} ref={dropdownRef}>
            <button 
                className={styles.tokenSelect}
                onClick={() => setIsOpen(!isOpen)}
                aria-haspopup="true"
                aria-expanded={isOpen}
            >
                <Image 
                    src={`/tokens/${TOKENS_METADATA[marketIndex].icon}`} 
                    alt={TOKENS_METADATA[marketIndex].name} 
                    className={styles.assetIcon}
                    width={26} 
                    height={26} 
                /> 
                <p>{TOKENS_METADATA[marketIndex].name}</p>
            </button>
            
            {isOpen && (
                <div className={styles.dropdownMenu} role="menu">
                    {Object.entries(filteredTokens).map(([index, token]) => {
                        const marketIndex = Number(index) as MarketIndex;
                        return (
                            <button
                                key={marketIndex}
                                className={styles.dropdownItem}
                                onClick={() => {
                                    setMarketIndex(marketIndex);
                                    setIsOpen(false);
                                }}
                                role="menuitem"
                            >
                                <Image 
                                    src={`/tokens/${token.icon}`} 
                                    alt={token.name} 
                                    className={styles.assetIcon}
                                    width={22} 
                                    height={22} 
                                />
                                {token.name}
                            </button>
                        );
                    })}
                </div>
            )}
        </div>
    );
}