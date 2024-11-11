"use client";

import { useAnchorWallet, useConnection } from '@solana/wallet-adapter-react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { hasBetaKey, isVaultInitialized } from '@/utils/helpers';
import Account from '@/components/Account/Account';
import MainView from '@/components/Views/MainView';
import LoanView from '@/components/Views/LoanView';
import styles from "./page.module.css";
import { AccountData } from '@/utils/accountData';
import { useError } from '@/context/error-provider';
import { captureError } from '@/utils/errors';
import Modal, { ModalVariation } from '@/components/Modals/Modal';
import { useQueryClient } from '@tanstack/react-query';
import { useDriftDataQuery, useSolPriceQuery } from '@/utils/queries';

export interface ViewProps {
    solPrice: number | undefined;
    accountData: AccountData | undefined;
    accountStale: boolean;
    swapView: () => void;
}

export default function Dashboard() {
    const { connection } = useConnection();
    const { showError } = useError();
    const queryClient = useQueryClient();
    const wallet = useAnchorWallet();
    const router = useRouter();

    const [mainView, setMainView] = useState(true);
    const [modal, setModal] = useState(ModalVariation.Disabled);


    useEffect(() => {
        const isLoggedIn = async () => {
            if (!wallet) router.push("/");
            else if (!await hasBetaKey(wallet.publicKey, showError)) router.push("/");
            else if (!await isVaultInitialized(connection, wallet.publicKey)) router.push("/onboarding");
        }
        isLoggedIn();
    }, [wallet, connection, router, showError]);


    // Fetch SOL price
    const { error: priceError, data: solPrice } = useSolPriceQuery();
    useEffect(() => {
        if (priceError) captureError(showError, "Could not fetch SOL price", "./app/dashboard/page.tsx", priceError, wallet?.publicKey);
    }, [priceError, showError, wallet]);
    
    // Fetch Drift data
    const { 
        isPending: driftPending, isStale: driftStale, error: driftError, data: driftData 
    } = useDriftDataQuery(wallet?.publicKey);
    useEffect(() => {
        if (driftError) captureError(showError, "Could not fetch Drift data", "./app/dashboard/page.tsx", driftError, wallet?.publicKey);
    }, [driftError, showError, wallet]);


    const updateDriftData = async (signature?: string) => {
        if(!wallet) return;

        if (signature) await connection.confirmTransaction({ signature, ...(await connection.getLatestBlockhash()) }, "finalized");

        queryClient.invalidateQueries({ queryKey: ['driftData'] });
    };

    
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
                        accountStale={driftStale || driftPending}
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
                        accountStale={driftStale || driftPending}
                        swapView={() => setMainView(true)}

                        handleRepayUsdc={() => setModal(ModalVariation.RepayUSDC)}
                        handleRepayUsdcWithCollateral={() => setModal(ModalVariation.RepayUSDCWithCollateral)}
                        handleTelegram={() => setModal(ModalVariation.Telegram)}
                    />
                }
            </div>
        </main>
    )
}