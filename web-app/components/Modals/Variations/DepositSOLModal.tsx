import { useEffect, useState } from "react";
import ModalDefaultContent from "../DefaultLayout/ModalDefaultContent";
import ModalInfoSection from "../DefaultLayout/ModalInfoSection";
import ModalButtons from "../DefaultLayout/ModalButtons";
import { useConnection } from "@solana/wallet-adapter-react";
import { useAnchorWallet } from "@solana/wallet-adapter-react";
import { useError } from "@/context/error-provider";
import { DECIMALS_SOL, MICRO_LAMPORTS_PER_LAMPORT } from "@/utils/constants";
import { getAccountsFromInstructions, uiToBaseUnit } from "@/utils/helpers";
import { depositLamports, makeDepositLamportsInstructions } from "@/utils/instructions";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import { captureError } from "@/utils/errors";
import { getPriorityFeeEstimate } from "@/utils/transactionSender";
import { AccountLayout } from "@solana/spl-token";
import { AccountData } from "@/utils/driftData";

interface DepositSOLModalProps {
    solPriceUSD: number | null;
    accountData: AccountData | null;
    isValid: (amount: number, minAmount: number, maxAmount: number) => string;
    closeModal: (signature?: string) => void;
}

export default function DepositSOLModal(
    {accountData, solPriceUSD, isValid, closeModal} : DepositSOLModalProps
) {
    const { connection } = useConnection();
    const { showError } = useError();
    const wallet = useAnchorWallet();

    const [awaitingSign, setAwaitingSign] = useState(false);
    const [errorText, setErrorText] = useState("");
    const [amountStr, setAmountStr] = useState("");
    const amount = Number(amountStr);

    const MIN_AMOUNT = 0.00001;

    const [maxDeposit, setMaxDeposit] = useState(0);
    useEffect(() => {
        const fetchMaxDeposit = async () => {
            if (!wallet) return;
            const balanceLamports = await connection.getBalance(wallet?.publicKey);

            const ataSize = AccountLayout.span;
            const wSolAtaRent = await connection.getMinimumBalanceForRentExemption(ataSize);
            
            try {
                const depositIxs = await makeDepositLamportsInstructions(wallet, connection, balanceLamports, showError);
                const accountKeys = await getAccountsFromInstructions(connection, depositIxs);

                const computeUnitPriceMicroLamports = await getPriorityFeeEstimate(accountKeys);
                const baseSignerFeeLamports = 5000;
                const priorityFeeLamports = (computeUnitPriceMicroLamports * 200_000 ) / MICRO_LAMPORTS_PER_LAMPORT;
                const maxDeposit = balanceLamports - (wSolAtaRent * 2) - (baseSignerFeeLamports + priorityFeeLamports);

                setMaxDeposit(maxDeposit / LAMPORTS_PER_SOL);
            } catch (error) {
                captureError(showError, "Could not calculate max SOL deposit value", "/DepositSOLModal.tsx", error, wallet.publicKey);
                setMaxDeposit(0);
            }
        }
        fetchMaxDeposit();
    }, [connection, wallet, showError]);

    const handleConfirm = async () => {
        const error = isValid(Number(amountStr), MIN_AMOUNT, maxDeposit);
        if (error) {
            setErrorText(error);
            return;
        };
        if (!wallet) return;

        setAwaitingSign(true);
        const baseUnits = uiToBaseUnit(amount, DECIMALS_SOL).toNumber();
        const signature = await depositLamports(wallet, connection, baseUnits, showError);
        setAwaitingSign(false);

        if (signature) closeModal(signature);
    }

    return (
        <>
            <ModalDefaultContent
                title="Deposit SOL"
                denomination="SOL"
                amountStr={amountStr}
                maxAmount={maxDeposit}
                maxDecimals={DECIMALS_SOL}
                setAmountStr={setAmountStr}
            />

            <ModalInfoSection 
                maxAmount={maxDeposit}
                minDecimals={0} 
                errorText={errorText}
            >
                {(solPriceUSD !== null && accountData !== null) &&
                    <p>${(solPriceUSD * amount).toLocaleString('en-IE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} <span className="tiny-text">({(accountData.solRate * 100).toFixed(4)}% APY)</span></p>
                }
            </ModalInfoSection>

            <ModalButtons 
                label="Deposit" 
                awaitingSign={awaitingSign} 
                onConfirm={handleConfirm} 
                onCancel={closeModal}
            />
        </>
    )
}