import type { Connection } from "@solana/web3.js";
import { PublicKey, TransactionInstruction } from "@solana/web3.js";
import type { QuoteResponse } from "@jup-ag/api";
import { AddressLookupTableAccount } from "@solana/web3.js";
export declare function getJupiterSwapIx(walletPubkey: PublicKey, connection: Connection, quoteResponse: QuoteResponse): Promise<{
    ix_jupiterSwap: TransactionInstruction;
    jupiterLookupTables: AddressLookupTableAccount[];
}>;
//# sourceMappingURL=jupiter.d.ts.map