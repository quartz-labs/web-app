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
import posthog from 'posthog-js';
import { useError } from '@/context/error-provider';
import { captureError } from '@/utils/errors';
import Modal, { ModalVariation } from '@/components/Modals/Modal';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { DRIFT_MARKET_INDEX_USDC, DRIFT_MARKET_INDEX_SOL } from '@/utils/constants';
import { getVault } from '@/utils/getAccounts';

export interface ViewProps {
    solPrice: number | undefined;
    accountData: AccountData | undefined;
    swapView: () => void;
}

export default function Dashboard() {
    const { connection } = useConnection();
    const { showError } = useError();
    const queryClient = useQueryClient();
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


    const { error: priceError, data: solPrice } = useQuery({
        queryKey: ['solPrice'],
        queryFn: async () => {
            const response = await fetch("/api/solana-price");
            return await response.json();
        },
        refetchInterval: 45_000
    });
    useEffect(() => {
        if (priceError) {
            captureError(showError, "Could not fetch SOL price", "./app/dashboard/page.tsx", priceError, wallet?.publicKey);
        }
    }, [priceError, showError, wallet]);


    const { error: driftError, data: driftData } = useQuery({
        queryKey: ['driftData'],
        queryFn: async () => {
            if (!wallet) return;

            const marketIndices = [DRIFT_MARKET_INDEX_SOL, DRIFT_MARKET_INDEX_USDC];
            const vault = getVault(wallet.publicKey);

            const response = await fetch(`/api/drift-data?address=${vault}&marketIndices=${marketIndices}`)
            const responseJson = await response.json();
            const data: AccountData = {
                solBalanceBaseUnits: responseJson.balances[0],
                usdcBalanceBaseUnits: Math.abs(responseJson.balances[1]),
                solWithdrawLimitBaseUnits: responseJson.withdrawLimits[0],
                usdcWithdrawLimitBaseUnits: responseJson.withdrawLimits[1],
                solRate: responseJson.rates[0].depositRate,
                usdcRate: responseJson.rates[1].borrowRate,
                health: responseJson.health
                };
            return data;
        },
        retry: 5,
        refetchInterval: 45_000
    })
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
                        handleTelegram={() => setModal(ModalVariation.Telegram)}
                    />
                }
            </div>
        </main>
    )
}