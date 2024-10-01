import { web3 } from "@coral-xyz/anchor";
import { PublicKey } from "@solana/web3.js";
import { DRIFT_PROGRAM_ID, FUNDS_PROGRAM_ID, USDC_MINT } from "./constants";
import { getUserAccountPublicKey } from "./driftHelpers";

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

export const getDriftPDAs = async (owner: PublicKey) => {
    const [vaultPda, _] = getVault(owner);

    const userPda = await getUserAccountPublicKey(
        new web3.PublicKey(DRIFT_PROGRAM_ID),
        vaultPda
    );

    const [userStatsPda] = web3.PublicKey.findProgramAddressSync(
        [Buffer.from("user_stats"), vaultPda.toBuffer()],
        new web3.PublicKey(DRIFT_PROGRAM_ID)
    );

    const [statePda] = web3.PublicKey.findProgramAddressSync(
        [Buffer.from("drift_state")],
        new web3.PublicKey(DRIFT_PROGRAM_ID)
    );

    return [userPda, userStatsPda, statePda];
}