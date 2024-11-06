import { useAnchorWallet } from "@solana/wallet-adapter-react";
import styles from "../DefaultLayout/DefaultLayout.module.css";
import Image from "next/image";
import { useEffect, useState } from "react";

interface TelegramModalProps {
    closeModal: () => void;
}

export default function TelegramModal(
    {closeModal} : TelegramModalProps
) {
    const wallet = useAnchorWallet();
    const publicKey = wallet ? wallet.publicKey.toString() : "";

    const [displayCopied, setDisplayCopied] = useState(false);
    const COPIED_DURATION = 1200;

    const openTelegram = () => {
        if (!wallet) return;
        const username = "QuartzLTVBot";

        const isMobile = /Android|iPhone|iPad|iPod/i.test(
            navigator.userAgent
        );
        
        if (isMobile) {
            // window.location.href = `tg://resolve?domain=${username}`;
            window.open(`https://telegram.me/${username}`, '_blank');
        } else {
            window.open(`https://telegram.me/${username}`, '_blank');
        }
    }

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
        <>
            <div className={styles.contentWrapper}>
                <h2 
                    className={styles.heading}
                    style={{marginBottom: "55px"}}
                >Telegram Notifications</h2>
            
                <p style={{marginBottom: "25px"}}>DM your wallet address to our Telegram bot @QuartzLTVBot to receive Telegram notifications when your Quartz account health <span className={"no-wrap"}>approaches 0%.</span></p>

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
                                <p>{publicKey}</p>
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
                    
                <p style={{marginBottom: "55px"}}>Repaying your loan before reaching 0% health will mean you avoid any <span className={"no-wrap"}>liquidation penalties.</span></p>
            </div>

            <div className={styles.buttons}>
                <button 
                    className={`glass-button ${styles.mainButton}`}
                    onClick={openTelegram}
                >
                    Open Telegram
                </button>

                <button 
                    className={`glass-button ghost ${styles.mainButton}`}
                    onClick={() => closeModal()}
                >
                    Done
                </button>
            </div>
        </>
    )
}