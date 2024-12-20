import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import styles from './TokenSelect.module.css';
import { TOKENS } from "@/src/config/tokens";
import type { MarketIndex } from "@/src/config/constants";

export interface TokenSelectProps {
    marketIndex: MarketIndex;
    setMarketIndex: (marketIndex: MarketIndex) => void;
}

export default function TokenSelect({ marketIndex, setMarketIndex }: TokenSelectProps) {
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

    return (
        <div className={styles.tokenSelectWrapper} ref={dropdownRef}>
            <button 
                className={styles.tokenSelect}
                onClick={() => setIsOpen(!isOpen)}
                aria-haspopup="true"
                aria-expanded={isOpen}
            >
                <Image 
                    src={`/tokens/${TOKENS[marketIndex].icon}`} 
                    alt={TOKENS[marketIndex].name} 
                    className={styles.assetIcon}
                    width={26} 
                    height={26} 
                /> 
                <p>{TOKENS[marketIndex].name}</p>
            </button>
            
            {isOpen && (
                <div className={styles.dropdownMenu} role="menu">
                    {Object.values(TOKENS).map((token, index) => (
                        <button
                            key={index}
                            className={styles.dropdownItem}
                            onClick={() => {
                                setMarketIndex(index as MarketIndex);
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
                    ))}
                </div>
            )}
        </div>
    );
}