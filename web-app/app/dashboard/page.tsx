"use client";

import { useAnchorWallet, useConnection } from '@solana/wallet-adapter-react';
import { useRouter } from 'next/navigation';
import { useEffect, useState, useCallback } from 'react';
import { isVaultInitialized } from '@/utils/helpers';
import Account from '@/components/Account/Account';
import MainView from '@/components/MainView/MainView';
import LoanView from '@/components/LoanView/LoanView';
import styles from "./page.module.css";
import { fetchDriftData, getSolDailyEarnRate, getUsdcDailyBorrowRate } from '@/utils/balance';
import { getVault } from '@/utils/getPDAs';
import { DRIFT_MARKET_INDEX_SOL, DRIFT_MARKET_INDEX_USDC } from '@/utils/constants';
import DefaultModal, { DefaultModalProps } from '@/components/Modals/DefaultModal/DefaultModal';
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
    updateBalance: () => void;
    //enableOfframpModal: (url: string) => void;
}

export default function Dashboard() {
    const { connection } = useConnection();
    const wallet = useAnchorWallet();
    const router = useRouter();

    useEffect(() => {
        const isLoggedIn = async () => {
            if (!wallet) router.push("/");
            else if (!await isVaultInitialized(wallet, connection)) router.push("/onboarding");
        }
        isLoggedIn();
    }, [wallet, connection, router]);

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

    const updateFinancialData = async () => {
        try {
            const response = await fetch('/api/solana-price');
            const data = await response.json();
            const solPrice = data.solana.usd;
            if (isNaN(solPrice)) throw new Error("Sol price is NaN");

            setSolPrice(solPrice);
            setSolDailyRate(await getSolDailyEarnRate());
            setUsdcDailyRate(await getUsdcDailyBorrowRate());
            return true;
        } catch (err) {
            console.error(`Error fetching SOL price: ${err}`);
            return false;
        }
    }

    const updateBalance = useCallback(async () => {
        if (!connection || !wallet || !await isVaultInitialized(wallet, connection)) return;

        setBalanceLoaded(false);

        const vault = getVault(wallet.publicKey);
        const [totalSolBalance, usdcLoanBalance] = await fetchDriftData(vault, [
            DRIFT_MARKET_INDEX_SOL,
            DRIFT_MARKET_INDEX_USDC
        ]);

        if (isNaN(Number(totalSolBalance)) || isNaN(Number(usdcLoanBalance))) return;

        setTotalSolBalance(Math.abs(totalSolBalance));
        setUsdcLoanBalance(Math.abs(usdcLoanBalance));

        const isBalanceLoaded = await updateFinancialData();
        setBalanceLoaded(isBalanceLoaded);
    }, [connection, wallet]);

    useEffect(() => {
        updateBalance();

        const interval = setInterval(updateFinancialData, 10_000);
        return () => clearInterval(interval);
    }, [updateBalance]);

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