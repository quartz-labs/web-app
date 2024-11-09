"use client";

import { useTxStatus } from "@/context/tx-status-provider";
import styles from "../Popup.module.css";
import { useConnection } from "@solana/wallet-adapter-react";
import { useEffect } from "react";
import { TailSpin } from "react-loader-spinner";

export default function TxStatusPopup() {
    const { props, enabled, hideTxStatus } = useTxStatus();
    const { connection } = useConnection();

    useEffect(() => {
        const waitForSx = async() => {
            if (!props) return;
            await connection.confirmTransaction({ signature: props.signature, ...(await connection.getLatestBlockhash()) }, "finalized");
            hideTxStatus();
        }
        waitForSx();
    }, [props, connection, hideTxStatus])

    if (!props || !enabled) return (<></>);

    const explorerUrl = `https://solscan.io/tx/${props.signature}`;
    return (
        <div className={styles.popup}>
            <div className={styles.heading}>
                <p>Processing transaction...</p>
            </div>

            <div className={styles.message}>
                <TailSpin
                    height="20"
                    width="20"
                    color="#ffffffA5"
                    ariaLabel="loading-spinner"
                />
                <a href={explorerUrl} target="_blank">View on Solscan</a>
            </div>
        </div>
    );
}