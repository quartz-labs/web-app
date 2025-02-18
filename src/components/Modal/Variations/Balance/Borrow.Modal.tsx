import { validateAmount, fetchAndParse, deserializeTransaction, signAndSendTransaction, buildEndpointURL, formatPreciseDecimal, generateAssetInfos } from "@/src/utils/helpers";
import { useRefetchAccountData, useRefetchBorrowLimits } from "@/src/utils/hooks";
import { useStore } from "@/src/utils/store";
import { useAnchorWallet } from "@solana/wallet-adapter-react";
import { useEffect, useState } from "react";
import { ModalVariation } from "@/src/types/enums/ModalVariation.enum";
import styles from "../../Modal.module.css";
import InputSection from "../../Components/Input.ModalComponent";
import Buttons from "../../Components/Buttons.ModalComponent";
import { useError } from "@/src/context/error-provider";
import { captureError } from "@/src/utils/errors";
import { TxStatus, useTxStatus } from "@/src/context/tx-status-provider";
import { WalletSignTransactionError } from "@solana/wallet-adapter-base";
import { MarketIndex, TOKENS, baseUnitToDecimal, decimalToBaseUnit } from "@quartz-labs/sdk/browser";
import type { AssetInfo } from "@/src/types/interfaces/AssetInfo.interface";

export default function BorrowModal() {
    const wallet = useAnchorWallet();

    const { prices, balances, rates, borrowLimits, setModalVariation } = useStore();
    const { showError } = useError();
    const { showTxStatus } = useTxStatus();
    const refetchAccountData = useRefetchAccountData();
    const refetchBorrowLimits = useRefetchBorrowLimits();

    const [awaitingSign, setAwaitingSign] = useState(false);
    const [errorText, setErrorText] = useState("");
    const [amountStr, setAmountStr] = useState("");
    const amountDecimals = Number(amountStr);
    const [suppliedAssets, setSuppliedAssets] = useState<AssetInfo[]>([]);

    // Set starting index to MarketIndex[1], unless that's the only collateral
    const startingIndex = MarketIndex[1];
    useEffect(() => {
        if (prices && balances && rates) {
            const { suppliedAssets } = generateAssetInfos(prices, balances, rates);
            setSuppliedAssets(suppliedAssets);
            if (suppliedAssets.length === 1 && suppliedAssets[0]?.marketIndex === startingIndex) {
                setMarketIndex(MarketIndex[0]);
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []); // Empty dependency array to only run once
    const [ marketIndex, setMarketIndex ] = useState<MarketIndex>(startingIndex);

    // Cannot borrow against your only collateral
    let selectableMarketIndices = [...MarketIndex];
    if (suppliedAssets.length === 1) {
        selectableMarketIndices = [...MarketIndex].filter(index => index !== suppliedAssets[0]?.marketIndex);
    }

    // Warning for PYUSD
    const [ autoRepayWarningDetails, setAutoRepayWarningDetails ] = useState(false);
    useEffect(() => {
        setAutoRepayWarningDetails(false);
    }, [marketIndex]);

    useEffect(() => {
        refetchAccountData();
        refetchBorrowLimits();
        
        const interval = setInterval(refetchBorrowLimits, 3_000);
        return () => clearInterval(interval);
    }, [refetchAccountData, refetchBorrowLimits]);

    const balance = balances?.[marketIndex] ?? 0;
    const maxBorrowBaseUnits = borrowLimits?.[marketIndex] ?? 0;

    const isLessThanBorrowLimit = (amountDecimals !== 0 && decimalToBaseUnit(amountDecimals, marketIndex) <= balance);

    const handleConfirm = async () => {
        if (!wallet?.publicKey) return setErrorText("Wallet not connected");

        const errorText = validateAmount(marketIndex, amountDecimals, maxBorrowBaseUnits);
        setErrorText(errorText);
        if (errorText) return;

        setAwaitingSign(true);
        try {
            const endpoint = buildEndpointURL("/api/build-tx/withdraw", {
                address: wallet.publicKey.toBase58(),
                allowLoan: true,
                amountBaseUnits: decimalToBaseUnit(amountDecimals, marketIndex),
                marketIndex
            });
            const response = await fetchAndParse(endpoint, undefined, 3);
            const transaction = deserializeTransaction(response.transaction);
            const signature = await signAndSendTransaction(transaction, wallet, showTxStatus);
            setAwaitingSign(false);
            if (signature) setModalVariation(ModalVariation.DISABLED);
        } catch (error) {
            if (error instanceof WalletSignTransactionError) showTxStatus({ status: TxStatus.SIGN_REJECTED });
            else {
                showTxStatus({ status: TxStatus.NONE });
                captureError(showError, "Failed to withdraw", "/WithdrawModal.tsx", error, wallet.publicKey);
            }
        } finally {
            setAwaitingSign(false);
        }
    }
    
    return (
        <div className={styles.contentWrapper}>
            <h2 className={styles.heading}>Borrow Funds</h2>

            <InputSection
                borrowing={true}
                price={prices?.[marketIndex]}
                rate={rates?.[marketIndex]?.borrowRate}
                available={baseUnitToDecimal(maxBorrowBaseUnits, marketIndex)}
                amountStr={amountStr}
                setAmountStr={setAmountStr}
                setMaxAmount={() => setAmountStr(
                    maxBorrowBaseUnits ? formatPreciseDecimal(baseUnitToDecimal(maxBorrowBaseUnits, marketIndex)) : "0"
                )}
                setHalfAmount={() => setAmountStr(
                    maxBorrowBaseUnits ? formatPreciseDecimal(baseUnitToDecimal(Math.trunc(maxBorrowBaseUnits / 2), marketIndex)) : "0"
                )}
                marketIndex={marketIndex}
                setMarketIndex={setMarketIndex}
                selectableMarketIndices={selectableMarketIndices}
            />

            {isLessThanBorrowLimit && 
                <div className={styles.messageTextWrapper}>
                    <p className={"light-text small-text"}>The selected amount is less than your balance and will result in a withdrawal, <span className="no-wrap">not a borrow.</span></p>
                </div>
            }

            {errorText &&
                <div className={styles.messageTextWrapper}>
                    <p className={"error-text"}>{errorText}</p>
                </div>
            } 

            {TOKENS[marketIndex].name === "PYUSD" &&
                <div className={styles.messageTextWrapper}>
                    <p className={"error-text"}>
                        Warning: Auto-repay is not yet supported for PYUSD.&nbsp;
                        {!autoRepayWarningDetails &&
                            <a 
                                onClick={() => setAutoRepayWarningDetails(true)}
                                className={"light-text pointer-cursor"}
                            >
                                Learn more
                            </a>
                        }
                        {autoRepayWarningDetails &&
                            <span>
                                Your loan may be liquidated if your account health falls to 0%, with a fee of up to 5%. Activate Telegram notifications to keep on top of your account health.
                            </span>
                        }
                    </p>
                </div>
            }

            <Buttons 
                label="Borrow" 
                awaitingSign={awaitingSign} 
                onConfirm={handleConfirm} 
                onCancel={() => setModalVariation(ModalVariation.DISABLED)}
            />
        </div>
    )
}