import * as anchor from "@coral-xyz/anchor";
import { Program, AnchorError } from "@coral-xyz/anchor";
import { FundsProgram } from "../target/types/funds_program";
import { Keypair, SystemProgram, LAMPORTS_PER_SOL, Transaction, PublicKey } from "@solana/web3.js";
import { TOKEN_PROGRAM_ID } from "@solana/spl-token";
import { assert, expect } from "chai";
import { setupTests } from "./setup_tests";

describe("drift tests", () => {
  let testSetup: Awaited<ReturnType<typeof setupTests>>;
  let driftProgramId: PublicKey;

  before(async () => {
    testSetup = await setupTests();
    driftProgramId = new PublicKey("dRiftyHA39MWEi3m9aunc5MzRF1JYuBsbn6VPcn33UH");
  });

  it("drift_init_account", async () => {
    const { program, vaultPda, ownerKeypair } = testSetup;

    // Generate mock accounts for Drift
    const driftUser = Keypair.generate();
    const driftUserStats = Keypair.generate();
    const driftState = Keypair.generate();

    try {
      await program.methods
        .initDriftAccount()
        .accounts({
          // @ts-ignore - Causing an issue in Cursor IDE
          vault: vaultPda,
          owner: driftUser.publicKey,
          userStats: driftUserStats.publicKey,
          state: driftState.publicKey,
          rent: anchor.web3.SYSVAR_RENT_PUBKEY,
          systemProgram: SystemProgram.programId,
          driftProgram: driftProgramId,
        })
        .signers([ownerKeypair])
        .rpc();

      // Add assertions to check if the account was initialized correctly
      // You might need to fetch the account data and verify its contents
    } catch (err) {
      console.error("Error:", err);
      assert.fail("drift_init_account should not throw an error");
    }
  });

  it("drift_deposit", async () => {
    const { program, vaultPda, ownerKeypair } = testSetup;

    // Generate mock accounts for Drift
    const driftUser = Keypair.generate();
    const driftUserStats = Keypair.generate();
    const driftState = Keypair.generate();
    const spotMarketVault = Keypair.generate();
    const userTokenAccount = Keypair.generate();

    const depositAmount = new anchor.BN(1000000); // 1 USDC
    const marketIndex = 0; // Assuming 0 is a valid market index
    const reduceOnly = false;

    try {
      await program.methods
        .driftDeposit(depositAmount)
        .accounts({
          pdaAccount: vaultPda,
          state: driftState.publicKey,
          user: driftUser.publicKey,
          userStats: driftUserStats.publicKey,
          authority: vaultPda,
          spotMarketVault: spotMarketVault.publicKey,
          userTokenAccount: userTokenAccount.publicKey,
          tokenProgram: TOKEN_PROGRAM_ID,
          marketIndex: marketIndex,
          reduceOnly: reduceOnly,
          owner: ownerKeypair.publicKey,
          systemProgram: SystemProgram.programId,
        })
        .signers([ownerKeypair])
        .rpc();

      // Add assertions to check if the deposit was successful
      // You might need to fetch the account data and verify its contents
    } catch (err) {
      console.error("Error:", err);
      assert.fail("drift_deposit should not throw an error");
    }
  });

  it("drift_withdraw_borrow", async () => {
    const { program, vaultPda, ownerKeypair } = testSetup;

    // Generate mock accounts for Drift
    const driftUser = Keypair.generate();
    const driftUserStats = Keypair.generate();
    const driftState = Keypair.generate();
    const spotMarketVault = Keypair.generate();
    const userTokenAccount = Keypair.generate();
    const driftSigner = Keypair.generate();

    const withdrawAmount = new anchor.BN(500000); // 0.5 USDC

    try {
      await program.methods
        .driftWithdrawBorrow(withdrawAmount)
        .accounts({
          pdaAccount: vaultPda,
          state: driftState.publicKey,
          user: driftUser.publicKey,
          userStats: driftUserStats.publicKey,
          authority: vaultPda,
          spotMarketVault: spotMarketVault.publicKey,
          driftSigner: driftSigner.publicKey,
          userTokenAccount: userTokenAccount.publicKey,
          tokenProgram: TOKEN_PROGRAM_ID,
          owner: ownerKeypair.publicKey,
          systemProgram: SystemProgram.programId,
        })
        .signers([ownerKeypair])
        .rpc();

      // Add assertions to check if the withdrawal was successful
      // You might need to fetch the account data and verify its contents
    } catch (err) {
      console.error("Error:", err);
      assert.fail("drift_withdraw_borrow should not throw an error");
    }
  });

  // Add more tests for edge cases and error scenarios
  it("drift_init_account with incorrect signer", async () => {
    const { program, vaultPda } = testSetup;
    const incorrectSigner = Keypair.generate();

    // Generate mock accounts for Drift
    const driftUser = Keypair.generate();
    const driftUserStats = Keypair.generate();
    const driftState = Keypair.generate();

    try {
      await program.methods
        .driftInitAccount()
        .accounts({
          pda_account: vaultPda,
          user: driftUser.publicKey,
          userStats: driftUserStats.publicKey,
          state: driftState.publicKey,
          authority: vaultPda,
          payer: incorrectSigner.publicKey,
          rent: anchor.web3.SYSVAR_RENT_PUBKEY,
          systemProgram: SystemProgram.programId,
          owner: incorrectSigner.publicKey,
          driftProgram: driftProgramId,
        })
        .signers([incorrectSigner])
        .rpc();

      assert.fail("Should have thrown an error");
    } catch (err) {
      expect(err).to.be.instanceOf(AnchorError);
      expect((err as AnchorError).error.errorCode.code).to.equal("ConstraintSigner");
    }
  });

  // Add similar error case tests for drift_deposit and drift_withdraw_borrow
});