import { AddressLookupTableAccount, Connection, Signer, Transaction, TransactionInstruction, TransactionMessage, VersionedTransaction } from "@solana/web3.js";
import { captureError, delay } from "./helpers";

export const sendTransactionHandler = async (connection: Connection, tx: VersionedTransaction | Transaction) => {
    const DELAY = 500;
    const MAX_WAIT = 30_000;

    // TODO - Add preflight checks here

    console.log("Sending transaction...");
    for (let i = 0; i < MAX_WAIT; i += DELAY) {
        try {
            const sx = await connection.sendRawTransaction(tx.serialize(), { maxRetries: 0, skipPreflight: true });

            const status = await getTransaction(sx);
            if (status.result != null) {
                //Transaction accepted
                if ('Ok' in status.result.meta.status) {
                    console.log(`${sx} transaction CONFIRMED`);
                    return sx;
                } else {
                    const error = `${sx} transaction FAILED`;
                    console.log(error);
                    captureError(error, "route: /transactionSender.ts");
                    return "";
                }
            }

            await delay(DELAY);

        } catch (error: any) {
            if (error.transactionMessage == 'Transaction simulation failed: This transaction has already been processed') {
                console.error("Transaction was already processed");
                captureError("Transaction already processed", "utils: /transactionSender.ts", error);
            } else if (error.transactionMessage == "Transaction simulation failed: Blockhash not found") {
                console.error("Transaction expired: have to retry");
                captureError("Transaction expired", "utils: /transactionSender.ts", error);
                return "";
            } else {
                console.error("Send transaction error: ", error);
                captureError("Send transaction error", "utils: /transactionSender.ts", error);
            }
        }
    }

    console.error("Transaction timed out");
    captureError("Transaction timed out", "utils: /transactionSender.ts");

    return "";
}

export const instructionsIntoV0 = async (connection: Connection, txInstructions: TransactionInstruction[], signers: Signer[], lookupTables?: AddressLookupTableAccount[]) => {
    const blockhash = await connection.getLatestBlockhash();

    const messageV0 = new TransactionMessage({
        payerKey: signers[0].publicKey,
        recentBlockhash: blockhash.blockhash,
        instructions: txInstructions,
    }).compileToV0Message(lookupTables);

    const transaction = new VersionedTransaction(messageV0);
    transaction.sign(signers);

    return transaction;
}

export const getTransaction = async (signature: string) => {
    const response = await fetch('/api/tx', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ signature }),
    });

    return response.json();
};
