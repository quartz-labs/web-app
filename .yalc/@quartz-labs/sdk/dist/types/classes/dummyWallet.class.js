import { Keypair } from "@solana/web3.js";
export class DummyWallet {
    publicKey;
    payer;
    constructor(publicKey) {
        this.payer = Keypair.generate();
        this.publicKey = publicKey ?? this.payer.publicKey;
    }
    async signTransaction(tx) {
        return tx;
    }
    async signAllTransactions(txs) {
        return txs;
    }
}
//# sourceMappingURL=dummyWallet.class.js.map