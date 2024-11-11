"use client";

import { TxStatus, useTxStatus } from "@/context/tx-status-provider";
import styles from "../Popup.module.css";
import { useAnchorWallet, useConnection } from "@solana/wallet-adapter-react";
import { useEffect, useState } from "react";
import { TailSpin } from "react-loader-spinner";
import Image from "next/image";
import { captureError } from "@/utils/errors";
import { useError } from "@/context/error-provider";


export default function TxStatusPopup() {
    const { connection } = useConnection();
    const { props, enabled, hideTxStatus } = useTxStatus();
    const { showError } = useError();
    const wallet = useAnchorWallet();
    const [status, setStatus] = useState(props ? props.status : TxStatus.NONE);

    const TIMEOUT_TIME = 4_000;

    useEffect(() => {
        const waitForSx = async() => {
            if (!props || props.signature === undefined) return;
            if (!wallet) return captureError(showError, "No wallet connected", "/TxStatusPopup.tsx", "Could not find wallet");

            try {
                await connection.confirmTransaction({ signature: props.signature, ...(await connection.getLatestBlockhash()) }, "confirmed");
                setStatus(TxStatus.CONFIRMED);

                await connection.confirmTransaction({ signature: props.signature, ...(await connection.getLatestBlockhash()) }, "finalized");
                setStatus(TxStatus.FINALIZED);

                setTimeout(() => {
                    hideTxStatus();
                    setStatus(TxStatus.NONE);
                }, TIMEOUT_TIME);
            } catch (error) {
                setStatus(TxStatus.TIMEOUT);
                captureError(showError, "Transaction timed out.", "utils: /instructions.ts", error, wallet.publicKey, true);

                setTimeout(() => {
                    hideTxStatus();
                    setStatus(TxStatus.NONE);
                }, TIMEOUT_TIME * 2);
            }
        }
        waitForSx();
    }, [props, connection, hideTxStatus, showError, wallet]);


    if (!props || !enabled) return (<></>);

    const explorerUrl = `https://solscan.io/tx/${props.signature}`;

    if (status === TxStatus.TIMEOUT) return (
        <div className={`${styles.popup} ${styles.error}`}>
            <div className={styles.heading}>
                <p className={styles.headingError}>
                    Transaction timed out
                </p>
            </div>

            <div className={styles.message}>
                <p>Check the transaction on <a href={explorerUrl} target="_blank">Solscan</a> to see if it&apos;s been confirmed.</p>
            </div>
        </div>
    );

    if (status === TxStatus.FINALIZED) return (
        <div className={styles.popup}>
            <div className={styles.heading}>
                <p>Transaction confirmed</p>
            </div>

            <div className={styles.message}>
                <Image
                    height="25"
                    width="25"
                    alt=""
                    src="/checkmark.png"
                />
                <a href={explorerUrl} target="_blank">View on Solscan</a>
            </div>
        </div>
    );

    return (
        <div className={styles.popup}>
            <div className={styles.heading}>
                {(status !== TxStatus.CONFIRMED) &&
                    <p>Processing transaction...</p>
                }

                {(status === TxStatus.CONFIRMED) &&
                    <p>Confirming transaction...</p>
                }
            </div>

            <div className={styles.message}>
                <TailSpin
                    height="18.5"
                    width="18.5"
                    color="#ffffffA5"
                    ariaLabel="loading-spinner"
                    wrapperStyle={{
                        width: "25px"
                    }}
                />
                <a href={explorerUrl} target="_blank">View on Solscan</a>
            </div>
        </div>
    );
}