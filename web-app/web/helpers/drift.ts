import { BN } from "@coral-xyz/anchor";
import { PublicKey } from "@solana/web3.js";
import { SpotBalanceType, SpotMarketAccount, SpotPosition } from "./driftTypes";
import { UserAccount } from "./driftTypes";


export function getTokenAmount (marketIndex: number): BN {
    const spotPosition = getSpotPosition(marketIndex);
    if (spotPosition === undefined) {
        return new BN(0);
    }
    const spotMarket = getSpotMarketAccount(marketIndex);
    return getSignedTokenAmount(
        getTokenAmount(
            spotPosition.scaledBalance,
            spotMarket,
            spotPosition.balanceType
        ),
        spotPosition.balanceType
    );
}

function getSpotPosition(marketIndex: number): SpotPosition | undefined {
    const userAccount = getUserAccount();
    return getSpotPositionForUserAccount(userAccount, marketIndex);
}

function getSpotPositionForUserAccount(
    userAccount: UserAccount,
    marketIndex: number
): SpotPosition | undefined {
    return userAccount.spotPositions.find(
        (position) => position.marketIndex === marketIndex
    );
}


export interface AccountSubscriber<T> {
	dataAndSlot?: DataAndSlot<T>;
	subscribe(onChange: (data: T) => void): Promise<void>;
	fetch(): Promise<void>;
	unsubscribe(): Promise<void>;

	setData(userAccount: T, slot?: number): void;
}

export type DataAndSlot<T> = {
	data: T;
	slot: number;
};

function getUserAccount(): UserAccount {
    //get the user account and slot
    // fill out a user type. and return it
    const user: UserAccount = {
        authority: new PublicKey(""),
        delegate: new PublicKey(""),
        name: [],
        subAccountId: 0,
        spotPositions: [],
        perpPositions: [],
        orders: [],
        status: 0,
        nextLiquidationId: 0,
        nextOrderId: 0,
        maxMarginRatio: 0,
        lastAddPerpLpSharesTs: undefined,
        settledPerpPnl: undefined,
        totalDeposits: undefined,
        totalWithdraws: undefined,
        totalSocialLoss: undefined,
        cumulativePerpFunding: undefined,
        cumulativeSpotFees: undefined,
        liquidationMarginFreed: undefined,
        lastActiveSlot: undefined,
        isMarginTradingEnabled: false,
        idle: false,
        openOrders: 0,
        hasOpenOrder: false,
        openAuctions: 0,
        hasOpenAuction: false,
        lastFuelBonusUpdateTs: 0
    }

    return user;
}

export function getSignedTokenAmount(
	tokenAmount: BN,
	balanceType: SpotBalanceType
): BN {
	if (isVariant(balanceType, 'deposit')) {
		return tokenAmount;
	} else {
		return tokenAmount.abs().neg();
	}
}

export function isVariant(object: any, type: string) {
	return object.hasOwnProperty(type);
}

