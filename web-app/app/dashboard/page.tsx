"use client";

import { useAnchorWallet, useConnection } from '@solana/wallet-adapter-react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { isVaultInitialized } from '@/utils/utils';
import Modal, { ModalProps } from '@/components/Modal/Modal';
import Account from '@/components/Account/Account';
import MainView from '@/components/MainView/MainView';
import LoanView from '@/components/LoanView/LoanView';

export interface ViewProps {
    swapView: () => void;
    enableModal: (data: ModalProps) => void;
    disableModal: () => void;
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
        onConfirm: (amount: number) => {},
        onCancel: () => {}
    });

    const enableModal = (data: ModalProps) => {
        setModalData(data);
        setModalEnabled(true);
    }
    const disableModal = () => setModalEnabled(false);

    return (
        <main>
            {modalEnabled && (
                <Modal {...modalData} />
            )}

            <div className="two-col-grid">
                <Account />
                
                {mainView &&
                    <MainView 
                        swapView={() => setMainView(false)}
                        enableModal={enableModal}
                        disableModal={disableModal}
                    />
                }

                {!mainView &&
                    <LoanView 
                        swapView={() => setMainView(true)}
                        enableModal={enableModal}
                        disableModal={disableModal}
                    />
                }
            </div>
        </main>
    )
}