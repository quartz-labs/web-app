import Image from "next/image";
import { WalletButton } from "../solana/solana-provider";
import Logo from "../Logo/Logo";

export default function Account() {
    return (
        <div style={{ gap: '80px' }}>
            <Logo />

            <WalletButton />
      </div>
    )
}