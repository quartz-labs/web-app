"use client";

import { useAnchorWallet, useConnection } from '@solana/wallet-adapter-react';
import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import { hasBetaKey, isVaultInitialized } from '@/utils/helpers';
import Account from '@/components/Account/Account';
import MainView from '@/components/MainView/MainView';
import LoanView from '@/components/LoanView/LoanView';
import styles from "./page.module.css";
import { fetchDriftData, AccountData } from '@/utils/driftData';
import posthog from 'posthog-js';
import { useError } from '@/context/error-provider';
import { captureError } from '@/utils/errors';
import Modal, { ModalVariation } from '@/components/Modals/Modal';

export interface ViewProps {
    solPrice: number | null;
    accountData: AccountData | null;
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
    const [driftData, setDriftData] = useState<AccountData | null>(null);

    const updateDriftData = useCallback(async (signature?: string) => {
        if(!wallet) return;

        if (signature) {
            setDriftData(null);
            await connection.confirmTransaction({ signature, ...(await connection.getLatestBlockhash()) }, "finalized");
        }

        try {
            const data = await fetchDriftData(wallet.publicKey)
            setDriftData(data);
        } catch (error) {
            captureError(showError, "Could not fetch Drift rates", "./app/dashboard/page.tsx", error, wallet?.publicKey);
        }
    }, [showError, wallet, connection]);
    
    useEffect(() => {
        const updateSolPrice = async() => {
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
            } catch (error) {
                captureError(showError, "Could not fetch SOL price", "./app/dashboard/page.tsx", error, wallet?.publicKey);
            }
        }

        updateSolPrice();
        updateDriftData();

        const interval = setInterval(() => {
            updateSolPrice();
            updateDriftData();
        }, 30_000);
        return () => clearInterval(interval);
    }, [showError, wallet, updateDriftData]);

    const onModalClose = (signature?: string) => {
        if (signature) updateDriftData(signature);
        setModal(ModalVariation.Disabled);
    }

    return (
        <main className={styles.maxHeight}>
            <Modal 
                variation={modal}
                accountData={driftData}
                solPriceUSD={solPrice}
                onClose={onModalClose} 
            />

            <div className="two-col-grid">
                <Account />

                {mainView &&
                    <MainView
                        solPrice={solPrice}
                        accountData={driftData}
                        swapView={() => setMainView(false)}

                        handleDepositSol={() => setModal(ModalVariation.DepositSOL)}
                        handleWithdrawSol={() => setModal(ModalVariation.WithdrawSOL)}
                        handleWithdrawUSDC={() => setModal(ModalVariation.WithdrawUSDC)}
                    />
                }

                {!mainView &&
                    <LoanView
                        solPrice={solPrice}
                        accountData={driftData}
                        swapView={() => setMainView(true)}

                        handleRepayUsdc={() => setModal(ModalVariation.RepayUSDC)}
                        handleRepayUsdcWithCollateral={() => setModal(ModalVariation.RepayUSDCWithCollateral)}
                    />
                }
            </div>
        </main>
    )
}