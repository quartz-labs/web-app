import Image from "next/image";
import styles from "../Modal.module.css";
import { ModalVariation } from "@/src/types/enums/ModalVariation.enum";
import { useStore } from "@/src/utils/store";
import { useEffect } from "react";
import { useState } from "react";
import { useAnchorWallet } from "@solana/wallet-adapter-react";
import { getDisplayWalletAddress } from "@/src/utils/helpers";

export default function NotificationsModal() {
    const { setModalVariation } = useStore();
    const wallet = useAnchorWallet();

    const [publicKey, setPublicKey] = useState("");
    const [publicKeyClass, setPublicKeyClass] = useState(styles.addressCopyText);

    useEffect(() => {
        const updatePublicKey = () => {
            if (!wallet) return;
    
            if (window.innerWidth >= 400) {
                setPublicKey(wallet.publicKey.toString());
                setPublicKeyClass(styles.addressCopyText);
            } else {
                setPublicKey(getDisplayWalletAddress(wallet.publicKey.toString()));
                setPublicKeyClass("");
            }
        };

        updatePublicKey();

        window.addEventListener("resize", updatePublicKey);
        return () => {
            window.removeEventListener("resize", updatePublicKey);
        };
    }, [wallet]);

    const [displayCopied, setDisplayCopied] = useState(false);
    const COPIED_DURATION = 1200;

    // Copy address and display feedback for set time
    useEffect(() => {
        let timer: NodeJS.Timeout;
        if (displayCopied) {
            timer = setTimeout(() => {
                setDisplayCopied(false);
            }, COPIED_DURATION);
        }
        return () => {
            clearTimeout(timer);
        };
    }, [displayCopied])

    const handleCopy = () => {
        if (!wallet) return;
        navigator.clipboard.writeText(wallet.publicKey.toString());
        setDisplayCopied(true);
    }

    return (
        <div className={styles.contentWrapper}>
            <h2 
                className={styles.heading}
                style={{marginBottom: "55px"}}
            >Telegram Notifications</h2>
        
            <p style={{marginBottom: "25px"}}>Message <a href="https://telegram.me/QuartzLTVBot" target="_blank" rel="noopener noreferrer">@QuartzLTVBot</a> to start receiving Telegram notifications about your Quartz <span className={"no-wrap"}>account health.</span></p>

            <div 
                className={styles.inputSection}
                style={{marginBottom: "35px"}}
            >
                <p className={styles.addressCopyLabel}>Your wallet address</p>
                <button 
                    className={`${styles.addressCopyButton} ${displayCopied ? styles.centerContent : ""}`}
                    onClick={handleCopy}
                >
                    {displayCopied &&
                        <p>Copied</p>
                    }

                    {!displayCopied &&
                        <>  
                            <p className={publicKeyClass}>{publicKey}</p>
                            <Image
                                src="/copy.svg"
                                alt="Copy"
                                height={23}
                                width={23}
                            />
                        </>
                    }
                </button>
            </div>
                
            <p style={{marginBottom: "55px"}}>
                If you don&apos;t repay some of your loans before reaching 0% health, your collateral will automatically be sold at market rate to <span className={"no-wrap"}>cover your debt.</span>
            </p>
            

            <div className={styles.buttons}>
                <button 
                    className={`glass-button ${styles.mainButton}`}
                    onClick={() => {window.open(`https://telegram.me/QuartzLTVBot`, '_blank');}}
                >
                    Open Telegram
                </button>

                <button 
                    className={`glass-button ghost ${styles.mainButton}`}
                    onClick={() => setModalVariation(ModalVariation.DISABLED)}
                >
                    Done
                </button>
            </div>
        </div>
    )
}