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
    const [status, setStatus] = useState(TxStatus.NONE);

    const TIMEOUT_TIME = 4_000;
    const TIMEOUT_TIME_ERROR = 8_000;

    useEffect(() => {
        const trackSignature = async(signature: string) => {
            if (!props) return;
            if (!wallet) return captureError(showError, "No wallet connected", "/TxStatusPopup.tsx", "Could not find wallet");

            try {
                await connection.confirmTransaction({ signature, ...(await connection.getLatestBlockhash()) }, "confirmed");
                setStatus(TxStatus.CONFIRMED);

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
                }, TIMEOUT_TIME_ERROR);
            }
        }

        setStatus(props ? props.status : TxStatus.NONE);

        if (props?.signature !== undefined) {
            trackSignature(props.signature);
        } 
        else if (props?.status === TxStatus.SIGN_REJECTED) {
            setTimeout(() => {
                hideTxStatus();
                setStatus(TxStatus.NONE);
            }, TIMEOUT_TIME);
        }
    }, [props, enabled, connection, hideTxStatus, showError, wallet]);


    if (!props || !enabled || status === TxStatus.NONE) return (<></>);

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


    if (status === TxStatus.SIGNING) return (
        <div className={styles.popup}>
            <div className={styles.heading}>
                <p>Waiting for signature...</p>
            </div>

            <div className={styles.message}>
                <Image
                    height="20"
                    width="20"
                    alt=""
                    src="/wallet-grey.svg"
                    style={{marginRight: "5px"}}
                />
                <p>Waiting for wallet to sign transaction</p>
            </div>
        </div>
    );


    if (status === TxStatus.SIGN_REJECTED) return (
        <div className={styles.popup}>
            <div className={styles.heading}>
                <p>Wallet signing rejected</p>
            </div>

            <div className={styles.message}>
                <p>User rejected the request. Refresh browser if the problem persists.</p>
            </div>
        </div>
    );


    if (status === TxStatus.CONFIRMED) return (
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
                <p>Confirming transaction...</p>
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