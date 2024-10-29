import { AddressLookupTableAccount, ComputeBudgetProgram, Connection, Keypair, PublicKey, Signer, Transaction, TransactionInstruction, TransactionMessage, VersionedTransaction } from "@solana/web3.js";
import { RPC_URL } from "./constants";

export const sendTransactionHandler = async (connection: Connection, tx: VersionedTransaction | Transaction) => {
    const signature = await connection.sendRawTransaction(tx.serialize(), {skipPreflight: true});
    return signature;

    // const DELAY = 1_000;
    // const MAX_WAIT = 15_000;

    // // TODO - Add preflight checks here

    // // TODO - This doesn't actually wait the given amount of MAX_WAIT, as checking takes some time too. Instead, use an actual timer.

    // console.log("Sending transaction...");
    // for (let i = 0; i < MAX_WAIT; i += DELAY) {
    //     try {
    //         const sx = await connection.sendRawTransaction(tx.serialize(), { maxRetries: 0, skipPreflight: true });

    //         const status = await getTransaction(sx, wallet);
    //         if (status.result != null) {
    //             //Transaction accepted
    //             if ('Ok' in status.result.meta.status) {
    //                 console.log(`${sx} transaction CONFIRMED`);
    //                 return sx;
    //             } else {
    //                 const error = `${sx} transaction FAILED`;
    //                 console.log(error);
    //                 captureError("Transction Failed to Send", "route: /transactionSender.ts");
    //                 return "";
    //             }
    //         }

    //         await delay(DELAY);

    //     } catch (error: any) {
    //         if (error.transactionMessage == 'Transaction simulation failed: This transaction has already been processed') {
    //             console.error("Transaction was already processed");
    //             captureError("Transaction already processed", "utils: /transactionSender.ts", error);
    //         } else if (error.transactionMessage == "Transaction simulation failed: Blockhash not found") {
    //             console.error("Transaction expired: have to retry");
    //             captureError("Transaction expired", "utils: /transactionSender.ts", error);
    //             return "";
    //         } else {
    //             console.error("Send transaction error: ", error);
    //             captureError("Send transaction error", "utils: /transactionSender.ts", error);
    //         }
    //     }
    // }

    // console.error("Transaction timed out");
    // captureError("Transaction timed out", "utils: /transactionSender.ts");

    // return "";
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

export const getTransaction = async (signature: string, wallet: PublicKey) => {
    const response = await fetch('/api/tx', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ signature, wallet }),
    });

    return response.json();
};


export const createPriorityFeeInstructions = async (connection: Connection, instructions: TransactionInstruction[], computeBudget: number) => {
    const tx = new Transaction();
    instructions.forEach(ix => tx.add(ix));
    tx.recentBlockhash = (await connection.getLatestBlockhash()).blockhash;
    tx.feePayer = Keypair.generate().publicKey;

    const accounts = tx.compileMessage().accountKeys;
    const accountKeys = accounts.map(key => key.toBase58());

    const computeLimitIx = ComputeBudgetProgram.setComputeUnitLimit({
        units: computeBudget,
    });

    const computePriceIx = ComputeBudgetProgram.setComputeUnitPrice({
        microLamports: await getPriorityFeeEstimate(accountKeys)
    });
    return [computeLimitIx, computePriceIx];
}

const getPriorityFeeEstimate = async (accounts: string[]) => {
    return 1_000_000;

    try {
        const response = await fetch(RPC_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            jsonrpc: '2.0',
            id: 'helius-example',
            method: 'getPriorityFeeEstimate',
            params: [
              {
                accountKeys: accounts,
                options: {
                  recommended: true,
                  evaluateEmptySlotAsZero: true
                },
              }
            ],
          }),
        });
    
        const data = await response.json();
    
        const priorityFeeEstimate = data.result?.priorityFeeEstimate;
        console.log(`Fetched priority fee: ${priorityFeeEstimate}`);
        return priorityFeeEstimate;
      } catch (err) {
        console.error(`Error: ${err}`);
        return 100_000;
      }
}
