import Image from "next/image";
import styles from "./Card.module.css";
import { useState } from "react";

interface CopyTextProps {
    text: string;
}

export default function CopyText({ text }: CopyTextProps) {
    const [isCopied, setIsCopied] = useState(false);

    const copy = () => {
        setIsCopied(true);
        navigator.clipboard.writeText(text.replace(/\s/g, ''));
        setTimeout(() => {
            setIsCopied(false);
        }, 650);
    }

    return (
        <button 
            className={styles.copyText}
            title="Copy to clipboard"
            onClick={copy}
        >
            <p>{text}</p>

            <div className={styles.copyIconWrapper}>
                {isCopied ? (<>
                    <div className={styles.burstContainer}>
                        <svg 
                            width="16" 
                            height="16" 
                            viewBox="0 0 16 16"
                            className={styles.burstAnimation}
                        >
                            <circle
                                cx="8"
                                cy="8"
                                r="2"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="0.75"
                                className={styles.burstRing}
                            />
                        </svg>
                    </div>
                    <Image
                        src="/copy_bg.svg"
                        alt="Copy"
                        width={16}
                        height={16}
                        className={styles.copyIconFadeIn}
                    />
                </>) : (
                    <Image 
                        src="/copy_bg.svg"
                        alt="Copy"
                        width={16}
                        height={16}
                        className={styles.copyIcon}
                    />
                )}
            </div>
        </button>
    );
}