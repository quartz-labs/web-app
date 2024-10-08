import Image from "next/image";
import { WalletButton } from "../solana/solana-provider";

export default function Account() {
    return (
        <div style={{ gap: '80px' }}>
            <Image 
                className={"main-logo"}
                src="/logo.svg" 
                alt="Quartz" 
                width={360} 
                height={125}
            />

            <WalletButton />
      </div>
    )
}