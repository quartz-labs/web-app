import { useState } from "react";
import ModalDefaultContent from "../DefaultLayout/ModalDefaultContent";
import ModalInfoSection from "../DefaultLayout/ModalInfoSection";
import ModalButtons from "../DefaultLayout/ModalButtons";
import { useConnection } from "@solana/wallet-adapter-react";
import { useAnchorWallet } from "@solana/wallet-adapter-react";
import { useError } from "@/context/error-provider";
import { DECIMALS_SOL } from "@/utils/constants";
import { withdrawLamports } from "@/utils/instructions";
import { AccountData } from "@/utils/accountData";
import { useTxStatus } from "@/context/tx-status-provider";
import { uiToBaseUnit } from "@/utils/helpers";
import { baseUnitToUi } from "@/utils/helpers";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";

interface WithdrawSOLModalProps {
  accountData: AccountData | undefined;
  solPriceUSD: number | undefined;
  isValid: (
    amountBaseUnits: number,
    minAmountBaseUnits: number,
    maxAmountBaseUnits: number,
    minAmountUi: string,
    maxAmountUi: string,
  ) => string;
  closeModal: (signature?: string) => void;
}

export default function WithdrawSOLModal({ accountData, solPriceUSD, isValid, closeModal }: WithdrawSOLModalProps) {
  const { connection } = useConnection();
  const { showError } = useError();
  const { showTxStatus } = useTxStatus();
  const wallet = useAnchorWallet();

  const [awaitingSign, setAwaitingSign] = useState(false);
  const [errorText, setErrorText] = useState("");
  const [amountStr, setAmountStr] = useState("");
  const amount = Number(amountStr);

  const MIN_AMOUNT_BASE_UNITS = 0.00001 * LAMPORTS_PER_SOL;
  const maxAmountBaseUnits = accountData?.solWithdrawLimitBaseUnits ?? 0;

  const handleConfirm = async () => {
    const amountBaseUnits = uiToBaseUnit(amount, DECIMALS_SOL).toNumber();
    const error = isValid(
      amountBaseUnits,
      MIN_AMOUNT_BASE_UNITS,
      maxAmountBaseUnits,
      baseUnitToUi(MIN_AMOUNT_BASE_UNITS, DECIMALS_SOL),
      baseUnitToUi(maxAmountBaseUnits, DECIMALS_SOL),
    );

    setErrorText(error);
    if (error || !wallet) return;

    setAwaitingSign(true);
    const baseUnits = uiToBaseUnit(amount, DECIMALS_SOL).toNumber();
    const signature = await withdrawLamports(wallet, connection, baseUnits, showError, showTxStatus);
    setAwaitingSign(false);

    if (signature) closeModal(signature);
  };

  return (
    <>
      <ModalDefaultContent
        title="Withdraw SOL"
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
        {solPriceUSD !== undefined && (
          <p>
            ${(solPriceUSD * amount).toLocaleString("en-IE", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </p>
        )}
      </ModalInfoSection>

      <ModalButtons label="Withdraw" awaitingSign={awaitingSign} onConfirm={handleConfirm} onCancel={closeModal} />
    </>
  );
}
