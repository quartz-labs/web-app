import { BN, web3 } from "@coral-xyz/anchor";
import { PublicKey } from "@solana/web3.js";
import { DRIFT_PROGRAM_ID, FUNDS_PROGRAM_ID, USDC_MINT } from "./constants";

export const getVault = (owner: PublicKey) => {
    const usdcMintPubkey = new web3.PublicKey(USDC_MINT);
    const [pda] = web3.PublicKey.findProgramAddressSync(
        [Buffer.from("vault"), owner.toBuffer()],
        new web3.PublicKey(FUNDS_PROGRAM_ID)
    )
    const [ata] = web3.PublicKey.findProgramAddressSync(
        [Buffer.from("vault"), owner.toBuffer(), usdcMintPubkey.toBuffer()],
        new web3.PublicKey(FUNDS_PROGRAM_ID)
    );
    return [pda, ata];
}

export const getDriftPDAs = (owner: PublicKey, marketIndex: number) => {
    const driftProgram = new web3.PublicKey(DRIFT_PROGRAM_ID);
    const [vaultPda, _] = getVault(owner);

    const [userPda] = web3.PublicKey.findProgramAddressSync(
        [
			Buffer.from("user"),
			vaultPda.toBuffer(),
			new BN(0).toArrayLike(Buffer, 'le', 2),
		],
		driftProgram
    );

    const [userStatsPda] = web3.PublicKey.findProgramAddressSync(
        [Buffer.from("user_stats"), vaultPda.toBuffer()],
        driftProgram
    );

    const [statePda] = web3.PublicKey.findProgramAddressSync(
        [Buffer.from("drift_state")],
        driftProgram
    );

    const [spotMarketVaultPda] = web3.PublicKey.findProgramAddressSync(
        [
            Buffer.from("spot_market_vault"), 
            Buffer.from(new Uint32Array([marketIndex]).buffer)
        ],
        driftProgram
    )


    return [userPda, userStatsPda, statePda, spotMarketVaultPda];
}