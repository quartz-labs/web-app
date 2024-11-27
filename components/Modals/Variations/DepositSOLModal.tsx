import { useEffect, useState } from "react";
import ModalDefaultContent from "../DefaultLayout/ModalDefaultContent";
import ModalInfoSection from "../DefaultLayout/ModalInfoSection";
import ModalButtons from "../DefaultLayout/ModalButtons";
import { useConnection } from "@solana/wallet-adapter-react";
import { useAnchorWallet } from "@solana/wallet-adapter-react";
import { useError } from "@/context/error-provider";
import { DECIMALS_SOL, MICRO_LAMPORTS_PER_LAMPORT } from "@/utils/constants";
import { baseUnitToUi, getAccountsFromInstructions, uiToBaseUnit } from "@/utils/helpers";
import { depositLamports, makeDepositLamportsInstructions } from "@/utils/instructions";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import { captureError } from "@/utils/errors";
import { getPriorityFeeEstimate } from "@/utils/transactionSender";
import { AccountLayout } from "@solana/spl-token";
import { useTxStatus } from "@/context/tx-status-provider";

interface DepositSOLModalProps {
    solPriceUSD?: number;
    solRate?: number;
    isValid: (amountBaseUnits: number, minAmountBaseUnits: number, maxAmountBaseUnits: number, minAmountUi: string, maxAmountUi: string) => string;
    closeModal: (signature?: string) => void;
}

export default function DepositSOLModal(
    {solPriceUSD, solRate, isValid, closeModal} : DepositSOLModalProps
) {
    const { connection } = useConnection();
    const { showError } = useError();
    const { showTxStatus } = useTxStatus();
    const wallet = useAnchorWallet();

    const [awaitingSign, setAwaitingSign] = useState(false);
    const [errorText, setErrorText] = useState("");
    const [amountStr, setAmountStr] = useState("");
    const amount = Number(amountStr);

    const MIN_AMOUNT_BASE_UNITS = 0.00001 * LAMPORTS_PER_SOL;

    const [maxAmountBaseUnits, setMaxDepositBaseUnits] = useState(0);
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

                setMaxDepositBaseUnits(Math.max(maxDeposit, 0));
            } catch (error) {
                captureError(showError, "Could not calculate max SOL deposit value", "/DepositSOLModal.tsx", error, wallet.publicKey);
                setMaxDepositBaseUnits(0);
            }
        }
        fetchMaxDeposit();
    }, [connection, wallet, showError]);

    const handleConfirm = async () => {
        const amountBaseUnits = uiToBaseUnit(amount, DECIMALS_SOL).toNumber();
        const error = isValid(
            amountBaseUnits, 
            MIN_AMOUNT_BASE_UNITS, 
            maxAmountBaseUnits, 
            baseUnitToUi(MIN_AMOUNT_BASE_UNITS, DECIMALS_SOL), 
            baseUnitToUi(maxAmountBaseUnits, DECIMALS_SOL)
        );

        setErrorText(error);
        if (error || !wallet) return;

        setAwaitingSign(true);
        const baseUnits = uiToBaseUnit(amount, DECIMALS_SOL).toNumber();
        const signature = await depositLamports(wallet, connection, baseUnits, showError, showTxStatus);
        setAwaitingSign(false);

        if (signature) closeModal(signature);
    }

    return (
        <>
            <ModalDefaultContent
                title="Deposit SOL"
                denomination="SOL"
                amountStr={amountStr}
                setAmountStr={setAmountStr}
                setMaxAmount={() => setAmountStr(baseUnitToUi(maxAmountBaseUnits, DECIMALS_SOL))}
                setHalfAmount={() => setAmountStr(baseUnitToUi(Math.trunc(maxAmountBaseUnits / 2), DECIMALS_SOL))}
            />

            <ModalInfoSection 
                maxAmountUi={Number(baseUnitToUi(maxAmountBaseUnits, DECIMALS_SOL))}
                minDecimals={0} 
                errorText={errorText}
            >
                {(solPriceUSD !== undefined) &&
                    <p>${(solPriceUSD * amount).toLocaleString('en-IE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} {(solRate !== undefined) &&
                        <span className="tiny-text">({(solRate * 100).toFixed(4)}% APY)</span>
                    }</p>
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