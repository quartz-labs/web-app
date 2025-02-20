import { PublicKey } from "@solana/web3.js";
import { DRIFT_PROGRAM_ID, MARKET_INDEX_USDC, MESSAGE_TRANSMITTER_PROGRAM_ID, PYTH_ORACLE_PROGRAM_ID, QUARTZ_PROGRAM_ID, TOKEN_MESSAGE_MINTER_PROGRAM_ID } from "../config/constants.js";
import BN from "bn.js";
import { TOKENS } from "../config/tokens.js";
// Quartz
export const getVaultPublicKey = (user) => {
    const [vaultPda] = PublicKey.findProgramAddressSync([Buffer.from("vault"), user.toBuffer()], QUARTZ_PROGRAM_ID);
    return vaultPda;
};
export const getVaultSplPublicKey = (user, mint) => {
    const vaultPda = getVaultPublicKey(user);
    const [vaultSplPda] = PublicKey.findProgramAddressSync([vaultPda.toBuffer(), mint.toBuffer()], QUARTZ_PROGRAM_ID);
    return vaultSplPda;
};
export const getCollateralRepayLedgerPublicKey = (user) => {
    const [tokenLedgerPda] = PublicKey.findProgramAddressSync([Buffer.from("collateral_repay_ledger"), user.toBuffer()], QUARTZ_PROGRAM_ID);
    return tokenLedgerPda;
};
export const getBridgeRentPayerPublicKey = () => {
    const [bridgeRentPayerPda] = PublicKey.findProgramAddressSync([Buffer.from("bridge_rent_payer")], QUARTZ_PROGRAM_ID);
    return bridgeRentPayerPda;
};
export const getInitRentPayerPublicKey = () => {
    const [initRentPayerPda] = PublicKey.findProgramAddressSync([Buffer.from("init_rent_payer")], QUARTZ_PROGRAM_ID);
    return initRentPayerPda;
};
// Drift
export const getDriftUserPublicKey = (vaultPda) => {
    const [userPda] = PublicKey.findProgramAddressSync([
        Buffer.from("user"),
        vaultPda.toBuffer(),
        new BN(0).toArrayLike(Buffer, 'le', 2),
    ], DRIFT_PROGRAM_ID);
    return userPda;
};
export const getDriftUserStatsPublicKey = (vaultPda) => {
    const [userStatsPda] = PublicKey.findProgramAddressSync([Buffer.from("user_stats"), vaultPda.toBuffer()], DRIFT_PROGRAM_ID);
    return userStatsPda;
};
export const getDriftStatePublicKey = () => {
    const [statePda] = PublicKey.findProgramAddressSync([Buffer.from("drift_state")], DRIFT_PROGRAM_ID);
    return statePda;
};
export const getDriftSignerPublicKey = () => {
    const [signerPda] = PublicKey.findProgramAddressSync([Buffer.from("drift_signer")], DRIFT_PROGRAM_ID);
    return signerPda;
};
export const getDriftSpotMarketVaultPublicKey = (marketIndex) => {
    const [spotMarketVaultPda] = PublicKey.findProgramAddressSync([
        Buffer.from("spot_market_vault"),
        new BN(marketIndex).toArrayLike(Buffer, 'le', 2)
    ], DRIFT_PROGRAM_ID);
    return spotMarketVaultPda;
};
export const getDriftSpotMarketPublicKey = (marketIndex) => {
    const [spotMarketPda] = PublicKey.findProgramAddressSync([
        Buffer.from("spot_market"),
        new BN(marketIndex).toArrayLike(Buffer, 'le', 2)
    ], DRIFT_PROGRAM_ID);
    return spotMarketPda;
};
// Pyth
export const getPythPriceFeedAccount = (shardId, priceFeedId) => {
    let priceFeedIdBuffer;
    if (priceFeedId.startsWith("0x")) {
        priceFeedIdBuffer = Buffer.from(priceFeedId.slice(2), "hex");
    }
    else {
        priceFeedIdBuffer = Buffer.from(priceFeedId, "hex");
    }
    if (priceFeedIdBuffer.length !== 32) {
        throw new Error("Feed ID should be 32 bytes long");
    }
    const shardBuffer = Buffer.alloc(2);
    shardBuffer.writeUint16LE(shardId, 0);
    return PublicKey.findProgramAddressSync([shardBuffer, priceFeedIdBuffer], PYTH_ORACLE_PROGRAM_ID)[0];
};
export const getPythOracle = (marketIndex) => {
    const priceFeedId = TOKENS[marketIndex].pythPriceFeedId;
    return getPythPriceFeedAccount(0, priceFeedId);
};
// Circle
export const getSenderAuthority = () => {
    const [senderAuthorityPda] = PublicKey.findProgramAddressSync([Buffer.from("sender_authority")], TOKEN_MESSAGE_MINTER_PROGRAM_ID);
    return senderAuthorityPda;
};
export const getMessageTransmitter = () => {
    const [messageTransmitter] = PublicKey.findProgramAddressSync([Buffer.from("message_transmitter")], MESSAGE_TRANSMITTER_PROGRAM_ID);
    return messageTransmitter;
};
export const getTokenMessenger = () => {
    const [tokenMessenger] = PublicKey.findProgramAddressSync([Buffer.from("token_messenger")], TOKEN_MESSAGE_MINTER_PROGRAM_ID);
    return tokenMessenger;
};
export const getTokenMinter = () => {
    const [tokenMinter] = PublicKey.findProgramAddressSync([Buffer.from("token_minter")], TOKEN_MESSAGE_MINTER_PROGRAM_ID);
    return tokenMinter;
};
export const getLocalToken = () => {
    const [localToken] = PublicKey.findProgramAddressSync([Buffer.from("local_token"), TOKENS[MARKET_INDEX_USDC].mint.toBuffer()], TOKEN_MESSAGE_MINTER_PROGRAM_ID);
    return localToken;
};
export const getRemoteTokenMessenger = () => {
    const DOMAIN_BASE = 6;
    const [remoteTokenMessenger] = PublicKey.findProgramAddressSync([Buffer.from("remote_token_messenger"), Buffer.from(DOMAIN_BASE.toString())], TOKEN_MESSAGE_MINTER_PROGRAM_ID);
    return remoteTokenMessenger;
};
export const getEventAuthority = () => {
    const [eventAuthority] = PublicKey.findProgramAddressSync([Buffer.from("__event_authority")], TOKEN_MESSAGE_MINTER_PROGRAM_ID);
    return eventAuthority;
};
export const getSpendMulePda = (user) => {
    const [mulePda] = PublicKey.findProgramAddressSync([Buffer.from("spend_mule"), user.toBuffer()], QUARTZ_PROGRAM_ID);
    return mulePda;
};
//# sourceMappingURL=accounts.js.map