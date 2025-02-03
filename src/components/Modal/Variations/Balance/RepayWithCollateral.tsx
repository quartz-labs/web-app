import { useStore } from "@/src/utils/store";
import { useAnchorWallet } from "@solana/wallet-adapter-react";
import { useState } from "react";
import styles from "../../Modal.module.css";
import InputSection from "../../Components/Input.ModalComponent";
import { ModalVariation } from "@/src/types/enums/ModalVariation.enum";
import Buttons from "../../Components/Buttons.ModalComponent";
import { formatTokenDisplay, truncToDecimalPlaces, signAndSendTransaction, fetchAndParse, deserializeTransaction, buildEndpointURL, formatPreciseDecimal } from "@/src/utils/helpers";
import TokenSelect from "../../Components/TokenSelect/TokenSelect";
import { useError } from "@/src/context/error-provider";
import { captureError } from "@/src/utils/errors";
import { TxStatus, useTxStatus } from "@/src/context/tx-status-provider";
import { WalletSignTransactionError } from "@solana/wallet-adapter-base";
import { MarketIndex, TOKENS, baseUnitToDecimal, decimalToBaseUnit } from "@quartz-labs/sdk/browser";
import type { RepayLoanInnerModalProps } from "./RepayLoan.Modal";
import { useJupiterSwapModeQuery } from "@/src/utils/queries";
import { SwapMode } from "@jup-ag/api";

interface RepayWithCollateralProps extends RepayLoanInnerModalProps {
    marketIndexCollateral: MarketIndex;
    setMarketIndexCollateral: (marketIndex: MarketIndex) => void;
    collateralPositionsMarketIndices: MarketIndex[];
}

