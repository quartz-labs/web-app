import { ViewProps } from "@/app/dashboard/page";
import { MICRO_CENTS_PER_USDC } from "@/utils/constants";
import { depositUsdc } from "@/utils/instructions";
import { useAnchorWallet, useConnection } from "@solana/wallet-adapter-react";
import styles from "./LoanView.module.css";
import { useEffect, useState } from "react";
import { isVaultInitialized, roundToDecimalPlaces } from "@/utils/utils";
import { getVault } from "@/utils/getPDAs";
import { fetchDriftData, getSolDailyEarnRate, getUsdcDailyBorrowRate } from "@/utils/balance";

export default function LoanView({swapView, enableModal, disableModal, enableOfframpModal} : ViewProps) {
    const { connection } = useConnection();
    const wallet = useAnchorWallet();

    const [solPrice, setSolPrice] = useState(0);
    const [totalSolBalance, setTotalSolBalance] = useState(0);
    const [usdcLoanBalance, setUsdcLoanBalance] = useState(0);

    const [solDailyEarnRate, setSolDailyEarnRate] = useState(0);
    const [usdcDailyBorrowRate, setUsdcDailyBorrowRate] = useState(0);

    const updateFinancialData = async () => {
        try {
            const response = await fetch('/api/solana-price');
            const data = await response.json();
            setSolPrice(data.solana.usd);

            setSolDailyEarnRate(await getSolDailyEarnRate());
            setUsdcDailyBorrowRate(await getUsdcDailyBorrowRate());
        } catch {
            console.error("Error: Unable to reach CoinGecko for price data");
        }
    }

    const updateBalance = async () => {
        if (!connection || !wallet || !await isVaultInitialized(wallet, connection)) return;

        const vault = getVault(wallet.publicKey);
        setTotalSolBalance(await fetchDriftData(vault, "SOL"));
        setUsdcLoanBalance(-await fetchDriftData(vault, "USDC"));
        updateFinancialData();
    }

    useEffect(() => {
        updateBalance();

        const interval = setInterval(updateFinancialData, 10000);
        return () => clearInterval(interval);
    }, []);

    const handleRepayUsdc = () => {
        enableModal({
            title: "Repay USDT Loan",
            denomination: "USDT",
            buttonText: "Repay",
            minAmount: 0,
            onConfirm: async (amount: number) => {
                if (!wallet) return;

                const signature = await depositUsdc(wallet, connection, amount * MICRO_CENTS_PER_USDC);
                if (signature) {
                    updateBalance();
                    disableModal();
                }
            },
            onCancel: () => { disableModal(); }
        })
    }

    const netSolBalance = ((totalSolBalance * solPrice) - usdcLoanBalance) / solPrice;
    const dailySolChange = totalSolBalance * solDailyEarnRate * solPrice;
    const dailyUsdcChange = usdcLoanBalance * usdcDailyBorrowRate;

    return (
        <div>
            <div className={styles.balanceWrapper}>
                <div>
                    <p className={styles.title}>Total Assets</p>
                    <p className={styles.fiatAmount}>
                        ${(totalSolBalance * solPrice).toLocaleString('en-IE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </p>
                    <p className={styles.subBalance}>
                        {totalSolBalance} SOL (+${roundToDecimalPlaces(dailySolChange, 4)} /day)
                    </p>
                </div>
                
                <div>
                    <p className={styles.title}>Loans</p>
                    <p className={styles.fiatAmount}>
                        ${usdcLoanBalance.toLocaleString('en-IE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </p>
                    <p className={styles.subBalance}>
                        USDT (+${roundToDecimalPlaces(dailyUsdcChange, 4)} /day)
                    </p>
                </div>

                <div>
                    <p className={styles.title}>Net Balance</p>
                    <p className={styles.fiatAmount}>
                        ${netSolBalance.toLocaleString('en-IE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </p>
                    <p className={styles.subBalance}>
                        After outstanding loans (+${roundToDecimalPlaces(dailySolChange - dailyUsdcChange, 4)} /day)
                    </p>
                </div>
            </div>

            <div className={styles.buttons}>
                <button onClick={handleRepayUsdc} className={"glass-button"}>Repay Loans</button>
                <button onClick={swapView} className={"glass-button ghost"}>Back to Dashboard</button>
            </div>
        </div>
    )
}