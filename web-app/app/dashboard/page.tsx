"use client";

import { useAnchorWallet, useConnection } from '@solana/wallet-adapter-react';
import { useRouter } from 'next/navigation';
import { useEffect, useState, useCallback } from 'react';
import { captureError, hasBetaKey, isVaultInitialized } from '@/utils/helpers';
import Account from '@/components/Account/Account';
import MainView from '@/components/MainView/MainView';
import LoanView from '@/components/LoanView/LoanView';
import styles from "./page.module.css";
import { fetchDriftData, getSolDailyEarnRate, getUsdcDailyBorrowRate } from '@/utils/balance';
import { getVault } from '@/utils/getAccounts';
import { DRIFT_MARKET_INDEX_SOL, DRIFT_MARKET_INDEX_USDC } from '@/utils/constants';
import DefaultModal, { DefaultModalProps } from '@/components/Modals/DefaultModal/DefaultModal';
import posthog from 'posthog-js';
import { useError } from '@/context/error-provider';
//import OfframpModal from '@/components/Modals/OfframpModal/OfframpModal';

export interface ViewProps {
    solPrice: number;
    totalSolBalance: number;
    usdcLoanBalance: number;
    solDailyRate: number;
    usdcDailyRate: number;
    balanceLoaded: boolean;
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

    const [solPrice, setSolPrice] = useState(0);
    const [totalSolBalance, setTotalSolBalance] = useState(0);
    const [usdcLoanBalance, setUsdcLoanBalance] = useState(0);
    const [solDailyRate, setSolDailyRate] = useState(0);
    const [usdcDailyRate, setUsdcDailyRate] = useState(0);
    const [balanceLoaded, setBalanceLoaded] = useState(false);

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

    const updateFinancialData = useCallback(async () => {
        try {
            const response = await fetch('/api/solana-price');
            if (!response.ok) {
                const errorResponse = await response.json();
                throw new Error(`Failed to fetch Drift data: ${errorResponse.error}`);
            }
            const responseJson = await response.json();
            const solPrice = Number(responseJson);
            if (isNaN(solPrice)) throw new Error(`Sol price is NaN, instead found ${responseJson}`);

            setSolPrice(solPrice);
            setSolDailyRate(await getSolDailyEarnRate());
            setUsdcDailyRate(await getUsdcDailyBorrowRate());
            return true;
        } catch (error) {
            captureError(showError, `Unable to fetch Solana price`, "dashboard: /page.tsx", undefined, error);
            return false;
        }
    }, [showError]);

    const updateBalance = useCallback(async (signature?: string) => {
        if (!connection || !wallet || !await isVaultInitialized(connection, wallet.publicKey)) return;

        setBalanceLoaded(false);

        if (signature) await connection.confirmTransaction({ signature, ...(await connection.getLatestBlockhash()) }, "finalized");

        const vault = getVault(wallet.publicKey);
        const [totalSolBalance, usdcLoanBalance] = await fetchDriftData(showError, vault, [
            DRIFT_MARKET_INDEX_SOL,
            DRIFT_MARKET_INDEX_USDC
        ]);

        if (isNaN(Number(totalSolBalance)) || isNaN(Number(usdcLoanBalance))) return;

        setTotalSolBalance(Math.abs(totalSolBalance));
        setUsdcLoanBalance(Math.abs(usdcLoanBalance));

        const isBalanceLoaded = await updateFinancialData();
        setBalanceLoaded(isBalanceLoaded);
    }, [connection, wallet, updateFinancialData, showError]);

    useEffect(() => {
        updateBalance();

        const interval = setInterval(updateFinancialData, 10_000);
        return () => clearInterval(interval);
    }, [updateBalance, updateFinancialData]);

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
                        balanceLoaded={balanceLoaded}
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
                        balanceLoaded={balanceLoaded}
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