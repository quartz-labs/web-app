"use client";

import { useAnchorWallet, useConnection } from '@solana/wallet-adapter-react';
import { useRouter } from 'next/navigation';
import { useEffect, useState, useCallback } from 'react';
import { hasBetaKey, isVaultInitialized } from '@/utils/helpers';
import Account from '@/components/Account/Account';
import MainView from '@/components/MainView/MainView';
import LoanView from '@/components/LoanView/LoanView';
import styles from "./page.module.css";
import { fetchDriftData, fetchSolPrice, getSolApy, getUsdcApr } from '@/utils/balance';
import { getVault } from '@/utils/getAccounts';
import { DRIFT_MARKET_INDEX_SOL, DRIFT_MARKET_INDEX_USDC } from '@/utils/constants';
import posthog from 'posthog-js';
import { useError } from '@/context/error-provider';
import { captureError } from '@/utils/errors';
import Modal, { ModalVariation } from '@/components/Modals/Modal';
//import OfframpModal from '@/components/Modals/OfframpModal/OfframpModal';

export interface ViewProps {
    solPrice: number | null;
    totalSolBalance: number | null;
    usdcLoanBalance: number | null;
    solApy: number | null;
    usdcApr: number | null;
    swapView: () => void;
}

export default function Dashboard() {
    const { connection } = useConnection();
    const { showError } = useError();
    const wallet = useAnchorWallet();
    const router = useRouter();

    useEffect(() => {
        const isLoggedIn = async () => {
            if (!wallet || !await hasBetaKey(wallet.publicKey, showError)) router.push("/");
            else if (!await isVaultInitialized(connection, wallet.publicKey)) router.push("/onboarding");
        }
        isLoggedIn();

        posthog.capture('In Dashboard', { property: 'true' })
    }, [wallet, connection, router, showError]);

    const [mainView, setMainView] = useState(true);
    const [modal, setModal] = useState(ModalVariation.Disabled);

    const [solPrice, setSolPrice] = useState<number | null>(null);
    const [totalSolBalance, setTotalSolBalance] = useState<number | null>(null);
    const [usdcLoanBalance, setUsdcLoanBalance] = useState<number | null>(null);
    const [solApy, setSolApy] = useState<number | null>(null);
    const [usdcApr, setUsdcApr] = useState<number | null>(null);


    // Fetch Drift Balance
    const updateBalance = useCallback(async (signature?: string) => {
        if (!connection || !wallet || !await isVaultInitialized(connection, wallet.publicKey)) return;

        setTotalSolBalance(null);
        setUsdcLoanBalance(null);

        if (signature) await connection.confirmTransaction({ signature, ...(await connection.getLatestBlockhash()) }, "finalized");

        let totalSolBalance, usdcLoanBalance;
        try {
            [totalSolBalance, usdcLoanBalance] = await fetchDriftData(
                getVault(wallet.publicKey), 
                [
                    DRIFT_MARKET_INDEX_SOL,
                    DRIFT_MARKET_INDEX_USDC
                ]
            );
        } catch (error) {
            captureError(showError, "Could not fetch Drift deposits balance", "./app/dashboard/page.tsx", error, wallet?.publicKey);
            // TODO - Retry for a set amount of times
            return;
        }

        setTotalSolBalance(Math.abs(totalSolBalance));
        setUsdcLoanBalance(Math.abs(usdcLoanBalance));
    }, [connection, wallet, showError]);


    useEffect(() => {
        // Fetch SOL price
        const updatePrice = async() => {
            try {
                setSolPrice(await fetchSolPrice());
            } catch (error) {
                captureError(showError, "Could not fetch SOL price", "./app/dashboard/page.tsx", error, wallet?.publicKey);
            }
        }

        // Fetch Drift APR & APY
        const updateRates = async() => {
            try {
                Promise.all([
                    getSolApy(),
                    getUsdcApr()
                ]).then(([solRate, usdcRate]) => {
                    setSolApy(solRate);
                    setUsdcApr(usdcRate);
                });
            } catch (error) {
                captureError(showError, "Could not fetch Drift rates", "./app/dashboard/page.tsx", error, wallet?.publicKey);
            }
        }

        updateBalance();
        updatePrice();
        updateRates();
        
        const interval = setInterval(() => {
            updatePrice();
            updateRates();
        }, 10_000);
        return () => clearInterval(interval);
    }, [showError, wallet, updateBalance]);

    const onModalClose = (signature?: string) => {
        if (signature) updateBalance(signature);
        setModal(ModalVariation.Disabled);
    }

    return (
        <main className={styles.maxHeight}>
            <Modal 
                variation={modal}
                balanceInfo={{
                    solUi: totalSolBalance,
                    usdcUi: usdcLoanBalance ? Math.abs(usdcLoanBalance) : null,
                    solPriceUSD: solPrice
                }}
                solApy={solApy}
                usdcApr={usdcApr}
                onClose={onModalClose} 
            />

            <div className="two-col-grid">
                <Account />

                {mainView &&
                    <MainView
                        solPrice={solPrice}
                        totalSolBalance={totalSolBalance}
                        usdcLoanBalance={usdcLoanBalance}
                        solApy={solApy}
                        usdcApr={usdcApr}
                        swapView={() => setMainView(false)}

                        handleDepositSol={() => setModal(ModalVariation.DepositSOL)}
                        handleWithdrawSol={() => setModal(ModalVariation.WithdrawSOL)}
                        handleWithdrawUSDC={() => setModal(ModalVariation.WithdrawUSDC)}
                    />
                }

                {!mainView &&
                    <LoanView
                        solPrice={solPrice}
                        totalSolBalance={totalSolBalance}
                        usdcLoanBalance={usdcLoanBalance}
                        solApy={solApy}
                        usdcApr={usdcApr}
                        swapView={() => setMainView(true)}

                        handleRepayUsdc={() => setModal(ModalVariation.RepayUSDC)}
                        handleRepayUsdcWithCollateral={() => setModal(ModalVariation.RepayUSDCWithCollateral)}
                    />
                }
            </div>
        </main>
    )
}