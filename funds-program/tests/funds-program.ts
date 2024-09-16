import * as anchor from "@coral-xyz/anchor";
import { Program, AnchorError } from "@coral-xyz/anchor";
import { FundsProgram } from "../target/types/funds_program";
import { Keypair, SystemProgram, LAMPORTS_PER_SOL, Transaction, PublicKey } from "@solana/web3.js";
import dotenv from 'dotenv';
import { assert, expect } from "chai";
dotenv.config();


describe("funds-program", () => {
  // Configure the client to use the local cluster.
  const provider = anchor.AnchorProvider.env();
  const wallet = anchor.workspace.FundsProgram.provider.wallet;
  anchor.setProvider(provider);

  const program = anchor.workspace.FundsProgram as Program<FundsProgram>;

  // Get Quartz keys
  const QUARTZ_HOLDING_ADDRESS = new PublicKey("5XY5pQbBjwv8ByBxKPNE7Xyb9dVcdFgd51xcxKDJjGWE");
  if (!process.env.QUARTZ_MANAGER_KEYPAIR) throw new Error("QUARTZ_MANAGER_KEYPAIR environment variable is not set");
  const quartzManagerKeypair = Keypair.fromSecretKey(Uint8Array.from(JSON.parse(process.env.QUARTZ_MANAGER_KEYPAIR)));

  // Generate random keypairs
  const backupKeypair = Keypair.generate();
  const userKeypair = Keypair.generate();
  const newUserKeypair = Keypair.generate();
  const otherBackupKeypair = Keypair.generate();
  const otherUserKeypair = Keypair.generate();

  const [vaultPda] = anchor.web3.PublicKey.findProgramAddressSync(
    [Buffer.from("vault"), backupKeypair.publicKey.toBuffer()],
    program.programId
  );

  const [otherKeypairVaultPda] = anchor.web3.PublicKey.findProgramAddressSync(
    [Buffer.from("vault"), otherBackupKeypair.publicKey.toBuffer()],
    program.programId
  );

  before(async () => {
    console.log("Quartz manager address: ", quartzManagerKeypair.publicKey.toString());
    console.log("Quartz holding address: ", QUARTZ_HOLDING_ADDRESS.toString());
    console.log("Generated user address: ", userKeypair.publicKey.toString());
    console.log("Generated other address: ", otherUserKeypair.publicKey.toString());

    // Topup incorrect keypair account with SOL
    const tx = new Transaction().add(
      SystemProgram.transfer({
        fromPubkey: wallet.publicKey,
        toPubkey: otherBackupKeypair.publicKey,
        lamports: LAMPORTS_PER_SOL * 10,
      })
    );
    await provider.sendAndConfirm(tx);
  })


  // Run tests
  it("init_user incorrect signer", async () => {
    const desiredErrorMessage = "unknown signer"

    try {
      const tx = await program.methods
        .initUser()
        .accounts({
          // @ts-ignore - Causing an issue in Curosr IDE
          vault: vaultPda,
          payer: quartzManagerKeypair.publicKey,
          backup: otherBackupKeypair.publicKey,
          user: otherUserKeypair.publicKey,
          systemProgram: SystemProgram.programId,
        })  
        .signers([otherBackupKeypair])
        .rpc();

      assert.fail(0, 1, "init_user instruction call should have failed");
    } catch (err) {
      expect(err).to.be.instanceOf(Error);
      expect(err.message).to.include(desiredErrorMessage);
    }
  });

  
  it("init_user by user", async () => {
    await program.methods
      .initUser()
      .accounts({
        // @ts-ignore - Causing an issue in Cursor IDE
        vault: otherKeypairVaultPda,
        payer: otherBackupKeypair.publicKey,
        backup: otherBackupKeypair.publicKey,
        user: otherUserKeypair.publicKey,
        systemProgram: SystemProgram.programId,
      })
      .signers([otherBackupKeypair])
      .rpc();
    
    const account = await program.account.vault.fetch(otherKeypairVaultPda);
    expect(account.backup.equals(otherBackupKeypair.publicKey)).to.be.true;
    expect(account.user.equals(otherUserKeypair.publicKey)).to.be.true;
    expect(account.initPayer.equals(otherBackupKeypair.publicKey)).to.be.true;
  });


  it("close_user with user as init_payer", async () => {
    await program.methods
      .closeUser()
      .accounts({
        // @ts-ignore - Causing an issue in Cursor IDE
        vault: otherKeypairVaultPda,
        initPayer: otherBackupKeypair.publicKey,
        backup: otherBackupKeypair.publicKey,
        user: otherUserKeypair.publicKey
      })
      .signers([otherUserKeypair])
      .rpc();
  });


  it("init_user by quartz", async () => {
    await program.methods
      .initUser()
      .accounts({
        // @ts-ignore - Causing an issue in Cursor IDE
        vault: vaultPda,
        payer: quartzManagerKeypair.publicKey,
        backup: backupKeypair.publicKey,
        user: userKeypair.publicKey,
        systemProgram: SystemProgram.programId,
      })
      .signers([quartzManagerKeypair])
      .rpc();
    
    const account = await program.account.vault.fetch(vaultPda);
    expect(account.backup.equals(backupKeypair.publicKey)).to.be.true;
    expect(account.user.equals(userKeypair.publicKey)).to.be.true;
    expect(account.initPayer.equals(quartzManagerKeypair.publicKey)).to.be.true;
  });


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
          backup: backupKeypair.publicKey,
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
          backup: backupKeypair.publicKey,
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


  it("transfer_lamports backup signature", async () => {
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
        .transferLamports(new anchor.BN(LAMPORTS_PER_SOL))
        .accounts({
          // @ts-ignore - Causing an issue in Cursor IDE
          vault: vaultPda, 
          receiver: destinationAccount,
          backup: backupKeypair.publicKey,
          user: userKeypair.publicKey,
          systemProgram: SystemProgram.programId
        })
        .signers([backupKeypair])
        .rpc();

      assert.fail(0, 1, "transferLamports instruction call should have failed")
    } catch(err) {
      expect(err).to.be.instanceOf(Error);
      expect(err.message).to.include(desiredErrorMessage);
    }
  })


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
        backup: backupKeypair.publicKey,
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


  it("spend_lamports insufficient funds", async () => {
    const desiredErrorCode = "InsufficientFunds"

    try {
      await program.methods
      .spendLamports(new anchor.BN(LAMPORTS_PER_SOL * 1000))
        .accounts({
          // @ts-ignore - Causing an issue in Cursor IDE
          vault: vaultPda, 
          quartzHolding: QUARTZ_HOLDING_ADDRESS,
          backup: backupKeypair.publicKey,
          user: userKeypair.publicKey,
          systemProgram: SystemProgram.programId
        })
        .signers([userKeypair])
        .rpc();

      assert.fail(0, 1, "spendLamports instruction call should have failed")
    } catch(err) {
      expect(err).to.be.instanceOf(AnchorError)
      expect((err as AnchorError).error.errorCode.code).to.equal(desiredErrorCode)
    }
  })


  it("spend_lamports incorrect signature", async () => {
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
        .spendLamports(new anchor.BN(LAMPORTS_PER_SOL))
        .accounts({
          // @ts-ignore - Causing an issue in Cursor IDE
          vault: vaultPda, 
          quartzHolding: QUARTZ_HOLDING_ADDRESS,
          backup: backupKeypair.publicKey,
          user: userKeypair.publicKey,
          systemProgram: SystemProgram.programId
        })
        .signers([quartzManagerKeypair])
        .rpc();

      assert.fail(0, 1, "spendLamports instruction call should have failed")
    } catch(err) {
      expect(err).to.be.instanceOf(Error);
      expect(err.message).to.include(desiredErrorMessage);
    }
  })


  it("spend_lamports backup signature", async () => {
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
        .spendLamports(new anchor.BN(LAMPORTS_PER_SOL))
        .accounts({
          // @ts-ignore - Causing an issue in Cursor IDE
          vault: vaultPda, 
          quartzHolding: QUARTZ_HOLDING_ADDRESS,
          backup: backupKeypair.publicKey,
          user: userKeypair.publicKey,
          systemProgram: SystemProgram.programId
        })
        .signers([backupKeypair])
        .rpc();

      assert.fail(0, 1, "spendLamports instruction call should have failed")
    } catch(err) {
      expect(err).to.be.instanceOf(Error);
      expect(err.message).to.include(desiredErrorMessage);
    }
  })


  it("spend_lamports incorrect quartz holding account", async () => {
    const desiredErrorCode = "InvalidQuartzAccount"
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
        .spendLamports(new anchor.BN(LAMPORTS_PER_SOL))
        .accounts({
          // @ts-ignore - Causing an issue in Cursor IDE
          vault: vaultPda, 
          quartzHolding: otherUserKeypair.publicKey,
          backup: backupKeypair.publicKey,
          user: userKeypair.publicKey,
          systemProgram: SystemProgram.programId
        })
        .signers([userKeypair])
        .rpc();

      assert.fail(0, 1, "spendLamports instruction call should have failed")
    } catch(err) {
      expect(err).to.be.instanceOf(AnchorError)
      expect((err as AnchorError).error.errorCode.code).to.equal(desiredErrorCode)
    }
  })


  it("spend_lamports", async () => {
    const initialBalance = await provider.connection.getBalance(QUARTZ_HOLDING_ADDRESS);

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
      .spendLamports(new anchor.BN(LAMPORTS_PER_SOL))
      .accounts({
        // @ts-ignore - Causing an issue in Cursor IDE
        vault: vaultPda, 
        quartzHolding: QUARTZ_HOLDING_ADDRESS,
        backup: backupKeypair.publicKey,
        user: userKeypair.publicKey,
        systemProgram: SystemProgram.programId
      })
      .signers([userKeypair])
      .rpc();

    // Check SOL is received
    const newBalance = await provider.connection.getBalance(QUARTZ_HOLDING_ADDRESS);
    expect(newBalance - initialBalance).to.equal(LAMPORTS_PER_SOL)
  })


  it("change_user incorrect signature", async () => {
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


  it("change_user local signature", async () => {
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


  it("spend_lamports old user", async () => {
    const desiredErrorCode = "ConstraintHasOne";

    try {
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
        .spendLamports(new anchor.BN(LAMPORTS_PER_SOL))
        .accounts({
          // @ts-ignore - Causing an issue in Cursor IDE
          vault: vaultPda, 
          quartzHolding: QUARTZ_HOLDING_ADDRESS,
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
  });


  it("close_user old user", async () => {
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


  it("spend_lamports new user", async () => {
    const initialBalance = await provider.connection.getBalance(QUARTZ_HOLDING_ADDRESS);

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
      .spendLamports(new anchor.BN(LAMPORTS_PER_SOL))
      .accounts({
        // @ts-ignore - Causing an issue in Cursor IDE
        vault: vaultPda, 
        quartzHolding: QUARTZ_HOLDING_ADDRESS,
        backup: backupKeypair.publicKey,
        user: newUserKeypair.publicKey,
        systemProgram: SystemProgram.programId
      })
      .signers([newUserKeypair])
      .rpc();

    // Check SOL is received
    const newBalance = await provider.connection.getBalance(QUARTZ_HOLDING_ADDRESS);
    expect(newBalance - initialBalance).to.equal(LAMPORTS_PER_SOL)
  })


  it("change_user back to original", async () => {
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


  it("close_user incorrect init_payer", async () => {
    const desiredErrorCode = "InvalidQuartzAccount";

    try {
      await program.methods
        .closeUser()
        .accounts({
          // @ts-ignore - Causing an issue in Curosr IDE
          vault: vaultPda,
          initPayer: otherUserKeypair.publicKey,
          backup: backupKeypair.publicKey,
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


  it("close_user incorrect signature", async () => {
    const desiredErrorMessage = "Missing signature"

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
        .signers([quartzManagerKeypair])
        .rpc();

      assert.fail("close_user instruction should have failed");
    } catch (err) {
      expect(err).to.be.instanceOf(Error);
      expect(err.message).to.include(desiredErrorMessage);
    }
  });


  it("close_user backup signature", async () => {
    const desiredErrorMessage = "unknown signer"

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
        .signers([backupKeypair])
        .rpc();

      assert.fail("close_user instruction should have failed");
    } catch (err) {
      expect(err).to.be.instanceOf(Error);
      expect(err.message).to.include(desiredErrorMessage);
    }
  });


  it("close_user after change to new user", async () => {
    const testBackupKeypair = Keypair.generate();
    const testUserKeypair = Keypair.generate();
    const testNewUserKeypair = Keypair.generate();
    const [testKeypairVaultPda] = anchor.web3.PublicKey.findProgramAddressSync(
      [Buffer.from("vault"), testBackupKeypair.publicKey.toBuffer()],
      program.programId
    );

    await program.methods
      .initUser()
      .accounts({
        // @ts-ignore - Causing an issue in Cursor IDE
        vault: testKeypairVaultPda,
        payer: quartzManagerKeypair.publicKey,
        backup: testBackupKeypair.publicKey,
        user: testUserKeypair.publicKey,
        systemProgram: SystemProgram.programId,
      })
      .signers([quartzManagerKeypair])
      .rpc();
    let account = await program.account.vault.fetch(testKeypairVaultPda);
    expect(account.backup.equals(testBackupKeypair.publicKey)).to.be.true;
    expect(account.user.equals(testUserKeypair.publicKey)).to.be.true;
    expect(account.initPayer.equals(quartzManagerKeypair.publicKey)).to.be.true;

    await program.methods
      .changeUser()
      .accounts({
        // @ts-ignore - Causing an issue in Cursor IDE
        vault: testKeypairVaultPda,
        backup: testBackupKeypair.publicKey,
        newUser: testNewUserKeypair.publicKey,
      })
      .signers([testBackupKeypair])
      .rpc();
    account = await program.account.vault.fetch(testKeypairVaultPda);
    expect(account.backup.equals(testBackupKeypair.publicKey)).to.be.true;
    expect(account.user.equals(testNewUserKeypair.publicKey)).to.be.true;
    expect(account.initPayer.equals(quartzManagerKeypair.publicKey)).to.be.true;

    await program.methods
      .closeUser()
      .accounts({
        // @ts-ignore - Causing an issue in Cursor IDE
        vault: testKeypairVaultPda,
        initPayer: quartzManagerKeypair.publicKey,
        backup: testBackupKeypair.publicKey,
        user: testNewUserKeypair.publicKey
      })
      .signers([testNewUserKeypair])
      .rpc();
  });


  it("close_user", async () => {
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
  });
});
