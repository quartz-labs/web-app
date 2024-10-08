"use client";

import { useAnchorWallet, useConnection } from '@solana/wallet-adapter-react';
import styles from './page.module.css';
import { useRouter } from 'next/navigation';
import { initAccount } from '@/utils/instructions';
import { useEffect, useState } from 'react';
import { isVaultInitialized } from '@/utils/utils';
import Account from '@/components/account/Account';

export default function Onboarding() {
    const { connection } = useConnection();
    const wallet = useAnchorWallet();
    const router = useRouter();

    useEffect(() => {
        const isLoggedIn = async () => {
          if (!wallet) router.push("/");
          else if (await isVaultInitialized(wallet, connection)) router.push("/dashboard");
        }
        isLoggedIn();
    }, [wallet]);

    const [awaitingSign, setAwaitingSign] = useState(false);

    const login = async () => {
        if (!wallet) return;
    
        setAwaitingSign(true);
        const signature = await initAccount(wallet, connection);
        if (signature) router.push("/dashboard");

        setAwaitingSign(false);
    }
    
    return (
        <main className={"two-col-grid"}>
            <Account />

            <div>
                
            </div>
        </main>
    )
}