import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import { FundsProgram } from "../target/types/funds_program";
import { Keypair } from "@solana/web3.js";
import dotenv from 'dotenv';
dotenv.config();

describe("funds-program", () => {
  // Configure the client to use the local cluster.
  const provider = anchor.AnchorProvider.env();
  anchor.setProvider(provider);

  const program = anchor.workspace.FundsProgram as Program<FundsProgram>;
  
  if (!process.env.QUARTZ_KEYPAIR) throw new Error("QUARTZ_KEYPAIR environment variable is not set");
  const quartzKeypair = Keypair.fromSecretKey(Uint8Array.from(JSON.parse(process.env.QUARTZ_KEYPAIR)));
  
  it("Initialize user account", async () => {
    // Create a random public key for the user
    const userKeypair = Keypair.generate();

    const [vault_pda] = anchor.web3.PublicKey.findProgramAddressSync(
      [Buffer.from("vault"), userKeypair.publicKey.toBuffer()],
      program.programId
    );

    try {
      const tx = await program.methods.initializeUser()
        .accounts({
          // @ts-ignore - Causing an issue in Cursor IDE, but works fine when running
          vault: vault_pda,
          quartz: quartzKeypair.publicKey,
          user: userKeypair.publicKey,
          systemProgram: anchor.web3.SystemProgram.programId,
        })
        .signers([quartzKeypair])
        .rpc();
      
      console.log("Transaction signature", tx);
    } catch (error) {
      console.error("Error initializing user account:", error);
      throw error;
    }
  });
});
