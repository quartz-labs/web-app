import { useRefetchAccountData } from "@/src/utils/hooks";
import { useStore } from "@/src/utils/store";
import { useAnchorWallet } from "@solana/wallet-adapter-react";
import { useEffect, useState } from "react";
import styles from "../Modal.module.css";
import InputSection from "../Input.ModalComponent";
import { ModalVariation } from "@/src/types/enums/ModalVariation.enum";
import Buttons from "../Buttons.ModalComponent";
import { formatTokenDisplay, truncToDecimalPlaces, signAndSendTransaction, fetchAndParse, deserializeTransaction, buildEndpointURL } from "@/src/utils/helpers";
import TokenSelect from "../TokenSelect/TokenSelect";
import { useError } from "@/src/context/error-provider";
import { captureError } from "@/src/utils/errors";
import { TxStatus, useTxStatus } from "@/src/context/tx-status-provider";
import { WalletSignTransactionError } from "@solana/wallet-adapter-base";
import { MarketIndex, TOKENS, baseUnitToDecimal, decimalToBaseUnit } from "@quartz-labs/sdk/browser";
import { useDepositLimitsQuery } from "@/src/utils/queries";

export default function RepayWithCollateral() {
    const wallet = useAnchorWallet();

    const { prices, rates, balances, setModalVariation } = useStore();
    const { showError } = useError();
    const { showTxStatus } = useTxStatus();
    const refetchAccountData = useRefetchAccountData();

    const [awaitingSign, setAwaitingSign] = useState(false);
    const [errorText, setErrorText] = useState("");
    const [amountLoanStr, setAmountLoanStr] = useState("");
    const amountLoanDecimal = Number(amountLoanStr);

    const loanMarketIndices = balances
        ? Object.entries(balances)
            .filter(([, balance]) => balance < 0)
            .map(([marketIndex]) => Number(marketIndex) as MarketIndex)
        : [];

    const collateralMarketIndices = balances
        ? Object.entries(balances)
            .filter(([, balance]) => balance > 0)
            .map(([marketIndex]) => Number(marketIndex) as MarketIndex)
        : [];

    const [ marketIndexCollateral, setMarketIndexCollateral ] = useState<MarketIndex>(collateralMarketIndices[0] ?? MarketIndex[1]);
    const [ marketIndexLoan, setMarketIndexLoan ] = useState<MarketIndex>(loanMarketIndices[0] ?? MarketIndex[0]);

    useEffect(() => {
        refetchAccountData();
    }, [refetchAccountData]);

    const { data: depositLimitBaseUnits } = useDepositLimitsQuery(wallet?.publicKey ?? null, marketIndexLoan);

    const priceCollateral = prices?.[marketIndexCollateral] ?? 0;
    const rateCollateral = rates?.[marketIndexCollateral]?.depositRate ?? 0;
    const balanceCollateralBaseUnits = balances?.[marketIndexCollateral] ?? 0;
    
    const priceLoan = prices?.[marketIndexLoan] ?? 0;
    const balanceLoanBaseUnits = balances?.[marketIndexLoan] ?? 0;

    const amountCollateralDecimal = (amountLoanDecimal * priceLoan) / priceCollateral;
    const valueCollateral = prices?.[marketIndexCollateral] 
        ? prices?.[marketIndexCollateral] * amountCollateralDecimal 
        : undefined;

    const canRepayWithWallet = (amountLoanDecimal > 0 && amountLoanDecimal <= baseUnitToDecimal(depositLimitBaseUnits ?? 0, marketIndexLoan));

    const handleConfirm = async () => {
        if (!wallet?.publicKey) return setErrorText("Wallet not connected");
        if (isNaN(amountLoanDecimal)) return setErrorText("Invalid input");

        const balanceLoanDecimal = baseUnitToDecimal(Math.abs(balanceLoanBaseUnits), marketIndexLoan);
        const minAmountLoanDecimal = baseUnitToDecimal(1, marketIndexLoan);

        if (amountLoanDecimal > balanceLoanDecimal) {
            return setErrorText(`Maximum loan amount: ${balanceLoanDecimal}`);
        }
        if (amountLoanDecimal < minAmountLoanDecimal) {
            return setErrorText(`Minimum loan amount: ${minAmountLoanDecimal}`);
        }

        const balanceCollateralDecimal = baseUnitToDecimal(balanceCollateralBaseUnits, marketIndexCollateral);
        const minAmountCollateralDecimal = baseUnitToDecimal(1, marketIndexCollateral);

        if (amountCollateralDecimal > balanceCollateralDecimal) {
            return setErrorText(`Maximum collateral amount: ${balanceCollateralDecimal}`);
        }
        if (amountCollateralDecimal < minAmountCollateralDecimal) {
            return setErrorText(`Minimum collateral amount: ${minAmountCollateralDecimal}`);
        }

        setErrorText("");

        setAwaitingSign(true);
        try {
            const endpoint = buildEndpointURL("/api/build-tx/collateral-repay", {
                address: wallet.publicKey.toBase58(),
                amountLoanBaseUnits: decimalToBaseUnit(amountLoanDecimal, marketIndexLoan),
                marketIndexLoan,
                marketIndexCollateral
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
                setAmountStr={setAmountLoanStr}
                setMaxAmount={() => {
                    setAmountLoanStr(
                        balanceLoanBaseUnits 
                        ? baseUnitToDecimal(Math.abs(balanceLoanBaseUnits), marketIndexLoan).toString() 
                        : "0"
                    )
                }}
                setHalfAmount={() => {
                    setAmountLoanStr(
                        balanceLoanBaseUnits 
                        ? baseUnitToDecimal(Math.trunc(Math.abs(balanceLoanBaseUnits) / 2), marketIndexLoan).toString() 
                        : "0"
                    )
                }}
                marketIndex={marketIndexLoan}
                setMarketIndex={setMarketIndexLoan}
                selectableMarketIndices={loanMarketIndices}
            />

            <div className={`${styles.inputSection} ${styles.inputSectionCollateral}`}>
                <p>Collateral</p>

                <div className={styles.inputFieldWrapper}>
                    <div className={`${styles.inputField} ${styles.inputFieldAmount} ${styles.inputFieldCollateral}`}>
                        {truncToDecimalPlaces(amountCollateralDecimal, TOKENS[marketIndexCollateral].decimalPrecision.toNumber())}
                    </div>

                    <TokenSelect 
                        marketIndex={marketIndexCollateral} 
                        setMarketIndex={setMarketIndexCollateral} 
                        selectableMarketIndices={collateralMarketIndices}
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

            {canRepayWithWallet && 
                <div className={styles.messageTextWrapper}>
                    <p className={"light-text small-text"}>Your wallet has enough {TOKENS[marketIndexLoan].name} to repay the loan without <span className="no-wrap">using your collateral.</span></p>
                </div>
            }

            {errorText &&
                <div className={styles.messageTextWrapper}>
                    <p className={"error-text"}>{errorText}</p>
                </div>
            } 

            <Buttons 
                label="Repay Loan" 
                awaitingSign={awaitingSign} 
                onConfirm={handleConfirm} 
                onCancel={() => setModalVariation(ModalVariation.DISABLED)}
            />
        </div>
    )
}