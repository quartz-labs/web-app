"use client";

import { TxStatus, useTxStatus } from "@/src/context/tx-status-provider";
import styles from "./Popup.module.css";
import { useAnchorWallet } from "@solana/wallet-adapter-react";
import { useEffect, useState } from "react";
import { TailSpin } from "react-loader-spinner";
import Image from "next/image";
import { captureError } from "@/src/utils/errors";
import { useError } from "@/src/context/error-provider";
import { useRefetchAccountData } from "@/src/utils/hooks";


export default function TxStatusPopup() {
    const { props, enabled, hideTxStatus } = useTxStatus();
    const { showError } = useError();
    const wallet = useAnchorWallet();
    const refetchAccountData = useRefetchAccountData();

    const [status, setStatus] = useState(TxStatus.NONE);

    const TIMEOUT_TIME = 4_000;
    const TIMEOUT_TIME_ERROR = 8_000;

    useEffect(() => {
        const setClosePopup = (timeout: number) => {
            setTimeout(() => {
                hideTxStatus();
                setStatus(TxStatus.NONE);
            }, timeout);
        }

        const trackSignature = async(signature: string) => {
            if (!props) return;
            if (!wallet) return captureError(showError, "No wallet connected", "/TxStatusPopup.tsx", "Could not find wallet", null);

            try {
                const response = await fetch(`/api/confirm-tx?signature=${signature}`);
                const body = await response.json();
                if (!response.ok) throw new Error(body.error);

                refetchAccountData(signature);
                if (body.success) {
                    setStatus(TxStatus.CONFIRMED);
                    setClosePopup(TIMEOUT_TIME);
                } else {
                    if (body.timeout) setStatus(TxStatus.TIMEOUT);
                    else setStatus(TxStatus.FAILED);
                    setClosePopup(TIMEOUT_TIME_ERROR);
                }
            } catch (error) {
                setStatus(TxStatus.FAILED);
                refetchAccountData(signature);
                setClosePopup(TIMEOUT_TIME_ERROR);
                captureError(showError, "Transaction failed.", "utils: /instructions.ts", error, wallet.publicKey, true);
            }
        }

        setStatus(props ? props.status : TxStatus.NONE);

        if (props?.signature !== undefined) {
            trackSignature(props.signature);
        } else if (props?.status === TxStatus.SIGN_REJECTED || props?.status === TxStatus.BLOCKHASH_EXPIRED) {
            setClosePopup(TIMEOUT_TIME);
        }
    }, [props, enabled, hideTxStatus, showError, wallet, refetchAccountData]);

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


    if (status === TxStatus.FAILED) return (
        <div className={`${styles.popup} ${styles.error}`}>
            <div className={styles.heading}>
                <p className={styles.headingError}>
                    Transaction failed
                </p>
            </div>

            <div className={styles.message}>
                <p>Check the transaction on <a href={explorerUrl} target="_blank">Solscan</a> to see details.</p>
            </div>
        </div>
    );

    if (status === TxStatus.BLOCKHASH_EXPIRED) return (
        <div className={`${styles.popup} ${styles.error}`}>
            <div className={styles.heading}>
                <p className={styles.headingError}>
                    Blockhash expired
                </p>
            </div>

            <div className={styles.message}>
                <p>Please try again, and refresh browser if the problem persists.</p>
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