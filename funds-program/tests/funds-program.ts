import * as anchor from "@coral-xyz/anchor";
import { Program, AnchorError } from "@coral-xyz/anchor";
import { FundsProgram } from "../target/types/funds_program";
import { Keypair, SystemProgram, LAMPORTS_PER_SOL, Transaction } from "@solana/web3.js";
import dotenv from 'dotenv';
import { assert, expect } from "chai";
dotenv.config();


describe("funds-program", () => {
  // Configure the client to use the local cluster.
  const provider = anchor.AnchorProvider.env();
  const wallet = anchor.workspace.FundsProgram.provider.wallet;
  anchor.setProvider(provider);

  const program = anchor.workspace.FundsProgram as Program<FundsProgram>;

  // Get Quartz Manager keypair
  if (!process.env.QUARTZ_MANAGER_KEYPAIR) throw new Error("QUARTZ_MANAGER_KEYPAIR environment variable is not set");
  const quartzManagerKeypair = Keypair.fromSecretKey(Uint8Array.from(JSON.parse(process.env.QUARTZ_MANAGER_KEYPAIR)));

  // Generate random keypairs
  const incorrectKeypair = Keypair.generate();
  const userKeypair = Keypair.generate();

  const [vaultPda] = anchor.web3.PublicKey.findProgramAddressSync(
    [Buffer.from("vault"), userKeypair.publicKey.toBuffer()],
    program.programId
  );

  before(async () => {
    console.log("Generated user address: ", userKeypair.publicKey.toString());
    console.log("Generated incorrect address: ", incorrectKeypair.publicKey.toString());

    // Topup user account with SOL
    const tx = new Transaction().add(
      SystemProgram.transfer({
        fromPubkey: wallet.publicKey,
        toPubkey: incorrectKeypair.publicKey,
        lamports: LAMPORTS_PER_SOL * 10,
      })
    );
    await provider.sendAndConfirm(tx);
  })


  // Run tests

  it("init_user incorrect quartz manager", async () => {
    const desiredErrorCode = "InvalidQuartzAccount";

    try {
      const tx = await program.methods
        .initUser()
        .accounts({
          // @ts-ignore - Causing an issue in Curosr IDE
          vault: vaultPda,
          quartzManager: incorrectKeypair.publicKey,
          user: userKeypair.publicKey,
          systemProgram: SystemProgram.programId,
        })  
        .signers([incorrectKeypair])
        .rpc();

      assert.fail(0, 1, "init_user instruction call should have failed");
    } catch (err) {
      expect(err).to.be.instanceOf(AnchorError);
      expect((err as AnchorError).error.errorCode.code).to.equal(desiredErrorCode);
    }
  });


  it("init_user init by user", async () => {
    const desiredErrorCode = "InvalidQuartzAccount";

    const [randomVaultPda] = anchor.web3.PublicKey.findProgramAddressSync(
      [Buffer.from("vault"), incorrectKeypair.publicKey.toBuffer()],
      program.programId
    );

    try {
      await program.methods
        .initUser()
        .accounts({
          // @ts-ignore - Causing an issue in Curosr IDE
          vault: randomVaultPda,
          quartzManager: incorrectKeypair.publicKey,
          user: incorrectKeypair.publicKey,
          systemProgram: SystemProgram.programId,
        })  
        .signers([incorrectKeypair])
        .rpc();

      assert.fail(0, 1, "init_user instruction call should have failed");
    } catch (err) {
      expect(err).to.be.instanceOf(AnchorError);
      expect((err as AnchorError).error.errorCode.code).to.equal(desiredErrorCode);
    }
  });


  it("init_user", async () => {
    await program.methods
      .initUser()
      .accounts({
        // @ts-ignore - Causing an issue in Cursor IDE
        vault: vaultPda,
        quartzManager: quartzManagerKeypair.publicKey,
        user: userKeypair.publicKey,
        systemProgram: SystemProgram.programId,
      })
      .signers([quartzManagerKeypair])
      .rpc();
    
    const account = await program.account.vault.fetch(vaultPda);
    expect(account.user === userKeypair.publicKey);
  });


  it("transfer_lamports", async () => {
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
        user: userKeypair.publicKey,
        systemProgram: SystemProgram.programId
      })
      .signers([userKeypair])
      .rpc();

    // Check SOL is received
    expect(
      await provider.connection.getBalance(destinationAccount)
    ).to.equal(LAMPORTS_PER_SOL)
  })


  it("transfer_lamports insufficient funds", async () => {
    const desiredErrorCode = "InsufficientFunds"
    const destinationAccount = Keypair.generate().publicKey;

    try {
      await program.methods
      .transferLamports(new anchor.BN(LAMPORTS_PER_SOL * 1000))
        .accounts({
          // @ts-ignore - Causing an issue in Cursor IDE
          vault: vaultPda, 
          receiver: destinationAccount,
          user: userKeypair.publicKey,
          systemProgram: SystemProgram.programId
        })
        .signers([userKeypair])
        .rpc();

      assert.fail(0, 1, "transferLamports instruction call should have failed")
    } catch(err) {
      expect(err).to.be.instanceOf(AnchorError)
      expect((err as AnchorError).error.errorCode.code).to.equal(desiredErrorCode)
    }
  })


  it("transfer_lamports incorrect signature", async () => {
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
        .transferLamports(new anchor.BN(LAMPORTS_PER_SOL))
        .accounts({
          // @ts-ignore - Causing an issue in Cursor IDE
          vault: vaultPda, 
          receiver: destinationAccount,
          user: userKeypair.publicKey,
          systemProgram: SystemProgram.programId
        })
        .signers([quartzManagerKeypair])
        .rpc();

      assert.fail(0, 1, "transferLamports instruction call should have failed")
    } catch(err) {
      expect(err).to.be.instanceOf(Error);
      expect(err.message).to.include(desiredErrorMessage);
    }
  })


  it("close_user incorrect quartz manager", async () => {
    const desiredErrorCode = "InvalidQuartzAccount";

    try {
      await program.methods
        .closeUser()
        .accounts({
          // @ts-ignore - Causing an issue in Curosr IDE
          vault: vaultPda,
          quartzManager: incorrectKeypair.publicKey,
          user: userKeypair.publicKey,
        })  
        .signers([userKeypair])
        .rpc();

      assert.fail(0, 1, "close_user instruction call should have failed");
    } catch (err) {
      expect(err).to.be.instanceOf(AnchorError);
      expect((err as AnchorError).error.errorCode.code).to.equal(desiredErrorCode);
    }
  });


  it("close_user close by quartz", async () => {
    const desiredErrorMessage = "Missing signature"

    try {
      await program.methods
        .closeUser()
        .accounts({
          // @ts-ignore - Causing an issue in Cursor IDE
          vault: vaultPda,
          quartzManager: quartzManagerKeypair.publicKey,
          user: userKeypair.publicKey
        })
        .signers([quartzManagerKeypair])
        .rpc();

      assert.fail("close_user instruction should have failed");
    } catch (err) {
      expect(err).to.be.instanceOf(Error);
      expect(err.message).to.include(desiredErrorMessage);
    }
  });


  it("close_user close by incorrect user", async () => {
    const desiredErrorMessage = "unknown signer"

    try {
      await program.methods
        .closeUser()
        .accounts({
          // @ts-ignore - Causing an issue in Cursor IDE
          vault: vaultPda,
          quartzManager: quartzManagerKeypair.publicKey,
          user: userKeypair.publicKey
        })
        .signers([incorrectKeypair])
        .rpc();

      assert.fail("close_user instruction should have failed");
    } catch (err) {
      expect(err).to.be.instanceOf(Error);
      expect(err.message).to.include(desiredErrorMessage);
    }
  });


  it("close_user", async () => {
    await program.methods
      .closeUser()
      .accounts({
        // @ts-ignore - Causing an issue in Cursor IDE
        vault: vaultPda,
        quartzManager: quartzManagerKeypair.publicKey,
        user: userKeypair.publicKey
      })
      .signers([userKeypair])
      .rpc();
  });
});
