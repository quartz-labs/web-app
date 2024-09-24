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


describe("init_user tests", () => {
  let testSetup: Awaited<ReturnType<typeof setupTests>>;

  before(async () => {
    testSetup = await setupTests();
  });

  it("init_user incorrect signer", async () => {
    const {program, vaultUsdcPda, otherOwnerKeypair, vaultPda, testUsdcMint} = testSetup;
    const desiredErrorMessage = "unknown signer";

    try {
      const tx = await program.methods
        .initUser()
        .accounts({
          // @ts-ignore - Causing an issue in Curosr IDE
          vault: vaultPda,
          vaultUsdc: vaultUsdcPda,
          owner: otherOwnerKeypair,
          usdcMint: testUsdcMint,
          tokenProgram: TOKEN_PROGRAM_ID,
          systemProgram: SystemProgram.programId,
        })  
        .signers([otherOwnerKeypair])
        .rpc();

      assert.fail(0, 1, "init_user instruction call should have failed");
    } catch (err) {
      expect(err).to.be.instanceOf(Error);
      expect(err.message).to.include(desiredErrorMessage);
    }
  });

  
  it("init_user by user", async () => {
    const {program, otherKeypairVaultUsdcPda, otherKeypairVaultPda, otherOwnerKeypair, testUsdcMint} = testSetup;

    await program.methods
      .initUser()
      .accounts({
        // @ts-ignore - Causing an issue in Cursor IDE
        vault: otherKeypairVaultPda,
        vaultUsdc: otherKeypairVaultUsdcPda,
        owner: otherOwnerKeypair.publicKey,
        usdcMint: testUsdcMint,
        tokenProgram: TOKEN_PROGRAM_ID,
        systemProgram: SystemProgram.programId,
      })
      .signers([otherOwnerKeypair])
      .rpc();
    
    const account = await program.account.vault.fetch(otherKeypairVaultPda);
    expect(account.owner.equals(otherOwnerKeypair.publicKey)).to.be.true;
  });


  // TODO - Add in when doing mobile app
  // it("init_user by quartz", async () => {
  //   const {program, testUsdcKeypair, testUsdcMint, quartzManagerKeypair} = testSetup;

  //   const testBackupKeypair = Keypair.generate();
  //   const testUserKeypair = Keypair.generate();
  //   const [testPDa] = anchor.web3.PublicKey.findProgramAddressSync(
  //     [Buffer.from("vault"), testBackupKeypair.publicKey.toBuffer()],
  //     program.programId
  //   );
  //   const [testUsdcPda] = anchor.web3.PublicKey.findProgramAddressSync(
  //     [Buffer.from("vault"), testBackupKeypair.publicKey.toBuffer(), testUsdcKeypair.publicKey.toBuffer()],
  //     program.programId
  //   );

  //   await program.methods
  //     .initUser()
  //     .accounts({
  //       // @ts-ignore - Causing an issue in Cursor IDE
  //       vault: testPDa,
  //       vaultUsdc: testUsdcPda,
  //       payer: quartzManagerKeypair.publicKey,
  //       backup: testBackupKeypair.publicKey,
  //       user: testUserKeypair.publicKey,
  //       usdcMint: testUsdcMint,
  //       tokenProgram: TOKEN_PROGRAM_ID,
  //       systemProgram: SystemProgram.programId,
  //     })
  //     .signers([quartzManagerKeypair])
  //     .rpc();
    
  //   const account = await program.account.vault.fetch(testPDa);
  //   expect(account.backup.equals(testBackupKeypair.publicKey)).to.be.true;
  //   expect(account.user.equals(testUserKeypair.publicKey)).to.be.true;
  //   expect(account.initPayer.equals(quartzManagerKeypair.publicKey)).to.be.true;
  // });
});
