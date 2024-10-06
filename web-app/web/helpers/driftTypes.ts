import { BN } from "@coral-xyz/anchor";
import { PublicKey } from "@solana/web3.js";

export type UserAccount = {
	authority: PublicKey;
	delegate: PublicKey;
	name: number[];
	subAccountId: number;
	spotPositions: SpotPosition[];
	perpPositions: PerpPosition[];
	orders: Order[];
	status: number;
	nextLiquidationId: number;
	nextOrderId: number;
	maxMarginRatio: number;
	lastAddPerpLpSharesTs: BN;
	settledPerpPnl: BN;
	totalDeposits: BN;
	totalWithdraws: BN;
	totalSocialLoss: BN;
	cumulativePerpFunding: BN;
	cumulativeSpotFees: BN;
	liquidationMarginFreed: BN;
	lastActiveSlot: BN;
	isMarginTradingEnabled: boolean;
	idle: boolean;
	openOrders: number;
	hasOpenOrder: boolean;
	openAuctions: number;
	hasOpenAuction: boolean;
	lastFuelBonusUpdateTs: number;
};

export type PerpPosition = {
	baseAssetAmount: BN;
	lastCumulativeFundingRate: BN;
	marketIndex: number;
	quoteAssetAmount: BN;
	quoteEntryAmount: BN;
	quoteBreakEvenAmount: BN;
	openOrders: number;
	openBids: BN;
	openAsks: BN;
	settledPnl: BN;
	lpShares: BN;
	remainderBaseAssetAmount: number;
	lastBaseAssetAmountPerLp: BN;
	lastQuoteAssetAmountPerLp: BN;
	perLpBase: number;
};

export type SpotPosition = {
	marketIndex: number;
	balanceType: SpotBalanceType;
	scaledBalance: BN;
	openOrders: number;
	openBids: BN;
	openAsks: BN;
	cumulativeDeposits: BN;
};


export class SpotBalanceType {
	static readonly DEPOSIT = { deposit: {} };
	static readonly BORROW = { borrow: {} };
}

export type Order = {
	status: OrderStatus;
	orderType: OrderType;
	marketType: MarketType;
	slot: BN;
	orderId: number;
	userOrderId: number;
	marketIndex: number;
	price: BN;
	baseAssetAmount: BN;
	quoteAssetAmount: BN;
	baseAssetAmountFilled: BN;
	quoteAssetAmountFilled: BN;
	direction: PositionDirection;
	reduceOnly: boolean;
	triggerPrice: BN;
	triggerCondition: OrderTriggerCondition;
	existingPositionDirection: PositionDirection;
	postOnly: boolean;
	immediateOrCancel: boolean;
	oraclePriceOffset: number;
	auctionDuration: number;
	auctionStartPrice: BN;
	auctionEndPrice: BN;
	maxTs: BN;
};

export class OrderStatus {
	static readonly INIT = { init: {} };
	static readonly OPEN = { open: {} };
}

export class MarketType {
	static readonly SPOT = { spot: {} };
	static readonly PERP = { perp: {} };
}

export class OrderType {
	static readonly LIMIT = { limit: {} };
	static readonly TRIGGER_MARKET = { triggerMarket: {} };
	static readonly TRIGGER_LIMIT = { triggerLimit: {} };
	static readonly MARKET = { market: {} };
	static readonly ORACLE = { oracle: {} };
}

export class PositionDirection {
	static readonly LONG = { long: {} };
	static readonly SHORT = { short: {} };
}

export class OrderTriggerCondition {
	static readonly ABOVE = { above: {} };
	static readonly BELOW = { below: {} };
	static readonly TRIGGERED_ABOVE = { triggeredAbove: {} }; // above condition has been triggered
	static readonly TRIGGERED_BELOW = { triggeredBelow: {} }; // below condition has been triggered
}

