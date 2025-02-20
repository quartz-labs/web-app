import { Keypair, type PublicKey, type Transaction, type VersionedTransaction } from "@solana/web3.js";
export declare class DummyWallet {
    publicKey: PublicKey;
    payer: Keypair;
    constructor(publicKey?: PublicKey);
    signTransaction<T extends Transaction | VersionedTransaction>(tx: T): Promise<T>;
    signAllTransactions<T extends Transaction | VersionedTransaction>(txs: T[]): Promise<T[]>;
}
//# sourceMappingURL=dummyWallet.class.d.ts.map