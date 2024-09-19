import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import { FundsProgram } from "../target/types/funds_program";
import { Keypair, SystemProgram, LAMPORTS_PER_SOL, Transaction, PublicKey } from "@solana/web3.js";
import { createMint, getOrCreateAssociatedTokenAccount, TOKEN_PROGRAM_ID, mintTo } from "@solana/spl-token";
import dotenv from 'dotenv';
import fs from "fs";
import path from "path";

dotenv.config();

let testUsdcMint: PublicKey | null = null;

export const setupTests = async () => {
  // Configure the client to use the local cluster.
  const provider = anchor.AnchorProvider.env();
  const connection = provider.connection;
  const wallet = anchor.workspace.FundsProgram.provider.wallet;
  anchor.setProvider(provider);

  const program = anchor.workspace.FundsProgram as Program<FundsProgram>;

  // Get Quartz keys
  const QUARTZ_HOLDING_ADDRESS = new PublicKey("5XY5pQbBjwv8ByBxKPNE7Xyb9dVcdFgd51xcxKDJjGWE");
  if (!process.env.QUARTZ_MANAGER_KEYPAIR) throw new Error("QUARTZ_MANAGER_KEYPAIR environment variable is not set");
  const quartzManagerKeypair = Keypair.fromSecretKey(Uint8Array.from(JSON.parse(process.env.QUARTZ_MANAGER_KEYPAIR)));

  // Test USDC mint
  const testUsdcKeypair = Keypair.fromSecretKey(new Uint8Array(JSON.parse(
    fs.readFileSync(path.resolve(__dirname, "./test-keys/envrJbV6GbhBTi8Pu6h9MwNViLuAmu3mFFRq7gE9Cp3.json"), "utf-8")
  )));
  
  // Generate random keypairs
  const backupKeypair = Keypair.generate();
  const userKeypair = Keypair.generate();
  const newUserKeypair = Keypair.generate();
  const otherBackupKeypair = Keypair.generate();
  const otherUserKeypair = Keypair.generate();

  // Other variables
  const CENT_PER_USDC = 2;

  // Create USDC mint only if it doesn't exist
  if (!testUsdcMint) {
    testUsdcMint = await createMint(
      connection,
      wallet.payer,
      testUsdcKeypair.publicKey,
      testUsdcKeypair.publicKey,
      2,
      testUsdcKeypair
    );
  }

  // PDAs
  const [vaultPda] = anchor.web3.PublicKey.findProgramAddressSync(
    [Buffer.from("vault"), backupKeypair.publicKey.toBuffer()],
    program.programId
  );
  const [vaultUsdcPda] = anchor.web3.PublicKey.findProgramAddressSync(
    [Buffer.from("vault"), backupKeypair.publicKey.toBuffer(), testUsdcKeypair.publicKey.toBuffer()],
    program.programId
  );
  const [otherKeypairVaultPda] = anchor.web3.PublicKey.findProgramAddressSync(
    [Buffer.from("vault"), otherBackupKeypair.publicKey.toBuffer()],
    program.programId
  );
  const [otherKeypairVaultUsdcPda] = anchor.web3.PublicKey.findProgramAddressSync(
    [Buffer.from("vault"), otherBackupKeypair.publicKey.toBuffer(), testUsdcKeypair.publicKey.toBuffer()],
    program.programId
  );

  // Initialise USDC ATA for QUARTZ_HOLDING_ADDRESS
  const quartzHoldingUsdc = (await getOrCreateAssociatedTokenAccount(
    connection,
    wallet.payer,
    testUsdcMint,
    QUARTZ_HOLDING_ADDRESS
  )).address;

  // Setup function to mint USDC to vault
  const mintUsdcToVault = async (amount: number) => {
    await mintTo(
      connection,
      wallet.payer,
      testUsdcMint,
      vaultUsdcPda,
      testUsdcKeypair,
      CENT_PER_USDC * amount
    );
  };

  // Perform initial setup
  await performInitialSetup();

  async function performInitialSetup() {
    // Top-up SOL for USDC mint authority
    const tx_UsdcMintTopup = new Transaction().add(
      SystemProgram.transfer({
        fromPubkey: wallet.publicKey,
        toPubkey: testUsdcKeypair.publicKey,
        lamports: LAMPORTS_PER_SOL * 1000,
      })
    );
    await provider.sendAndConfirm(tx_UsdcMintTopup);

    // Topup other keypair account with SOL
    const tx_otherKeypairTopup = new Transaction().add(
      SystemProgram.transfer({
        fromPubkey: wallet.publicKey,
        toPubkey: otherBackupKeypair.publicKey,
        lamports: LAMPORTS_PER_SOL * 10,
      })
    );
    await provider.sendAndConfirm(tx_otherKeypairTopup);

    // Init user
    await program.methods
      .initUser()
      .accounts({
        // @ts-ignore - Causing an issue in Cursor IDE
        vault: vaultPda,
        vaultUsdc: vaultUsdcPda,
        payer: quartzManagerKeypair.publicKey,
        backup: backupKeypair.publicKey,
        user: userKeypair.publicKey,
        usdcMint: testUsdcMint,
        tokenProgram: TOKEN_PROGRAM_ID,
        systemProgram: SystemProgram.programId,
      })
      .signers([quartzManagerKeypair])
      .rpc();
  }

  return {
    provider,
    connection,
    wallet,
    program,
    QUARTZ_HOLDING_ADDRESS,
    quartzManagerKeypair,
    testUsdcKeypair,
    testUsdcMint,
    quartzHoldingUsdc,
    backupKeypair,
    userKeypair,
    newUserKeypair,
    otherBackupKeypair,
    otherUserKeypair,
    vaultPda,
    vaultUsdcPda,
    otherKeypairVaultPda,
    otherKeypairVaultUsdcPda,
    CENT_PER_USDC,
    mintUsdcToVault,
  };
};