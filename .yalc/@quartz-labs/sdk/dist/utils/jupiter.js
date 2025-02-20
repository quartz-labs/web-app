import { PublicKey, TransactionInstruction } from "@solana/web3.js";
import { AddressLookupTableAccount } from "@solana/web3.js";
export async function getJupiterSwapIx(walletPubkey, connection, quoteResponse) {
    const instructions = await (await fetch('https://quote-api.jup.ag/v6/swap-instructions', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            quoteResponse,
            userPublicKey: walletPubkey.toBase58()
        })
    })).json();
    if (instructions.error) {
        throw new Error(`Failed to get swap instructions: ${instructions.error}`);
    }
    const { swapInstruction, addressLookupTableAddresses } = instructions;
    const getAddressLookupTableAccounts = async (keys) => {
        const addressLookupTableAccountInfos = await connection.getMultipleAccountsInfo(keys.map((key) => new PublicKey(key)));
        return addressLookupTableAccountInfos.reduce((acc, accountInfo, index) => {
            const addressLookupTableAddress = keys[index];
            if (accountInfo) {
                if (addressLookupTableAddress === undefined)
                    throw new Error("Address lookup table address is undefined");
                const addressLookupTableAccount = new AddressLookupTableAccount({
                    key: new PublicKey(addressLookupTableAddress),
                    state: AddressLookupTableAccount.deserialize(accountInfo.data),
                });
                acc.push(addressLookupTableAccount);
            }
            return acc;
        }, new Array());
    };
    const addressLookupTableAccounts = [];
    addressLookupTableAccounts.push(...(await getAddressLookupTableAccounts(addressLookupTableAddresses ?? [])));
    const ix_jupiterSwap = new TransactionInstruction({
        programId: new PublicKey(swapInstruction.programId),
        keys: swapInstruction.accounts.map((key) => ({
            pubkey: new PublicKey(key.pubkey),
            isSigner: key.isSigner,
            isWritable: key.isWritable,
        })),
        data: Buffer.from(swapInstruction.data, "base64"),
    });
    return {
        ix_jupiterSwap,
        jupiterLookupTables: addressLookupTableAccounts,
    };
}
//# sourceMappingURL=jupiter.js.map