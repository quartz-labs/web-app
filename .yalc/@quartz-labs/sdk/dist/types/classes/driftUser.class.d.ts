import { BN, type DriftClient, type MarginCategory, type UserAccount } from "@drift-labs/sdk";
import type { PublicKey } from "@solana/web3.js";
import type { AccountMeta } from "../interfaces/accountMeta.interface.js";
import type { MarketIndex } from "../../config/tokens.js";
export declare class DriftUser {
    private authority;
    private driftClient;
    private userAccount;
    pubkey: PublicKey;
    statsPubkey: PublicKey;
    constructor(authority: PublicKey, driftClient: DriftClient, userAccount: UserAccount);
    getDriftUserAccount(): UserAccount;
    getRemainingAccounts(marketIndex: MarketIndex): AccountMeta[];
    getHealth(): number;
    getTokenAmount(marketIndex: number): BN;
    getWithdrawalLimit(marketIndex: number, reduceOnly?: boolean): BN;
    getFreeCollateral(marginCategory?: MarginCategory, strict?: boolean): BN;
    private canBypassWithdrawLimits;
    private isBeingLiquidated;
    getTotalCollateralValue(marginCategory?: MarginCategory, strict?: boolean, includeOpenOrders?: boolean): BN;
    private getSpotMarketAssetValue;
    private getSpotMarketAssetAndLiabilityValue;
    private getSpotLiabilityValue;
    private getSpotAssetValue;
    private getUnrealizedPNL;
    private getActivePerpPositions;
    private getPerpPositionWithLPSettle;
    private getPerpPosition;
    private getEmptyPosition;
    private getClonedPosition;
    getInitialMarginRequirement(): BN;
    private getMarginRequirement;
    private getTotalPerpPositionLiability;
    private calculateWeightedPerpPositionLiability;
    private getSpotMarketLiabilityValue;
}
//# sourceMappingURL=driftUser.class.d.ts.map