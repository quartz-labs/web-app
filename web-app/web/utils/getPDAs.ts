import { BN, web3 } from "@coral-xyz/anchor";
import { PublicKey } from "@solana/web3.js";
import { DRIFT_PROGRAM_ID, FUNDS_PROGRAM_ID, USDC_MINT, WSOL_MINT } from "./constants";
import { ASSOCIATED_PROGRAM_ID } from "@coral-xyz/anchor/dist/cjs/utils/token";

export const getVault = (owner: PublicKey) => {
    const [vault] = web3.PublicKey.findProgramAddressSync(
        [Buffer.from("vault"), owner.toBuffer()],
        new web3.PublicKey(FUNDS_PROGRAM_ID)
    )
    return vault;
}

export const getVaultUsdc = (vaultPda: PublicKey) => {
    const [vaultUsdc] = web3.PublicKey.findProgramAddressSync(
        [vaultPda.toBuffer(), Buffer.from("usdc")],
        new web3.PublicKey(FUNDS_PROGRAM_ID)
    );
    return vaultUsdc;
}

export const getVaultWsol = (vaultPda: PublicKey) => {
    const [vaultWSol] = web3.PublicKey.findProgramAddressSync(
        [vaultPda.toBuffer(), Buffer.from("wsol")],
        new web3.PublicKey(FUNDS_PROGRAM_ID)
    );
    return vaultWSol;
}

export const getDriftUser = (vaultPda: PublicKey) => {
    const [userPda] = web3.PublicKey.findProgramAddressSync(
        [
			Buffer.from("user"),
			vaultPda.toBuffer(),
			new BN(0).toArrayLike(Buffer, 'le', 2),
		],
		DRIFT_PROGRAM_ID
    );
    return userPda;
}

export const getDriftUserStats = (vaultPda: PublicKey) => {
    const [userStatsPda] = web3.PublicKey.findProgramAddressSync(
        [Buffer.from("user_stats"), vaultPda.toBuffer()],
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
    )
    return spotMarketVaultPda;
}
