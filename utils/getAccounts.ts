import { BN, web3 } from "@coral-xyz/anchor";
import { PublicKey } from "@solana/web3.js";
import { DRIFT_PROGRAM_ID, QUARTZ_PROGRAM_ID } from "./constants";

export const getVault = (owner: PublicKey) => {
    const [vault] = PublicKey.findProgramAddressSync(
        [Buffer.from("vault"), owner.toBuffer()],
        new PublicKey(QUARTZ_PROGRAM_ID)
    )
    return vault;
}

export const getVaultSpl = (vaultPda: PublicKey, mint: PublicKey) => {
    const [vaultWSol] = web3.PublicKey.findProgramAddressSync(
        [vaultPda.toBuffer(), mint.toBuffer()],
        QUARTZ_PROGRAM_ID
    );
    return vaultWSol;
}

export const getDriftUser = (authority: PublicKey) => {
    const [userPda] = web3.PublicKey.findProgramAddressSync(
        [
			Buffer.from("user"),
			authority.toBuffer(),
			new BN(0).toArrayLike(Buffer, 'le', 2),
		],
		DRIFT_PROGRAM_ID
    );
    return userPda;
}

export const getDriftUserStats = (authority: PublicKey) => {
    const [userStatsPda] = web3.PublicKey.findProgramAddressSync(
        [Buffer.from("user_stats"), authority.toBuffer()],
        DRIFT_PROGRAM_ID
    );
    return userStatsPda;
}

export const getDriftState = () => {
    const [statePda] = web3.PublicKey.findProgramAddressSync(
        [Buffer.from("drift_state")],
        DRIFT_PROGRAM_ID
    );
    return statePda; 
}

export const getDriftSpotMarketVault = (marketIndex: number) => {
    const [spotMarketVaultPda] = web3.PublicKey.findProgramAddressSync(
        [
            Buffer.from("spot_market_vault"), 
            new BN(marketIndex).toArrayLike(Buffer, 'le', 2)    
        ],
        DRIFT_PROGRAM_ID
    );
    return spotMarketVaultPda;
}

export const toRemainingAccount = (
    pubkey: PublicKey, 
    isWritable: boolean, 
    isSigner: boolean
) => {
    return { pubkey, isWritable, isSigner }
}
