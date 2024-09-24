import * as anchor from "@coral-xyz/anchor";
import { Program, AnchorError } from "@coral-xyz/anchor";
import { FundsProgram } from "../target/types/funds_program";
import { Keypair, SystemProgram, LAMPORTS_PER_SOL, Transaction, PublicKey } from "@solana/web3.js";
import { createMint, getOrCreateAssociatedTokenAccount, TOKEN_PROGRAM_ID, mintTo, ASSOCIATED_TOKEN_PROGRAM_ID } from "@solana/spl-token";
import dotenv from 'dotenv';
const fs = require("fs");
import path from "path";
import { assert, expect } from "chai";
import { setupTests } from "./setup_tests";
dotenv.config();


describe("withdraw_usdc tests", () => {
  let testSetup: Awaited<ReturnType<typeof setupTests>>;

  before(async () => {
    testSetup = await setupTests();
  });

  it("withdraw_usdc insufficient funds", async () => {
    const { program, vaultPda, vaultUsdcPda, ownerKeypair, testUsdcMint, connection, wallet, CENT_PER_USDC, mintUsdcToVault } = testSetup;
    const desiredErrorCode = "InsufficientFunds";

    // Initialize a random ATA
    const destination = Keypair.generate().publicKey;
    const destinationAta = (await getOrCreateAssociatedTokenAccount(
      connection,
      wallet.payer,
      testUsdcMint,
      destination
    )).address;

    // Call PDA to spend USDC without required funds
    try {
      const tx = await program.methods
        .withdrawUsdc(new anchor.BN(CENT_PER_USDC * 10000))  // Insufficient funds for transaction (instruction should fail)
        .accounts({
          // @ts-ignore - Causing an issue in Cursor IDE
          vault: vaultPda,
          vaultUsdc: vaultUsdcPda,
          receiver: destination,
          receiverUsdc: destinationAta,
          owner: ownerKeypair.publicKey,
          usdcMint: testUsdcMint,
          tokenProgram: TOKEN_PROGRAM_ID,
          associateTokenProgram: ASSOCIATED_TOKEN_PROGRAM_ID,
          systemProgram: SystemProgram.programId
        })
        .signers([ownerKeypair])
        .rpc();

      assert.fail(0, 1, "withdraw_usdc instruction call should have failed");
    } catch (err) {
      expect(err).to.be.instanceOf(AnchorError);
      expect((err as AnchorError).error.errorCode.code).to.equal(desiredErrorCode);
    }
  });

  it("withdraw_usdc mismatched ata owner", async () => {
    const { program, vaultPda, vaultUsdcPda, ownerKeypair, testUsdcMint, connection, wallet, CENT_PER_USDC, mintUsdcToVault } = testSetup;
    const desiredErrorCode = "ConstraintTokenOwner";

    await mintUsdcToVault(10);

    // Initialize a random ATA
    const destination = Keypair.generate().publicKey;
    const incorrectAta = (await getOrCreateAssociatedTokenAccount(
      connection,
      wallet.payer,
      testUsdcMint,
      Keypair.generate().publicKey
    )).address;

    // Call PDA to spend USDC
    try {
      const tx = await program.methods
        .withdrawUsdc(new anchor.BN(CENT_PER_USDC))
        .accounts({
          // @ts-ignore - Causing an issue in Cursor IDE
          vault: vaultPda,
          vaultUsdc: vaultUsdcPda,
          receiver: destination,
          receiverUsdc: incorrectAta,
          owner: ownerKeypair.publicKey,
          usdcMint: testUsdcMint,
          tokenProgram: TOKEN_PROGRAM_ID,
          associateTokenProgram: ASSOCIATED_TOKEN_PROGRAM_ID,
          systemProgram: SystemProgram.programId
        })
        .signers([ownerKeypair])
        .rpc();

      assert.fail(0, 1, "withdraw_usdc instruction call should have failed");
    } catch (err) {
      expect(err).to.be.instanceOf(AnchorError);
      expect((err as AnchorError).error.errorCode.code).to.equal(desiredErrorCode);
    }
  });

  it("withdraw_usdc mismatched mint receiver", async () => {
    const { program, vaultPda, vaultUsdcPda, ownerKeypair, testUsdcMint, connection, wallet, CENT_PER_USDC, mintUsdcToVault } = testSetup;
    const desiredErrorCode = "ConstraintTokenMint";
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

    // Initialize a random ATA
    const destination = Keypair.generate().publicKey;
    const destinationAta = (await getOrCreateAssociatedTokenAccount(
      connection,
      wallet.payer,
      incorrectMint,
      destination
    )).address;

    // Call PDA to spend USDC
    try {
      const tx = await program.methods
        .withdrawUsdc(new anchor.BN(CENT_PER_USDC))
        .accounts({
          // @ts-ignore - Causing an issue in Cursor IDE
          vault: vaultPda,
          vaultUsdc: vaultUsdcPda,
          receiver: destination,
          receiverUsdc: destinationAta,
          owner: ownerKeypair.publicKey,
          usdcMint: testUsdcMint,
          tokenProgram: TOKEN_PROGRAM_ID,
          associateTokenProgram: ASSOCIATED_TOKEN_PROGRAM_ID,
          systemProgram: SystemProgram.programId
        })
        .signers([ownerKeypair])
        .rpc();

      assert.fail(0, 1, "withdraw_usdc instruction call should have failed");
    } catch (err) {
      expect(err).to.be.instanceOf(AnchorError);
      expect((err as AnchorError).error.errorCode.code).to.equal(desiredErrorCode);
    }
  });

  it("withdraw_usdc mismatched mint vault", async () => {
    const { program, vaultPda, vaultUsdcPda, ownerKeypair, testUsdcMint, connection, wallet, CENT_PER_USDC, mintUsdcToVault } = testSetup;
    const desiredErrorCode = "ConstraintTokenMint";
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

    // Initialize a random ATA
    const destination = Keypair.generate().publicKey;
    const destinationAta = (await getOrCreateAssociatedTokenAccount(
      connection,
      wallet.payer,
      testUsdcMint,
      destination
    )).address;

    // Call PDA to spend USDC
    try {
      const tx = await program.methods
        .withdrawUsdc(new anchor.BN(CENT_PER_USDC))
        .accounts({
          // @ts-ignore - Causing an issue in Cursor IDE
          vault: vaultPda,
          vaultUsdc: vaultUsdcPda,
          receiver: destination,
          receiverUsdc: destinationAta,
          owner: ownerKeypair.publicKey,
          usdcMint: incorrectMint,
          tokenProgram: TOKEN_PROGRAM_ID,
          associateTokenProgram: ASSOCIATED_TOKEN_PROGRAM_ID,
          systemProgram: SystemProgram.programId
        })
        .signers([ownerKeypair])
        .rpc();

      assert.fail(0, 1, "withdraw_usdc instruction call should have failed");
    } catch (err) {
      expect(err).to.be.instanceOf(AnchorError);
      expect((err as AnchorError).error.errorCode.code).to.equal(desiredErrorCode);
    }
  });

  it("withdraw_usdc incorrect signature", async () => {
    const { program, vaultPda, vaultUsdcPda, ownerKeypair, testUsdcMint, connection, wallet, CENT_PER_USDC, mintUsdcToVault, quartzManagerKeypair } = testSetup;
    const desiredErrorMessage = "Missing signature";
    await mintUsdcToVault(10);

    // Initialize a random ATA
    const destination = Keypair.generate().publicKey;
    const destinationAta = (await getOrCreateAssociatedTokenAccount(
      connection,
      wallet.payer,
      testUsdcMint,
      destination
    )).address;

    // Call PDA to spend USDC
    try {
      const tx = await program.methods
        .withdrawUsdc(new anchor.BN(CENT_PER_USDC))
        .accounts({
          // @ts-ignore - Causing an issue in Cursor IDE
          vault: vaultPda,
          vaultUsdc: vaultUsdcPda,
          receiver: destination,
          receiverUsdc: destinationAta,
          owner: ownerKeypair.publicKey,
          usdcMint: testUsdcMint,
          tokenProgram: TOKEN_PROGRAM_ID,
          associateTokenProgram: ASSOCIATED_TOKEN_PROGRAM_ID,
          systemProgram: SystemProgram.programId
        })
        .signers([quartzManagerKeypair])
        .rpc();

      assert.fail(0, 1, "withdraw_usdc instruction call should have failed");
    } catch (err) {
      expect(err).to.be.instanceOf(Error);
      expect(err.message).to.include(desiredErrorMessage);
    }
  });

  it("withdraw_usdc incorrect owner", async () => {
    const { program, vaultPda, vaultUsdcPda, ownerKeypair, testUsdcMint, connection, wallet, CENT_PER_USDC, mintUsdcToVault } = testSetup;
    const desiredErrorMessage = "unknown signer";
    await mintUsdcToVault(10);

    // Initialize a random ATA
    const destination = Keypair.generate().publicKey;
    const destinationAta = (await getOrCreateAssociatedTokenAccount(
      connection,
      wallet.payer,
      testUsdcMint,
      destination
    )).address;

    // Call PDA to spend USDC
    try {
      const tx = await program.methods
        .withdrawUsdc(new anchor.BN(CENT_PER_USDC))
        .accounts({
          // @ts-ignore - Causing an issue in Cursor IDE
          vault: vaultPda,
          vaultUsdc: vaultUsdcPda,
          receiver: destination,
          receiverUsdc: destinationAta,
          owner: Keypair.generate().publicKey,
          usdcMint: testUsdcMint,
          tokenProgram: TOKEN_PROGRAM_ID,
          associateTokenProgram: ASSOCIATED_TOKEN_PROGRAM_ID,
          systemProgram: SystemProgram.programId
        })
        .signers([ownerKeypair])
        .rpc();

      assert.fail(0, 1, "withdraw_usdc instruction call should have failed");
    } catch (err) {
      expect(err).to.be.instanceOf(Error);
      expect(err.message).to.include(desiredErrorMessage);
    }
  });

  // TODO - Implement when doing mobile app
  // it("withdraw_usdc incorrect backup", async () => {
  //   const { program, vaultPda, vaultUsdcPda, backupKeypair, userKeypair, testUsdcMint, connection, wallet, CENT_PER_USDC, mintUsdcToVault } = testSetup;
  //   const desiredErrorCode = "ConstraintSeeds";
  //   await mintUsdcToVault(10);

  //   // Initialize a random ATA
  //   const destination = Keypair.generate().publicKey;
  //   const destinationAta = (await getOrCreateAssociatedTokenAccount(
  //     connection,
  //     wallet.payer,
  //     testUsdcMint,
  //     destination
  //   )).address;

  //   // Call PDA to spend USDC
  //   try {
  //     const tx = await program.methods
  //       .withdrawUsdc(new anchor.BN(CENT_PER_USDC))
  //       .accounts({
  //         // @ts-ignore - Causing an issue in Cursor IDE
  //         vault: vaultPda,
  //         vaultUsdc: vaultUsdcPda,
  //         receiver: destination,
  //         receiverUsdc: destinationAta,
  //         backup: Keypair.generate().publicKey,
  //         user: userKeypair.publicKey,
  //         usdcMint: testUsdcMint,
  //         tokenProgram: TOKEN_PROGRAM_ID,
  //         associateTokenProgram: ASSOCIATED_TOKEN_PROGRAM_ID,
  //         systemProgram: SystemProgram.programId
  //       })
  //       .signers([userKeypair])
  //       .rpc();

  //     assert.fail(0, 1, "withdraw_usdc instruction call should have failed");
  //   } catch (err) {
  //     expect(err).to.be.instanceOf(Error);
  //     expect((err as AnchorError).error.errorCode.code).to.equal(desiredErrorCode);
  //   }
  // });

  it("withdraw_usdc incorrect vault pda", async () => {
    const { program, vaultPda, vaultUsdcPda, ownerKeypair, testUsdcMint, connection, wallet, CENT_PER_USDC, mintUsdcToVault, otherKeypairVaultPda } = testSetup;
    const desiredErrorCode = "AccountNotInitialized";
    await mintUsdcToVault(10);

    // Initialize a random ATA
    const destination = Keypair.generate().publicKey;
    const destinationAta = (await getOrCreateAssociatedTokenAccount(
      connection,
      wallet.payer,
      testUsdcMint,
      destination
    )).address;

    // Call PDA to spend USDC
    try {
      const tx = await program.methods
        .withdrawUsdc(new anchor.BN(CENT_PER_USDC))
        .accounts({
          // @ts-ignore - Causing an issue in Cursor IDE
          vault: otherKeypairVaultPda,
          vaultUsdc: vaultUsdcPda,
          receiver: destination,
          receiverUsdc: destinationAta,
          owner: ownerKeypair.publicKey,
          usdcMint: testUsdcMint,
          tokenProgram: TOKEN_PROGRAM_ID,
          associateTokenProgram: ASSOCIATED_TOKEN_PROGRAM_ID,
          systemProgram: SystemProgram.programId
        })
        .signers([ownerKeypair])
        .rpc();

      assert.fail(0, 1, "withdraw_usdc instruction call should have failed");
    } catch (err) {
      expect(err).to.be.instanceOf(Error);
      expect((err as AnchorError).error.errorCode.code).to.equal(desiredErrorCode);
    }
  });

  it("withdraw_usdc incorrect vault ata pda", async () => {
    const { program, vaultPda, vaultUsdcPda, ownerKeypair, testUsdcMint, connection, wallet, CENT_PER_USDC, mintUsdcToVault, otherKeypairVaultUsdcPda } = testSetup;
    const desiredErrorCode = "AccountNotInitialized";
    await mintUsdcToVault(10);

    // Initialize a random ATA
    const destination = Keypair.generate().publicKey;
    const destinationAta = (await getOrCreateAssociatedTokenAccount(
      connection,
      wallet.payer,
      testUsdcMint,
      destination
    )).address;

    // Call PDA to spend USDC
    try {
      const tx = await program.methods
        .withdrawUsdc(new anchor.BN(CENT_PER_USDC))
        .accounts({
          // @ts-ignore - Causing an issue in Cursor IDE
          vault: vaultPda,
          vaultUsdc: otherKeypairVaultUsdcPda,
          receiver: destination,
          receiverUsdc: destinationAta,
          owner: ownerKeypair.publicKey,
          usdcMint: testUsdcMint,
          tokenProgram: TOKEN_PROGRAM_ID,
          associateTokenProgram: ASSOCIATED_TOKEN_PROGRAM_ID,
          systemProgram: SystemProgram.programId
        })
        .signers([ownerKeypair])
        .rpc();

      assert.fail(0, 1, "withdraw_usdc instruction call should have failed");
    } catch (err) {
      expect(err).to.be.instanceOf(Error);
      expect((err as AnchorError).error.errorCode.code).to.equal(desiredErrorCode);
    }
  });

  // TODO - Implement when doing mobile app
  // it("withdraw_usdc backup signature", async () => {
  //   const { program, vaultPda, vaultUsdcPda, backupKeypair, userKeypair, testUsdcMint, connection, wallet, CENT_PER_USDC, mintUsdcToVault } = testSetup;
  //   const desiredErrorMessage = "unknown signer";
  //   await mintUsdcToVault(10);

  //   // Initialize a random ATA
  //   const destination = Keypair.generate().publicKey;
  //   const destinationAta = (await getOrCreateAssociatedTokenAccount(
  //     connection,
  //     wallet.payer,
  //     testUsdcMint,
  //     destination
  //   )).address;

  //   // Call PDA to spend USDC
  //   try {
  //     const tx = await program.methods
  //       .withdrawUsdc(new anchor.BN(CENT_PER_USDC))
  //       .accounts({
  //         // @ts-ignore - Causing an issue in Cursor IDE
  //         vault: vaultPda,
  //         vaultUsdc: vaultUsdcPda,
  //         receiver: destination,
  //         receiverUsdc: destinationAta,
  //         backup: backupKeypair.publicKey,
  //         user: userKeypair.publicKey,
  //         usdcMint: testUsdcMint,
  //         tokenProgram: TOKEN_PROGRAM_ID,
  //         associateTokenProgram: ASSOCIATED_TOKEN_PROGRAM_ID,
  //         systemProgram: SystemProgram.programId
  //       })
  //       .signers([backupKeypair])
  //       .rpc();

  //     assert.fail(0, 1, "withdraw_usdc instruction call should have failed");
  //   } catch (err) {
  //     expect(err).to.be.instanceOf(Error);
  //     expect(err.message).to.include(desiredErrorMessage);
  //   }
  // });

  it("withdraw_usdc", async () => {
    const { program, vaultPda, vaultUsdcPda, ownerKeypair, testUsdcMint, connection, wallet, CENT_PER_USDC, mintUsdcToVault } = testSetup;
    await mintUsdcToVault(10);

    // Initialize a random ATA
    const destination = Keypair.generate().publicKey;
    const destinationAta = (await getOrCreateAssociatedTokenAccount(
      connection,
      wallet.payer,
      testUsdcMint,
      destination
    )).address;

    // Call PDA to spend USDC
    const tx = await program.methods
      .withdrawUsdc(new anchor.BN(CENT_PER_USDC))
      .accounts({
        // @ts-ignore - Causing an issue in Cursor IDE
        vault: vaultPda,
        vaultUsdc: vaultUsdcPda,
        receiver: destination,
        receiverUsdc: destinationAta,
        owner: ownerKeypair.publicKey,
        usdcMint: testUsdcMint,
        tokenProgram: TOKEN_PROGRAM_ID,
        associateTokenProgram: ASSOCIATED_TOKEN_PROGRAM_ID,
        systemProgram: SystemProgram.programId
      })
      .signers([ownerKeypair])
      .rpc();

    // Check USDC is received
    const balance = Number(
      (await connection.getTokenAccountBalance(destinationAta)).value.amount
    );
    expect(balance).to.equal(CENT_PER_USDC);
  });
});
