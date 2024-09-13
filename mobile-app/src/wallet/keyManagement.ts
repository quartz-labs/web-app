import { getStoredKeypair } from '../crypto/solanaKeypair';
import { Keypair } from '@solana/web3.js';

export async function getSolanaKeypair(): Promise<Keypair | null> {
    const keypair = await getStoredKeypair();
    if (!keypair) {
        console.error('Solana keypair not found');
        return null;
    }
    return keypair;
}


// Usage example:
// const keypair = await getSolanaKeypair();
// if (keypair) {
//   // Use the keypair
//   // ...
//   // Don't forget to wipe the secret key when done
//   secureWipe(keypair.secretKey);
// }