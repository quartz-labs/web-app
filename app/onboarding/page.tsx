"use client";

import { useAnchorWallet, useConnection } from '@solana/wallet-adapter-react';
import styles from './page.module.css';
import { useRouter } from 'next/navigation';
import { initAccount } from '@/utils/instructions';
import { useEffect, useState } from 'react';
import { hasBetaKey, isVaultClosed, isVaultInitialized } from '@/utils/helpers';
import Account from '@/components/Account/Account';
import { PuffLoader } from 'react-spinners';
import { useError } from '@/context/error-provider';
import { useTxStatus } from '@/context/tx-status-provider';

export default function Onboarding() {
    const { connection } = useConnection();
    const { showError } = useError();
    const { showTxStatus } = useTxStatus();
    const wallet = useAnchorWallet();
    const router = useRouter();

    const [userAuthed, setUserAuthed] = useState(false);
    const [awaitingSign, setAwaitingSign] = useState(false);
    const [checkboxes, setCheckboxes] = useState([false, false, false]);
    const [missingCheckboxes, setMissingCheckboxes] = useState([false, false, false]);
    const [attemptFailed, setAttemptFailed] = useState(false);
    
    useEffect(() => {
        const isLoggedIn = async () => {
            if (!wallet) router.push("/");
            else if (!await hasBetaKey(wallet.publicKey, showError)) router.push("/");
            else if (await isVaultClosed(connection, wallet.publicKey)) router.push("/account-closed");
            else if (await isVaultInitialized(connection, wallet.publicKey)) router.push("/dashboard");
            setUserAuthed(true);
        }
        isLoggedIn();
    }, [wallet, connection, router, showError]);

    const handleCheckboxChange = (index: number) => {
        const newCheckboxes = [...checkboxes];
        newCheckboxes[index] = !newCheckboxes[index];
        setCheckboxes(newCheckboxes);
    };

    const handleCreateAccount = async () => {
        if (!wallet || !userAuthed || awaitingSign) return;

        setMissingCheckboxes(checkboxes.map(checked => !checked));
        if (!checkboxes.every(checked => checked)) {
            setAttemptFailed(true);
            return;
        }

        setAttemptFailed(false);
        setAwaitingSign(true);
        
        const signature = await initAccount(wallet, connection, showError, showTxStatus);

        
        if (signature) router.push("/dashboard");
        else {
            if (!wallet || !await hasBetaKey(wallet.publicKey, showError)) router.push("/");
            else if (await isVaultClosed(connection, wallet.publicKey)) router.push("/account-closed");
            else if (await isVaultInitialized(connection, wallet.publicKey)) router.push("/dashboard");
            else setAwaitingSign(false);
        }
    };
    
    return (
        <main className={"two-col-grid"}>
            <Account />

            <div>
                <h1 className={styles.heading}>Acknowledge Terms</h1>
                <p className={styles.subheading}>Creating an account requires 0.053 SOL for rent which can be reclaimed if you ever decide to close your account.</p>

                <ul className={styles.checkboxes}>
                    <li>
                        <label className={missingCheckboxes[0] ? styles.missingLabel : ""}>
                            <input 
                                type="checkbox" 
                                checked={checkboxes[0]} 
                                onChange={() => handleCheckboxChange(0)} 
                            />
                            <span className={styles.checkboxText}>
                                I accept the <a href="https://docs.quartzpay.io/terms-and-conditions" target="_blank">terms and conditions</a>.
                            </span>
                        </label>
                    </li>

                    <li>
                        <label className={missingCheckboxes[1] ? styles.missingLabel : ""}>
                            <input 
                                type="checkbox" 
                                checked={checkboxes[1]} 
                                onChange={() => handleCheckboxChange(1)} 
                            />
                            <span className={styles.checkboxText}>
                                I accept the <a href="https://docs.quartzpay.io/privacy-policy" target="_blank">privacy policy</a>.
                            </span>
                        </label>
                    </li>

                    <li>
                        <label className={missingCheckboxes[2] ? styles.missingLabel : ""}>
                            <input 
                                type="checkbox" 
                                checked={checkboxes[2]} 
                                onChange={() => handleCheckboxChange(2)} 
                            />
                            <span className={styles.checkboxText}>
                                I have read and understood the <a href="https://docs.quartzpay.io/risks" target="_blank">protocol disclaimer</a>
                            </span>
                        </label>
                    </li>
                </ul>

                <button onClick={handleCreateAccount} className={`glass-button ${styles.mainButton}`}>
                    {awaitingSign &&
                        <PuffLoader
                            color={"#ffffff"}
                            size={30}
                            aria-label="Loading"
                            data-testid="loader"
                        />
                    }

                    {!awaitingSign &&
                        <p>Create Account</p>
                    }
                </button>

                {attemptFailed && 
                    <p className={styles.failMessage}>You must agree to all terms</p>
                }
            </div>
        </main>
    )
}