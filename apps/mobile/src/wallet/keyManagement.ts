import { Keypair, PublicKey } from "@solana/web3.js";
import { deleteMasterKey } from "../crypto/masterKey";
import { createAndStoreKeypair, deleteStoredKeypair, getStoredKeypair } from "../crypto/solanaKeypair";

export async function createSolanaKeypair(): Promise<PublicKey | null> {
  const publicKey = await createAndStoreKeypair();
  if (!publicKey) {
    console.error("Failed to create solana keypair");
    return null;
  }
  //TODO: Store public key in local storage

  return publicKey;
}

export async function getSolanaKeypair(): Promise<Keypair | null> {
  const keypair = await getStoredKeypair();
  if (!keypair) {
    console.error("Solana keypair not found");
    return null;
  }
  return keypair;
}

export async function deleteSolanaKeypair(): Promise<boolean> {
  try {
    const [keypairDeleted, masterKeyDeleted] = await Promise.all([deleteStoredKeypair(), deleteMasterKey()]);

    if (!keypairDeleted) {
      console.warn("Failed to delete keypair");
    }
    if (!masterKeyDeleted) {
      console.warn("Failed to delete master key");
    }

    return keypairDeleted && masterKeyDeleted;
  } catch (error) {
    console.error("Error deleting Solana keypair:", error);
    return false;
  }
}

// Usage example:
// const keypair = await getSolanaKeypair();
// if (keypair) {
//   // Use the keypair
//   // ...
//   // Don't forget to wipe the secret key when done
//   secureWipe(keypair.secretKey);
// }
