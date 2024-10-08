import { ViewProps } from "@/app/dashboard/page";
import { MICRO_CENTS_PER_USDC } from "@/utils/constants";
import { depositUsdc } from "@/utils/instructions";
import { useAnchorWallet, useConnection } from "@solana/wallet-adapter-react";

export default function LoanView({swapView, enableModal, disableModal} : ViewProps) {
    const { connection } = useConnection();
    const wallet = useAnchorWallet();

    const handleRepayUsdc = () => {
        enableModal({
            title: "Repay USDC Loan",
            denomination: "USDC",
            buttonText: "Repay",
            onConfirm: async (amount: number) => {
                if (!wallet) {
                    console.error("Error: Wallet not connected");
                    return;
                }
                const signature = await depositUsdc(wallet, connection, amount * MICRO_CENTS_PER_USDC);
                console.log(signature);
                if (signature) disableModal();
            },
            onCancel: () => { disableModal(); }
        })
    }

    return (<></>)
}