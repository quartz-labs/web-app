import * as anchor from "@coral-xyz/anchor";
import { Program, AnchorError } from "@coral-xyz/anchor";
import { FundsProgram } from "../target/types/funds_program";
import { Keypair, SystemProgram, LAMPORTS_PER_SOL, Transaction, PublicKey } from "@solana/web3.js";
import { createMint, getOrCreateAssociatedTokenAccount, TOKEN_PROGRAM_ID, mintTo, ASSOCIATED_TOKEN_PROGRAM_ID } from "@solana/spl-token";
import dotenv from 'dotenv';
const fs = require("fs");
import path from "path";
import { assert, expect } from "chai";
import { setupTests } from "../tests/setup_tests";
dotenv.config();


describe("spend_usdc tests", () => {
  let testSetup: Awaited<ReturnType<typeof setupTests>>;

  before(async () => {
    testSetup = await setupTests();
  });


  it("spend_usdc insufficient funds", async () => {
    const { program, vaultPda, vaultUsdcPda, backupKeypair, userKeypair, testUsdcMint, CENT_PER_USDC, QUARTZ_HOLDING_ADDRESS, quartzHoldingUsdc } = testSetup;
    const desiredErrorCode = "InsufficientFunds";

    // Call PDA to spend USDC without required funds
    try {
      const tx = await program.methods
        .spendUsdc(new anchor.BN(CENT_PER_USDC * 10000))  // Insufficient funds for transaction (instruction should fail)
        .accounts({
          // @ts-ignore - Causing an issue in Cursor IDE
          vault: vaultPda,
          vaultUsdc: vaultUsdcPda,
          quartzHolding: QUARTZ_HOLDING_ADDRESS,
          quartzHoldingUsdc: quartzHoldingUsdc,
          backup: backupKeypair.publicKey,
          user: userKeypair.publicKey,
          usdcMint: testUsdcMint,
          tokenProgram: TOKEN_PROGRAM_ID,
          associateTokenProgram: ASSOCIATED_TOKEN_PROGRAM_ID,
          systemProgram: SystemProgram.programId
        })
        .signers([userKeypair])
        .rpc();

      assert.fail(0, 1, "spend_usdc instruction call should have failed");
    } catch (err) {
      expect(err).to.be.instanceOf(AnchorError);
      expect((err as AnchorError).error.errorCode.code).to.equal(desiredErrorCode);
    }
  });

  it("spend_usdc mismatched ata owner", async () => {
    const { program, vaultPda, vaultUsdcPda, backupKeypair, userKeypair, testUsdcMint, connection, wallet, CENT_PER_USDC, mintUsdcToVault, QUARTZ_HOLDING_ADDRESS } = testSetup;
    const desiredErrorCode = "ConstraintTokenOwner";

    await mintUsdcToVault(10);

    // Initialize a random ATA
    const incorrectAta = (await getOrCreateAssociatedTokenAccount(
      connection,
      wallet.payer,
      testUsdcMint,
      Keypair.generate().publicKey
    )).address;

    // Call PDA to spend USDC
    try {
      const tx = await program.methods
        .spendUsdc(new anchor.BN(CENT_PER_USDC))
        .accounts({
          // @ts-ignore - Causing an issue in Cursor IDE
          vault: vaultPda,
          vaultUsdc: vaultUsdcPda,
          quartzHolding: QUARTZ_HOLDING_ADDRESS,
          quartzHoldingUsdc: incorrectAta,
          backup: backupKeypair.publicKey,
          user: userKeypair.publicKey,
          usdcMint: testUsdcMint,
          tokenProgram: TOKEN_PROGRAM_ID,
          associateTokenProgram: ASSOCIATED_TOKEN_PROGRAM_ID,
          systemProgram: SystemProgram.programId
        })
        .signers([userKeypair])
        .rpc();

      assert.fail(0, 1, "spend_usdc instruction call should have failed");
    } catch (err) {
      expect(err).to.be.instanceOf(AnchorError);
      expect((err as AnchorError).error.errorCode.code).to.equal(desiredErrorCode);
    }
  });

  it("spend_usdc mismatched mint receiver", async () => {
    const { 
      program, vaultPda, vaultUsdcPda, backupKeypair, userKeypair, testUsdcMint, connection, wallet, CENT_PER_USDC, mintUsdcToVault, QUARTZ_HOLDING_ADDRESS
    } = testSetup;
    const desiredErrorCode = "ConstraintAssociated";
    await mintUsdcToVault(10);

    const mintAuth = Keypair.generate();
    const incorrectMint = await createMint(
      connection,
      wallet.payer,
      mintAuth.publicKey,
      mintAuth.publicKey,
      2,
      Keypair.generate()
    );

    const quartzHoldingIncorrect = (await getOrCreateAssociatedTokenAccount(
      connection,
      wallet.payer,
      incorrectMint,
      QUARTZ_HOLDING_ADDRESS
    )).address;

    // Call PDA to spend USDC
    try {
      const tx = await program.methods
        .spendUsdc(new anchor.BN(CENT_PER_USDC))
        .accounts({
          // @ts-ignore - Causing an issue in Cursor IDE
          vault: vaultPda,
          vaultUsdc: vaultUsdcPda,
          quartzHolding: QUARTZ_HOLDING_ADDRESS,
          quartzHoldingUsdc: quartzHoldingIncorrect,
          backup: backupKeypair.publicKey,
          user: userKeypair.publicKey,
          usdcMint: testUsdcMint,
          tokenProgram: TOKEN_PROGRAM_ID,
          associateTokenProgram: ASSOCIATED_TOKEN_PROGRAM_ID,
          systemProgram: SystemProgram.programId
        })
        .signers([userKeypair])
        .rpc();

      assert.fail(0, 1, "spend_usdc instruction call should have failed");
    } catch (err) {
      expect(err).to.be.instanceOf(AnchorError);
      expect((err as AnchorError).error.errorCode.code).to.equal(desiredErrorCode);
    }
  });

  it("spend_usdc mismatched mint vault", async () => {
    const { 
      program, vaultPda, vaultUsdcPda, backupKeypair, userKeypair, quartzHoldingUsdc, QUARTZ_HOLDING_ADDRESS, connection, wallet, CENT_PER_USDC, mintUsdcToVault 
    } = testSetup;
    const desiredErrorCode = "ConstraintSeeds";
    await mintUsdcToVault(10);

    const mintAuth = Keypair.generate();
    const incorrectMint = await createMint(
      connection,
      wallet.payer,
      mintAuth.publicKey,
      mintAuth.publicKey,
      2,
      Keypair.generate()
    );

    // Call PDA to spend USDC
    try {
      const tx = await program.methods
        .spendUsdc(new anchor.BN(CENT_PER_USDC))
        .accounts({
          // @ts-ignore - Causing an issue in Cursor IDE
          vault: vaultPda,
          vaultUsdc: vaultUsdcPda,
          quartzHolding: QUARTZ_HOLDING_ADDRESS,
          quartzHoldingUsdc: quartzHoldingUsdc,
          backup: backupKeypair.publicKey,
          user: userKeypair.publicKey,
          usdcMint: incorrectMint,
          tokenProgram: TOKEN_PROGRAM_ID,
          associateTokenProgram: ASSOCIATED_TOKEN_PROGRAM_ID,
          systemProgram: SystemProgram.programId
        })
        .signers([userKeypair])
        .rpc();

      assert.fail(0, 1, "spend_usdc instruction call should have failed");
    } catch (err) {
      expect(err).to.be.instanceOf(AnchorError);
      expect((err as AnchorError).error.errorCode.code).to.equal(desiredErrorCode);
    }
  });

  it("spend_usdc incorrect signature", async () => {
    const { 
      program, vaultPda, vaultUsdcPda, backupKeypair, userKeypair, testUsdcMint, 
      QUARTZ_HOLDING_ADDRESS, quartzHoldingUsdc, CENT_PER_USDC, mintUsdcToVault, quartzManagerKeypair
     } = testSetup;
    const desiredErrorMessage = "Missing signature";
    await mintUsdcToVault(10);

    // Call PDA to spend USDC
    try {
      const tx = await program.methods
        .spendUsdc(new anchor.BN(CENT_PER_USDC))
        .accounts({
          // @ts-ignore - Causing an issue in Cursor IDE
          vault: vaultPda,
          vaultUsdc: vaultUsdcPda,
          quartzHolding: QUARTZ_HOLDING_ADDRESS,
          quartzHoldingUsdc: quartzHoldingUsdc,
          backup: backupKeypair.publicKey,
          user: userKeypair.publicKey,
          usdcMint: testUsdcMint,
          tokenProgram: TOKEN_PROGRAM_ID,
          associateTokenProgram: ASSOCIATED_TOKEN_PROGRAM_ID,
          systemProgram: SystemProgram.programId
        })
        .signers([quartzManagerKeypair])
        .rpc();

      assert.fail(0, 1, "spend_usdc instruction call should have failed");
    } catch (err) {
      expect(err).to.be.instanceOf(Error);
      expect(err.message).to.include(desiredErrorMessage);
    }
  });

  it("spend_usdc incorrect user", async () => {
    const { 
      program, vaultPda, vaultUsdcPda, backupKeypair, userKeypair, testUsdcMint, QUARTZ_HOLDING_ADDRESS, quartzHoldingUsdc, CENT_PER_USDC, mintUsdcToVault 
    } = testSetup;
    const desiredErrorMessage = "unknown signer";
    await mintUsdcToVault(10);

    // Call PDA to spend USDC
    try {
      const tx = await program.methods
        .spendUsdc(new anchor.BN(CENT_PER_USDC))
        .accounts({
          // @ts-ignore - Causing an issue in Cursor IDE
          vault: vaultPda,
          vaultUsdc: vaultUsdcPda,
          quartzHolding: QUARTZ_HOLDING_ADDRESS,
          quartzHoldingUsdc: quartzHoldingUsdc,
          backup: backupKeypair.publicKey,
          user: Keypair.generate().publicKey,
          usdcMint: testUsdcMint,
          tokenProgram: TOKEN_PROGRAM_ID,
          associateTokenProgram: ASSOCIATED_TOKEN_PROGRAM_ID,
          systemProgram: SystemProgram.programId
        })
        .signers([userKeypair])
        .rpc();

      assert.fail(0, 1, "spend_usdc instruction call should have failed");
    } catch (err) {
      expect(err).to.be.instanceOf(Error);
      expect(err.message).to.include(desiredErrorMessage);
    }
  });

  it("spend_usdc incorrect backup", async () => {
    const { 
      program, vaultPda, vaultUsdcPda, QUARTZ_HOLDING_ADDRESS, quartzHoldingUsdc, userKeypair, testUsdcMint, CENT_PER_USDC, mintUsdcToVault 
    } = testSetup;
    const desiredErrorCode = "ConstraintSeeds";
    await mintUsdcToVault(10);

    // Call PDA to spend USDC
    try {
      const tx = await program.methods
        .spendUsdc(new anchor.BN(CENT_PER_USDC))
        .accounts({
          // @ts-ignore - Causing an issue in Cursor IDE
          vault: vaultPda,
          vaultUsdc: vaultUsdcPda,
          quartzHolding: QUARTZ_HOLDING_ADDRESS,
          quartzHoldingUsdc: quartzHoldingUsdc,
          backup: Keypair.generate().publicKey,
          user: userKeypair.publicKey,
          usdcMint: testUsdcMint,
          tokenProgram: TOKEN_PROGRAM_ID,
          associateTokenProgram: ASSOCIATED_TOKEN_PROGRAM_ID,
          systemProgram: SystemProgram.programId
        })
        .signers([userKeypair])
        .rpc();

      assert.fail(0, 1, "spend_usdc instruction call should have failed");
    } catch (err) {
      expect(err).to.be.instanceOf(Error);
      expect((err as AnchorError).error.errorCode.code).to.equal(desiredErrorCode);
    }
  });


  it("spend_usdc incorrect vault pda", async () => {
    const { 
      program, vaultUsdcPda, backupKeypair, userKeypair, testUsdcMint, connection, wallet, 
      CENT_PER_USDC, mintUsdcToVault, otherKeypairVaultPda, QUARTZ_HOLDING_ADDRESS, quartzHoldingUsdc
    } = testSetup;
    const desiredErrorCode = "AccountNotInitialized";
    await mintUsdcToVault(10);

    // Call PDA to spend USDC
    try {
      const tx = await program.methods
        .spendUsdc(new anchor.BN(CENT_PER_USDC))
        .accounts({
          // @ts-ignore - Causing an issue in Cursor IDE
          vault: otherKeypairVaultPda,
          vaultUsdc: vaultUsdcPda,
          quartzHolding: QUARTZ_HOLDING_ADDRESS,
          quartzHoldingUsdc: quartzHoldingUsdc,
          backup: backupKeypair.publicKey,
          user: userKeypair.publicKey,
          usdcMint: testUsdcMint,
          tokenProgram: TOKEN_PROGRAM_ID,
          associateTokenProgram: ASSOCIATED_TOKEN_PROGRAM_ID,
          systemProgram: SystemProgram.programId
        })
        .signers([userKeypair])
        .rpc();

      assert.fail(0, 1, "spend_usdc instruction call should have failed");
    } catch (err) {
      expect(err).to.be.instanceOf(Error);
      expect((err as AnchorError).error.errorCode.code).to.equal(desiredErrorCode);
    }
  });

  it("spend_usdc incorrect vault ata pda", async () => {
    const { 
      program, vaultPda, backupKeypair, userKeypair, testUsdcMint, CENT_PER_USDC, mintUsdcToVault, otherKeypairVaultUsdcPda, QUARTZ_HOLDING_ADDRESS, quartzHoldingUsdc
    } = testSetup;
    const desiredErrorCode = "AccountNotInitialized";
    await mintUsdcToVault(10);

    // Call PDA to spend USDC
    try {
      const tx = await program.methods
        .spendUsdc(new anchor.BN(CENT_PER_USDC))
        .accounts({
          // @ts-ignore - Causing an issue in Cursor IDE
          vault: vaultPda,
          vaultUsdc: otherKeypairVaultUsdcPda,
          quartzHolding: QUARTZ_HOLDING_ADDRESS,
          quartzHoldingUsdc: quartzHoldingUsdc,
          backup: backupKeypair.publicKey,
          user: userKeypair.publicKey,
          usdcMint: testUsdcMint,
          tokenProgram: TOKEN_PROGRAM_ID,
          associateTokenProgram: ASSOCIATED_TOKEN_PROGRAM_ID,
          systemProgram: SystemProgram.programId
        })
        .signers([userKeypair])
        .rpc();

      assert.fail(0, 1, "spend_usdc instruction call should have failed");
    } catch (err) {
      expect(err).to.be.instanceOf(Error);
      expect((err as AnchorError).error.errorCode.code).to.equal(desiredErrorCode);
    }
  });

  it("spend_usdc backup signature", async () => {
    const { 
      program, vaultPda, vaultUsdcPda, backupKeypair, userKeypair, testUsdcMint, CENT_PER_USDC, mintUsdcToVault, QUARTZ_HOLDING_ADDRESS, quartzHoldingUsdc
    } = testSetup;
    const desiredErrorMessage = "unknown signer";
    await mintUsdcToVault(10);

    // Call PDA to spend USDC
    try {
      const tx = await program.methods
        .spendUsdc(new anchor.BN(CENT_PER_USDC))
        .accounts({
          // @ts-ignore - Causing an issue in Cursor IDE
          vault: vaultPda,
          vaultUsdc: vaultUsdcPda,
          quartzHolding: QUARTZ_HOLDING_ADDRESS,
          quartzHoldingUsdc: quartzHoldingUsdc,
          backup: backupKeypair.publicKey,
          user: userKeypair.publicKey,
          usdcMint: testUsdcMint,
          tokenProgram: TOKEN_PROGRAM_ID,
          associateTokenProgram: ASSOCIATED_TOKEN_PROGRAM_ID,
          systemProgram: SystemProgram.programId
        })
        .signers([backupKeypair])
        .rpc();

      assert.fail(0, 1, "spend_usdc instruction call should have failed");
    } catch (err) {
      expect(err).to.be.instanceOf(Error);
      expect(err.message).to.include(desiredErrorMessage);
    }
  });


  it("spend_usdc", async () => {
    const { 
      program, vaultPda, vaultUsdcPda, backupKeypair, userKeypair, testUsdcMint, connection, CENT_PER_USDC, mintUsdcToVault, QUARTZ_HOLDING_ADDRESS, quartzHoldingUsdc
    } = testSetup;
    await mintUsdcToVault(10);

    const initialBalance = Number(
      (await connection.getTokenAccountBalance(quartzHoldingUsdc)).value.amount
    );

    // Call PDA to spend USDC
    const tx = await program.methods
      .spendUsdc(new anchor.BN(CENT_PER_USDC))
      .accounts({
        // @ts-ignore - Causing an issue in Cursor IDE
        vault: vaultPda,
        vaultUsdc: vaultUsdcPda,
        quartzHolding: QUARTZ_HOLDING_ADDRESS,
        quartzHoldingUsdc: quartzHoldingUsdc,
        backup: backupKeypair.publicKey,
        user: userKeypair.publicKey,
        usdcMint: testUsdcMint,
        tokenProgram: TOKEN_PROGRAM_ID,
        associateTokenProgram: ASSOCIATED_TOKEN_PROGRAM_ID,
        systemProgram: SystemProgram.programId
      })
      .signers([userKeypair])
      .rpc();

    // Check USDC is received
    const newBalance = Number(
      (await connection.getTokenAccountBalance(quartzHoldingUsdc)).value.amount
    );
    expect(newBalance - initialBalance).to.equal(CENT_PER_USDC);
  });
});
