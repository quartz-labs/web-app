import { useEffect, useState } from "react";
import ModalDefaultContent from "../DefaultLayout/ModalDefaultContent";
import ModalInfoSection from "../DefaultLayout/ModalInfoSection";
import ModalButtons from "../DefaultLayout/ModalButtons";
import { useConnection } from "@solana/wallet-adapter-react";
import { useAnchorWallet } from "@solana/wallet-adapter-react";
import { useError } from "@/context/error-provider";
import { DECIMALS_SOL } from "@/utils/constants";
import { uiToBaseUnit } from "@/utils/helpers";
import { depositLamports } from "@/utils/instructions";
import { BalanceInfo } from "@/utils/balance";

interface DepositSOLModalProps {
    balanceInfo: BalanceInfo
    apy: number | null;
    isValid: (amount: number, minAmount: number, maxAmount: number) => string;
    closeModal: (signature?: string) => void;
}

export default function DepositSOLModal(
    {balanceInfo, apy, isValid, closeModal} : DepositSOLModalProps
) {
    const { connection } = useConnection();
    const { showError } = useError();
    const wallet = useAnchorWallet();

    const [awaitingSign, setAwaitingSign] = useState(false);
    const [amount, setAmount] = useState(0);
    const [errorText, setErrorText] = useState("");
    const MIN_AMOUNT = 0.000001;

    const [maxDeposit, setMaxDeposit] = useState(0);
    useEffect(() => {
        const fetchMaxDeposit = async () => {
            if (!wallet) return;
            const balance = await connection.getBalance(wallet?.publicKey);
            setMaxDeposit(balance);
        }
        fetchMaxDeposit();
    }, [connection, wallet])

    const handleConfirm = async () => {
        const error = isValid(amount, MIN_AMOUNT, maxDeposit);
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
                amount={amount}
                setAmount={setAmount}
            />

            <ModalInfoSection 
                maxAmount={maxDeposit} 
                setAmount={setAmount}
                errorText={errorText}
            >
                {(balanceInfo.solPriceUSD !== null && apy !== null) &&
                    <p>${(balanceInfo.solPriceUSD * amount).toLocaleString('en-IE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} <span className="tiny-text">({apy * 100}% APY)</span></p>
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