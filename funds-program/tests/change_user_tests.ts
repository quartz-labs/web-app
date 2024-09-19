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


describe("change_user tests", () => {
  let testSetup: Awaited<ReturnType<typeof setupTests>>;

  before(async () => {
    testSetup = await setupTests();
  });
  

  it("change_user incorrect signature", async () => {
    const {program, vaultPda, backupKeypair, newUserKeypair, quartzManagerKeypair} = testSetup;
    const desiredErrorMessage = "Missing signature"

    try {
      await program.methods
        .changeUser()
        .accounts({
          // @ts-ignore - Causing an issue in Cursor IDE
          vault: vaultPda,
          backup: backupKeypair.publicKey,
          newUser: newUserKeypair.publicKey,
        })
        .signers([quartzManagerKeypair])
        .rpc();

      assert.fail("close_user instruction should have failed");
    } catch (err) {
      expect(err).to.be.instanceOf(Error);
      expect(err.message).to.include(desiredErrorMessage);
    }
  });


  it("change_user incorrect backup", async () => {
    const {program, vaultPda, newUserKeypair, backupKeypair} = testSetup;
    const desiredErrorMessage = "unknown signer"

    try {
      await program.methods
        .changeUser()
        .accounts({
          // @ts-ignore - Causing an issue in Cursor IDE
          vault: vaultPda,
          backup: Keypair.generate().publicKey,
          newUser: newUserKeypair.publicKey,
        })
        .signers([backupKeypair])
        .rpc();

      assert.fail("close_user instruction should have failed");
    } catch (err) {
      expect(err).to.be.instanceOf(Error);
      expect(err.message).to.include(desiredErrorMessage);
    }
  });


  it("change_user incorrect vault pda", async () => {
    const {program, otherKeypairVaultPda, backupKeypair, newUserKeypair} = testSetup;
    const desiredErrorCode = "AccountNotInitialized";

    try {
      await program.methods
        .changeUser()
        .accounts({
          // @ts-ignore - Causing an issue in Cursor IDE
          vault: otherKeypairVaultPda,
          backup: backupKeypair.publicKey,
          newUser: newUserKeypair.publicKey,
        })
        .signers([backupKeypair])
        .rpc();

      assert.fail("close_user instruction should have failed");
    } catch (err) {
      expect(err).to.be.instanceOf(Error);
      expect((err as AnchorError).error.errorCode.code).to.equal(desiredErrorCode);
    }
  });


  it("change_user local signature", async () => {
    const {program, backupKeypair, newUserKeypair, vaultPda, userKeypair} = testSetup;
    const desiredErrorMessage = "unknown signer"

    try {
      await program.methods
        .changeUser()
        .accounts({
          // @ts-ignore - Causing an issue in Cursor IDE
          vault: vaultPda,
          backup: backupKeypair.publicKey,
          newUser: newUserKeypair.publicKey,
        })
        .signers([userKeypair])
        .rpc();

      assert.fail("close_user instruction should have failed");
    } catch (err) {
      expect(err).to.be.instanceOf(Error);
      expect(err.message).to.include(desiredErrorMessage);
    }
  });


  it("change_user", async () => {
    const {program, vaultPda, backupKeypair, newUserKeypair, quartzManagerKeypair} = testSetup;
    await program.methods
      .changeUser()
      .accounts({
        // @ts-ignore - Causing an issue in Cursor IDE
        vault: vaultPda,
        backup: backupKeypair.publicKey,
        newUser: newUserKeypair.publicKey,
      })
      .signers([backupKeypair])
      .rpc();
    
    const account = await program.account.vault.fetch(vaultPda);
    expect(account.backup.equals(backupKeypair.publicKey)).to.be.true;
    expect(account.user.equals(newUserKeypair.publicKey)).to.be.true;
    expect(account.initPayer.equals(quartzManagerKeypair.publicKey)).to.be.true;
  });


  it("transfer_lamports old user", async () => {
    const {program, vaultPda, backupKeypair, userKeypair, provider} = testSetup;
    const desiredErrorCode = "ConstraintHasOne";

    try {
      const destinationAccount = Keypair.generate().publicKey;

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
        .transferLamports(new anchor.BN(LAMPORTS_PER_SOL))
        .accounts({
          // @ts-ignore - Causing an issue in Cursor IDE
          vault: vaultPda, 
          receiver: destinationAccount,
          backup: backupKeypair.publicKey,
          user: userKeypair.publicKey,
          systemProgram: SystemProgram.programId
        })
        .signers([userKeypair])
        .rpc();
    } catch(err) {
      expect(err).to.be.instanceOf(AnchorError)
      expect((err as AnchorError).error.errorCode.code).to.equal(desiredErrorCode)
    }
  })


  it("close_user old user", async () => {
    const {program, vaultPda, backupKeypair, userKeypair, quartzManagerKeypair} = testSetup;
    const desiredErrorCode = "ConstraintHasOne";

    try {
      await program.methods
        .closeUser()
        .accounts({
          // @ts-ignore - Causing an issue in Cursor IDE
          vault: vaultPda,
          initPayer: quartzManagerKeypair.publicKey,
          backup: backupKeypair.publicKey,
          user: userKeypair.publicKey
        })
        .signers([userKeypair])
        .rpc();
    } catch(err) {
      expect(err).to.be.instanceOf(AnchorError)
      expect((err as AnchorError).error.errorCode.code).to.equal(desiredErrorCode)
    }
  });


  it("transfer_lamports new user", async () => {
    const {program, vaultPda, backupKeypair, newUserKeypair, provider} = testSetup;
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
      .transferLamports(new anchor.BN(LAMPORTS_PER_SOL))
      .accounts({
        // @ts-ignore - Causing an issue in Cursor IDE
        vault: vaultPda, 
        receiver: destinationAccount,
        backup: backupKeypair.publicKey,
        user: newUserKeypair.publicKey,
        systemProgram: SystemProgram.programId
      })
      .signers([newUserKeypair])
      .rpc();

    // Check SOL is received
    expect(
      await provider.connection.getBalance(destinationAccount)
    ).to.equal(LAMPORTS_PER_SOL)
  })


  it("change_user back to original", async () => {
    const {program, vaultPda, backupKeypair, userKeypair, quartzManagerKeypair} = testSetup;

    await program.methods
      .changeUser()
      .accounts({
        // @ts-ignore - Causing an issue in Cursor IDE
        vault: vaultPda,
        backup: backupKeypair.publicKey,
        newUser: userKeypair.publicKey,
      })
      .signers([backupKeypair])
      .rpc();
    
    const account = await program.account.vault.fetch(vaultPda);
    expect(account.backup.equals(backupKeypair.publicKey)).to.be.true;
    expect(account.user.equals(userKeypair.publicKey)).to.be.true;
    expect(account.initPayer.equals(quartzManagerKeypair.publicKey)).to.be.true;
  });
});
