// TODO: Implement transaction signing process
// - Require biometric authentication for each transaction signing
// - Retrieve the Solana private key from the keychain
// - Retrieve the master key from the keychain
// - Decrypt the private key using the master key, sign the transaction, then immediately wipe the decrypted key and the master key
// - Implement a clear UI for transaction details confirmation
// - Include transaction simulation to show expected outcome

import { Transaction } from "@solana/web3.js";
import { secureWipe } from "../crypto/secureWipe";
import { getSolanaKeypair } from "./keyManagement";

export async function signTransaction(transaction: Transaction): Promise<Transaction> {
  const solanaKeypair = await getSolanaKeypair();
  if (!solanaKeypair) {
    throw new Error("Solana keypair not found");
  }
  transaction.sign(solanaKeypair);

  // Wipe the keypair from memory
  secureWipe(solanaKeypair.secretKey);

  return transaction;
}
