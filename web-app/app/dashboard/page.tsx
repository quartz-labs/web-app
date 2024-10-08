"use client";

import { useAnchorWallet, useConnection } from '@solana/wallet-adapter-react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { isVaultInitialized } from '@/utils/utils';
import Modal, { ModalProps } from '@/components/Modal/Modal';
import Account from '@/components/Account/Account';
import MainView from '@/components/MainView/MainView';
import LoanView from '@/components/LoanView/LoanView';
import styles from "./page.module.css";
import OfframpModal from '@/components/Modal/OfframpModal';
import { fetchDriftData, getSolDailyEarnRate, getUsdcDailyBorrowRate } from '@/utils/balance';
import { getVault } from '@/utils/getPDAs';

export interface ViewProps {
    solPrice: number;
    totalSolBalance: number;
    usdcLoanBalance: number;
    solDailyRate: number;
    usdcDailyRate: number;
    swapView: () => void;
    enableModal: (data: ModalProps) => void;
    disableModal: () => void;
    enableOfframpModal: (url: string) => void;
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
    }, [wallet]);

    const [mainView, setMainView] = useState(true);

    const [modalEnabled, setModalEnabled] = useState(false);
    const [modalData, setModalData] = useState<ModalProps>({
        title: "",
        denomination: "",
        buttonText: "",
        minAmount: 0,
        onConfirm: () => {},
        onCancel: () => {}
    });

    const [offrampModalEnabled, setOfframpModalEnabled] = useState(false);
    const [offrampUrl, setOfframpUrl] = useState("");

    const [solPrice, setSolPrice] = useState(0);
    const [totalSolBalance, setTotalSolBalance] = useState(0);
    const [usdcLoanBalance, setUsdcLoanBalance] = useState(0);
    const [solDailyRate, setSolDailyRate] = useState(0);
    const [usdcDailyRate, setUsdcDailyRate] = useState(0);

    const enableModal = (data: ModalProps) => {
        setModalData(data);
        setModalEnabled(true);
    }
    const disableModal = () => {
        updateBalance();
        setModalEnabled(false);
    }

    const enableOfframpModal = (url: string) => {
        updateBalance();
        setOfframpUrl(url);
        setOfframpModalEnabled(true);
        setModalEnabled(false);
    }

    const updateFinancialData = async () => {
        try {
            const response = await fetch('/api/solana-price');
            const data = await response.json();
            setSolPrice(data.solana.usd);

            setSolDailyRate(await getSolDailyEarnRate());
            setUsdcDailyRate(await getUsdcDailyBorrowRate());
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

    return (
        <main className={styles.maxHeight}>
            {modalEnabled && 
                <Modal {...modalData} />
            }

            {offrampModalEnabled &&
                <OfframpModal url={offrampUrl} closeModal={() => setOfframpModalEnabled(false)} />
            }

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
                        enableOfframpModal={enableOfframpModal}
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
                        enableOfframpModal={() => {}}
                    />
                }
            </div>
        </main>
    )
}