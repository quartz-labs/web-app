"use client";

import { useAnchorWallet, useConnection } from '@solana/wallet-adapter-react';
import styles from './page.module.css';
import { useRouter } from 'next/navigation';
import { initAccount } from '@/utils/instructions';
import { useEffect, useState } from 'react';
import { isVaultInitialized } from '@/utils/utils';
import Account from '@/components/Account/Account';
import Link from 'next/link';

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
    const [checkboxes, setCheckboxes] = useState([false, false, false, false]);
    const [missingCheckboxes, setMissingCheckboxes] = useState([false, false, false, false]);
    const [attemptFailed, setAttemptFailed] = useState(false);

    const handleCheckboxChange = (index: number) => {
        const newCheckboxes = [...checkboxes];
        newCheckboxes[index] = !newCheckboxes[index];
        setCheckboxes(newCheckboxes);
    };

    const handleCreateAccount = async () => {
        if (!wallet || awaitingSign) return;

        setMissingCheckboxes(checkboxes.map(checked => !checked));
        if (!checkboxes.every(checked => checked)) {
            setAttemptFailed(true);
            return;
        }

        setAttemptFailed(false);
        setAwaitingSign(true);
        
        const signature = await initAccount(wallet, connection);
        if (signature) router.push("/dashboard");
    };
    
    return (
        <main className={"two-col-grid"}>
            <Account />

            <div>
                <h1 className={styles.heading}>Acknowledge Terms</h1>
                <p className={styles.subheading}>We use Drift's lending protocol for yield and borrowing</p>

                <ul className={styles.checkboxes}>
                    <li>
                        <label className={missingCheckboxes[0] ? styles.missingLabel : ""}>
                            <input 
                                type="checkbox" 
                                checked={checkboxes[0]} 
                                onChange={() => handleCheckboxChange(0)} 
                            />
                            <span className={styles.checkboxText}>
                                I agree to <a href="https://docs.drift.trade/legal-and-regulations/terms-of-use" target="_blank">Drift's terms and conditions</a>
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
                                I have read and understood <a href="https://docs.drift.trade/legal-and-regulations/disclaimer" target="_blank">Drift's protocol disclaimer</a>
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
                                I understand that my SOL deposits will liquidate for USDT if their value drops below the 80% margin requirement on loans
                            </span>
                        </label>
                    </li>

                    <li>
                        <label className={missingCheckboxes[3] ? styles.missingLabel : ""}>
                            <input 
                                type="checkbox" 
                                checked={checkboxes[3]} 
                                onChange={() => handleCheckboxChange(3)} 
                            />
                            <span className={styles.checkboxText}>
                                I understand that this is an un-audited demo application and I will only deposit funds I am willing to lose
                            </span>
                        </label>
                    </li>
                </ul>

                <button onClick={handleCreateAccount} className={"glass-button font-small"}>
                    {awaitingSign ? "Loading..." : "Create Account"}
                </button>

                {attemptFailed && 
                    <p className={styles.failMessage}>You must agree to all terms</p>
                }
            </div>
        </main>
    )
}