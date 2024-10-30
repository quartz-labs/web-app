"use client";

import { useAnchorWallet, useConnection } from '@solana/wallet-adapter-react';
import { useRouter } from 'next/navigation';
import { useEffect, useState, useCallback } from 'react';
import { hasBetaKey, isVaultInitialized } from '@/utils/helpers';
import Account from '@/components/Account/Account';
import MainView from '@/components/MainView/MainView';
import LoanView from '@/components/LoanView/LoanView';
import styles from "./page.module.css";
import { fetchDriftData, fetchSolPrice, getSolDailyEarnRate, getUsdcDailyBorrowRate } from '@/utils/balance';
import { getVault } from '@/utils/getAccounts';
import { DRIFT_MARKET_INDEX_SOL, DRIFT_MARKET_INDEX_USDC } from '@/utils/constants';
import DefaultModal, { DefaultModalProps } from '@/components/Modals/DefaultModal/DefaultModal';
import posthog from 'posthog-js';
import { useError } from '@/context/error-provider';
import { captureError } from '@/utils/errors';
//import OfframpModal from '@/components/Modals/OfframpModal/OfframpModal';

export interface ViewProps {
    solPrice: number | null;
    totalSolBalance: number | null;
    usdcLoanBalance: number | null;
    solDailyRate: number | null;
    usdcDailyRate: number | null;
    swapView: () => void;
    enableModal: (data: DefaultModalProps) => void;
    disableModal: () => void;
    updateBalance: (signature?: string) => void;
    //enableOfframpModal: (url: string) => void;
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

    const [modalEnabled, setModalEnabled] = useState(false);
    const [modalData, setModalData] = useState<DefaultModalProps>({
        title: "",
        denomination: "",
        buttonText: "",
        minAmount: 0,
        onConfirm: () => { },
        onCancel: () => { }
    });

    //const [offrampModalEnabled, setOfframpModalEnabled] = useState(false);
    //const [offrampUrl, setOfframpUrl] = useState("");

    const [solPrice, setSolPrice] = useState<number | null>(null);
    const [totalSolBalance, setTotalSolBalance] = useState<number | null>(null);
    const [usdcLoanBalance, setUsdcLoanBalance] = useState<number | null>(null);
    const [solDailyRate, setSolDailyRate] = useState<number | null>(null);
    const [usdcDailyRate, setUsdcDailyRate] = useState<number | null>(null);

    const enableModal = (data: DefaultModalProps) => {
        setModalData(data);
        setModalEnabled(true);
    }
    const disableModal = () => setModalEnabled(false);

    // const enableOfframpModal = (url: string) => {
    //     setOfframpUrl(url);
    //     setOfframpModalEnabled(true);
    //     setModalEnabled(false);
    // }


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
                    getSolDailyEarnRate(),
                    getUsdcDailyBorrowRate()
                ]).then(([solRate, usdcRate]) => {
                    setSolDailyRate(solRate);
                    setUsdcDailyRate(usdcRate);
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


    return (
        <main className={styles.maxHeight}>
            {modalEnabled &&
                <DefaultModal {...modalData} />
            }

            {/* {offrampModalEnabled &&
                <OfframpModal url={offrampUrl} closeModal={() => setOfframpModalEnabled(false)} />
            } */}

            <div className="two-col-grid">
                <Account />

                {mainView &&
                    <MainView
                        solPrice={solPrice}
                        totalSolBalance={totalSolBalance}
                        usdcLoanBalance={usdcLoanBalance}
                        solDailyRate={solDailyRate}
                        usdcDailyRate={usdcDailyRate}
                        swapView={() => setMainView(false)}
                        enableModal={enableModal}
                        disableModal={disableModal}
                        updateBalance={updateBalance}
                    //enableOfframpModal={enableOfframpModal}
                    />
                }

                {!mainView &&
                    <LoanView
                        solPrice={solPrice}
                        totalSolBalance={totalSolBalance}
                        usdcLoanBalance={usdcLoanBalance}
                        solDailyRate={solDailyRate}
                        usdcDailyRate={usdcDailyRate}
                        swapView={() => setMainView(true)}
                        enableModal={enableModal}
                        disableModal={disableModal}
                        updateBalance={updateBalance}
                    //enableOfframpModal={() => { }}
                    />
                }
            </div>
        </main>
    )
}