import type { MarketIndex } from "@/src/config/constants";
import { useRefetchAccountData } from "@/src/utils/hooks";
import { useStore } from "@/src/utils/store";
import { SUPPORTED_DRIFT_MARKETS } from "@quartz-labs/sdk";
import { useConnection, useAnchorWallet } from "@solana/wallet-adapter-react";
import { useEffect, useState } from "react";
import styles from "../Modal.module.css";
import InputSection from "../Input.ModuleComponent";
import { ModalVariation } from "@/src/types/enums/ModalVariation.enum";
import Buttons from "../Buttons.ModalComponent";
import { baseUnitToDecimal, buildAndSendTransaction, decimalToBaseUnit, formatTokenDisplay, truncToDecimalPlaces } from "@/src/utils/helpers";
import TokenSelect from "../TokenSelect/TokenSelect";
import { TOKENS } from "@/src/config/tokens";
import { makeCollateralRepayIxs } from "@/src/utils/instructions";
import { useError } from "@/src/context/error-provider";
import { captureError } from "@/src/utils/errors";
import { TxStatus, useTxStatus } from "@/src/context/tx-status-provider";

export default function RepayLoanModal() {
    const wallet = useAnchorWallet();
    const { connection } = useConnection();

    const { prices, rates, balances, setModalVariation } = useStore();
    const { showError } = useError();
    const { showTxStatus } = useTxStatus();
    const refetchAccountData = useRefetchAccountData();

    const [awaitingSign, setAwaitingSign] = useState(false);
    const [errorText, setErrorText] = useState("");
    const [amountLoanStr, setAmountLoanStr] = useState("");
    const amountLoan = Number(amountLoanStr);

    const [ marketIndexCollateral, setMarketIndexCollateral ] = useState<MarketIndex>(SUPPORTED_DRIFT_MARKETS[1]);
    const [ marketIndexLoan, setMarketIndexLoan ] = useState<MarketIndex>(SUPPORTED_DRIFT_MARKETS[0]);

    useEffect(() => {
        refetchAccountData();
    }, [refetchAccountData]);

    const priceCollateral = prices?.[marketIndexCollateral] ?? 0;
    const rateCollateral = rates?.[marketIndexCollateral]?.depositRate ?? 0;
    const balanceCollateral = balances?.[marketIndexCollateral] ?? 0;
    
    const priceLoan = prices?.[marketIndexLoan] ?? 0;
    const balanceLoan = balances?.[marketIndexLoan] ?? 0;

    const amountCollateral = (amountLoan * priceLoan) / priceCollateral;
    const valueCollateral = prices?.[marketIndexCollateral] 
        ? prices?.[marketIndexCollateral] * amountCollateral 
        : undefined;

    const loanMarketIndices = balances
        ? Object.entries(balances)
            .filter(([_, balance]) => balance < 0)
            .map(([marketIndex]) => Number(marketIndex) as MarketIndex)
        : [];

    const collateralMarketIndices = balances
        ? Object.entries(balances)
            .filter(([_, balance]) => balance > 0)
            .map(([marketIndex]) => Number(marketIndex) as MarketIndex)
        : [];

    const handleConfirm = async () => {
        if (!wallet?.publicKey) return setErrorText("Wallet not connected");
        if (isNaN(amountLoan)) return setErrorText("Invalid input");
        
        const minAmountLoan = baseUnitToDecimal(1, marketIndexLoan);
        if (amountLoan > baseUnitToDecimal(balanceLoan, marketIndexLoan)) return setErrorText(`Maximum loan amount: ${balanceLoan}`);
        if (amountLoan < minAmountLoan) return setErrorText(`Minimum loan amount: ${minAmountLoan}`);

        const minAmountCollateral = baseUnitToDecimal(1, marketIndexCollateral);
        if (amountCollateral > baseUnitToDecimal(balanceCollateral, marketIndexCollateral)) return setErrorText(`Maximum collateral amount: ${balanceCollateral}`);
        if (amountCollateral < minAmountCollateral) return setErrorText(`Minimum collateral amount: ${minAmountCollateral}`);

        setErrorText("");

        setAwaitingSign(true);
        try {
            const amountLoanBaseUnits = decimalToBaseUnit(amountLoan, marketIndexLoan);
            const { instructions, lookupTables } = await makeCollateralRepayIxs(connection, wallet, amountLoanBaseUnits, marketIndexLoan, marketIndexCollateral);
            const signature = await buildAndSendTransaction(instructions, wallet, connection, showTxStatus, lookupTables);
            setAwaitingSign(false);
            if (signature) setModalVariation(ModalVariation.DISABLED);
        } catch (error) {
            showTxStatus({ status: TxStatus.NONE });
            captureError(showError, "Failed to repay loan", "/RepayLoanModal.tsx", error, wallet.publicKey);
        } finally {
            setAwaitingSign(false);
        }
    }
    
    return (
        <div className={styles.contentWrapper}>
            <h2 className={`${styles.heading} ${styles.headingRepayLoan}`}>Repay Loan with Collateral</h2>

            <InputSection
                label="Loan"
                availableLabel="Loan balance"
                borrowing={true}
                price={prices?.[marketIndexLoan]}
                rate={rates?.[marketIndexLoan]?.borrowRate}
                available={Math.abs(baseUnitToDecimal(balanceLoan, marketIndexLoan))}
                amountStr={amountLoanStr}
                setAmountStr={setAmountLoanStr}
                setMaxAmount={() => setAmountLoanStr(balanceLoan ? baseUnitToDecimal(balanceLoan, marketIndexLoan).toString() : "0")}
                setHalfAmount={() => setAmountLoanStr(balanceLoan ? baseUnitToDecimal(Math.trunc(balanceLoan / 2), marketIndexLoan).toString() : "0")}
                marketIndex={marketIndexLoan}
                setMarketIndex={setMarketIndexLoan}
                selectableMarketIndices={loanMarketIndices}
            />

            <div className={`${styles.inputSection} ${styles.inputSectionCollateral}`}>
                <p>Collateral</p>

                <div className={styles.inputFieldWrapper}>
                    <div className={`${styles.inputField} ${styles.inputFieldAmount} ${styles.inputFieldCollateral}`}>
                        {truncToDecimalPlaces(amountCollateral, TOKENS[marketIndexCollateral].decimalPrecision)}
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

            {errorText &&
                <div className={styles.errorTextWrapper}>
                    <p>{errorText}</p>
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