export type SpotMarketAccount = {
	status: MarketStatus;
	assetTier: AssetTier;
	name: number[];

	marketIndex: number;
	pubkey: PublicKey;
	mint: PublicKey;
	vault: PublicKey;

	oracle: PublicKey;
	oracleSource: OracleSource;
	historicalOracleData: HistoricalOracleData;
	historicalIndexData: HistoricalIndexData;

	insuranceFund: {
		vault: PublicKey;
		totalShares: BN;
		userShares: BN;
		sharesBase: BN;
		unstakingPeriod: BN;
		lastRevenueSettleTs: BN;
		revenueSettlePeriod: BN;
		totalFactor: number;
		userFactor: number;
	};

	revenuePool: PoolBalance;

	ifLiquidationFee: number;

	decimals: number;
	optimalUtilization: number;
	optimalBorrowRate: number;
	maxBorrowRate: number;
	cumulativeDepositInterest: BN;
	cumulativeBorrowInterest: BN;
	totalSocialLoss: BN;
	totalQuoteSocialLoss: BN;
	depositBalance: BN;
	borrowBalance: BN;
	maxTokenDeposits: BN;

	lastInterestTs: BN;
	lastTwapTs: BN;
	initialAssetWeight: number;
	maintenanceAssetWeight: number;
	initialLiabilityWeight: number;
	maintenanceLiabilityWeight: number;
	liquidatorFee: number;
	imfFactor: number;
	scaleInitialAssetWeightStart: BN;

	withdrawGuardThreshold: BN;
	depositTokenTwap: BN;
	borrowTokenTwap: BN;
	utilizationTwap: BN;
	nextDepositRecordId: BN;

	orderStepSize: BN;
	orderTickSize: BN;
	minOrderSize: BN;
	maxPositionSize: BN;
	nextFillRecordId: BN;
	spotFeePool: PoolBalance;
	totalSpotFee: BN;
	totalSwapFee: BN;

	flashLoanAmount: BN;
	flashLoanInitialTokenAmount: BN;

	ordersEnabled: boolean;

	pausedOperations: number;

	ifPausedOperations: number;

	maxTokenBorrowsFraction: number;
	minBorrowRate: number;

	fuelBoostDeposits: number;
	fuelBoostBorrows: number;
	fuelBoostTaker: number;
	fuelBoostMaker: number;
	fuelBoostInsurance: number;

	tokenProgram: number;
};

export class OracleSource {
	static readonly PYTH = { pyth: {} };
	static readonly PYTH_1K = { pyth1K: {} };
	static readonly PYTH_1M = { pyth1M: {} };
	static readonly PYTH_PULL = { pythPull: {} };
	static readonly PYTH_1K_PULL = { pyth1KPull: {} };
	static readonly PYTH_1M_PULL = { pyth1MPull: {} };
	static readonly SWITCHBOARD = { switchboard: {} };
	static readonly QUOTE_ASSET = { quoteAsset: {} };
	static readonly PYTH_STABLE_COIN = { pythStableCoin: {} };
	static readonly PYTH_STABLE_COIN_PULL = { pythStableCoinPull: {} };
	static readonly Prelaunch = { prelaunch: {} };
	static readonly SWITCHBOARD_ON_DEMAND = { switchboardOnDemand: {} };
}

export type HistoricalOracleData = {
	lastOraclePrice: BN;
	lastOracleDelay: BN;
	lastOracleConf: BN;
	lastOraclePriceTwap: BN;
	lastOraclePriceTwap5Min: BN;
	lastOraclePriceTwapTs: BN;
};

export type HistoricalIndexData = {
	lastIndexBidPrice: BN;
	lastIndexAskPrice: BN;
	lastIndexPriceTwap: BN;
	lastIndexPriceTwap5Min: BN;
	lastIndexPriceTwapTs: BN;
};

export class MarketStatus {
	static readonly INITIALIZED = { initialized: {} };
	static readonly ACTIVE = { active: {} };
	static readonly FUNDING_PAUSED = { fundingPaused: {} };
	static readonly AMM_PAUSED = { ammPaused: {} };
	static readonly FILL_PAUSED = { fillPaused: {} };
	static readonly WITHDRAW_PAUSED = { withdrawPaused: {} };
	static readonly REDUCE_ONLY = { reduceOnly: {} };
	static readonly SETTLEMENT = { settlement: {} };
	static readonly DELISTED = { delisted: {} };
}

export class AssetTier {
	static readonly COLLATERAL = { collateral: {} };
	static readonly PROTECTED = { protected: {} };
	static readonly CROSS = { cross: {} };
	static readonly ISOLATED = { isolated: {} };
	static readonly UNLISTED = { unlisted: {} };
}

export type PoolBalance = {
	scaledBalance: BN;
	marketIndex: number;
};