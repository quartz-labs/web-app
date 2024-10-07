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


describe("withdraw_lamports tests", () => {
  let testSetup: Awaited<ReturnType<typeof setupTests>>;

  before(async () => {
    testSetup = await setupTests();
  });

  it("withdraw_lamports insufficient funds", async () => {
    const { program, vaultPda, ownerKeypair } = testSetup;

    const desiredErrorCode = "InsufficientFunds"
    const destinationAccount = Keypair.generate().publicKey;

    try {
      await program.methods
      .withdrawLamports(new anchor.BN(LAMPORTS_PER_SOL * 1000))
        .accounts({
          // @ts-ignore - Causing an issue in Cursor IDE
          vault: vaultPda, 
          receiver: destinationAccount,
          owner: ownerKeypair.publicKey,
          systemProgram: SystemProgram.programId
        })
        .signers([ownerKeypair])
        .rpc();

      assert.fail(0, 1, "withdraw_lamports instruction call should have failed")
    } catch(err) {
      expect(err).to.be.instanceOf(AnchorError)
      expect((err as AnchorError).error.errorCode.code).to.equal(desiredErrorCode)
    }
  })


  it("withdraw_lamports incorrect signature", async () => {
    const { provider, program, vaultPda, ownerKeypair, quartzManagerKeypair } = testSetup;

    const desiredErrorMessage = "Missing signature"
    const destinationAccount = Keypair.generate().publicKey;

    try {
      expect(
        await provider.connection.getBalance(destinationAccount)
      ).to.equal(0);

      // Send SOL to vaultPda
      const transaction = new Transaction().add(
        SystemProgram.transfer({
          fromPubkey: provider.wallet.publicKey,
          toPubkey: vaultPda,
          lamports: LAMPORTS_PER_SOL * 2,
        })
      )
      await provider.sendAndConfirm(transaction);

      // Call PDA to transfer SOL
      await program.methods
        .withdrawLamports(new anchor.BN(LAMPORTS_PER_SOL))
        .accounts({
          // @ts-ignore - Causing an issue in Cursor IDE
          vault: vaultPda, 
          receiver: destinationAccount,
          owner: ownerKeypair.publicKey,
          systemProgram: SystemProgram.programId
        })
        .signers([quartzManagerKeypair])
        .rpc();

      assert.fail(0, 1, "withdraw_lamports instruction call should have failed")
    } catch(err) {
      expect(err).to.be.instanceOf(Error);
      expect(err.message).to.include(desiredErrorMessage);
    }
  })


  it("withdraw_lamports incorrect owner", async () => {
    const { provider, program, vaultPda, ownerKeypair } = testSetup;
    const desiredErrorMessage = "unknown signer"
    const destinationAccount = Keypair.generate().publicKey;

    try {
      expect(
        await provider.connection.getBalance(destinationAccount)
      ).to.equal(0);

      // Send SOL to vaultPda
      const transaction = new Transaction().add(
        SystemProgram.transfer({
          fromPubkey: provider.wallet.publicKey,
          toPubkey: vaultPda,
          lamports: LAMPORTS_PER_SOL * 2,
        })
      )
      await provider.sendAndConfirm(transaction);

      // Call PDA to transfer SOL
      await program.methods
        .withdrawLamports(new anchor.BN(LAMPORTS_PER_SOL))
        .accounts({
          // @ts-ignore - Causing an issue in Cursor IDE
          vault: vaultPda, 
          receiver: destinationAccount,
          owner: Keypair.generate().publicKey,
          systemProgram: SystemProgram.programId
        })
        .signers([ownerKeypair])
        .rpc();

      assert.fail(0, 1, "withdraw_lamports instruction call should have failed")
    } catch(err) {
      expect(err).to.be.instanceOf(Error);
      expect(err.message).to.include(desiredErrorMessage);
    }
  })


  it("withdraw_lamports incorrect vaultPda", async () => {
    const { provider, program, vaultPda, ownerKeypair, otherKeypairVaultPda } = testSetup;
    const desiredErrorCode = "AccountNotInitialized"
    const destinationAccount = Keypair.generate().publicKey;

    try {
      expect(
        await provider.connection.getBalance(destinationAccount)
      ).to.equal(0);

      // Send SOL to vaultPda
      const transaction = new Transaction().add(
        SystemProgram.transfer({
          fromPubkey: provider.wallet.publicKey,
          toPubkey: vaultPda,
          lamports: LAMPORTS_PER_SOL * 2,
        })
      )
      await provider.sendAndConfirm(transaction);

      // Call PDA to transfer SOL
      await program.methods
        .withdrawLamports(new anchor.BN(LAMPORTS_PER_SOL))
        .accounts({
          // @ts-ignore - Causing an issue in Cursor IDE
          vault: otherKeypairVaultPda, 
          receiver: destinationAccount,
          owner: ownerKeypair.publicKey,
          systemProgram: SystemProgram.programId
        })
        .signers([ownerKeypair])
        .rpc();

      assert.fail(0, 1, "withdraw_lamports instruction call should have failed")
    } catch(err) {
      expect(err).to.be.instanceOf(Error);
      expect((err as AnchorError).error.errorCode.code).to.equal(desiredErrorCode);
    }
  })


  // TODO - Implement when doing mobile app
  // it("withdraw_lamports backup signature", async () => {
  //   const { provider, program, vaultPda, userKeypair, backupKeypair } = testSetup;
  //   const desiredErrorMessage = "unknown signer"
  //   const destinationAccount = Keypair.generate().publicKey;

  //   try {
  //     expect(
  //       await provider.connection.getBalance(destinationAccount)
  //     ).to.equal(0);

  //     // Send SOL to vaultPda
  //     const transaction = new Transaction().add(
  //       SystemProgram.transfer({
  //         fromPubkey: provider.wallet.publicKey,
  //         toPubkey: vaultPda,
  //         lamports: LAMPORTS_PER_SOL * 2,
  //       })
  //     )
  //     await provider.sendAndConfirm(transaction);

  //     // Call PDA to transfer SOL
  //     await program.methods
  //       .withdrawLamports(new anchor.BN(LAMPORTS_PER_SOL))
  //       .accounts({
  //         // @ts-ignore - Causing an issue in Cursor IDE
  //         vault: vaultPda, 
  //         receiver: destinationAccount,
  //         backup: backupKeypair.publicKey,
  //         user: userKeypair.publicKey,
  //         systemProgram: SystemProgram.programId
  //       })
  //       .signers([backupKeypair])
  //       .rpc();

  //     assert.fail(0, 1, "withdraw_lamports instruction call should have failed")
  //   } catch(err) {
  //     expect(err).to.be.instanceOf(Error);
  //     expect(err.message).to.include(desiredErrorMessage);
  //   }
  // })


  it("withdraw_lamports", async () => {
    const { provider, program, vaultPda, ownerKeypair } = testSetup;
    const destinationAccount = Keypair.generate().publicKey;
    expect(
      await provider.connection.getBalance(destinationAccount)
    ).to.equal(0);

    // Send SOL to vaultPda
    const transaction = new Transaction().add(
      SystemProgram.transfer({
        fromPubkey: provider.wallet.publicKey,
        toPubkey: vaultPda,
        lamports: LAMPORTS_PER_SOL * 2,
      })
    )
    await provider.sendAndConfirm(transaction);

    // Call PDA to transfer SOL
    await program.methods
      .withdrawLamports(new anchor.BN(LAMPORTS_PER_SOL))
      .accounts({
        // @ts-ignore - Causing an issue in Cursor IDE
        vault: vaultPda, 
        receiver: destinationAccount,
        owner: ownerKeypair.publicKey,
        systemProgram: SystemProgram.programId
      })
      .signers([ownerKeypair])
      .rpc();

    // Check SOL is received
    expect(
      await provider.connection.getBalance(destinationAccount)
    ).to.equal(LAMPORTS_PER_SOL)
  })
});
