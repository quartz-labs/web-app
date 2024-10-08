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

export interface ViewProps {
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

    const enableModal = (data: ModalProps) => {
        setModalData(data);
        setModalEnabled(true);
    }
    const disableModal = () => setModalEnabled(false);

    const enableOfframpModal = (url: string) => {
        setOfframpUrl(url);
        setOfframpModalEnabled(true);
        setModalEnabled(false);
    }

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
                        swapView={() => setMainView(false)}
                        enableModal={enableModal}
                        disableModal={disableModal}
                        enableOfframpModal={enableOfframpModal}
                    />
                }

                {!mainView &&
                    <LoanView 
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