import { useEffect, useState } from "react";
import RepayWithCollateral from "../RepayLoan/RepayWithCollateral";
import RepayWithWallet from "../RepayLoan/RepayWithWallet";
import styles from "../Modal.module.css";
import { useRefetchAccountData, useRefetchDepositLimits } from "@/src/utils/hooks";
import { useStore } from "@/src/utils/store";
import { MarketIndex } from "@quartz-labs/sdk/browser";

export interface RepayLoanInnerModalProps {
    depositLimitBaseUnits?: number;
    marketIndexLoan: MarketIndex;
    setMarketIndexLoan: (marketIndex: MarketIndex) => void;
    loanPositionsMarketIndices: MarketIndex[];
    amountLoanStr: string;
    setAmountLoanStr: (amount: string) => void;
}

export default function RepayLoanModal() {
    const { balances, depositLimits } = useStore();
    const refetchAccountData = useRefetchAccountData();
    const refetchDepositLimits = useRefetchDepositLimits();

    const [collateralRepaySelected, setCollateralRepaySelected] = useState(false);

    const loanPositionsMarketIndices = balances
        ? Object.entries(balances)
            .filter(([, balance]) => balance < 0)
            .map(([marketIndex]) => Number(marketIndex) as MarketIndex)
        : [];
    const [ marketIndexLoan, setMarketIndexLoan ] = useState<MarketIndex>(loanPositionsMarketIndices[0] ?? MarketIndex[0]);

    const collateralPositionsMarketIndices = balances
        ? Object.entries(balances)
            .filter(([, balance]) => balance > 0)
            .map(([marketIndex]) => Number(marketIndex) as MarketIndex)
        : [];
    const [ marketIndexCollateral, setMarketIndexCollateral ] = useState<MarketIndex>(collateralPositionsMarketIndices[0] ?? MarketIndex[1]);

    const [amountLoanStr, setAmountLoanStr] = useState("");

    useEffect(() => {
        refetchAccountData();
        refetchDepositLimits();
    }, [refetchAccountData, refetchDepositLimits]);
    
    return (
        <>
            <div className={styles.repaySelectButtonRow}>
                <button 
                    onClick={() => setCollateralRepaySelected(false)}
                    className={`glass-button ${styles.repaySelectButtonLeft} ${collateralRepaySelected ? styles.repaySelectButtonInactive : ""}`}
                >
                    Repay from Wallet
                </button>
                <button 
                    onClick={() => setCollateralRepaySelected(true)}
                    className={`glass-button ${styles.repaySelectButtonRight} ${!collateralRepaySelected ? styles.repaySelectButtonInactive : ""}`}
                >
                    Repay with Collateral
                </button>
            </div>

            <div className={`glass ${styles.repayInnerModal}`}>
                {collateralRepaySelected && 
                    <RepayWithCollateral 
                        depositLimitBaseUnits={depositLimits?.[marketIndexLoan]}
                        marketIndexLoan={marketIndexLoan}
                        setMarketIndexLoan={setMarketIndexLoan}
                        loanPositionsMarketIndices={loanPositionsMarketIndices}
                        marketIndexCollateral={marketIndexCollateral}
                        setMarketIndexCollateral={setMarketIndexCollateral}
                        collateralPositionsMarketIndices={collateralPositionsMarketIndices}
                        amountLoanStr={amountLoanStr}
                        setAmountLoanStr={setAmountLoanStr}
                    />
                }
                {!collateralRepaySelected && 
                    <RepayWithWallet 
                        depositLimitBaseUnits={depositLimits?.[marketIndexLoan]}
                        marketIndexLoan={marketIndexLoan}
                        setMarketIndexLoan={setMarketIndexLoan}
                        loanPositionsMarketIndices={loanPositionsMarketIndices}
                        amountLoanStr={amountLoanStr}
                        setAmountLoanStr={setAmountLoanStr}
                    />
                }
            </div>
        </>
    )
}