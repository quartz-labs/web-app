"use client";

import { useAnchorWallet, useConnection } from '@solana/wallet-adapter-react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Account from '@/components/Account/Account';
import MainView from '@/components/Views/MainView';
import LoanView from '@/components/Views/LoanView';
import styles from "./page.module.css";
import { useError } from '@/context/error-provider';
import Modal, { ModalVariation } from '@/components/Modals/Modal';
import { useQueryClient } from '@tanstack/react-query';
import { useDriftBalanceQuery, useDriftHealthQuery, useDriftRateQuery, useDriftWithdrawLimitQuery, useSolPriceQuery } from '@/utils/queries';
import { hasBetaKey, isVaultInitialized, isVaultClosed } from '@/utils/helpers';
import { TxStatus, useTxStatus } from '@/context/tx-status-provider';
import { captureError } from '@/utils/errors';
import { MAINTENANCE_MODE_RETURN_TIME } from '@/utils/constants';
import { Balance } from '@/interfaces/balance.interface';
import { fetchMaxDepositLamports } from '@/utils/maxDeposit';
import { fetchMaxDepositUsdc } from '@/utils/maxDeposit';

export interface ViewProps {
    solPrice?: number;
    balance?: Balance;
    rates?: Balance;
    swapView: () => void;
}

export default function Dashboard() {
    const { connection } = useConnection();
    const { showError } = useError();
    const { showTxStatus } = useTxStatus();
    const queryClient = useQueryClient();
    const wallet = useAnchorWallet();
    const router = useRouter();

    const [mainView, setMainView] = useState(true);
    const [modal, setModal] = useState(ModalVariation.Disabled);

    const { data: solPrice } = useSolPriceQuery();
    const { data: rateData } = useDriftRateQuery();
    const { data: balanceData } = useDriftBalanceQuery();
    const { data: withdrawLimitData } = useDriftWithdrawLimitQuery();
    const { data: healthData } = useDriftHealthQuery();

    const [maxDepositLamports, setMaxDepositLamports] = useState(0);
    const [maxDepositUsdc, setMaxDepositUsdc] = useState(0);

    useEffect(() => {
        const isLoggedIn = async () => {
            if (MAINTENANCE_MODE_RETURN_TIME !== "") router.push("/");

            if (!wallet) router.push("/");
            else if (!await hasBetaKey(wallet.publicKey, showError)) router.push("/");
            else if (await isVaultClosed(connection, wallet.publicKey)) router.push("/account-closed");
            else if (!await isVaultInitialized(connection, wallet.publicKey)) router.push("/onboarding");
        }
        isLoggedIn();
    }, [wallet, connection, router, showError]); 

    useEffect(() => {
        if (wallet?.publicKey) queryClient.invalidateQueries({ queryKey: ["drift-balance", "drift-withdraw-limit", "drift-health"] });
    }, [wallet?.publicKey, queryClient]);

    useEffect(() => {
        if (wallet) {
            fetchMaxDepositLamports(wallet, connection, showError).then(setMaxDepositLamports);
            fetchMaxDepositUsdc(wallet, connection).then(setMaxDepositUsdc);
        }
    }, [wallet, connection, showError]);

    const updateDriftUserData = async (signature?: string) => {
        if (signature) {
            try {
                await connection.confirmTransaction({ signature, ...(await connection.getLatestBlockhash()) }, "confirmed");
            } catch (error) {
                showTxStatus({status: TxStatus.TIMEOUT});
                captureError(showError, "Transaction timed out.", "utils: /instructions.ts", error, wallet?.publicKey, true);
            }
        }

        setTimeout(() => {
            queryClient.invalidateQueries({ queryKey: ["drift-balance"], refetchType: "all" });
            queryClient.invalidateQueries({ queryKey: ["drift-withdraw-limit"], refetchType: "all" });
            queryClient.invalidateQueries({ queryKey: ["drift-health"], refetchType: "all" });
        }, 750);
    };

    const handleCloseAccount = async (signature: string) => {
        try {
            await connection.confirmTransaction({ signature, ...(await connection.getLatestBlockhash()) }, "confirmed");
            router.push("/account-closed");
        } catch (error) {
            showTxStatus({status: TxStatus.TIMEOUT});
            captureError(showError, "Transaction timed out.", "utils: /instructions.ts", error, wallet?.publicKey, true);
        }
    }
    
    const onModalClose = (signature?: string, accountClosed?: boolean) => {
        if (accountClosed) {
            if (signature) handleCloseAccount(signature);
            return;
        }
        if (signature) updateDriftUserData(signature);
        setModal(ModalVariation.Disabled);
    }

    return (
        <main className={styles.maxHeight}>
            <Modal 
                variation={modal}
                solPriceUSD={solPrice}
                balance={balanceData}
                rates={rateData}
                withdrawLimits={withdrawLimitData}
                maxDepositLamports={maxDepositLamports}
                maxDepositUsdc={maxDepositUsdc}
                onClose={onModalClose} 
            />

            <div className="two-col-grid">
                <Account onCloseAccount={() => setModal(ModalVariation.CloseAccount)} />

                {mainView &&
                    <MainView
                        solPrice={solPrice}
                        balance={balanceData}
                        rates={rateData}
                        swapView={() => setMainView(false)}

                        handleDepositSol={() => setModal(ModalVariation.AddSOL)}
                        handleWithdrawSol={() => setModal(ModalVariation.WithdrawSOL)}
                        handleWithdrawUSDC={() => setModal(ModalVariation.WithdrawUSDC)}
                    />
                }

                {!mainView &&
                    <LoanView
                        solPrice={solPrice}
                        balance={balanceData}
                        rates={rateData}
                        swapView={() => setMainView(true)}

                        health={healthData}
                        handleRepayUsdc={() => setModal(ModalVariation.RepayUSDC)}
                        handleRepayUsdcWithCollateral={() => setModal(ModalVariation.RepayUSDCWithCollateral)}
                        handleTelegram={() => setModal(ModalVariation.Telegram)}
                    />
                }
            </div>
        </main>
    )
}