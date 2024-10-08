import { AddressLookupTableAccount, Connection, PublicKey, TransactionInstruction, TransactionMessage, VersionedTransaction } from '@solana/web3.js';

export async function getJupiterSwapIx(walletPubkey: PublicKey, amount: number, inputMint: string, outputMint: string) {

    if (inputMint === "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v") {
        amount = amount * 1000000;
    }

    const quoteResponse = await (
        await fetch(`https://quote-api.jup.ag/v6/quote?inputMint=${inputMint}\
      &outputMint=${outputMint}\
      &amount=${amount}\
      &slippageBps=50`
        )
    ).json();

    const instructions = await (
        await fetch('https://quote-api.jup.ag/v6/swap-instructions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                // quoteResponse from /quote api
                quoteResponse,
                userPublicKey: walletPubkey.toBase58(),
            })
        })
    ).json();

    if (instructions.error) {
        throw new Error("Failed to get swap instructions: " + instructions.error);
    }

    const {
        tokenLedgerInstruction, // If you are using `useTokenLedger = true`.
        computeBudgetInstructions, // The necessary instructions to setup the compute budget.
        setupInstructions, // Setup missing ATA for the users.
        swapInstruction: swapInstructionPayload, // The actual swap instruction.
        cleanupInstruction, // Unwrap the SOL if `wrapAndUnwrapSol = true`.
        addressLookupTableAddresses, // The lookup table addresses that you can use if you are using versioned transaction.
    } = instructions;

    return {
        instructions: [
            ...setupInstructions.map(deserializeInstruction),
            deserializeInstruction(swapInstructionPayload),
            // deserializeInstruction(cleanupInstruction),
        ],
        addressLookupTableAddresses,
    };
}

const deserializeInstruction = (instruction: any) => {
    return new TransactionInstruction({
        programId: new PublicKey(instruction.programId),
        keys: instruction.accounts.map((key: any) => ({
            pubkey: new PublicKey(key.pubkey),
            isSigner: key.isSigner,
            isWritable: key.isWritable,
        })),
        data: Buffer.from(instruction.data, "base64"),
    });
};



const getAddressLookupTableAccounts = async (
    connection: Connection,
    keys: string[]
): Promise<AddressLookupTableAccount[]> => {
    const addressLookupTableAccountInfos =
        await connection.getMultipleAccountsInfo(
            keys.map((key) => new PublicKey(key))
        );

    return addressLookupTableAccountInfos.reduce((acc, accountInfo, index) => {
        const addressLookupTableAddress = keys[index];
        if (accountInfo) {
            const addressLookupTableAccount = new AddressLookupTableAccount({
                key: new PublicKey(addressLookupTableAddress),
                state: AddressLookupTableAccount.deserialize(accountInfo.data),
            });
            acc.push(addressLookupTableAccount);
        }

        return acc;
    }, new Array<AddressLookupTableAccount>());
};

export async function buildAndSignTransaction(connection: Connection, walletPubkey: PublicKey, jupiterSwapIx: any, addressLookupTableAddresses: string[], withdrawUsdcIx: any) {

    const addressLookupTableAccounts: AddressLookupTableAccount[] = [];

    addressLookupTableAccounts.push(
        ...(await getAddressLookupTableAccounts(connection, addressLookupTableAddresses))
    );

    const blockhash = (await connection.getLatestBlockhash()).blockhash;
    const messageV0 = new TransactionMessage({
        payerKey: walletPubkey,
        recentBlockhash: blockhash,
        instructions: [
            withdrawUsdcIx,
            ...jupiterSwapIx
        ]
    }).compileToV0Message(addressLookupTableAccounts);
    const transaction = new VersionedTransaction(messageV0);

    return transaction;
}