export default function RepayWithCollateral({
    depositLimitBaseUnits,
    marketIndexLoan,
    setMarketIndexLoan,
    loanPositionsMarketIndices,
    marketIndexCollateral,
    setMarketIndexCollateral,
    collateralPositionsMarketIndices,
    amountLoanStr,
    setAmountLoanStr
}: RepayWithCollateralProps) {
    const MIN_COLLATERAL_REPAY_USD = 0.01;
    const wallet = useAnchorWallet();

    const { prices, rates, balances, setModalVariation } = useStore();
    const { showError } = useError();
    const { showTxStatus } = useTxStatus();

    const [awaitingSign, setAwaitingSign] = useState(false);
    const [errorText, setErrorText] = useState("");
    const amountLoanDecimal = Number(amountLoanStr);

    const updateAmountLoanStr = (amount: string) => {
        setErrorText("");
        setAmountLoanStr(amount);
    }

    // Find Jupiter swap route
    const { data: swapMode, isLoading: jupiterQuoteLoading } = useJupiterSwapModeQuery(
        TOKENS[marketIndexCollateral].mint,
        TOKENS[marketIndexLoan].mint,
    );

    // Collateral info
    const priceCollateral = prices?.[marketIndexCollateral] ?? 0;
    const rateCollateral = rates?.[marketIndexCollateral]?.depositRate ?? 0;
    const balanceCollateralBaseUnits = balances?.[marketIndexCollateral] ?? 0;
    
    // Loan info
    const priceLoan = prices?.[marketIndexLoan] ?? 0;
    const balanceLoanBaseUnits = balances?.[marketIndexLoan] ?? 0;

    // Collateral required to repay loan
    const amountCollateralDecimal = (amountLoanDecimal * priceLoan) / priceCollateral;
    const belowOneBaseUnit = amountCollateralDecimal * (10 ** TOKENS[marketIndexCollateral].decimalPrecision.toNumber()) < 1;
    const amountCollateralDecimalDisplay = belowOneBaseUnit 
        ? 0 
        : truncToDecimalPlaces(amountCollateralDecimal, TOKENS[marketIndexCollateral].decimalPrecision.toNumber());

    const valueCollateral = prices?.[marketIndexCollateral] 
        ? prices?.[marketIndexCollateral] * amountCollateralDecimalDisplay 
        : undefined;
    const canRepayWithWallet = (amountLoanDecimal > 0 && amountLoanDecimal <= baseUnitToDecimal(depositLimitBaseUnits, marketIndexLoan));

    const handleConfirm = async () => {
        if (!wallet?.publicKey) return setErrorText("Wallet not connected");
        if (!areAmountsValid()) return;
        if (jupiterQuoteLoading || swapMode === null) return;

        setAwaitingSign(true);
        try {
            const amountSwap = swapMode === "ExactOut" 
                ? decimalToBaseUnit(amountLoanDecimal, marketIndexLoan) 
                : decimalToBaseUnit(amountCollateralDecimalDisplay, marketIndexCollateral);
            const endpoint = buildEndpointURL("/api/build-tx/collateral-repay", {
                address: wallet.publicKey.toBase58(),
                amountSwapBaseUnits: amountSwap,
                marketIndexLoan,
                marketIndexCollateral,
                swapMode: swapMode
            });
            const response = await fetchAndParse(endpoint);
            const transaction = deserializeTransaction(response.transaction);
            const signature = await signAndSendTransaction(transaction, wallet, showTxStatus);
            
            setAwaitingSign(false);
            if (signature) setModalVariation(ModalVariation.DISABLED);
        } catch (error) {
            if (error instanceof WalletSignTransactionError) showTxStatus({ status: TxStatus.SIGN_REJECTED });
            else {
                showTxStatus({ status: TxStatus.NONE });
                captureError(showError, "Failed to repay loan", "/RepayLoanModal.tsx", error, wallet.publicKey);
            }
        } finally {
            setAwaitingSign(false);
        }
    }

    const areAmountsValid = (): boolean => {
        if (isNaN(amountLoanDecimal)) {
            setErrorText("Invalid input");
            return false;
        }

        const balanceLoanDecimal = baseUnitToDecimal(Math.abs(balanceLoanBaseUnits), marketIndexLoan);
        const isAboveMinValueLoan = !prices
            ? true
            : amountLoanDecimal > MIN_COLLATERAL_REPAY_USD / prices[marketIndexLoan];

        if (amountLoanDecimal > balanceLoanDecimal) {
            setErrorText(`Maximum loan amount: ${balanceLoanDecimal}`);
            return false;
        }
        if (!isAboveMinValueLoan || amountLoanDecimal < baseUnitToDecimal(1, marketIndexLoan)) {
            setErrorText(`Collateral repay is not available for loans worth less than $${MIN_COLLATERAL_REPAY_USD.toFixed(2)}`);
            return false;
        }

        const balanceCollateralDecimal = baseUnitToDecimal(balanceCollateralBaseUnits, marketIndexCollateral);
        const isAboveMinValueCollateral = !prices
            ? true
            : amountCollateralDecimalDisplay > MIN_COLLATERAL_REPAY_USD / prices[marketIndexCollateral];

        if (amountCollateralDecimalDisplay > balanceCollateralDecimal) {
            setErrorText(`Maximum collateral amount: ${balanceCollateralDecimal}`);
            return false;
        }
        if (!isAboveMinValueCollateral || amountCollateralDecimalDisplay < baseUnitToDecimal(1, marketIndexCollateral)) {
            setErrorText(`Collateral repay is not available with collateral worth less than $${MIN_COLLATERAL_REPAY_USD.toFixed(2)}`);
            return false;
        }

        setErrorText("");
        return true;
    }
    
    return (
        <div className={styles.contentWrapper}>
            <h2 className={`${styles.heading} ${styles.headingRepayLoan}`}>Repay Loan with Existing Collateral</h2>

            <InputSection
                label="Loan"
                availableLabel="Loan balance"
                borrowing={true}
                price={prices?.[marketIndexLoan]}
                rate={rates?.[marketIndexLoan]?.borrowRate}
                available={Math.abs(baseUnitToDecimal(balanceLoanBaseUnits, marketIndexLoan))}
                amountStr={amountLoanStr}
                setAmountStr={updateAmountLoanStr}
                setMaxAmount={() => {
                    updateAmountLoanStr(
                        balanceLoanBaseUnits 
                        ? formatPreciseDecimal(baseUnitToDecimal(Math.abs(balanceLoanBaseUnits), marketIndexLoan)) 
                        : "0"
                    )
                }}
                setHalfAmount={() => {
                    updateAmountLoanStr(
                        balanceLoanBaseUnits 
                        ? formatPreciseDecimal(baseUnitToDecimal(Math.trunc(Math.abs(balanceLoanBaseUnits) / 2), marketIndexLoan)) 
                        : "0"
                    )
                }}
                marketIndex={marketIndexLoan}
                setMarketIndex={setMarketIndexLoan}
                selectableMarketIndices={loanPositionsMarketIndices}
            />

            <div className={`${styles.inputSection} ${styles.inputSectionCollateral}`}>
                <p>Collateral</p>

                <div className={styles.inputFieldWrapper}>
                    <div className={`${styles.inputField} ${styles.inputFieldAmount} ${styles.inputFieldCollateral}`}>
                        {formatPreciseDecimal(amountCollateralDecimalDisplay)}
                    </div>

                    <TokenSelect 
                        marketIndex={marketIndexCollateral} 
                        setMarketIndex={setMarketIndexCollateral} 
                        selectableMarketIndices={collateralPositionsMarketIndices}
                    />
                </div>

                <div className={styles.infoWrapper}>
                    {(valueCollateral !== undefined) && (
                        <p className={"light-text small-text"}>
                            ${valueCollateral.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })} {(rateCollateral !== undefined) && (
                                <span className={"tiny-text"}>({(rateCollateral * 100).toFixed(2)}% APY)</span>
                            )}
                        </p>
                    )}
                    <div/>

                    <div className={styles.amount}>
                        {(balances?.[marketIndexCollateral] !== undefined) && (
                            <p className={"light-text small-text"}>Available: {formatTokenDisplay(baseUnitToDecimal(balances?.[marketIndexCollateral], marketIndexCollateral))}</p>
                        )}
                    </div>
                </div>
            </div>

            {errorText &&
                <div className={styles.messageTextWrapper}>
                    <p className={"error-text"}>{errorText}</p>
                </div>
            } 

            {swapMode === null &&
                <div className={styles.messageTextWrapper}>
                    <p className={"error-text"}>Collateral repay unavailable for selected token pair (no Jupiter <span className="no-wrap">route found).</span></p>
                </div>
            }

            {swapMode !== null && <>
                {(!errorText && canRepayWithWallet) && 
                    <div className={styles.messageTextWrapper}>
                        <p className={"light-text small-text"}>Your wallet has enough {TOKENS[marketIndexLoan].name} to repay the loan without <span className="no-wrap">selling your collateral.</span></p>
                    </div>
                }
    
                {(!errorText && swapMode === SwapMode.ExactIn) &&
                    <div className={styles.messageTextWrapper}>
                        <p className={"light-text small-text"}>No direct ExactOut Jupiter route found. Slippage will be on the loan amount, not the <span className="no-wrap">collateral amount.</span></p>
                    </div>
                }
            </>}

            <Buttons 
                label="Repay Loan" 
                awaitingSign={awaitingSign} 
                onConfirm={handleConfirm} 
                onCancel={() => setModalVariation(ModalVariation.DISABLED)}
                disabled={swapMode === null}
            />
        </div>
    )
}