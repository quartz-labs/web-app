import { validateAmount, fetchAndParse, deserializeTransaction, buildEndpointURL, formatPreciseDecimal, signAndSendTransaction, formatTokenDisplay, truncToDecimalPlaces } from "@/src/utils/helpers";
import { useRefetchAccountData, useRefetchCardUser, useRefetchWithdrawLimits } from "@/src/utils/hooks";
import { useStore } from "@/src/utils/store";
import { useAnchorWallet } from "@solana/wallet-adapter-react";
import { useEffect, useState } from "react";
import { ModalVariation } from "@/src/types/enums/ModalVariation.enum";
import styles from "../../Modal.module.css";
import Buttons from "../../Components/Buttons.ModalComponent";
import { useError } from "@/src/context/error-provider";
import { captureError } from "@/src/utils/errors";
import { TxStatus, useTxStatus } from "@/src/context/tx-status-provider";
import { WalletSignTransactionError } from "@solana/wallet-adapter-base";
import { baseUnitToDecimal, decimalToBaseUnit, MarketIndex } from "@quartz-labs/sdk/browser";
import config from "@/src/config/config";

export default function CardTopupModal() {
    const wallet = useAnchorWallet();

    const { prices, rates, withdrawLimits, setModalVariation, jwtToken, quartzCardUser, cardDetails } = useStore();
    const { showError } = useError();
    const { showTxStatus } = useTxStatus();
    const refetchAccountData = useRefetchAccountData();
    const refetchWithdrawLimits = useRefetchWithdrawLimits();

    const [awaitingSign, setAwaitingSign] = useState(false);
    const [errorText, setErrorText] = useState("");
    const [amountStr, setAmountStr] = useState("");
    const amountDecimals = Number(amountStr);

    const marketIndex = 0 as MarketIndex; // USDC topup only
    const CHARACTER_LIMIT = 20;
    const value = prices?.[marketIndex] ? prices?.[marketIndex] * Number(amountStr) : undefined;
    const rate = rates?.[marketIndex]?.borrowRate ? rates?.[marketIndex]?.borrowRate * 100 : undefined;
    const maxBorrowBaseUnits = withdrawLimits?.[marketIndex] ?? 0;
    const available = baseUnitToDecimal(maxBorrowBaseUnits, marketIndex);
    
    useEffect(() => {
        refetchAccountData();
        
        const interval = setInterval(refetchWithdrawLimits, 3_000);
        return () => clearInterval(interval);
    }, [refetchAccountData, refetchWithdrawLimits]);

    const refetchCardUser = useRefetchCardUser();
    const handleConfirm = async () => {
        if (!wallet?.publicKey) return setErrorText("Wallet not connected");
        if (!quartzCardUser?.card_api_user_id) return setErrorText("Card user not found");
        if (!cardDetails?.id) return setErrorText("Card not found");

        const errorText = validateAmount(marketIndex, amountDecimals, maxBorrowBaseUnits);
        setErrorText(errorText);
        if (errorText) return;

        setAwaitingSign(true);
        try {
            const topupEndpoint = buildEndpointURL("/api/build-tx/top-up-card", {
                address: wallet.publicKey.toBase58(),
                amountBaseUnits: decimalToBaseUnit(amountDecimals, marketIndex)
            });
            const topupResponse = await fetchAndParse(topupEndpoint);
            const topupTransaction = deserializeTransaction(topupResponse.transaction);

            const signature = await signAndSendTransaction(topupTransaction, wallet, showTxStatus);
            setAwaitingSign(false);
            if (signature) {
                const amountInDollars = truncToDecimalPlaces(amountDecimals, 2);
                await fetchAndParse(`${config.NEXT_PUBLIC_INTERNAL_API_URL}/card/balance/topup`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${jwtToken}`
                    },
                    body: JSON.stringify({
                        signature: signature,
                        cardId: cardDetails.id,
                        providerCardUserId: quartzCardUser.card_api_user_id,
                        quartzCardUserId: quartzCardUser.id,
                        amountSent: amountInDollars * 100
                    })
                });
                refetchCardUser();
                setModalVariation(ModalVariation.DISABLED);
            }
        } catch (error) {
            if (error instanceof WalletSignTransactionError) showTxStatus({ status: TxStatus.SIGN_REJECTED });
            else {
                showTxStatus({ status: TxStatus.NONE });
                captureError(showError, "Failed to add funds to card", "/CardTopupModal.tsx", error, wallet.publicKey);
            }
        } finally {
            setAwaitingSign(false);
        }
    }

    return (
        <div className={styles.contentWrapper}>
            <h2 className={styles.heading}>Add USDC to your card balance</h2>

            <div className={styles.inputSection}>
                <p>Amount</p>
                

                <div className={styles.inputFieldWrapper}>
                    <input 
                        className={`${styles.inputField} ${styles.inputFieldAmount}`}
                        type="text" 
                        placeholder={"0.0"} 
                        value={amountStr} 
                        onChange={(e) => 
                            setAmountStr(e.target.value.slice(0, CHARACTER_LIMIT).replace(/[^0-9.]/g, '').replace(/(\..*?)\..*/g, '$1'))
                        }
                    />
                </div>

                <div className={styles.infoWrapper}>
                    <div className={styles.infoLeft}>
                        {(value !== undefined) && (
                            <p className={"light-text small-text"}>
                                ${value.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })} {(rate !== undefined) && (
                                    <span className={"tiny-text"}>({rate.toFixed(2)}% APR)</span>
                                )}
                            </p>
                        )}

                        {(available !== undefined) && (
                            <p className={"light-text small-text"}>Available: {formatTokenDisplay(available)}</p>
                        )}
                    </div>
                
                    <div className={styles.amount}>
                        <button className={`glass-button ghost ${styles.balanceButton}`} onClick={() => {
                            setAmountStr(
                                maxBorrowBaseUnits ? formatPreciseDecimal(baseUnitToDecimal(Math.trunc(maxBorrowBaseUnits / 2), marketIndex)) : "0"
                            )
                        }}>
                            Half
                        </button>

                        <button className={`glass-button ghost ${styles.balanceButton}`} onClick={() => {
                            setAmountStr(
                                maxBorrowBaseUnits ? formatPreciseDecimal(baseUnitToDecimal(maxBorrowBaseUnits, marketIndex)) : "0"
                            )
                        }}>
                            Max
                        </button>
                    </div>
                </div>
            </div>

            {errorText &&
                <div className={styles.messageTextWrapper}>
                    <p className={"error-text"}>{errorText}</p>
                </div>
            }

            <Buttons
                label="Top up"
                awaitingSign={awaitingSign}
                onConfirm={handleConfirm}
                onCancel={() => setModalVariation(ModalVariation.DISABLED)}
            />
        </div>
    )
}