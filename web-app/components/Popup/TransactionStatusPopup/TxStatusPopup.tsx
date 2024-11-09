"use client";

import { useTxStatus } from "@/context/tx-status-provider";
import styles from "../Popup.module.css";
import { useConnection } from "@solana/wallet-adapter-react";
import { useEffect, useState } from "react";
import { TailSpin } from "react-loader-spinner";
import Image from "next/image";


export default function TxStatusPopup() {
    const { props, enabled, hideTxStatus } = useTxStatus();
    const { connection } = useConnection();

    const [confirmed, setConfirmed] = useState(false);

    useEffect(() => {
        const waitForSx = async() => {
            if (!props) return;

            await connection.confirmTransaction({ signature: props.signature, ...(await connection.getLatestBlockhash()) }, "finalized");
            setConfirmed(true);

            setTimeout(() => {
                hideTxStatus();
                setConfirmed(false);
            }, 3_000);
        }
        waitForSx();
    }, [props, connection, hideTxStatus])

    if (!props || !enabled) return (<></>);

    const explorerUrl = `https://solscan.io/tx/${props.signature}`;

    if (confirmed) return (
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
    )

    return (
        <div className={styles.popup}>
            <div className={styles.heading}>
                <p>Processing transaction...</p>
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