import { PublicKey } from "@solana/web3.js";
import * as anchor from '@coral-xyz/anchor';


export async function getUserAccountPublicKey(
	programId: PublicKey,
	authority: PublicKey,
	subAccountId = 0
): Promise<PublicKey> {
	return (
		await getUserAccountPublicKeyAndNonce(programId, authority, subAccountId)
	)[0];
}


async function getUserAccountPublicKeyAndNonce(
	programId: PublicKey,
	authority: PublicKey,
	subAccountId = 0
): Promise<[PublicKey, number]> {
	return PublicKey.findProgramAddress(
		[
			Buffer.from(anchor.utils.bytes.utf8.encode('user')),
			authority.toBuffer(),
			new anchor.BN(subAccountId).toArrayLike(Buffer, 'le', 2),
		],
		programId
	);
}

export function getUserStatsAccountPublicKey(
	programId: PublicKey,
	authority: PublicKey
): PublicKey {
	return PublicKey.findProgramAddressSync(
		[
			Buffer.from(anchor.utils.bytes.utf8.encode('user_stats')),
			authority.toBuffer(),
		],
		programId
	)[0];
}