use anchor_lang::prelude::*;

declare_id!("dRiftyHA39MWEi3m9aunc5MzRF1JYuBsbn6VPcn33UH");

// Accounts
#[derive(Accounts)]
pub struct InitializeUser<'info> {
    #[account(mut)]
    /// CHECK: Skip check
    pub user: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub user_stats: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub state: AccountInfo<'info>,
    #[account(mut, signer)]
    /// CHECK: Skip check
    pub authority: AccountInfo<'info>,
    #[account(mut, signer)]
    /// CHECK: Skip check
    pub payer: AccountInfo<'info>,
    /// CHECK: Skip check
    pub rent: AccountInfo<'info>,
    /// CHECK: Skip check
    pub system_program: AccountInfo<'info>,
}

#[derive(Accounts)]
pub struct InitializeUserStats<'info> {
    #[account(mut)]
    /// CHECK: Skip check
    pub user_stats: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub state: AccountInfo<'info>,
    #[account(mut, signer)]
    /// CHECK: Skip check
    pub authority: AccountInfo<'info>,
    #[account(mut, signer)]
    /// CHECK: Skip check
    pub payer: AccountInfo<'info>,
    /// CHECK: Skip check
    pub rent: AccountInfo<'info>,
    /// CHECK: Skip check
    pub system_program: AccountInfo<'info>,
}

#[derive(Accounts)]
pub struct InitializeReferrerName<'info> {
    #[account(mut)]
    /// CHECK: Skip check
    pub referrer_name: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub user: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub user_stats: AccountInfo<'info>,
    #[account(mut, signer)]
    /// CHECK: Skip check
    pub authority: AccountInfo<'info>,
    #[account(mut, signer)]
    /// CHECK: Skip check
    pub payer: AccountInfo<'info>,
    /// CHECK: Skip check
    pub rent: AccountInfo<'info>,
    /// CHECK: Skip check
    pub system_program: AccountInfo<'info>,
}

#[derive(Accounts)]
pub struct Deposit<'info> {
    /// CHECK: Skip check
    pub state: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub user: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub user_stats: AccountInfo<'info>,
    #[account(mut, signer)]
    /// CHECK: Skip check
    pub authority: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub spot_market_vault: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub user_token_account: AccountInfo<'info>,
    /// CHECK: Skip check
    pub token_program: AccountInfo<'info>,
}

#[derive(Accounts)]
pub struct Withdraw<'info> {
    /// CHECK: Skip check
    pub state: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub user: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub user_stats: AccountInfo<'info>,
    #[account(mut, signer)]
    /// CHECK: Skip check
    pub authority: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub spot_market_vault: AccountInfo<'info>,
    /// CHECK: Skip check
    pub drift_signer: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub user_token_account: AccountInfo<'info>,
    /// CHECK: Skip check
    pub token_program: AccountInfo<'info>,
}

#[derive(Accounts)]
pub struct TransferDeposit<'info> {
    #[account(mut)]
    /// CHECK: Skip check
    pub from_user: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub to_user: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub user_stats: AccountInfo<'info>,
    #[account(mut, signer)]
    /// CHECK: Skip check
    pub authority: AccountInfo<'info>,
    /// CHECK: Skip check
    pub state: AccountInfo<'info>,
    /// CHECK: Skip check
    pub spot_market_vault: AccountInfo<'info>,
}

#[derive(Accounts)]
pub struct PlacePerpOrder<'info> {
    /// CHECK: Skip check
    pub state: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub user: AccountInfo<'info>,
    #[account(mut, signer)]
    /// CHECK: Skip check
    pub authority: AccountInfo<'info>,
}

#[derive(Accounts)]
pub struct CancelOrder<'info> {
    /// CHECK: Skip check
    pub state: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub user: AccountInfo<'info>,
    #[account(mut, signer)]
    /// CHECK: Skip check
    pub authority: AccountInfo<'info>,
}

#[derive(Accounts)]
pub struct CancelOrderByUserId<'info> {
    /// CHECK: Skip check
    pub state: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub user: AccountInfo<'info>,
    #[account(mut, signer)]
    /// CHECK: Skip check
    pub authority: AccountInfo<'info>,
}

#[derive(Accounts)]
pub struct CancelOrders<'info> {
    /// CHECK: Skip check
    pub state: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub user: AccountInfo<'info>,
    #[account(mut, signer)]
    /// CHECK: Skip check
    pub authority: AccountInfo<'info>,
}

#[derive(Accounts)]
pub struct CancelOrdersByIds<'info> {
    /// CHECK: Skip check
    pub state: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub user: AccountInfo<'info>,
    #[account(mut, signer)]
    /// CHECK: Skip check
    pub authority: AccountInfo<'info>,
}

#[derive(Accounts)]
pub struct ModifyOrder<'info> {
    /// CHECK: Skip check
    pub state: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub user: AccountInfo<'info>,
    #[account(mut, signer)]
    /// CHECK: Skip check
    pub authority: AccountInfo<'info>,
}

#[derive(Accounts)]
pub struct ModifyOrderByUserId<'info> {
    /// CHECK: Skip check
    pub state: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub user: AccountInfo<'info>,
    #[account(mut, signer)]
    /// CHECK: Skip check
    pub authority: AccountInfo<'info>,
}

#[derive(Accounts)]
pub struct PlaceAndTakePerpOrder<'info> {
    /// CHECK: Skip check
    pub state: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub user: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub user_stats: AccountInfo<'info>,
    #[account(mut, signer)]
    /// CHECK: Skip check
    pub authority: AccountInfo<'info>,
}

#[derive(Accounts)]
pub struct PlaceAndMakePerpOrder<'info> {
    /// CHECK: Skip check
    pub state: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub user: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub user_stats: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub taker: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub taker_stats: AccountInfo<'info>,
    #[account(mut, signer)]
    /// CHECK: Skip check
    pub authority: AccountInfo<'info>,
}

#[derive(Accounts)]
pub struct PlaceSpotOrder<'info> {
    /// CHECK: Skip check
    pub state: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub user: AccountInfo<'info>,
    #[account(mut, signer)]
    /// CHECK: Skip check
    pub authority: AccountInfo<'info>,
}

#[derive(Accounts)]
pub struct PlaceAndTakeSpotOrder<'info> {
    /// CHECK: Skip check
    pub state: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub user: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub user_stats: AccountInfo<'info>,
    #[account(mut, signer)]
    /// CHECK: Skip check
    pub authority: AccountInfo<'info>,
}

#[derive(Accounts)]
pub struct PlaceAndMakeSpotOrder<'info> {
    /// CHECK: Skip check
    pub state: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub user: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub user_stats: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub taker: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub taker_stats: AccountInfo<'info>,
    #[account(mut, signer)]
    /// CHECK: Skip check
    pub authority: AccountInfo<'info>,
}

#[derive(Accounts)]
pub struct PlaceOrders<'info> {
    /// CHECK: Skip check
    pub state: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub user: AccountInfo<'info>,
    #[account(mut, signer)]
    /// CHECK: Skip check
    pub authority: AccountInfo<'info>,
}

#[derive(Accounts)]
pub struct BeginSwap<'info> {
    /// CHECK: Skip check
    pub state: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub user: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub user_stats: AccountInfo<'info>,
    #[account(mut, signer)]
    /// CHECK: Skip check
    pub authority: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub out_spot_market_vault: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub in_spot_market_vault: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub out_token_account: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub in_token_account: AccountInfo<'info>,
    /// CHECK: Skip check
    pub token_program: AccountInfo<'info>,
    /// CHECK: Skip check
    pub drift_signer: AccountInfo<'info>,
    /// CHECK: Skip check
    pub instructions: AccountInfo<'info>,
}

#[derive(Accounts)]
pub struct EndSwap<'info> {
    /// CHECK: Skip check
    pub state: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub user: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub user_stats: AccountInfo<'info>,
    #[account(mut, signer)]
    /// CHECK: Skip check
    pub authority: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub out_spot_market_vault: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub in_spot_market_vault: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub out_token_account: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub in_token_account: AccountInfo<'info>,
    /// CHECK: Skip check
    pub token_program: AccountInfo<'info>,
    /// CHECK: Skip check
    pub drift_signer: AccountInfo<'info>,
    /// CHECK: Skip check
    pub instructions: AccountInfo<'info>,
}

#[derive(Accounts)]
pub struct AddPerpLpShares<'info> {
    /// CHECK: Skip check
    pub state: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub user: AccountInfo<'info>,
    #[account(mut, signer)]
    /// CHECK: Skip check
    pub authority: AccountInfo<'info>,
}

#[derive(Accounts)]
pub struct RemovePerpLpShares<'info> {
    /// CHECK: Skip check
    pub state: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub user: AccountInfo<'info>,
    #[account(mut, signer)]
    /// CHECK: Skip check
    pub authority: AccountInfo<'info>,
}

#[derive(Accounts)]
pub struct RemovePerpLpSharesInExpiringMarket<'info> {
    /// CHECK: Skip check
    pub state: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub user: AccountInfo<'info>,
}

#[derive(Accounts)]
pub struct UpdateUserName<'info> {
    #[account(mut)]
    /// CHECK: Skip check
    pub user: AccountInfo<'info>,
    #[account(mut, signer)]
    /// CHECK: Skip check
    pub authority: AccountInfo<'info>,
}

#[derive(Accounts)]
pub struct UpdateUserCustomMarginRatio<'info> {
    #[account(mut)]
    /// CHECK: Skip check
    pub user: AccountInfo<'info>,
    #[account(mut, signer)]
    /// CHECK: Skip check
    pub authority: AccountInfo<'info>,
}

#[derive(Accounts)]
pub struct UpdateUserMarginTradingEnabled<'info> {
    #[account(mut)]
    /// CHECK: Skip check
    pub user: AccountInfo<'info>,
    #[account(mut, signer)]
    /// CHECK: Skip check
    pub authority: AccountInfo<'info>,
}

#[derive(Accounts)]
pub struct UpdateUserDelegate<'info> {
    #[account(mut)]
    /// CHECK: Skip check
    pub user: AccountInfo<'info>,
    #[account(mut, signer)]
    /// CHECK: Skip check
    pub authority: AccountInfo<'info>,
}

#[derive(Accounts)]
pub struct UpdateUserReduceOnly<'info> {
    #[account(mut)]
    /// CHECK: Skip check
    pub user: AccountInfo<'info>,
    #[account(mut, signer)]
    /// CHECK: Skip check
    pub authority: AccountInfo<'info>,
}

#[derive(Accounts)]
pub struct UpdateUserAdvancedLp<'info> {
    #[account(mut)]
    /// CHECK: Skip check
    pub user: AccountInfo<'info>,
    #[account(mut, signer)]
    /// CHECK: Skip check
    pub authority: AccountInfo<'info>,
}

#[derive(Accounts)]
pub struct DeleteUser<'info> {
    #[account(mut)]
    /// CHECK: Skip check
    pub user: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub user_stats: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub state: AccountInfo<'info>,
    #[account(mut, signer)]
    /// CHECK: Skip check
    pub authority: AccountInfo<'info>,
}

#[derive(Accounts)]
pub struct ReclaimRent<'info> {
    #[account(mut)]
    /// CHECK: Skip check
    pub user: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub user_stats: AccountInfo<'info>,
    /// CHECK: Skip check
    pub state: AccountInfo<'info>,
    #[account(mut, signer)]
    /// CHECK: Skip check
    pub authority: AccountInfo<'info>,
    /// CHECK: Skip check
    pub rent: AccountInfo<'info>,
}

#[derive(Accounts)]
pub struct FillPerpOrder<'info> {
    /// CHECK: Skip check
    pub state: AccountInfo<'info>,
    #[account(mut, signer)]
    /// CHECK: Skip check
    pub authority: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub filler: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub filler_stats: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub user: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub user_stats: AccountInfo<'info>,
}

#[derive(Accounts)]
pub struct RevertFill<'info> {
    /// CHECK: Skip check
    pub state: AccountInfo<'info>,
    #[account(mut, signer)]
    /// CHECK: Skip check
    pub authority: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub filler: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub filler_stats: AccountInfo<'info>,
}

#[derive(Accounts)]
pub struct FillSpotOrder<'info> {
    /// CHECK: Skip check
    pub state: AccountInfo<'info>,
    #[account(mut, signer)]
    /// CHECK: Skip check
    pub authority: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub filler: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub filler_stats: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub user: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub user_stats: AccountInfo<'info>,
}

#[derive(Accounts)]
pub struct TriggerOrder<'info> {
    /// CHECK: Skip check
    pub state: AccountInfo<'info>,
    #[account(mut, signer)]
    /// CHECK: Skip check
    pub authority: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub filler: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub user: AccountInfo<'info>,
}

#[derive(Accounts)]
pub struct ForceCancelOrders<'info> {
    /// CHECK: Skip check
    pub state: AccountInfo<'info>,
    #[account(mut, signer)]
    /// CHECK: Skip check
    pub authority: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub filler: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub user: AccountInfo<'info>,
}

#[derive(Accounts)]
pub struct UpdateUserIdle<'info> {
    /// CHECK: Skip check
    pub state: AccountInfo<'info>,
    #[account(mut, signer)]
    /// CHECK: Skip check
    pub authority: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub filler: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub user: AccountInfo<'info>,
}

#[derive(Accounts)]
pub struct UpdateUserOpenOrdersCount<'info> {
    /// CHECK: Skip check
    pub state: AccountInfo<'info>,
    #[account(mut, signer)]
    /// CHECK: Skip check
    pub authority: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub filler: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub user: AccountInfo<'info>,
}

#[derive(Accounts)]
pub struct AdminDisableUpdatePerpBidAskTwap<'info> {
    #[account(mut, signer)]
    /// CHECK: Skip check
    pub admin: AccountInfo<'info>,
    /// CHECK: Skip check
    pub state: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub user_stats: AccountInfo<'info>,
}

#[derive(Accounts)]
pub struct SettlePnl<'info> {
    /// CHECK: Skip check
    pub state: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub user: AccountInfo<'info>,
    #[account(mut, signer)]
    /// CHECK: Skip check
    pub authority: AccountInfo<'info>,
    /// CHECK: Skip check
    pub spot_market_vault: AccountInfo<'info>,
}

#[derive(Accounts)]
pub struct SettleMultiplePnls<'info> {
    /// CHECK: Skip check
    pub state: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub user: AccountInfo<'info>,
    #[account(mut, signer)]
    /// CHECK: Skip check
    pub authority: AccountInfo<'info>,
    /// CHECK: Skip check
    pub spot_market_vault: AccountInfo<'info>,
}

#[derive(Accounts)]
pub struct SettleFundingPayment<'info> {
    /// CHECK: Skip check
    pub state: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub user: AccountInfo<'info>,
}

#[derive(Accounts)]
pub struct SettleLp<'info> {
    /// CHECK: Skip check
    pub state: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub user: AccountInfo<'info>,
}

#[derive(Accounts)]
pub struct SettleExpiredMarket<'info> {
    /// CHECK: Skip check
    pub state: AccountInfo<'info>,
    #[account(mut, signer)]
    /// CHECK: Skip check
    pub authority: AccountInfo<'info>,
}

#[derive(Accounts)]
pub struct LiquidatePerp<'info> {
    /// CHECK: Skip check
    pub state: AccountInfo<'info>,
    #[account(mut, signer)]
    /// CHECK: Skip check
    pub authority: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub liquidator: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub liquidator_stats: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub user: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub user_stats: AccountInfo<'info>,
}

#[derive(Accounts)]
pub struct LiquidatePerpWithFill<'info> {
    /// CHECK: Skip check
    pub state: AccountInfo<'info>,
    #[account(mut, signer)]
    /// CHECK: Skip check
    pub authority: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub liquidator: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub liquidator_stats: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub user: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub user_stats: AccountInfo<'info>,
}

#[derive(Accounts)]
pub struct LiquidateSpot<'info> {
    /// CHECK: Skip check
    pub state: AccountInfo<'info>,
    #[account(mut, signer)]
    /// CHECK: Skip check
    pub authority: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub liquidator: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub liquidator_stats: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub user: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub user_stats: AccountInfo<'info>,
}

#[derive(Accounts)]
pub struct LiquidateBorrowForPerpPnl<'info> {
    /// CHECK: Skip check
    pub state: AccountInfo<'info>,
    #[account(mut, signer)]
    /// CHECK: Skip check
    pub authority: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub liquidator: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub liquidator_stats: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub user: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub user_stats: AccountInfo<'info>,
}

#[derive(Accounts)]
pub struct LiquidatePerpPnlForDeposit<'info> {
    /// CHECK: Skip check
    pub state: AccountInfo<'info>,
    #[account(mut, signer)]
    /// CHECK: Skip check
    pub authority: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub liquidator: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub liquidator_stats: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub user: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub user_stats: AccountInfo<'info>,
}

#[derive(Accounts)]
pub struct SetUserStatusToBeingLiquidated<'info> {
    /// CHECK: Skip check
    pub state: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub user: AccountInfo<'info>,
}

#[derive(Accounts)]
pub struct ResolvePerpPnlDeficit<'info> {
    /// CHECK: Skip check
    pub state: AccountInfo<'info>,
    #[account(mut, signer)]
    /// CHECK: Skip check
    pub authority: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub spot_market_vault: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub insurance_fund_vault: AccountInfo<'info>,
    /// CHECK: Skip check
    pub drift_signer: AccountInfo<'info>,
    /// CHECK: Skip check
    pub token_program: AccountInfo<'info>,
}

#[derive(Accounts)]
pub struct ResolvePerpBankruptcy<'info> {
    /// CHECK: Skip check
    pub state: AccountInfo<'info>,
    #[account(mut, signer)]
    /// CHECK: Skip check
    pub authority: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub liquidator: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub liquidator_stats: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub user: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub user_stats: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub spot_market_vault: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub insurance_fund_vault: AccountInfo<'info>,
    /// CHECK: Skip check
    pub drift_signer: AccountInfo<'info>,
    /// CHECK: Skip check
    pub token_program: AccountInfo<'info>,
}

#[derive(Accounts)]
pub struct ResolveSpotBankruptcy<'info> {
    /// CHECK: Skip check
    pub state: AccountInfo<'info>,
    #[account(mut, signer)]
    /// CHECK: Skip check
    pub authority: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub liquidator: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub liquidator_stats: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub user: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub user_stats: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub spot_market_vault: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub insurance_fund_vault: AccountInfo<'info>,
    /// CHECK: Skip check
    pub drift_signer: AccountInfo<'info>,
    /// CHECK: Skip check
    pub token_program: AccountInfo<'info>,
}

#[derive(Accounts)]
pub struct SettleRevenueToInsuranceFund<'info> {
    /// CHECK: Skip check
    pub state: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub spot_market: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub spot_market_vault: AccountInfo<'info>,
    /// CHECK: Skip check
    pub drift_signer: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub insurance_fund_vault: AccountInfo<'info>,
    /// CHECK: Skip check
    pub token_program: AccountInfo<'info>,
}

#[derive(Accounts)]
pub struct UpdateFundingRate<'info> {
    /// CHECK: Skip check
    pub state: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub perp_market: AccountInfo<'info>,
    /// CHECK: Skip check
    pub oracle: AccountInfo<'info>,
}

#[derive(Accounts)]
pub struct UpdatePrelaunchOracle<'info> {
    /// CHECK: Skip check
    pub state: AccountInfo<'info>,
    /// CHECK: Skip check
    pub perp_market: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub oracle: AccountInfo<'info>,
}

#[derive(Accounts)]
pub struct UpdatePerpBidAskTwap<'info> {
    /// CHECK: Skip check
    pub state: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub perp_market: AccountInfo<'info>,
    /// CHECK: Skip check
    pub oracle: AccountInfo<'info>,
    /// CHECK: Skip check
    pub keeper_stats: AccountInfo<'info>,
    #[account(mut, signer)]
    /// CHECK: Skip check
    pub authority: AccountInfo<'info>,
}

#[derive(Accounts)]
pub struct UpdateSpotMarketCumulativeInterest<'info> {
    /// CHECK: Skip check
    pub state: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub spot_market: AccountInfo<'info>,
    /// CHECK: Skip check
    pub oracle: AccountInfo<'info>,
    /// CHECK: Skip check
    pub spot_market_vault: AccountInfo<'info>,
}

#[derive(Accounts)]
pub struct UpdateAmms<'info> {
    /// CHECK: Skip check
    pub state: AccountInfo<'info>,
    #[account(mut, signer)]
    /// CHECK: Skip check
    pub authority: AccountInfo<'info>,
}

#[derive(Accounts)]
pub struct UpdateSpotMarketExpiry<'info> {
    #[account(mut, signer)]
    /// CHECK: Skip check
    pub admin: AccountInfo<'info>,
    /// CHECK: Skip check
    pub state: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub spot_market: AccountInfo<'info>,
}

#[derive(Accounts)]
pub struct UpdateUserQuoteAssetInsuranceStake<'info> {
    /// CHECK: Skip check
    pub state: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub spot_market: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub insurance_fund_stake: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub user_stats: AccountInfo<'info>,
    #[account(mut, signer)]
    /// CHECK: Skip check
    pub signer: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub insurance_fund_vault: AccountInfo<'info>,
}

#[derive(Accounts)]
pub struct UpdateUserGovTokenInsuranceStake<'info> {
    /// CHECK: Skip check
    pub state: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub spot_market: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub insurance_fund_stake: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub user_stats: AccountInfo<'info>,
    #[account(mut, signer)]
    /// CHECK: Skip check
    pub signer: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub insurance_fund_vault: AccountInfo<'info>,
}

#[derive(Accounts)]
pub struct InitializeInsuranceFundStake<'info> {
    /// CHECK: Skip check
    pub spot_market: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub insurance_fund_stake: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub user_stats: AccountInfo<'info>,
    /// CHECK: Skip check
    pub state: AccountInfo<'info>,
    #[account(mut, signer)]
    /// CHECK: Skip check
    pub authority: AccountInfo<'info>,
    #[account(mut, signer)]
    /// CHECK: Skip check
    pub payer: AccountInfo<'info>,
    /// CHECK: Skip check
    pub rent: AccountInfo<'info>,
    /// CHECK: Skip check
    pub system_program: AccountInfo<'info>,
}

#[derive(Accounts)]
pub struct AddInsuranceFundStake<'info> {
    /// CHECK: Skip check
    pub state: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub spot_market: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub insurance_fund_stake: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub user_stats: AccountInfo<'info>,
    #[account(mut, signer)]
    /// CHECK: Skip check
    pub authority: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub spot_market_vault: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub insurance_fund_vault: AccountInfo<'info>,
    /// CHECK: Skip check
    pub drift_signer: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub user_token_account: AccountInfo<'info>,
    /// CHECK: Skip check
    pub token_program: AccountInfo<'info>,
}

#[derive(Accounts)]
pub struct RequestRemoveInsuranceFundStake<'info> {
    #[account(mut)]
    /// CHECK: Skip check
    pub spot_market: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub insurance_fund_stake: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub user_stats: AccountInfo<'info>,
    #[account(mut, signer)]
    /// CHECK: Skip check
    pub authority: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub insurance_fund_vault: AccountInfo<'info>,
}

#[derive(Accounts)]
pub struct CancelRequestRemoveInsuranceFundStake<'info> {
    #[account(mut)]
    /// CHECK: Skip check
    pub spot_market: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub insurance_fund_stake: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub user_stats: AccountInfo<'info>,
    #[account(mut, signer)]
    /// CHECK: Skip check
    pub authority: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub insurance_fund_vault: AccountInfo<'info>,
}

#[derive(Accounts)]
pub struct RemoveInsuranceFundStake<'info> {
    /// CHECK: Skip check
    pub state: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub spot_market: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub insurance_fund_stake: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub user_stats: AccountInfo<'info>,
    #[account(mut, signer)]
    /// CHECK: Skip check
    pub authority: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub insurance_fund_vault: AccountInfo<'info>,
    /// CHECK: Skip check
    pub drift_signer: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub user_token_account: AccountInfo<'info>,
    /// CHECK: Skip check
    pub token_program: AccountInfo<'info>,
}

#[derive(Accounts)]
pub struct TransferProtocolIfShares<'info> {
    #[account(mut, signer)]
    /// CHECK: Skip check
    pub signer: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub transfer_config: AccountInfo<'info>,
    /// CHECK: Skip check
    pub state: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub spot_market: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub insurance_fund_stake: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub user_stats: AccountInfo<'info>,
    #[account(mut, signer)]
    /// CHECK: Skip check
    pub authority: AccountInfo<'info>,
    /// CHECK: Skip check
    pub insurance_fund_vault: AccountInfo<'info>,
}

#[derive(Accounts)]
pub struct UpdatePythPullOracle<'info> {
    #[account(mut, signer)]
    /// CHECK: Skip check
    pub keeper: AccountInfo<'info>,
    /// CHECK: Skip check
    pub pyth_solana_receiver: AccountInfo<'info>,
    /// CHECK: Skip check
    pub encoded_vaa: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub price_feed: AccountInfo<'info>,
}

#[derive(Accounts)]
pub struct PostPythPullOracleUpdateAtomic<'info> {
    #[account(mut, signer)]
    /// CHECK: Skip check
    pub keeper: AccountInfo<'info>,
    /// CHECK: Skip check
    pub pyth_solana_receiver: AccountInfo<'info>,
    /// CHECK: Skip check
    pub guardian_set: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub price_feed: AccountInfo<'info>,
}

#[derive(Accounts)]
pub struct PostMultiPythPullOracleUpdatesAtomic<'info> {
    #[account(mut, signer)]
    /// CHECK: Skip check
    pub keeper: AccountInfo<'info>,
    /// CHECK: Skip check
    pub pyth_solana_receiver: AccountInfo<'info>,
    /// CHECK: Skip check
    pub guardian_set: AccountInfo<'info>,
}

#[derive(Accounts)]
pub struct Initialize<'info> {
    #[account(mut, signer)]
    /// CHECK: Skip check
    pub admin: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub state: AccountInfo<'info>,
    /// CHECK: Skip check
    pub quote_asset_mint: AccountInfo<'info>,
    /// CHECK: Skip check
    pub drift_signer: AccountInfo<'info>,
    /// CHECK: Skip check
    pub rent: AccountInfo<'info>,
    /// CHECK: Skip check
    pub system_program: AccountInfo<'info>,
    /// CHECK: Skip check
    pub token_program: AccountInfo<'info>,
}

#[derive(Accounts)]
pub struct InitializeSpotMarket<'info> {
    #[account(mut)]
    /// CHECK: Skip check
    pub spot_market: AccountInfo<'info>,
    /// CHECK: Skip check
    pub spot_market_mint: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub spot_market_vault: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub insurance_fund_vault: AccountInfo<'info>,
    /// CHECK: Skip check
    pub drift_signer: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub state: AccountInfo<'info>,
    /// CHECK: Skip check
    pub oracle: AccountInfo<'info>,
    #[account(mut, signer)]
    /// CHECK: Skip check
    pub admin: AccountInfo<'info>,
    /// CHECK: Skip check
    pub rent: AccountInfo<'info>,
    /// CHECK: Skip check
    pub system_program: AccountInfo<'info>,
    /// CHECK: Skip check
    pub token_program: AccountInfo<'info>,
}

#[derive(Accounts)]
pub struct DeleteInitializedSpotMarket<'info> {
    #[account(mut, signer)]
    /// CHECK: Skip check
    pub admin: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub state: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub spot_market: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub spot_market_vault: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub insurance_fund_vault: AccountInfo<'info>,
    /// CHECK: Skip check
    pub drift_signer: AccountInfo<'info>,
    /// CHECK: Skip check
    pub token_program: AccountInfo<'info>,
}

#[derive(Accounts)]
pub struct InitializeSerumFulfillmentConfig<'info> {
    /// CHECK: Skip check
    pub base_spot_market: AccountInfo<'info>,
    /// CHECK: Skip check
    pub quote_spot_market: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub state: AccountInfo<'info>,
    /// CHECK: Skip check
    pub serum_program: AccountInfo<'info>,
    /// CHECK: Skip check
    pub serum_market: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub serum_open_orders: AccountInfo<'info>,
    /// CHECK: Skip check
    pub drift_signer: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub serum_fulfillment_config: AccountInfo<'info>,
    #[account(mut, signer)]
    /// CHECK: Skip check
    pub admin: AccountInfo<'info>,
    /// CHECK: Skip check
    pub rent: AccountInfo<'info>,
    /// CHECK: Skip check
    pub system_program: AccountInfo<'info>,
}

#[derive(Accounts)]
pub struct UpdateSerumFulfillmentConfigStatus<'info> {
    /// CHECK: Skip check
    pub state: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub serum_fulfillment_config: AccountInfo<'info>,
    #[account(mut, signer)]
    /// CHECK: Skip check
    pub admin: AccountInfo<'info>,
}

#[derive(Accounts)]
pub struct InitializeOpenbookV2FulfillmentConfig<'info> {
    /// CHECK: Skip check
    pub base_spot_market: AccountInfo<'info>,
    /// CHECK: Skip check
    pub quote_spot_market: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub state: AccountInfo<'info>,
    /// CHECK: Skip check
    pub openbook_v_2_program: AccountInfo<'info>,
    /// CHECK: Skip check
    pub openbook_v_2_market: AccountInfo<'info>,
    /// CHECK: Skip check
    pub drift_signer: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub openbook_v_2_fulfillment_config: AccountInfo<'info>,
    #[account(mut, signer)]
    /// CHECK: Skip check
    pub admin: AccountInfo<'info>,
    /// CHECK: Skip check
    pub rent: AccountInfo<'info>,
    /// CHECK: Skip check
    pub system_program: AccountInfo<'info>,
}

#[derive(Accounts)]
pub struct OpenbookV2FulfillmentConfigStatus<'info> {
    /// CHECK: Skip check
    pub state: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub openbook_v_2_fulfillment_config: AccountInfo<'info>,
    #[account(mut, signer)]
    /// CHECK: Skip check
    pub admin: AccountInfo<'info>,
}

#[derive(Accounts)]
pub struct InitializePhoenixFulfillmentConfig<'info> {
    /// CHECK: Skip check
    pub base_spot_market: AccountInfo<'info>,
    /// CHECK: Skip check
    pub quote_spot_market: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub state: AccountInfo<'info>,
    /// CHECK: Skip check
    pub phoenix_program: AccountInfo<'info>,
    /// CHECK: Skip check
    pub phoenix_market: AccountInfo<'info>,
    /// CHECK: Skip check
    pub drift_signer: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub phoenix_fulfillment_config: AccountInfo<'info>,
    #[account(mut, signer)]
    /// CHECK: Skip check
    pub admin: AccountInfo<'info>,
    /// CHECK: Skip check
    pub rent: AccountInfo<'info>,
    /// CHECK: Skip check
    pub system_program: AccountInfo<'info>,
}

#[derive(Accounts)]
pub struct PhoenixFulfillmentConfigStatus<'info> {
    /// CHECK: Skip check
    pub state: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub phoenix_fulfillment_config: AccountInfo<'info>,
    #[account(mut, signer)]
    /// CHECK: Skip check
    pub admin: AccountInfo<'info>,
}

#[derive(Accounts)]
pub struct UpdateSerumVault<'info> {
    #[account(mut)]
    /// CHECK: Skip check
    pub state: AccountInfo<'info>,
    #[account(mut, signer)]
    /// CHECK: Skip check
    pub admin: AccountInfo<'info>,
    /// CHECK: Skip check
    pub srm_vault: AccountInfo<'info>,
}

#[derive(Accounts)]
pub struct InitializePerpMarket<'info> {
    #[account(mut, signer)]
    /// CHECK: Skip check
    pub admin: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub state: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub perp_market: AccountInfo<'info>,
    /// CHECK: Skip check
    pub oracle: AccountInfo<'info>,
    /// CHECK: Skip check
    pub rent: AccountInfo<'info>,
    /// CHECK: Skip check
    pub system_program: AccountInfo<'info>,
}

#[derive(Accounts)]
pub struct InitializePredictionMarket<'info> {
    #[account(mut, signer)]
    /// CHECK: Skip check
    pub admin: AccountInfo<'info>,
    /// CHECK: Skip check
    pub state: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub perp_market: AccountInfo<'info>,
}

#[derive(Accounts)]
pub struct DeleteInitializedPerpMarket<'info> {
    #[account(mut, signer)]
    /// CHECK: Skip check
    pub admin: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub state: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub perp_market: AccountInfo<'info>,
}

#[derive(Accounts)]
pub struct MoveAmmPrice<'info> {
    #[account(mut, signer)]
    /// CHECK: Skip check
    pub admin: AccountInfo<'info>,
    /// CHECK: Skip check
    pub state: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub perp_market: AccountInfo<'info>,
}

#[derive(Accounts)]
pub struct RecenterPerpMarketAmm<'info> {
    #[account(mut, signer)]
    /// CHECK: Skip check
    pub admin: AccountInfo<'info>,
    /// CHECK: Skip check
    pub state: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub perp_market: AccountInfo<'info>,
}

#[derive(Accounts)]
pub struct UpdatePerpMarketAmmSummaryStats<'info> {
    #[account(mut, signer)]
    /// CHECK: Skip check
    pub admin: AccountInfo<'info>,
    /// CHECK: Skip check
    pub state: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub perp_market: AccountInfo<'info>,
    /// CHECK: Skip check
    pub spot_market: AccountInfo<'info>,
    /// CHECK: Skip check
    pub oracle: AccountInfo<'info>,
}

#[derive(Accounts)]
pub struct UpdatePerpMarketExpiry<'info> {
    #[account(mut, signer)]
    /// CHECK: Skip check
    pub admin: AccountInfo<'info>,
    /// CHECK: Skip check
    pub state: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub perp_market: AccountInfo<'info>,
}

#[derive(Accounts)]
pub struct SettleExpiredMarketPoolsToRevenuePool<'info> {
    /// CHECK: Skip check
    pub state: AccountInfo<'info>,
    #[account(mut, signer)]
    /// CHECK: Skip check
    pub admin: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub spot_market: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub perp_market: AccountInfo<'info>,
}

#[derive(Accounts)]
pub struct DepositIntoPerpMarketFeePool<'info> {
    #[account(mut)]
    /// CHECK: Skip check
    pub state: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub perp_market: AccountInfo<'info>,
    #[account(mut, signer)]
    /// CHECK: Skip check
    pub admin: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub source_vault: AccountInfo<'info>,
    /// CHECK: Skip check
    pub drift_signer: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub quote_spot_market: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub spot_market_vault: AccountInfo<'info>,
    /// CHECK: Skip check
    pub token_program: AccountInfo<'info>,
}

#[derive(Accounts)]
pub struct DepositIntoSpotMarketVault<'info> {
    /// CHECK: Skip check
    pub state: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub spot_market: AccountInfo<'info>,
    #[account(mut, signer)]
    /// CHECK: Skip check
    pub admin: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub source_vault: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub spot_market_vault: AccountInfo<'info>,
    /// CHECK: Skip check
    pub token_program: AccountInfo<'info>,
}

#[derive(Accounts)]
pub struct DepositIntoSpotMarketRevenuePool<'info> {
    /// CHECK: Skip check
    pub state: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub spot_market: AccountInfo<'info>,
    #[account(mut, signer)]
    /// CHECK: Skip check
    pub authority: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub spot_market_vault: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub user_token_account: AccountInfo<'info>,
    /// CHECK: Skip check
    pub token_program: AccountInfo<'info>,
}

#[derive(Accounts)]
pub struct RepegAmmCurve<'info> {
    /// CHECK: Skip check
    pub state: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub perp_market: AccountInfo<'info>,
    /// CHECK: Skip check
    pub oracle: AccountInfo<'info>,
    #[account(mut, signer)]
    /// CHECK: Skip check
    pub admin: AccountInfo<'info>,
}

#[derive(Accounts)]
pub struct UpdatePerpMarketAmmOracleTwap<'info> {
    /// CHECK: Skip check
    pub state: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub perp_market: AccountInfo<'info>,
    /// CHECK: Skip check
    pub oracle: AccountInfo<'info>,
    #[account(mut, signer)]
    /// CHECK: Skip check
    pub admin: AccountInfo<'info>,
}

#[derive(Accounts)]
pub struct ResetPerpMarketAmmOracleTwap<'info> {
    /// CHECK: Skip check
    pub state: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub perp_market: AccountInfo<'info>,
    /// CHECK: Skip check
    pub oracle: AccountInfo<'info>,
    #[account(mut, signer)]
    /// CHECK: Skip check
    pub admin: AccountInfo<'info>,
}

#[derive(Accounts)]
pub struct UpdateK<'info> {
    #[account(mut, signer)]
    /// CHECK: Skip check
    pub admin: AccountInfo<'info>,
    /// CHECK: Skip check
    pub state: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub perp_market: AccountInfo<'info>,
    /// CHECK: Skip check
    pub oracle: AccountInfo<'info>,
}

#[derive(Accounts)]
pub struct UpdatePerpMarketMarginRatio<'info> {
    #[account(mut, signer)]
    /// CHECK: Skip check
    pub admin: AccountInfo<'info>,
    /// CHECK: Skip check
    pub state: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub perp_market: AccountInfo<'info>,
}

#[derive(Accounts)]
pub struct UpdatePerpMarketFundingPeriod<'info> {
    #[account(mut, signer)]
    /// CHECK: Skip check
    pub admin: AccountInfo<'info>,
    /// CHECK: Skip check
    pub state: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub perp_market: AccountInfo<'info>,
}

#[derive(Accounts)]
pub struct UpdatePerpMarketMaxImbalances<'info> {
    #[account(mut, signer)]
    /// CHECK: Skip check
    pub admin: AccountInfo<'info>,
    /// CHECK: Skip check
    pub state: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub perp_market: AccountInfo<'info>,
}

#[derive(Accounts)]
pub struct UpdatePerpMarketLiquidationFee<'info> {
    #[account(mut, signer)]
    /// CHECK: Skip check
    pub admin: AccountInfo<'info>,
    /// CHECK: Skip check
    pub state: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub perp_market: AccountInfo<'info>,
}

#[derive(Accounts)]
pub struct UpdateInsuranceFundUnstakingPeriod<'info> {
    #[account(mut, signer)]
    /// CHECK: Skip check
    pub admin: AccountInfo<'info>,
    /// CHECK: Skip check
    pub state: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub spot_market: AccountInfo<'info>,
}

#[derive(Accounts)]
pub struct UpdateSpotMarketLiquidationFee<'info> {
    #[account(mut, signer)]
    /// CHECK: Skip check
    pub admin: AccountInfo<'info>,
    /// CHECK: Skip check
    pub state: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub spot_market: AccountInfo<'info>,
}

#[derive(Accounts)]
pub struct UpdateWithdrawGuardThreshold<'info> {
    #[account(mut, signer)]
    /// CHECK: Skip check
    pub admin: AccountInfo<'info>,
    /// CHECK: Skip check
    pub state: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub spot_market: AccountInfo<'info>,
}

#[derive(Accounts)]
pub struct UpdateSpotMarketIfFactor<'info> {
    #[account(mut, signer)]
    /// CHECK: Skip check
    pub admin: AccountInfo<'info>,
    /// CHECK: Skip check
    pub state: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub spot_market: AccountInfo<'info>,
}

#[derive(Accounts)]
pub struct UpdateSpotMarketRevenueSettlePeriod<'info> {
    #[account(mut, signer)]
    /// CHECK: Skip check
    pub admin: AccountInfo<'info>,
    /// CHECK: Skip check
    pub state: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub spot_market: AccountInfo<'info>,
}

#[derive(Accounts)]
pub struct UpdateSpotMarketStatus<'info> {
    #[account(mut, signer)]
    /// CHECK: Skip check
    pub admin: AccountInfo<'info>,
    /// CHECK: Skip check
    pub state: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub spot_market: AccountInfo<'info>,
}

#[derive(Accounts)]
pub struct UpdateSpotMarketPausedOperations<'info> {
    #[account(mut, signer)]
    /// CHECK: Skip check
    pub admin: AccountInfo<'info>,
    /// CHECK: Skip check
    pub state: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub spot_market: AccountInfo<'info>,
}

#[derive(Accounts)]
pub struct UpdateSpotMarketAssetTier<'info> {
    #[account(mut, signer)]
    /// CHECK: Skip check
    pub admin: AccountInfo<'info>,
    /// CHECK: Skip check
    pub state: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub spot_market: AccountInfo<'info>,
}

#[derive(Accounts)]
pub struct UpdateSpotMarketMarginWeights<'info> {
    #[account(mut, signer)]
    /// CHECK: Skip check
    pub admin: AccountInfo<'info>,
    /// CHECK: Skip check
    pub state: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub spot_market: AccountInfo<'info>,
}

#[derive(Accounts)]
pub struct UpdateSpotMarketBorrowRate<'info> {
    #[account(mut, signer)]
    /// CHECK: Skip check
    pub admin: AccountInfo<'info>,
    /// CHECK: Skip check
    pub state: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub spot_market: AccountInfo<'info>,
}

#[derive(Accounts)]
pub struct UpdateSpotMarketMaxTokenDeposits<'info> {
    #[account(mut, signer)]
    /// CHECK: Skip check
    pub admin: AccountInfo<'info>,
    /// CHECK: Skip check
    pub state: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub spot_market: AccountInfo<'info>,
}

#[derive(Accounts)]
pub struct UpdateSpotMarketMaxTokenBorrows<'info> {
    #[account(mut, signer)]
    /// CHECK: Skip check
    pub admin: AccountInfo<'info>,
    /// CHECK: Skip check
    pub state: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub spot_market: AccountInfo<'info>,
}

#[derive(Accounts)]
pub struct UpdateSpotMarketScaleInitialAssetWeightStart<'info> {
    #[account(mut, signer)]
    /// CHECK: Skip check
    pub admin: AccountInfo<'info>,
    /// CHECK: Skip check
    pub state: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub spot_market: AccountInfo<'info>,
}

#[derive(Accounts)]
pub struct UpdateSpotMarketOracle<'info> {
    #[account(mut, signer)]
    /// CHECK: Skip check
    pub admin: AccountInfo<'info>,
    /// CHECK: Skip check
    pub state: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub spot_market: AccountInfo<'info>,
    /// CHECK: Skip check
    pub oracle: AccountInfo<'info>,
}

#[derive(Accounts)]
pub struct UpdateSpotMarketStepSizeAndTickSize<'info> {
    #[account(mut, signer)]
    /// CHECK: Skip check
    pub admin: AccountInfo<'info>,
    /// CHECK: Skip check
    pub state: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub spot_market: AccountInfo<'info>,
}

#[derive(Accounts)]
pub struct UpdateSpotMarketMinOrderSize<'info> {
    #[account(mut, signer)]
    /// CHECK: Skip check
    pub admin: AccountInfo<'info>,
    /// CHECK: Skip check
    pub state: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub spot_market: AccountInfo<'info>,
}

#[derive(Accounts)]
pub struct UpdateSpotMarketOrdersEnabled<'info> {
    #[account(mut, signer)]
    /// CHECK: Skip check
    pub admin: AccountInfo<'info>,
    /// CHECK: Skip check
    pub state: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub spot_market: AccountInfo<'info>,
}

#[derive(Accounts)]
pub struct UpdateSpotMarketIfPausedOperations<'info> {
    #[account(mut, signer)]
    /// CHECK: Skip check
    pub admin: AccountInfo<'info>,
    /// CHECK: Skip check
    pub state: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub spot_market: AccountInfo<'info>,
}

#[derive(Accounts)]
pub struct UpdateSpotMarketName<'info> {
    #[account(mut, signer)]
    /// CHECK: Skip check
    pub admin: AccountInfo<'info>,
    /// CHECK: Skip check
    pub state: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub spot_market: AccountInfo<'info>,
}

#[derive(Accounts)]
pub struct UpdatePerpMarketStatus<'info> {
    #[account(mut, signer)]
    /// CHECK: Skip check
    pub admin: AccountInfo<'info>,
    /// CHECK: Skip check
    pub state: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub perp_market: AccountInfo<'info>,
}

#[derive(Accounts)]
pub struct UpdatePerpMarketPausedOperations<'info> {
    #[account(mut, signer)]
    /// CHECK: Skip check
    pub admin: AccountInfo<'info>,
    /// CHECK: Skip check
    pub state: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub perp_market: AccountInfo<'info>,
}

#[derive(Accounts)]
pub struct UpdatePerpMarketContractTier<'info> {
    #[account(mut, signer)]
    /// CHECK: Skip check
    pub admin: AccountInfo<'info>,
    /// CHECK: Skip check
    pub state: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub perp_market: AccountInfo<'info>,
}

#[derive(Accounts)]
pub struct UpdatePerpMarketImfFactor<'info> {
    #[account(mut, signer)]
    /// CHECK: Skip check
    pub admin: AccountInfo<'info>,
    /// CHECK: Skip check
    pub state: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub perp_market: AccountInfo<'info>,
}

#[derive(Accounts)]
pub struct UpdatePerpMarketUnrealizedAssetWeight<'info> {
    #[account(mut, signer)]
    /// CHECK: Skip check
    pub admin: AccountInfo<'info>,
    /// CHECK: Skip check
    pub state: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub perp_market: AccountInfo<'info>,
}

#[derive(Accounts)]
pub struct UpdatePerpMarketConcentrationCoef<'info> {
    #[account(mut, signer)]
    /// CHECK: Skip check
    pub admin: AccountInfo<'info>,
    /// CHECK: Skip check
    pub state: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub perp_market: AccountInfo<'info>,
}

#[derive(Accounts)]
pub struct UpdatePerpMarketCurveUpdateIntensity<'info> {
    #[account(mut, signer)]
    /// CHECK: Skip check
    pub admin: AccountInfo<'info>,
    /// CHECK: Skip check
    pub state: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub perp_market: AccountInfo<'info>,
}

#[derive(Accounts)]
pub struct UpdatePerpMarketTargetBaseAssetAmountPerLp<'info> {
    #[account(mut, signer)]
    /// CHECK: Skip check
    pub admin: AccountInfo<'info>,
    /// CHECK: Skip check
    pub state: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub perp_market: AccountInfo<'info>,
}

#[derive(Accounts)]
pub struct UpdatePerpMarketPerLpBase<'info> {
    #[account(mut, signer)]
    /// CHECK: Skip check
    pub admin: AccountInfo<'info>,
    /// CHECK: Skip check
    pub state: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub perp_market: AccountInfo<'info>,
}

#[derive(Accounts)]
pub struct UpdateLpCooldownTime<'info> {
    #[account(mut, signer)]
    /// CHECK: Skip check
    pub admin: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub state: AccountInfo<'info>,
}

#[derive(Accounts)]
pub struct UpdatePerpFeeStructure<'info> {
    #[account(mut, signer)]
    /// CHECK: Skip check
    pub admin: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub state: AccountInfo<'info>,
}

#[derive(Accounts)]
pub struct UpdateSpotFeeStructure<'info> {
    #[account(mut, signer)]
    /// CHECK: Skip check
    pub admin: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub state: AccountInfo<'info>,
}

#[derive(Accounts)]
pub struct UpdateInitialPctToLiquidate<'info> {
    #[account(mut, signer)]
    /// CHECK: Skip check
    pub admin: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub state: AccountInfo<'info>,
}

#[derive(Accounts)]
pub struct UpdateLiquidationDuration<'info> {
    #[account(mut, signer)]
    /// CHECK: Skip check
    pub admin: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub state: AccountInfo<'info>,
}

#[derive(Accounts)]
pub struct UpdateLiquidationMarginBufferRatio<'info> {
    #[account(mut, signer)]
    /// CHECK: Skip check
    pub admin: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub state: AccountInfo<'info>,
}

#[derive(Accounts)]
pub struct UpdateOracleGuardRails<'info> {
    #[account(mut, signer)]
    /// CHECK: Skip check
    pub admin: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub state: AccountInfo<'info>,
}

#[derive(Accounts)]
pub struct UpdateStateSettlementDuration<'info> {
    #[account(mut, signer)]
    /// CHECK: Skip check
    pub admin: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub state: AccountInfo<'info>,
}

#[derive(Accounts)]
pub struct UpdateStateMaxNumberOfSubAccounts<'info> {
    #[account(mut, signer)]
    /// CHECK: Skip check
    pub admin: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub state: AccountInfo<'info>,
}

#[derive(Accounts)]
pub struct UpdateStateMaxInitializeUserFee<'info> {
    #[account(mut, signer)]
    /// CHECK: Skip check
    pub admin: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub state: AccountInfo<'info>,
}

#[derive(Accounts)]
pub struct UpdatePerpMarketOracle<'info> {
    /// CHECK: Skip check
    pub state: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub perp_market: AccountInfo<'info>,
    /// CHECK: Skip check
    pub oracle: AccountInfo<'info>,
    #[account(mut, signer)]
    /// CHECK: Skip check
    pub admin: AccountInfo<'info>,
}

#[derive(Accounts)]
pub struct UpdatePerpMarketBaseSpread<'info> {
    #[account(mut, signer)]
    /// CHECK: Skip check
    pub admin: AccountInfo<'info>,
    /// CHECK: Skip check
    pub state: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub perp_market: AccountInfo<'info>,
}

#[derive(Accounts)]
pub struct UpdateAmmJitIntensity<'info> {
    #[account(mut, signer)]
    /// CHECK: Skip check
    pub admin: AccountInfo<'info>,
    /// CHECK: Skip check
    pub state: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub perp_market: AccountInfo<'info>,
}

#[derive(Accounts)]
pub struct UpdatePerpMarketMaxSpread<'info> {
    #[account(mut, signer)]
    /// CHECK: Skip check
    pub admin: AccountInfo<'info>,
    /// CHECK: Skip check
    pub state: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub perp_market: AccountInfo<'info>,
}

#[derive(Accounts)]
pub struct UpdatePerpMarketStepSizeAndTickSize<'info> {
    #[account(mut, signer)]
    /// CHECK: Skip check
    pub admin: AccountInfo<'info>,
    /// CHECK: Skip check
    pub state: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub perp_market: AccountInfo<'info>,
}

#[derive(Accounts)]
pub struct UpdatePerpMarketName<'info> {
    #[account(mut, signer)]
    /// CHECK: Skip check
    pub admin: AccountInfo<'info>,
    /// CHECK: Skip check
    pub state: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub perp_market: AccountInfo<'info>,
}

#[derive(Accounts)]
pub struct UpdatePerpMarketMinOrderSize<'info> {
    #[account(mut, signer)]
    /// CHECK: Skip check
    pub admin: AccountInfo<'info>,
    /// CHECK: Skip check
    pub state: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub perp_market: AccountInfo<'info>,
}

#[derive(Accounts)]
pub struct UpdatePerpMarketMaxSlippageRatio<'info> {
    #[account(mut, signer)]
    /// CHECK: Skip check
    pub admin: AccountInfo<'info>,
    /// CHECK: Skip check
    pub state: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub perp_market: AccountInfo<'info>,
}

#[derive(Accounts)]
pub struct UpdatePerpMarketMaxFillReserveFraction<'info> {
    #[account(mut, signer)]
    /// CHECK: Skip check
    pub admin: AccountInfo<'info>,
    /// CHECK: Skip check
    pub state: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub perp_market: AccountInfo<'info>,
}

#[derive(Accounts)]
pub struct UpdatePerpMarketMaxOpenInterest<'info> {
    #[account(mut, signer)]
    /// CHECK: Skip check
    pub admin: AccountInfo<'info>,
    /// CHECK: Skip check
    pub state: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub perp_market: AccountInfo<'info>,
}

#[derive(Accounts)]
pub struct UpdatePerpMarketNumberOfUsers<'info> {
    #[account(mut, signer)]
    /// CHECK: Skip check
    pub admin: AccountInfo<'info>,
    /// CHECK: Skip check
    pub state: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub perp_market: AccountInfo<'info>,
}

#[derive(Accounts)]
pub struct UpdatePerpMarketFeeAdjustment<'info> {
    #[account(mut, signer)]
    /// CHECK: Skip check
    pub admin: AccountInfo<'info>,
    /// CHECK: Skip check
    pub state: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub perp_market: AccountInfo<'info>,
}

#[derive(Accounts)]
pub struct UpdateSpotMarketFeeAdjustment<'info> {
    #[account(mut, signer)]
    /// CHECK: Skip check
    pub admin: AccountInfo<'info>,
    /// CHECK: Skip check
    pub state: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub spot_market: AccountInfo<'info>,
}

#[derive(Accounts)]
pub struct UpdatePerpMarketFuel<'info> {
    #[account(mut, signer)]
    /// CHECK: Skip check
    pub admin: AccountInfo<'info>,
    /// CHECK: Skip check
    pub state: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub perp_market: AccountInfo<'info>,
}

#[derive(Accounts)]
pub struct UpdateSpotMarketFuel<'info> {
    #[account(mut, signer)]
    /// CHECK: Skip check
    pub admin: AccountInfo<'info>,
    /// CHECK: Skip check
    pub state: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub spot_market: AccountInfo<'info>,
}

#[derive(Accounts)]
pub struct InitUserFuel<'info> {
    #[account(mut, signer)]
    /// CHECK: Skip check
    pub admin: AccountInfo<'info>,
    /// CHECK: Skip check
    pub state: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub user: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub user_stats: AccountInfo<'info>,
}

#[derive(Accounts)]
pub struct UpdateAdmin<'info> {
    #[account(mut, signer)]
    /// CHECK: Skip check
    pub admin: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub state: AccountInfo<'info>,
}

#[derive(Accounts)]
pub struct UpdateWhitelistMint<'info> {
    #[account(mut, signer)]
    /// CHECK: Skip check
    pub admin: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub state: AccountInfo<'info>,
}

#[derive(Accounts)]
pub struct UpdateDiscountMint<'info> {
    #[account(mut, signer)]
    /// CHECK: Skip check
    pub admin: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub state: AccountInfo<'info>,
}

#[derive(Accounts)]
pub struct UpdateExchangeStatus<'info> {
    #[account(mut, signer)]
    /// CHECK: Skip check
    pub admin: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub state: AccountInfo<'info>,
}

#[derive(Accounts)]
pub struct UpdatePerpAuctionDuration<'info> {
    #[account(mut, signer)]
    /// CHECK: Skip check
    pub admin: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub state: AccountInfo<'info>,
}

#[derive(Accounts)]
pub struct UpdateSpotAuctionDuration<'info> {
    #[account(mut, signer)]
    /// CHECK: Skip check
    pub admin: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub state: AccountInfo<'info>,
}

#[derive(Accounts)]
pub struct InitializeProtocolIfSharesTransferConfig<'info> {
    #[account(mut, signer)]
    /// CHECK: Skip check
    pub admin: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub protocol_if_shares_transfer_config: AccountInfo<'info>,
    /// CHECK: Skip check
    pub state: AccountInfo<'info>,
    /// CHECK: Skip check
    pub rent: AccountInfo<'info>,
    /// CHECK: Skip check
    pub system_program: AccountInfo<'info>,
}

#[derive(Accounts)]
pub struct UpdateProtocolIfSharesTransferConfig<'info> {
    #[account(mut, signer)]
    /// CHECK: Skip check
    pub admin: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub protocol_if_shares_transfer_config: AccountInfo<'info>,
    /// CHECK: Skip check
    pub state: AccountInfo<'info>,
}

#[derive(Accounts)]
pub struct InitializePrelaunchOracle<'info> {
    #[account(mut, signer)]
    /// CHECK: Skip check
    pub admin: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub prelaunch_oracle: AccountInfo<'info>,
    /// CHECK: Skip check
    pub state: AccountInfo<'info>,
    /// CHECK: Skip check
    pub rent: AccountInfo<'info>,
    /// CHECK: Skip check
    pub system_program: AccountInfo<'info>,
}

#[derive(Accounts)]
pub struct UpdatePrelaunchOracleParams<'info> {
    #[account(mut, signer)]
    /// CHECK: Skip check
    pub admin: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub prelaunch_oracle: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub perp_market: AccountInfo<'info>,
    /// CHECK: Skip check
    pub state: AccountInfo<'info>,
}

#[derive(Accounts)]
pub struct DeletePrelaunchOracle<'info> {
    #[account(mut, signer)]
    /// CHECK: Skip check
    pub admin: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub prelaunch_oracle: AccountInfo<'info>,
    /// CHECK: Skip check
    pub perp_market: AccountInfo<'info>,
    /// CHECK: Skip check
    pub state: AccountInfo<'info>,
}

#[derive(Accounts)]
pub struct InitializePythPullOracle<'info> {
    #[account(mut, signer)]
    /// CHECK: Skip check
    pub admin: AccountInfo<'info>,
    /// CHECK: Skip check
    pub pyth_solana_receiver: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub price_feed: AccountInfo<'info>,
    /// CHECK: Skip check
    pub system_program: AccountInfo<'info>,
    /// CHECK: Skip check
    pub state: AccountInfo<'info>,
}

// CPI
#[cfg(all(target_os = "solana", feature="cpi"))]
pub mod cpi {
    #![allow(unused)]
    use anchor_lang::Discriminator;
    use super::*;

    pub fn initialize_user<'a, 'b, 'c, 'info>(
        ctx: CpiContext<'a, 'b, 'c, 'info, InitializeUser<'info>>,
        sub_account_id: u16,
        name: [u8;32]
    ) -> anchor_lang::Result<()> {
        let ix = {
            let ix = instructions::InitializeUser { sub_account_id, name };
            let mut data = Vec::with_capacity(256);
            data.extend_from_slice(&instructions::InitializeUser::DISCRIMINATOR);
            AnchorSerialize::serialize(&ix, &mut data)
                .map_err(|_| anchor_lang::error::ErrorCode::InstructionDidNotSerialize)?;
            let accounts = ctx.to_account_metas(None);
            anchor_lang::solana_program::instruction::Instruction {
                program_id: ctx.program.key(),
                accounts,
                data,
            }
        };
        let mut acc_infos = ctx.to_account_infos();
        anchor_lang::solana_program::program::invoke_signed(&ix, &acc_infos, ctx.signer_seeds)
            .map_or_else(|e| Err(Into::into(e)), |_| Ok(()))
    }

    pub fn initialize_user_stats<'a, 'b, 'c, 'info>(
        ctx: CpiContext<'a, 'b, 'c, 'info, InitializeUserStats<'info>>
    ) -> anchor_lang::Result<()> {
        let ix = {
            let ix = instructions::InitializeUserStats {  };
            let mut data = Vec::with_capacity(256);
            data.extend_from_slice(&instructions::InitializeUserStats::DISCRIMINATOR);
            AnchorSerialize::serialize(&ix, &mut data)
                .map_err(|_| anchor_lang::error::ErrorCode::InstructionDidNotSerialize)?;
            let accounts = ctx.to_account_metas(None);
            anchor_lang::solana_program::instruction::Instruction {
                program_id: ctx.program.key(),
                accounts,
                data,
            }
        };
        let mut acc_infos = ctx.to_account_infos();
        anchor_lang::solana_program::program::invoke_signed(&ix, &acc_infos, ctx.signer_seeds)
            .map_or_else(|e| Err(Into::into(e)), |_| Ok(()))
    }

    pub fn initialize_referrer_name<'a, 'b, 'c, 'info>(
        ctx: CpiContext<'a, 'b, 'c, 'info, InitializeReferrerName<'info>>,
        name: [u8;32]
    ) -> anchor_lang::Result<()> {
        let ix = {
            let ix = instructions::InitializeReferrerName { name };
            let mut data = Vec::with_capacity(256);
            data.extend_from_slice(&instructions::InitializeReferrerName::DISCRIMINATOR);
            AnchorSerialize::serialize(&ix, &mut data)
                .map_err(|_| anchor_lang::error::ErrorCode::InstructionDidNotSerialize)?;
            let accounts = ctx.to_account_metas(None);
            anchor_lang::solana_program::instruction::Instruction {
                program_id: ctx.program.key(),
                accounts,
                data,
            }
        };
        let mut acc_infos = ctx.to_account_infos();
        anchor_lang::solana_program::program::invoke_signed(&ix, &acc_infos, ctx.signer_seeds)
            .map_or_else(|e| Err(Into::into(e)), |_| Ok(()))
    }

    pub fn deposit<'a, 'b, 'c, 'info>(
        ctx: CpiContext<'a, 'b, 'c, 'info, Deposit<'info>>,
        market_index: u16,
        amount: u64,
        reduce_only: bool
    ) -> anchor_lang::Result<()> {
        let ix = {
            let ix = instructions::Deposit { market_index, amount, reduce_only };
            let mut data = Vec::with_capacity(256);
            data.extend_from_slice(&instructions::Deposit::DISCRIMINATOR);
            AnchorSerialize::serialize(&ix, &mut data)
                .map_err(|_| anchor_lang::error::ErrorCode::InstructionDidNotSerialize)?;
            let accounts = ctx.to_account_metas(None);
            anchor_lang::solana_program::instruction::Instruction {
                program_id: ctx.program.key(),
                accounts,
                data,
            }
        };
        let mut acc_infos = ctx.to_account_infos();
        anchor_lang::solana_program::program::invoke_signed(&ix, &acc_infos, ctx.signer_seeds)
            .map_or_else(|e| Err(Into::into(e)), |_| Ok(()))
    }

    pub fn withdraw<'a, 'b, 'c, 'info>(
        ctx: CpiContext<'a, 'b, 'c, 'info, Withdraw<'info>>,
        market_index: u16,
        amount: u64,
        reduce_only: bool
    ) -> anchor_lang::Result<()> {
        let ix = {
            let ix = instructions::Withdraw { market_index, amount, reduce_only };
            let mut data = Vec::with_capacity(256);
            data.extend_from_slice(&instructions::Withdraw::DISCRIMINATOR);
            AnchorSerialize::serialize(&ix, &mut data)
                .map_err(|_| anchor_lang::error::ErrorCode::InstructionDidNotSerialize)?;
            let accounts = ctx.to_account_metas(None);
            anchor_lang::solana_program::instruction::Instruction {
                program_id: ctx.program.key(),
                accounts,
                data,
            }
        };
        let mut acc_infos = ctx.to_account_infos();
        anchor_lang::solana_program::program::invoke_signed(&ix, &acc_infos, ctx.signer_seeds)
            .map_or_else(|e| Err(Into::into(e)), |_| Ok(()))
    }

    pub fn transfer_deposit<'a, 'b, 'c, 'info>(
        ctx: CpiContext<'a, 'b, 'c, 'info, TransferDeposit<'info>>,
        market_index: u16,
        amount: u64
    ) -> anchor_lang::Result<()> {
        let ix = {
            let ix = instructions::TransferDeposit { market_index, amount };
            let mut data = Vec::with_capacity(256);
            data.extend_from_slice(&instructions::TransferDeposit::DISCRIMINATOR);
            AnchorSerialize::serialize(&ix, &mut data)
                .map_err(|_| anchor_lang::error::ErrorCode::InstructionDidNotSerialize)?;
            let accounts = ctx.to_account_metas(None);
            anchor_lang::solana_program::instruction::Instruction {
                program_id: ctx.program.key(),
                accounts,
                data,
            }
        };
        let mut acc_infos = ctx.to_account_infos();
        anchor_lang::solana_program::program::invoke_signed(&ix, &acc_infos, ctx.signer_seeds)
            .map_or_else(|e| Err(Into::into(e)), |_| Ok(()))
    }

    pub fn place_perp_order<'a, 'b, 'c, 'info>(
        ctx: CpiContext<'a, 'b, 'c, 'info, PlacePerpOrder<'info>>,
        params: OrderParams
    ) -> anchor_lang::Result<()> {
        let ix = {
            let ix = instructions::PlacePerpOrder { params };
            let mut data = Vec::with_capacity(256);
            data.extend_from_slice(&instructions::PlacePerpOrder::DISCRIMINATOR);
            AnchorSerialize::serialize(&ix, &mut data)
                .map_err(|_| anchor_lang::error::ErrorCode::InstructionDidNotSerialize)?;
            let accounts = ctx.to_account_metas(None);
            anchor_lang::solana_program::instruction::Instruction {
                program_id: ctx.program.key(),
                accounts,
                data,
            }
        };
        let mut acc_infos = ctx.to_account_infos();
        anchor_lang::solana_program::program::invoke_signed(&ix, &acc_infos, ctx.signer_seeds)
            .map_or_else(|e| Err(Into::into(e)), |_| Ok(()))
    }

    pub fn cancel_order<'a, 'b, 'c, 'info>(
        ctx: CpiContext<'a, 'b, 'c, 'info, CancelOrder<'info>>,
        order_id: Option<u32>
    ) -> anchor_lang::Result<()> {
        let ix = {
            let ix = instructions::CancelOrder { order_id };
            let mut data = Vec::with_capacity(256);
            data.extend_from_slice(&instructions::CancelOrder::DISCRIMINATOR);
            AnchorSerialize::serialize(&ix, &mut data)
                .map_err(|_| anchor_lang::error::ErrorCode::InstructionDidNotSerialize)?;
            let accounts = ctx.to_account_metas(None);
            anchor_lang::solana_program::instruction::Instruction {
                program_id: ctx.program.key(),
                accounts,
                data,
            }
        };
        let mut acc_infos = ctx.to_account_infos();
        anchor_lang::solana_program::program::invoke_signed(&ix, &acc_infos, ctx.signer_seeds)
            .map_or_else(|e| Err(Into::into(e)), |_| Ok(()))
    }

    pub fn cancel_order_by_user_id<'a, 'b, 'c, 'info>(
        ctx: CpiContext<'a, 'b, 'c, 'info, CancelOrderByUserId<'info>>,
        user_order_id: u8
    ) -> anchor_lang::Result<()> {
        let ix = {
            let ix = instructions::CancelOrderByUserId { user_order_id };
            let mut data = Vec::with_capacity(256);
            data.extend_from_slice(&instructions::CancelOrderByUserId::DISCRIMINATOR);
            AnchorSerialize::serialize(&ix, &mut data)
                .map_err(|_| anchor_lang::error::ErrorCode::InstructionDidNotSerialize)?;
            let accounts = ctx.to_account_metas(None);
            anchor_lang::solana_program::instruction::Instruction {
                program_id: ctx.program.key(),
                accounts,
                data,
            }
        };
        let mut acc_infos = ctx.to_account_infos();
        anchor_lang::solana_program::program::invoke_signed(&ix, &acc_infos, ctx.signer_seeds)
            .map_or_else(|e| Err(Into::into(e)), |_| Ok(()))
    }

    pub fn cancel_orders<'a, 'b, 'c, 'info>(
        ctx: CpiContext<'a, 'b, 'c, 'info, CancelOrders<'info>>,
        market_type: Option<MarketType>,
        market_index: Option<u16>,
        direction: Option<PositionDirection>
    ) -> anchor_lang::Result<()> {
        let ix = {
            let ix = instructions::CancelOrders { market_type, market_index, direction };
            let mut data = Vec::with_capacity(256);
            data.extend_from_slice(&instructions::CancelOrders::DISCRIMINATOR);
            AnchorSerialize::serialize(&ix, &mut data)
                .map_err(|_| anchor_lang::error::ErrorCode::InstructionDidNotSerialize)?;
            let accounts = ctx.to_account_metas(None);
            anchor_lang::solana_program::instruction::Instruction {
                program_id: ctx.program.key(),
                accounts,
                data,
            }
        };
        let mut acc_infos = ctx.to_account_infos();
        anchor_lang::solana_program::program::invoke_signed(&ix, &acc_infos, ctx.signer_seeds)
            .map_or_else(|e| Err(Into::into(e)), |_| Ok(()))
    }

    pub fn cancel_orders_by_ids<'a, 'b, 'c, 'info>(
        ctx: CpiContext<'a, 'b, 'c, 'info, CancelOrdersByIds<'info>>,
        order_ids: Vec<u32>
    ) -> anchor_lang::Result<()> {
        let ix = {
            let ix = instructions::CancelOrdersByIds { order_ids };
            let mut data = Vec::with_capacity(256);
            data.extend_from_slice(&instructions::CancelOrdersByIds::DISCRIMINATOR);
            AnchorSerialize::serialize(&ix, &mut data)
                .map_err(|_| anchor_lang::error::ErrorCode::InstructionDidNotSerialize)?;
            let accounts = ctx.to_account_metas(None);
            anchor_lang::solana_program::instruction::Instruction {
                program_id: ctx.program.key(),
                accounts,
                data,
            }
        };
        let mut acc_infos = ctx.to_account_infos();
        anchor_lang::solana_program::program::invoke_signed(&ix, &acc_infos, ctx.signer_seeds)
            .map_or_else(|e| Err(Into::into(e)), |_| Ok(()))
    }

    pub fn modify_order<'a, 'b, 'c, 'info>(
        ctx: CpiContext<'a, 'b, 'c, 'info, ModifyOrder<'info>>,
        order_id: Option<u32>,
        modify_order_params: ModifyOrderParams
    ) -> anchor_lang::Result<()> {
        let ix = {
            let ix = instructions::ModifyOrder { order_id, modify_order_params };
            let mut data = Vec::with_capacity(256);
            data.extend_from_slice(&instructions::ModifyOrder::DISCRIMINATOR);
            AnchorSerialize::serialize(&ix, &mut data)
                .map_err(|_| anchor_lang::error::ErrorCode::InstructionDidNotSerialize)?;
            let accounts = ctx.to_account_metas(None);
            anchor_lang::solana_program::instruction::Instruction {
                program_id: ctx.program.key(),
                accounts,
                data,
            }
        };
        let mut acc_infos = ctx.to_account_infos();
        anchor_lang::solana_program::program::invoke_signed(&ix, &acc_infos, ctx.signer_seeds)
            .map_or_else(|e| Err(Into::into(e)), |_| Ok(()))
    }

    pub fn modify_order_by_user_id<'a, 'b, 'c, 'info>(
        ctx: CpiContext<'a, 'b, 'c, 'info, ModifyOrderByUserId<'info>>,
        user_order_id: u8,
        modify_order_params: ModifyOrderParams
    ) -> anchor_lang::Result<()> {
        let ix = {
            let ix = instructions::ModifyOrderByUserId { user_order_id, modify_order_params };
            let mut data = Vec::with_capacity(256);
            data.extend_from_slice(&instructions::ModifyOrderByUserId::DISCRIMINATOR);
            AnchorSerialize::serialize(&ix, &mut data)
                .map_err(|_| anchor_lang::error::ErrorCode::InstructionDidNotSerialize)?;
            let accounts = ctx.to_account_metas(None);
            anchor_lang::solana_program::instruction::Instruction {
                program_id: ctx.program.key(),
                accounts,
                data,
            }
        };
        let mut acc_infos = ctx.to_account_infos();
        anchor_lang::solana_program::program::invoke_signed(&ix, &acc_infos, ctx.signer_seeds)
            .map_or_else(|e| Err(Into::into(e)), |_| Ok(()))
    }

    pub fn place_and_take_perp_order<'a, 'b, 'c, 'info>(
        ctx: CpiContext<'a, 'b, 'c, 'info, PlaceAndTakePerpOrder<'info>>,
        params: OrderParams,
        maker_order_id: Option<u32>
    ) -> anchor_lang::Result<()> {
        let ix = {
            let ix = instructions::PlaceAndTakePerpOrder { params, maker_order_id };
            let mut data = Vec::with_capacity(256);
            data.extend_from_slice(&instructions::PlaceAndTakePerpOrder::DISCRIMINATOR);
            AnchorSerialize::serialize(&ix, &mut data)
                .map_err(|_| anchor_lang::error::ErrorCode::InstructionDidNotSerialize)?;
            let accounts = ctx.to_account_metas(None);
            anchor_lang::solana_program::instruction::Instruction {
                program_id: ctx.program.key(),
                accounts,
                data,
            }
        };
        let mut acc_infos = ctx.to_account_infos();
        anchor_lang::solana_program::program::invoke_signed(&ix, &acc_infos, ctx.signer_seeds)
            .map_or_else(|e| Err(Into::into(e)), |_| Ok(()))
    }

    pub fn place_and_make_perp_order<'a, 'b, 'c, 'info>(
        ctx: CpiContext<'a, 'b, 'c, 'info, PlaceAndMakePerpOrder<'info>>,
        params: OrderParams,
        taker_order_id: u32
    ) -> anchor_lang::Result<()> {
        let ix = {
            let ix = instructions::PlaceAndMakePerpOrder { params, taker_order_id };
            let mut data = Vec::with_capacity(256);
            data.extend_from_slice(&instructions::PlaceAndMakePerpOrder::DISCRIMINATOR);
            AnchorSerialize::serialize(&ix, &mut data)
                .map_err(|_| anchor_lang::error::ErrorCode::InstructionDidNotSerialize)?;
            let accounts = ctx.to_account_metas(None);
            anchor_lang::solana_program::instruction::Instruction {
                program_id: ctx.program.key(),
                accounts,
                data,
            }
        };
        let mut acc_infos = ctx.to_account_infos();
        anchor_lang::solana_program::program::invoke_signed(&ix, &acc_infos, ctx.signer_seeds)
            .map_or_else(|e| Err(Into::into(e)), |_| Ok(()))
    }

    pub fn place_spot_order<'a, 'b, 'c, 'info>(
        ctx: CpiContext<'a, 'b, 'c, 'info, PlaceSpotOrder<'info>>,
        params: OrderParams
    ) -> anchor_lang::Result<()> {
        let ix = {
            let ix = instructions::PlaceSpotOrder { params };
            let mut data = Vec::with_capacity(256);
            data.extend_from_slice(&instructions::PlaceSpotOrder::DISCRIMINATOR);
            AnchorSerialize::serialize(&ix, &mut data)
                .map_err(|_| anchor_lang::error::ErrorCode::InstructionDidNotSerialize)?;
            let accounts = ctx.to_account_metas(None);
            anchor_lang::solana_program::instruction::Instruction {
                program_id: ctx.program.key(),
                accounts,
                data,
            }
        };
        let mut acc_infos = ctx.to_account_infos();
        anchor_lang::solana_program::program::invoke_signed(&ix, &acc_infos, ctx.signer_seeds)
            .map_or_else(|e| Err(Into::into(e)), |_| Ok(()))
    }

    pub fn place_and_take_spot_order<'a, 'b, 'c, 'info>(
        ctx: CpiContext<'a, 'b, 'c, 'info, PlaceAndTakeSpotOrder<'info>>,
        params: OrderParams,
        fulfillment_type: Option<SpotFulfillmentType>,
        maker_order_id: Option<u32>
    ) -> anchor_lang::Result<()> {
        let ix = {
            let ix = instructions::PlaceAndTakeSpotOrder { params, fulfillment_type, maker_order_id };
            let mut data = Vec::with_capacity(256);
            data.extend_from_slice(&instructions::PlaceAndTakeSpotOrder::DISCRIMINATOR);
            AnchorSerialize::serialize(&ix, &mut data)
                .map_err(|_| anchor_lang::error::ErrorCode::InstructionDidNotSerialize)?;
            let accounts = ctx.to_account_metas(None);
            anchor_lang::solana_program::instruction::Instruction {
                program_id: ctx.program.key(),
                accounts,
                data,
            }
        };
        let mut acc_infos = ctx.to_account_infos();
        anchor_lang::solana_program::program::invoke_signed(&ix, &acc_infos, ctx.signer_seeds)
            .map_or_else(|e| Err(Into::into(e)), |_| Ok(()))
    }

    pub fn place_and_make_spot_order<'a, 'b, 'c, 'info>(
        ctx: CpiContext<'a, 'b, 'c, 'info, PlaceAndMakeSpotOrder<'info>>,
        params: OrderParams,
        taker_order_id: u32,
        fulfillment_type: Option<SpotFulfillmentType>
    ) -> anchor_lang::Result<()> {
        let ix = {
            let ix = instructions::PlaceAndMakeSpotOrder { params, taker_order_id, fulfillment_type };
            let mut data = Vec::with_capacity(256);
            data.extend_from_slice(&instructions::PlaceAndMakeSpotOrder::DISCRIMINATOR);
            AnchorSerialize::serialize(&ix, &mut data)
                .map_err(|_| anchor_lang::error::ErrorCode::InstructionDidNotSerialize)?;
            let accounts = ctx.to_account_metas(None);
            anchor_lang::solana_program::instruction::Instruction {
                program_id: ctx.program.key(),
                accounts,
                data,
            }
        };
        let mut acc_infos = ctx.to_account_infos();
        anchor_lang::solana_program::program::invoke_signed(&ix, &acc_infos, ctx.signer_seeds)
            .map_or_else(|e| Err(Into::into(e)), |_| Ok(()))
    }

    pub fn place_orders<'a, 'b, 'c, 'info>(
        ctx: CpiContext<'a, 'b, 'c, 'info, PlaceOrders<'info>>,
        params: Vec<OrderParams>
    ) -> anchor_lang::Result<()> {
        let ix = {
            let ix = instructions::PlaceOrders { params };
            let mut data = Vec::with_capacity(256);
            data.extend_from_slice(&instructions::PlaceOrders::DISCRIMINATOR);
            AnchorSerialize::serialize(&ix, &mut data)
                .map_err(|_| anchor_lang::error::ErrorCode::InstructionDidNotSerialize)?;
            let accounts = ctx.to_account_metas(None);
            anchor_lang::solana_program::instruction::Instruction {
                program_id: ctx.program.key(),
                accounts,
                data,
            }
        };
        let mut acc_infos = ctx.to_account_infos();
        anchor_lang::solana_program::program::invoke_signed(&ix, &acc_infos, ctx.signer_seeds)
            .map_or_else(|e| Err(Into::into(e)), |_| Ok(()))
    }

    pub fn begin_swap<'a, 'b, 'c, 'info>(
        ctx: CpiContext<'a, 'b, 'c, 'info, BeginSwap<'info>>,
        in_market_index: u16,
        out_market_index: u16,
        amount_in: u64
    ) -> anchor_lang::Result<()> {
        let ix = {
            let ix = instructions::BeginSwap { in_market_index, out_market_index, amount_in };
            let mut data = Vec::with_capacity(256);
            data.extend_from_slice(&instructions::BeginSwap::DISCRIMINATOR);
            AnchorSerialize::serialize(&ix, &mut data)
                .map_err(|_| anchor_lang::error::ErrorCode::InstructionDidNotSerialize)?;
            let accounts = ctx.to_account_metas(None);
            anchor_lang::solana_program::instruction::Instruction {
                program_id: ctx.program.key(),
                accounts,
                data,
            }
        };
        let mut acc_infos = ctx.to_account_infos();
        anchor_lang::solana_program::program::invoke_signed(&ix, &acc_infos, ctx.signer_seeds)
            .map_or_else(|e| Err(Into::into(e)), |_| Ok(()))
    }

    pub fn end_swap<'a, 'b, 'c, 'info>(
        ctx: CpiContext<'a, 'b, 'c, 'info, EndSwap<'info>>,
        in_market_index: u16,
        out_market_index: u16,
        limit_price: Option<u64>,
        reduce_only: Option<SwapReduceOnly>
    ) -> anchor_lang::Result<()> {
        let ix = {
            let ix = instructions::EndSwap { in_market_index, out_market_index, limit_price, reduce_only };
            let mut data = Vec::with_capacity(256);
            data.extend_from_slice(&instructions::EndSwap::DISCRIMINATOR);
            AnchorSerialize::serialize(&ix, &mut data)
                .map_err(|_| anchor_lang::error::ErrorCode::InstructionDidNotSerialize)?;
            let accounts = ctx.to_account_metas(None);
            anchor_lang::solana_program::instruction::Instruction {
                program_id: ctx.program.key(),
                accounts,
                data,
            }
        };
        let mut acc_infos = ctx.to_account_infos();
        anchor_lang::solana_program::program::invoke_signed(&ix, &acc_infos, ctx.signer_seeds)
            .map_or_else(|e| Err(Into::into(e)), |_| Ok(()))
    }

    pub fn add_perp_lp_shares<'a, 'b, 'c, 'info>(
        ctx: CpiContext<'a, 'b, 'c, 'info, AddPerpLpShares<'info>>,
        n_shares: u64,
        market_index: u16
    ) -> anchor_lang::Result<()> {
        let ix = {
            let ix = instructions::AddPerpLpShares { n_shares, market_index };
            let mut data = Vec::with_capacity(256);
            data.extend_from_slice(&instructions::AddPerpLpShares::DISCRIMINATOR);
            AnchorSerialize::serialize(&ix, &mut data)
                .map_err(|_| anchor_lang::error::ErrorCode::InstructionDidNotSerialize)?;
            let accounts = ctx.to_account_metas(None);
            anchor_lang::solana_program::instruction::Instruction {
                program_id: ctx.program.key(),
                accounts,
                data,
            }
        };
        let mut acc_infos = ctx.to_account_infos();
        anchor_lang::solana_program::program::invoke_signed(&ix, &acc_infos, ctx.signer_seeds)
            .map_or_else(|e| Err(Into::into(e)), |_| Ok(()))
    }

    pub fn remove_perp_lp_shares<'a, 'b, 'c, 'info>(
        ctx: CpiContext<'a, 'b, 'c, 'info, RemovePerpLpShares<'info>>,
        shares_to_burn: u64,
        market_index: u16
    ) -> anchor_lang::Result<()> {
        let ix = {
            let ix = instructions::RemovePerpLpShares { shares_to_burn, market_index };
            let mut data = Vec::with_capacity(256);
            data.extend_from_slice(&instructions::RemovePerpLpShares::DISCRIMINATOR);
            AnchorSerialize::serialize(&ix, &mut data)
                .map_err(|_| anchor_lang::error::ErrorCode::InstructionDidNotSerialize)?;
            let accounts = ctx.to_account_metas(None);
            anchor_lang::solana_program::instruction::Instruction {
                program_id: ctx.program.key(),
                accounts,
                data,
            }
        };
        let mut acc_infos = ctx.to_account_infos();
        anchor_lang::solana_program::program::invoke_signed(&ix, &acc_infos, ctx.signer_seeds)
            .map_or_else(|e| Err(Into::into(e)), |_| Ok(()))
    }

    pub fn remove_perp_lp_shares_in_expiring_market<'a, 'b, 'c, 'info>(
        ctx: CpiContext<'a, 'b, 'c, 'info, RemovePerpLpSharesInExpiringMarket<'info>>,
        shares_to_burn: u64,
        market_index: u16
    ) -> anchor_lang::Result<()> {
        let ix = {
            let ix = instructions::RemovePerpLpSharesInExpiringMarket { shares_to_burn, market_index };
            let mut data = Vec::with_capacity(256);
            data.extend_from_slice(&instructions::RemovePerpLpSharesInExpiringMarket::DISCRIMINATOR);
            AnchorSerialize::serialize(&ix, &mut data)
                .map_err(|_| anchor_lang::error::ErrorCode::InstructionDidNotSerialize)?;
            let accounts = ctx.to_account_metas(None);
            anchor_lang::solana_program::instruction::Instruction {
                program_id: ctx.program.key(),
                accounts,
                data,
            }
        };
        let mut acc_infos = ctx.to_account_infos();
        anchor_lang::solana_program::program::invoke_signed(&ix, &acc_infos, ctx.signer_seeds)
            .map_or_else(|e| Err(Into::into(e)), |_| Ok(()))
    }

    pub fn update_user_name<'a, 'b, 'c, 'info>(
        ctx: CpiContext<'a, 'b, 'c, 'info, UpdateUserName<'info>>,
        sub_account_id: u16,
        name: [u8;32]
    ) -> anchor_lang::Result<()> {
        let ix = {
            let ix = instructions::UpdateUserName { sub_account_id, name };
            let mut data = Vec::with_capacity(256);
            data.extend_from_slice(&instructions::UpdateUserName::DISCRIMINATOR);
            AnchorSerialize::serialize(&ix, &mut data)
                .map_err(|_| anchor_lang::error::ErrorCode::InstructionDidNotSerialize)?;
            let accounts = ctx.to_account_metas(None);
            anchor_lang::solana_program::instruction::Instruction {
                program_id: ctx.program.key(),
                accounts,
                data,
            }
        };
        let mut acc_infos = ctx.to_account_infos();
        anchor_lang::solana_program::program::invoke_signed(&ix, &acc_infos, ctx.signer_seeds)
            .map_or_else(|e| Err(Into::into(e)), |_| Ok(()))
    }

    pub fn update_user_custom_margin_ratio<'a, 'b, 'c, 'info>(
        ctx: CpiContext<'a, 'b, 'c, 'info, UpdateUserCustomMarginRatio<'info>>,
        sub_account_id: u16,
        margin_ratio: u32
    ) -> anchor_lang::Result<()> {
        let ix = {
            let ix = instructions::UpdateUserCustomMarginRatio { sub_account_id, margin_ratio };
            let mut data = Vec::with_capacity(256);
            data.extend_from_slice(&instructions::UpdateUserCustomMarginRatio::DISCRIMINATOR);
            AnchorSerialize::serialize(&ix, &mut data)
                .map_err(|_| anchor_lang::error::ErrorCode::InstructionDidNotSerialize)?;
            let accounts = ctx.to_account_metas(None);
            anchor_lang::solana_program::instruction::Instruction {
                program_id: ctx.program.key(),
                accounts,
                data,
            }
        };
        let mut acc_infos = ctx.to_account_infos();
        anchor_lang::solana_program::program::invoke_signed(&ix, &acc_infos, ctx.signer_seeds)
            .map_or_else(|e| Err(Into::into(e)), |_| Ok(()))
    }

    pub fn update_user_margin_trading_enabled<'a, 'b, 'c, 'info>(
        ctx: CpiContext<'a, 'b, 'c, 'info, UpdateUserMarginTradingEnabled<'info>>,
        sub_account_id: u16,
        margin_trading_enabled: bool
    ) -> anchor_lang::Result<()> {
        let ix = {
            let ix = instructions::UpdateUserMarginTradingEnabled { sub_account_id, margin_trading_enabled };
            let mut data = Vec::with_capacity(256);
            data.extend_from_slice(&instructions::UpdateUserMarginTradingEnabled::DISCRIMINATOR);
            AnchorSerialize::serialize(&ix, &mut data)
                .map_err(|_| anchor_lang::error::ErrorCode::InstructionDidNotSerialize)?;
            let accounts = ctx.to_account_metas(None);
            anchor_lang::solana_program::instruction::Instruction {
                program_id: ctx.program.key(),
                accounts,
                data,
            }
        };
        let mut acc_infos = ctx.to_account_infos();
        anchor_lang::solana_program::program::invoke_signed(&ix, &acc_infos, ctx.signer_seeds)
            .map_or_else(|e| Err(Into::into(e)), |_| Ok(()))
    }

    pub fn update_user_delegate<'a, 'b, 'c, 'info>(
        ctx: CpiContext<'a, 'b, 'c, 'info, UpdateUserDelegate<'info>>,
        sub_account_id: u16,
        delegate: Pubkey
    ) -> anchor_lang::Result<()> {
        let ix = {
            let ix = instructions::UpdateUserDelegate { sub_account_id, delegate };
            let mut data = Vec::with_capacity(256);
            data.extend_from_slice(&instructions::UpdateUserDelegate::DISCRIMINATOR);
            AnchorSerialize::serialize(&ix, &mut data)
                .map_err(|_| anchor_lang::error::ErrorCode::InstructionDidNotSerialize)?;
            let accounts = ctx.to_account_metas(None);
            anchor_lang::solana_program::instruction::Instruction {
                program_id: ctx.program.key(),
                accounts,
                data,
            }
        };
        let mut acc_infos = ctx.to_account_infos();
        anchor_lang::solana_program::program::invoke_signed(&ix, &acc_infos, ctx.signer_seeds)
            .map_or_else(|e| Err(Into::into(e)), |_| Ok(()))
    }

    pub fn update_user_reduce_only<'a, 'b, 'c, 'info>(
        ctx: CpiContext<'a, 'b, 'c, 'info, UpdateUserReduceOnly<'info>>,
        sub_account_id: u16,
        reduce_only: bool
    ) -> anchor_lang::Result<()> {
        let ix = {
            let ix = instructions::UpdateUserReduceOnly { sub_account_id, reduce_only };
            let mut data = Vec::with_capacity(256);
            data.extend_from_slice(&instructions::UpdateUserReduceOnly::DISCRIMINATOR);
            AnchorSerialize::serialize(&ix, &mut data)
                .map_err(|_| anchor_lang::error::ErrorCode::InstructionDidNotSerialize)?;
            let accounts = ctx.to_account_metas(None);
            anchor_lang::solana_program::instruction::Instruction {
                program_id: ctx.program.key(),
                accounts,
                data,
            }
        };
        let mut acc_infos = ctx.to_account_infos();
        anchor_lang::solana_program::program::invoke_signed(&ix, &acc_infos, ctx.signer_seeds)
            .map_or_else(|e| Err(Into::into(e)), |_| Ok(()))
    }

    pub fn update_user_advanced_lp<'a, 'b, 'c, 'info>(
        ctx: CpiContext<'a, 'b, 'c, 'info, UpdateUserAdvancedLp<'info>>,
        sub_account_id: u16,
        advanced_lp: bool
    ) -> anchor_lang::Result<()> {
        let ix = {
            let ix = instructions::UpdateUserAdvancedLp { sub_account_id, advanced_lp };
            let mut data = Vec::with_capacity(256);
            data.extend_from_slice(&instructions::UpdateUserAdvancedLp::DISCRIMINATOR);
            AnchorSerialize::serialize(&ix, &mut data)
                .map_err(|_| anchor_lang::error::ErrorCode::InstructionDidNotSerialize)?;
            let accounts = ctx.to_account_metas(None);
            anchor_lang::solana_program::instruction::Instruction {
                program_id: ctx.program.key(),
                accounts,
                data,
            }
        };
        let mut acc_infos = ctx.to_account_infos();
        anchor_lang::solana_program::program::invoke_signed(&ix, &acc_infos, ctx.signer_seeds)
            .map_or_else(|e| Err(Into::into(e)), |_| Ok(()))
    }

    pub fn delete_user<'a, 'b, 'c, 'info>(
        ctx: CpiContext<'a, 'b, 'c, 'info, DeleteUser<'info>>
    ) -> anchor_lang::Result<()> {
        let ix = {
            let ix = instructions::DeleteUser {  };
            let mut data = Vec::with_capacity(256);
            data.extend_from_slice(&instructions::DeleteUser::DISCRIMINATOR);
            AnchorSerialize::serialize(&ix, &mut data)
                .map_err(|_| anchor_lang::error::ErrorCode::InstructionDidNotSerialize)?;
            let accounts = ctx.to_account_metas(None);
            anchor_lang::solana_program::instruction::Instruction {
                program_id: ctx.program.key(),
                accounts,
                data,
            }
        };
        let mut acc_infos = ctx.to_account_infos();
        anchor_lang::solana_program::program::invoke_signed(&ix, &acc_infos, ctx.signer_seeds)
            .map_or_else(|e| Err(Into::into(e)), |_| Ok(()))
    }

    pub fn reclaim_rent<'a, 'b, 'c, 'info>(
        ctx: CpiContext<'a, 'b, 'c, 'info, ReclaimRent<'info>>
    ) -> anchor_lang::Result<()> {
        let ix = {
            let ix = instructions::ReclaimRent {  };
            let mut data = Vec::with_capacity(256);
            data.extend_from_slice(&instructions::ReclaimRent::DISCRIMINATOR);
            AnchorSerialize::serialize(&ix, &mut data)
                .map_err(|_| anchor_lang::error::ErrorCode::InstructionDidNotSerialize)?;
            let accounts = ctx.to_account_metas(None);
            anchor_lang::solana_program::instruction::Instruction {
                program_id: ctx.program.key(),
                accounts,
                data,
            }
        };
        let mut acc_infos = ctx.to_account_infos();
        anchor_lang::solana_program::program::invoke_signed(&ix, &acc_infos, ctx.signer_seeds)
            .map_or_else(|e| Err(Into::into(e)), |_| Ok(()))
    }

    pub fn fill_perp_order<'a, 'b, 'c, 'info>(
        ctx: CpiContext<'a, 'b, 'c, 'info, FillPerpOrder<'info>>,
        order_id: Option<u32>,
        maker_order_id: Option<u32>
    ) -> anchor_lang::Result<()> {
        let ix = {
            let ix = instructions::FillPerpOrder { order_id, maker_order_id };
            let mut data = Vec::with_capacity(256);
            data.extend_from_slice(&instructions::FillPerpOrder::DISCRIMINATOR);
            AnchorSerialize::serialize(&ix, &mut data)
                .map_err(|_| anchor_lang::error::ErrorCode::InstructionDidNotSerialize)?;
            let accounts = ctx.to_account_metas(None);
            anchor_lang::solana_program::instruction::Instruction {
                program_id: ctx.program.key(),
                accounts,
                data,
            }
        };
        let mut acc_infos = ctx.to_account_infos();
        anchor_lang::solana_program::program::invoke_signed(&ix, &acc_infos, ctx.signer_seeds)
            .map_or_else(|e| Err(Into::into(e)), |_| Ok(()))
    }

    pub fn revert_fill<'a, 'b, 'c, 'info>(
        ctx: CpiContext<'a, 'b, 'c, 'info, RevertFill<'info>>
    ) -> anchor_lang::Result<()> {
        let ix = {
            let ix = instructions::RevertFill {  };
            let mut data = Vec::with_capacity(256);
            data.extend_from_slice(&instructions::RevertFill::DISCRIMINATOR);
            AnchorSerialize::serialize(&ix, &mut data)
                .map_err(|_| anchor_lang::error::ErrorCode::InstructionDidNotSerialize)?;
            let accounts = ctx.to_account_metas(None);
            anchor_lang::solana_program::instruction::Instruction {
                program_id: ctx.program.key(),
                accounts,
                data,
            }
        };
        let mut acc_infos = ctx.to_account_infos();
        anchor_lang::solana_program::program::invoke_signed(&ix, &acc_infos, ctx.signer_seeds)
            .map_or_else(|e| Err(Into::into(e)), |_| Ok(()))
    }

    pub fn fill_spot_order<'a, 'b, 'c, 'info>(
        ctx: CpiContext<'a, 'b, 'c, 'info, FillSpotOrder<'info>>,
        order_id: Option<u32>,
        fulfillment_type: Option<SpotFulfillmentType>,
        maker_order_id: Option<u32>
    ) -> anchor_lang::Result<()> {
        let ix = {
            let ix = instructions::FillSpotOrder { order_id, fulfillment_type, maker_order_id };
            let mut data = Vec::with_capacity(256);
            data.extend_from_slice(&instructions::FillSpotOrder::DISCRIMINATOR);
            AnchorSerialize::serialize(&ix, &mut data)
                .map_err(|_| anchor_lang::error::ErrorCode::InstructionDidNotSerialize)?;
            let accounts = ctx.to_account_metas(None);
            anchor_lang::solana_program::instruction::Instruction {
                program_id: ctx.program.key(),
                accounts,
                data,
            }
        };
        let mut acc_infos = ctx.to_account_infos();
        anchor_lang::solana_program::program::invoke_signed(&ix, &acc_infos, ctx.signer_seeds)
            .map_or_else(|e| Err(Into::into(e)), |_| Ok(()))
    }

    pub fn trigger_order<'a, 'b, 'c, 'info>(
        ctx: CpiContext<'a, 'b, 'c, 'info, TriggerOrder<'info>>,
        order_id: u32
    ) -> anchor_lang::Result<()> {
        let ix = {
            let ix = instructions::TriggerOrder { order_id };
            let mut data = Vec::with_capacity(256);
            data.extend_from_slice(&instructions::TriggerOrder::DISCRIMINATOR);
            AnchorSerialize::serialize(&ix, &mut data)
                .map_err(|_| anchor_lang::error::ErrorCode::InstructionDidNotSerialize)?;
            let accounts = ctx.to_account_metas(None);
            anchor_lang::solana_program::instruction::Instruction {
                program_id: ctx.program.key(),
                accounts,
                data,
            }
        };
        let mut acc_infos = ctx.to_account_infos();
        anchor_lang::solana_program::program::invoke_signed(&ix, &acc_infos, ctx.signer_seeds)
            .map_or_else(|e| Err(Into::into(e)), |_| Ok(()))
    }

    pub fn force_cancel_orders<'a, 'b, 'c, 'info>(
        ctx: CpiContext<'a, 'b, 'c, 'info, ForceCancelOrders<'info>>
    ) -> anchor_lang::Result<()> {
        let ix = {
            let ix = instructions::ForceCancelOrders {  };
            let mut data = Vec::with_capacity(256);
            data.extend_from_slice(&instructions::ForceCancelOrders::DISCRIMINATOR);
            AnchorSerialize::serialize(&ix, &mut data)
                .map_err(|_| anchor_lang::error::ErrorCode::InstructionDidNotSerialize)?;
            let accounts = ctx.to_account_metas(None);
            anchor_lang::solana_program::instruction::Instruction {
                program_id: ctx.program.key(),
                accounts,
                data,
            }
        };
        let mut acc_infos = ctx.to_account_infos();
        anchor_lang::solana_program::program::invoke_signed(&ix, &acc_infos, ctx.signer_seeds)
            .map_or_else(|e| Err(Into::into(e)), |_| Ok(()))
    }

    pub fn update_user_idle<'a, 'b, 'c, 'info>(
        ctx: CpiContext<'a, 'b, 'c, 'info, UpdateUserIdle<'info>>
    ) -> anchor_lang::Result<()> {
        let ix = {
            let ix = instructions::UpdateUserIdle {  };
            let mut data = Vec::with_capacity(256);
            data.extend_from_slice(&instructions::UpdateUserIdle::DISCRIMINATOR);
            AnchorSerialize::serialize(&ix, &mut data)
                .map_err(|_| anchor_lang::error::ErrorCode::InstructionDidNotSerialize)?;
            let accounts = ctx.to_account_metas(None);
            anchor_lang::solana_program::instruction::Instruction {
                program_id: ctx.program.key(),
                accounts,
                data,
            }
        };
        let mut acc_infos = ctx.to_account_infos();
        anchor_lang::solana_program::program::invoke_signed(&ix, &acc_infos, ctx.signer_seeds)
            .map_or_else(|e| Err(Into::into(e)), |_| Ok(()))
    }

    pub fn update_user_open_orders_count<'a, 'b, 'c, 'info>(
        ctx: CpiContext<'a, 'b, 'c, 'info, UpdateUserOpenOrdersCount<'info>>
    ) -> anchor_lang::Result<()> {
        let ix = {
            let ix = instructions::UpdateUserOpenOrdersCount {  };
            let mut data = Vec::with_capacity(256);
            data.extend_from_slice(&instructions::UpdateUserOpenOrdersCount::DISCRIMINATOR);
            AnchorSerialize::serialize(&ix, &mut data)
                .map_err(|_| anchor_lang::error::ErrorCode::InstructionDidNotSerialize)?;
            let accounts = ctx.to_account_metas(None);
            anchor_lang::solana_program::instruction::Instruction {
                program_id: ctx.program.key(),
                accounts,
                data,
            }
        };
        let mut acc_infos = ctx.to_account_infos();
        anchor_lang::solana_program::program::invoke_signed(&ix, &acc_infos, ctx.signer_seeds)
            .map_or_else(|e| Err(Into::into(e)), |_| Ok(()))
    }

    pub fn admin_disable_update_perp_bid_ask_twap<'a, 'b, 'c, 'info>(
        ctx: CpiContext<'a, 'b, 'c, 'info, AdminDisableUpdatePerpBidAskTwap<'info>>,
        disable: bool
    ) -> anchor_lang::Result<()> {
        let ix = {
            let ix = instructions::AdminDisableUpdatePerpBidAskTwap { disable };
            let mut data = Vec::with_capacity(256);
            data.extend_from_slice(&instructions::AdminDisableUpdatePerpBidAskTwap::DISCRIMINATOR);
            AnchorSerialize::serialize(&ix, &mut data)
                .map_err(|_| anchor_lang::error::ErrorCode::InstructionDidNotSerialize)?;
            let accounts = ctx.to_account_metas(None);
            anchor_lang::solana_program::instruction::Instruction {
                program_id: ctx.program.key(),
                accounts,
                data,
            }
        };
        let mut acc_infos = ctx.to_account_infos();
        anchor_lang::solana_program::program::invoke_signed(&ix, &acc_infos, ctx.signer_seeds)
            .map_or_else(|e| Err(Into::into(e)), |_| Ok(()))
    }

    pub fn settle_pnl<'a, 'b, 'c, 'info>(
        ctx: CpiContext<'a, 'b, 'c, 'info, SettlePnl<'info>>,
        market_index: u16
    ) -> anchor_lang::Result<()> {
        let ix = {
            let ix = instructions::SettlePnl { market_index };
            let mut data = Vec::with_capacity(256);
            data.extend_from_slice(&instructions::SettlePnl::DISCRIMINATOR);
            AnchorSerialize::serialize(&ix, &mut data)
                .map_err(|_| anchor_lang::error::ErrorCode::InstructionDidNotSerialize)?;
            let accounts = ctx.to_account_metas(None);
            anchor_lang::solana_program::instruction::Instruction {
                program_id: ctx.program.key(),
                accounts,
                data,
            }
        };
        let mut acc_infos = ctx.to_account_infos();
        anchor_lang::solana_program::program::invoke_signed(&ix, &acc_infos, ctx.signer_seeds)
            .map_or_else(|e| Err(Into::into(e)), |_| Ok(()))
    }

    pub fn settle_multiple_pnls<'a, 'b, 'c, 'info>(
        ctx: CpiContext<'a, 'b, 'c, 'info, SettleMultiplePnls<'info>>,
        market_indexes: Vec<u16>,
        mode: SettlePnlMode
    ) -> anchor_lang::Result<()> {
        let ix = {
            let ix = instructions::SettleMultiplePnls { market_indexes, mode };
            let mut data = Vec::with_capacity(256);
            data.extend_from_slice(&instructions::SettleMultiplePnls::DISCRIMINATOR);
            AnchorSerialize::serialize(&ix, &mut data)
                .map_err(|_| anchor_lang::error::ErrorCode::InstructionDidNotSerialize)?;
            let accounts = ctx.to_account_metas(None);
            anchor_lang::solana_program::instruction::Instruction {
                program_id: ctx.program.key(),
                accounts,
                data,
            }
        };
        let mut acc_infos = ctx.to_account_infos();
        anchor_lang::solana_program::program::invoke_signed(&ix, &acc_infos, ctx.signer_seeds)
            .map_or_else(|e| Err(Into::into(e)), |_| Ok(()))
    }

    pub fn settle_funding_payment<'a, 'b, 'c, 'info>(
        ctx: CpiContext<'a, 'b, 'c, 'info, SettleFundingPayment<'info>>
    ) -> anchor_lang::Result<()> {
        let ix = {
            let ix = instructions::SettleFundingPayment {  };
            let mut data = Vec::with_capacity(256);
            data.extend_from_slice(&instructions::SettleFundingPayment::DISCRIMINATOR);
            AnchorSerialize::serialize(&ix, &mut data)
                .map_err(|_| anchor_lang::error::ErrorCode::InstructionDidNotSerialize)?;
            let accounts = ctx.to_account_metas(None);
            anchor_lang::solana_program::instruction::Instruction {
                program_id: ctx.program.key(),
                accounts,
                data,
            }
        };
        let mut acc_infos = ctx.to_account_infos();
        anchor_lang::solana_program::program::invoke_signed(&ix, &acc_infos, ctx.signer_seeds)
            .map_or_else(|e| Err(Into::into(e)), |_| Ok(()))
    }

    pub fn settle_lp<'a, 'b, 'c, 'info>(
        ctx: CpiContext<'a, 'b, 'c, 'info, SettleLp<'info>>,
        market_index: u16
    ) -> anchor_lang::Result<()> {
        let ix = {
            let ix = instructions::SettleLp { market_index };
            let mut data = Vec::with_capacity(256);
            data.extend_from_slice(&instructions::SettleLp::DISCRIMINATOR);
            AnchorSerialize::serialize(&ix, &mut data)
                .map_err(|_| anchor_lang::error::ErrorCode::InstructionDidNotSerialize)?;
            let accounts = ctx.to_account_metas(None);
            anchor_lang::solana_program::instruction::Instruction {
                program_id: ctx.program.key(),
                accounts,
                data,
            }
        };
        let mut acc_infos = ctx.to_account_infos();
        anchor_lang::solana_program::program::invoke_signed(&ix, &acc_infos, ctx.signer_seeds)
            .map_or_else(|e| Err(Into::into(e)), |_| Ok(()))
    }

    pub fn settle_expired_market<'a, 'b, 'c, 'info>(
        ctx: CpiContext<'a, 'b, 'c, 'info, SettleExpiredMarket<'info>>,
        market_index: u16
    ) -> anchor_lang::Result<()> {
        let ix = {
            let ix = instructions::SettleExpiredMarket { market_index };
            let mut data = Vec::with_capacity(256);
            data.extend_from_slice(&instructions::SettleExpiredMarket::DISCRIMINATOR);
            AnchorSerialize::serialize(&ix, &mut data)
                .map_err(|_| anchor_lang::error::ErrorCode::InstructionDidNotSerialize)?;
            let accounts = ctx.to_account_metas(None);
            anchor_lang::solana_program::instruction::Instruction {
                program_id: ctx.program.key(),
                accounts,
                data,
            }
        };
        let mut acc_infos = ctx.to_account_infos();
        anchor_lang::solana_program::program::invoke_signed(&ix, &acc_infos, ctx.signer_seeds)
            .map_or_else(|e| Err(Into::into(e)), |_| Ok(()))
    }

    pub fn liquidate_perp<'a, 'b, 'c, 'info>(
        ctx: CpiContext<'a, 'b, 'c, 'info, LiquidatePerp<'info>>,
        market_index: u16,
        liquidator_max_base_asset_amount: u64,
        limit_price: Option<u64>
    ) -> anchor_lang::Result<()> {
        let ix = {
            let ix = instructions::LiquidatePerp { market_index, liquidator_max_base_asset_amount, limit_price };
            let mut data = Vec::with_capacity(256);
            data.extend_from_slice(&instructions::LiquidatePerp::DISCRIMINATOR);
            AnchorSerialize::serialize(&ix, &mut data)
                .map_err(|_| anchor_lang::error::ErrorCode::InstructionDidNotSerialize)?;
            let accounts = ctx.to_account_metas(None);
            anchor_lang::solana_program::instruction::Instruction {
                program_id: ctx.program.key(),
                accounts,
                data,
            }
        };
        let mut acc_infos = ctx.to_account_infos();
        anchor_lang::solana_program::program::invoke_signed(&ix, &acc_infos, ctx.signer_seeds)
            .map_or_else(|e| Err(Into::into(e)), |_| Ok(()))
    }

    pub fn liquidate_perp_with_fill<'a, 'b, 'c, 'info>(
        ctx: CpiContext<'a, 'b, 'c, 'info, LiquidatePerpWithFill<'info>>,
        market_index: u16
    ) -> anchor_lang::Result<()> {
        let ix = {
            let ix = instructions::LiquidatePerpWithFill { market_index };
            let mut data = Vec::with_capacity(256);
            data.extend_from_slice(&instructions::LiquidatePerpWithFill::DISCRIMINATOR);
            AnchorSerialize::serialize(&ix, &mut data)
                .map_err(|_| anchor_lang::error::ErrorCode::InstructionDidNotSerialize)?;
            let accounts = ctx.to_account_metas(None);
            anchor_lang::solana_program::instruction::Instruction {
                program_id: ctx.program.key(),
                accounts,
                data,
            }
        };
        let mut acc_infos = ctx.to_account_infos();
        anchor_lang::solana_program::program::invoke_signed(&ix, &acc_infos, ctx.signer_seeds)
            .map_or_else(|e| Err(Into::into(e)), |_| Ok(()))
    }

    pub fn liquidate_spot<'a, 'b, 'c, 'info>(
        ctx: CpiContext<'a, 'b, 'c, 'info, LiquidateSpot<'info>>,
        asset_market_index: u16,
        liability_market_index: u16,
        liquidator_max_liability_transfer: u128,
        limit_price: Option<u64>
    ) -> anchor_lang::Result<()> {
        let ix = {
            let ix = instructions::LiquidateSpot { asset_market_index, liability_market_index, liquidator_max_liability_transfer, limit_price };
            let mut data = Vec::with_capacity(256);
            data.extend_from_slice(&instructions::LiquidateSpot::DISCRIMINATOR);
            AnchorSerialize::serialize(&ix, &mut data)
                .map_err(|_| anchor_lang::error::ErrorCode::InstructionDidNotSerialize)?;
            let accounts = ctx.to_account_metas(None);
            anchor_lang::solana_program::instruction::Instruction {
                program_id: ctx.program.key(),
                accounts,
                data,
            }
        };
        let mut acc_infos = ctx.to_account_infos();
        anchor_lang::solana_program::program::invoke_signed(&ix, &acc_infos, ctx.signer_seeds)
            .map_or_else(|e| Err(Into::into(e)), |_| Ok(()))
    }

    pub fn liquidate_borrow_for_perp_pnl<'a, 'b, 'c, 'info>(
        ctx: CpiContext<'a, 'b, 'c, 'info, LiquidateBorrowForPerpPnl<'info>>,
        perp_market_index: u16,
        spot_market_index: u16,
        liquidator_max_liability_transfer: u128,
        limit_price: Option<u64>
    ) -> anchor_lang::Result<()> {
        let ix = {
            let ix = instructions::LiquidateBorrowForPerpPnl { perp_market_index, spot_market_index, liquidator_max_liability_transfer, limit_price };
            let mut data = Vec::with_capacity(256);
            data.extend_from_slice(&instructions::LiquidateBorrowForPerpPnl::DISCRIMINATOR);
            AnchorSerialize::serialize(&ix, &mut data)
                .map_err(|_| anchor_lang::error::ErrorCode::InstructionDidNotSerialize)?;
            let accounts = ctx.to_account_metas(None);
            anchor_lang::solana_program::instruction::Instruction {
                program_id: ctx.program.key(),
                accounts,
                data,
            }
        };
        let mut acc_infos = ctx.to_account_infos();
        anchor_lang::solana_program::program::invoke_signed(&ix, &acc_infos, ctx.signer_seeds)
            .map_or_else(|e| Err(Into::into(e)), |_| Ok(()))
    }

    pub fn liquidate_perp_pnl_for_deposit<'a, 'b, 'c, 'info>(
        ctx: CpiContext<'a, 'b, 'c, 'info, LiquidatePerpPnlForDeposit<'info>>,
        perp_market_index: u16,
        spot_market_index: u16,
        liquidator_max_pnl_transfer: u128,
        limit_price: Option<u64>
    ) -> anchor_lang::Result<()> {
        let ix = {
            let ix = instructions::LiquidatePerpPnlForDeposit { perp_market_index, spot_market_index, liquidator_max_pnl_transfer, limit_price };
            let mut data = Vec::with_capacity(256);
            data.extend_from_slice(&instructions::LiquidatePerpPnlForDeposit::DISCRIMINATOR);
            AnchorSerialize::serialize(&ix, &mut data)
                .map_err(|_| anchor_lang::error::ErrorCode::InstructionDidNotSerialize)?;
            let accounts = ctx.to_account_metas(None);
            anchor_lang::solana_program::instruction::Instruction {
                program_id: ctx.program.key(),
                accounts,
                data,
            }
        };
        let mut acc_infos = ctx.to_account_infos();
        anchor_lang::solana_program::program::invoke_signed(&ix, &acc_infos, ctx.signer_seeds)
            .map_or_else(|e| Err(Into::into(e)), |_| Ok(()))
    }

    pub fn set_user_status_to_being_liquidated<'a, 'b, 'c, 'info>(
        ctx: CpiContext<'a, 'b, 'c, 'info, SetUserStatusToBeingLiquidated<'info>>
    ) -> anchor_lang::Result<()> {
        let ix = {
            let ix = instructions::SetUserStatusToBeingLiquidated {  };
            let mut data = Vec::with_capacity(256);
            data.extend_from_slice(&instructions::SetUserStatusToBeingLiquidated::DISCRIMINATOR);
            AnchorSerialize::serialize(&ix, &mut data)
                .map_err(|_| anchor_lang::error::ErrorCode::InstructionDidNotSerialize)?;
            let accounts = ctx.to_account_metas(None);
            anchor_lang::solana_program::instruction::Instruction {
                program_id: ctx.program.key(),
                accounts,
                data,
            }
        };
        let mut acc_infos = ctx.to_account_infos();
        anchor_lang::solana_program::program::invoke_signed(&ix, &acc_infos, ctx.signer_seeds)
            .map_or_else(|e| Err(Into::into(e)), |_| Ok(()))
    }

    pub fn resolve_perp_pnl_deficit<'a, 'b, 'c, 'info>(
        ctx: CpiContext<'a, 'b, 'c, 'info, ResolvePerpPnlDeficit<'info>>,
        spot_market_index: u16,
        perp_market_index: u16
    ) -> anchor_lang::Result<()> {
        let ix = {
            let ix = instructions::ResolvePerpPnlDeficit { spot_market_index, perp_market_index };
            let mut data = Vec::with_capacity(256);
            data.extend_from_slice(&instructions::ResolvePerpPnlDeficit::DISCRIMINATOR);
            AnchorSerialize::serialize(&ix, &mut data)
                .map_err(|_| anchor_lang::error::ErrorCode::InstructionDidNotSerialize)?;
            let accounts = ctx.to_account_metas(None);
            anchor_lang::solana_program::instruction::Instruction {
                program_id: ctx.program.key(),
                accounts,
                data,
            }
        };
        let mut acc_infos = ctx.to_account_infos();
        anchor_lang::solana_program::program::invoke_signed(&ix, &acc_infos, ctx.signer_seeds)
            .map_or_else(|e| Err(Into::into(e)), |_| Ok(()))
    }

    pub fn resolve_perp_bankruptcy<'a, 'b, 'c, 'info>(
        ctx: CpiContext<'a, 'b, 'c, 'info, ResolvePerpBankruptcy<'info>>,
        quote_spot_market_index: u16,
        market_index: u16
    ) -> anchor_lang::Result<()> {
        let ix = {
            let ix = instructions::ResolvePerpBankruptcy { quote_spot_market_index, market_index };
            let mut data = Vec::with_capacity(256);
            data.extend_from_slice(&instructions::ResolvePerpBankruptcy::DISCRIMINATOR);
            AnchorSerialize::serialize(&ix, &mut data)
                .map_err(|_| anchor_lang::error::ErrorCode::InstructionDidNotSerialize)?;
            let accounts = ctx.to_account_metas(None);
            anchor_lang::solana_program::instruction::Instruction {
                program_id: ctx.program.key(),
                accounts,
                data,
            }
        };
        let mut acc_infos = ctx.to_account_infos();
        anchor_lang::solana_program::program::invoke_signed(&ix, &acc_infos, ctx.signer_seeds)
            .map_or_else(|e| Err(Into::into(e)), |_| Ok(()))
    }

    pub fn resolve_spot_bankruptcy<'a, 'b, 'c, 'info>(
        ctx: CpiContext<'a, 'b, 'c, 'info, ResolveSpotBankruptcy<'info>>,
        market_index: u16
    ) -> anchor_lang::Result<()> {
        let ix = {
            let ix = instructions::ResolveSpotBankruptcy { market_index };
            let mut data = Vec::with_capacity(256);
            data.extend_from_slice(&instructions::ResolveSpotBankruptcy::DISCRIMINATOR);
            AnchorSerialize::serialize(&ix, &mut data)
                .map_err(|_| anchor_lang::error::ErrorCode::InstructionDidNotSerialize)?;
            let accounts = ctx.to_account_metas(None);
            anchor_lang::solana_program::instruction::Instruction {
                program_id: ctx.program.key(),
                accounts,
                data,
            }
        };
        let mut acc_infos = ctx.to_account_infos();
        anchor_lang::solana_program::program::invoke_signed(&ix, &acc_infos, ctx.signer_seeds)
            .map_or_else(|e| Err(Into::into(e)), |_| Ok(()))
    }

    pub fn settle_revenue_to_insurance_fund<'a, 'b, 'c, 'info>(
        ctx: CpiContext<'a, 'b, 'c, 'info, SettleRevenueToInsuranceFund<'info>>,
        spot_market_index: u16
    ) -> anchor_lang::Result<()> {
        let ix = {
            let ix = instructions::SettleRevenueToInsuranceFund { spot_market_index };
            let mut data = Vec::with_capacity(256);
            data.extend_from_slice(&instructions::SettleRevenueToInsuranceFund::DISCRIMINATOR);
            AnchorSerialize::serialize(&ix, &mut data)
                .map_err(|_| anchor_lang::error::ErrorCode::InstructionDidNotSerialize)?;
            let accounts = ctx.to_account_metas(None);
            anchor_lang::solana_program::instruction::Instruction {
                program_id: ctx.program.key(),
                accounts,
                data,
            }
        };
        let mut acc_infos = ctx.to_account_infos();
        anchor_lang::solana_program::program::invoke_signed(&ix, &acc_infos, ctx.signer_seeds)
            .map_or_else(|e| Err(Into::into(e)), |_| Ok(()))
    }

    pub fn update_funding_rate<'a, 'b, 'c, 'info>(
        ctx: CpiContext<'a, 'b, 'c, 'info, UpdateFundingRate<'info>>,
        market_index: u16
    ) -> anchor_lang::Result<()> {
        let ix = {
            let ix = instructions::UpdateFundingRate { market_index };
            let mut data = Vec::with_capacity(256);
            data.extend_from_slice(&instructions::UpdateFundingRate::DISCRIMINATOR);
            AnchorSerialize::serialize(&ix, &mut data)
                .map_err(|_| anchor_lang::error::ErrorCode::InstructionDidNotSerialize)?;
            let accounts = ctx.to_account_metas(None);
            anchor_lang::solana_program::instruction::Instruction {
                program_id: ctx.program.key(),
                accounts,
                data,
            }
        };
        let mut acc_infos = ctx.to_account_infos();
        anchor_lang::solana_program::program::invoke_signed(&ix, &acc_infos, ctx.signer_seeds)
            .map_or_else(|e| Err(Into::into(e)), |_| Ok(()))
    }

    pub fn update_prelaunch_oracle<'a, 'b, 'c, 'info>(
        ctx: CpiContext<'a, 'b, 'c, 'info, UpdatePrelaunchOracle<'info>>
    ) -> anchor_lang::Result<()> {
        let ix = {
            let ix = instructions::UpdatePrelaunchOracle {  };
            let mut data = Vec::with_capacity(256);
            data.extend_from_slice(&instructions::UpdatePrelaunchOracle::DISCRIMINATOR);
            AnchorSerialize::serialize(&ix, &mut data)
                .map_err(|_| anchor_lang::error::ErrorCode::InstructionDidNotSerialize)?;
            let accounts = ctx.to_account_metas(None);
            anchor_lang::solana_program::instruction::Instruction {
                program_id: ctx.program.key(),
                accounts,
                data,
            }
        };
        let mut acc_infos = ctx.to_account_infos();
        anchor_lang::solana_program::program::invoke_signed(&ix, &acc_infos, ctx.signer_seeds)
            .map_or_else(|e| Err(Into::into(e)), |_| Ok(()))
    }

    pub fn update_perp_bid_ask_twap<'a, 'b, 'c, 'info>(
        ctx: CpiContext<'a, 'b, 'c, 'info, UpdatePerpBidAskTwap<'info>>
    ) -> anchor_lang::Result<()> {
        let ix = {
            let ix = instructions::UpdatePerpBidAskTwap {  };
            let mut data = Vec::with_capacity(256);
            data.extend_from_slice(&instructions::UpdatePerpBidAskTwap::DISCRIMINATOR);
            AnchorSerialize::serialize(&ix, &mut data)
                .map_err(|_| anchor_lang::error::ErrorCode::InstructionDidNotSerialize)?;
            let accounts = ctx.to_account_metas(None);
            anchor_lang::solana_program::instruction::Instruction {
                program_id: ctx.program.key(),
                accounts,
                data,
            }
        };
        let mut acc_infos = ctx.to_account_infos();
        anchor_lang::solana_program::program::invoke_signed(&ix, &acc_infos, ctx.signer_seeds)
            .map_or_else(|e| Err(Into::into(e)), |_| Ok(()))
    }

    pub fn update_spot_market_cumulative_interest<'a, 'b, 'c, 'info>(
        ctx: CpiContext<'a, 'b, 'c, 'info, UpdateSpotMarketCumulativeInterest<'info>>
    ) -> anchor_lang::Result<()> {
        let ix = {
            let ix = instructions::UpdateSpotMarketCumulativeInterest {  };
            let mut data = Vec::with_capacity(256);
            data.extend_from_slice(&instructions::UpdateSpotMarketCumulativeInterest::DISCRIMINATOR);
            AnchorSerialize::serialize(&ix, &mut data)
                .map_err(|_| anchor_lang::error::ErrorCode::InstructionDidNotSerialize)?;
            let accounts = ctx.to_account_metas(None);
            anchor_lang::solana_program::instruction::Instruction {
                program_id: ctx.program.key(),
                accounts,
                data,
            }
        };
        let mut acc_infos = ctx.to_account_infos();
        anchor_lang::solana_program::program::invoke_signed(&ix, &acc_infos, ctx.signer_seeds)
            .map_or_else(|e| Err(Into::into(e)), |_| Ok(()))
    }

    pub fn update_amms<'a, 'b, 'c, 'info>(
        ctx: CpiContext<'a, 'b, 'c, 'info, UpdateAmms<'info>>,
        market_indexes: [u16;5]
    ) -> anchor_lang::Result<()> {
        let ix = {
            let ix = instructions::UpdateAmms { market_indexes };
            let mut data = Vec::with_capacity(256);
            data.extend_from_slice(&instructions::UpdateAmms::DISCRIMINATOR);
            AnchorSerialize::serialize(&ix, &mut data)
                .map_err(|_| anchor_lang::error::ErrorCode::InstructionDidNotSerialize)?;
            let accounts = ctx.to_account_metas(None);
            anchor_lang::solana_program::instruction::Instruction {
                program_id: ctx.program.key(),
                accounts,
                data,
            }
        };
        let mut acc_infos = ctx.to_account_infos();
        anchor_lang::solana_program::program::invoke_signed(&ix, &acc_infos, ctx.signer_seeds)
            .map_or_else(|e| Err(Into::into(e)), |_| Ok(()))
    }

    pub fn update_spot_market_expiry<'a, 'b, 'c, 'info>(
        ctx: CpiContext<'a, 'b, 'c, 'info, UpdateSpotMarketExpiry<'info>>,
        expiry_ts: i64
    ) -> anchor_lang::Result<()> {
        let ix = {
            let ix = instructions::UpdateSpotMarketExpiry { expiry_ts };
            let mut data = Vec::with_capacity(256);
            data.extend_from_slice(&instructions::UpdateSpotMarketExpiry::DISCRIMINATOR);
            AnchorSerialize::serialize(&ix, &mut data)
                .map_err(|_| anchor_lang::error::ErrorCode::InstructionDidNotSerialize)?;
            let accounts = ctx.to_account_metas(None);
            anchor_lang::solana_program::instruction::Instruction {
                program_id: ctx.program.key(),
                accounts,
                data,
            }
        };
        let mut acc_infos = ctx.to_account_infos();
        anchor_lang::solana_program::program::invoke_signed(&ix, &acc_infos, ctx.signer_seeds)
            .map_or_else(|e| Err(Into::into(e)), |_| Ok(()))
    }

    pub fn update_user_quote_asset_insurance_stake<'a, 'b, 'c, 'info>(
        ctx: CpiContext<'a, 'b, 'c, 'info, UpdateUserQuoteAssetInsuranceStake<'info>>
    ) -> anchor_lang::Result<()> {
        let ix = {
            let ix = instructions::UpdateUserQuoteAssetInsuranceStake {  };
            let mut data = Vec::with_capacity(256);
            data.extend_from_slice(&instructions::UpdateUserQuoteAssetInsuranceStake::DISCRIMINATOR);
            AnchorSerialize::serialize(&ix, &mut data)
                .map_err(|_| anchor_lang::error::ErrorCode::InstructionDidNotSerialize)?;
            let accounts = ctx.to_account_metas(None);
            anchor_lang::solana_program::instruction::Instruction {
                program_id: ctx.program.key(),
                accounts,
                data,
            }
        };
        let mut acc_infos = ctx.to_account_infos();
        anchor_lang::solana_program::program::invoke_signed(&ix, &acc_infos, ctx.signer_seeds)
            .map_or_else(|e| Err(Into::into(e)), |_| Ok(()))
    }

    pub fn update_user_gov_token_insurance_stake<'a, 'b, 'c, 'info>(
        ctx: CpiContext<'a, 'b, 'c, 'info, UpdateUserGovTokenInsuranceStake<'info>>
    ) -> anchor_lang::Result<()> {
        let ix = {
            let ix = instructions::UpdateUserGovTokenInsuranceStake {  };
            let mut data = Vec::with_capacity(256);
            data.extend_from_slice(&instructions::UpdateUserGovTokenInsuranceStake::DISCRIMINATOR);
            AnchorSerialize::serialize(&ix, &mut data)
                .map_err(|_| anchor_lang::error::ErrorCode::InstructionDidNotSerialize)?;
            let accounts = ctx.to_account_metas(None);
            anchor_lang::solana_program::instruction::Instruction {
                program_id: ctx.program.key(),
                accounts,
                data,
            }
        };
        let mut acc_infos = ctx.to_account_infos();
        anchor_lang::solana_program::program::invoke_signed(&ix, &acc_infos, ctx.signer_seeds)
            .map_or_else(|e| Err(Into::into(e)), |_| Ok(()))
    }

    pub fn initialize_insurance_fund_stake<'a, 'b, 'c, 'info>(
        ctx: CpiContext<'a, 'b, 'c, 'info, InitializeInsuranceFundStake<'info>>,
        market_index: u16
    ) -> anchor_lang::Result<()> {
        let ix = {
            let ix = instructions::InitializeInsuranceFundStake { market_index };
            let mut data = Vec::with_capacity(256);
            data.extend_from_slice(&instructions::InitializeInsuranceFundStake::DISCRIMINATOR);
            AnchorSerialize::serialize(&ix, &mut data)
                .map_err(|_| anchor_lang::error::ErrorCode::InstructionDidNotSerialize)?;
            let accounts = ctx.to_account_metas(None);
            anchor_lang::solana_program::instruction::Instruction {
                program_id: ctx.program.key(),
                accounts,
                data,
            }
        };
        let mut acc_infos = ctx.to_account_infos();
        anchor_lang::solana_program::program::invoke_signed(&ix, &acc_infos, ctx.signer_seeds)
            .map_or_else(|e| Err(Into::into(e)), |_| Ok(()))
    }

    pub fn add_insurance_fund_stake<'a, 'b, 'c, 'info>(
        ctx: CpiContext<'a, 'b, 'c, 'info, AddInsuranceFundStake<'info>>,
        market_index: u16,
        amount: u64
    ) -> anchor_lang::Result<()> {
        let ix = {
            let ix = instructions::AddInsuranceFundStake { market_index, amount };
            let mut data = Vec::with_capacity(256);
            data.extend_from_slice(&instructions::AddInsuranceFundStake::DISCRIMINATOR);
            AnchorSerialize::serialize(&ix, &mut data)
                .map_err(|_| anchor_lang::error::ErrorCode::InstructionDidNotSerialize)?;
            let accounts = ctx.to_account_metas(None);
            anchor_lang::solana_program::instruction::Instruction {
                program_id: ctx.program.key(),
                accounts,
                data,
            }
        };
        let mut acc_infos = ctx.to_account_infos();
        anchor_lang::solana_program::program::invoke_signed(&ix, &acc_infos, ctx.signer_seeds)
            .map_or_else(|e| Err(Into::into(e)), |_| Ok(()))
    }

    pub fn request_remove_insurance_fund_stake<'a, 'b, 'c, 'info>(
        ctx: CpiContext<'a, 'b, 'c, 'info, RequestRemoveInsuranceFundStake<'info>>,
        market_index: u16,
        amount: u64
    ) -> anchor_lang::Result<()> {
        let ix = {
            let ix = instructions::RequestRemoveInsuranceFundStake { market_index, amount };
            let mut data = Vec::with_capacity(256);
            data.extend_from_slice(&instructions::RequestRemoveInsuranceFundStake::DISCRIMINATOR);
            AnchorSerialize::serialize(&ix, &mut data)
                .map_err(|_| anchor_lang::error::ErrorCode::InstructionDidNotSerialize)?;
            let accounts = ctx.to_account_metas(None);
            anchor_lang::solana_program::instruction::Instruction {
                program_id: ctx.program.key(),
                accounts,
                data,
            }
        };
        let mut acc_infos = ctx.to_account_infos();
        anchor_lang::solana_program::program::invoke_signed(&ix, &acc_infos, ctx.signer_seeds)
            .map_or_else(|e| Err(Into::into(e)), |_| Ok(()))
    }

    pub fn cancel_request_remove_insurance_fund_stake<'a, 'b, 'c, 'info>(
        ctx: CpiContext<'a, 'b, 'c, 'info, CancelRequestRemoveInsuranceFundStake<'info>>,
        market_index: u16
    ) -> anchor_lang::Result<()> {
        let ix = {
            let ix = instructions::CancelRequestRemoveInsuranceFundStake { market_index };
            let mut data = Vec::with_capacity(256);
            data.extend_from_slice(&instructions::CancelRequestRemoveInsuranceFundStake::DISCRIMINATOR);
            AnchorSerialize::serialize(&ix, &mut data)
                .map_err(|_| anchor_lang::error::ErrorCode::InstructionDidNotSerialize)?;
            let accounts = ctx.to_account_metas(None);
            anchor_lang::solana_program::instruction::Instruction {
                program_id: ctx.program.key(),
                accounts,
                data,
            }
        };
        let mut acc_infos = ctx.to_account_infos();
        anchor_lang::solana_program::program::invoke_signed(&ix, &acc_infos, ctx.signer_seeds)
            .map_or_else(|e| Err(Into::into(e)), |_| Ok(()))
    }

    pub fn remove_insurance_fund_stake<'a, 'b, 'c, 'info>(
        ctx: CpiContext<'a, 'b, 'c, 'info, RemoveInsuranceFundStake<'info>>,
        market_index: u16
    ) -> anchor_lang::Result<()> {
        let ix = {
            let ix = instructions::RemoveInsuranceFundStake { market_index };
            let mut data = Vec::with_capacity(256);
            data.extend_from_slice(&instructions::RemoveInsuranceFundStake::DISCRIMINATOR);
            AnchorSerialize::serialize(&ix, &mut data)
                .map_err(|_| anchor_lang::error::ErrorCode::InstructionDidNotSerialize)?;
            let accounts = ctx.to_account_metas(None);
            anchor_lang::solana_program::instruction::Instruction {
                program_id: ctx.program.key(),
                accounts,
                data,
            }
        };
        let mut acc_infos = ctx.to_account_infos();
        anchor_lang::solana_program::program::invoke_signed(&ix, &acc_infos, ctx.signer_seeds)
            .map_or_else(|e| Err(Into::into(e)), |_| Ok(()))
    }

    pub fn transfer_protocol_if_shares<'a, 'b, 'c, 'info>(
        ctx: CpiContext<'a, 'b, 'c, 'info, TransferProtocolIfShares<'info>>,
        market_index: u16,
        shares: u128
    ) -> anchor_lang::Result<()> {
        let ix = {
            let ix = instructions::TransferProtocolIfShares { market_index, shares };
            let mut data = Vec::with_capacity(256);
            data.extend_from_slice(&instructions::TransferProtocolIfShares::DISCRIMINATOR);
            AnchorSerialize::serialize(&ix, &mut data)
                .map_err(|_| anchor_lang::error::ErrorCode::InstructionDidNotSerialize)?;
            let accounts = ctx.to_account_metas(None);
            anchor_lang::solana_program::instruction::Instruction {
                program_id: ctx.program.key(),
                accounts,
                data,
            }
        };
        let mut acc_infos = ctx.to_account_infos();
        anchor_lang::solana_program::program::invoke_signed(&ix, &acc_infos, ctx.signer_seeds)
            .map_or_else(|e| Err(Into::into(e)), |_| Ok(()))
    }

    pub fn update_pyth_pull_oracle<'a, 'b, 'c, 'info>(
        ctx: CpiContext<'a, 'b, 'c, 'info, UpdatePythPullOracle<'info>>,
        feed_id: [u8;32],
        params: Vec<u8>
    ) -> anchor_lang::Result<()> {
        let ix = {
            let ix = instructions::UpdatePythPullOracle { feed_id, params };
            let mut data = Vec::with_capacity(256);
            data.extend_from_slice(&instructions::UpdatePythPullOracle::DISCRIMINATOR);
            AnchorSerialize::serialize(&ix, &mut data)
                .map_err(|_| anchor_lang::error::ErrorCode::InstructionDidNotSerialize)?;
            let accounts = ctx.to_account_metas(None);
            anchor_lang::solana_program::instruction::Instruction {
                program_id: ctx.program.key(),
                accounts,
                data,
            }
        };
        let mut acc_infos = ctx.to_account_infos();
        anchor_lang::solana_program::program::invoke_signed(&ix, &acc_infos, ctx.signer_seeds)
            .map_or_else(|e| Err(Into::into(e)), |_| Ok(()))
    }

    pub fn post_pyth_pull_oracle_update_atomic<'a, 'b, 'c, 'info>(
        ctx: CpiContext<'a, 'b, 'c, 'info, PostPythPullOracleUpdateAtomic<'info>>,
        feed_id: [u8;32],
        params: Vec<u8>
    ) -> anchor_lang::Result<()> {
        let ix = {
            let ix = instructions::PostPythPullOracleUpdateAtomic { feed_id, params };
            let mut data = Vec::with_capacity(256);
            data.extend_from_slice(&instructions::PostPythPullOracleUpdateAtomic::DISCRIMINATOR);
            AnchorSerialize::serialize(&ix, &mut data)
                .map_err(|_| anchor_lang::error::ErrorCode::InstructionDidNotSerialize)?;
            let accounts = ctx.to_account_metas(None);
            anchor_lang::solana_program::instruction::Instruction {
                program_id: ctx.program.key(),
                accounts,
                data,
            }
        };
        let mut acc_infos = ctx.to_account_infos();
        anchor_lang::solana_program::program::invoke_signed(&ix, &acc_infos, ctx.signer_seeds)
            .map_or_else(|e| Err(Into::into(e)), |_| Ok(()))
    }

    pub fn post_multi_pyth_pull_oracle_updates_atomic<'a, 'b, 'c, 'info>(
        ctx: CpiContext<'a, 'b, 'c, 'info, PostMultiPythPullOracleUpdatesAtomic<'info>>,
        params: Vec<u8>
    ) -> anchor_lang::Result<()> {
        let ix = {
            let ix = instructions::PostMultiPythPullOracleUpdatesAtomic { params };
            let mut data = Vec::with_capacity(256);
            data.extend_from_slice(&instructions::PostMultiPythPullOracleUpdatesAtomic::DISCRIMINATOR);
            AnchorSerialize::serialize(&ix, &mut data)
                .map_err(|_| anchor_lang::error::ErrorCode::InstructionDidNotSerialize)?;
            let accounts = ctx.to_account_metas(None);
            anchor_lang::solana_program::instruction::Instruction {
                program_id: ctx.program.key(),
                accounts,
                data,
            }
        };
        let mut acc_infos = ctx.to_account_infos();
        anchor_lang::solana_program::program::invoke_signed(&ix, &acc_infos, ctx.signer_seeds)
            .map_or_else(|e| Err(Into::into(e)), |_| Ok(()))
    }

    pub fn initialize<'a, 'b, 'c, 'info>(
        ctx: CpiContext<'a, 'b, 'c, 'info, Initialize<'info>>
    ) -> anchor_lang::Result<()> {
        let ix = {
            let ix = instructions::Initialize {  };
            let mut data = Vec::with_capacity(256);
            data.extend_from_slice(&instructions::Initialize::DISCRIMINATOR);
            AnchorSerialize::serialize(&ix, &mut data)
                .map_err(|_| anchor_lang::error::ErrorCode::InstructionDidNotSerialize)?;
            let accounts = ctx.to_account_metas(None);
            anchor_lang::solana_program::instruction::Instruction {
                program_id: ctx.program.key(),
                accounts,
                data,
            }
        };
        let mut acc_infos = ctx.to_account_infos();
        anchor_lang::solana_program::program::invoke_signed(&ix, &acc_infos, ctx.signer_seeds)
            .map_or_else(|e| Err(Into::into(e)), |_| Ok(()))
    }

    pub fn initialize_spot_market<'a, 'b, 'c, 'info>(
        ctx: CpiContext<'a, 'b, 'c, 'info, InitializeSpotMarket<'info>>,
        optimal_utilization: u32,
        optimal_borrow_rate: u32,
        max_borrow_rate: u32,
        oracle_source: OracleSource,
        initial_asset_weight: u32,
        maintenance_asset_weight: u32,
        initial_liability_weight: u32,
        maintenance_liability_weight: u32,
        imf_factor: u32,
        liquidator_fee: u32,
        if_liquidation_fee: u32,
        active_status: bool,
        asset_tier: AssetTier,
        scale_initial_asset_weight_start: u64,
        withdraw_guard_threshold: u64,
        order_tick_size: u64,
        order_step_size: u64,
        if_total_factor: u32,
        name: [u8;32]
    ) -> anchor_lang::Result<()> {
        let ix = {
            let ix = instructions::InitializeSpotMarket { optimal_utilization, optimal_borrow_rate, max_borrow_rate, oracle_source, initial_asset_weight, maintenance_asset_weight, initial_liability_weight, maintenance_liability_weight, imf_factor, liquidator_fee, if_liquidation_fee, active_status, asset_tier, scale_initial_asset_weight_start, withdraw_guard_threshold, order_tick_size, order_step_size, if_total_factor, name };
            let mut data = Vec::with_capacity(256);
            data.extend_from_slice(&instructions::InitializeSpotMarket::DISCRIMINATOR);
            AnchorSerialize::serialize(&ix, &mut data)
                .map_err(|_| anchor_lang::error::ErrorCode::InstructionDidNotSerialize)?;
            let accounts = ctx.to_account_metas(None);
            anchor_lang::solana_program::instruction::Instruction {
                program_id: ctx.program.key(),
                accounts,
                data,
            }
        };
        let mut acc_infos = ctx.to_account_infos();
        anchor_lang::solana_program::program::invoke_signed(&ix, &acc_infos, ctx.signer_seeds)
            .map_or_else(|e| Err(Into::into(e)), |_| Ok(()))
    }

    pub fn delete_initialized_spot_market<'a, 'b, 'c, 'info>(
        ctx: CpiContext<'a, 'b, 'c, 'info, DeleteInitializedSpotMarket<'info>>,
        market_index: u16
    ) -> anchor_lang::Result<()> {
        let ix = {
            let ix = instructions::DeleteInitializedSpotMarket { market_index };
            let mut data = Vec::with_capacity(256);
            data.extend_from_slice(&instructions::DeleteInitializedSpotMarket::DISCRIMINATOR);
            AnchorSerialize::serialize(&ix, &mut data)
                .map_err(|_| anchor_lang::error::ErrorCode::InstructionDidNotSerialize)?;
            let accounts = ctx.to_account_metas(None);
            anchor_lang::solana_program::instruction::Instruction {
                program_id: ctx.program.key(),
                accounts,
                data,
            }
        };
        let mut acc_infos = ctx.to_account_infos();
        anchor_lang::solana_program::program::invoke_signed(&ix, &acc_infos, ctx.signer_seeds)
            .map_or_else(|e| Err(Into::into(e)), |_| Ok(()))
    }

    pub fn initialize_serum_fulfillment_config<'a, 'b, 'c, 'info>(
        ctx: CpiContext<'a, 'b, 'c, 'info, InitializeSerumFulfillmentConfig<'info>>,
        market_index: u16
    ) -> anchor_lang::Result<()> {
        let ix = {
            let ix = instructions::InitializeSerumFulfillmentConfig { market_index };
            let mut data = Vec::with_capacity(256);
            data.extend_from_slice(&instructions::InitializeSerumFulfillmentConfig::DISCRIMINATOR);
            AnchorSerialize::serialize(&ix, &mut data)
                .map_err(|_| anchor_lang::error::ErrorCode::InstructionDidNotSerialize)?;
            let accounts = ctx.to_account_metas(None);
            anchor_lang::solana_program::instruction::Instruction {
                program_id: ctx.program.key(),
                accounts,
                data,
            }
        };
        let mut acc_infos = ctx.to_account_infos();
        anchor_lang::solana_program::program::invoke_signed(&ix, &acc_infos, ctx.signer_seeds)
            .map_or_else(|e| Err(Into::into(e)), |_| Ok(()))
    }

    pub fn update_serum_fulfillment_config_status<'a, 'b, 'c, 'info>(
        ctx: CpiContext<'a, 'b, 'c, 'info, UpdateSerumFulfillmentConfigStatus<'info>>,
        status: SpotFulfillmentConfigStatus
    ) -> anchor_lang::Result<()> {
        let ix = {
            let ix = instructions::UpdateSerumFulfillmentConfigStatus { status };
            let mut data = Vec::with_capacity(256);
            data.extend_from_slice(&instructions::UpdateSerumFulfillmentConfigStatus::DISCRIMINATOR);
            AnchorSerialize::serialize(&ix, &mut data)
                .map_err(|_| anchor_lang::error::ErrorCode::InstructionDidNotSerialize)?;
            let accounts = ctx.to_account_metas(None);
            anchor_lang::solana_program::instruction::Instruction {
                program_id: ctx.program.key(),
                accounts,
                data,
            }
        };
        let mut acc_infos = ctx.to_account_infos();
        anchor_lang::solana_program::program::invoke_signed(&ix, &acc_infos, ctx.signer_seeds)
            .map_or_else(|e| Err(Into::into(e)), |_| Ok(()))
    }

    pub fn initialize_openbook_v_2_fulfillment_config<'a, 'b, 'c, 'info>(
        ctx: CpiContext<'a, 'b, 'c, 'info, InitializeOpenbookV2FulfillmentConfig<'info>>,
        market_index: u16
    ) -> anchor_lang::Result<()> {
        let ix = {
            let ix = instructions::InitializeOpenbookV2FulfillmentConfig { market_index };
            let mut data = Vec::with_capacity(256);
            data.extend_from_slice(&instructions::InitializeOpenbookV2FulfillmentConfig::DISCRIMINATOR);
            AnchorSerialize::serialize(&ix, &mut data)
                .map_err(|_| anchor_lang::error::ErrorCode::InstructionDidNotSerialize)?;
            let accounts = ctx.to_account_metas(None);
            anchor_lang::solana_program::instruction::Instruction {
                program_id: ctx.program.key(),
                accounts,
                data,
            }
        };
        let mut acc_infos = ctx.to_account_infos();
        anchor_lang::solana_program::program::invoke_signed(&ix, &acc_infos, ctx.signer_seeds)
            .map_or_else(|e| Err(Into::into(e)), |_| Ok(()))
    }

    pub fn openbook_v_2_fulfillment_config_status<'a, 'b, 'c, 'info>(
        ctx: CpiContext<'a, 'b, 'c, 'info, OpenbookV2FulfillmentConfigStatus<'info>>,
        status: SpotFulfillmentConfigStatus
    ) -> anchor_lang::Result<()> {
        let ix = {
            let ix = instructions::OpenbookV2FulfillmentConfigStatus { status };
            let mut data = Vec::with_capacity(256);
            data.extend_from_slice(&instructions::OpenbookV2FulfillmentConfigStatus::DISCRIMINATOR);
            AnchorSerialize::serialize(&ix, &mut data)
                .map_err(|_| anchor_lang::error::ErrorCode::InstructionDidNotSerialize)?;
            let accounts = ctx.to_account_metas(None);
            anchor_lang::solana_program::instruction::Instruction {
                program_id: ctx.program.key(),
                accounts,
                data,
            }
        };
        let mut acc_infos = ctx.to_account_infos();
        anchor_lang::solana_program::program::invoke_signed(&ix, &acc_infos, ctx.signer_seeds)
            .map_or_else(|e| Err(Into::into(e)), |_| Ok(()))
    }

    pub fn initialize_phoenix_fulfillment_config<'a, 'b, 'c, 'info>(
        ctx: CpiContext<'a, 'b, 'c, 'info, InitializePhoenixFulfillmentConfig<'info>>,
        market_index: u16
    ) -> anchor_lang::Result<()> {
        let ix = {
            let ix = instructions::InitializePhoenixFulfillmentConfig { market_index };
            let mut data = Vec::with_capacity(256);
            data.extend_from_slice(&instructions::InitializePhoenixFulfillmentConfig::DISCRIMINATOR);
            AnchorSerialize::serialize(&ix, &mut data)
                .map_err(|_| anchor_lang::error::ErrorCode::InstructionDidNotSerialize)?;
            let accounts = ctx.to_account_metas(None);
            anchor_lang::solana_program::instruction::Instruction {
                program_id: ctx.program.key(),
                accounts,
                data,
            }
        };
        let mut acc_infos = ctx.to_account_infos();
        anchor_lang::solana_program::program::invoke_signed(&ix, &acc_infos, ctx.signer_seeds)
            .map_or_else(|e| Err(Into::into(e)), |_| Ok(()))
    }

    pub fn phoenix_fulfillment_config_status<'a, 'b, 'c, 'info>(
        ctx: CpiContext<'a, 'b, 'c, 'info, PhoenixFulfillmentConfigStatus<'info>>,
        status: SpotFulfillmentConfigStatus
    ) -> anchor_lang::Result<()> {
        let ix = {
            let ix = instructions::PhoenixFulfillmentConfigStatus { status };
            let mut data = Vec::with_capacity(256);
            data.extend_from_slice(&instructions::PhoenixFulfillmentConfigStatus::DISCRIMINATOR);
            AnchorSerialize::serialize(&ix, &mut data)
                .map_err(|_| anchor_lang::error::ErrorCode::InstructionDidNotSerialize)?;
            let accounts = ctx.to_account_metas(None);
            anchor_lang::solana_program::instruction::Instruction {
                program_id: ctx.program.key(),
                accounts,
                data,
            }
        };
        let mut acc_infos = ctx.to_account_infos();
        anchor_lang::solana_program::program::invoke_signed(&ix, &acc_infos, ctx.signer_seeds)
            .map_or_else(|e| Err(Into::into(e)), |_| Ok(()))
    }

    pub fn update_serum_vault<'a, 'b, 'c, 'info>(
        ctx: CpiContext<'a, 'b, 'c, 'info, UpdateSerumVault<'info>>
    ) -> anchor_lang::Result<()> {
        let ix = {
            let ix = instructions::UpdateSerumVault {  };
            let mut data = Vec::with_capacity(256);
            data.extend_from_slice(&instructions::UpdateSerumVault::DISCRIMINATOR);
            AnchorSerialize::serialize(&ix, &mut data)
                .map_err(|_| anchor_lang::error::ErrorCode::InstructionDidNotSerialize)?;
            let accounts = ctx.to_account_metas(None);
            anchor_lang::solana_program::instruction::Instruction {
                program_id: ctx.program.key(),
                accounts,
                data,
            }
        };
        let mut acc_infos = ctx.to_account_infos();
        anchor_lang::solana_program::program::invoke_signed(&ix, &acc_infos, ctx.signer_seeds)
            .map_or_else(|e| Err(Into::into(e)), |_| Ok(()))
    }

    pub fn initialize_perp_market<'a, 'b, 'c, 'info>(
        ctx: CpiContext<'a, 'b, 'c, 'info, InitializePerpMarket<'info>>,
        market_index: u16,
        amm_base_asset_reserve: u128,
        amm_quote_asset_reserve: u128,
        amm_periodicity: i64,
        amm_peg_multiplier: u128,
        oracle_source: OracleSource,
        contract_tier: ContractTier,
        margin_ratio_initial: u32,
        margin_ratio_maintenance: u32,
        liquidator_fee: u32,
        if_liquidation_fee: u32,
        imf_factor: u32,
        active_status: bool,
        base_spread: u32,
        max_spread: u32,
        max_open_interest: u128,
        max_revenue_withdraw_per_period: u64,
        quote_max_insurance: u64,
        order_step_size: u64,
        order_tick_size: u64,
        min_order_size: u64,
        concentration_coef_scale: u128,
        curve_update_intensity: u8,
        amm_jit_intensity: u8,
        name: [u8;32]
    ) -> anchor_lang::Result<()> {
        let ix = {
            let ix = instructions::InitializePerpMarket { market_index, amm_base_asset_reserve, amm_quote_asset_reserve, amm_periodicity, amm_peg_multiplier, oracle_source, contract_tier, margin_ratio_initial, margin_ratio_maintenance, liquidator_fee, if_liquidation_fee, imf_factor, active_status, base_spread, max_spread, max_open_interest, max_revenue_withdraw_per_period, quote_max_insurance, order_step_size, order_tick_size, min_order_size, concentration_coef_scale, curve_update_intensity, amm_jit_intensity, name };
            let mut data = Vec::with_capacity(256);
            data.extend_from_slice(&instructions::InitializePerpMarket::DISCRIMINATOR);
            AnchorSerialize::serialize(&ix, &mut data)
                .map_err(|_| anchor_lang::error::ErrorCode::InstructionDidNotSerialize)?;
            let accounts = ctx.to_account_metas(None);
            anchor_lang::solana_program::instruction::Instruction {
                program_id: ctx.program.key(),
                accounts,
                data,
            }
        };
        let mut acc_infos = ctx.to_account_infos();
        anchor_lang::solana_program::program::invoke_signed(&ix, &acc_infos, ctx.signer_seeds)
            .map_or_else(|e| Err(Into::into(e)), |_| Ok(()))
    }

    pub fn initialize_prediction_market<'a, 'b, 'c, 'info>(
        ctx: CpiContext<'a, 'b, 'c, 'info, InitializePredictionMarket<'info>>
    ) -> anchor_lang::Result<()> {
        let ix = {
            let ix = instructions::InitializePredictionMarket {  };
            let mut data = Vec::with_capacity(256);
            data.extend_from_slice(&instructions::InitializePredictionMarket::DISCRIMINATOR);
            AnchorSerialize::serialize(&ix, &mut data)
                .map_err(|_| anchor_lang::error::ErrorCode::InstructionDidNotSerialize)?;
            let accounts = ctx.to_account_metas(None);
            anchor_lang::solana_program::instruction::Instruction {
                program_id: ctx.program.key(),
                accounts,
                data,
            }
        };
        let mut acc_infos = ctx.to_account_infos();
        anchor_lang::solana_program::program::invoke_signed(&ix, &acc_infos, ctx.signer_seeds)
            .map_or_else(|e| Err(Into::into(e)), |_| Ok(()))
    }

    pub fn delete_initialized_perp_market<'a, 'b, 'c, 'info>(
        ctx: CpiContext<'a, 'b, 'c, 'info, DeleteInitializedPerpMarket<'info>>,
        market_index: u16
    ) -> anchor_lang::Result<()> {
        let ix = {
            let ix = instructions::DeleteInitializedPerpMarket { market_index };
            let mut data = Vec::with_capacity(256);
            data.extend_from_slice(&instructions::DeleteInitializedPerpMarket::DISCRIMINATOR);
            AnchorSerialize::serialize(&ix, &mut data)
                .map_err(|_| anchor_lang::error::ErrorCode::InstructionDidNotSerialize)?;
            let accounts = ctx.to_account_metas(None);
            anchor_lang::solana_program::instruction::Instruction {
                program_id: ctx.program.key(),
                accounts,
                data,
            }
        };
        let mut acc_infos = ctx.to_account_infos();
        anchor_lang::solana_program::program::invoke_signed(&ix, &acc_infos, ctx.signer_seeds)
            .map_or_else(|e| Err(Into::into(e)), |_| Ok(()))
    }

    pub fn move_amm_price<'a, 'b, 'c, 'info>(
        ctx: CpiContext<'a, 'b, 'c, 'info, MoveAmmPrice<'info>>,
        base_asset_reserve: u128,
        quote_asset_reserve: u128,
        sqrt_k: u128
    ) -> anchor_lang::Result<()> {
        let ix = {
            let ix = instructions::MoveAmmPrice { base_asset_reserve, quote_asset_reserve, sqrt_k };
            let mut data = Vec::with_capacity(256);
            data.extend_from_slice(&instructions::MoveAmmPrice::DISCRIMINATOR);
            AnchorSerialize::serialize(&ix, &mut data)
                .map_err(|_| anchor_lang::error::ErrorCode::InstructionDidNotSerialize)?;
            let accounts = ctx.to_account_metas(None);
            anchor_lang::solana_program::instruction::Instruction {
                program_id: ctx.program.key(),
                accounts,
                data,
            }
        };
        let mut acc_infos = ctx.to_account_infos();
        anchor_lang::solana_program::program::invoke_signed(&ix, &acc_infos, ctx.signer_seeds)
            .map_or_else(|e| Err(Into::into(e)), |_| Ok(()))
    }

    pub fn recenter_perp_market_amm<'a, 'b, 'c, 'info>(
        ctx: CpiContext<'a, 'b, 'c, 'info, RecenterPerpMarketAmm<'info>>,
        peg_multiplier: u128,
        sqrt_k: u128
    ) -> anchor_lang::Result<()> {
        let ix = {
            let ix = instructions::RecenterPerpMarketAmm { peg_multiplier, sqrt_k };
            let mut data = Vec::with_capacity(256);
            data.extend_from_slice(&instructions::RecenterPerpMarketAmm::DISCRIMINATOR);
            AnchorSerialize::serialize(&ix, &mut data)
                .map_err(|_| anchor_lang::error::ErrorCode::InstructionDidNotSerialize)?;
            let accounts = ctx.to_account_metas(None);
            anchor_lang::solana_program::instruction::Instruction {
                program_id: ctx.program.key(),
                accounts,
                data,
            }
        };
        let mut acc_infos = ctx.to_account_infos();
        anchor_lang::solana_program::program::invoke_signed(&ix, &acc_infos, ctx.signer_seeds)
            .map_or_else(|e| Err(Into::into(e)), |_| Ok(()))
    }

    pub fn update_perp_market_amm_summary_stats<'a, 'b, 'c, 'info>(
        ctx: CpiContext<'a, 'b, 'c, 'info, UpdatePerpMarketAmmSummaryStats<'info>>,
        params: UpdatePerpMarketSummaryStatsParams
    ) -> anchor_lang::Result<()> {
        let ix = {
            let ix = instructions::UpdatePerpMarketAmmSummaryStats { params };
            let mut data = Vec::with_capacity(256);
            data.extend_from_slice(&instructions::UpdatePerpMarketAmmSummaryStats::DISCRIMINATOR);
            AnchorSerialize::serialize(&ix, &mut data)
                .map_err(|_| anchor_lang::error::ErrorCode::InstructionDidNotSerialize)?;
            let accounts = ctx.to_account_metas(None);
            anchor_lang::solana_program::instruction::Instruction {
                program_id: ctx.program.key(),
                accounts,
                data,
            }
        };
        let mut acc_infos = ctx.to_account_infos();
        anchor_lang::solana_program::program::invoke_signed(&ix, &acc_infos, ctx.signer_seeds)
            .map_or_else(|e| Err(Into::into(e)), |_| Ok(()))
    }

    pub fn update_perp_market_expiry<'a, 'b, 'c, 'info>(
        ctx: CpiContext<'a, 'b, 'c, 'info, UpdatePerpMarketExpiry<'info>>,
        expiry_ts: i64
    ) -> anchor_lang::Result<()> {
        let ix = {
            let ix = instructions::UpdatePerpMarketExpiry { expiry_ts };
            let mut data = Vec::with_capacity(256);
            data.extend_from_slice(&instructions::UpdatePerpMarketExpiry::DISCRIMINATOR);
            AnchorSerialize::serialize(&ix, &mut data)
                .map_err(|_| anchor_lang::error::ErrorCode::InstructionDidNotSerialize)?;
            let accounts = ctx.to_account_metas(None);
            anchor_lang::solana_program::instruction::Instruction {
                program_id: ctx.program.key(),
                accounts,
                data,
            }
        };
        let mut acc_infos = ctx.to_account_infos();
        anchor_lang::solana_program::program::invoke_signed(&ix, &acc_infos, ctx.signer_seeds)
            .map_or_else(|e| Err(Into::into(e)), |_| Ok(()))
    }

    pub fn settle_expired_market_pools_to_revenue_pool<'a, 'b, 'c, 'info>(
        ctx: CpiContext<'a, 'b, 'c, 'info, SettleExpiredMarketPoolsToRevenuePool<'info>>
    ) -> anchor_lang::Result<()> {
        let ix = {
            let ix = instructions::SettleExpiredMarketPoolsToRevenuePool {  };
            let mut data = Vec::with_capacity(256);
            data.extend_from_slice(&instructions::SettleExpiredMarketPoolsToRevenuePool::DISCRIMINATOR);
            AnchorSerialize::serialize(&ix, &mut data)
                .map_err(|_| anchor_lang::error::ErrorCode::InstructionDidNotSerialize)?;
            let accounts = ctx.to_account_metas(None);
            anchor_lang::solana_program::instruction::Instruction {
                program_id: ctx.program.key(),
                accounts,
                data,
            }
        };
        let mut acc_infos = ctx.to_account_infos();
        anchor_lang::solana_program::program::invoke_signed(&ix, &acc_infos, ctx.signer_seeds)
            .map_or_else(|e| Err(Into::into(e)), |_| Ok(()))
    }

    pub fn deposit_into_perp_market_fee_pool<'a, 'b, 'c, 'info>(
        ctx: CpiContext<'a, 'b, 'c, 'info, DepositIntoPerpMarketFeePool<'info>>,
        amount: u64
    ) -> anchor_lang::Result<()> {
        let ix = {
            let ix = instructions::DepositIntoPerpMarketFeePool { amount };
            let mut data = Vec::with_capacity(256);
            data.extend_from_slice(&instructions::DepositIntoPerpMarketFeePool::DISCRIMINATOR);
            AnchorSerialize::serialize(&ix, &mut data)
                .map_err(|_| anchor_lang::error::ErrorCode::InstructionDidNotSerialize)?;
            let accounts = ctx.to_account_metas(None);
            anchor_lang::solana_program::instruction::Instruction {
                program_id: ctx.program.key(),
                accounts,
                data,
            }
        };
        let mut acc_infos = ctx.to_account_infos();
        anchor_lang::solana_program::program::invoke_signed(&ix, &acc_infos, ctx.signer_seeds)
            .map_or_else(|e| Err(Into::into(e)), |_| Ok(()))
    }

    pub fn deposit_into_spot_market_vault<'a, 'b, 'c, 'info>(
        ctx: CpiContext<'a, 'b, 'c, 'info, DepositIntoSpotMarketVault<'info>>,
        amount: u64
    ) -> anchor_lang::Result<()> {
        let ix = {
            let ix = instructions::DepositIntoSpotMarketVault { amount };
            let mut data = Vec::with_capacity(256);
            data.extend_from_slice(&instructions::DepositIntoSpotMarketVault::DISCRIMINATOR);
            AnchorSerialize::serialize(&ix, &mut data)
                .map_err(|_| anchor_lang::error::ErrorCode::InstructionDidNotSerialize)?;
            let accounts = ctx.to_account_metas(None);
            anchor_lang::solana_program::instruction::Instruction {
                program_id: ctx.program.key(),
                accounts,
                data,
            }
        };
        let mut acc_infos = ctx.to_account_infos();
        anchor_lang::solana_program::program::invoke_signed(&ix, &acc_infos, ctx.signer_seeds)
            .map_or_else(|e| Err(Into::into(e)), |_| Ok(()))
    }

    pub fn deposit_into_spot_market_revenue_pool<'a, 'b, 'c, 'info>(
        ctx: CpiContext<'a, 'b, 'c, 'info, DepositIntoSpotMarketRevenuePool<'info>>,
        amount: u64
    ) -> anchor_lang::Result<()> {
        let ix = {
            let ix = instructions::DepositIntoSpotMarketRevenuePool { amount };
            let mut data = Vec::with_capacity(256);
            data.extend_from_slice(&instructions::DepositIntoSpotMarketRevenuePool::DISCRIMINATOR);
            AnchorSerialize::serialize(&ix, &mut data)
                .map_err(|_| anchor_lang::error::ErrorCode::InstructionDidNotSerialize)?;
            let accounts = ctx.to_account_metas(None);
            anchor_lang::solana_program::instruction::Instruction {
                program_id: ctx.program.key(),
                accounts,
                data,
            }
        };
        let mut acc_infos = ctx.to_account_infos();
        anchor_lang::solana_program::program::invoke_signed(&ix, &acc_infos, ctx.signer_seeds)
            .map_or_else(|e| Err(Into::into(e)), |_| Ok(()))
    }

    pub fn repeg_amm_curve<'a, 'b, 'c, 'info>(
        ctx: CpiContext<'a, 'b, 'c, 'info, RepegAmmCurve<'info>>,
        new_peg_candidate: u128
    ) -> anchor_lang::Result<()> {
        let ix = {
            let ix = instructions::RepegAmmCurve { new_peg_candidate };
            let mut data = Vec::with_capacity(256);
            data.extend_from_slice(&instructions::RepegAmmCurve::DISCRIMINATOR);
            AnchorSerialize::serialize(&ix, &mut data)
                .map_err(|_| anchor_lang::error::ErrorCode::InstructionDidNotSerialize)?;
            let accounts = ctx.to_account_metas(None);
            anchor_lang::solana_program::instruction::Instruction {
                program_id: ctx.program.key(),
                accounts,
                data,
            }
        };
        let mut acc_infos = ctx.to_account_infos();
        anchor_lang::solana_program::program::invoke_signed(&ix, &acc_infos, ctx.signer_seeds)
            .map_or_else(|e| Err(Into::into(e)), |_| Ok(()))
    }

    pub fn update_perp_market_amm_oracle_twap<'a, 'b, 'c, 'info>(
        ctx: CpiContext<'a, 'b, 'c, 'info, UpdatePerpMarketAmmOracleTwap<'info>>
    ) -> anchor_lang::Result<()> {
        let ix = {
            let ix = instructions::UpdatePerpMarketAmmOracleTwap {  };
            let mut data = Vec::with_capacity(256);
            data.extend_from_slice(&instructions::UpdatePerpMarketAmmOracleTwap::DISCRIMINATOR);
            AnchorSerialize::serialize(&ix, &mut data)
                .map_err(|_| anchor_lang::error::ErrorCode::InstructionDidNotSerialize)?;
            let accounts = ctx.to_account_metas(None);
            anchor_lang::solana_program::instruction::Instruction {
                program_id: ctx.program.key(),
                accounts,
                data,
            }
        };
        let mut acc_infos = ctx.to_account_infos();
        anchor_lang::solana_program::program::invoke_signed(&ix, &acc_infos, ctx.signer_seeds)
            .map_or_else(|e| Err(Into::into(e)), |_| Ok(()))
    }

    pub fn reset_perp_market_amm_oracle_twap<'a, 'b, 'c, 'info>(
        ctx: CpiContext<'a, 'b, 'c, 'info, ResetPerpMarketAmmOracleTwap<'info>>
    ) -> anchor_lang::Result<()> {
        let ix = {
            let ix = instructions::ResetPerpMarketAmmOracleTwap {  };
            let mut data = Vec::with_capacity(256);
            data.extend_from_slice(&instructions::ResetPerpMarketAmmOracleTwap::DISCRIMINATOR);
            AnchorSerialize::serialize(&ix, &mut data)
                .map_err(|_| anchor_lang::error::ErrorCode::InstructionDidNotSerialize)?;
            let accounts = ctx.to_account_metas(None);
            anchor_lang::solana_program::instruction::Instruction {
                program_id: ctx.program.key(),
                accounts,
                data,
            }
        };
        let mut acc_infos = ctx.to_account_infos();
        anchor_lang::solana_program::program::invoke_signed(&ix, &acc_infos, ctx.signer_seeds)
            .map_or_else(|e| Err(Into::into(e)), |_| Ok(()))
    }

    pub fn update_k<'a, 'b, 'c, 'info>(
        ctx: CpiContext<'a, 'b, 'c, 'info, UpdateK<'info>>,
        sqrt_k: u128
    ) -> anchor_lang::Result<()> {
        let ix = {
            let ix = instructions::UpdateK { sqrt_k };
            let mut data = Vec::with_capacity(256);
            data.extend_from_slice(&instructions::UpdateK::DISCRIMINATOR);
            AnchorSerialize::serialize(&ix, &mut data)
                .map_err(|_| anchor_lang::error::ErrorCode::InstructionDidNotSerialize)?;
            let accounts = ctx.to_account_metas(None);
            anchor_lang::solana_program::instruction::Instruction {
                program_id: ctx.program.key(),
                accounts,
                data,
            }
        };
        let mut acc_infos = ctx.to_account_infos();
        anchor_lang::solana_program::program::invoke_signed(&ix, &acc_infos, ctx.signer_seeds)
            .map_or_else(|e| Err(Into::into(e)), |_| Ok(()))
    }

    pub fn update_perp_market_margin_ratio<'a, 'b, 'c, 'info>(
        ctx: CpiContext<'a, 'b, 'c, 'info, UpdatePerpMarketMarginRatio<'info>>,
        margin_ratio_initial: u32,
        margin_ratio_maintenance: u32
    ) -> anchor_lang::Result<()> {
        let ix = {
            let ix = instructions::UpdatePerpMarketMarginRatio { margin_ratio_initial, margin_ratio_maintenance };
            let mut data = Vec::with_capacity(256);
            data.extend_from_slice(&instructions::UpdatePerpMarketMarginRatio::DISCRIMINATOR);
            AnchorSerialize::serialize(&ix, &mut data)
                .map_err(|_| anchor_lang::error::ErrorCode::InstructionDidNotSerialize)?;
            let accounts = ctx.to_account_metas(None);
            anchor_lang::solana_program::instruction::Instruction {
                program_id: ctx.program.key(),
                accounts,
                data,
            }
        };
        let mut acc_infos = ctx.to_account_infos();
        anchor_lang::solana_program::program::invoke_signed(&ix, &acc_infos, ctx.signer_seeds)
            .map_or_else(|e| Err(Into::into(e)), |_| Ok(()))
    }

    pub fn update_perp_market_funding_period<'a, 'b, 'c, 'info>(
        ctx: CpiContext<'a, 'b, 'c, 'info, UpdatePerpMarketFundingPeriod<'info>>,
        funding_period: i64
    ) -> anchor_lang::Result<()> {
        let ix = {
            let ix = instructions::UpdatePerpMarketFundingPeriod { funding_period };
            let mut data = Vec::with_capacity(256);
            data.extend_from_slice(&instructions::UpdatePerpMarketFundingPeriod::DISCRIMINATOR);
            AnchorSerialize::serialize(&ix, &mut data)
                .map_err(|_| anchor_lang::error::ErrorCode::InstructionDidNotSerialize)?;
            let accounts = ctx.to_account_metas(None);
            anchor_lang::solana_program::instruction::Instruction {
                program_id: ctx.program.key(),
                accounts,
                data,
            }
        };
        let mut acc_infos = ctx.to_account_infos();
        anchor_lang::solana_program::program::invoke_signed(&ix, &acc_infos, ctx.signer_seeds)
            .map_or_else(|e| Err(Into::into(e)), |_| Ok(()))
    }

    pub fn update_perp_market_max_imbalances<'a, 'b, 'c, 'info>(
        ctx: CpiContext<'a, 'b, 'c, 'info, UpdatePerpMarketMaxImbalances<'info>>,
        unrealized_max_imbalance: u64,
        max_revenue_withdraw_per_period: u64,
        quote_max_insurance: u64
    ) -> anchor_lang::Result<()> {
        let ix = {
            let ix = instructions::UpdatePerpMarketMaxImbalances { unrealized_max_imbalance, max_revenue_withdraw_per_period, quote_max_insurance };
            let mut data = Vec::with_capacity(256);
            data.extend_from_slice(&instructions::UpdatePerpMarketMaxImbalances::DISCRIMINATOR);
            AnchorSerialize::serialize(&ix, &mut data)
                .map_err(|_| anchor_lang::error::ErrorCode::InstructionDidNotSerialize)?;
            let accounts = ctx.to_account_metas(None);
            anchor_lang::solana_program::instruction::Instruction {
                program_id: ctx.program.key(),
                accounts,
                data,
            }
        };
        let mut acc_infos = ctx.to_account_infos();
        anchor_lang::solana_program::program::invoke_signed(&ix, &acc_infos, ctx.signer_seeds)
            .map_or_else(|e| Err(Into::into(e)), |_| Ok(()))
    }

    pub fn update_perp_market_liquidation_fee<'a, 'b, 'c, 'info>(
        ctx: CpiContext<'a, 'b, 'c, 'info, UpdatePerpMarketLiquidationFee<'info>>,
        liquidator_fee: u32,
        if_liquidation_fee: u32
    ) -> anchor_lang::Result<()> {
        let ix = {
            let ix = instructions::UpdatePerpMarketLiquidationFee { liquidator_fee, if_liquidation_fee };
            let mut data = Vec::with_capacity(256);
            data.extend_from_slice(&instructions::UpdatePerpMarketLiquidationFee::DISCRIMINATOR);
            AnchorSerialize::serialize(&ix, &mut data)
                .map_err(|_| anchor_lang::error::ErrorCode::InstructionDidNotSerialize)?;
            let accounts = ctx.to_account_metas(None);
            anchor_lang::solana_program::instruction::Instruction {
                program_id: ctx.program.key(),
                accounts,
                data,
            }
        };
        let mut acc_infos = ctx.to_account_infos();
        anchor_lang::solana_program::program::invoke_signed(&ix, &acc_infos, ctx.signer_seeds)
            .map_or_else(|e| Err(Into::into(e)), |_| Ok(()))
    }

    pub fn update_insurance_fund_unstaking_period<'a, 'b, 'c, 'info>(
        ctx: CpiContext<'a, 'b, 'c, 'info, UpdateInsuranceFundUnstakingPeriod<'info>>,
        insurance_fund_unstaking_period: i64
    ) -> anchor_lang::Result<()> {
        let ix = {
            let ix = instructions::UpdateInsuranceFundUnstakingPeriod { insurance_fund_unstaking_period };
            let mut data = Vec::with_capacity(256);
            data.extend_from_slice(&instructions::UpdateInsuranceFundUnstakingPeriod::DISCRIMINATOR);
            AnchorSerialize::serialize(&ix, &mut data)
                .map_err(|_| anchor_lang::error::ErrorCode::InstructionDidNotSerialize)?;
            let accounts = ctx.to_account_metas(None);
            anchor_lang::solana_program::instruction::Instruction {
                program_id: ctx.program.key(),
                accounts,
                data,
            }
        };
        let mut acc_infos = ctx.to_account_infos();
        anchor_lang::solana_program::program::invoke_signed(&ix, &acc_infos, ctx.signer_seeds)
            .map_or_else(|e| Err(Into::into(e)), |_| Ok(()))
    }

    pub fn update_spot_market_liquidation_fee<'a, 'b, 'c, 'info>(
        ctx: CpiContext<'a, 'b, 'c, 'info, UpdateSpotMarketLiquidationFee<'info>>,
        liquidator_fee: u32,
        if_liquidation_fee: u32
    ) -> anchor_lang::Result<()> {
        let ix = {
            let ix = instructions::UpdateSpotMarketLiquidationFee { liquidator_fee, if_liquidation_fee };
            let mut data = Vec::with_capacity(256);
            data.extend_from_slice(&instructions::UpdateSpotMarketLiquidationFee::DISCRIMINATOR);
            AnchorSerialize::serialize(&ix, &mut data)
                .map_err(|_| anchor_lang::error::ErrorCode::InstructionDidNotSerialize)?;
            let accounts = ctx.to_account_metas(None);
            anchor_lang::solana_program::instruction::Instruction {
                program_id: ctx.program.key(),
                accounts,
                data,
            }
        };
        let mut acc_infos = ctx.to_account_infos();
        anchor_lang::solana_program::program::invoke_signed(&ix, &acc_infos, ctx.signer_seeds)
            .map_or_else(|e| Err(Into::into(e)), |_| Ok(()))
    }

    pub fn update_withdraw_guard_threshold<'a, 'b, 'c, 'info>(
        ctx: CpiContext<'a, 'b, 'c, 'info, UpdateWithdrawGuardThreshold<'info>>,
        withdraw_guard_threshold: u64
    ) -> anchor_lang::Result<()> {
        let ix = {
            let ix = instructions::UpdateWithdrawGuardThreshold { withdraw_guard_threshold };
            let mut data = Vec::with_capacity(256);
            data.extend_from_slice(&instructions::UpdateWithdrawGuardThreshold::DISCRIMINATOR);
            AnchorSerialize::serialize(&ix, &mut data)
                .map_err(|_| anchor_lang::error::ErrorCode::InstructionDidNotSerialize)?;
            let accounts = ctx.to_account_metas(None);
            anchor_lang::solana_program::instruction::Instruction {
                program_id: ctx.program.key(),
                accounts,
                data,
            }
        };
        let mut acc_infos = ctx.to_account_infos();
        anchor_lang::solana_program::program::invoke_signed(&ix, &acc_infos, ctx.signer_seeds)
            .map_or_else(|e| Err(Into::into(e)), |_| Ok(()))
    }

    pub fn update_spot_market_if_factor<'a, 'b, 'c, 'info>(
        ctx: CpiContext<'a, 'b, 'c, 'info, UpdateSpotMarketIfFactor<'info>>,
        spot_market_index: u16,
        user_if_factor: u32,
        total_if_factor: u32
    ) -> anchor_lang::Result<()> {
        let ix = {
            let ix = instructions::UpdateSpotMarketIfFactor { spot_market_index, user_if_factor, total_if_factor };
            let mut data = Vec::with_capacity(256);
            data.extend_from_slice(&instructions::UpdateSpotMarketIfFactor::DISCRIMINATOR);
            AnchorSerialize::serialize(&ix, &mut data)
                .map_err(|_| anchor_lang::error::ErrorCode::InstructionDidNotSerialize)?;
            let accounts = ctx.to_account_metas(None);
            anchor_lang::solana_program::instruction::Instruction {
                program_id: ctx.program.key(),
                accounts,
                data,
            }
        };
        let mut acc_infos = ctx.to_account_infos();
        anchor_lang::solana_program::program::invoke_signed(&ix, &acc_infos, ctx.signer_seeds)
            .map_or_else(|e| Err(Into::into(e)), |_| Ok(()))
    }

    pub fn update_spot_market_revenue_settle_period<'a, 'b, 'c, 'info>(
        ctx: CpiContext<'a, 'b, 'c, 'info, UpdateSpotMarketRevenueSettlePeriod<'info>>,
        revenue_settle_period: i64
    ) -> anchor_lang::Result<()> {
        let ix = {
            let ix = instructions::UpdateSpotMarketRevenueSettlePeriod { revenue_settle_period };
            let mut data = Vec::with_capacity(256);
            data.extend_from_slice(&instructions::UpdateSpotMarketRevenueSettlePeriod::DISCRIMINATOR);
            AnchorSerialize::serialize(&ix, &mut data)
                .map_err(|_| anchor_lang::error::ErrorCode::InstructionDidNotSerialize)?;
            let accounts = ctx.to_account_metas(None);
            anchor_lang::solana_program::instruction::Instruction {
                program_id: ctx.program.key(),
                accounts,
                data,
            }
        };
        let mut acc_infos = ctx.to_account_infos();
        anchor_lang::solana_program::program::invoke_signed(&ix, &acc_infos, ctx.signer_seeds)
            .map_or_else(|e| Err(Into::into(e)), |_| Ok(()))
    }

    pub fn update_spot_market_status<'a, 'b, 'c, 'info>(
        ctx: CpiContext<'a, 'b, 'c, 'info, UpdateSpotMarketStatus<'info>>,
        status: MarketStatus
    ) -> anchor_lang::Result<()> {
        let ix = {
            let ix = instructions::UpdateSpotMarketStatus { status };
            let mut data = Vec::with_capacity(256);
            data.extend_from_slice(&instructions::UpdateSpotMarketStatus::DISCRIMINATOR);
            AnchorSerialize::serialize(&ix, &mut data)
                .map_err(|_| anchor_lang::error::ErrorCode::InstructionDidNotSerialize)?;
            let accounts = ctx.to_account_metas(None);
            anchor_lang::solana_program::instruction::Instruction {
                program_id: ctx.program.key(),
                accounts,
                data,
            }
        };
        let mut acc_infos = ctx.to_account_infos();
        anchor_lang::solana_program::program::invoke_signed(&ix, &acc_infos, ctx.signer_seeds)
            .map_or_else(|e| Err(Into::into(e)), |_| Ok(()))
    }

    pub fn update_spot_market_paused_operations<'a, 'b, 'c, 'info>(
        ctx: CpiContext<'a, 'b, 'c, 'info, UpdateSpotMarketPausedOperations<'info>>,
        paused_operations: u8
    ) -> anchor_lang::Result<()> {
        let ix = {
            let ix = instructions::UpdateSpotMarketPausedOperations { paused_operations };
            let mut data = Vec::with_capacity(256);
            data.extend_from_slice(&instructions::UpdateSpotMarketPausedOperations::DISCRIMINATOR);
            AnchorSerialize::serialize(&ix, &mut data)
                .map_err(|_| anchor_lang::error::ErrorCode::InstructionDidNotSerialize)?;
            let accounts = ctx.to_account_metas(None);
            anchor_lang::solana_program::instruction::Instruction {
                program_id: ctx.program.key(),
                accounts,
                data,
            }
        };
        let mut acc_infos = ctx.to_account_infos();
        anchor_lang::solana_program::program::invoke_signed(&ix, &acc_infos, ctx.signer_seeds)
            .map_or_else(|e| Err(Into::into(e)), |_| Ok(()))
    }

    pub fn update_spot_market_asset_tier<'a, 'b, 'c, 'info>(
        ctx: CpiContext<'a, 'b, 'c, 'info, UpdateSpotMarketAssetTier<'info>>,
        asset_tier: AssetTier
    ) -> anchor_lang::Result<()> {
        let ix = {
            let ix = instructions::UpdateSpotMarketAssetTier { asset_tier };
            let mut data = Vec::with_capacity(256);
            data.extend_from_slice(&instructions::UpdateSpotMarketAssetTier::DISCRIMINATOR);
            AnchorSerialize::serialize(&ix, &mut data)
                .map_err(|_| anchor_lang::error::ErrorCode::InstructionDidNotSerialize)?;
            let accounts = ctx.to_account_metas(None);
            anchor_lang::solana_program::instruction::Instruction {
                program_id: ctx.program.key(),
                accounts,
                data,
            }
        };
        let mut acc_infos = ctx.to_account_infos();
        anchor_lang::solana_program::program::invoke_signed(&ix, &acc_infos, ctx.signer_seeds)
            .map_or_else(|e| Err(Into::into(e)), |_| Ok(()))
    }

    pub fn update_spot_market_margin_weights<'a, 'b, 'c, 'info>(
        ctx: CpiContext<'a, 'b, 'c, 'info, UpdateSpotMarketMarginWeights<'info>>,
        initial_asset_weight: u32,
        maintenance_asset_weight: u32,
        initial_liability_weight: u32,
        maintenance_liability_weight: u32,
        imf_factor: u32
    ) -> anchor_lang::Result<()> {
        let ix = {
            let ix = instructions::UpdateSpotMarketMarginWeights { initial_asset_weight, maintenance_asset_weight, initial_liability_weight, maintenance_liability_weight, imf_factor };
            let mut data = Vec::with_capacity(256);
            data.extend_from_slice(&instructions::UpdateSpotMarketMarginWeights::DISCRIMINATOR);
            AnchorSerialize::serialize(&ix, &mut data)
                .map_err(|_| anchor_lang::error::ErrorCode::InstructionDidNotSerialize)?;
            let accounts = ctx.to_account_metas(None);
            anchor_lang::solana_program::instruction::Instruction {
                program_id: ctx.program.key(),
                accounts,
                data,
            }
        };
        let mut acc_infos = ctx.to_account_infos();
        anchor_lang::solana_program::program::invoke_signed(&ix, &acc_infos, ctx.signer_seeds)
            .map_or_else(|e| Err(Into::into(e)), |_| Ok(()))
    }

    pub fn update_spot_market_borrow_rate<'a, 'b, 'c, 'info>(
        ctx: CpiContext<'a, 'b, 'c, 'info, UpdateSpotMarketBorrowRate<'info>>,
        optimal_utilization: u32,
        optimal_borrow_rate: u32,
        max_borrow_rate: u32,
        min_borrow_rate: Option<u8>
    ) -> anchor_lang::Result<()> {
        let ix = {
            let ix = instructions::UpdateSpotMarketBorrowRate { optimal_utilization, optimal_borrow_rate, max_borrow_rate, min_borrow_rate };
            let mut data = Vec::with_capacity(256);
            data.extend_from_slice(&instructions::UpdateSpotMarketBorrowRate::DISCRIMINATOR);
            AnchorSerialize::serialize(&ix, &mut data)
                .map_err(|_| anchor_lang::error::ErrorCode::InstructionDidNotSerialize)?;
            let accounts = ctx.to_account_metas(None);
            anchor_lang::solana_program::instruction::Instruction {
                program_id: ctx.program.key(),
                accounts,
                data,
            }
        };
        let mut acc_infos = ctx.to_account_infos();
        anchor_lang::solana_program::program::invoke_signed(&ix, &acc_infos, ctx.signer_seeds)
            .map_or_else(|e| Err(Into::into(e)), |_| Ok(()))
    }

    pub fn update_spot_market_max_token_deposits<'a, 'b, 'c, 'info>(
        ctx: CpiContext<'a, 'b, 'c, 'info, UpdateSpotMarketMaxTokenDeposits<'info>>,
        max_token_deposits: u64
    ) -> anchor_lang::Result<()> {
        let ix = {
            let ix = instructions::UpdateSpotMarketMaxTokenDeposits { max_token_deposits };
            let mut data = Vec::with_capacity(256);
            data.extend_from_slice(&instructions::UpdateSpotMarketMaxTokenDeposits::DISCRIMINATOR);
            AnchorSerialize::serialize(&ix, &mut data)
                .map_err(|_| anchor_lang::error::ErrorCode::InstructionDidNotSerialize)?;
            let accounts = ctx.to_account_metas(None);
            anchor_lang::solana_program::instruction::Instruction {
                program_id: ctx.program.key(),
                accounts,
                data,
            }
        };
        let mut acc_infos = ctx.to_account_infos();
        anchor_lang::solana_program::program::invoke_signed(&ix, &acc_infos, ctx.signer_seeds)
            .map_or_else(|e| Err(Into::into(e)), |_| Ok(()))
    }

    pub fn update_spot_market_max_token_borrows<'a, 'b, 'c, 'info>(
        ctx: CpiContext<'a, 'b, 'c, 'info, UpdateSpotMarketMaxTokenBorrows<'info>>,
        max_token_borrows_fraction: u16
    ) -> anchor_lang::Result<()> {
        let ix = {
            let ix = instructions::UpdateSpotMarketMaxTokenBorrows { max_token_borrows_fraction };
            let mut data = Vec::with_capacity(256);
            data.extend_from_slice(&instructions::UpdateSpotMarketMaxTokenBorrows::DISCRIMINATOR);
            AnchorSerialize::serialize(&ix, &mut data)
                .map_err(|_| anchor_lang::error::ErrorCode::InstructionDidNotSerialize)?;
            let accounts = ctx.to_account_metas(None);
            anchor_lang::solana_program::instruction::Instruction {
                program_id: ctx.program.key(),
                accounts,
                data,
            }
        };
        let mut acc_infos = ctx.to_account_infos();
        anchor_lang::solana_program::program::invoke_signed(&ix, &acc_infos, ctx.signer_seeds)
            .map_or_else(|e| Err(Into::into(e)), |_| Ok(()))
    }

    pub fn update_spot_market_scale_initial_asset_weight_start<'a, 'b, 'c, 'info>(
        ctx: CpiContext<'a, 'b, 'c, 'info, UpdateSpotMarketScaleInitialAssetWeightStart<'info>>,
        scale_initial_asset_weight_start: u64
    ) -> anchor_lang::Result<()> {
        let ix = {
            let ix = instructions::UpdateSpotMarketScaleInitialAssetWeightStart { scale_initial_asset_weight_start };
            let mut data = Vec::with_capacity(256);
            data.extend_from_slice(&instructions::UpdateSpotMarketScaleInitialAssetWeightStart::DISCRIMINATOR);
            AnchorSerialize::serialize(&ix, &mut data)
                .map_err(|_| anchor_lang::error::ErrorCode::InstructionDidNotSerialize)?;
            let accounts = ctx.to_account_metas(None);
            anchor_lang::solana_program::instruction::Instruction {
                program_id: ctx.program.key(),
                accounts,
                data,
            }
        };
        let mut acc_infos = ctx.to_account_infos();
        anchor_lang::solana_program::program::invoke_signed(&ix, &acc_infos, ctx.signer_seeds)
            .map_or_else(|e| Err(Into::into(e)), |_| Ok(()))
    }

    pub fn update_spot_market_oracle<'a, 'b, 'c, 'info>(
        ctx: CpiContext<'a, 'b, 'c, 'info, UpdateSpotMarketOracle<'info>>,
        oracle: Pubkey,
        oracle_source: OracleSource
    ) -> anchor_lang::Result<()> {
        let ix = {
            let ix = instructions::UpdateSpotMarketOracle { oracle, oracle_source };
            let mut data = Vec::with_capacity(256);
            data.extend_from_slice(&instructions::UpdateSpotMarketOracle::DISCRIMINATOR);
            AnchorSerialize::serialize(&ix, &mut data)
                .map_err(|_| anchor_lang::error::ErrorCode::InstructionDidNotSerialize)?;
            let accounts = ctx.to_account_metas(None);
            anchor_lang::solana_program::instruction::Instruction {
                program_id: ctx.program.key(),
                accounts,
                data,
            }
        };
        let mut acc_infos = ctx.to_account_infos();
        anchor_lang::solana_program::program::invoke_signed(&ix, &acc_infos, ctx.signer_seeds)
            .map_or_else(|e| Err(Into::into(e)), |_| Ok(()))
    }

    pub fn update_spot_market_step_size_and_tick_size<'a, 'b, 'c, 'info>(
        ctx: CpiContext<'a, 'b, 'c, 'info, UpdateSpotMarketStepSizeAndTickSize<'info>>,
        step_size: u64,
        tick_size: u64
    ) -> anchor_lang::Result<()> {
        let ix = {
            let ix = instructions::UpdateSpotMarketStepSizeAndTickSize { step_size, tick_size };
            let mut data = Vec::with_capacity(256);
            data.extend_from_slice(&instructions::UpdateSpotMarketStepSizeAndTickSize::DISCRIMINATOR);
            AnchorSerialize::serialize(&ix, &mut data)
                .map_err(|_| anchor_lang::error::ErrorCode::InstructionDidNotSerialize)?;
            let accounts = ctx.to_account_metas(None);
            anchor_lang::solana_program::instruction::Instruction {
                program_id: ctx.program.key(),
                accounts,
                data,
            }
        };
        let mut acc_infos = ctx.to_account_infos();
        anchor_lang::solana_program::program::invoke_signed(&ix, &acc_infos, ctx.signer_seeds)
            .map_or_else(|e| Err(Into::into(e)), |_| Ok(()))
    }

    pub fn update_spot_market_min_order_size<'a, 'b, 'c, 'info>(
        ctx: CpiContext<'a, 'b, 'c, 'info, UpdateSpotMarketMinOrderSize<'info>>,
        order_size: u64
    ) -> anchor_lang::Result<()> {
        let ix = {
            let ix = instructions::UpdateSpotMarketMinOrderSize { order_size };
            let mut data = Vec::with_capacity(256);
            data.extend_from_slice(&instructions::UpdateSpotMarketMinOrderSize::DISCRIMINATOR);
            AnchorSerialize::serialize(&ix, &mut data)
                .map_err(|_| anchor_lang::error::ErrorCode::InstructionDidNotSerialize)?;
            let accounts = ctx.to_account_metas(None);
            anchor_lang::solana_program::instruction::Instruction {
                program_id: ctx.program.key(),
                accounts,
                data,
            }
        };
        let mut acc_infos = ctx.to_account_infos();
        anchor_lang::solana_program::program::invoke_signed(&ix, &acc_infos, ctx.signer_seeds)
            .map_or_else(|e| Err(Into::into(e)), |_| Ok(()))
    }

    pub fn update_spot_market_orders_enabled<'a, 'b, 'c, 'info>(
        ctx: CpiContext<'a, 'b, 'c, 'info, UpdateSpotMarketOrdersEnabled<'info>>,
        orders_enabled: bool
    ) -> anchor_lang::Result<()> {
        let ix = {
            let ix = instructions::UpdateSpotMarketOrdersEnabled { orders_enabled };
            let mut data = Vec::with_capacity(256);
            data.extend_from_slice(&instructions::UpdateSpotMarketOrdersEnabled::DISCRIMINATOR);
            AnchorSerialize::serialize(&ix, &mut data)
                .map_err(|_| anchor_lang::error::ErrorCode::InstructionDidNotSerialize)?;
            let accounts = ctx.to_account_metas(None);
            anchor_lang::solana_program::instruction::Instruction {
                program_id: ctx.program.key(),
                accounts,
                data,
            }
        };
        let mut acc_infos = ctx.to_account_infos();
        anchor_lang::solana_program::program::invoke_signed(&ix, &acc_infos, ctx.signer_seeds)
            .map_or_else(|e| Err(Into::into(e)), |_| Ok(()))
    }

    pub fn update_spot_market_if_paused_operations<'a, 'b, 'c, 'info>(
        ctx: CpiContext<'a, 'b, 'c, 'info, UpdateSpotMarketIfPausedOperations<'info>>,
        paused_operations: u8
    ) -> anchor_lang::Result<()> {
        let ix = {
            let ix = instructions::UpdateSpotMarketIfPausedOperations { paused_operations };
            let mut data = Vec::with_capacity(256);
            data.extend_from_slice(&instructions::UpdateSpotMarketIfPausedOperations::DISCRIMINATOR);
            AnchorSerialize::serialize(&ix, &mut data)
                .map_err(|_| anchor_lang::error::ErrorCode::InstructionDidNotSerialize)?;
            let accounts = ctx.to_account_metas(None);
            anchor_lang::solana_program::instruction::Instruction {
                program_id: ctx.program.key(),
                accounts,
                data,
            }
        };
        let mut acc_infos = ctx.to_account_infos();
        anchor_lang::solana_program::program::invoke_signed(&ix, &acc_infos, ctx.signer_seeds)
            .map_or_else(|e| Err(Into::into(e)), |_| Ok(()))
    }

    pub fn update_spot_market_name<'a, 'b, 'c, 'info>(
        ctx: CpiContext<'a, 'b, 'c, 'info, UpdateSpotMarketName<'info>>,
        name: [u8;32]
    ) -> anchor_lang::Result<()> {
        let ix = {
            let ix = instructions::UpdateSpotMarketName { name };
            let mut data = Vec::with_capacity(256);
            data.extend_from_slice(&instructions::UpdateSpotMarketName::DISCRIMINATOR);
            AnchorSerialize::serialize(&ix, &mut data)
                .map_err(|_| anchor_lang::error::ErrorCode::InstructionDidNotSerialize)?;
            let accounts = ctx.to_account_metas(None);
            anchor_lang::solana_program::instruction::Instruction {
                program_id: ctx.program.key(),
                accounts,
                data,
            }
        };
        let mut acc_infos = ctx.to_account_infos();
        anchor_lang::solana_program::program::invoke_signed(&ix, &acc_infos, ctx.signer_seeds)
            .map_or_else(|e| Err(Into::into(e)), |_| Ok(()))
    }

    pub fn update_perp_market_status<'a, 'b, 'c, 'info>(
        ctx: CpiContext<'a, 'b, 'c, 'info, UpdatePerpMarketStatus<'info>>,
        status: MarketStatus
    ) -> anchor_lang::Result<()> {
        let ix = {
            let ix = instructions::UpdatePerpMarketStatus { status };
            let mut data = Vec::with_capacity(256);
            data.extend_from_slice(&instructions::UpdatePerpMarketStatus::DISCRIMINATOR);
            AnchorSerialize::serialize(&ix, &mut data)
                .map_err(|_| anchor_lang::error::ErrorCode::InstructionDidNotSerialize)?;
            let accounts = ctx.to_account_metas(None);
            anchor_lang::solana_program::instruction::Instruction {
                program_id: ctx.program.key(),
                accounts,
                data,
            }
        };
        let mut acc_infos = ctx.to_account_infos();
        anchor_lang::solana_program::program::invoke_signed(&ix, &acc_infos, ctx.signer_seeds)
            .map_or_else(|e| Err(Into::into(e)), |_| Ok(()))
    }

    pub fn update_perp_market_paused_operations<'a, 'b, 'c, 'info>(
        ctx: CpiContext<'a, 'b, 'c, 'info, UpdatePerpMarketPausedOperations<'info>>,
        paused_operations: u8
    ) -> anchor_lang::Result<()> {
        let ix = {
            let ix = instructions::UpdatePerpMarketPausedOperations { paused_operations };
            let mut data = Vec::with_capacity(256);
            data.extend_from_slice(&instructions::UpdatePerpMarketPausedOperations::DISCRIMINATOR);
            AnchorSerialize::serialize(&ix, &mut data)
                .map_err(|_| anchor_lang::error::ErrorCode::InstructionDidNotSerialize)?;
            let accounts = ctx.to_account_metas(None);
            anchor_lang::solana_program::instruction::Instruction {
                program_id: ctx.program.key(),
                accounts,
                data,
            }
        };
        let mut acc_infos = ctx.to_account_infos();
        anchor_lang::solana_program::program::invoke_signed(&ix, &acc_infos, ctx.signer_seeds)
            .map_or_else(|e| Err(Into::into(e)), |_| Ok(()))
    }

    pub fn update_perp_market_contract_tier<'a, 'b, 'c, 'info>(
        ctx: CpiContext<'a, 'b, 'c, 'info, UpdatePerpMarketContractTier<'info>>,
        contract_tier: ContractTier
    ) -> anchor_lang::Result<()> {
        let ix = {
            let ix = instructions::UpdatePerpMarketContractTier { contract_tier };
            let mut data = Vec::with_capacity(256);
            data.extend_from_slice(&instructions::UpdatePerpMarketContractTier::DISCRIMINATOR);
            AnchorSerialize::serialize(&ix, &mut data)
                .map_err(|_| anchor_lang::error::ErrorCode::InstructionDidNotSerialize)?;
            let accounts = ctx.to_account_metas(None);
            anchor_lang::solana_program::instruction::Instruction {
                program_id: ctx.program.key(),
                accounts,
                data,
            }
        };
        let mut acc_infos = ctx.to_account_infos();
        anchor_lang::solana_program::program::invoke_signed(&ix, &acc_infos, ctx.signer_seeds)
            .map_or_else(|e| Err(Into::into(e)), |_| Ok(()))
    }

    pub fn update_perp_market_imf_factor<'a, 'b, 'c, 'info>(
        ctx: CpiContext<'a, 'b, 'c, 'info, UpdatePerpMarketImfFactor<'info>>,
        imf_factor: u32,
        unrealized_pnl_imf_factor: u32
    ) -> anchor_lang::Result<()> {
        let ix = {
            let ix = instructions::UpdatePerpMarketImfFactor { imf_factor, unrealized_pnl_imf_factor };
            let mut data = Vec::with_capacity(256);
            data.extend_from_slice(&instructions::UpdatePerpMarketImfFactor::DISCRIMINATOR);
            AnchorSerialize::serialize(&ix, &mut data)
                .map_err(|_| anchor_lang::error::ErrorCode::InstructionDidNotSerialize)?;
            let accounts = ctx.to_account_metas(None);
            anchor_lang::solana_program::instruction::Instruction {
                program_id: ctx.program.key(),
                accounts,
                data,
            }
        };
        let mut acc_infos = ctx.to_account_infos();
        anchor_lang::solana_program::program::invoke_signed(&ix, &acc_infos, ctx.signer_seeds)
            .map_or_else(|e| Err(Into::into(e)), |_| Ok(()))
    }

    pub fn update_perp_market_unrealized_asset_weight<'a, 'b, 'c, 'info>(
        ctx: CpiContext<'a, 'b, 'c, 'info, UpdatePerpMarketUnrealizedAssetWeight<'info>>,
        unrealized_initial_asset_weight: u32,
        unrealized_maintenance_asset_weight: u32
    ) -> anchor_lang::Result<()> {
        let ix = {
            let ix = instructions::UpdatePerpMarketUnrealizedAssetWeight { unrealized_initial_asset_weight, unrealized_maintenance_asset_weight };
            let mut data = Vec::with_capacity(256);
            data.extend_from_slice(&instructions::UpdatePerpMarketUnrealizedAssetWeight::DISCRIMINATOR);
            AnchorSerialize::serialize(&ix, &mut data)
                .map_err(|_| anchor_lang::error::ErrorCode::InstructionDidNotSerialize)?;
            let accounts = ctx.to_account_metas(None);
            anchor_lang::solana_program::instruction::Instruction {
                program_id: ctx.program.key(),
                accounts,
                data,
            }
        };
        let mut acc_infos = ctx.to_account_infos();
        anchor_lang::solana_program::program::invoke_signed(&ix, &acc_infos, ctx.signer_seeds)
            .map_or_else(|e| Err(Into::into(e)), |_| Ok(()))
    }

    pub fn update_perp_market_concentration_coef<'a, 'b, 'c, 'info>(
        ctx: CpiContext<'a, 'b, 'c, 'info, UpdatePerpMarketConcentrationCoef<'info>>,
        concentration_scale: u128
    ) -> anchor_lang::Result<()> {
        let ix = {
            let ix = instructions::UpdatePerpMarketConcentrationCoef { concentration_scale };
            let mut data = Vec::with_capacity(256);
            data.extend_from_slice(&instructions::UpdatePerpMarketConcentrationCoef::DISCRIMINATOR);
            AnchorSerialize::serialize(&ix, &mut data)
                .map_err(|_| anchor_lang::error::ErrorCode::InstructionDidNotSerialize)?;
            let accounts = ctx.to_account_metas(None);
            anchor_lang::solana_program::instruction::Instruction {
                program_id: ctx.program.key(),
                accounts,
                data,
            }
        };
        let mut acc_infos = ctx.to_account_infos();
        anchor_lang::solana_program::program::invoke_signed(&ix, &acc_infos, ctx.signer_seeds)
            .map_or_else(|e| Err(Into::into(e)), |_| Ok(()))
    }

    pub fn update_perp_market_curve_update_intensity<'a, 'b, 'c, 'info>(
        ctx: CpiContext<'a, 'b, 'c, 'info, UpdatePerpMarketCurveUpdateIntensity<'info>>,
        curve_update_intensity: u8
    ) -> anchor_lang::Result<()> {
        let ix = {
            let ix = instructions::UpdatePerpMarketCurveUpdateIntensity { curve_update_intensity };
            let mut data = Vec::with_capacity(256);
            data.extend_from_slice(&instructions::UpdatePerpMarketCurveUpdateIntensity::DISCRIMINATOR);
            AnchorSerialize::serialize(&ix, &mut data)
                .map_err(|_| anchor_lang::error::ErrorCode::InstructionDidNotSerialize)?;
            let accounts = ctx.to_account_metas(None);
            anchor_lang::solana_program::instruction::Instruction {
                program_id: ctx.program.key(),
                accounts,
                data,
            }
        };
        let mut acc_infos = ctx.to_account_infos();
        anchor_lang::solana_program::program::invoke_signed(&ix, &acc_infos, ctx.signer_seeds)
            .map_or_else(|e| Err(Into::into(e)), |_| Ok(()))
    }

    pub fn update_perp_market_target_base_asset_amount_per_lp<'a, 'b, 'c, 'info>(
        ctx: CpiContext<'a, 'b, 'c, 'info, UpdatePerpMarketTargetBaseAssetAmountPerLp<'info>>,
        target_base_asset_amount_per_lp: i32
    ) -> anchor_lang::Result<()> {
        let ix = {
            let ix = instructions::UpdatePerpMarketTargetBaseAssetAmountPerLp { target_base_asset_amount_per_lp };
            let mut data = Vec::with_capacity(256);
            data.extend_from_slice(&instructions::UpdatePerpMarketTargetBaseAssetAmountPerLp::DISCRIMINATOR);
            AnchorSerialize::serialize(&ix, &mut data)
                .map_err(|_| anchor_lang::error::ErrorCode::InstructionDidNotSerialize)?;
            let accounts = ctx.to_account_metas(None);
            anchor_lang::solana_program::instruction::Instruction {
                program_id: ctx.program.key(),
                accounts,
                data,
            }
        };
        let mut acc_infos = ctx.to_account_infos();
        anchor_lang::solana_program::program::invoke_signed(&ix, &acc_infos, ctx.signer_seeds)
            .map_or_else(|e| Err(Into::into(e)), |_| Ok(()))
    }

    pub fn update_perp_market_per_lp_base<'a, 'b, 'c, 'info>(
        ctx: CpiContext<'a, 'b, 'c, 'info, UpdatePerpMarketPerLpBase<'info>>,
        per_lp_base: i8
    ) -> anchor_lang::Result<()> {
        let ix = {
            let ix = instructions::UpdatePerpMarketPerLpBase { per_lp_base };
            let mut data = Vec::with_capacity(256);
            data.extend_from_slice(&instructions::UpdatePerpMarketPerLpBase::DISCRIMINATOR);
            AnchorSerialize::serialize(&ix, &mut data)
                .map_err(|_| anchor_lang::error::ErrorCode::InstructionDidNotSerialize)?;
            let accounts = ctx.to_account_metas(None);
            anchor_lang::solana_program::instruction::Instruction {
                program_id: ctx.program.key(),
                accounts,
                data,
            }
        };
        let mut acc_infos = ctx.to_account_infos();
        anchor_lang::solana_program::program::invoke_signed(&ix, &acc_infos, ctx.signer_seeds)
            .map_or_else(|e| Err(Into::into(e)), |_| Ok(()))
    }

    pub fn update_lp_cooldown_time<'a, 'b, 'c, 'info>(
        ctx: CpiContext<'a, 'b, 'c, 'info, UpdateLpCooldownTime<'info>>,
        lp_cooldown_time: u64
    ) -> anchor_lang::Result<()> {
        let ix = {
            let ix = instructions::UpdateLpCooldownTime { lp_cooldown_time };
            let mut data = Vec::with_capacity(256);
            data.extend_from_slice(&instructions::UpdateLpCooldownTime::DISCRIMINATOR);
            AnchorSerialize::serialize(&ix, &mut data)
                .map_err(|_| anchor_lang::error::ErrorCode::InstructionDidNotSerialize)?;
            let accounts = ctx.to_account_metas(None);
            anchor_lang::solana_program::instruction::Instruction {
                program_id: ctx.program.key(),
                accounts,
                data,
            }
        };
        let mut acc_infos = ctx.to_account_infos();
        anchor_lang::solana_program::program::invoke_signed(&ix, &acc_infos, ctx.signer_seeds)
            .map_or_else(|e| Err(Into::into(e)), |_| Ok(()))
    }

    pub fn update_perp_fee_structure<'a, 'b, 'c, 'info>(
        ctx: CpiContext<'a, 'b, 'c, 'info, UpdatePerpFeeStructure<'info>>,
        fee_structure: FeeStructure
    ) -> anchor_lang::Result<()> {
        let ix = {
            let ix = instructions::UpdatePerpFeeStructure { fee_structure };
            let mut data = Vec::with_capacity(256);
            data.extend_from_slice(&instructions::UpdatePerpFeeStructure::DISCRIMINATOR);
            AnchorSerialize::serialize(&ix, &mut data)
                .map_err(|_| anchor_lang::error::ErrorCode::InstructionDidNotSerialize)?;
            let accounts = ctx.to_account_metas(None);
            anchor_lang::solana_program::instruction::Instruction {
                program_id: ctx.program.key(),
                accounts,
                data,
            }
        };
        let mut acc_infos = ctx.to_account_infos();
        anchor_lang::solana_program::program::invoke_signed(&ix, &acc_infos, ctx.signer_seeds)
            .map_or_else(|e| Err(Into::into(e)), |_| Ok(()))
    }

    pub fn update_spot_fee_structure<'a, 'b, 'c, 'info>(
        ctx: CpiContext<'a, 'b, 'c, 'info, UpdateSpotFeeStructure<'info>>,
        fee_structure: FeeStructure
    ) -> anchor_lang::Result<()> {
        let ix = {
            let ix = instructions::UpdateSpotFeeStructure { fee_structure };
            let mut data = Vec::with_capacity(256);
            data.extend_from_slice(&instructions::UpdateSpotFeeStructure::DISCRIMINATOR);
            AnchorSerialize::serialize(&ix, &mut data)
                .map_err(|_| anchor_lang::error::ErrorCode::InstructionDidNotSerialize)?;
            let accounts = ctx.to_account_metas(None);
            anchor_lang::solana_program::instruction::Instruction {
                program_id: ctx.program.key(),
                accounts,
                data,
            }
        };
        let mut acc_infos = ctx.to_account_infos();
        anchor_lang::solana_program::program::invoke_signed(&ix, &acc_infos, ctx.signer_seeds)
            .map_or_else(|e| Err(Into::into(e)), |_| Ok(()))
    }

    pub fn update_initial_pct_to_liquidate<'a, 'b, 'c, 'info>(
        ctx: CpiContext<'a, 'b, 'c, 'info, UpdateInitialPctToLiquidate<'info>>,
        initial_pct_to_liquidate: u16
    ) -> anchor_lang::Result<()> {
        let ix = {
            let ix = instructions::UpdateInitialPctToLiquidate { initial_pct_to_liquidate };
            let mut data = Vec::with_capacity(256);
            data.extend_from_slice(&instructions::UpdateInitialPctToLiquidate::DISCRIMINATOR);
            AnchorSerialize::serialize(&ix, &mut data)
                .map_err(|_| anchor_lang::error::ErrorCode::InstructionDidNotSerialize)?;
            let accounts = ctx.to_account_metas(None);
            anchor_lang::solana_program::instruction::Instruction {
                program_id: ctx.program.key(),
                accounts,
                data,
            }
        };
        let mut acc_infos = ctx.to_account_infos();
        anchor_lang::solana_program::program::invoke_signed(&ix, &acc_infos, ctx.signer_seeds)
            .map_or_else(|e| Err(Into::into(e)), |_| Ok(()))
    }

    pub fn update_liquidation_duration<'a, 'b, 'c, 'info>(
        ctx: CpiContext<'a, 'b, 'c, 'info, UpdateLiquidationDuration<'info>>,
        liquidation_duration: u8
    ) -> anchor_lang::Result<()> {
        let ix = {
            let ix = instructions::UpdateLiquidationDuration { liquidation_duration };
            let mut data = Vec::with_capacity(256);
            data.extend_from_slice(&instructions::UpdateLiquidationDuration::DISCRIMINATOR);
            AnchorSerialize::serialize(&ix, &mut data)
                .map_err(|_| anchor_lang::error::ErrorCode::InstructionDidNotSerialize)?;
            let accounts = ctx.to_account_metas(None);
            anchor_lang::solana_program::instruction::Instruction {
                program_id: ctx.program.key(),
                accounts,
                data,
            }
        };
        let mut acc_infos = ctx.to_account_infos();
        anchor_lang::solana_program::program::invoke_signed(&ix, &acc_infos, ctx.signer_seeds)
            .map_or_else(|e| Err(Into::into(e)), |_| Ok(()))
    }

    pub fn update_liquidation_margin_buffer_ratio<'a, 'b, 'c, 'info>(
        ctx: CpiContext<'a, 'b, 'c, 'info, UpdateLiquidationMarginBufferRatio<'info>>,
        liquidation_margin_buffer_ratio: u32
    ) -> anchor_lang::Result<()> {
        let ix = {
            let ix = instructions::UpdateLiquidationMarginBufferRatio { liquidation_margin_buffer_ratio };
            let mut data = Vec::with_capacity(256);
            data.extend_from_slice(&instructions::UpdateLiquidationMarginBufferRatio::DISCRIMINATOR);
            AnchorSerialize::serialize(&ix, &mut data)
                .map_err(|_| anchor_lang::error::ErrorCode::InstructionDidNotSerialize)?;
            let accounts = ctx.to_account_metas(None);
            anchor_lang::solana_program::instruction::Instruction {
                program_id: ctx.program.key(),
                accounts,
                data,
            }
        };
        let mut acc_infos = ctx.to_account_infos();
        anchor_lang::solana_program::program::invoke_signed(&ix, &acc_infos, ctx.signer_seeds)
            .map_or_else(|e| Err(Into::into(e)), |_| Ok(()))
    }

    pub fn update_oracle_guard_rails<'a, 'b, 'c, 'info>(
        ctx: CpiContext<'a, 'b, 'c, 'info, UpdateOracleGuardRails<'info>>,
        oracle_guard_rails: OracleGuardRails
    ) -> anchor_lang::Result<()> {
        let ix = {
            let ix = instructions::UpdateOracleGuardRails { oracle_guard_rails };
            let mut data = Vec::with_capacity(256);
            data.extend_from_slice(&instructions::UpdateOracleGuardRails::DISCRIMINATOR);
            AnchorSerialize::serialize(&ix, &mut data)
                .map_err(|_| anchor_lang::error::ErrorCode::InstructionDidNotSerialize)?;
            let accounts = ctx.to_account_metas(None);
            anchor_lang::solana_program::instruction::Instruction {
                program_id: ctx.program.key(),
                accounts,
                data,
            }
        };
        let mut acc_infos = ctx.to_account_infos();
        anchor_lang::solana_program::program::invoke_signed(&ix, &acc_infos, ctx.signer_seeds)
            .map_or_else(|e| Err(Into::into(e)), |_| Ok(()))
    }

    pub fn update_state_settlement_duration<'a, 'b, 'c, 'info>(
        ctx: CpiContext<'a, 'b, 'c, 'info, UpdateStateSettlementDuration<'info>>,
        settlement_duration: u16
    ) -> anchor_lang::Result<()> {
        let ix = {
            let ix = instructions::UpdateStateSettlementDuration { settlement_duration };
            let mut data = Vec::with_capacity(256);
            data.extend_from_slice(&instructions::UpdateStateSettlementDuration::DISCRIMINATOR);
            AnchorSerialize::serialize(&ix, &mut data)
                .map_err(|_| anchor_lang::error::ErrorCode::InstructionDidNotSerialize)?;
            let accounts = ctx.to_account_metas(None);
            anchor_lang::solana_program::instruction::Instruction {
                program_id: ctx.program.key(),
                accounts,
                data,
            }
        };
        let mut acc_infos = ctx.to_account_infos();
        anchor_lang::solana_program::program::invoke_signed(&ix, &acc_infos, ctx.signer_seeds)
            .map_or_else(|e| Err(Into::into(e)), |_| Ok(()))
    }

    pub fn update_state_max_number_of_sub_accounts<'a, 'b, 'c, 'info>(
        ctx: CpiContext<'a, 'b, 'c, 'info, UpdateStateMaxNumberOfSubAccounts<'info>>,
        max_number_of_sub_accounts: u16
    ) -> anchor_lang::Result<()> {
        let ix = {
            let ix = instructions::UpdateStateMaxNumberOfSubAccounts { max_number_of_sub_accounts };
            let mut data = Vec::with_capacity(256);
            data.extend_from_slice(&instructions::UpdateStateMaxNumberOfSubAccounts::DISCRIMINATOR);
            AnchorSerialize::serialize(&ix, &mut data)
                .map_err(|_| anchor_lang::error::ErrorCode::InstructionDidNotSerialize)?;
            let accounts = ctx.to_account_metas(None);
            anchor_lang::solana_program::instruction::Instruction {
                program_id: ctx.program.key(),
                accounts,
                data,
            }
        };
        let mut acc_infos = ctx.to_account_infos();
        anchor_lang::solana_program::program::invoke_signed(&ix, &acc_infos, ctx.signer_seeds)
            .map_or_else(|e| Err(Into::into(e)), |_| Ok(()))
    }

    pub fn update_state_max_initialize_user_fee<'a, 'b, 'c, 'info>(
        ctx: CpiContext<'a, 'b, 'c, 'info, UpdateStateMaxInitializeUserFee<'info>>,
        max_initialize_user_fee: u16
    ) -> anchor_lang::Result<()> {
        let ix = {
            let ix = instructions::UpdateStateMaxInitializeUserFee { max_initialize_user_fee };
            let mut data = Vec::with_capacity(256);
            data.extend_from_slice(&instructions::UpdateStateMaxInitializeUserFee::DISCRIMINATOR);
            AnchorSerialize::serialize(&ix, &mut data)
                .map_err(|_| anchor_lang::error::ErrorCode::InstructionDidNotSerialize)?;
            let accounts = ctx.to_account_metas(None);
            anchor_lang::solana_program::instruction::Instruction {
                program_id: ctx.program.key(),
                accounts,
                data,
            }
        };
        let mut acc_infos = ctx.to_account_infos();
        anchor_lang::solana_program::program::invoke_signed(&ix, &acc_infos, ctx.signer_seeds)
            .map_or_else(|e| Err(Into::into(e)), |_| Ok(()))
    }

    pub fn update_perp_market_oracle<'a, 'b, 'c, 'info>(
        ctx: CpiContext<'a, 'b, 'c, 'info, UpdatePerpMarketOracle<'info>>,
        oracle: Pubkey,
        oracle_source: OracleSource
    ) -> anchor_lang::Result<()> {
        let ix = {
            let ix = instructions::UpdatePerpMarketOracle { oracle, oracle_source };
            let mut data = Vec::with_capacity(256);
            data.extend_from_slice(&instructions::UpdatePerpMarketOracle::DISCRIMINATOR);
            AnchorSerialize::serialize(&ix, &mut data)
                .map_err(|_| anchor_lang::error::ErrorCode::InstructionDidNotSerialize)?;
            let accounts = ctx.to_account_metas(None);
            anchor_lang::solana_program::instruction::Instruction {
                program_id: ctx.program.key(),
                accounts,
                data,
            }
        };
        let mut acc_infos = ctx.to_account_infos();
        anchor_lang::solana_program::program::invoke_signed(&ix, &acc_infos, ctx.signer_seeds)
            .map_or_else(|e| Err(Into::into(e)), |_| Ok(()))
    }

    pub fn update_perp_market_base_spread<'a, 'b, 'c, 'info>(
        ctx: CpiContext<'a, 'b, 'c, 'info, UpdatePerpMarketBaseSpread<'info>>,
        base_spread: u32
    ) -> anchor_lang::Result<()> {
        let ix = {
            let ix = instructions::UpdatePerpMarketBaseSpread { base_spread };
            let mut data = Vec::with_capacity(256);
            data.extend_from_slice(&instructions::UpdatePerpMarketBaseSpread::DISCRIMINATOR);
            AnchorSerialize::serialize(&ix, &mut data)
                .map_err(|_| anchor_lang::error::ErrorCode::InstructionDidNotSerialize)?;
            let accounts = ctx.to_account_metas(None);
            anchor_lang::solana_program::instruction::Instruction {
                program_id: ctx.program.key(),
                accounts,
                data,
            }
        };
        let mut acc_infos = ctx.to_account_infos();
        anchor_lang::solana_program::program::invoke_signed(&ix, &acc_infos, ctx.signer_seeds)
            .map_or_else(|e| Err(Into::into(e)), |_| Ok(()))
    }

    pub fn update_amm_jit_intensity<'a, 'b, 'c, 'info>(
        ctx: CpiContext<'a, 'b, 'c, 'info, UpdateAmmJitIntensity<'info>>,
        amm_jit_intensity: u8
    ) -> anchor_lang::Result<()> {
        let ix = {
            let ix = instructions::UpdateAmmJitIntensity { amm_jit_intensity };
            let mut data = Vec::with_capacity(256);
            data.extend_from_slice(&instructions::UpdateAmmJitIntensity::DISCRIMINATOR);
            AnchorSerialize::serialize(&ix, &mut data)
                .map_err(|_| anchor_lang::error::ErrorCode::InstructionDidNotSerialize)?;
            let accounts = ctx.to_account_metas(None);
            anchor_lang::solana_program::instruction::Instruction {
                program_id: ctx.program.key(),
                accounts,
                data,
            }
        };
        let mut acc_infos = ctx.to_account_infos();
        anchor_lang::solana_program::program::invoke_signed(&ix, &acc_infos, ctx.signer_seeds)
            .map_or_else(|e| Err(Into::into(e)), |_| Ok(()))
    }

    pub fn update_perp_market_max_spread<'a, 'b, 'c, 'info>(
        ctx: CpiContext<'a, 'b, 'c, 'info, UpdatePerpMarketMaxSpread<'info>>,
        max_spread: u32
    ) -> anchor_lang::Result<()> {
        let ix = {
            let ix = instructions::UpdatePerpMarketMaxSpread { max_spread };
            let mut data = Vec::with_capacity(256);
            data.extend_from_slice(&instructions::UpdatePerpMarketMaxSpread::DISCRIMINATOR);
            AnchorSerialize::serialize(&ix, &mut data)
                .map_err(|_| anchor_lang::error::ErrorCode::InstructionDidNotSerialize)?;
            let accounts = ctx.to_account_metas(None);
            anchor_lang::solana_program::instruction::Instruction {
                program_id: ctx.program.key(),
                accounts,
                data,
            }
        };
        let mut acc_infos = ctx.to_account_infos();
        anchor_lang::solana_program::program::invoke_signed(&ix, &acc_infos, ctx.signer_seeds)
            .map_or_else(|e| Err(Into::into(e)), |_| Ok(()))
    }

    pub fn update_perp_market_step_size_and_tick_size<'a, 'b, 'c, 'info>(
        ctx: CpiContext<'a, 'b, 'c, 'info, UpdatePerpMarketStepSizeAndTickSize<'info>>,
        step_size: u64,
        tick_size: u64
    ) -> anchor_lang::Result<()> {
        let ix = {
            let ix = instructions::UpdatePerpMarketStepSizeAndTickSize { step_size, tick_size };
            let mut data = Vec::with_capacity(256);
            data.extend_from_slice(&instructions::UpdatePerpMarketStepSizeAndTickSize::DISCRIMINATOR);
            AnchorSerialize::serialize(&ix, &mut data)
                .map_err(|_| anchor_lang::error::ErrorCode::InstructionDidNotSerialize)?;
            let accounts = ctx.to_account_metas(None);
            anchor_lang::solana_program::instruction::Instruction {
                program_id: ctx.program.key(),
                accounts,
                data,
            }
        };
        let mut acc_infos = ctx.to_account_infos();
        anchor_lang::solana_program::program::invoke_signed(&ix, &acc_infos, ctx.signer_seeds)
            .map_or_else(|e| Err(Into::into(e)), |_| Ok(()))
    }

    pub fn update_perp_market_name<'a, 'b, 'c, 'info>(
        ctx: CpiContext<'a, 'b, 'c, 'info, UpdatePerpMarketName<'info>>,
        name: [u8;32]
    ) -> anchor_lang::Result<()> {
        let ix = {
            let ix = instructions::UpdatePerpMarketName { name };
            let mut data = Vec::with_capacity(256);
            data.extend_from_slice(&instructions::UpdatePerpMarketName::DISCRIMINATOR);
            AnchorSerialize::serialize(&ix, &mut data)
                .map_err(|_| anchor_lang::error::ErrorCode::InstructionDidNotSerialize)?;
            let accounts = ctx.to_account_metas(None);
            anchor_lang::solana_program::instruction::Instruction {
                program_id: ctx.program.key(),
                accounts,
                data,
            }
        };
        let mut acc_infos = ctx.to_account_infos();
        anchor_lang::solana_program::program::invoke_signed(&ix, &acc_infos, ctx.signer_seeds)
            .map_or_else(|e| Err(Into::into(e)), |_| Ok(()))
    }

    pub fn update_perp_market_min_order_size<'a, 'b, 'c, 'info>(
        ctx: CpiContext<'a, 'b, 'c, 'info, UpdatePerpMarketMinOrderSize<'info>>,
        order_size: u64
    ) -> anchor_lang::Result<()> {
        let ix = {
            let ix = instructions::UpdatePerpMarketMinOrderSize { order_size };
            let mut data = Vec::with_capacity(256);
            data.extend_from_slice(&instructions::UpdatePerpMarketMinOrderSize::DISCRIMINATOR);
            AnchorSerialize::serialize(&ix, &mut data)
                .map_err(|_| anchor_lang::error::ErrorCode::InstructionDidNotSerialize)?;
            let accounts = ctx.to_account_metas(None);
            anchor_lang::solana_program::instruction::Instruction {
                program_id: ctx.program.key(),
                accounts,
                data,
            }
        };
        let mut acc_infos = ctx.to_account_infos();
        anchor_lang::solana_program::program::invoke_signed(&ix, &acc_infos, ctx.signer_seeds)
            .map_or_else(|e| Err(Into::into(e)), |_| Ok(()))
    }

    pub fn update_perp_market_max_slippage_ratio<'a, 'b, 'c, 'info>(
        ctx: CpiContext<'a, 'b, 'c, 'info, UpdatePerpMarketMaxSlippageRatio<'info>>,
        max_slippage_ratio: u16
    ) -> anchor_lang::Result<()> {
        let ix = {
            let ix = instructions::UpdatePerpMarketMaxSlippageRatio { max_slippage_ratio };
            let mut data = Vec::with_capacity(256);
            data.extend_from_slice(&instructions::UpdatePerpMarketMaxSlippageRatio::DISCRIMINATOR);
            AnchorSerialize::serialize(&ix, &mut data)
                .map_err(|_| anchor_lang::error::ErrorCode::InstructionDidNotSerialize)?;
            let accounts = ctx.to_account_metas(None);
            anchor_lang::solana_program::instruction::Instruction {
                program_id: ctx.program.key(),
                accounts,
                data,
            }
        };
        let mut acc_infos = ctx.to_account_infos();
        anchor_lang::solana_program::program::invoke_signed(&ix, &acc_infos, ctx.signer_seeds)
            .map_or_else(|e| Err(Into::into(e)), |_| Ok(()))
    }

    pub fn update_perp_market_max_fill_reserve_fraction<'a, 'b, 'c, 'info>(
        ctx: CpiContext<'a, 'b, 'c, 'info, UpdatePerpMarketMaxFillReserveFraction<'info>>,
        max_fill_reserve_fraction: u16
    ) -> anchor_lang::Result<()> {
        let ix = {
            let ix = instructions::UpdatePerpMarketMaxFillReserveFraction { max_fill_reserve_fraction };
            let mut data = Vec::with_capacity(256);
            data.extend_from_slice(&instructions::UpdatePerpMarketMaxFillReserveFraction::DISCRIMINATOR);
            AnchorSerialize::serialize(&ix, &mut data)
                .map_err(|_| anchor_lang::error::ErrorCode::InstructionDidNotSerialize)?;
            let accounts = ctx.to_account_metas(None);
            anchor_lang::solana_program::instruction::Instruction {
                program_id: ctx.program.key(),
                accounts,
                data,
            }
        };
        let mut acc_infos = ctx.to_account_infos();
        anchor_lang::solana_program::program::invoke_signed(&ix, &acc_infos, ctx.signer_seeds)
            .map_or_else(|e| Err(Into::into(e)), |_| Ok(()))
    }

    pub fn update_perp_market_max_open_interest<'a, 'b, 'c, 'info>(
        ctx: CpiContext<'a, 'b, 'c, 'info, UpdatePerpMarketMaxOpenInterest<'info>>,
        max_open_interest: u128
    ) -> anchor_lang::Result<()> {
        let ix = {
            let ix = instructions::UpdatePerpMarketMaxOpenInterest { max_open_interest };
            let mut data = Vec::with_capacity(256);
            data.extend_from_slice(&instructions::UpdatePerpMarketMaxOpenInterest::DISCRIMINATOR);
            AnchorSerialize::serialize(&ix, &mut data)
                .map_err(|_| anchor_lang::error::ErrorCode::InstructionDidNotSerialize)?;
            let accounts = ctx.to_account_metas(None);
            anchor_lang::solana_program::instruction::Instruction {
                program_id: ctx.program.key(),
                accounts,
                data,
            }
        };
        let mut acc_infos = ctx.to_account_infos();
        anchor_lang::solana_program::program::invoke_signed(&ix, &acc_infos, ctx.signer_seeds)
            .map_or_else(|e| Err(Into::into(e)), |_| Ok(()))
    }

    pub fn update_perp_market_number_of_users<'a, 'b, 'c, 'info>(
        ctx: CpiContext<'a, 'b, 'c, 'info, UpdatePerpMarketNumberOfUsers<'info>>,
        number_of_users: Option<u32>,
        number_of_users_with_base: Option<u32>
    ) -> anchor_lang::Result<()> {
        let ix = {
            let ix = instructions::UpdatePerpMarketNumberOfUsers { number_of_users, number_of_users_with_base };
            let mut data = Vec::with_capacity(256);
            data.extend_from_slice(&instructions::UpdatePerpMarketNumberOfUsers::DISCRIMINATOR);
            AnchorSerialize::serialize(&ix, &mut data)
                .map_err(|_| anchor_lang::error::ErrorCode::InstructionDidNotSerialize)?;
            let accounts = ctx.to_account_metas(None);
            anchor_lang::solana_program::instruction::Instruction {
                program_id: ctx.program.key(),
                accounts,
                data,
            }
        };
        let mut acc_infos = ctx.to_account_infos();
        anchor_lang::solana_program::program::invoke_signed(&ix, &acc_infos, ctx.signer_seeds)
            .map_or_else(|e| Err(Into::into(e)), |_| Ok(()))
    }

    pub fn update_perp_market_fee_adjustment<'a, 'b, 'c, 'info>(
        ctx: CpiContext<'a, 'b, 'c, 'info, UpdatePerpMarketFeeAdjustment<'info>>,
        fee_adjustment: i16
    ) -> anchor_lang::Result<()> {
        let ix = {
            let ix = instructions::UpdatePerpMarketFeeAdjustment { fee_adjustment };
            let mut data = Vec::with_capacity(256);
            data.extend_from_slice(&instructions::UpdatePerpMarketFeeAdjustment::DISCRIMINATOR);
            AnchorSerialize::serialize(&ix, &mut data)
                .map_err(|_| anchor_lang::error::ErrorCode::InstructionDidNotSerialize)?;
            let accounts = ctx.to_account_metas(None);
            anchor_lang::solana_program::instruction::Instruction {
                program_id: ctx.program.key(),
                accounts,
                data,
            }
        };
        let mut acc_infos = ctx.to_account_infos();
        anchor_lang::solana_program::program::invoke_signed(&ix, &acc_infos, ctx.signer_seeds)
            .map_or_else(|e| Err(Into::into(e)), |_| Ok(()))
    }

    pub fn update_spot_market_fee_adjustment<'a, 'b, 'c, 'info>(
        ctx: CpiContext<'a, 'b, 'c, 'info, UpdateSpotMarketFeeAdjustment<'info>>,
        fee_adjustment: i16
    ) -> anchor_lang::Result<()> {
        let ix = {
            let ix = instructions::UpdateSpotMarketFeeAdjustment { fee_adjustment };
            let mut data = Vec::with_capacity(256);
            data.extend_from_slice(&instructions::UpdateSpotMarketFeeAdjustment::DISCRIMINATOR);
            AnchorSerialize::serialize(&ix, &mut data)
                .map_err(|_| anchor_lang::error::ErrorCode::InstructionDidNotSerialize)?;
            let accounts = ctx.to_account_metas(None);
            anchor_lang::solana_program::instruction::Instruction {
                program_id: ctx.program.key(),
                accounts,
                data,
            }
        };
        let mut acc_infos = ctx.to_account_infos();
        anchor_lang::solana_program::program::invoke_signed(&ix, &acc_infos, ctx.signer_seeds)
            .map_or_else(|e| Err(Into::into(e)), |_| Ok(()))
    }

    pub fn update_perp_market_fuel<'a, 'b, 'c, 'info>(
        ctx: CpiContext<'a, 'b, 'c, 'info, UpdatePerpMarketFuel<'info>>,
        fuel_boost_taker: Option<u8>,
        fuel_boost_maker: Option<u8>,
        fuel_boost_position: Option<u8>
    ) -> anchor_lang::Result<()> {
        let ix = {
            let ix = instructions::UpdatePerpMarketFuel { fuel_boost_taker, fuel_boost_maker, fuel_boost_position };
            let mut data = Vec::with_capacity(256);
            data.extend_from_slice(&instructions::UpdatePerpMarketFuel::DISCRIMINATOR);
            AnchorSerialize::serialize(&ix, &mut data)
                .map_err(|_| anchor_lang::error::ErrorCode::InstructionDidNotSerialize)?;
            let accounts = ctx.to_account_metas(None);
            anchor_lang::solana_program::instruction::Instruction {
                program_id: ctx.program.key(),
                accounts,
                data,
            }
        };
        let mut acc_infos = ctx.to_account_infos();
        anchor_lang::solana_program::program::invoke_signed(&ix, &acc_infos, ctx.signer_seeds)
            .map_or_else(|e| Err(Into::into(e)), |_| Ok(()))
    }

    pub fn update_spot_market_fuel<'a, 'b, 'c, 'info>(
        ctx: CpiContext<'a, 'b, 'c, 'info, UpdateSpotMarketFuel<'info>>,
        fuel_boost_deposits: Option<u8>,
        fuel_boost_borrows: Option<u8>,
        fuel_boost_taker: Option<u8>,
        fuel_boost_maker: Option<u8>,
        fuel_boost_insurance: Option<u8>
    ) -> anchor_lang::Result<()> {
        let ix = {
            let ix = instructions::UpdateSpotMarketFuel { fuel_boost_deposits, fuel_boost_borrows, fuel_boost_taker, fuel_boost_maker, fuel_boost_insurance };
            let mut data = Vec::with_capacity(256);
            data.extend_from_slice(&instructions::UpdateSpotMarketFuel::DISCRIMINATOR);
            AnchorSerialize::serialize(&ix, &mut data)
                .map_err(|_| anchor_lang::error::ErrorCode::InstructionDidNotSerialize)?;
            let accounts = ctx.to_account_metas(None);
            anchor_lang::solana_program::instruction::Instruction {
                program_id: ctx.program.key(),
                accounts,
                data,
            }
        };
        let mut acc_infos = ctx.to_account_infos();
        anchor_lang::solana_program::program::invoke_signed(&ix, &acc_infos, ctx.signer_seeds)
            .map_or_else(|e| Err(Into::into(e)), |_| Ok(()))
    }

    pub fn init_user_fuel<'a, 'b, 'c, 'info>(
        ctx: CpiContext<'a, 'b, 'c, 'info, InitUserFuel<'info>>,
        fuel_boost_deposits: Option<u32>,
        fuel_boost_borrows: Option<u32>,
        fuel_boost_taker: Option<u32>,
        fuel_boost_maker: Option<u32>,
        fuel_boost_insurance: Option<u32>
    ) -> anchor_lang::Result<()> {
        let ix = {
            let ix = instructions::InitUserFuel { fuel_boost_deposits, fuel_boost_borrows, fuel_boost_taker, fuel_boost_maker, fuel_boost_insurance };
            let mut data = Vec::with_capacity(256);
            data.extend_from_slice(&instructions::InitUserFuel::DISCRIMINATOR);
            AnchorSerialize::serialize(&ix, &mut data)
                .map_err(|_| anchor_lang::error::ErrorCode::InstructionDidNotSerialize)?;
            let accounts = ctx.to_account_metas(None);
            anchor_lang::solana_program::instruction::Instruction {
                program_id: ctx.program.key(),
                accounts,
                data,
            }
        };
        let mut acc_infos = ctx.to_account_infos();
        anchor_lang::solana_program::program::invoke_signed(&ix, &acc_infos, ctx.signer_seeds)
            .map_or_else(|e| Err(Into::into(e)), |_| Ok(()))
    }

    pub fn update_admin<'a, 'b, 'c, 'info>(
        ctx: CpiContext<'a, 'b, 'c, 'info, UpdateAdmin<'info>>,
        admin: Pubkey
    ) -> anchor_lang::Result<()> {
        let ix = {
            let ix = instructions::UpdateAdmin { admin };
            let mut data = Vec::with_capacity(256);
            data.extend_from_slice(&instructions::UpdateAdmin::DISCRIMINATOR);
            AnchorSerialize::serialize(&ix, &mut data)
                .map_err(|_| anchor_lang::error::ErrorCode::InstructionDidNotSerialize)?;
            let accounts = ctx.to_account_metas(None);
            anchor_lang::solana_program::instruction::Instruction {
                program_id: ctx.program.key(),
                accounts,
                data,
            }
        };
        let mut acc_infos = ctx.to_account_infos();
        anchor_lang::solana_program::program::invoke_signed(&ix, &acc_infos, ctx.signer_seeds)
            .map_or_else(|e| Err(Into::into(e)), |_| Ok(()))
    }

    pub fn update_whitelist_mint<'a, 'b, 'c, 'info>(
        ctx: CpiContext<'a, 'b, 'c, 'info, UpdateWhitelistMint<'info>>,
        whitelist_mint: Pubkey
    ) -> anchor_lang::Result<()> {
        let ix = {
            let ix = instructions::UpdateWhitelistMint { whitelist_mint };
            let mut data = Vec::with_capacity(256);
            data.extend_from_slice(&instructions::UpdateWhitelistMint::DISCRIMINATOR);
            AnchorSerialize::serialize(&ix, &mut data)
                .map_err(|_| anchor_lang::error::ErrorCode::InstructionDidNotSerialize)?;
            let accounts = ctx.to_account_metas(None);
            anchor_lang::solana_program::instruction::Instruction {
                program_id: ctx.program.key(),
                accounts,
                data,
            }
        };
        let mut acc_infos = ctx.to_account_infos();
        anchor_lang::solana_program::program::invoke_signed(&ix, &acc_infos, ctx.signer_seeds)
            .map_or_else(|e| Err(Into::into(e)), |_| Ok(()))
    }

    pub fn update_discount_mint<'a, 'b, 'c, 'info>(
        ctx: CpiContext<'a, 'b, 'c, 'info, UpdateDiscountMint<'info>>,
        discount_mint: Pubkey
    ) -> anchor_lang::Result<()> {
        let ix = {
            let ix = instructions::UpdateDiscountMint { discount_mint };
            let mut data = Vec::with_capacity(256);
            data.extend_from_slice(&instructions::UpdateDiscountMint::DISCRIMINATOR);
            AnchorSerialize::serialize(&ix, &mut data)
                .map_err(|_| anchor_lang::error::ErrorCode::InstructionDidNotSerialize)?;
            let accounts = ctx.to_account_metas(None);
            anchor_lang::solana_program::instruction::Instruction {
                program_id: ctx.program.key(),
                accounts,
                data,
            }
        };
        let mut acc_infos = ctx.to_account_infos();
        anchor_lang::solana_program::program::invoke_signed(&ix, &acc_infos, ctx.signer_seeds)
            .map_or_else(|e| Err(Into::into(e)), |_| Ok(()))
    }

    pub fn update_exchange_status<'a, 'b, 'c, 'info>(
        ctx: CpiContext<'a, 'b, 'c, 'info, UpdateExchangeStatus<'info>>,
        exchange_status: u8
    ) -> anchor_lang::Result<()> {
        let ix = {
            let ix = instructions::UpdateExchangeStatus { exchange_status };
            let mut data = Vec::with_capacity(256);
            data.extend_from_slice(&instructions::UpdateExchangeStatus::DISCRIMINATOR);
            AnchorSerialize::serialize(&ix, &mut data)
                .map_err(|_| anchor_lang::error::ErrorCode::InstructionDidNotSerialize)?;
            let accounts = ctx.to_account_metas(None);
            anchor_lang::solana_program::instruction::Instruction {
                program_id: ctx.program.key(),
                accounts,
                data,
            }
        };
        let mut acc_infos = ctx.to_account_infos();
        anchor_lang::solana_program::program::invoke_signed(&ix, &acc_infos, ctx.signer_seeds)
            .map_or_else(|e| Err(Into::into(e)), |_| Ok(()))
    }

    pub fn update_perp_auction_duration<'a, 'b, 'c, 'info>(
        ctx: CpiContext<'a, 'b, 'c, 'info, UpdatePerpAuctionDuration<'info>>,
        min_perp_auction_duration: u8
    ) -> anchor_lang::Result<()> {
        let ix = {
            let ix = instructions::UpdatePerpAuctionDuration { min_perp_auction_duration };
            let mut data = Vec::with_capacity(256);
            data.extend_from_slice(&instructions::UpdatePerpAuctionDuration::DISCRIMINATOR);
            AnchorSerialize::serialize(&ix, &mut data)
                .map_err(|_| anchor_lang::error::ErrorCode::InstructionDidNotSerialize)?;
            let accounts = ctx.to_account_metas(None);
            anchor_lang::solana_program::instruction::Instruction {
                program_id: ctx.program.key(),
                accounts,
                data,
            }
        };
        let mut acc_infos = ctx.to_account_infos();
        anchor_lang::solana_program::program::invoke_signed(&ix, &acc_infos, ctx.signer_seeds)
            .map_or_else(|e| Err(Into::into(e)), |_| Ok(()))
    }

    pub fn update_spot_auction_duration<'a, 'b, 'c, 'info>(
        ctx: CpiContext<'a, 'b, 'c, 'info, UpdateSpotAuctionDuration<'info>>,
        default_spot_auction_duration: u8
    ) -> anchor_lang::Result<()> {
        let ix = {
            let ix = instructions::UpdateSpotAuctionDuration { default_spot_auction_duration };
            let mut data = Vec::with_capacity(256);
            data.extend_from_slice(&instructions::UpdateSpotAuctionDuration::DISCRIMINATOR);
            AnchorSerialize::serialize(&ix, &mut data)
                .map_err(|_| anchor_lang::error::ErrorCode::InstructionDidNotSerialize)?;
            let accounts = ctx.to_account_metas(None);
            anchor_lang::solana_program::instruction::Instruction {
                program_id: ctx.program.key(),
                accounts,
                data,
            }
        };
        let mut acc_infos = ctx.to_account_infos();
        anchor_lang::solana_program::program::invoke_signed(&ix, &acc_infos, ctx.signer_seeds)
            .map_or_else(|e| Err(Into::into(e)), |_| Ok(()))
    }

    pub fn initialize_protocol_if_shares_transfer_config<'a, 'b, 'c, 'info>(
        ctx: CpiContext<'a, 'b, 'c, 'info, InitializeProtocolIfSharesTransferConfig<'info>>
    ) -> anchor_lang::Result<()> {
        let ix = {
            let ix = instructions::InitializeProtocolIfSharesTransferConfig {  };
            let mut data = Vec::with_capacity(256);
            data.extend_from_slice(&instructions::InitializeProtocolIfSharesTransferConfig::DISCRIMINATOR);
            AnchorSerialize::serialize(&ix, &mut data)
                .map_err(|_| anchor_lang::error::ErrorCode::InstructionDidNotSerialize)?;
            let accounts = ctx.to_account_metas(None);
            anchor_lang::solana_program::instruction::Instruction {
                program_id: ctx.program.key(),
                accounts,
                data,
            }
        };
        let mut acc_infos = ctx.to_account_infos();
        anchor_lang::solana_program::program::invoke_signed(&ix, &acc_infos, ctx.signer_seeds)
            .map_or_else(|e| Err(Into::into(e)), |_| Ok(()))
    }

    pub fn update_protocol_if_shares_transfer_config<'a, 'b, 'c, 'info>(
        ctx: CpiContext<'a, 'b, 'c, 'info, UpdateProtocolIfSharesTransferConfig<'info>>,
        whitelisted_signers: Option<[Pubkey;4]>,
        max_transfer_per_epoch: Option<u128>
    ) -> anchor_lang::Result<()> {
        let ix = {
            let ix = instructions::UpdateProtocolIfSharesTransferConfig { whitelisted_signers, max_transfer_per_epoch };
            let mut data = Vec::with_capacity(256);
            data.extend_from_slice(&instructions::UpdateProtocolIfSharesTransferConfig::DISCRIMINATOR);
            AnchorSerialize::serialize(&ix, &mut data)
                .map_err(|_| anchor_lang::error::ErrorCode::InstructionDidNotSerialize)?;
            let accounts = ctx.to_account_metas(None);
            anchor_lang::solana_program::instruction::Instruction {
                program_id: ctx.program.key(),
                accounts,
                data,
            }
        };
        let mut acc_infos = ctx.to_account_infos();
        anchor_lang::solana_program::program::invoke_signed(&ix, &acc_infos, ctx.signer_seeds)
            .map_or_else(|e| Err(Into::into(e)), |_| Ok(()))
    }

    pub fn initialize_prelaunch_oracle<'a, 'b, 'c, 'info>(
        ctx: CpiContext<'a, 'b, 'c, 'info, InitializePrelaunchOracle<'info>>,
        params: PrelaunchOracleParams
    ) -> anchor_lang::Result<()> {
        let ix = {
            let ix = instructions::InitializePrelaunchOracle { params };
            let mut data = Vec::with_capacity(256);
            data.extend_from_slice(&instructions::InitializePrelaunchOracle::DISCRIMINATOR);
            AnchorSerialize::serialize(&ix, &mut data)
                .map_err(|_| anchor_lang::error::ErrorCode::InstructionDidNotSerialize)?;
            let accounts = ctx.to_account_metas(None);
            anchor_lang::solana_program::instruction::Instruction {
                program_id: ctx.program.key(),
                accounts,
                data,
            }
        };
        let mut acc_infos = ctx.to_account_infos();
        anchor_lang::solana_program::program::invoke_signed(&ix, &acc_infos, ctx.signer_seeds)
            .map_or_else(|e| Err(Into::into(e)), |_| Ok(()))
    }

    pub fn update_prelaunch_oracle_params<'a, 'b, 'c, 'info>(
        ctx: CpiContext<'a, 'b, 'c, 'info, UpdatePrelaunchOracleParams<'info>>,
        params: PrelaunchOracleParams
    ) -> anchor_lang::Result<()> {
        let ix = {
            let ix = instructions::UpdatePrelaunchOracleParams { params };
            let mut data = Vec::with_capacity(256);
            data.extend_from_slice(&instructions::UpdatePrelaunchOracleParams::DISCRIMINATOR);
            AnchorSerialize::serialize(&ix, &mut data)
                .map_err(|_| anchor_lang::error::ErrorCode::InstructionDidNotSerialize)?;
            let accounts = ctx.to_account_metas(None);
            anchor_lang::solana_program::instruction::Instruction {
                program_id: ctx.program.key(),
                accounts,
                data,
            }
        };
        let mut acc_infos = ctx.to_account_infos();
        anchor_lang::solana_program::program::invoke_signed(&ix, &acc_infos, ctx.signer_seeds)
            .map_or_else(|e| Err(Into::into(e)), |_| Ok(()))
    }

    pub fn delete_prelaunch_oracle<'a, 'b, 'c, 'info>(
        ctx: CpiContext<'a, 'b, 'c, 'info, DeletePrelaunchOracle<'info>>,
        perp_market_index: u16
    ) -> anchor_lang::Result<()> {
        let ix = {
            let ix = instructions::DeletePrelaunchOracle { perp_market_index };
            let mut data = Vec::with_capacity(256);
            data.extend_from_slice(&instructions::DeletePrelaunchOracle::DISCRIMINATOR);
            AnchorSerialize::serialize(&ix, &mut data)
                .map_err(|_| anchor_lang::error::ErrorCode::InstructionDidNotSerialize)?;
            let accounts = ctx.to_account_metas(None);
            anchor_lang::solana_program::instruction::Instruction {
                program_id: ctx.program.key(),
                accounts,
                data,
            }
        };
        let mut acc_infos = ctx.to_account_infos();
        anchor_lang::solana_program::program::invoke_signed(&ix, &acc_infos, ctx.signer_seeds)
            .map_or_else(|e| Err(Into::into(e)), |_| Ok(()))
    }

    pub fn initialize_pyth_pull_oracle<'a, 'b, 'c, 'info>(
        ctx: CpiContext<'a, 'b, 'c, 'info, InitializePythPullOracle<'info>>,
        feed_id: [u8;32]
    ) -> anchor_lang::Result<()> {
        let ix = {
            let ix = instructions::InitializePythPullOracle { feed_id };
            let mut data = Vec::with_capacity(256);
            data.extend_from_slice(&instructions::InitializePythPullOracle::DISCRIMINATOR);
            AnchorSerialize::serialize(&ix, &mut data)
                .map_err(|_| anchor_lang::error::ErrorCode::InstructionDidNotSerialize)?;
            let accounts = ctx.to_account_metas(None);
            anchor_lang::solana_program::instruction::Instruction {
                program_id: ctx.program.key(),
                accounts,
                data,
            }
        };
        let mut acc_infos = ctx.to_account_infos();
        anchor_lang::solana_program::program::invoke_signed(&ix, &acc_infos, ctx.signer_seeds)
            .map_or_else(|e| Err(Into::into(e)), |_| Ok(()))
    }  
}

// RPC
#[cfg(all(not(target_os = "solana"), feature="cpi"))]
pub mod rpc {
    #![allow(unused)]
    use anchor_lang::prelude::*;
    #[cfg_attr(not(target_os="solana"), derive(Debug))]
    #[derive(AnchorSerialize)]
    pub struct InitializeUser {
            pub user: Pubkey,
            pub user_stats: Pubkey,
            pub state: Pubkey,
            pub authority: Pubkey,
            pub payer: Pubkey,
            pub rent: Pubkey,
            pub system_program: Pubkey,
    }
    
        impl anchor_lang::ToAccountMetas for InitializeUser {
            fn to_account_metas(
                &self,
                is_signer: Option<bool>,
            ) -> Vec<anchor_lang::solana_program::instruction::AccountMeta> {
                let mut account_metas = vec![];
                account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.user,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.user_stats,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.state,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.authority,
                true,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.payer,
                true,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.rent,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.system_program,
                false,
            ));
                account_metas
            }
        }
    
    #[cfg_attr(not(target_os="solana"), derive(Debug))]
    #[derive(AnchorSerialize)]
    pub struct InitializeUserStats {
            pub user_stats: Pubkey,
            pub state: Pubkey,
            pub authority: Pubkey,
            pub payer: Pubkey,
            pub rent: Pubkey,
            pub system_program: Pubkey,
    }
    
        impl anchor_lang::ToAccountMetas for InitializeUserStats {
            fn to_account_metas(
                &self,
                is_signer: Option<bool>,
            ) -> Vec<anchor_lang::solana_program::instruction::AccountMeta> {
                let mut account_metas = vec![];
                account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.user_stats,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.state,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.authority,
                true,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.payer,
                true,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.rent,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.system_program,
                false,
            ));
                account_metas
            }
        }
    
    #[cfg_attr(not(target_os="solana"), derive(Debug))]
    #[derive(AnchorSerialize)]
    pub struct InitializeReferrerName {
            pub referrer_name: Pubkey,
            pub user: Pubkey,
            pub user_stats: Pubkey,
            pub authority: Pubkey,
            pub payer: Pubkey,
            pub rent: Pubkey,
            pub system_program: Pubkey,
    }
    
        impl anchor_lang::ToAccountMetas for InitializeReferrerName {
            fn to_account_metas(
                &self,
                is_signer: Option<bool>,
            ) -> Vec<anchor_lang::solana_program::instruction::AccountMeta> {
                let mut account_metas = vec![];
                account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.referrer_name,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.user,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.user_stats,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.authority,
                true,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.payer,
                true,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.rent,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.system_program,
                false,
            ));
                account_metas
            }
        }
    
    #[cfg_attr(not(target_os="solana"), derive(Debug))]
    #[derive(AnchorSerialize)]
    pub struct Deposit {
            pub state: Pubkey,
            pub user: Pubkey,
            pub user_stats: Pubkey,
            pub authority: Pubkey,
            pub spot_market_vault: Pubkey,
            pub user_token_account: Pubkey,
            pub token_program: Pubkey,
    }
    
        impl anchor_lang::ToAccountMetas for Deposit {
            fn to_account_metas(
                &self,
                is_signer: Option<bool>,
            ) -> Vec<anchor_lang::solana_program::instruction::AccountMeta> {
                let mut account_metas = vec![];
                account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.state,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.user,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.user_stats,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.authority,
                true,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.spot_market_vault,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.user_token_account,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.token_program,
                false,
            ));
                account_metas
            }
        }
    
    #[cfg_attr(not(target_os="solana"), derive(Debug))]
    #[derive(AnchorSerialize)]
    pub struct Withdraw {
            pub state: Pubkey,
            pub user: Pubkey,
            pub user_stats: Pubkey,
            pub authority: Pubkey,
            pub spot_market_vault: Pubkey,
            pub drift_signer: Pubkey,
            pub user_token_account: Pubkey,
            pub token_program: Pubkey,
    }
    
        impl anchor_lang::ToAccountMetas for Withdraw {
            fn to_account_metas(
                &self,
                is_signer: Option<bool>,
            ) -> Vec<anchor_lang::solana_program::instruction::AccountMeta> {
                let mut account_metas = vec![];
                account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.state,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.user,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.user_stats,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.authority,
                true,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.spot_market_vault,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.drift_signer,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.user_token_account,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.token_program,
                false,
            ));
                account_metas
            }
        }
    
    #[cfg_attr(not(target_os="solana"), derive(Debug))]
    #[derive(AnchorSerialize)]
    pub struct TransferDeposit {
            pub from_user: Pubkey,
            pub to_user: Pubkey,
            pub user_stats: Pubkey,
            pub authority: Pubkey,
            pub state: Pubkey,
            pub spot_market_vault: Pubkey,
    }
    
        impl anchor_lang::ToAccountMetas for TransferDeposit {
            fn to_account_metas(
                &self,
                is_signer: Option<bool>,
            ) -> Vec<anchor_lang::solana_program::instruction::AccountMeta> {
                let mut account_metas = vec![];
                account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.from_user,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.to_user,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.user_stats,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.authority,
                true,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.state,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.spot_market_vault,
                false,
            ));
                account_metas
            }
        }
    
    #[cfg_attr(not(target_os="solana"), derive(Debug))]
    #[derive(AnchorSerialize)]
    pub struct PlacePerpOrder {
            pub state: Pubkey,
            pub user: Pubkey,
            pub authority: Pubkey,
    }
    
        impl anchor_lang::ToAccountMetas for PlacePerpOrder {
            fn to_account_metas(
                &self,
                is_signer: Option<bool>,
            ) -> Vec<anchor_lang::solana_program::instruction::AccountMeta> {
                let mut account_metas = vec![];
                account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.state,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.user,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.authority,
                true,
            ));
                account_metas
            }
        }
    
    #[cfg_attr(not(target_os="solana"), derive(Debug))]
    #[derive(AnchorSerialize)]
    pub struct CancelOrder {
            pub state: Pubkey,
            pub user: Pubkey,
            pub authority: Pubkey,
    }
    
        impl anchor_lang::ToAccountMetas for CancelOrder {
            fn to_account_metas(
                &self,
                is_signer: Option<bool>,
            ) -> Vec<anchor_lang::solana_program::instruction::AccountMeta> {
                let mut account_metas = vec![];
                account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.state,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.user,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.authority,
                true,
            ));
                account_metas
            }
        }
    
    #[cfg_attr(not(target_os="solana"), derive(Debug))]
    #[derive(AnchorSerialize)]
    pub struct CancelOrderByUserId {
            pub state: Pubkey,
            pub user: Pubkey,
            pub authority: Pubkey,
    }
    
        impl anchor_lang::ToAccountMetas for CancelOrderByUserId {
            fn to_account_metas(
                &self,
                is_signer: Option<bool>,
            ) -> Vec<anchor_lang::solana_program::instruction::AccountMeta> {
                let mut account_metas = vec![];
                account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.state,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.user,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.authority,
                true,
            ));
                account_metas
            }
        }
    
    #[cfg_attr(not(target_os="solana"), derive(Debug))]
    #[derive(AnchorSerialize)]
    pub struct CancelOrders {
            pub state: Pubkey,
            pub user: Pubkey,
            pub authority: Pubkey,
    }
    
        impl anchor_lang::ToAccountMetas for CancelOrders {
            fn to_account_metas(
                &self,
                is_signer: Option<bool>,
            ) -> Vec<anchor_lang::solana_program::instruction::AccountMeta> {
                let mut account_metas = vec![];
                account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.state,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.user,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.authority,
                true,
            ));
                account_metas
            }
        }
    
    #[cfg_attr(not(target_os="solana"), derive(Debug))]
    #[derive(AnchorSerialize)]
    pub struct CancelOrdersByIds {
            pub state: Pubkey,
            pub user: Pubkey,
            pub authority: Pubkey,
    }
    
        impl anchor_lang::ToAccountMetas for CancelOrdersByIds {
            fn to_account_metas(
                &self,
                is_signer: Option<bool>,
            ) -> Vec<anchor_lang::solana_program::instruction::AccountMeta> {
                let mut account_metas = vec![];
                account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.state,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.user,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.authority,
                true,
            ));
                account_metas
            }
        }
    
    #[cfg_attr(not(target_os="solana"), derive(Debug))]
    #[derive(AnchorSerialize)]
    pub struct ModifyOrder {
            pub state: Pubkey,
            pub user: Pubkey,
            pub authority: Pubkey,
    }
    
        impl anchor_lang::ToAccountMetas for ModifyOrder {
            fn to_account_metas(
                &self,
                is_signer: Option<bool>,
            ) -> Vec<anchor_lang::solana_program::instruction::AccountMeta> {
                let mut account_metas = vec![];
                account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.state,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.user,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.authority,
                true,
            ));
                account_metas
            }
        }
    
    #[cfg_attr(not(target_os="solana"), derive(Debug))]
    #[derive(AnchorSerialize)]
    pub struct ModifyOrderByUserId {
            pub state: Pubkey,
            pub user: Pubkey,
            pub authority: Pubkey,
    }
    
        impl anchor_lang::ToAccountMetas for ModifyOrderByUserId {
            fn to_account_metas(
                &self,
                is_signer: Option<bool>,
            ) -> Vec<anchor_lang::solana_program::instruction::AccountMeta> {
                let mut account_metas = vec![];
                account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.state,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.user,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.authority,
                true,
            ));
                account_metas
            }
        }
    
    #[cfg_attr(not(target_os="solana"), derive(Debug))]
    #[derive(AnchorSerialize)]
    pub struct PlaceAndTakePerpOrder {
            pub state: Pubkey,
            pub user: Pubkey,
            pub user_stats: Pubkey,
            pub authority: Pubkey,
    }
    
        impl anchor_lang::ToAccountMetas for PlaceAndTakePerpOrder {
            fn to_account_metas(
                &self,
                is_signer: Option<bool>,
            ) -> Vec<anchor_lang::solana_program::instruction::AccountMeta> {
                let mut account_metas = vec![];
                account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.state,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.user,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.user_stats,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.authority,
                true,
            ));
                account_metas
            }
        }
    
    #[cfg_attr(not(target_os="solana"), derive(Debug))]
    #[derive(AnchorSerialize)]
    pub struct PlaceAndMakePerpOrder {
            pub state: Pubkey,
            pub user: Pubkey,
            pub user_stats: Pubkey,
            pub taker: Pubkey,
            pub taker_stats: Pubkey,
            pub authority: Pubkey,
    }
    
        impl anchor_lang::ToAccountMetas for PlaceAndMakePerpOrder {
            fn to_account_metas(
                &self,
                is_signer: Option<bool>,
            ) -> Vec<anchor_lang::solana_program::instruction::AccountMeta> {
                let mut account_metas = vec![];
                account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.state,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.user,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.user_stats,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.taker,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.taker_stats,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.authority,
                true,
            ));
                account_metas
            }
        }
    
    #[cfg_attr(not(target_os="solana"), derive(Debug))]
    #[derive(AnchorSerialize)]
    pub struct PlaceSpotOrder {
            pub state: Pubkey,
            pub user: Pubkey,
            pub authority: Pubkey,
    }
    
        impl anchor_lang::ToAccountMetas for PlaceSpotOrder {
            fn to_account_metas(
                &self,
                is_signer: Option<bool>,
            ) -> Vec<anchor_lang::solana_program::instruction::AccountMeta> {
                let mut account_metas = vec![];
                account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.state,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.user,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.authority,
                true,
            ));
                account_metas
            }
        }
    
    #[cfg_attr(not(target_os="solana"), derive(Debug))]
    #[derive(AnchorSerialize)]
    pub struct PlaceAndTakeSpotOrder {
            pub state: Pubkey,
            pub user: Pubkey,
            pub user_stats: Pubkey,
            pub authority: Pubkey,
    }
    
        impl anchor_lang::ToAccountMetas for PlaceAndTakeSpotOrder {
            fn to_account_metas(
                &self,
                is_signer: Option<bool>,
            ) -> Vec<anchor_lang::solana_program::instruction::AccountMeta> {
                let mut account_metas = vec![];
                account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.state,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.user,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.user_stats,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.authority,
                true,
            ));
                account_metas
            }
        }
    
    #[cfg_attr(not(target_os="solana"), derive(Debug))]
    #[derive(AnchorSerialize)]
    pub struct PlaceAndMakeSpotOrder {
            pub state: Pubkey,
            pub user: Pubkey,
            pub user_stats: Pubkey,
            pub taker: Pubkey,
            pub taker_stats: Pubkey,
            pub authority: Pubkey,
    }
    
        impl anchor_lang::ToAccountMetas for PlaceAndMakeSpotOrder {
            fn to_account_metas(
                &self,
                is_signer: Option<bool>,
            ) -> Vec<anchor_lang::solana_program::instruction::AccountMeta> {
                let mut account_metas = vec![];
                account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.state,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.user,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.user_stats,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.taker,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.taker_stats,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.authority,
                true,
            ));
                account_metas
            }
        }
    
    #[cfg_attr(not(target_os="solana"), derive(Debug))]
    #[derive(AnchorSerialize)]
    pub struct PlaceOrders {
            pub state: Pubkey,
            pub user: Pubkey,
            pub authority: Pubkey,
    }
    
        impl anchor_lang::ToAccountMetas for PlaceOrders {
            fn to_account_metas(
                &self,
                is_signer: Option<bool>,
            ) -> Vec<anchor_lang::solana_program::instruction::AccountMeta> {
                let mut account_metas = vec![];
                account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.state,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.user,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.authority,
                true,
            ));
                account_metas
            }
        }
    
    #[cfg_attr(not(target_os="solana"), derive(Debug))]
    #[derive(AnchorSerialize)]
    pub struct BeginSwap {
            pub state: Pubkey,
            pub user: Pubkey,
            pub user_stats: Pubkey,
            pub authority: Pubkey,
            pub out_spot_market_vault: Pubkey,
            pub in_spot_market_vault: Pubkey,
            pub out_token_account: Pubkey,
            pub in_token_account: Pubkey,
            pub token_program: Pubkey,
            pub drift_signer: Pubkey,
            pub instructions: Pubkey,
    }
    
        impl anchor_lang::ToAccountMetas for BeginSwap {
            fn to_account_metas(
                &self,
                is_signer: Option<bool>,
            ) -> Vec<anchor_lang::solana_program::instruction::AccountMeta> {
                let mut account_metas = vec![];
                account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.state,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.user,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.user_stats,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.authority,
                true,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.out_spot_market_vault,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.in_spot_market_vault,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.out_token_account,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.in_token_account,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.token_program,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.drift_signer,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.instructions,
                false,
            ));
                account_metas
            }
        }
    
    #[cfg_attr(not(target_os="solana"), derive(Debug))]
    #[derive(AnchorSerialize)]
    pub struct EndSwap {
            pub state: Pubkey,
            pub user: Pubkey,
            pub user_stats: Pubkey,
            pub authority: Pubkey,
            pub out_spot_market_vault: Pubkey,
            pub in_spot_market_vault: Pubkey,
            pub out_token_account: Pubkey,
            pub in_token_account: Pubkey,
            pub token_program: Pubkey,
            pub drift_signer: Pubkey,
            pub instructions: Pubkey,
    }
    
        impl anchor_lang::ToAccountMetas for EndSwap {
            fn to_account_metas(
                &self,
                is_signer: Option<bool>,
            ) -> Vec<anchor_lang::solana_program::instruction::AccountMeta> {
                let mut account_metas = vec![];
                account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.state,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.user,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.user_stats,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.authority,
                true,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.out_spot_market_vault,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.in_spot_market_vault,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.out_token_account,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.in_token_account,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.token_program,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.drift_signer,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.instructions,
                false,
            ));
                account_metas
            }
        }
    
    #[cfg_attr(not(target_os="solana"), derive(Debug))]
    #[derive(AnchorSerialize)]
    pub struct AddPerpLpShares {
            pub state: Pubkey,
            pub user: Pubkey,
            pub authority: Pubkey,
    }
    
        impl anchor_lang::ToAccountMetas for AddPerpLpShares {
            fn to_account_metas(
                &self,
                is_signer: Option<bool>,
            ) -> Vec<anchor_lang::solana_program::instruction::AccountMeta> {
                let mut account_metas = vec![];
                account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.state,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.user,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.authority,
                true,
            ));
                account_metas
            }
        }
    
    #[cfg_attr(not(target_os="solana"), derive(Debug))]
    #[derive(AnchorSerialize)]
    pub struct RemovePerpLpShares {
            pub state: Pubkey,
            pub user: Pubkey,
            pub authority: Pubkey,
    }
    
        impl anchor_lang::ToAccountMetas for RemovePerpLpShares {
            fn to_account_metas(
                &self,
                is_signer: Option<bool>,
            ) -> Vec<anchor_lang::solana_program::instruction::AccountMeta> {
                let mut account_metas = vec![];
                account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.state,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.user,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.authority,
                true,
            ));
                account_metas
            }
        }
    
    #[cfg_attr(not(target_os="solana"), derive(Debug))]
    #[derive(AnchorSerialize)]
    pub struct RemovePerpLpSharesInExpiringMarket {
            pub state: Pubkey,
            pub user: Pubkey,
    }
    
        impl anchor_lang::ToAccountMetas for RemovePerpLpSharesInExpiringMarket {
            fn to_account_metas(
                &self,
                is_signer: Option<bool>,
            ) -> Vec<anchor_lang::solana_program::instruction::AccountMeta> {
                let mut account_metas = vec![];
                account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.state,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.user,
                false,
            ));
                account_metas
            }
        }
    
    #[cfg_attr(not(target_os="solana"), derive(Debug))]
    #[derive(AnchorSerialize)]
    pub struct UpdateUserName {
            pub user: Pubkey,
            pub authority: Pubkey,
    }
    
        impl anchor_lang::ToAccountMetas for UpdateUserName {
            fn to_account_metas(
                &self,
                is_signer: Option<bool>,
            ) -> Vec<anchor_lang::solana_program::instruction::AccountMeta> {
                let mut account_metas = vec![];
                account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.user,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.authority,
                true,
            ));
                account_metas
            }
        }
    
    #[cfg_attr(not(target_os="solana"), derive(Debug))]
    #[derive(AnchorSerialize)]
    pub struct UpdateUserCustomMarginRatio {
            pub user: Pubkey,
            pub authority: Pubkey,
    }
    
        impl anchor_lang::ToAccountMetas for UpdateUserCustomMarginRatio {
            fn to_account_metas(
                &self,
                is_signer: Option<bool>,
            ) -> Vec<anchor_lang::solana_program::instruction::AccountMeta> {
                let mut account_metas = vec![];
                account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.user,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.authority,
                true,
            ));
                account_metas
            }
        }
    
    #[cfg_attr(not(target_os="solana"), derive(Debug))]
    #[derive(AnchorSerialize)]
    pub struct UpdateUserMarginTradingEnabled {
            pub user: Pubkey,
            pub authority: Pubkey,
    }
    
        impl anchor_lang::ToAccountMetas for UpdateUserMarginTradingEnabled {
            fn to_account_metas(
                &self,
                is_signer: Option<bool>,
            ) -> Vec<anchor_lang::solana_program::instruction::AccountMeta> {
                let mut account_metas = vec![];
                account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.user,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.authority,
                true,
            ));
                account_metas
            }
        }
    
    #[cfg_attr(not(target_os="solana"), derive(Debug))]
    #[derive(AnchorSerialize)]
    pub struct UpdateUserDelegate {
            pub user: Pubkey,
            pub authority: Pubkey,
    }
    
        impl anchor_lang::ToAccountMetas for UpdateUserDelegate {
            fn to_account_metas(
                &self,
                is_signer: Option<bool>,
            ) -> Vec<anchor_lang::solana_program::instruction::AccountMeta> {
                let mut account_metas = vec![];
                account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.user,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.authority,
                true,
            ));
                account_metas
            }
        }
    
    #[cfg_attr(not(target_os="solana"), derive(Debug))]
    #[derive(AnchorSerialize)]
    pub struct UpdateUserReduceOnly {
            pub user: Pubkey,
            pub authority: Pubkey,
    }
    
        impl anchor_lang::ToAccountMetas for UpdateUserReduceOnly {
            fn to_account_metas(
                &self,
                is_signer: Option<bool>,
            ) -> Vec<anchor_lang::solana_program::instruction::AccountMeta> {
                let mut account_metas = vec![];
                account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.user,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.authority,
                true,
            ));
                account_metas
            }
        }
    
    #[cfg_attr(not(target_os="solana"), derive(Debug))]
    #[derive(AnchorSerialize)]
    pub struct UpdateUserAdvancedLp {
            pub user: Pubkey,
            pub authority: Pubkey,
    }
    
        impl anchor_lang::ToAccountMetas for UpdateUserAdvancedLp {
            fn to_account_metas(
                &self,
                is_signer: Option<bool>,
            ) -> Vec<anchor_lang::solana_program::instruction::AccountMeta> {
                let mut account_metas = vec![];
                account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.user,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.authority,
                true,
            ));
                account_metas
            }
        }
    
    #[cfg_attr(not(target_os="solana"), derive(Debug))]
    #[derive(AnchorSerialize)]
    pub struct DeleteUser {
            pub user: Pubkey,
            pub user_stats: Pubkey,
            pub state: Pubkey,
            pub authority: Pubkey,
    }
    
        impl anchor_lang::ToAccountMetas for DeleteUser {
            fn to_account_metas(
                &self,
                is_signer: Option<bool>,
            ) -> Vec<anchor_lang::solana_program::instruction::AccountMeta> {
                let mut account_metas = vec![];
                account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.user,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.user_stats,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.state,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.authority,
                true,
            ));
                account_metas
            }
        }
    
    #[cfg_attr(not(target_os="solana"), derive(Debug))]
    #[derive(AnchorSerialize)]
    pub struct ReclaimRent {
            pub user: Pubkey,
            pub user_stats: Pubkey,
            pub state: Pubkey,
            pub authority: Pubkey,
            pub rent: Pubkey,
    }
    
        impl anchor_lang::ToAccountMetas for ReclaimRent {
            fn to_account_metas(
                &self,
                is_signer: Option<bool>,
            ) -> Vec<anchor_lang::solana_program::instruction::AccountMeta> {
                let mut account_metas = vec![];
                account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.user,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.user_stats,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.state,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.authority,
                true,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.rent,
                false,
            ));
                account_metas
            }
        }
    
    #[cfg_attr(not(target_os="solana"), derive(Debug))]
    #[derive(AnchorSerialize)]
    pub struct FillPerpOrder {
            pub state: Pubkey,
            pub authority: Pubkey,
            pub filler: Pubkey,
            pub filler_stats: Pubkey,
            pub user: Pubkey,
            pub user_stats: Pubkey,
    }
    
        impl anchor_lang::ToAccountMetas for FillPerpOrder {
            fn to_account_metas(
                &self,
                is_signer: Option<bool>,
            ) -> Vec<anchor_lang::solana_program::instruction::AccountMeta> {
                let mut account_metas = vec![];
                account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.state,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.authority,
                true,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.filler,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.filler_stats,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.user,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.user_stats,
                false,
            ));
                account_metas
            }
        }
    
    #[cfg_attr(not(target_os="solana"), derive(Debug))]
    #[derive(AnchorSerialize)]
    pub struct RevertFill {
            pub state: Pubkey,
            pub authority: Pubkey,
            pub filler: Pubkey,
            pub filler_stats: Pubkey,
    }
    
        impl anchor_lang::ToAccountMetas for RevertFill {
            fn to_account_metas(
                &self,
                is_signer: Option<bool>,
            ) -> Vec<anchor_lang::solana_program::instruction::AccountMeta> {
                let mut account_metas = vec![];
                account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.state,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.authority,
                true,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.filler,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.filler_stats,
                false,
            ));
                account_metas
            }
        }
    
    #[cfg_attr(not(target_os="solana"), derive(Debug))]
    #[derive(AnchorSerialize)]
    pub struct FillSpotOrder {
            pub state: Pubkey,
            pub authority: Pubkey,
            pub filler: Pubkey,
            pub filler_stats: Pubkey,
            pub user: Pubkey,
            pub user_stats: Pubkey,
    }
    
        impl anchor_lang::ToAccountMetas for FillSpotOrder {
            fn to_account_metas(
                &self,
                is_signer: Option<bool>,
            ) -> Vec<anchor_lang::solana_program::instruction::AccountMeta> {
                let mut account_metas = vec![];
                account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.state,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.authority,
                true,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.filler,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.filler_stats,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.user,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.user_stats,
                false,
            ));
                account_metas
            }
        }
    
    #[cfg_attr(not(target_os="solana"), derive(Debug))]
    #[derive(AnchorSerialize)]
    pub struct TriggerOrder {
            pub state: Pubkey,
            pub authority: Pubkey,
            pub filler: Pubkey,
            pub user: Pubkey,
    }
    
        impl anchor_lang::ToAccountMetas for TriggerOrder {
            fn to_account_metas(
                &self,
                is_signer: Option<bool>,
            ) -> Vec<anchor_lang::solana_program::instruction::AccountMeta> {
                let mut account_metas = vec![];
                account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.state,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.authority,
                true,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.filler,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.user,
                false,
            ));
                account_metas
            }
        }
    
    #[cfg_attr(not(target_os="solana"), derive(Debug))]
    #[derive(AnchorSerialize)]
    pub struct ForceCancelOrders {
            pub state: Pubkey,
            pub authority: Pubkey,
            pub filler: Pubkey,
            pub user: Pubkey,
    }
    
        impl anchor_lang::ToAccountMetas for ForceCancelOrders {
            fn to_account_metas(
                &self,
                is_signer: Option<bool>,
            ) -> Vec<anchor_lang::solana_program::instruction::AccountMeta> {
                let mut account_metas = vec![];
                account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.state,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.authority,
                true,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.filler,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.user,
                false,
            ));
                account_metas
            }
        }
    
    #[cfg_attr(not(target_os="solana"), derive(Debug))]
    #[derive(AnchorSerialize)]
    pub struct UpdateUserIdle {
            pub state: Pubkey,
            pub authority: Pubkey,
            pub filler: Pubkey,
            pub user: Pubkey,
    }
    
        impl anchor_lang::ToAccountMetas for UpdateUserIdle {
            fn to_account_metas(
                &self,
                is_signer: Option<bool>,
            ) -> Vec<anchor_lang::solana_program::instruction::AccountMeta> {
                let mut account_metas = vec![];
                account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.state,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.authority,
                true,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.filler,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.user,
                false,
            ));
                account_metas
            }
        }
    
    #[cfg_attr(not(target_os="solana"), derive(Debug))]
    #[derive(AnchorSerialize)]
    pub struct UpdateUserOpenOrdersCount {
            pub state: Pubkey,
            pub authority: Pubkey,
            pub filler: Pubkey,
            pub user: Pubkey,
    }
    
        impl anchor_lang::ToAccountMetas for UpdateUserOpenOrdersCount {
            fn to_account_metas(
                &self,
                is_signer: Option<bool>,
            ) -> Vec<anchor_lang::solana_program::instruction::AccountMeta> {
                let mut account_metas = vec![];
                account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.state,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.authority,
                true,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.filler,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.user,
                false,
            ));
                account_metas
            }
        }
    
    #[cfg_attr(not(target_os="solana"), derive(Debug))]
    #[derive(AnchorSerialize)]
    pub struct AdminDisableUpdatePerpBidAskTwap {
            pub admin: Pubkey,
            pub state: Pubkey,
            pub user_stats: Pubkey,
    }
    
        impl anchor_lang::ToAccountMetas for AdminDisableUpdatePerpBidAskTwap {
            fn to_account_metas(
                &self,
                is_signer: Option<bool>,
            ) -> Vec<anchor_lang::solana_program::instruction::AccountMeta> {
                let mut account_metas = vec![];
                account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.admin,
                true,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.state,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.user_stats,
                false,
            ));
                account_metas
            }
        }
    
    #[cfg_attr(not(target_os="solana"), derive(Debug))]
    #[derive(AnchorSerialize)]
    pub struct SettlePnl {
            pub state: Pubkey,
            pub user: Pubkey,
            pub authority: Pubkey,
            pub spot_market_vault: Pubkey,
    }
    
        impl anchor_lang::ToAccountMetas for SettlePnl {
            fn to_account_metas(
                &self,
                is_signer: Option<bool>,
            ) -> Vec<anchor_lang::solana_program::instruction::AccountMeta> {
                let mut account_metas = vec![];
                account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.state,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.user,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.authority,
                true,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.spot_market_vault,
                false,
            ));
                account_metas
            }
        }
    
    #[cfg_attr(not(target_os="solana"), derive(Debug))]
    #[derive(AnchorSerialize)]
    pub struct SettleMultiplePnls {
            pub state: Pubkey,
            pub user: Pubkey,
            pub authority: Pubkey,
            pub spot_market_vault: Pubkey,
    }
    
        impl anchor_lang::ToAccountMetas for SettleMultiplePnls {
            fn to_account_metas(
                &self,
                is_signer: Option<bool>,
            ) -> Vec<anchor_lang::solana_program::instruction::AccountMeta> {
                let mut account_metas = vec![];
                account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.state,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.user,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.authority,
                true,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.spot_market_vault,
                false,
            ));
                account_metas
            }
        }
    
    #[cfg_attr(not(target_os="solana"), derive(Debug))]
    #[derive(AnchorSerialize)]
    pub struct SettleFundingPayment {
            pub state: Pubkey,
            pub user: Pubkey,
    }
    
        impl anchor_lang::ToAccountMetas for SettleFundingPayment {
            fn to_account_metas(
                &self,
                is_signer: Option<bool>,
            ) -> Vec<anchor_lang::solana_program::instruction::AccountMeta> {
                let mut account_metas = vec![];
                account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.state,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.user,
                false,
            ));
                account_metas
            }
        }
    
    #[cfg_attr(not(target_os="solana"), derive(Debug))]
    #[derive(AnchorSerialize)]
    pub struct SettleLp {
            pub state: Pubkey,
            pub user: Pubkey,
    }
    
        impl anchor_lang::ToAccountMetas for SettleLp {
            fn to_account_metas(
                &self,
                is_signer: Option<bool>,
            ) -> Vec<anchor_lang::solana_program::instruction::AccountMeta> {
                let mut account_metas = vec![];
                account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.state,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.user,
                false,
            ));
                account_metas
            }
        }
    
    #[cfg_attr(not(target_os="solana"), derive(Debug))]
    #[derive(AnchorSerialize)]
    pub struct SettleExpiredMarket {
            pub state: Pubkey,
            pub authority: Pubkey,
    }
    
        impl anchor_lang::ToAccountMetas for SettleExpiredMarket {
            fn to_account_metas(
                &self,
                is_signer: Option<bool>,
            ) -> Vec<anchor_lang::solana_program::instruction::AccountMeta> {
                let mut account_metas = vec![];
                account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.state,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.authority,
                true,
            ));
                account_metas
            }
        }
    
    #[cfg_attr(not(target_os="solana"), derive(Debug))]
    #[derive(AnchorSerialize)]
    pub struct LiquidatePerp {
            pub state: Pubkey,
            pub authority: Pubkey,
            pub liquidator: Pubkey,
            pub liquidator_stats: Pubkey,
            pub user: Pubkey,
            pub user_stats: Pubkey,
    }
    
        impl anchor_lang::ToAccountMetas for LiquidatePerp {
            fn to_account_metas(
                &self,
                is_signer: Option<bool>,
            ) -> Vec<anchor_lang::solana_program::instruction::AccountMeta> {
                let mut account_metas = vec![];
                account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.state,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.authority,
                true,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.liquidator,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.liquidator_stats,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.user,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.user_stats,
                false,
            ));
                account_metas
            }
        }
    
    #[cfg_attr(not(target_os="solana"), derive(Debug))]
    #[derive(AnchorSerialize)]
    pub struct LiquidatePerpWithFill {
            pub state: Pubkey,
            pub authority: Pubkey,
            pub liquidator: Pubkey,
            pub liquidator_stats: Pubkey,
            pub user: Pubkey,
            pub user_stats: Pubkey,
    }
    
        impl anchor_lang::ToAccountMetas for LiquidatePerpWithFill {
            fn to_account_metas(
                &self,
                is_signer: Option<bool>,
            ) -> Vec<anchor_lang::solana_program::instruction::AccountMeta> {
                let mut account_metas = vec![];
                account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.state,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.authority,
                true,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.liquidator,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.liquidator_stats,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.user,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.user_stats,
                false,
            ));
                account_metas
            }
        }
    
    #[cfg_attr(not(target_os="solana"), derive(Debug))]
    #[derive(AnchorSerialize)]
    pub struct LiquidateSpot {
            pub state: Pubkey,
            pub authority: Pubkey,
            pub liquidator: Pubkey,
            pub liquidator_stats: Pubkey,
            pub user: Pubkey,
            pub user_stats: Pubkey,
    }
    
        impl anchor_lang::ToAccountMetas for LiquidateSpot {
            fn to_account_metas(
                &self,
                is_signer: Option<bool>,
            ) -> Vec<anchor_lang::solana_program::instruction::AccountMeta> {
                let mut account_metas = vec![];
                account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.state,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.authority,
                true,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.liquidator,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.liquidator_stats,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.user,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.user_stats,
                false,
            ));
                account_metas
            }
        }
    
    #[cfg_attr(not(target_os="solana"), derive(Debug))]
    #[derive(AnchorSerialize)]
    pub struct LiquidateBorrowForPerpPnl {
            pub state: Pubkey,
            pub authority: Pubkey,
            pub liquidator: Pubkey,
            pub liquidator_stats: Pubkey,
            pub user: Pubkey,
            pub user_stats: Pubkey,
    }
    
        impl anchor_lang::ToAccountMetas for LiquidateBorrowForPerpPnl {
            fn to_account_metas(
                &self,
                is_signer: Option<bool>,
            ) -> Vec<anchor_lang::solana_program::instruction::AccountMeta> {
                let mut account_metas = vec![];
                account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.state,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.authority,
                true,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.liquidator,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.liquidator_stats,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.user,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.user_stats,
                false,
            ));
                account_metas
            }
        }
    
    #[cfg_attr(not(target_os="solana"), derive(Debug))]
    #[derive(AnchorSerialize)]
    pub struct LiquidatePerpPnlForDeposit {
            pub state: Pubkey,
            pub authority: Pubkey,
            pub liquidator: Pubkey,
            pub liquidator_stats: Pubkey,
            pub user: Pubkey,
            pub user_stats: Pubkey,
    }
    
        impl anchor_lang::ToAccountMetas for LiquidatePerpPnlForDeposit {
            fn to_account_metas(
                &self,
                is_signer: Option<bool>,
            ) -> Vec<anchor_lang::solana_program::instruction::AccountMeta> {
                let mut account_metas = vec![];
                account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.state,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.authority,
                true,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.liquidator,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.liquidator_stats,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.user,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.user_stats,
                false,
            ));
                account_metas
            }
        }
    
    #[cfg_attr(not(target_os="solana"), derive(Debug))]
    #[derive(AnchorSerialize)]
    pub struct SetUserStatusToBeingLiquidated {
            pub state: Pubkey,
            pub user: Pubkey,
    }
    
        impl anchor_lang::ToAccountMetas for SetUserStatusToBeingLiquidated {
            fn to_account_metas(
                &self,
                is_signer: Option<bool>,
            ) -> Vec<anchor_lang::solana_program::instruction::AccountMeta> {
                let mut account_metas = vec![];
                account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.state,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.user,
                false,
            ));
                account_metas
            }
        }
    
    #[cfg_attr(not(target_os="solana"), derive(Debug))]
    #[derive(AnchorSerialize)]
    pub struct ResolvePerpPnlDeficit {
            pub state: Pubkey,
            pub authority: Pubkey,
            pub spot_market_vault: Pubkey,
            pub insurance_fund_vault: Pubkey,
            pub drift_signer: Pubkey,
            pub token_program: Pubkey,
    }
    
        impl anchor_lang::ToAccountMetas for ResolvePerpPnlDeficit {
            fn to_account_metas(
                &self,
                is_signer: Option<bool>,
            ) -> Vec<anchor_lang::solana_program::instruction::AccountMeta> {
                let mut account_metas = vec![];
                account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.state,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.authority,
                true,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.spot_market_vault,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.insurance_fund_vault,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.drift_signer,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.token_program,
                false,
            ));
                account_metas
            }
        }
    
    #[cfg_attr(not(target_os="solana"), derive(Debug))]
    #[derive(AnchorSerialize)]
    pub struct ResolvePerpBankruptcy {
            pub state: Pubkey,
            pub authority: Pubkey,
            pub liquidator: Pubkey,
            pub liquidator_stats: Pubkey,
            pub user: Pubkey,
            pub user_stats: Pubkey,
            pub spot_market_vault: Pubkey,
            pub insurance_fund_vault: Pubkey,
            pub drift_signer: Pubkey,
            pub token_program: Pubkey,
    }
    
        impl anchor_lang::ToAccountMetas for ResolvePerpBankruptcy {
            fn to_account_metas(
                &self,
                is_signer: Option<bool>,
            ) -> Vec<anchor_lang::solana_program::instruction::AccountMeta> {
                let mut account_metas = vec![];
                account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.state,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.authority,
                true,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.liquidator,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.liquidator_stats,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.user,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.user_stats,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.spot_market_vault,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.insurance_fund_vault,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.drift_signer,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.token_program,
                false,
            ));
                account_metas
            }
        }
    
    #[cfg_attr(not(target_os="solana"), derive(Debug))]
    #[derive(AnchorSerialize)]
    pub struct ResolveSpotBankruptcy {
            pub state: Pubkey,
            pub authority: Pubkey,
            pub liquidator: Pubkey,
            pub liquidator_stats: Pubkey,
            pub user: Pubkey,
            pub user_stats: Pubkey,
            pub spot_market_vault: Pubkey,
            pub insurance_fund_vault: Pubkey,
            pub drift_signer: Pubkey,
            pub token_program: Pubkey,
    }
    
        impl anchor_lang::ToAccountMetas for ResolveSpotBankruptcy {
            fn to_account_metas(
                &self,
                is_signer: Option<bool>,
            ) -> Vec<anchor_lang::solana_program::instruction::AccountMeta> {
                let mut account_metas = vec![];
                account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.state,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.authority,
                true,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.liquidator,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.liquidator_stats,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.user,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.user_stats,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.spot_market_vault,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.insurance_fund_vault,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.drift_signer,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.token_program,
                false,
            ));
                account_metas
            }
        }
    
    #[cfg_attr(not(target_os="solana"), derive(Debug))]
    #[derive(AnchorSerialize)]
    pub struct SettleRevenueToInsuranceFund {
            pub state: Pubkey,
            pub spot_market: Pubkey,
            pub spot_market_vault: Pubkey,
            pub drift_signer: Pubkey,
            pub insurance_fund_vault: Pubkey,
            pub token_program: Pubkey,
    }
    
        impl anchor_lang::ToAccountMetas for SettleRevenueToInsuranceFund {
            fn to_account_metas(
                &self,
                is_signer: Option<bool>,
            ) -> Vec<anchor_lang::solana_program::instruction::AccountMeta> {
                let mut account_metas = vec![];
                account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.state,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.spot_market,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.spot_market_vault,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.drift_signer,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.insurance_fund_vault,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.token_program,
                false,
            ));
                account_metas
            }
        }
    
    #[cfg_attr(not(target_os="solana"), derive(Debug))]
    #[derive(AnchorSerialize)]
    pub struct UpdateFundingRate {
            pub state: Pubkey,
            pub perp_market: Pubkey,
            pub oracle: Pubkey,
    }
    
        impl anchor_lang::ToAccountMetas for UpdateFundingRate {
            fn to_account_metas(
                &self,
                is_signer: Option<bool>,
            ) -> Vec<anchor_lang::solana_program::instruction::AccountMeta> {
                let mut account_metas = vec![];
                account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.state,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.perp_market,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.oracle,
                false,
            ));
                account_metas
            }
        }
    
    #[cfg_attr(not(target_os="solana"), derive(Debug))]
    #[derive(AnchorSerialize)]
    pub struct UpdatePrelaunchOracle {
            pub state: Pubkey,
            pub perp_market: Pubkey,
            pub oracle: Pubkey,
    }
    
        impl anchor_lang::ToAccountMetas for UpdatePrelaunchOracle {
            fn to_account_metas(
                &self,
                is_signer: Option<bool>,
            ) -> Vec<anchor_lang::solana_program::instruction::AccountMeta> {
                let mut account_metas = vec![];
                account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.state,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.perp_market,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.oracle,
                false,
            ));
                account_metas
            }
        }
    
    #[cfg_attr(not(target_os="solana"), derive(Debug))]
    #[derive(AnchorSerialize)]
    pub struct UpdatePerpBidAskTwap {
            pub state: Pubkey,
            pub perp_market: Pubkey,
            pub oracle: Pubkey,
            pub keeper_stats: Pubkey,
            pub authority: Pubkey,
    }
    
        impl anchor_lang::ToAccountMetas for UpdatePerpBidAskTwap {
            fn to_account_metas(
                &self,
                is_signer: Option<bool>,
            ) -> Vec<anchor_lang::solana_program::instruction::AccountMeta> {
                let mut account_metas = vec![];
                account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.state,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.perp_market,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.oracle,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.keeper_stats,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.authority,
                true,
            ));
                account_metas
            }
        }
    
    #[cfg_attr(not(target_os="solana"), derive(Debug))]
    #[derive(AnchorSerialize)]
    pub struct UpdateSpotMarketCumulativeInterest {
            pub state: Pubkey,
            pub spot_market: Pubkey,
            pub oracle: Pubkey,
            pub spot_market_vault: Pubkey,
    }
    
        impl anchor_lang::ToAccountMetas for UpdateSpotMarketCumulativeInterest {
            fn to_account_metas(
                &self,
                is_signer: Option<bool>,
            ) -> Vec<anchor_lang::solana_program::instruction::AccountMeta> {
                let mut account_metas = vec![];
                account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.state,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.spot_market,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.oracle,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.spot_market_vault,
                false,
            ));
                account_metas
            }
        }
    
    #[cfg_attr(not(target_os="solana"), derive(Debug))]
    #[derive(AnchorSerialize)]
    pub struct UpdateAmms {
            pub state: Pubkey,
            pub authority: Pubkey,
    }
    
        impl anchor_lang::ToAccountMetas for UpdateAmms {
            fn to_account_metas(
                &self,
                is_signer: Option<bool>,
            ) -> Vec<anchor_lang::solana_program::instruction::AccountMeta> {
                let mut account_metas = vec![];
                account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.state,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.authority,
                true,
            ));
                account_metas
            }
        }
    
    #[cfg_attr(not(target_os="solana"), derive(Debug))]
    #[derive(AnchorSerialize)]
    pub struct UpdateSpotMarketExpiry {
            pub admin: Pubkey,
            pub state: Pubkey,
            pub spot_market: Pubkey,
    }
    
        impl anchor_lang::ToAccountMetas for UpdateSpotMarketExpiry {
            fn to_account_metas(
                &self,
                is_signer: Option<bool>,
            ) -> Vec<anchor_lang::solana_program::instruction::AccountMeta> {
                let mut account_metas = vec![];
                account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.admin,
                true,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.state,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.spot_market,
                false,
            ));
                account_metas
            }
        }
    
    #[cfg_attr(not(target_os="solana"), derive(Debug))]
    #[derive(AnchorSerialize)]
    pub struct UpdateUserQuoteAssetInsuranceStake {
            pub state: Pubkey,
            pub spot_market: Pubkey,
            pub insurance_fund_stake: Pubkey,
            pub user_stats: Pubkey,
            pub signer: Pubkey,
            pub insurance_fund_vault: Pubkey,
    }
    
        impl anchor_lang::ToAccountMetas for UpdateUserQuoteAssetInsuranceStake {
            fn to_account_metas(
                &self,
                is_signer: Option<bool>,
            ) -> Vec<anchor_lang::solana_program::instruction::AccountMeta> {
                let mut account_metas = vec![];
                account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.state,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.spot_market,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.insurance_fund_stake,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.user_stats,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.signer,
                true,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.insurance_fund_vault,
                false,
            ));
                account_metas
            }
        }
    
    #[cfg_attr(not(target_os="solana"), derive(Debug))]
    #[derive(AnchorSerialize)]
    pub struct UpdateUserGovTokenInsuranceStake {
            pub state: Pubkey,
            pub spot_market: Pubkey,
            pub insurance_fund_stake: Pubkey,
            pub user_stats: Pubkey,
            pub signer: Pubkey,
            pub insurance_fund_vault: Pubkey,
    }
    
        impl anchor_lang::ToAccountMetas for UpdateUserGovTokenInsuranceStake {
            fn to_account_metas(
                &self,
                is_signer: Option<bool>,
            ) -> Vec<anchor_lang::solana_program::instruction::AccountMeta> {
                let mut account_metas = vec![];
                account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.state,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.spot_market,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.insurance_fund_stake,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.user_stats,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.signer,
                true,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.insurance_fund_vault,
                false,
            ));
                account_metas
            }
        }
    
    #[cfg_attr(not(target_os="solana"), derive(Debug))]
    #[derive(AnchorSerialize)]
    pub struct InitializeInsuranceFundStake {
            pub spot_market: Pubkey,
            pub insurance_fund_stake: Pubkey,
            pub user_stats: Pubkey,
            pub state: Pubkey,
            pub authority: Pubkey,
            pub payer: Pubkey,
            pub rent: Pubkey,
            pub system_program: Pubkey,
    }
    
        impl anchor_lang::ToAccountMetas for InitializeInsuranceFundStake {
            fn to_account_metas(
                &self,
                is_signer: Option<bool>,
            ) -> Vec<anchor_lang::solana_program::instruction::AccountMeta> {
                let mut account_metas = vec![];
                account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.spot_market,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.insurance_fund_stake,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.user_stats,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.state,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.authority,
                true,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.payer,
                true,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.rent,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.system_program,
                false,
            ));
                account_metas
            }
        }
    
    #[cfg_attr(not(target_os="solana"), derive(Debug))]
    #[derive(AnchorSerialize)]
    pub struct AddInsuranceFundStake {
            pub state: Pubkey,
            pub spot_market: Pubkey,
            pub insurance_fund_stake: Pubkey,
            pub user_stats: Pubkey,
            pub authority: Pubkey,
            pub spot_market_vault: Pubkey,
            pub insurance_fund_vault: Pubkey,
            pub drift_signer: Pubkey,
            pub user_token_account: Pubkey,
            pub token_program: Pubkey,
    }
    
        impl anchor_lang::ToAccountMetas for AddInsuranceFundStake {
            fn to_account_metas(
                &self,
                is_signer: Option<bool>,
            ) -> Vec<anchor_lang::solana_program::instruction::AccountMeta> {
                let mut account_metas = vec![];
                account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.state,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.spot_market,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.insurance_fund_stake,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.user_stats,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.authority,
                true,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.spot_market_vault,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.insurance_fund_vault,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.drift_signer,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.user_token_account,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.token_program,
                false,
            ));
                account_metas
            }
        }
    
    #[cfg_attr(not(target_os="solana"), derive(Debug))]
    #[derive(AnchorSerialize)]
    pub struct RequestRemoveInsuranceFundStake {
            pub spot_market: Pubkey,
            pub insurance_fund_stake: Pubkey,
            pub user_stats: Pubkey,
            pub authority: Pubkey,
            pub insurance_fund_vault: Pubkey,
    }
    
        impl anchor_lang::ToAccountMetas for RequestRemoveInsuranceFundStake {
            fn to_account_metas(
                &self,
                is_signer: Option<bool>,
            ) -> Vec<anchor_lang::solana_program::instruction::AccountMeta> {
                let mut account_metas = vec![];
                account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.spot_market,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.insurance_fund_stake,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.user_stats,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.authority,
                true,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.insurance_fund_vault,
                false,
            ));
                account_metas
            }
        }
    
    #[cfg_attr(not(target_os="solana"), derive(Debug))]
    #[derive(AnchorSerialize)]
    pub struct CancelRequestRemoveInsuranceFundStake {
            pub spot_market: Pubkey,
            pub insurance_fund_stake: Pubkey,
            pub user_stats: Pubkey,
            pub authority: Pubkey,
            pub insurance_fund_vault: Pubkey,
    }
    
        impl anchor_lang::ToAccountMetas for CancelRequestRemoveInsuranceFundStake {
            fn to_account_metas(
                &self,
                is_signer: Option<bool>,
            ) -> Vec<anchor_lang::solana_program::instruction::AccountMeta> {
                let mut account_metas = vec![];
                account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.spot_market,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.insurance_fund_stake,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.user_stats,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.authority,
                true,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.insurance_fund_vault,
                false,
            ));
                account_metas
            }
        }
    
    #[cfg_attr(not(target_os="solana"), derive(Debug))]
    #[derive(AnchorSerialize)]
    pub struct RemoveInsuranceFundStake {
            pub state: Pubkey,
            pub spot_market: Pubkey,
            pub insurance_fund_stake: Pubkey,
            pub user_stats: Pubkey,
            pub authority: Pubkey,
            pub insurance_fund_vault: Pubkey,
            pub drift_signer: Pubkey,
            pub user_token_account: Pubkey,
            pub token_program: Pubkey,
    }
    
        impl anchor_lang::ToAccountMetas for RemoveInsuranceFundStake {
            fn to_account_metas(
                &self,
                is_signer: Option<bool>,
            ) -> Vec<anchor_lang::solana_program::instruction::AccountMeta> {
                let mut account_metas = vec![];
                account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.state,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.spot_market,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.insurance_fund_stake,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.user_stats,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.authority,
                true,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.insurance_fund_vault,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.drift_signer,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.user_token_account,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.token_program,
                false,
            ));
                account_metas
            }
        }
    
    #[cfg_attr(not(target_os="solana"), derive(Debug))]
    #[derive(AnchorSerialize)]
    pub struct TransferProtocolIfShares {
            pub signer: Pubkey,
            pub transfer_config: Pubkey,
            pub state: Pubkey,
            pub spot_market: Pubkey,
            pub insurance_fund_stake: Pubkey,
            pub user_stats: Pubkey,
            pub authority: Pubkey,
            pub insurance_fund_vault: Pubkey,
    }
    
        impl anchor_lang::ToAccountMetas for TransferProtocolIfShares {
            fn to_account_metas(
                &self,
                is_signer: Option<bool>,
            ) -> Vec<anchor_lang::solana_program::instruction::AccountMeta> {
                let mut account_metas = vec![];
                account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.signer,
                true,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.transfer_config,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.state,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.spot_market,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.insurance_fund_stake,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.user_stats,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.authority,
                true,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.insurance_fund_vault,
                false,
            ));
                account_metas
            }
        }
    
    #[cfg_attr(not(target_os="solana"), derive(Debug))]
    #[derive(AnchorSerialize)]
    pub struct UpdatePythPullOracle {
            pub keeper: Pubkey,
            pub pyth_solana_receiver: Pubkey,
            pub encoded_vaa: Pubkey,
            pub price_feed: Pubkey,
    }
    
        impl anchor_lang::ToAccountMetas for UpdatePythPullOracle {
            fn to_account_metas(
                &self,
                is_signer: Option<bool>,
            ) -> Vec<anchor_lang::solana_program::instruction::AccountMeta> {
                let mut account_metas = vec![];
                account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.keeper,
                true,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.pyth_solana_receiver,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.encoded_vaa,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.price_feed,
                false,
            ));
                account_metas
            }
        }
    
    #[cfg_attr(not(target_os="solana"), derive(Debug))]
    #[derive(AnchorSerialize)]
    pub struct PostPythPullOracleUpdateAtomic {
            pub keeper: Pubkey,
            pub pyth_solana_receiver: Pubkey,
            pub guardian_set: Pubkey,
            pub price_feed: Pubkey,
    }
    
        impl anchor_lang::ToAccountMetas for PostPythPullOracleUpdateAtomic {
            fn to_account_metas(
                &self,
                is_signer: Option<bool>,
            ) -> Vec<anchor_lang::solana_program::instruction::AccountMeta> {
                let mut account_metas = vec![];
                account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.keeper,
                true,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.pyth_solana_receiver,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.guardian_set,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.price_feed,
                false,
            ));
                account_metas
            }
        }
    
    #[cfg_attr(not(target_os="solana"), derive(Debug))]
    #[derive(AnchorSerialize)]
    pub struct PostMultiPythPullOracleUpdatesAtomic {
            pub keeper: Pubkey,
            pub pyth_solana_receiver: Pubkey,
            pub guardian_set: Pubkey,
    }
    
        impl anchor_lang::ToAccountMetas for PostMultiPythPullOracleUpdatesAtomic {
            fn to_account_metas(
                &self,
                is_signer: Option<bool>,
            ) -> Vec<anchor_lang::solana_program::instruction::AccountMeta> {
                let mut account_metas = vec![];
                account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.keeper,
                true,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.pyth_solana_receiver,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.guardian_set,
                false,
            ));
                account_metas
            }
        }
    
    #[cfg_attr(not(target_os="solana"), derive(Debug))]
    #[derive(AnchorSerialize)]
    pub struct Initialize {
            pub admin: Pubkey,
            pub state: Pubkey,
            pub quote_asset_mint: Pubkey,
            pub drift_signer: Pubkey,
            pub rent: Pubkey,
            pub system_program: Pubkey,
            pub token_program: Pubkey,
    }
    
        impl anchor_lang::ToAccountMetas for Initialize {
            fn to_account_metas(
                &self,
                is_signer: Option<bool>,
            ) -> Vec<anchor_lang::solana_program::instruction::AccountMeta> {
                let mut account_metas = vec![];
                account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.admin,
                true,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.state,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.quote_asset_mint,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.drift_signer,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.rent,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.system_program,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.token_program,
                false,
            ));
                account_metas
            }
        }
    
    #[cfg_attr(not(target_os="solana"), derive(Debug))]
    #[derive(AnchorSerialize)]
    pub struct InitializeSpotMarket {
            pub spot_market: Pubkey,
            pub spot_market_mint: Pubkey,
            pub spot_market_vault: Pubkey,
            pub insurance_fund_vault: Pubkey,
            pub drift_signer: Pubkey,
            pub state: Pubkey,
            pub oracle: Pubkey,
            pub admin: Pubkey,
            pub rent: Pubkey,
            pub system_program: Pubkey,
            pub token_program: Pubkey,
    }
    
        impl anchor_lang::ToAccountMetas for InitializeSpotMarket {
            fn to_account_metas(
                &self,
                is_signer: Option<bool>,
            ) -> Vec<anchor_lang::solana_program::instruction::AccountMeta> {
                let mut account_metas = vec![];
                account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.spot_market,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.spot_market_mint,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.spot_market_vault,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.insurance_fund_vault,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.drift_signer,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.state,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.oracle,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.admin,
                true,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.rent,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.system_program,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.token_program,
                false,
            ));
                account_metas
            }
        }
    
    #[cfg_attr(not(target_os="solana"), derive(Debug))]
    #[derive(AnchorSerialize)]
    pub struct DeleteInitializedSpotMarket {
            pub admin: Pubkey,
            pub state: Pubkey,
            pub spot_market: Pubkey,
            pub spot_market_vault: Pubkey,
            pub insurance_fund_vault: Pubkey,
            pub drift_signer: Pubkey,
            pub token_program: Pubkey,
    }
    
        impl anchor_lang::ToAccountMetas for DeleteInitializedSpotMarket {
            fn to_account_metas(
                &self,
                is_signer: Option<bool>,
            ) -> Vec<anchor_lang::solana_program::instruction::AccountMeta> {
                let mut account_metas = vec![];
                account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.admin,
                true,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.state,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.spot_market,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.spot_market_vault,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.insurance_fund_vault,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.drift_signer,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.token_program,
                false,
            ));
                account_metas
            }
        }
    
    #[cfg_attr(not(target_os="solana"), derive(Debug))]
    #[derive(AnchorSerialize)]
    pub struct InitializeSerumFulfillmentConfig {
            pub base_spot_market: Pubkey,
            pub quote_spot_market: Pubkey,
            pub state: Pubkey,
            pub serum_program: Pubkey,
            pub serum_market: Pubkey,
            pub serum_open_orders: Pubkey,
            pub drift_signer: Pubkey,
            pub serum_fulfillment_config: Pubkey,
            pub admin: Pubkey,
            pub rent: Pubkey,
            pub system_program: Pubkey,
    }
    
        impl anchor_lang::ToAccountMetas for InitializeSerumFulfillmentConfig {
            fn to_account_metas(
                &self,
                is_signer: Option<bool>,
            ) -> Vec<anchor_lang::solana_program::instruction::AccountMeta> {
                let mut account_metas = vec![];
                account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.base_spot_market,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.quote_spot_market,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.state,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.serum_program,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.serum_market,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.serum_open_orders,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.drift_signer,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.serum_fulfillment_config,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.admin,
                true,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.rent,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.system_program,
                false,
            ));
                account_metas
            }
        }
    
    #[cfg_attr(not(target_os="solana"), derive(Debug))]
    #[derive(AnchorSerialize)]
    pub struct UpdateSerumFulfillmentConfigStatus {
            pub state: Pubkey,
            pub serum_fulfillment_config: Pubkey,
            pub admin: Pubkey,
    }
    
        impl anchor_lang::ToAccountMetas for UpdateSerumFulfillmentConfigStatus {
            fn to_account_metas(
                &self,
                is_signer: Option<bool>,
            ) -> Vec<anchor_lang::solana_program::instruction::AccountMeta> {
                let mut account_metas = vec![];
                account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.state,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.serum_fulfillment_config,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.admin,
                true,
            ));
                account_metas
            }
        }
    
    #[cfg_attr(not(target_os="solana"), derive(Debug))]
    #[derive(AnchorSerialize)]
    pub struct InitializeOpenbookV2FulfillmentConfig {
            pub base_spot_market: Pubkey,
            pub quote_spot_market: Pubkey,
            pub state: Pubkey,
            pub openbook_v_2_program: Pubkey,
            pub openbook_v_2_market: Pubkey,
            pub drift_signer: Pubkey,
            pub openbook_v_2_fulfillment_config: Pubkey,
            pub admin: Pubkey,
            pub rent: Pubkey,
            pub system_program: Pubkey,
    }
    
        impl anchor_lang::ToAccountMetas for InitializeOpenbookV2FulfillmentConfig {
            fn to_account_metas(
                &self,
                is_signer: Option<bool>,
            ) -> Vec<anchor_lang::solana_program::instruction::AccountMeta> {
                let mut account_metas = vec![];
                account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.base_spot_market,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.quote_spot_market,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.state,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.openbook_v_2_program,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.openbook_v_2_market,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.drift_signer,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.openbook_v_2_fulfillment_config,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.admin,
                true,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.rent,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.system_program,
                false,
            ));
                account_metas
            }
        }
    
    #[cfg_attr(not(target_os="solana"), derive(Debug))]
    #[derive(AnchorSerialize)]
    pub struct OpenbookV2FulfillmentConfigStatus {
            pub state: Pubkey,
            pub openbook_v_2_fulfillment_config: Pubkey,
            pub admin: Pubkey,
    }
    
        impl anchor_lang::ToAccountMetas for OpenbookV2FulfillmentConfigStatus {
            fn to_account_metas(
                &self,
                is_signer: Option<bool>,
            ) -> Vec<anchor_lang::solana_program::instruction::AccountMeta> {
                let mut account_metas = vec![];
                account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.state,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.openbook_v_2_fulfillment_config,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.admin,
                true,
            ));
                account_metas
            }
        }
    
    #[cfg_attr(not(target_os="solana"), derive(Debug))]
    #[derive(AnchorSerialize)]
    pub struct InitializePhoenixFulfillmentConfig {
            pub base_spot_market: Pubkey,
            pub quote_spot_market: Pubkey,
            pub state: Pubkey,
            pub phoenix_program: Pubkey,
            pub phoenix_market: Pubkey,
            pub drift_signer: Pubkey,
            pub phoenix_fulfillment_config: Pubkey,
            pub admin: Pubkey,
            pub rent: Pubkey,
            pub system_program: Pubkey,
    }
    
        impl anchor_lang::ToAccountMetas for InitializePhoenixFulfillmentConfig {
            fn to_account_metas(
                &self,
                is_signer: Option<bool>,
            ) -> Vec<anchor_lang::solana_program::instruction::AccountMeta> {
                let mut account_metas = vec![];
                account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.base_spot_market,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.quote_spot_market,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.state,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.phoenix_program,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.phoenix_market,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.drift_signer,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.phoenix_fulfillment_config,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.admin,
                true,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.rent,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.system_program,
                false,
            ));
                account_metas
            }
        }
    
    #[cfg_attr(not(target_os="solana"), derive(Debug))]
    #[derive(AnchorSerialize)]
    pub struct PhoenixFulfillmentConfigStatus {
            pub state: Pubkey,
            pub phoenix_fulfillment_config: Pubkey,
            pub admin: Pubkey,
    }
    
        impl anchor_lang::ToAccountMetas for PhoenixFulfillmentConfigStatus {
            fn to_account_metas(
                &self,
                is_signer: Option<bool>,
            ) -> Vec<anchor_lang::solana_program::instruction::AccountMeta> {
                let mut account_metas = vec![];
                account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.state,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.phoenix_fulfillment_config,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.admin,
                true,
            ));
                account_metas
            }
        }
    
    #[cfg_attr(not(target_os="solana"), derive(Debug))]
    #[derive(AnchorSerialize)]
    pub struct UpdateSerumVault {
            pub state: Pubkey,
            pub admin: Pubkey,
            pub srm_vault: Pubkey,
    }
    
        impl anchor_lang::ToAccountMetas for UpdateSerumVault {
            fn to_account_metas(
                &self,
                is_signer: Option<bool>,
            ) -> Vec<anchor_lang::solana_program::instruction::AccountMeta> {
                let mut account_metas = vec![];
                account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.state,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.admin,
                true,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.srm_vault,
                false,
            ));
                account_metas
            }
        }
    
    #[cfg_attr(not(target_os="solana"), derive(Debug))]
    #[derive(AnchorSerialize)]
    pub struct InitializePerpMarket {
            pub admin: Pubkey,
            pub state: Pubkey,
            pub perp_market: Pubkey,
            pub oracle: Pubkey,
            pub rent: Pubkey,
            pub system_program: Pubkey,
    }
    
        impl anchor_lang::ToAccountMetas for InitializePerpMarket {
            fn to_account_metas(
                &self,
                is_signer: Option<bool>,
            ) -> Vec<anchor_lang::solana_program::instruction::AccountMeta> {
                let mut account_metas = vec![];
                account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.admin,
                true,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.state,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.perp_market,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.oracle,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.rent,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.system_program,
                false,
            ));
                account_metas
            }
        }
    
    #[cfg_attr(not(target_os="solana"), derive(Debug))]
    #[derive(AnchorSerialize)]
    pub struct InitializePredictionMarket {
            pub admin: Pubkey,
            pub state: Pubkey,
            pub perp_market: Pubkey,
    }
    
        impl anchor_lang::ToAccountMetas for InitializePredictionMarket {
            fn to_account_metas(
                &self,
                is_signer: Option<bool>,
            ) -> Vec<anchor_lang::solana_program::instruction::AccountMeta> {
                let mut account_metas = vec![];
                account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.admin,
                true,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.state,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.perp_market,
                false,
            ));
                account_metas
            }
        }
    
    #[cfg_attr(not(target_os="solana"), derive(Debug))]
    #[derive(AnchorSerialize)]
    pub struct DeleteInitializedPerpMarket {
            pub admin: Pubkey,
            pub state: Pubkey,
            pub perp_market: Pubkey,
    }
    
        impl anchor_lang::ToAccountMetas for DeleteInitializedPerpMarket {
            fn to_account_metas(
                &self,
                is_signer: Option<bool>,
            ) -> Vec<anchor_lang::solana_program::instruction::AccountMeta> {
                let mut account_metas = vec![];
                account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.admin,
                true,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.state,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.perp_market,
                false,
            ));
                account_metas
            }
        }
    
    #[cfg_attr(not(target_os="solana"), derive(Debug))]
    #[derive(AnchorSerialize)]
    pub struct MoveAmmPrice {
            pub admin: Pubkey,
            pub state: Pubkey,
            pub perp_market: Pubkey,
    }
    
        impl anchor_lang::ToAccountMetas for MoveAmmPrice {
            fn to_account_metas(
                &self,
                is_signer: Option<bool>,
            ) -> Vec<anchor_lang::solana_program::instruction::AccountMeta> {
                let mut account_metas = vec![];
                account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.admin,
                true,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.state,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.perp_market,
                false,
            ));
                account_metas
            }
        }
    
    #[cfg_attr(not(target_os="solana"), derive(Debug))]
    #[derive(AnchorSerialize)]
    pub struct RecenterPerpMarketAmm {
            pub admin: Pubkey,
            pub state: Pubkey,
            pub perp_market: Pubkey,
    }
    
        impl anchor_lang::ToAccountMetas for RecenterPerpMarketAmm {
            fn to_account_metas(
                &self,
                is_signer: Option<bool>,
            ) -> Vec<anchor_lang::solana_program::instruction::AccountMeta> {
                let mut account_metas = vec![];
                account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.admin,
                true,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.state,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.perp_market,
                false,
            ));
                account_metas
            }
        }
    
    #[cfg_attr(not(target_os="solana"), derive(Debug))]
    #[derive(AnchorSerialize)]
    pub struct UpdatePerpMarketAmmSummaryStats {
            pub admin: Pubkey,
            pub state: Pubkey,
            pub perp_market: Pubkey,
            pub spot_market: Pubkey,
            pub oracle: Pubkey,
    }
    
        impl anchor_lang::ToAccountMetas for UpdatePerpMarketAmmSummaryStats {
            fn to_account_metas(
                &self,
                is_signer: Option<bool>,
            ) -> Vec<anchor_lang::solana_program::instruction::AccountMeta> {
                let mut account_metas = vec![];
                account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.admin,
                true,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.state,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.perp_market,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.spot_market,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.oracle,
                false,
            ));
                account_metas
            }
        }
    
    #[cfg_attr(not(target_os="solana"), derive(Debug))]
    #[derive(AnchorSerialize)]
    pub struct UpdatePerpMarketExpiry {
            pub admin: Pubkey,
            pub state: Pubkey,
            pub perp_market: Pubkey,
    }
    
        impl anchor_lang::ToAccountMetas for UpdatePerpMarketExpiry {
            fn to_account_metas(
                &self,
                is_signer: Option<bool>,
            ) -> Vec<anchor_lang::solana_program::instruction::AccountMeta> {
                let mut account_metas = vec![];
                account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.admin,
                true,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.state,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.perp_market,
                false,
            ));
                account_metas
            }
        }
    
    #[cfg_attr(not(target_os="solana"), derive(Debug))]
    #[derive(AnchorSerialize)]
    pub struct SettleExpiredMarketPoolsToRevenuePool {
            pub state: Pubkey,
            pub admin: Pubkey,
            pub spot_market: Pubkey,
            pub perp_market: Pubkey,
    }
    
        impl anchor_lang::ToAccountMetas for SettleExpiredMarketPoolsToRevenuePool {
            fn to_account_metas(
                &self,
                is_signer: Option<bool>,
            ) -> Vec<anchor_lang::solana_program::instruction::AccountMeta> {
                let mut account_metas = vec![];
                account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.state,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.admin,
                true,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.spot_market,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.perp_market,
                false,
            ));
                account_metas
            }
        }
    
    #[cfg_attr(not(target_os="solana"), derive(Debug))]
    #[derive(AnchorSerialize)]
    pub struct DepositIntoPerpMarketFeePool {
            pub state: Pubkey,
            pub perp_market: Pubkey,
            pub admin: Pubkey,
            pub source_vault: Pubkey,
            pub drift_signer: Pubkey,
            pub quote_spot_market: Pubkey,
            pub spot_market_vault: Pubkey,
            pub token_program: Pubkey,
    }
    
        impl anchor_lang::ToAccountMetas for DepositIntoPerpMarketFeePool {
            fn to_account_metas(
                &self,
                is_signer: Option<bool>,
            ) -> Vec<anchor_lang::solana_program::instruction::AccountMeta> {
                let mut account_metas = vec![];
                account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.state,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.perp_market,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.admin,
                true,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.source_vault,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.drift_signer,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.quote_spot_market,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.spot_market_vault,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.token_program,
                false,
            ));
                account_metas
            }
        }
    
    #[cfg_attr(not(target_os="solana"), derive(Debug))]
    #[derive(AnchorSerialize)]
    pub struct DepositIntoSpotMarketVault {
            pub state: Pubkey,
            pub spot_market: Pubkey,
            pub admin: Pubkey,
            pub source_vault: Pubkey,
            pub spot_market_vault: Pubkey,
            pub token_program: Pubkey,
    }
    
        impl anchor_lang::ToAccountMetas for DepositIntoSpotMarketVault {
            fn to_account_metas(
                &self,
                is_signer: Option<bool>,
            ) -> Vec<anchor_lang::solana_program::instruction::AccountMeta> {
                let mut account_metas = vec![];
                account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.state,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.spot_market,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.admin,
                true,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.source_vault,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.spot_market_vault,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.token_program,
                false,
            ));
                account_metas
            }
        }
    
    #[cfg_attr(not(target_os="solana"), derive(Debug))]
    #[derive(AnchorSerialize)]
    pub struct DepositIntoSpotMarketRevenuePool {
            pub state: Pubkey,
            pub spot_market: Pubkey,
            pub authority: Pubkey,
            pub spot_market_vault: Pubkey,
            pub user_token_account: Pubkey,
            pub token_program: Pubkey,
    }
    
        impl anchor_lang::ToAccountMetas for DepositIntoSpotMarketRevenuePool {
            fn to_account_metas(
                &self,
                is_signer: Option<bool>,
            ) -> Vec<anchor_lang::solana_program::instruction::AccountMeta> {
                let mut account_metas = vec![];
                account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.state,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.spot_market,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.authority,
                true,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.spot_market_vault,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.user_token_account,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.token_program,
                false,
            ));
                account_metas
            }
        }
    
    #[cfg_attr(not(target_os="solana"), derive(Debug))]
    #[derive(AnchorSerialize)]
    pub struct RepegAmmCurve {
            pub state: Pubkey,
            pub perp_market: Pubkey,
            pub oracle: Pubkey,
            pub admin: Pubkey,
    }
    
        impl anchor_lang::ToAccountMetas for RepegAmmCurve {
            fn to_account_metas(
                &self,
                is_signer: Option<bool>,
            ) -> Vec<anchor_lang::solana_program::instruction::AccountMeta> {
                let mut account_metas = vec![];
                account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.state,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.perp_market,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.oracle,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.admin,
                true,
            ));
                account_metas
            }
        }
    
    #[cfg_attr(not(target_os="solana"), derive(Debug))]
    #[derive(AnchorSerialize)]
    pub struct UpdatePerpMarketAmmOracleTwap {
            pub state: Pubkey,
            pub perp_market: Pubkey,
            pub oracle: Pubkey,
            pub admin: Pubkey,
    }
    
        impl anchor_lang::ToAccountMetas for UpdatePerpMarketAmmOracleTwap {
            fn to_account_metas(
                &self,
                is_signer: Option<bool>,
            ) -> Vec<anchor_lang::solana_program::instruction::AccountMeta> {
                let mut account_metas = vec![];
                account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.state,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.perp_market,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.oracle,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.admin,
                true,
            ));
                account_metas
            }
        }
    
    #[cfg_attr(not(target_os="solana"), derive(Debug))]
    #[derive(AnchorSerialize)]
    pub struct ResetPerpMarketAmmOracleTwap {
            pub state: Pubkey,
            pub perp_market: Pubkey,
            pub oracle: Pubkey,
            pub admin: Pubkey,
    }
    
        impl anchor_lang::ToAccountMetas for ResetPerpMarketAmmOracleTwap {
            fn to_account_metas(
                &self,
                is_signer: Option<bool>,
            ) -> Vec<anchor_lang::solana_program::instruction::AccountMeta> {
                let mut account_metas = vec![];
                account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.state,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.perp_market,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.oracle,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.admin,
                true,
            ));
                account_metas
            }
        }
    
    #[cfg_attr(not(target_os="solana"), derive(Debug))]
    #[derive(AnchorSerialize)]
    pub struct UpdateK {
            pub admin: Pubkey,
            pub state: Pubkey,
            pub perp_market: Pubkey,
            pub oracle: Pubkey,
    }
    
        impl anchor_lang::ToAccountMetas for UpdateK {
            fn to_account_metas(
                &self,
                is_signer: Option<bool>,
            ) -> Vec<anchor_lang::solana_program::instruction::AccountMeta> {
                let mut account_metas = vec![];
                account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.admin,
                true,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.state,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.perp_market,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.oracle,
                false,
            ));
                account_metas
            }
        }
    
    #[cfg_attr(not(target_os="solana"), derive(Debug))]
    #[derive(AnchorSerialize)]
    pub struct UpdatePerpMarketMarginRatio {
            pub admin: Pubkey,
            pub state: Pubkey,
            pub perp_market: Pubkey,
    }
    
        impl anchor_lang::ToAccountMetas for UpdatePerpMarketMarginRatio {
            fn to_account_metas(
                &self,
                is_signer: Option<bool>,
            ) -> Vec<anchor_lang::solana_program::instruction::AccountMeta> {
                let mut account_metas = vec![];
                account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.admin,
                true,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.state,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.perp_market,
                false,
            ));
                account_metas
            }
        }
    
    #[cfg_attr(not(target_os="solana"), derive(Debug))]
    #[derive(AnchorSerialize)]
    pub struct UpdatePerpMarketFundingPeriod {
            pub admin: Pubkey,
            pub state: Pubkey,
            pub perp_market: Pubkey,
    }
    
        impl anchor_lang::ToAccountMetas for UpdatePerpMarketFundingPeriod {
            fn to_account_metas(
                &self,
                is_signer: Option<bool>,
            ) -> Vec<anchor_lang::solana_program::instruction::AccountMeta> {
                let mut account_metas = vec![];
                account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.admin,
                true,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.state,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.perp_market,
                false,
            ));
                account_metas
            }
        }
    
    #[cfg_attr(not(target_os="solana"), derive(Debug))]
    #[derive(AnchorSerialize)]
    pub struct UpdatePerpMarketMaxImbalances {
            pub admin: Pubkey,
            pub state: Pubkey,
            pub perp_market: Pubkey,
    }
    
        impl anchor_lang::ToAccountMetas for UpdatePerpMarketMaxImbalances {
            fn to_account_metas(
                &self,
                is_signer: Option<bool>,
            ) -> Vec<anchor_lang::solana_program::instruction::AccountMeta> {
                let mut account_metas = vec![];
                account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.admin,
                true,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.state,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.perp_market,
                false,
            ));
                account_metas
            }
        }
    
    #[cfg_attr(not(target_os="solana"), derive(Debug))]
    #[derive(AnchorSerialize)]
    pub struct UpdatePerpMarketLiquidationFee {
            pub admin: Pubkey,
            pub state: Pubkey,
            pub perp_market: Pubkey,
    }
    
        impl anchor_lang::ToAccountMetas for UpdatePerpMarketLiquidationFee {
            fn to_account_metas(
                &self,
                is_signer: Option<bool>,
            ) -> Vec<anchor_lang::solana_program::instruction::AccountMeta> {
                let mut account_metas = vec![];
                account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.admin,
                true,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.state,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.perp_market,
                false,
            ));
                account_metas
            }
        }
    
    #[cfg_attr(not(target_os="solana"), derive(Debug))]
    #[derive(AnchorSerialize)]
    pub struct UpdateInsuranceFundUnstakingPeriod {
            pub admin: Pubkey,
            pub state: Pubkey,
            pub spot_market: Pubkey,
    }
    
        impl anchor_lang::ToAccountMetas for UpdateInsuranceFundUnstakingPeriod {
            fn to_account_metas(
                &self,
                is_signer: Option<bool>,
            ) -> Vec<anchor_lang::solana_program::instruction::AccountMeta> {
                let mut account_metas = vec![];
                account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.admin,
                true,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.state,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.spot_market,
                false,
            ));
                account_metas
            }
        }
    
    #[cfg_attr(not(target_os="solana"), derive(Debug))]
    #[derive(AnchorSerialize)]
    pub struct UpdateSpotMarketLiquidationFee {
            pub admin: Pubkey,
            pub state: Pubkey,
            pub spot_market: Pubkey,
    }
    
        impl anchor_lang::ToAccountMetas for UpdateSpotMarketLiquidationFee {
            fn to_account_metas(
                &self,
                is_signer: Option<bool>,
            ) -> Vec<anchor_lang::solana_program::instruction::AccountMeta> {
                let mut account_metas = vec![];
                account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.admin,
                true,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.state,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.spot_market,
                false,
            ));
                account_metas
            }
        }
    
    #[cfg_attr(not(target_os="solana"), derive(Debug))]
    #[derive(AnchorSerialize)]
    pub struct UpdateWithdrawGuardThreshold {
            pub admin: Pubkey,
            pub state: Pubkey,
            pub spot_market: Pubkey,
    }
    
        impl anchor_lang::ToAccountMetas for UpdateWithdrawGuardThreshold {
            fn to_account_metas(
                &self,
                is_signer: Option<bool>,
            ) -> Vec<anchor_lang::solana_program::instruction::AccountMeta> {
                let mut account_metas = vec![];
                account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.admin,
                true,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.state,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.spot_market,
                false,
            ));
                account_metas
            }
        }
    
    #[cfg_attr(not(target_os="solana"), derive(Debug))]
    #[derive(AnchorSerialize)]
    pub struct UpdateSpotMarketIfFactor {
            pub admin: Pubkey,
            pub state: Pubkey,
            pub spot_market: Pubkey,
    }
    
        impl anchor_lang::ToAccountMetas for UpdateSpotMarketIfFactor {
            fn to_account_metas(
                &self,
                is_signer: Option<bool>,
            ) -> Vec<anchor_lang::solana_program::instruction::AccountMeta> {
                let mut account_metas = vec![];
                account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.admin,
                true,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.state,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.spot_market,
                false,
            ));
                account_metas
            }
        }
    
    #[cfg_attr(not(target_os="solana"), derive(Debug))]
    #[derive(AnchorSerialize)]
    pub struct UpdateSpotMarketRevenueSettlePeriod {
            pub admin: Pubkey,
            pub state: Pubkey,
            pub spot_market: Pubkey,
    }
    
        impl anchor_lang::ToAccountMetas for UpdateSpotMarketRevenueSettlePeriod {
            fn to_account_metas(
                &self,
                is_signer: Option<bool>,
            ) -> Vec<anchor_lang::solana_program::instruction::AccountMeta> {
                let mut account_metas = vec![];
                account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.admin,
                true,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.state,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.spot_market,
                false,
            ));
                account_metas
            }
        }
    
    #[cfg_attr(not(target_os="solana"), derive(Debug))]
    #[derive(AnchorSerialize)]
    pub struct UpdateSpotMarketStatus {
            pub admin: Pubkey,
            pub state: Pubkey,
            pub spot_market: Pubkey,
    }
    
        impl anchor_lang::ToAccountMetas for UpdateSpotMarketStatus {
            fn to_account_metas(
                &self,
                is_signer: Option<bool>,
            ) -> Vec<anchor_lang::solana_program::instruction::AccountMeta> {
                let mut account_metas = vec![];
                account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.admin,
                true,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.state,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.spot_market,
                false,
            ));
                account_metas
            }
        }
    
    #[cfg_attr(not(target_os="solana"), derive(Debug))]
    #[derive(AnchorSerialize)]
    pub struct UpdateSpotMarketPausedOperations {
            pub admin: Pubkey,
            pub state: Pubkey,
            pub spot_market: Pubkey,
    }
    
        impl anchor_lang::ToAccountMetas for UpdateSpotMarketPausedOperations {
            fn to_account_metas(
                &self,
                is_signer: Option<bool>,
            ) -> Vec<anchor_lang::solana_program::instruction::AccountMeta> {
                let mut account_metas = vec![];
                account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.admin,
                true,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.state,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.spot_market,
                false,
            ));
                account_metas
            }
        }
    
    #[cfg_attr(not(target_os="solana"), derive(Debug))]
    #[derive(AnchorSerialize)]
    pub struct UpdateSpotMarketAssetTier {
            pub admin: Pubkey,
            pub state: Pubkey,
            pub spot_market: Pubkey,
    }
    
        impl anchor_lang::ToAccountMetas for UpdateSpotMarketAssetTier {
            fn to_account_metas(
                &self,
                is_signer: Option<bool>,
            ) -> Vec<anchor_lang::solana_program::instruction::AccountMeta> {
                let mut account_metas = vec![];
                account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.admin,
                true,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.state,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.spot_market,
                false,
            ));
                account_metas
            }
        }
    
    #[cfg_attr(not(target_os="solana"), derive(Debug))]
    #[derive(AnchorSerialize)]
    pub struct UpdateSpotMarketMarginWeights {
            pub admin: Pubkey,
            pub state: Pubkey,
            pub spot_market: Pubkey,
    }
    
        impl anchor_lang::ToAccountMetas for UpdateSpotMarketMarginWeights {
            fn to_account_metas(
                &self,
                is_signer: Option<bool>,
            ) -> Vec<anchor_lang::solana_program::instruction::AccountMeta> {
                let mut account_metas = vec![];
                account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.admin,
                true,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.state,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.spot_market,
                false,
            ));
                account_metas
            }
        }
    
    #[cfg_attr(not(target_os="solana"), derive(Debug))]
    #[derive(AnchorSerialize)]
    pub struct UpdateSpotMarketBorrowRate {
            pub admin: Pubkey,
            pub state: Pubkey,
            pub spot_market: Pubkey,
    }
    
        impl anchor_lang::ToAccountMetas for UpdateSpotMarketBorrowRate {
            fn to_account_metas(
                &self,
                is_signer: Option<bool>,
            ) -> Vec<anchor_lang::solana_program::instruction::AccountMeta> {
                let mut account_metas = vec![];
                account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.admin,
                true,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.state,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.spot_market,
                false,
            ));
                account_metas
            }
        }
    
    #[cfg_attr(not(target_os="solana"), derive(Debug))]
    #[derive(AnchorSerialize)]
    pub struct UpdateSpotMarketMaxTokenDeposits {
            pub admin: Pubkey,
            pub state: Pubkey,
            pub spot_market: Pubkey,
    }
    
        impl anchor_lang::ToAccountMetas for UpdateSpotMarketMaxTokenDeposits {
            fn to_account_metas(
                &self,
                is_signer: Option<bool>,
            ) -> Vec<anchor_lang::solana_program::instruction::AccountMeta> {
                let mut account_metas = vec![];
                account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.admin,
                true,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.state,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.spot_market,
                false,
            ));
                account_metas
            }
        }
    
    #[cfg_attr(not(target_os="solana"), derive(Debug))]
    #[derive(AnchorSerialize)]
    pub struct UpdateSpotMarketMaxTokenBorrows {
            pub admin: Pubkey,
            pub state: Pubkey,
            pub spot_market: Pubkey,
    }
    
        impl anchor_lang::ToAccountMetas for UpdateSpotMarketMaxTokenBorrows {
            fn to_account_metas(
                &self,
                is_signer: Option<bool>,
            ) -> Vec<anchor_lang::solana_program::instruction::AccountMeta> {
                let mut account_metas = vec![];
                account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.admin,
                true,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.state,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.spot_market,
                false,
            ));
                account_metas
            }
        }
    
    #[cfg_attr(not(target_os="solana"), derive(Debug))]
    #[derive(AnchorSerialize)]
    pub struct UpdateSpotMarketScaleInitialAssetWeightStart {
            pub admin: Pubkey,
            pub state: Pubkey,
            pub spot_market: Pubkey,
    }
    
        impl anchor_lang::ToAccountMetas for UpdateSpotMarketScaleInitialAssetWeightStart {
            fn to_account_metas(
                &self,
                is_signer: Option<bool>,
            ) -> Vec<anchor_lang::solana_program::instruction::AccountMeta> {
                let mut account_metas = vec![];
                account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.admin,
                true,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.state,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.spot_market,
                false,
            ));
                account_metas
            }
        }
    
    #[cfg_attr(not(target_os="solana"), derive(Debug))]
    #[derive(AnchorSerialize)]
    pub struct UpdateSpotMarketOracle {
            pub admin: Pubkey,
            pub state: Pubkey,
            pub spot_market: Pubkey,
            pub oracle: Pubkey,
    }
    
        impl anchor_lang::ToAccountMetas for UpdateSpotMarketOracle {
            fn to_account_metas(
                &self,
                is_signer: Option<bool>,
            ) -> Vec<anchor_lang::solana_program::instruction::AccountMeta> {
                let mut account_metas = vec![];
                account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.admin,
                true,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.state,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.spot_market,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.oracle,
                false,
            ));
                account_metas
            }
        }
    
    #[cfg_attr(not(target_os="solana"), derive(Debug))]
    #[derive(AnchorSerialize)]
    pub struct UpdateSpotMarketStepSizeAndTickSize {
            pub admin: Pubkey,
            pub state: Pubkey,
            pub spot_market: Pubkey,
    }
    
        impl anchor_lang::ToAccountMetas for UpdateSpotMarketStepSizeAndTickSize {
            fn to_account_metas(
                &self,
                is_signer: Option<bool>,
            ) -> Vec<anchor_lang::solana_program::instruction::AccountMeta> {
                let mut account_metas = vec![];
                account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.admin,
                true,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.state,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.spot_market,
                false,
            ));
                account_metas
            }
        }
    
    #[cfg_attr(not(target_os="solana"), derive(Debug))]
    #[derive(AnchorSerialize)]
    pub struct UpdateSpotMarketMinOrderSize {
            pub admin: Pubkey,
            pub state: Pubkey,
            pub spot_market: Pubkey,
    }
    
        impl anchor_lang::ToAccountMetas for UpdateSpotMarketMinOrderSize {
            fn to_account_metas(
                &self,
                is_signer: Option<bool>,
            ) -> Vec<anchor_lang::solana_program::instruction::AccountMeta> {
                let mut account_metas = vec![];
                account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.admin,
                true,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.state,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.spot_market,
                false,
            ));
                account_metas
            }
        }
    
    #[cfg_attr(not(target_os="solana"), derive(Debug))]
    #[derive(AnchorSerialize)]
    pub struct UpdateSpotMarketOrdersEnabled {
            pub admin: Pubkey,
            pub state: Pubkey,
            pub spot_market: Pubkey,
    }
    
        impl anchor_lang::ToAccountMetas for UpdateSpotMarketOrdersEnabled {
            fn to_account_metas(
                &self,
                is_signer: Option<bool>,
            ) -> Vec<anchor_lang::solana_program::instruction::AccountMeta> {
                let mut account_metas = vec![];
                account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.admin,
                true,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.state,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.spot_market,
                false,
            ));
                account_metas
            }
        }
    
    #[cfg_attr(not(target_os="solana"), derive(Debug))]
    #[derive(AnchorSerialize)]
    pub struct UpdateSpotMarketIfPausedOperations {
            pub admin: Pubkey,
            pub state: Pubkey,
            pub spot_market: Pubkey,
    }
    
        impl anchor_lang::ToAccountMetas for UpdateSpotMarketIfPausedOperations {
            fn to_account_metas(
                &self,
                is_signer: Option<bool>,
            ) -> Vec<anchor_lang::solana_program::instruction::AccountMeta> {
                let mut account_metas = vec![];
                account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.admin,
                true,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.state,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.spot_market,
                false,
            ));
                account_metas
            }
        }
    
    #[cfg_attr(not(target_os="solana"), derive(Debug))]
    #[derive(AnchorSerialize)]
    pub struct UpdateSpotMarketName {
            pub admin: Pubkey,
            pub state: Pubkey,
            pub spot_market: Pubkey,
    }
    
        impl anchor_lang::ToAccountMetas for UpdateSpotMarketName {
            fn to_account_metas(
                &self,
                is_signer: Option<bool>,
            ) -> Vec<anchor_lang::solana_program::instruction::AccountMeta> {
                let mut account_metas = vec![];
                account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.admin,
                true,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.state,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.spot_market,
                false,
            ));
                account_metas
            }
        }
    
    #[cfg_attr(not(target_os="solana"), derive(Debug))]
    #[derive(AnchorSerialize)]
    pub struct UpdatePerpMarketStatus {
            pub admin: Pubkey,
            pub state: Pubkey,
            pub perp_market: Pubkey,
    }
    
        impl anchor_lang::ToAccountMetas for UpdatePerpMarketStatus {
            fn to_account_metas(
                &self,
                is_signer: Option<bool>,
            ) -> Vec<anchor_lang::solana_program::instruction::AccountMeta> {
                let mut account_metas = vec![];
                account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.admin,
                true,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.state,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.perp_market,
                false,
            ));
                account_metas
            }
        }
    
    #[cfg_attr(not(target_os="solana"), derive(Debug))]
    #[derive(AnchorSerialize)]
    pub struct UpdatePerpMarketPausedOperations {
            pub admin: Pubkey,
            pub state: Pubkey,
            pub perp_market: Pubkey,
    }
    
        impl anchor_lang::ToAccountMetas for UpdatePerpMarketPausedOperations {
            fn to_account_metas(
                &self,
                is_signer: Option<bool>,
            ) -> Vec<anchor_lang::solana_program::instruction::AccountMeta> {
                let mut account_metas = vec![];
                account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.admin,
                true,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.state,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.perp_market,
                false,
            ));
                account_metas
            }
        }
    
    #[cfg_attr(not(target_os="solana"), derive(Debug))]
    #[derive(AnchorSerialize)]
    pub struct UpdatePerpMarketContractTier {
            pub admin: Pubkey,
            pub state: Pubkey,
            pub perp_market: Pubkey,
    }
    
        impl anchor_lang::ToAccountMetas for UpdatePerpMarketContractTier {
            fn to_account_metas(
                &self,
                is_signer: Option<bool>,
            ) -> Vec<anchor_lang::solana_program::instruction::AccountMeta> {
                let mut account_metas = vec![];
                account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.admin,
                true,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.state,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.perp_market,
                false,
            ));
                account_metas
            }
        }
    
    #[cfg_attr(not(target_os="solana"), derive(Debug))]
    #[derive(AnchorSerialize)]
    pub struct UpdatePerpMarketImfFactor {
            pub admin: Pubkey,
            pub state: Pubkey,
            pub perp_market: Pubkey,
    }
    
        impl anchor_lang::ToAccountMetas for UpdatePerpMarketImfFactor {
            fn to_account_metas(
                &self,
                is_signer: Option<bool>,
            ) -> Vec<anchor_lang::solana_program::instruction::AccountMeta> {
                let mut account_metas = vec![];
                account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.admin,
                true,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.state,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.perp_market,
                false,
            ));
                account_metas
            }
        }
    
    #[cfg_attr(not(target_os="solana"), derive(Debug))]
    #[derive(AnchorSerialize)]
    pub struct UpdatePerpMarketUnrealizedAssetWeight {
            pub admin: Pubkey,
            pub state: Pubkey,
            pub perp_market: Pubkey,
    }
    
        impl anchor_lang::ToAccountMetas for UpdatePerpMarketUnrealizedAssetWeight {
            fn to_account_metas(
                &self,
                is_signer: Option<bool>,
            ) -> Vec<anchor_lang::solana_program::instruction::AccountMeta> {
                let mut account_metas = vec![];
                account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.admin,
                true,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.state,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.perp_market,
                false,
            ));
                account_metas
            }
        }
    
    #[cfg_attr(not(target_os="solana"), derive(Debug))]
    #[derive(AnchorSerialize)]
    pub struct UpdatePerpMarketConcentrationCoef {
            pub admin: Pubkey,
            pub state: Pubkey,
            pub perp_market: Pubkey,
    }
    
        impl anchor_lang::ToAccountMetas for UpdatePerpMarketConcentrationCoef {
            fn to_account_metas(
                &self,
                is_signer: Option<bool>,
            ) -> Vec<anchor_lang::solana_program::instruction::AccountMeta> {
                let mut account_metas = vec![];
                account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.admin,
                true,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.state,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.perp_market,
                false,
            ));
                account_metas
            }
        }
    
    #[cfg_attr(not(target_os="solana"), derive(Debug))]
    #[derive(AnchorSerialize)]
    pub struct UpdatePerpMarketCurveUpdateIntensity {
            pub admin: Pubkey,
            pub state: Pubkey,
            pub perp_market: Pubkey,
    }
    
        impl anchor_lang::ToAccountMetas for UpdatePerpMarketCurveUpdateIntensity {
            fn to_account_metas(
                &self,
                is_signer: Option<bool>,
            ) -> Vec<anchor_lang::solana_program::instruction::AccountMeta> {
                let mut account_metas = vec![];
                account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.admin,
                true,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.state,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.perp_market,
                false,
            ));
                account_metas
            }
        }
    
    #[cfg_attr(not(target_os="solana"), derive(Debug))]
    #[derive(AnchorSerialize)]
    pub struct UpdatePerpMarketTargetBaseAssetAmountPerLp {
            pub admin: Pubkey,
            pub state: Pubkey,
            pub perp_market: Pubkey,
    }
    
        impl anchor_lang::ToAccountMetas for UpdatePerpMarketTargetBaseAssetAmountPerLp {
            fn to_account_metas(
                &self,
                is_signer: Option<bool>,
            ) -> Vec<anchor_lang::solana_program::instruction::AccountMeta> {
                let mut account_metas = vec![];
                account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.admin,
                true,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.state,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.perp_market,
                false,
            ));
                account_metas
            }
        }
    
    #[cfg_attr(not(target_os="solana"), derive(Debug))]
    #[derive(AnchorSerialize)]
    pub struct UpdatePerpMarketPerLpBase {
            pub admin: Pubkey,
            pub state: Pubkey,
            pub perp_market: Pubkey,
    }
    
        impl anchor_lang::ToAccountMetas for UpdatePerpMarketPerLpBase {
            fn to_account_metas(
                &self,
                is_signer: Option<bool>,
            ) -> Vec<anchor_lang::solana_program::instruction::AccountMeta> {
                let mut account_metas = vec![];
                account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.admin,
                true,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.state,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.perp_market,
                false,
            ));
                account_metas
            }
        }
    
    #[cfg_attr(not(target_os="solana"), derive(Debug))]
    #[derive(AnchorSerialize)]
    pub struct UpdateLpCooldownTime {
            pub admin: Pubkey,
            pub state: Pubkey,
    }
    
        impl anchor_lang::ToAccountMetas for UpdateLpCooldownTime {
            fn to_account_metas(
                &self,
                is_signer: Option<bool>,
            ) -> Vec<anchor_lang::solana_program::instruction::AccountMeta> {
                let mut account_metas = vec![];
                account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.admin,
                true,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.state,
                false,
            ));
                account_metas
            }
        }
    
    #[cfg_attr(not(target_os="solana"), derive(Debug))]
    #[derive(AnchorSerialize)]
    pub struct UpdatePerpFeeStructure {
            pub admin: Pubkey,
            pub state: Pubkey,
    }
    
        impl anchor_lang::ToAccountMetas for UpdatePerpFeeStructure {
            fn to_account_metas(
                &self,
                is_signer: Option<bool>,
            ) -> Vec<anchor_lang::solana_program::instruction::AccountMeta> {
                let mut account_metas = vec![];
                account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.admin,
                true,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.state,
                false,
            ));
                account_metas
            }
        }
    
    #[cfg_attr(not(target_os="solana"), derive(Debug))]
    #[derive(AnchorSerialize)]
    pub struct UpdateSpotFeeStructure {
            pub admin: Pubkey,
            pub state: Pubkey,
    }
    
        impl anchor_lang::ToAccountMetas for UpdateSpotFeeStructure {
            fn to_account_metas(
                &self,
                is_signer: Option<bool>,
            ) -> Vec<anchor_lang::solana_program::instruction::AccountMeta> {
                let mut account_metas = vec![];
                account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.admin,
                true,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.state,
                false,
            ));
                account_metas
            }
        }
    
    #[cfg_attr(not(target_os="solana"), derive(Debug))]
    #[derive(AnchorSerialize)]
    pub struct UpdateInitialPctToLiquidate {
            pub admin: Pubkey,
            pub state: Pubkey,
    }
    
        impl anchor_lang::ToAccountMetas for UpdateInitialPctToLiquidate {
            fn to_account_metas(
                &self,
                is_signer: Option<bool>,
            ) -> Vec<anchor_lang::solana_program::instruction::AccountMeta> {
                let mut account_metas = vec![];
                account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.admin,
                true,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.state,
                false,
            ));
                account_metas
            }
        }
    
    #[cfg_attr(not(target_os="solana"), derive(Debug))]
    #[derive(AnchorSerialize)]
    pub struct UpdateLiquidationDuration {
            pub admin: Pubkey,
            pub state: Pubkey,
    }
    
        impl anchor_lang::ToAccountMetas for UpdateLiquidationDuration {
            fn to_account_metas(
                &self,
                is_signer: Option<bool>,
            ) -> Vec<anchor_lang::solana_program::instruction::AccountMeta> {
                let mut account_metas = vec![];
                account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.admin,
                true,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.state,
                false,
            ));
                account_metas
            }
        }
    
    #[cfg_attr(not(target_os="solana"), derive(Debug))]
    #[derive(AnchorSerialize)]
    pub struct UpdateLiquidationMarginBufferRatio {
            pub admin: Pubkey,
            pub state: Pubkey,
    }
    
        impl anchor_lang::ToAccountMetas for UpdateLiquidationMarginBufferRatio {
            fn to_account_metas(
                &self,
                is_signer: Option<bool>,
            ) -> Vec<anchor_lang::solana_program::instruction::AccountMeta> {
                let mut account_metas = vec![];
                account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.admin,
                true,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.state,
                false,
            ));
                account_metas
            }
        }
    
    #[cfg_attr(not(target_os="solana"), derive(Debug))]
    #[derive(AnchorSerialize)]
    pub struct UpdateOracleGuardRails {
            pub admin: Pubkey,
            pub state: Pubkey,
    }
    
        impl anchor_lang::ToAccountMetas for UpdateOracleGuardRails {
            fn to_account_metas(
                &self,
                is_signer: Option<bool>,
            ) -> Vec<anchor_lang::solana_program::instruction::AccountMeta> {
                let mut account_metas = vec![];
                account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.admin,
                true,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.state,
                false,
            ));
                account_metas
            }
        }
    
    #[cfg_attr(not(target_os="solana"), derive(Debug))]
    #[derive(AnchorSerialize)]
    pub struct UpdateStateSettlementDuration {
            pub admin: Pubkey,
            pub state: Pubkey,
    }
    
        impl anchor_lang::ToAccountMetas for UpdateStateSettlementDuration {
            fn to_account_metas(
                &self,
                is_signer: Option<bool>,
            ) -> Vec<anchor_lang::solana_program::instruction::AccountMeta> {
                let mut account_metas = vec![];
                account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.admin,
                true,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.state,
                false,
            ));
                account_metas
            }
        }
    
    #[cfg_attr(not(target_os="solana"), derive(Debug))]
    #[derive(AnchorSerialize)]
    pub struct UpdateStateMaxNumberOfSubAccounts {
            pub admin: Pubkey,
            pub state: Pubkey,
    }
    
        impl anchor_lang::ToAccountMetas for UpdateStateMaxNumberOfSubAccounts {
            fn to_account_metas(
                &self,
                is_signer: Option<bool>,
            ) -> Vec<anchor_lang::solana_program::instruction::AccountMeta> {
                let mut account_metas = vec![];
                account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.admin,
                true,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.state,
                false,
            ));
                account_metas
            }
        }
    
    #[cfg_attr(not(target_os="solana"), derive(Debug))]
    #[derive(AnchorSerialize)]
    pub struct UpdateStateMaxInitializeUserFee {
            pub admin: Pubkey,
            pub state: Pubkey,
    }
    
        impl anchor_lang::ToAccountMetas for UpdateStateMaxInitializeUserFee {
            fn to_account_metas(
                &self,
                is_signer: Option<bool>,
            ) -> Vec<anchor_lang::solana_program::instruction::AccountMeta> {
                let mut account_metas = vec![];
                account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.admin,
                true,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.state,
                false,
            ));
                account_metas
            }
        }
    
    #[cfg_attr(not(target_os="solana"), derive(Debug))]
    #[derive(AnchorSerialize)]
    pub struct UpdatePerpMarketOracle {
            pub state: Pubkey,
            pub perp_market: Pubkey,
            pub oracle: Pubkey,
            pub admin: Pubkey,
    }
    
        impl anchor_lang::ToAccountMetas for UpdatePerpMarketOracle {
            fn to_account_metas(
                &self,
                is_signer: Option<bool>,
            ) -> Vec<anchor_lang::solana_program::instruction::AccountMeta> {
                let mut account_metas = vec![];
                account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.state,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.perp_market,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.oracle,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.admin,
                true,
            ));
                account_metas
            }
        }
    
    #[cfg_attr(not(target_os="solana"), derive(Debug))]
    #[derive(AnchorSerialize)]
    pub struct UpdatePerpMarketBaseSpread {
            pub admin: Pubkey,
            pub state: Pubkey,
            pub perp_market: Pubkey,
    }
    
        impl anchor_lang::ToAccountMetas for UpdatePerpMarketBaseSpread {
            fn to_account_metas(
                &self,
                is_signer: Option<bool>,
            ) -> Vec<anchor_lang::solana_program::instruction::AccountMeta> {
                let mut account_metas = vec![];
                account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.admin,
                true,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.state,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.perp_market,
                false,
            ));
                account_metas
            }
        }
    
    #[cfg_attr(not(target_os="solana"), derive(Debug))]
    #[derive(AnchorSerialize)]
    pub struct UpdateAmmJitIntensity {
            pub admin: Pubkey,
            pub state: Pubkey,
            pub perp_market: Pubkey,
    }
    
        impl anchor_lang::ToAccountMetas for UpdateAmmJitIntensity {
            fn to_account_metas(
                &self,
                is_signer: Option<bool>,
            ) -> Vec<anchor_lang::solana_program::instruction::AccountMeta> {
                let mut account_metas = vec![];
                account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.admin,
                true,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.state,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.perp_market,
                false,
            ));
                account_metas
            }
        }
    
    #[cfg_attr(not(target_os="solana"), derive(Debug))]
    #[derive(AnchorSerialize)]
    pub struct UpdatePerpMarketMaxSpread {
            pub admin: Pubkey,
            pub state: Pubkey,
            pub perp_market: Pubkey,
    }
    
        impl anchor_lang::ToAccountMetas for UpdatePerpMarketMaxSpread {
            fn to_account_metas(
                &self,
                is_signer: Option<bool>,
            ) -> Vec<anchor_lang::solana_program::instruction::AccountMeta> {
                let mut account_metas = vec![];
                account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.admin,
                true,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.state,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.perp_market,
                false,
            ));
                account_metas
            }
        }
    
    #[cfg_attr(not(target_os="solana"), derive(Debug))]
    #[derive(AnchorSerialize)]
    pub struct UpdatePerpMarketStepSizeAndTickSize {
            pub admin: Pubkey,
            pub state: Pubkey,
            pub perp_market: Pubkey,
    }
    
        impl anchor_lang::ToAccountMetas for UpdatePerpMarketStepSizeAndTickSize {
            fn to_account_metas(
                &self,
                is_signer: Option<bool>,
            ) -> Vec<anchor_lang::solana_program::instruction::AccountMeta> {
                let mut account_metas = vec![];
                account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.admin,
                true,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.state,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.perp_market,
                false,
            ));
                account_metas
            }
        }
    
    #[cfg_attr(not(target_os="solana"), derive(Debug))]
    #[derive(AnchorSerialize)]
    pub struct UpdatePerpMarketName {
            pub admin: Pubkey,
            pub state: Pubkey,
            pub perp_market: Pubkey,
    }
    
        impl anchor_lang::ToAccountMetas for UpdatePerpMarketName {
            fn to_account_metas(
                &self,
                is_signer: Option<bool>,
            ) -> Vec<anchor_lang::solana_program::instruction::AccountMeta> {
                let mut account_metas = vec![];
                account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.admin,
                true,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.state,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.perp_market,
                false,
            ));
                account_metas
            }
        }
    
    #[cfg_attr(not(target_os="solana"), derive(Debug))]
    #[derive(AnchorSerialize)]
    pub struct UpdatePerpMarketMinOrderSize {
            pub admin: Pubkey,
            pub state: Pubkey,
            pub perp_market: Pubkey,
    }
    
        impl anchor_lang::ToAccountMetas for UpdatePerpMarketMinOrderSize {
            fn to_account_metas(
                &self,
                is_signer: Option<bool>,
            ) -> Vec<anchor_lang::solana_program::instruction::AccountMeta> {
                let mut account_metas = vec![];
                account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.admin,
                true,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.state,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.perp_market,
                false,
            ));
                account_metas
            }
        }
    
    #[cfg_attr(not(target_os="solana"), derive(Debug))]
    #[derive(AnchorSerialize)]
    pub struct UpdatePerpMarketMaxSlippageRatio {
            pub admin: Pubkey,
            pub state: Pubkey,
            pub perp_market: Pubkey,
    }
    
        impl anchor_lang::ToAccountMetas for UpdatePerpMarketMaxSlippageRatio {
            fn to_account_metas(
                &self,
                is_signer: Option<bool>,
            ) -> Vec<anchor_lang::solana_program::instruction::AccountMeta> {
                let mut account_metas = vec![];
                account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.admin,
                true,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.state,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.perp_market,
                false,
            ));
                account_metas
            }
        }
    
    #[cfg_attr(not(target_os="solana"), derive(Debug))]
    #[derive(AnchorSerialize)]
    pub struct UpdatePerpMarketMaxFillReserveFraction {
            pub admin: Pubkey,
            pub state: Pubkey,
            pub perp_market: Pubkey,
    }
    
        impl anchor_lang::ToAccountMetas for UpdatePerpMarketMaxFillReserveFraction {
            fn to_account_metas(
                &self,
                is_signer: Option<bool>,
            ) -> Vec<anchor_lang::solana_program::instruction::AccountMeta> {
                let mut account_metas = vec![];
                account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.admin,
                true,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.state,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.perp_market,
                false,
            ));
                account_metas
            }
        }
    
    #[cfg_attr(not(target_os="solana"), derive(Debug))]
    #[derive(AnchorSerialize)]
    pub struct UpdatePerpMarketMaxOpenInterest {
            pub admin: Pubkey,
            pub state: Pubkey,
            pub perp_market: Pubkey,
    }
    
        impl anchor_lang::ToAccountMetas for UpdatePerpMarketMaxOpenInterest {
            fn to_account_metas(
                &self,
                is_signer: Option<bool>,
            ) -> Vec<anchor_lang::solana_program::instruction::AccountMeta> {
                let mut account_metas = vec![];
                account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.admin,
                true,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.state,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.perp_market,
                false,
            ));
                account_metas
            }
        }
    
    #[cfg_attr(not(target_os="solana"), derive(Debug))]
    #[derive(AnchorSerialize)]
    pub struct UpdatePerpMarketNumberOfUsers {
            pub admin: Pubkey,
            pub state: Pubkey,
            pub perp_market: Pubkey,
    }
    
        impl anchor_lang::ToAccountMetas for UpdatePerpMarketNumberOfUsers {
            fn to_account_metas(
                &self,
                is_signer: Option<bool>,
            ) -> Vec<anchor_lang::solana_program::instruction::AccountMeta> {
                let mut account_metas = vec![];
                account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.admin,
                true,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.state,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.perp_market,
                false,
            ));
                account_metas
            }
        }
    
    #[cfg_attr(not(target_os="solana"), derive(Debug))]
    #[derive(AnchorSerialize)]
    pub struct UpdatePerpMarketFeeAdjustment {
            pub admin: Pubkey,
            pub state: Pubkey,
            pub perp_market: Pubkey,
    }
    
        impl anchor_lang::ToAccountMetas for UpdatePerpMarketFeeAdjustment {
            fn to_account_metas(
                &self,
                is_signer: Option<bool>,
            ) -> Vec<anchor_lang::solana_program::instruction::AccountMeta> {
                let mut account_metas = vec![];
                account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.admin,
                true,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.state,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.perp_market,
                false,
            ));
                account_metas
            }
        }
    
    #[cfg_attr(not(target_os="solana"), derive(Debug))]
    #[derive(AnchorSerialize)]
    pub struct UpdateSpotMarketFeeAdjustment {
            pub admin: Pubkey,
            pub state: Pubkey,
            pub spot_market: Pubkey,
    }
    
        impl anchor_lang::ToAccountMetas for UpdateSpotMarketFeeAdjustment {
            fn to_account_metas(
                &self,
                is_signer: Option<bool>,
            ) -> Vec<anchor_lang::solana_program::instruction::AccountMeta> {
                let mut account_metas = vec![];
                account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.admin,
                true,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.state,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.spot_market,
                false,
            ));
                account_metas
            }
        }
    
    #[cfg_attr(not(target_os="solana"), derive(Debug))]
    #[derive(AnchorSerialize)]
    pub struct UpdatePerpMarketFuel {
            pub admin: Pubkey,
            pub state: Pubkey,
            pub perp_market: Pubkey,
    }
    
        impl anchor_lang::ToAccountMetas for UpdatePerpMarketFuel {
            fn to_account_metas(
                &self,
                is_signer: Option<bool>,
            ) -> Vec<anchor_lang::solana_program::instruction::AccountMeta> {
                let mut account_metas = vec![];
                account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.admin,
                true,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.state,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.perp_market,
                false,
            ));
                account_metas
            }
        }
    
    #[cfg_attr(not(target_os="solana"), derive(Debug))]
    #[derive(AnchorSerialize)]
    pub struct UpdateSpotMarketFuel {
            pub admin: Pubkey,
            pub state: Pubkey,
            pub spot_market: Pubkey,
    }
    
        impl anchor_lang::ToAccountMetas for UpdateSpotMarketFuel {
            fn to_account_metas(
                &self,
                is_signer: Option<bool>,
            ) -> Vec<anchor_lang::solana_program::instruction::AccountMeta> {
                let mut account_metas = vec![];
                account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.admin,
                true,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.state,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.spot_market,
                false,
            ));
                account_metas
            }
        }
    
    #[cfg_attr(not(target_os="solana"), derive(Debug))]
    #[derive(AnchorSerialize)]
    pub struct InitUserFuel {
            pub admin: Pubkey,
            pub state: Pubkey,
            pub user: Pubkey,
            pub user_stats: Pubkey,
    }
    
        impl anchor_lang::ToAccountMetas for InitUserFuel {
            fn to_account_metas(
                &self,
                is_signer: Option<bool>,
            ) -> Vec<anchor_lang::solana_program::instruction::AccountMeta> {
                let mut account_metas = vec![];
                account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.admin,
                true,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.state,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.user,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.user_stats,
                false,
            ));
                account_metas
            }
        }
    
    #[cfg_attr(not(target_os="solana"), derive(Debug))]
    #[derive(AnchorSerialize)]
    pub struct UpdateAdmin {
            pub admin: Pubkey,
            pub state: Pubkey,
    }
    
        impl anchor_lang::ToAccountMetas for UpdateAdmin {
            fn to_account_metas(
                &self,
                is_signer: Option<bool>,
            ) -> Vec<anchor_lang::solana_program::instruction::AccountMeta> {
                let mut account_metas = vec![];
                account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.admin,
                true,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.state,
                false,
            ));
                account_metas
            }
        }
    
    #[cfg_attr(not(target_os="solana"), derive(Debug))]
    #[derive(AnchorSerialize)]
    pub struct UpdateWhitelistMint {
            pub admin: Pubkey,
            pub state: Pubkey,
    }
    
        impl anchor_lang::ToAccountMetas for UpdateWhitelistMint {
            fn to_account_metas(
                &self,
                is_signer: Option<bool>,
            ) -> Vec<anchor_lang::solana_program::instruction::AccountMeta> {
                let mut account_metas = vec![];
                account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.admin,
                true,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.state,
                false,
            ));
                account_metas
            }
        }
    
    #[cfg_attr(not(target_os="solana"), derive(Debug))]
    #[derive(AnchorSerialize)]
    pub struct UpdateDiscountMint {
            pub admin: Pubkey,
            pub state: Pubkey,
    }
    
        impl anchor_lang::ToAccountMetas for UpdateDiscountMint {
            fn to_account_metas(
                &self,
                is_signer: Option<bool>,
            ) -> Vec<anchor_lang::solana_program::instruction::AccountMeta> {
                let mut account_metas = vec![];
                account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.admin,
                true,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.state,
                false,
            ));
                account_metas
            }
        }
    
    #[cfg_attr(not(target_os="solana"), derive(Debug))]
    #[derive(AnchorSerialize)]
    pub struct UpdateExchangeStatus {
            pub admin: Pubkey,
            pub state: Pubkey,
    }
    
        impl anchor_lang::ToAccountMetas for UpdateExchangeStatus {
            fn to_account_metas(
                &self,
                is_signer: Option<bool>,
            ) -> Vec<anchor_lang::solana_program::instruction::AccountMeta> {
                let mut account_metas = vec![];
                account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.admin,
                true,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.state,
                false,
            ));
                account_metas
            }
        }
    
    #[cfg_attr(not(target_os="solana"), derive(Debug))]
    #[derive(AnchorSerialize)]
    pub struct UpdatePerpAuctionDuration {
            pub admin: Pubkey,
            pub state: Pubkey,
    }
    
        impl anchor_lang::ToAccountMetas for UpdatePerpAuctionDuration {
            fn to_account_metas(
                &self,
                is_signer: Option<bool>,
            ) -> Vec<anchor_lang::solana_program::instruction::AccountMeta> {
                let mut account_metas = vec![];
                account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.admin,
                true,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.state,
                false,
            ));
                account_metas
            }
        }
    
    #[cfg_attr(not(target_os="solana"), derive(Debug))]
    #[derive(AnchorSerialize)]
    pub struct UpdateSpotAuctionDuration {
            pub admin: Pubkey,
            pub state: Pubkey,
    }
    
        impl anchor_lang::ToAccountMetas for UpdateSpotAuctionDuration {
            fn to_account_metas(
                &self,
                is_signer: Option<bool>,
            ) -> Vec<anchor_lang::solana_program::instruction::AccountMeta> {
                let mut account_metas = vec![];
                account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.admin,
                true,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.state,
                false,
            ));
                account_metas
            }
        }
    
    #[cfg_attr(not(target_os="solana"), derive(Debug))]
    #[derive(AnchorSerialize)]
    pub struct InitializeProtocolIfSharesTransferConfig {
            pub admin: Pubkey,
            pub protocol_if_shares_transfer_config: Pubkey,
            pub state: Pubkey,
            pub rent: Pubkey,
            pub system_program: Pubkey,
    }
    
        impl anchor_lang::ToAccountMetas for InitializeProtocolIfSharesTransferConfig {
            fn to_account_metas(
                &self,
                is_signer: Option<bool>,
            ) -> Vec<anchor_lang::solana_program::instruction::AccountMeta> {
                let mut account_metas = vec![];
                account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.admin,
                true,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.protocol_if_shares_transfer_config,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.state,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.rent,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.system_program,
                false,
            ));
                account_metas
            }
        }
    
    #[cfg_attr(not(target_os="solana"), derive(Debug))]
    #[derive(AnchorSerialize)]
    pub struct UpdateProtocolIfSharesTransferConfig {
            pub admin: Pubkey,
            pub protocol_if_shares_transfer_config: Pubkey,
            pub state: Pubkey,
    }
    
        impl anchor_lang::ToAccountMetas for UpdateProtocolIfSharesTransferConfig {
            fn to_account_metas(
                &self,
                is_signer: Option<bool>,
            ) -> Vec<anchor_lang::solana_program::instruction::AccountMeta> {
                let mut account_metas = vec![];
                account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.admin,
                true,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.protocol_if_shares_transfer_config,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.state,
                false,
            ));
                account_metas
            }
        }
    
    #[cfg_attr(not(target_os="solana"), derive(Debug))]
    #[derive(AnchorSerialize)]
    pub struct InitializePrelaunchOracle {
            pub admin: Pubkey,
            pub prelaunch_oracle: Pubkey,
            pub state: Pubkey,
            pub rent: Pubkey,
            pub system_program: Pubkey,
    }
    
        impl anchor_lang::ToAccountMetas for InitializePrelaunchOracle {
            fn to_account_metas(
                &self,
                is_signer: Option<bool>,
            ) -> Vec<anchor_lang::solana_program::instruction::AccountMeta> {
                let mut account_metas = vec![];
                account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.admin,
                true,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.prelaunch_oracle,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.state,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.rent,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.system_program,
                false,
            ));
                account_metas
            }
        }
    
    #[cfg_attr(not(target_os="solana"), derive(Debug))]
    #[derive(AnchorSerialize)]
    pub struct UpdatePrelaunchOracleParams {
            pub admin: Pubkey,
            pub prelaunch_oracle: Pubkey,
            pub perp_market: Pubkey,
            pub state: Pubkey,
    }
    
        impl anchor_lang::ToAccountMetas for UpdatePrelaunchOracleParams {
            fn to_account_metas(
                &self,
                is_signer: Option<bool>,
            ) -> Vec<anchor_lang::solana_program::instruction::AccountMeta> {
                let mut account_metas = vec![];
                account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.admin,
                true,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.prelaunch_oracle,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.perp_market,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.state,
                false,
            ));
                account_metas
            }
        }
    
    #[cfg_attr(not(target_os="solana"), derive(Debug))]
    #[derive(AnchorSerialize)]
    pub struct DeletePrelaunchOracle {
            pub admin: Pubkey,
            pub prelaunch_oracle: Pubkey,
            pub perp_market: Pubkey,
            pub state: Pubkey,
    }
    
        impl anchor_lang::ToAccountMetas for DeletePrelaunchOracle {
            fn to_account_metas(
                &self,
                is_signer: Option<bool>,
            ) -> Vec<anchor_lang::solana_program::instruction::AccountMeta> {
                let mut account_metas = vec![];
                account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.admin,
                true,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.prelaunch_oracle,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.perp_market,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.state,
                false,
            ));
                account_metas
            }
        }
    
    #[cfg_attr(not(target_os="solana"), derive(Debug))]
    #[derive(AnchorSerialize)]
    pub struct InitializePythPullOracle {
            pub admin: Pubkey,
            pub pyth_solana_receiver: Pubkey,
            pub price_feed: Pubkey,
            pub system_program: Pubkey,
            pub state: Pubkey,
    }
    
        impl anchor_lang::ToAccountMetas for InitializePythPullOracle {
            fn to_account_metas(
                &self,
                is_signer: Option<bool>,
            ) -> Vec<anchor_lang::solana_program::instruction::AccountMeta> {
                let mut account_metas = vec![];
                account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.admin,
                true,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.pyth_solana_receiver,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.price_feed,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.system_program,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.state,
                false,
            ));
                account_metas
            }
        }
}

// I11n
#[cfg(all(target_os = "solana", feature="i11n"))]
pub mod i11n {
    use anchor_lang::prelude::*;
    use anchor_i11n::prelude::*;
    use anchor_lang::Discriminator;
    use super::{instructions::*, ID};

    // InitializeUser
    #[derive(TryFromInstruction)]
    pub struct InitializeUserI11n<'info> {
        pub accounts: InitializeUserAccountMetas<'info>,
        pub args: InitializeUser,
        pub remaining_accounts: Vec<&'info AccountMeta>,
    }

    // InitializeUserStats
    #[derive(TryFromInstruction)]
    pub struct InitializeUserStatsI11n<'info> {
        pub accounts: InitializeUserStatsAccountMetas<'info>,
        pub args: InitializeUserStats,
        pub remaining_accounts: Vec<&'info AccountMeta>,
    }

    // InitializeReferrerName
    #[derive(TryFromInstruction)]
    pub struct InitializeReferrerNameI11n<'info> {
        pub accounts: InitializeReferrerNameAccountMetas<'info>,
        pub args: InitializeReferrerName,
        pub remaining_accounts: Vec<&'info AccountMeta>,
    }

    // Deposit
    #[derive(TryFromInstruction)]
    pub struct DepositI11n<'info> {
        pub accounts: DepositAccountMetas<'info>,
        pub args: Deposit,
        pub remaining_accounts: Vec<&'info AccountMeta>,
    }

    // Withdraw
    #[derive(TryFromInstruction)]
    pub struct WithdrawI11n<'info> {
        pub accounts: WithdrawAccountMetas<'info>,
        pub args: Withdraw,
        pub remaining_accounts: Vec<&'info AccountMeta>,
    }

    // TransferDeposit
    #[derive(TryFromInstruction)]
    pub struct TransferDepositI11n<'info> {
        pub accounts: TransferDepositAccountMetas<'info>,
        pub args: TransferDeposit,
        pub remaining_accounts: Vec<&'info AccountMeta>,
    }

    // PlacePerpOrder
    #[derive(TryFromInstruction)]
    pub struct PlacePerpOrderI11n<'info> {
        pub accounts: PlacePerpOrderAccountMetas<'info>,
        pub args: PlacePerpOrder,
        pub remaining_accounts: Vec<&'info AccountMeta>,
    }

    // CancelOrder
    #[derive(TryFromInstruction)]
    pub struct CancelOrderI11n<'info> {
        pub accounts: CancelOrderAccountMetas<'info>,
        pub args: CancelOrder,
        pub remaining_accounts: Vec<&'info AccountMeta>,
    }

    // CancelOrderByUserId
    #[derive(TryFromInstruction)]
    pub struct CancelOrderByUserIdI11n<'info> {
        pub accounts: CancelOrderByUserIdAccountMetas<'info>,
        pub args: CancelOrderByUserId,
        pub remaining_accounts: Vec<&'info AccountMeta>,
    }

    // CancelOrders
    #[derive(TryFromInstruction)]
    pub struct CancelOrdersI11n<'info> {
        pub accounts: CancelOrdersAccountMetas<'info>,
        pub args: CancelOrders,
        pub remaining_accounts: Vec<&'info AccountMeta>,
    }

    // CancelOrdersByIds
    #[derive(TryFromInstruction)]
    pub struct CancelOrdersByIdsI11n<'info> {
        pub accounts: CancelOrdersByIdsAccountMetas<'info>,
        pub args: CancelOrdersByIds,
        pub remaining_accounts: Vec<&'info AccountMeta>,
    }

    // ModifyOrder
    #[derive(TryFromInstruction)]
    pub struct ModifyOrderI11n<'info> {
        pub accounts: ModifyOrderAccountMetas<'info>,
        pub args: ModifyOrder,
        pub remaining_accounts: Vec<&'info AccountMeta>,
    }

    // ModifyOrderByUserId
    #[derive(TryFromInstruction)]
    pub struct ModifyOrderByUserIdI11n<'info> {
        pub accounts: ModifyOrderByUserIdAccountMetas<'info>,
        pub args: ModifyOrderByUserId,
        pub remaining_accounts: Vec<&'info AccountMeta>,
    }

    // PlaceAndTakePerpOrder
    #[derive(TryFromInstruction)]
    pub struct PlaceAndTakePerpOrderI11n<'info> {
        pub accounts: PlaceAndTakePerpOrderAccountMetas<'info>,
        pub args: PlaceAndTakePerpOrder,
        pub remaining_accounts: Vec<&'info AccountMeta>,
    }

    // PlaceAndMakePerpOrder
    #[derive(TryFromInstruction)]
    pub struct PlaceAndMakePerpOrderI11n<'info> {
        pub accounts: PlaceAndMakePerpOrderAccountMetas<'info>,
        pub args: PlaceAndMakePerpOrder,
        pub remaining_accounts: Vec<&'info AccountMeta>,
    }

    // PlaceSpotOrder
    #[derive(TryFromInstruction)]
    pub struct PlaceSpotOrderI11n<'info> {
        pub accounts: PlaceSpotOrderAccountMetas<'info>,
        pub args: PlaceSpotOrder,
        pub remaining_accounts: Vec<&'info AccountMeta>,
    }

    // PlaceAndTakeSpotOrder
    #[derive(TryFromInstruction)]
    pub struct PlaceAndTakeSpotOrderI11n<'info> {
        pub accounts: PlaceAndTakeSpotOrderAccountMetas<'info>,
        pub args: PlaceAndTakeSpotOrder,
        pub remaining_accounts: Vec<&'info AccountMeta>,
    }

    // PlaceAndMakeSpotOrder
    #[derive(TryFromInstruction)]
    pub struct PlaceAndMakeSpotOrderI11n<'info> {
        pub accounts: PlaceAndMakeSpotOrderAccountMetas<'info>,
        pub args: PlaceAndMakeSpotOrder,
        pub remaining_accounts: Vec<&'info AccountMeta>,
    }

    // PlaceOrders
    #[derive(TryFromInstruction)]
    pub struct PlaceOrdersI11n<'info> {
        pub accounts: PlaceOrdersAccountMetas<'info>,
        pub args: PlaceOrders,
        pub remaining_accounts: Vec<&'info AccountMeta>,
    }

    // BeginSwap
    #[derive(TryFromInstruction)]
    pub struct BeginSwapI11n<'info> {
        pub accounts: BeginSwapAccountMetas<'info>,
        pub args: BeginSwap,
        pub remaining_accounts: Vec<&'info AccountMeta>,
    }

    // EndSwap
    #[derive(TryFromInstruction)]
    pub struct EndSwapI11n<'info> {
        pub accounts: EndSwapAccountMetas<'info>,
        pub args: EndSwap,
        pub remaining_accounts: Vec<&'info AccountMeta>,
    }

    // AddPerpLpShares
    #[derive(TryFromInstruction)]
    pub struct AddPerpLpSharesI11n<'info> {
        pub accounts: AddPerpLpSharesAccountMetas<'info>,
        pub args: AddPerpLpShares,
        pub remaining_accounts: Vec<&'info AccountMeta>,
    }

    // RemovePerpLpShares
    #[derive(TryFromInstruction)]
    pub struct RemovePerpLpSharesI11n<'info> {
        pub accounts: RemovePerpLpSharesAccountMetas<'info>,
        pub args: RemovePerpLpShares,
        pub remaining_accounts: Vec<&'info AccountMeta>,
    }

    // RemovePerpLpSharesInExpiringMarket
    #[derive(TryFromInstruction)]
    pub struct RemovePerpLpSharesInExpiringMarketI11n<'info> {
        pub accounts: RemovePerpLpSharesInExpiringMarketAccountMetas<'info>,
        pub args: RemovePerpLpSharesInExpiringMarket,
        pub remaining_accounts: Vec<&'info AccountMeta>,
    }

    // UpdateUserName
    #[derive(TryFromInstruction)]
    pub struct UpdateUserNameI11n<'info> {
        pub accounts: UpdateUserNameAccountMetas<'info>,
        pub args: UpdateUserName,
        pub remaining_accounts: Vec<&'info AccountMeta>,
    }

    // UpdateUserCustomMarginRatio
    #[derive(TryFromInstruction)]
    pub struct UpdateUserCustomMarginRatioI11n<'info> {
        pub accounts: UpdateUserCustomMarginRatioAccountMetas<'info>,
        pub args: UpdateUserCustomMarginRatio,
        pub remaining_accounts: Vec<&'info AccountMeta>,
    }

    // UpdateUserMarginTradingEnabled
    #[derive(TryFromInstruction)]
    pub struct UpdateUserMarginTradingEnabledI11n<'info> {
        pub accounts: UpdateUserMarginTradingEnabledAccountMetas<'info>,
        pub args: UpdateUserMarginTradingEnabled,
        pub remaining_accounts: Vec<&'info AccountMeta>,
    }

    // UpdateUserDelegate
    #[derive(TryFromInstruction)]
    pub struct UpdateUserDelegateI11n<'info> {
        pub accounts: UpdateUserDelegateAccountMetas<'info>,
        pub args: UpdateUserDelegate,
        pub remaining_accounts: Vec<&'info AccountMeta>,
    }

    // UpdateUserReduceOnly
    #[derive(TryFromInstruction)]
    pub struct UpdateUserReduceOnlyI11n<'info> {
        pub accounts: UpdateUserReduceOnlyAccountMetas<'info>,
        pub args: UpdateUserReduceOnly,
        pub remaining_accounts: Vec<&'info AccountMeta>,
    }

    // UpdateUserAdvancedLp
    #[derive(TryFromInstruction)]
    pub struct UpdateUserAdvancedLpI11n<'info> {
        pub accounts: UpdateUserAdvancedLpAccountMetas<'info>,
        pub args: UpdateUserAdvancedLp,
        pub remaining_accounts: Vec<&'info AccountMeta>,
    }

    // DeleteUser
    #[derive(TryFromInstruction)]
    pub struct DeleteUserI11n<'info> {
        pub accounts: DeleteUserAccountMetas<'info>,
        pub args: DeleteUser,
        pub remaining_accounts: Vec<&'info AccountMeta>,
    }

    // ReclaimRent
    #[derive(TryFromInstruction)]
    pub struct ReclaimRentI11n<'info> {
        pub accounts: ReclaimRentAccountMetas<'info>,
        pub args: ReclaimRent,
        pub remaining_accounts: Vec<&'info AccountMeta>,
    }

    // FillPerpOrder
    #[derive(TryFromInstruction)]
    pub struct FillPerpOrderI11n<'info> {
        pub accounts: FillPerpOrderAccountMetas<'info>,
        pub args: FillPerpOrder,
        pub remaining_accounts: Vec<&'info AccountMeta>,
    }

    // RevertFill
    #[derive(TryFromInstruction)]
    pub struct RevertFillI11n<'info> {
        pub accounts: RevertFillAccountMetas<'info>,
        pub args: RevertFill,
        pub remaining_accounts: Vec<&'info AccountMeta>,
    }

    // FillSpotOrder
    #[derive(TryFromInstruction)]
    pub struct FillSpotOrderI11n<'info> {
        pub accounts: FillSpotOrderAccountMetas<'info>,
        pub args: FillSpotOrder,
        pub remaining_accounts: Vec<&'info AccountMeta>,
    }

    // TriggerOrder
    #[derive(TryFromInstruction)]
    pub struct TriggerOrderI11n<'info> {
        pub accounts: TriggerOrderAccountMetas<'info>,
        pub args: TriggerOrder,
        pub remaining_accounts: Vec<&'info AccountMeta>,
    }

    // ForceCancelOrders
    #[derive(TryFromInstruction)]
    pub struct ForceCancelOrdersI11n<'info> {
        pub accounts: ForceCancelOrdersAccountMetas<'info>,
        pub args: ForceCancelOrders,
        pub remaining_accounts: Vec<&'info AccountMeta>,
    }

    // UpdateUserIdle
    #[derive(TryFromInstruction)]
    pub struct UpdateUserIdleI11n<'info> {
        pub accounts: UpdateUserIdleAccountMetas<'info>,
        pub args: UpdateUserIdle,
        pub remaining_accounts: Vec<&'info AccountMeta>,
    }

    // UpdateUserOpenOrdersCount
    #[derive(TryFromInstruction)]
    pub struct UpdateUserOpenOrdersCountI11n<'info> {
        pub accounts: UpdateUserOpenOrdersCountAccountMetas<'info>,
        pub args: UpdateUserOpenOrdersCount,
        pub remaining_accounts: Vec<&'info AccountMeta>,
    }

    // AdminDisableUpdatePerpBidAskTwap
    #[derive(TryFromInstruction)]
    pub struct AdminDisableUpdatePerpBidAskTwapI11n<'info> {
        pub accounts: AdminDisableUpdatePerpBidAskTwapAccountMetas<'info>,
        pub args: AdminDisableUpdatePerpBidAskTwap,
        pub remaining_accounts: Vec<&'info AccountMeta>,
    }

    // SettlePnl
    #[derive(TryFromInstruction)]
    pub struct SettlePnlI11n<'info> {
        pub accounts: SettlePnlAccountMetas<'info>,
        pub args: SettlePnl,
        pub remaining_accounts: Vec<&'info AccountMeta>,
    }

    // SettleMultiplePnls
    #[derive(TryFromInstruction)]
    pub struct SettleMultiplePnlsI11n<'info> {
        pub accounts: SettleMultiplePnlsAccountMetas<'info>,
        pub args: SettleMultiplePnls,
        pub remaining_accounts: Vec<&'info AccountMeta>,
    }

    // SettleFundingPayment
    #[derive(TryFromInstruction)]
    pub struct SettleFundingPaymentI11n<'info> {
        pub accounts: SettleFundingPaymentAccountMetas<'info>,
        pub args: SettleFundingPayment,
        pub remaining_accounts: Vec<&'info AccountMeta>,
    }

    // SettleLp
    #[derive(TryFromInstruction)]
    pub struct SettleLpI11n<'info> {
        pub accounts: SettleLpAccountMetas<'info>,
        pub args: SettleLp,
        pub remaining_accounts: Vec<&'info AccountMeta>,
    }

    // SettleExpiredMarket
    #[derive(TryFromInstruction)]
    pub struct SettleExpiredMarketI11n<'info> {
        pub accounts: SettleExpiredMarketAccountMetas<'info>,
        pub args: SettleExpiredMarket,
        pub remaining_accounts: Vec<&'info AccountMeta>,
    }

    // LiquidatePerp
    #[derive(TryFromInstruction)]
    pub struct LiquidatePerpI11n<'info> {
        pub accounts: LiquidatePerpAccountMetas<'info>,
        pub args: LiquidatePerp,
        pub remaining_accounts: Vec<&'info AccountMeta>,
    }

    // LiquidatePerpWithFill
    #[derive(TryFromInstruction)]
    pub struct LiquidatePerpWithFillI11n<'info> {
        pub accounts: LiquidatePerpWithFillAccountMetas<'info>,
        pub args: LiquidatePerpWithFill,
        pub remaining_accounts: Vec<&'info AccountMeta>,
    }

    // LiquidateSpot
    #[derive(TryFromInstruction)]
    pub struct LiquidateSpotI11n<'info> {
        pub accounts: LiquidateSpotAccountMetas<'info>,
        pub args: LiquidateSpot,
        pub remaining_accounts: Vec<&'info AccountMeta>,
    }

    // LiquidateBorrowForPerpPnl
    #[derive(TryFromInstruction)]
    pub struct LiquidateBorrowForPerpPnlI11n<'info> {
        pub accounts: LiquidateBorrowForPerpPnlAccountMetas<'info>,
        pub args: LiquidateBorrowForPerpPnl,
        pub remaining_accounts: Vec<&'info AccountMeta>,
    }

    // LiquidatePerpPnlForDeposit
    #[derive(TryFromInstruction)]
    pub struct LiquidatePerpPnlForDepositI11n<'info> {
        pub accounts: LiquidatePerpPnlForDepositAccountMetas<'info>,
        pub args: LiquidatePerpPnlForDeposit,
        pub remaining_accounts: Vec<&'info AccountMeta>,
    }

    // SetUserStatusToBeingLiquidated
    #[derive(TryFromInstruction)]
    pub struct SetUserStatusToBeingLiquidatedI11n<'info> {
        pub accounts: SetUserStatusToBeingLiquidatedAccountMetas<'info>,
        pub args: SetUserStatusToBeingLiquidated,
        pub remaining_accounts: Vec<&'info AccountMeta>,
    }

    // ResolvePerpPnlDeficit
    #[derive(TryFromInstruction)]
    pub struct ResolvePerpPnlDeficitI11n<'info> {
        pub accounts: ResolvePerpPnlDeficitAccountMetas<'info>,
        pub args: ResolvePerpPnlDeficit,
        pub remaining_accounts: Vec<&'info AccountMeta>,
    }

    // ResolvePerpBankruptcy
    #[derive(TryFromInstruction)]
    pub struct ResolvePerpBankruptcyI11n<'info> {
        pub accounts: ResolvePerpBankruptcyAccountMetas<'info>,
        pub args: ResolvePerpBankruptcy,
        pub remaining_accounts: Vec<&'info AccountMeta>,
    }

    // ResolveSpotBankruptcy
    #[derive(TryFromInstruction)]
    pub struct ResolveSpotBankruptcyI11n<'info> {
        pub accounts: ResolveSpotBankruptcyAccountMetas<'info>,
        pub args: ResolveSpotBankruptcy,
        pub remaining_accounts: Vec<&'info AccountMeta>,
    }

    // SettleRevenueToInsuranceFund
    #[derive(TryFromInstruction)]
    pub struct SettleRevenueToInsuranceFundI11n<'info> {
        pub accounts: SettleRevenueToInsuranceFundAccountMetas<'info>,
        pub args: SettleRevenueToInsuranceFund,
        pub remaining_accounts: Vec<&'info AccountMeta>,
    }

    // UpdateFundingRate
    #[derive(TryFromInstruction)]
    pub struct UpdateFundingRateI11n<'info> {
        pub accounts: UpdateFundingRateAccountMetas<'info>,
        pub args: UpdateFundingRate,
        pub remaining_accounts: Vec<&'info AccountMeta>,
    }

    // UpdatePrelaunchOracle
    #[derive(TryFromInstruction)]
    pub struct UpdatePrelaunchOracleI11n<'info> {
        pub accounts: UpdatePrelaunchOracleAccountMetas<'info>,
        pub args: UpdatePrelaunchOracle,
        pub remaining_accounts: Vec<&'info AccountMeta>,
    }

    // UpdatePerpBidAskTwap
    #[derive(TryFromInstruction)]
    pub struct UpdatePerpBidAskTwapI11n<'info> {
        pub accounts: UpdatePerpBidAskTwapAccountMetas<'info>,
        pub args: UpdatePerpBidAskTwap,
        pub remaining_accounts: Vec<&'info AccountMeta>,
    }

    // UpdateSpotMarketCumulativeInterest
    #[derive(TryFromInstruction)]
    pub struct UpdateSpotMarketCumulativeInterestI11n<'info> {
        pub accounts: UpdateSpotMarketCumulativeInterestAccountMetas<'info>,
        pub args: UpdateSpotMarketCumulativeInterest,
        pub remaining_accounts: Vec<&'info AccountMeta>,
    }

    // UpdateAmms
    #[derive(TryFromInstruction)]
    pub struct UpdateAmmsI11n<'info> {
        pub accounts: UpdateAmmsAccountMetas<'info>,
        pub args: UpdateAmms,
        pub remaining_accounts: Vec<&'info AccountMeta>,
    }

    // UpdateSpotMarketExpiry
    #[derive(TryFromInstruction)]
    pub struct UpdateSpotMarketExpiryI11n<'info> {
        pub accounts: UpdateSpotMarketExpiryAccountMetas<'info>,
        pub args: UpdateSpotMarketExpiry,
        pub remaining_accounts: Vec<&'info AccountMeta>,
    }

    // UpdateUserQuoteAssetInsuranceStake
    #[derive(TryFromInstruction)]
    pub struct UpdateUserQuoteAssetInsuranceStakeI11n<'info> {
        pub accounts: UpdateUserQuoteAssetInsuranceStakeAccountMetas<'info>,
        pub args: UpdateUserQuoteAssetInsuranceStake,
        pub remaining_accounts: Vec<&'info AccountMeta>,
    }

    // UpdateUserGovTokenInsuranceStake
    #[derive(TryFromInstruction)]
    pub struct UpdateUserGovTokenInsuranceStakeI11n<'info> {
        pub accounts: UpdateUserGovTokenInsuranceStakeAccountMetas<'info>,
        pub args: UpdateUserGovTokenInsuranceStake,
        pub remaining_accounts: Vec<&'info AccountMeta>,
    }

    // InitializeInsuranceFundStake
    #[derive(TryFromInstruction)]
    pub struct InitializeInsuranceFundStakeI11n<'info> {
        pub accounts: InitializeInsuranceFundStakeAccountMetas<'info>,
        pub args: InitializeInsuranceFundStake,
        pub remaining_accounts: Vec<&'info AccountMeta>,
    }

    // AddInsuranceFundStake
    #[derive(TryFromInstruction)]
    pub struct AddInsuranceFundStakeI11n<'info> {
        pub accounts: AddInsuranceFundStakeAccountMetas<'info>,
        pub args: AddInsuranceFundStake,
        pub remaining_accounts: Vec<&'info AccountMeta>,
    }

    // RequestRemoveInsuranceFundStake
    #[derive(TryFromInstruction)]
    pub struct RequestRemoveInsuranceFundStakeI11n<'info> {
        pub accounts: RequestRemoveInsuranceFundStakeAccountMetas<'info>,
        pub args: RequestRemoveInsuranceFundStake,
        pub remaining_accounts: Vec<&'info AccountMeta>,
    }

    // CancelRequestRemoveInsuranceFundStake
    #[derive(TryFromInstruction)]
    pub struct CancelRequestRemoveInsuranceFundStakeI11n<'info> {
        pub accounts: CancelRequestRemoveInsuranceFundStakeAccountMetas<'info>,
        pub args: CancelRequestRemoveInsuranceFundStake,
        pub remaining_accounts: Vec<&'info AccountMeta>,
    }

    // RemoveInsuranceFundStake
    #[derive(TryFromInstruction)]
    pub struct RemoveInsuranceFundStakeI11n<'info> {
        pub accounts: RemoveInsuranceFundStakeAccountMetas<'info>,
        pub args: RemoveInsuranceFundStake,
        pub remaining_accounts: Vec<&'info AccountMeta>,
    }

    // TransferProtocolIfShares
    #[derive(TryFromInstruction)]
    pub struct TransferProtocolIfSharesI11n<'info> {
        pub accounts: TransferProtocolIfSharesAccountMetas<'info>,
        pub args: TransferProtocolIfShares,
        pub remaining_accounts: Vec<&'info AccountMeta>,
    }

    // UpdatePythPullOracle
    #[derive(TryFromInstruction)]
    pub struct UpdatePythPullOracleI11n<'info> {
        pub accounts: UpdatePythPullOracleAccountMetas<'info>,
        pub args: UpdatePythPullOracle,
        pub remaining_accounts: Vec<&'info AccountMeta>,
    }

    // PostPythPullOracleUpdateAtomic
    #[derive(TryFromInstruction)]
    pub struct PostPythPullOracleUpdateAtomicI11n<'info> {
        pub accounts: PostPythPullOracleUpdateAtomicAccountMetas<'info>,
        pub args: PostPythPullOracleUpdateAtomic,
        pub remaining_accounts: Vec<&'info AccountMeta>,
    }

    // PostMultiPythPullOracleUpdatesAtomic
    #[derive(TryFromInstruction)]
    pub struct PostMultiPythPullOracleUpdatesAtomicI11n<'info> {
        pub accounts: PostMultiPythPullOracleUpdatesAtomicAccountMetas<'info>,
        pub args: PostMultiPythPullOracleUpdatesAtomic,
        pub remaining_accounts: Vec<&'info AccountMeta>,
    }

    // Initialize
    #[derive(TryFromInstruction)]
    pub struct InitializeI11n<'info> {
        pub accounts: InitializeAccountMetas<'info>,
        pub args: Initialize,
        pub remaining_accounts: Vec<&'info AccountMeta>,
    }

    // InitializeSpotMarket
    #[derive(TryFromInstruction)]
    pub struct InitializeSpotMarketI11n<'info> {
        pub accounts: InitializeSpotMarketAccountMetas<'info>,
        pub args: InitializeSpotMarket,
        pub remaining_accounts: Vec<&'info AccountMeta>,
    }

    // DeleteInitializedSpotMarket
    #[derive(TryFromInstruction)]
    pub struct DeleteInitializedSpotMarketI11n<'info> {
        pub accounts: DeleteInitializedSpotMarketAccountMetas<'info>,
        pub args: DeleteInitializedSpotMarket,
        pub remaining_accounts: Vec<&'info AccountMeta>,
    }

    // InitializeSerumFulfillmentConfig
    #[derive(TryFromInstruction)]
    pub struct InitializeSerumFulfillmentConfigI11n<'info> {
        pub accounts: InitializeSerumFulfillmentConfigAccountMetas<'info>,
        pub args: InitializeSerumFulfillmentConfig,
        pub remaining_accounts: Vec<&'info AccountMeta>,
    }

    // UpdateSerumFulfillmentConfigStatus
    #[derive(TryFromInstruction)]
    pub struct UpdateSerumFulfillmentConfigStatusI11n<'info> {
        pub accounts: UpdateSerumFulfillmentConfigStatusAccountMetas<'info>,
        pub args: UpdateSerumFulfillmentConfigStatus,
        pub remaining_accounts: Vec<&'info AccountMeta>,
    }

    // InitializeOpenbookV2FulfillmentConfig
    #[derive(TryFromInstruction)]
    pub struct InitializeOpenbookV2FulfillmentConfigI11n<'info> {
        pub accounts: InitializeOpenbookV2FulfillmentConfigAccountMetas<'info>,
        pub args: InitializeOpenbookV2FulfillmentConfig,
        pub remaining_accounts: Vec<&'info AccountMeta>,
    }

    // OpenbookV2FulfillmentConfigStatus
    #[derive(TryFromInstruction)]
    pub struct OpenbookV2FulfillmentConfigStatusI11n<'info> {
        pub accounts: OpenbookV2FulfillmentConfigStatusAccountMetas<'info>,
        pub args: OpenbookV2FulfillmentConfigStatus,
        pub remaining_accounts: Vec<&'info AccountMeta>,
    }

    // InitializePhoenixFulfillmentConfig
    #[derive(TryFromInstruction)]
    pub struct InitializePhoenixFulfillmentConfigI11n<'info> {
        pub accounts: InitializePhoenixFulfillmentConfigAccountMetas<'info>,
        pub args: InitializePhoenixFulfillmentConfig,
        pub remaining_accounts: Vec<&'info AccountMeta>,
    }

    // PhoenixFulfillmentConfigStatus
    #[derive(TryFromInstruction)]
    pub struct PhoenixFulfillmentConfigStatusI11n<'info> {
        pub accounts: PhoenixFulfillmentConfigStatusAccountMetas<'info>,
        pub args: PhoenixFulfillmentConfigStatus,
        pub remaining_accounts: Vec<&'info AccountMeta>,
    }

    // UpdateSerumVault
    #[derive(TryFromInstruction)]
    pub struct UpdateSerumVaultI11n<'info> {
        pub accounts: UpdateSerumVaultAccountMetas<'info>,
        pub args: UpdateSerumVault,
        pub remaining_accounts: Vec<&'info AccountMeta>,
    }

    // InitializePerpMarket
    #[derive(TryFromInstruction)]
    pub struct InitializePerpMarketI11n<'info> {
        pub accounts: InitializePerpMarketAccountMetas<'info>,
        pub args: InitializePerpMarket,
        pub remaining_accounts: Vec<&'info AccountMeta>,
    }

    // InitializePredictionMarket
    #[derive(TryFromInstruction)]
    pub struct InitializePredictionMarketI11n<'info> {
        pub accounts: InitializePredictionMarketAccountMetas<'info>,
        pub args: InitializePredictionMarket,
        pub remaining_accounts: Vec<&'info AccountMeta>,
    }

    // DeleteInitializedPerpMarket
    #[derive(TryFromInstruction)]
    pub struct DeleteInitializedPerpMarketI11n<'info> {
        pub accounts: DeleteInitializedPerpMarketAccountMetas<'info>,
        pub args: DeleteInitializedPerpMarket,
        pub remaining_accounts: Vec<&'info AccountMeta>,
    }

    // MoveAmmPrice
    #[derive(TryFromInstruction)]
    pub struct MoveAmmPriceI11n<'info> {
        pub accounts: MoveAmmPriceAccountMetas<'info>,
        pub args: MoveAmmPrice,
        pub remaining_accounts: Vec<&'info AccountMeta>,
    }

    // RecenterPerpMarketAmm
    #[derive(TryFromInstruction)]
    pub struct RecenterPerpMarketAmmI11n<'info> {
        pub accounts: RecenterPerpMarketAmmAccountMetas<'info>,
        pub args: RecenterPerpMarketAmm,
        pub remaining_accounts: Vec<&'info AccountMeta>,
    }

    // UpdatePerpMarketAmmSummaryStats
    #[derive(TryFromInstruction)]
    pub struct UpdatePerpMarketAmmSummaryStatsI11n<'info> {
        pub accounts: UpdatePerpMarketAmmSummaryStatsAccountMetas<'info>,
        pub args: UpdatePerpMarketAmmSummaryStats,
        pub remaining_accounts: Vec<&'info AccountMeta>,
    }

    // UpdatePerpMarketExpiry
    #[derive(TryFromInstruction)]
    pub struct UpdatePerpMarketExpiryI11n<'info> {
        pub accounts: UpdatePerpMarketExpiryAccountMetas<'info>,
        pub args: UpdatePerpMarketExpiry,
        pub remaining_accounts: Vec<&'info AccountMeta>,
    }

    // SettleExpiredMarketPoolsToRevenuePool
    #[derive(TryFromInstruction)]
    pub struct SettleExpiredMarketPoolsToRevenuePoolI11n<'info> {
        pub accounts: SettleExpiredMarketPoolsToRevenuePoolAccountMetas<'info>,
        pub args: SettleExpiredMarketPoolsToRevenuePool,
        pub remaining_accounts: Vec<&'info AccountMeta>,
    }

    // DepositIntoPerpMarketFeePool
    #[derive(TryFromInstruction)]
    pub struct DepositIntoPerpMarketFeePoolI11n<'info> {
        pub accounts: DepositIntoPerpMarketFeePoolAccountMetas<'info>,
        pub args: DepositIntoPerpMarketFeePool,
        pub remaining_accounts: Vec<&'info AccountMeta>,
    }

    // DepositIntoSpotMarketVault
    #[derive(TryFromInstruction)]
    pub struct DepositIntoSpotMarketVaultI11n<'info> {
        pub accounts: DepositIntoSpotMarketVaultAccountMetas<'info>,
        pub args: DepositIntoSpotMarketVault,
        pub remaining_accounts: Vec<&'info AccountMeta>,
    }

    // DepositIntoSpotMarketRevenuePool
    #[derive(TryFromInstruction)]
    pub struct DepositIntoSpotMarketRevenuePoolI11n<'info> {
        pub accounts: DepositIntoSpotMarketRevenuePoolAccountMetas<'info>,
        pub args: DepositIntoSpotMarketRevenuePool,
        pub remaining_accounts: Vec<&'info AccountMeta>,
    }

    // RepegAmmCurve
    #[derive(TryFromInstruction)]
    pub struct RepegAmmCurveI11n<'info> {
        pub accounts: RepegAmmCurveAccountMetas<'info>,
        pub args: RepegAmmCurve,
        pub remaining_accounts: Vec<&'info AccountMeta>,
    }

    // UpdatePerpMarketAmmOracleTwap
    #[derive(TryFromInstruction)]
    pub struct UpdatePerpMarketAmmOracleTwapI11n<'info> {
        pub accounts: UpdatePerpMarketAmmOracleTwapAccountMetas<'info>,
        pub args: UpdatePerpMarketAmmOracleTwap,
        pub remaining_accounts: Vec<&'info AccountMeta>,
    }

    // ResetPerpMarketAmmOracleTwap
    #[derive(TryFromInstruction)]
    pub struct ResetPerpMarketAmmOracleTwapI11n<'info> {
        pub accounts: ResetPerpMarketAmmOracleTwapAccountMetas<'info>,
        pub args: ResetPerpMarketAmmOracleTwap,
        pub remaining_accounts: Vec<&'info AccountMeta>,
    }

    // UpdateK
    #[derive(TryFromInstruction)]
    pub struct UpdateKI11n<'info> {
        pub accounts: UpdateKAccountMetas<'info>,
        pub args: UpdateK,
        pub remaining_accounts: Vec<&'info AccountMeta>,
    }

    // UpdatePerpMarketMarginRatio
    #[derive(TryFromInstruction)]
    pub struct UpdatePerpMarketMarginRatioI11n<'info> {
        pub accounts: UpdatePerpMarketMarginRatioAccountMetas<'info>,
        pub args: UpdatePerpMarketMarginRatio,
        pub remaining_accounts: Vec<&'info AccountMeta>,
    }

    // UpdatePerpMarketFundingPeriod
    #[derive(TryFromInstruction)]
    pub struct UpdatePerpMarketFundingPeriodI11n<'info> {
        pub accounts: UpdatePerpMarketFundingPeriodAccountMetas<'info>,
        pub args: UpdatePerpMarketFundingPeriod,
        pub remaining_accounts: Vec<&'info AccountMeta>,
    }

    // UpdatePerpMarketMaxImbalances
    #[derive(TryFromInstruction)]
    pub struct UpdatePerpMarketMaxImbalancesI11n<'info> {
        pub accounts: UpdatePerpMarketMaxImbalancesAccountMetas<'info>,
        pub args: UpdatePerpMarketMaxImbalances,
        pub remaining_accounts: Vec<&'info AccountMeta>,
    }

    // UpdatePerpMarketLiquidationFee
    #[derive(TryFromInstruction)]
    pub struct UpdatePerpMarketLiquidationFeeI11n<'info> {
        pub accounts: UpdatePerpMarketLiquidationFeeAccountMetas<'info>,
        pub args: UpdatePerpMarketLiquidationFee,
        pub remaining_accounts: Vec<&'info AccountMeta>,
    }

    // UpdateInsuranceFundUnstakingPeriod
    #[derive(TryFromInstruction)]
    pub struct UpdateInsuranceFundUnstakingPeriodI11n<'info> {
        pub accounts: UpdateInsuranceFundUnstakingPeriodAccountMetas<'info>,
        pub args: UpdateInsuranceFundUnstakingPeriod,
        pub remaining_accounts: Vec<&'info AccountMeta>,
    }

    // UpdateSpotMarketLiquidationFee
    #[derive(TryFromInstruction)]
    pub struct UpdateSpotMarketLiquidationFeeI11n<'info> {
        pub accounts: UpdateSpotMarketLiquidationFeeAccountMetas<'info>,
        pub args: UpdateSpotMarketLiquidationFee,
        pub remaining_accounts: Vec<&'info AccountMeta>,
    }

    // UpdateWithdrawGuardThreshold
    #[derive(TryFromInstruction)]
    pub struct UpdateWithdrawGuardThresholdI11n<'info> {
        pub accounts: UpdateWithdrawGuardThresholdAccountMetas<'info>,
        pub args: UpdateWithdrawGuardThreshold,
        pub remaining_accounts: Vec<&'info AccountMeta>,
    }

    // UpdateSpotMarketIfFactor
    #[derive(TryFromInstruction)]
    pub struct UpdateSpotMarketIfFactorI11n<'info> {
        pub accounts: UpdateSpotMarketIfFactorAccountMetas<'info>,
        pub args: UpdateSpotMarketIfFactor,
        pub remaining_accounts: Vec<&'info AccountMeta>,
    }

    // UpdateSpotMarketRevenueSettlePeriod
    #[derive(TryFromInstruction)]
    pub struct UpdateSpotMarketRevenueSettlePeriodI11n<'info> {
        pub accounts: UpdateSpotMarketRevenueSettlePeriodAccountMetas<'info>,
        pub args: UpdateSpotMarketRevenueSettlePeriod,
        pub remaining_accounts: Vec<&'info AccountMeta>,
    }

    // UpdateSpotMarketStatus
    #[derive(TryFromInstruction)]
    pub struct UpdateSpotMarketStatusI11n<'info> {
        pub accounts: UpdateSpotMarketStatusAccountMetas<'info>,
        pub args: UpdateSpotMarketStatus,
        pub remaining_accounts: Vec<&'info AccountMeta>,
    }

    // UpdateSpotMarketPausedOperations
    #[derive(TryFromInstruction)]
    pub struct UpdateSpotMarketPausedOperationsI11n<'info> {
        pub accounts: UpdateSpotMarketPausedOperationsAccountMetas<'info>,
        pub args: UpdateSpotMarketPausedOperations,
        pub remaining_accounts: Vec<&'info AccountMeta>,
    }

    // UpdateSpotMarketAssetTier
    #[derive(TryFromInstruction)]
    pub struct UpdateSpotMarketAssetTierI11n<'info> {
        pub accounts: UpdateSpotMarketAssetTierAccountMetas<'info>,
        pub args: UpdateSpotMarketAssetTier,
        pub remaining_accounts: Vec<&'info AccountMeta>,
    }

    // UpdateSpotMarketMarginWeights
    #[derive(TryFromInstruction)]
    pub struct UpdateSpotMarketMarginWeightsI11n<'info> {
        pub accounts: UpdateSpotMarketMarginWeightsAccountMetas<'info>,
        pub args: UpdateSpotMarketMarginWeights,
        pub remaining_accounts: Vec<&'info AccountMeta>,
    }

    // UpdateSpotMarketBorrowRate
    #[derive(TryFromInstruction)]
    pub struct UpdateSpotMarketBorrowRateI11n<'info> {
        pub accounts: UpdateSpotMarketBorrowRateAccountMetas<'info>,
        pub args: UpdateSpotMarketBorrowRate,
        pub remaining_accounts: Vec<&'info AccountMeta>,
    }

    // UpdateSpotMarketMaxTokenDeposits
    #[derive(TryFromInstruction)]
    pub struct UpdateSpotMarketMaxTokenDepositsI11n<'info> {
        pub accounts: UpdateSpotMarketMaxTokenDepositsAccountMetas<'info>,
        pub args: UpdateSpotMarketMaxTokenDeposits,
        pub remaining_accounts: Vec<&'info AccountMeta>,
    }

    // UpdateSpotMarketMaxTokenBorrows
    #[derive(TryFromInstruction)]
    pub struct UpdateSpotMarketMaxTokenBorrowsI11n<'info> {
        pub accounts: UpdateSpotMarketMaxTokenBorrowsAccountMetas<'info>,
        pub args: UpdateSpotMarketMaxTokenBorrows,
        pub remaining_accounts: Vec<&'info AccountMeta>,
    }

    // UpdateSpotMarketScaleInitialAssetWeightStart
    #[derive(TryFromInstruction)]
    pub struct UpdateSpotMarketScaleInitialAssetWeightStartI11n<'info> {
        pub accounts: UpdateSpotMarketScaleInitialAssetWeightStartAccountMetas<'info>,
        pub args: UpdateSpotMarketScaleInitialAssetWeightStart,
        pub remaining_accounts: Vec<&'info AccountMeta>,
    }

    // UpdateSpotMarketOracle
    #[derive(TryFromInstruction)]
    pub struct UpdateSpotMarketOracleI11n<'info> {
        pub accounts: UpdateSpotMarketOracleAccountMetas<'info>,
        pub args: UpdateSpotMarketOracle,
        pub remaining_accounts: Vec<&'info AccountMeta>,
    }

    // UpdateSpotMarketStepSizeAndTickSize
    #[derive(TryFromInstruction)]
    pub struct UpdateSpotMarketStepSizeAndTickSizeI11n<'info> {
        pub accounts: UpdateSpotMarketStepSizeAndTickSizeAccountMetas<'info>,
        pub args: UpdateSpotMarketStepSizeAndTickSize,
        pub remaining_accounts: Vec<&'info AccountMeta>,
    }

    // UpdateSpotMarketMinOrderSize
    #[derive(TryFromInstruction)]
    pub struct UpdateSpotMarketMinOrderSizeI11n<'info> {
        pub accounts: UpdateSpotMarketMinOrderSizeAccountMetas<'info>,
        pub args: UpdateSpotMarketMinOrderSize,
        pub remaining_accounts: Vec<&'info AccountMeta>,
    }

    // UpdateSpotMarketOrdersEnabled
    #[derive(TryFromInstruction)]
    pub struct UpdateSpotMarketOrdersEnabledI11n<'info> {
        pub accounts: UpdateSpotMarketOrdersEnabledAccountMetas<'info>,
        pub args: UpdateSpotMarketOrdersEnabled,
        pub remaining_accounts: Vec<&'info AccountMeta>,
    }

    // UpdateSpotMarketIfPausedOperations
    #[derive(TryFromInstruction)]
    pub struct UpdateSpotMarketIfPausedOperationsI11n<'info> {
        pub accounts: UpdateSpotMarketIfPausedOperationsAccountMetas<'info>,
        pub args: UpdateSpotMarketIfPausedOperations,
        pub remaining_accounts: Vec<&'info AccountMeta>,
    }

    // UpdateSpotMarketName
    #[derive(TryFromInstruction)]
    pub struct UpdateSpotMarketNameI11n<'info> {
        pub accounts: UpdateSpotMarketNameAccountMetas<'info>,
        pub args: UpdateSpotMarketName,
        pub remaining_accounts: Vec<&'info AccountMeta>,
    }

    // UpdatePerpMarketStatus
    #[derive(TryFromInstruction)]
    pub struct UpdatePerpMarketStatusI11n<'info> {
        pub accounts: UpdatePerpMarketStatusAccountMetas<'info>,
        pub args: UpdatePerpMarketStatus,
        pub remaining_accounts: Vec<&'info AccountMeta>,
    }

    // UpdatePerpMarketPausedOperations
    #[derive(TryFromInstruction)]
    pub struct UpdatePerpMarketPausedOperationsI11n<'info> {
        pub accounts: UpdatePerpMarketPausedOperationsAccountMetas<'info>,
        pub args: UpdatePerpMarketPausedOperations,
        pub remaining_accounts: Vec<&'info AccountMeta>,
    }

    // UpdatePerpMarketContractTier
    #[derive(TryFromInstruction)]
    pub struct UpdatePerpMarketContractTierI11n<'info> {
        pub accounts: UpdatePerpMarketContractTierAccountMetas<'info>,
        pub args: UpdatePerpMarketContractTier,
        pub remaining_accounts: Vec<&'info AccountMeta>,
    }

    // UpdatePerpMarketImfFactor
    #[derive(TryFromInstruction)]
    pub struct UpdatePerpMarketImfFactorI11n<'info> {
        pub accounts: UpdatePerpMarketImfFactorAccountMetas<'info>,
        pub args: UpdatePerpMarketImfFactor,
        pub remaining_accounts: Vec<&'info AccountMeta>,
    }

    // UpdatePerpMarketUnrealizedAssetWeight
    #[derive(TryFromInstruction)]
    pub struct UpdatePerpMarketUnrealizedAssetWeightI11n<'info> {
        pub accounts: UpdatePerpMarketUnrealizedAssetWeightAccountMetas<'info>,
        pub args: UpdatePerpMarketUnrealizedAssetWeight,
        pub remaining_accounts: Vec<&'info AccountMeta>,
    }

    // UpdatePerpMarketConcentrationCoef
    #[derive(TryFromInstruction)]
    pub struct UpdatePerpMarketConcentrationCoefI11n<'info> {
        pub accounts: UpdatePerpMarketConcentrationCoefAccountMetas<'info>,
        pub args: UpdatePerpMarketConcentrationCoef,
        pub remaining_accounts: Vec<&'info AccountMeta>,
    }

    // UpdatePerpMarketCurveUpdateIntensity
    #[derive(TryFromInstruction)]
    pub struct UpdatePerpMarketCurveUpdateIntensityI11n<'info> {
        pub accounts: UpdatePerpMarketCurveUpdateIntensityAccountMetas<'info>,
        pub args: UpdatePerpMarketCurveUpdateIntensity,
        pub remaining_accounts: Vec<&'info AccountMeta>,
    }

    // UpdatePerpMarketTargetBaseAssetAmountPerLp
    #[derive(TryFromInstruction)]
    pub struct UpdatePerpMarketTargetBaseAssetAmountPerLpI11n<'info> {
        pub accounts: UpdatePerpMarketTargetBaseAssetAmountPerLpAccountMetas<'info>,
        pub args: UpdatePerpMarketTargetBaseAssetAmountPerLp,
        pub remaining_accounts: Vec<&'info AccountMeta>,
    }

    // UpdatePerpMarketPerLpBase
    #[derive(TryFromInstruction)]
    pub struct UpdatePerpMarketPerLpBaseI11n<'info> {
        pub accounts: UpdatePerpMarketPerLpBaseAccountMetas<'info>,
        pub args: UpdatePerpMarketPerLpBase,
        pub remaining_accounts: Vec<&'info AccountMeta>,
    }

    // UpdateLpCooldownTime
    #[derive(TryFromInstruction)]
    pub struct UpdateLpCooldownTimeI11n<'info> {
        pub accounts: UpdateLpCooldownTimeAccountMetas<'info>,
        pub args: UpdateLpCooldownTime,
        pub remaining_accounts: Vec<&'info AccountMeta>,
    }

    // UpdatePerpFeeStructure
    #[derive(TryFromInstruction)]
    pub struct UpdatePerpFeeStructureI11n<'info> {
        pub accounts: UpdatePerpFeeStructureAccountMetas<'info>,
        pub args: UpdatePerpFeeStructure,
        pub remaining_accounts: Vec<&'info AccountMeta>,
    }

    // UpdateSpotFeeStructure
    #[derive(TryFromInstruction)]
    pub struct UpdateSpotFeeStructureI11n<'info> {
        pub accounts: UpdateSpotFeeStructureAccountMetas<'info>,
        pub args: UpdateSpotFeeStructure,
        pub remaining_accounts: Vec<&'info AccountMeta>,
    }

    // UpdateInitialPctToLiquidate
    #[derive(TryFromInstruction)]
    pub struct UpdateInitialPctToLiquidateI11n<'info> {
        pub accounts: UpdateInitialPctToLiquidateAccountMetas<'info>,
        pub args: UpdateInitialPctToLiquidate,
        pub remaining_accounts: Vec<&'info AccountMeta>,
    }

    // UpdateLiquidationDuration
    #[derive(TryFromInstruction)]
    pub struct UpdateLiquidationDurationI11n<'info> {
        pub accounts: UpdateLiquidationDurationAccountMetas<'info>,
        pub args: UpdateLiquidationDuration,
        pub remaining_accounts: Vec<&'info AccountMeta>,
    }

    // UpdateLiquidationMarginBufferRatio
    #[derive(TryFromInstruction)]
    pub struct UpdateLiquidationMarginBufferRatioI11n<'info> {
        pub accounts: UpdateLiquidationMarginBufferRatioAccountMetas<'info>,
        pub args: UpdateLiquidationMarginBufferRatio,
        pub remaining_accounts: Vec<&'info AccountMeta>,
    }

    // UpdateOracleGuardRails
    #[derive(TryFromInstruction)]
    pub struct UpdateOracleGuardRailsI11n<'info> {
        pub accounts: UpdateOracleGuardRailsAccountMetas<'info>,
        pub args: UpdateOracleGuardRails,
        pub remaining_accounts: Vec<&'info AccountMeta>,
    }

    // UpdateStateSettlementDuration
    #[derive(TryFromInstruction)]
    pub struct UpdateStateSettlementDurationI11n<'info> {
        pub accounts: UpdateStateSettlementDurationAccountMetas<'info>,
        pub args: UpdateStateSettlementDuration,
        pub remaining_accounts: Vec<&'info AccountMeta>,
    }

    // UpdateStateMaxNumberOfSubAccounts
    #[derive(TryFromInstruction)]
    pub struct UpdateStateMaxNumberOfSubAccountsI11n<'info> {
        pub accounts: UpdateStateMaxNumberOfSubAccountsAccountMetas<'info>,
        pub args: UpdateStateMaxNumberOfSubAccounts,
        pub remaining_accounts: Vec<&'info AccountMeta>,
    }

    // UpdateStateMaxInitializeUserFee
    #[derive(TryFromInstruction)]
    pub struct UpdateStateMaxInitializeUserFeeI11n<'info> {
        pub accounts: UpdateStateMaxInitializeUserFeeAccountMetas<'info>,
        pub args: UpdateStateMaxInitializeUserFee,
        pub remaining_accounts: Vec<&'info AccountMeta>,
    }

    // UpdatePerpMarketOracle
    #[derive(TryFromInstruction)]
    pub struct UpdatePerpMarketOracleI11n<'info> {
        pub accounts: UpdatePerpMarketOracleAccountMetas<'info>,
        pub args: UpdatePerpMarketOracle,
        pub remaining_accounts: Vec<&'info AccountMeta>,
    }

    // UpdatePerpMarketBaseSpread
    #[derive(TryFromInstruction)]
    pub struct UpdatePerpMarketBaseSpreadI11n<'info> {
        pub accounts: UpdatePerpMarketBaseSpreadAccountMetas<'info>,
        pub args: UpdatePerpMarketBaseSpread,
        pub remaining_accounts: Vec<&'info AccountMeta>,
    }

    // UpdateAmmJitIntensity
    #[derive(TryFromInstruction)]
    pub struct UpdateAmmJitIntensityI11n<'info> {
        pub accounts: UpdateAmmJitIntensityAccountMetas<'info>,
        pub args: UpdateAmmJitIntensity,
        pub remaining_accounts: Vec<&'info AccountMeta>,
    }

    // UpdatePerpMarketMaxSpread
    #[derive(TryFromInstruction)]
    pub struct UpdatePerpMarketMaxSpreadI11n<'info> {
        pub accounts: UpdatePerpMarketMaxSpreadAccountMetas<'info>,
        pub args: UpdatePerpMarketMaxSpread,
        pub remaining_accounts: Vec<&'info AccountMeta>,
    }

    // UpdatePerpMarketStepSizeAndTickSize
    #[derive(TryFromInstruction)]
    pub struct UpdatePerpMarketStepSizeAndTickSizeI11n<'info> {
        pub accounts: UpdatePerpMarketStepSizeAndTickSizeAccountMetas<'info>,
        pub args: UpdatePerpMarketStepSizeAndTickSize,
        pub remaining_accounts: Vec<&'info AccountMeta>,
    }

    // UpdatePerpMarketName
    #[derive(TryFromInstruction)]
    pub struct UpdatePerpMarketNameI11n<'info> {
        pub accounts: UpdatePerpMarketNameAccountMetas<'info>,
        pub args: UpdatePerpMarketName,
        pub remaining_accounts: Vec<&'info AccountMeta>,
    }

    // UpdatePerpMarketMinOrderSize
    #[derive(TryFromInstruction)]
    pub struct UpdatePerpMarketMinOrderSizeI11n<'info> {
        pub accounts: UpdatePerpMarketMinOrderSizeAccountMetas<'info>,
        pub args: UpdatePerpMarketMinOrderSize,
        pub remaining_accounts: Vec<&'info AccountMeta>,
    }

    // UpdatePerpMarketMaxSlippageRatio
    #[derive(TryFromInstruction)]
    pub struct UpdatePerpMarketMaxSlippageRatioI11n<'info> {
        pub accounts: UpdatePerpMarketMaxSlippageRatioAccountMetas<'info>,
        pub args: UpdatePerpMarketMaxSlippageRatio,
        pub remaining_accounts: Vec<&'info AccountMeta>,
    }

    // UpdatePerpMarketMaxFillReserveFraction
    #[derive(TryFromInstruction)]
    pub struct UpdatePerpMarketMaxFillReserveFractionI11n<'info> {
        pub accounts: UpdatePerpMarketMaxFillReserveFractionAccountMetas<'info>,
        pub args: UpdatePerpMarketMaxFillReserveFraction,
        pub remaining_accounts: Vec<&'info AccountMeta>,
    }

    // UpdatePerpMarketMaxOpenInterest
    #[derive(TryFromInstruction)]
    pub struct UpdatePerpMarketMaxOpenInterestI11n<'info> {
        pub accounts: UpdatePerpMarketMaxOpenInterestAccountMetas<'info>,
        pub args: UpdatePerpMarketMaxOpenInterest,
        pub remaining_accounts: Vec<&'info AccountMeta>,
    }

    // UpdatePerpMarketNumberOfUsers
    #[derive(TryFromInstruction)]
    pub struct UpdatePerpMarketNumberOfUsersI11n<'info> {
        pub accounts: UpdatePerpMarketNumberOfUsersAccountMetas<'info>,
        pub args: UpdatePerpMarketNumberOfUsers,
        pub remaining_accounts: Vec<&'info AccountMeta>,
    }

    // UpdatePerpMarketFeeAdjustment
    #[derive(TryFromInstruction)]
    pub struct UpdatePerpMarketFeeAdjustmentI11n<'info> {
        pub accounts: UpdatePerpMarketFeeAdjustmentAccountMetas<'info>,
        pub args: UpdatePerpMarketFeeAdjustment,
        pub remaining_accounts: Vec<&'info AccountMeta>,
    }

    // UpdateSpotMarketFeeAdjustment
    #[derive(TryFromInstruction)]
    pub struct UpdateSpotMarketFeeAdjustmentI11n<'info> {
        pub accounts: UpdateSpotMarketFeeAdjustmentAccountMetas<'info>,
        pub args: UpdateSpotMarketFeeAdjustment,
        pub remaining_accounts: Vec<&'info AccountMeta>,
    }

    // UpdatePerpMarketFuel
    #[derive(TryFromInstruction)]
    pub struct UpdatePerpMarketFuelI11n<'info> {
        pub accounts: UpdatePerpMarketFuelAccountMetas<'info>,
        pub args: UpdatePerpMarketFuel,
        pub remaining_accounts: Vec<&'info AccountMeta>,
    }

    // UpdateSpotMarketFuel
    #[derive(TryFromInstruction)]
    pub struct UpdateSpotMarketFuelI11n<'info> {
        pub accounts: UpdateSpotMarketFuelAccountMetas<'info>,
        pub args: UpdateSpotMarketFuel,
        pub remaining_accounts: Vec<&'info AccountMeta>,
    }

    // InitUserFuel
    #[derive(TryFromInstruction)]
    pub struct InitUserFuelI11n<'info> {
        pub accounts: InitUserFuelAccountMetas<'info>,
        pub args: InitUserFuel,
        pub remaining_accounts: Vec<&'info AccountMeta>,
    }

    // UpdateAdmin
    #[derive(TryFromInstruction)]
    pub struct UpdateAdminI11n<'info> {
        pub accounts: UpdateAdminAccountMetas<'info>,
        pub args: UpdateAdmin,
        pub remaining_accounts: Vec<&'info AccountMeta>,
    }

    // UpdateWhitelistMint
    #[derive(TryFromInstruction)]
    pub struct UpdateWhitelistMintI11n<'info> {
        pub accounts: UpdateWhitelistMintAccountMetas<'info>,
        pub args: UpdateWhitelistMint,
        pub remaining_accounts: Vec<&'info AccountMeta>,
    }

    // UpdateDiscountMint
    #[derive(TryFromInstruction)]
    pub struct UpdateDiscountMintI11n<'info> {
        pub accounts: UpdateDiscountMintAccountMetas<'info>,
        pub args: UpdateDiscountMint,
        pub remaining_accounts: Vec<&'info AccountMeta>,
    }

    // UpdateExchangeStatus
    #[derive(TryFromInstruction)]
    pub struct UpdateExchangeStatusI11n<'info> {
        pub accounts: UpdateExchangeStatusAccountMetas<'info>,
        pub args: UpdateExchangeStatus,
        pub remaining_accounts: Vec<&'info AccountMeta>,
    }

    // UpdatePerpAuctionDuration
    #[derive(TryFromInstruction)]
    pub struct UpdatePerpAuctionDurationI11n<'info> {
        pub accounts: UpdatePerpAuctionDurationAccountMetas<'info>,
        pub args: UpdatePerpAuctionDuration,
        pub remaining_accounts: Vec<&'info AccountMeta>,
    }

    // UpdateSpotAuctionDuration
    #[derive(TryFromInstruction)]
    pub struct UpdateSpotAuctionDurationI11n<'info> {
        pub accounts: UpdateSpotAuctionDurationAccountMetas<'info>,
        pub args: UpdateSpotAuctionDuration,
        pub remaining_accounts: Vec<&'info AccountMeta>,
    }

    // InitializeProtocolIfSharesTransferConfig
    #[derive(TryFromInstruction)]
    pub struct InitializeProtocolIfSharesTransferConfigI11n<'info> {
        pub accounts: InitializeProtocolIfSharesTransferConfigAccountMetas<'info>,
        pub args: InitializeProtocolIfSharesTransferConfig,
        pub remaining_accounts: Vec<&'info AccountMeta>,
    }

    // UpdateProtocolIfSharesTransferConfig
    #[derive(TryFromInstruction)]
    pub struct UpdateProtocolIfSharesTransferConfigI11n<'info> {
        pub accounts: UpdateProtocolIfSharesTransferConfigAccountMetas<'info>,
        pub args: UpdateProtocolIfSharesTransferConfig,
        pub remaining_accounts: Vec<&'info AccountMeta>,
    }

    // InitializePrelaunchOracle
    #[derive(TryFromInstruction)]
    pub struct InitializePrelaunchOracleI11n<'info> {
        pub accounts: InitializePrelaunchOracleAccountMetas<'info>,
        pub args: InitializePrelaunchOracle,
        pub remaining_accounts: Vec<&'info AccountMeta>,
    }

    // UpdatePrelaunchOracleParams
    #[derive(TryFromInstruction)]
    pub struct UpdatePrelaunchOracleParamsI11n<'info> {
        pub accounts: UpdatePrelaunchOracleParamsAccountMetas<'info>,
        pub args: UpdatePrelaunchOracleParams,
        pub remaining_accounts: Vec<&'info AccountMeta>,
    }

    // DeletePrelaunchOracle
    #[derive(TryFromInstruction)]
    pub struct DeletePrelaunchOracleI11n<'info> {
        pub accounts: DeletePrelaunchOracleAccountMetas<'info>,
        pub args: DeletePrelaunchOracle,
        pub remaining_accounts: Vec<&'info AccountMeta>,
    }

    // InitializePythPullOracle
    #[derive(TryFromInstruction)]
    pub struct InitializePythPullOracleI11n<'info> {
        pub accounts: InitializePythPullOracleAccountMetas<'info>,
        pub args: InitializePythPullOracle,
        pub remaining_accounts: Vec<&'info AccountMeta>,
    }

    //Accounts
    #[derive(TryFromAccountMetas)]
    pub struct InitializeUserAccountMetas<'info> {
        pub user: &'info AccountMeta,
        pub user_stats: &'info AccountMeta,
        pub state: &'info AccountMeta,
        pub authority: &'info AccountMeta,
        pub payer: &'info AccountMeta,
        pub rent: &'info AccountMeta,
        pub system_program: &'info AccountMeta,
    }

    #[derive(TryFromAccountMetas)]
    pub struct InitializeUserStatsAccountMetas<'info> {
        pub user_stats: &'info AccountMeta,
        pub state: &'info AccountMeta,
        pub authority: &'info AccountMeta,
        pub payer: &'info AccountMeta,
        pub rent: &'info AccountMeta,
        pub system_program: &'info AccountMeta,
    }

    #[derive(TryFromAccountMetas)]
    pub struct InitializeReferrerNameAccountMetas<'info> {
        pub referrer_name: &'info AccountMeta,
        pub user: &'info AccountMeta,
        pub user_stats: &'info AccountMeta,
        pub authority: &'info AccountMeta,
        pub payer: &'info AccountMeta,
        pub rent: &'info AccountMeta,
        pub system_program: &'info AccountMeta,
    }

    #[derive(TryFromAccountMetas)]
    pub struct DepositAccountMetas<'info> {
        pub state: &'info AccountMeta,
        pub user: &'info AccountMeta,
        pub user_stats: &'info AccountMeta,
        pub authority: &'info AccountMeta,
        pub spot_market_vault: &'info AccountMeta,
        pub user_token_account: &'info AccountMeta,
        pub token_program: &'info AccountMeta,
    }

    #[derive(TryFromAccountMetas)]
    pub struct WithdrawAccountMetas<'info> {
        pub state: &'info AccountMeta,
        pub user: &'info AccountMeta,
        pub user_stats: &'info AccountMeta,
        pub authority: &'info AccountMeta,
        pub spot_market_vault: &'info AccountMeta,
        pub drift_signer: &'info AccountMeta,
        pub user_token_account: &'info AccountMeta,
        pub token_program: &'info AccountMeta,
    }

    #[derive(TryFromAccountMetas)]
    pub struct TransferDepositAccountMetas<'info> {
        pub from_user: &'info AccountMeta,
        pub to_user: &'info AccountMeta,
        pub user_stats: &'info AccountMeta,
        pub authority: &'info AccountMeta,
        pub state: &'info AccountMeta,
        pub spot_market_vault: &'info AccountMeta,
    }

    #[derive(TryFromAccountMetas)]
    pub struct PlacePerpOrderAccountMetas<'info> {
        pub state: &'info AccountMeta,
        pub user: &'info AccountMeta,
        pub authority: &'info AccountMeta,
    }

    #[derive(TryFromAccountMetas)]
    pub struct CancelOrderAccountMetas<'info> {
        pub state: &'info AccountMeta,
        pub user: &'info AccountMeta,
        pub authority: &'info AccountMeta,
    }

    #[derive(TryFromAccountMetas)]
    pub struct CancelOrderByUserIdAccountMetas<'info> {
        pub state: &'info AccountMeta,
        pub user: &'info AccountMeta,
        pub authority: &'info AccountMeta,
    }

    #[derive(TryFromAccountMetas)]
    pub struct CancelOrdersAccountMetas<'info> {
        pub state: &'info AccountMeta,
        pub user: &'info AccountMeta,
        pub authority: &'info AccountMeta,
    }

    #[derive(TryFromAccountMetas)]
    pub struct CancelOrdersByIdsAccountMetas<'info> {
        pub state: &'info AccountMeta,
        pub user: &'info AccountMeta,
        pub authority: &'info AccountMeta,
    }

    #[derive(TryFromAccountMetas)]
    pub struct ModifyOrderAccountMetas<'info> {
        pub state: &'info AccountMeta,
        pub user: &'info AccountMeta,
        pub authority: &'info AccountMeta,
    }

    #[derive(TryFromAccountMetas)]
    pub struct ModifyOrderByUserIdAccountMetas<'info> {
        pub state: &'info AccountMeta,
        pub user: &'info AccountMeta,
        pub authority: &'info AccountMeta,
    }

    #[derive(TryFromAccountMetas)]
    pub struct PlaceAndTakePerpOrderAccountMetas<'info> {
        pub state: &'info AccountMeta,
        pub user: &'info AccountMeta,
        pub user_stats: &'info AccountMeta,
        pub authority: &'info AccountMeta,
    }

    #[derive(TryFromAccountMetas)]
    pub struct PlaceAndMakePerpOrderAccountMetas<'info> {
        pub state: &'info AccountMeta,
        pub user: &'info AccountMeta,
        pub user_stats: &'info AccountMeta,
        pub taker: &'info AccountMeta,
        pub taker_stats: &'info AccountMeta,
        pub authority: &'info AccountMeta,
    }

    #[derive(TryFromAccountMetas)]
    pub struct PlaceSpotOrderAccountMetas<'info> {
        pub state: &'info AccountMeta,
        pub user: &'info AccountMeta,
        pub authority: &'info AccountMeta,
    }

    #[derive(TryFromAccountMetas)]
    pub struct PlaceAndTakeSpotOrderAccountMetas<'info> {
        pub state: &'info AccountMeta,
        pub user: &'info AccountMeta,
        pub user_stats: &'info AccountMeta,
        pub authority: &'info AccountMeta,
    }

    #[derive(TryFromAccountMetas)]
    pub struct PlaceAndMakeSpotOrderAccountMetas<'info> {
        pub state: &'info AccountMeta,
        pub user: &'info AccountMeta,
        pub user_stats: &'info AccountMeta,
        pub taker: &'info AccountMeta,
        pub taker_stats: &'info AccountMeta,
        pub authority: &'info AccountMeta,
    }

    #[derive(TryFromAccountMetas)]
    pub struct PlaceOrdersAccountMetas<'info> {
        pub state: &'info AccountMeta,
        pub user: &'info AccountMeta,
        pub authority: &'info AccountMeta,
    }

    #[derive(TryFromAccountMetas)]
    pub struct BeginSwapAccountMetas<'info> {
        pub state: &'info AccountMeta,
        pub user: &'info AccountMeta,
        pub user_stats: &'info AccountMeta,
        pub authority: &'info AccountMeta,
        pub out_spot_market_vault: &'info AccountMeta,
        pub in_spot_market_vault: &'info AccountMeta,
        pub out_token_account: &'info AccountMeta,
        pub in_token_account: &'info AccountMeta,
        pub token_program: &'info AccountMeta,
        pub drift_signer: &'info AccountMeta,
        pub instructions: &'info AccountMeta,
    }

    #[derive(TryFromAccountMetas)]
    pub struct EndSwapAccountMetas<'info> {
        pub state: &'info AccountMeta,
        pub user: &'info AccountMeta,
        pub user_stats: &'info AccountMeta,
        pub authority: &'info AccountMeta,
        pub out_spot_market_vault: &'info AccountMeta,
        pub in_spot_market_vault: &'info AccountMeta,
        pub out_token_account: &'info AccountMeta,
        pub in_token_account: &'info AccountMeta,
        pub token_program: &'info AccountMeta,
        pub drift_signer: &'info AccountMeta,
        pub instructions: &'info AccountMeta,
    }

    #[derive(TryFromAccountMetas)]
    pub struct AddPerpLpSharesAccountMetas<'info> {
        pub state: &'info AccountMeta,
        pub user: &'info AccountMeta,
        pub authority: &'info AccountMeta,
    }

    #[derive(TryFromAccountMetas)]
    pub struct RemovePerpLpSharesAccountMetas<'info> {
        pub state: &'info AccountMeta,
        pub user: &'info AccountMeta,
        pub authority: &'info AccountMeta,
    }

    #[derive(TryFromAccountMetas)]
    pub struct RemovePerpLpSharesInExpiringMarketAccountMetas<'info> {
        pub state: &'info AccountMeta,
        pub user: &'info AccountMeta,
    }

    #[derive(TryFromAccountMetas)]
    pub struct UpdateUserNameAccountMetas<'info> {
        pub user: &'info AccountMeta,
        pub authority: &'info AccountMeta,
    }

    #[derive(TryFromAccountMetas)]
    pub struct UpdateUserCustomMarginRatioAccountMetas<'info> {
        pub user: &'info AccountMeta,
        pub authority: &'info AccountMeta,
    }

    #[derive(TryFromAccountMetas)]
    pub struct UpdateUserMarginTradingEnabledAccountMetas<'info> {
        pub user: &'info AccountMeta,
        pub authority: &'info AccountMeta,
    }

    #[derive(TryFromAccountMetas)]
    pub struct UpdateUserDelegateAccountMetas<'info> {
        pub user: &'info AccountMeta,
        pub authority: &'info AccountMeta,
    }

    #[derive(TryFromAccountMetas)]
    pub struct UpdateUserReduceOnlyAccountMetas<'info> {
        pub user: &'info AccountMeta,
        pub authority: &'info AccountMeta,
    }

    #[derive(TryFromAccountMetas)]
    pub struct UpdateUserAdvancedLpAccountMetas<'info> {
        pub user: &'info AccountMeta,
        pub authority: &'info AccountMeta,
    }

    #[derive(TryFromAccountMetas)]
    pub struct DeleteUserAccountMetas<'info> {
        pub user: &'info AccountMeta,
        pub user_stats: &'info AccountMeta,
        pub state: &'info AccountMeta,
        pub authority: &'info AccountMeta,
    }

    #[derive(TryFromAccountMetas)]
    pub struct ReclaimRentAccountMetas<'info> {
        pub user: &'info AccountMeta,
        pub user_stats: &'info AccountMeta,
        pub state: &'info AccountMeta,
        pub authority: &'info AccountMeta,
        pub rent: &'info AccountMeta,
    }

    #[derive(TryFromAccountMetas)]
    pub struct FillPerpOrderAccountMetas<'info> {
        pub state: &'info AccountMeta,
        pub authority: &'info AccountMeta,
        pub filler: &'info AccountMeta,
        pub filler_stats: &'info AccountMeta,
        pub user: &'info AccountMeta,
        pub user_stats: &'info AccountMeta,
    }

    #[derive(TryFromAccountMetas)]
    pub struct RevertFillAccountMetas<'info> {
        pub state: &'info AccountMeta,
        pub authority: &'info AccountMeta,
        pub filler: &'info AccountMeta,
        pub filler_stats: &'info AccountMeta,
    }

    #[derive(TryFromAccountMetas)]
    pub struct FillSpotOrderAccountMetas<'info> {
        pub state: &'info AccountMeta,
        pub authority: &'info AccountMeta,
        pub filler: &'info AccountMeta,
        pub filler_stats: &'info AccountMeta,
        pub user: &'info AccountMeta,
        pub user_stats: &'info AccountMeta,
    }

    #[derive(TryFromAccountMetas)]
    pub struct TriggerOrderAccountMetas<'info> {
        pub state: &'info AccountMeta,
        pub authority: &'info AccountMeta,
        pub filler: &'info AccountMeta,
        pub user: &'info AccountMeta,
    }

    #[derive(TryFromAccountMetas)]
    pub struct ForceCancelOrdersAccountMetas<'info> {
        pub state: &'info AccountMeta,
        pub authority: &'info AccountMeta,
        pub filler: &'info AccountMeta,
        pub user: &'info AccountMeta,
    }

    #[derive(TryFromAccountMetas)]
    pub struct UpdateUserIdleAccountMetas<'info> {
        pub state: &'info AccountMeta,
        pub authority: &'info AccountMeta,
        pub filler: &'info AccountMeta,
        pub user: &'info AccountMeta,
    }

    #[derive(TryFromAccountMetas)]
    pub struct UpdateUserOpenOrdersCountAccountMetas<'info> {
        pub state: &'info AccountMeta,
        pub authority: &'info AccountMeta,
        pub filler: &'info AccountMeta,
        pub user: &'info AccountMeta,
    }

    #[derive(TryFromAccountMetas)]
    pub struct AdminDisableUpdatePerpBidAskTwapAccountMetas<'info> {
        pub admin: &'info AccountMeta,
        pub state: &'info AccountMeta,
        pub user_stats: &'info AccountMeta,
    }

    #[derive(TryFromAccountMetas)]
    pub struct SettlePnlAccountMetas<'info> {
        pub state: &'info AccountMeta,
        pub user: &'info AccountMeta,
        pub authority: &'info AccountMeta,
        pub spot_market_vault: &'info AccountMeta,
    }

    #[derive(TryFromAccountMetas)]
    pub struct SettleMultiplePnlsAccountMetas<'info> {
        pub state: &'info AccountMeta,
        pub user: &'info AccountMeta,
        pub authority: &'info AccountMeta,
        pub spot_market_vault: &'info AccountMeta,
    }

    #[derive(TryFromAccountMetas)]
    pub struct SettleFundingPaymentAccountMetas<'info> {
        pub state: &'info AccountMeta,
        pub user: &'info AccountMeta,
    }

    #[derive(TryFromAccountMetas)]
    pub struct SettleLpAccountMetas<'info> {
        pub state: &'info AccountMeta,
        pub user: &'info AccountMeta,
    }

    #[derive(TryFromAccountMetas)]
    pub struct SettleExpiredMarketAccountMetas<'info> {
        pub state: &'info AccountMeta,
        pub authority: &'info AccountMeta,
    }

    #[derive(TryFromAccountMetas)]
    pub struct LiquidatePerpAccountMetas<'info> {
        pub state: &'info AccountMeta,
        pub authority: &'info AccountMeta,
        pub liquidator: &'info AccountMeta,
        pub liquidator_stats: &'info AccountMeta,
        pub user: &'info AccountMeta,
        pub user_stats: &'info AccountMeta,
    }

    #[derive(TryFromAccountMetas)]
    pub struct LiquidatePerpWithFillAccountMetas<'info> {
        pub state: &'info AccountMeta,
        pub authority: &'info AccountMeta,
        pub liquidator: &'info AccountMeta,
        pub liquidator_stats: &'info AccountMeta,
        pub user: &'info AccountMeta,
        pub user_stats: &'info AccountMeta,
    }

    #[derive(TryFromAccountMetas)]
    pub struct LiquidateSpotAccountMetas<'info> {
        pub state: &'info AccountMeta,
        pub authority: &'info AccountMeta,
        pub liquidator: &'info AccountMeta,
        pub liquidator_stats: &'info AccountMeta,
        pub user: &'info AccountMeta,
        pub user_stats: &'info AccountMeta,
    }

    #[derive(TryFromAccountMetas)]
    pub struct LiquidateBorrowForPerpPnlAccountMetas<'info> {
        pub state: &'info AccountMeta,
        pub authority: &'info AccountMeta,
        pub liquidator: &'info AccountMeta,
        pub liquidator_stats: &'info AccountMeta,
        pub user: &'info AccountMeta,
        pub user_stats: &'info AccountMeta,
    }

    #[derive(TryFromAccountMetas)]
    pub struct LiquidatePerpPnlForDepositAccountMetas<'info> {
        pub state: &'info AccountMeta,
        pub authority: &'info AccountMeta,
        pub liquidator: &'info AccountMeta,
        pub liquidator_stats: &'info AccountMeta,
        pub user: &'info AccountMeta,
        pub user_stats: &'info AccountMeta,
    }

    #[derive(TryFromAccountMetas)]
    pub struct SetUserStatusToBeingLiquidatedAccountMetas<'info> {
        pub state: &'info AccountMeta,
        pub user: &'info AccountMeta,
    }

    #[derive(TryFromAccountMetas)]
    pub struct ResolvePerpPnlDeficitAccountMetas<'info> {
        pub state: &'info AccountMeta,
        pub authority: &'info AccountMeta,
        pub spot_market_vault: &'info AccountMeta,
        pub insurance_fund_vault: &'info AccountMeta,
        pub drift_signer: &'info AccountMeta,
        pub token_program: &'info AccountMeta,
    }

    #[derive(TryFromAccountMetas)]
    pub struct ResolvePerpBankruptcyAccountMetas<'info> {
        pub state: &'info AccountMeta,
        pub authority: &'info AccountMeta,
        pub liquidator: &'info AccountMeta,
        pub liquidator_stats: &'info AccountMeta,
        pub user: &'info AccountMeta,
        pub user_stats: &'info AccountMeta,
        pub spot_market_vault: &'info AccountMeta,
        pub insurance_fund_vault: &'info AccountMeta,
        pub drift_signer: &'info AccountMeta,
        pub token_program: &'info AccountMeta,
    }

    #[derive(TryFromAccountMetas)]
    pub struct ResolveSpotBankruptcyAccountMetas<'info> {
        pub state: &'info AccountMeta,
        pub authority: &'info AccountMeta,
        pub liquidator: &'info AccountMeta,
        pub liquidator_stats: &'info AccountMeta,
        pub user: &'info AccountMeta,
        pub user_stats: &'info AccountMeta,
        pub spot_market_vault: &'info AccountMeta,
        pub insurance_fund_vault: &'info AccountMeta,
        pub drift_signer: &'info AccountMeta,
        pub token_program: &'info AccountMeta,
    }

    #[derive(TryFromAccountMetas)]
    pub struct SettleRevenueToInsuranceFundAccountMetas<'info> {
        pub state: &'info AccountMeta,
        pub spot_market: &'info AccountMeta,
        pub spot_market_vault: &'info AccountMeta,
        pub drift_signer: &'info AccountMeta,
        pub insurance_fund_vault: &'info AccountMeta,
        pub token_program: &'info AccountMeta,
    }

    #[derive(TryFromAccountMetas)]
    pub struct UpdateFundingRateAccountMetas<'info> {
        pub state: &'info AccountMeta,
        pub perp_market: &'info AccountMeta,
        pub oracle: &'info AccountMeta,
    }

    #[derive(TryFromAccountMetas)]
    pub struct UpdatePrelaunchOracleAccountMetas<'info> {
        pub state: &'info AccountMeta,
        pub perp_market: &'info AccountMeta,
        pub oracle: &'info AccountMeta,
    }

    #[derive(TryFromAccountMetas)]
    pub struct UpdatePerpBidAskTwapAccountMetas<'info> {
        pub state: &'info AccountMeta,
        pub perp_market: &'info AccountMeta,
        pub oracle: &'info AccountMeta,
        pub keeper_stats: &'info AccountMeta,
        pub authority: &'info AccountMeta,
    }

    #[derive(TryFromAccountMetas)]
    pub struct UpdateSpotMarketCumulativeInterestAccountMetas<'info> {
        pub state: &'info AccountMeta,
        pub spot_market: &'info AccountMeta,
        pub oracle: &'info AccountMeta,
        pub spot_market_vault: &'info AccountMeta,
    }

    #[derive(TryFromAccountMetas)]
    pub struct UpdateAmmsAccountMetas<'info> {
        pub state: &'info AccountMeta,
        pub authority: &'info AccountMeta,
    }

    #[derive(TryFromAccountMetas)]
    pub struct UpdateSpotMarketExpiryAccountMetas<'info> {
        pub admin: &'info AccountMeta,
        pub state: &'info AccountMeta,
        pub spot_market: &'info AccountMeta,
    }

    #[derive(TryFromAccountMetas)]
    pub struct UpdateUserQuoteAssetInsuranceStakeAccountMetas<'info> {
        pub state: &'info AccountMeta,
        pub spot_market: &'info AccountMeta,
        pub insurance_fund_stake: &'info AccountMeta,
        pub user_stats: &'info AccountMeta,
        pub signer: &'info AccountMeta,
        pub insurance_fund_vault: &'info AccountMeta,
    }

    #[derive(TryFromAccountMetas)]
    pub struct UpdateUserGovTokenInsuranceStakeAccountMetas<'info> {
        pub state: &'info AccountMeta,
        pub spot_market: &'info AccountMeta,
        pub insurance_fund_stake: &'info AccountMeta,
        pub user_stats: &'info AccountMeta,
        pub signer: &'info AccountMeta,
        pub insurance_fund_vault: &'info AccountMeta,
    }

    #[derive(TryFromAccountMetas)]
    pub struct InitializeInsuranceFundStakeAccountMetas<'info> {
        pub spot_market: &'info AccountMeta,
        pub insurance_fund_stake: &'info AccountMeta,
        pub user_stats: &'info AccountMeta,
        pub state: &'info AccountMeta,
        pub authority: &'info AccountMeta,
        pub payer: &'info AccountMeta,
        pub rent: &'info AccountMeta,
        pub system_program: &'info AccountMeta,
    }

    #[derive(TryFromAccountMetas)]
    pub struct AddInsuranceFundStakeAccountMetas<'info> {
        pub state: &'info AccountMeta,
        pub spot_market: &'info AccountMeta,
        pub insurance_fund_stake: &'info AccountMeta,
        pub user_stats: &'info AccountMeta,
        pub authority: &'info AccountMeta,
        pub spot_market_vault: &'info AccountMeta,
        pub insurance_fund_vault: &'info AccountMeta,
        pub drift_signer: &'info AccountMeta,
        pub user_token_account: &'info AccountMeta,
        pub token_program: &'info AccountMeta,
    }

    #[derive(TryFromAccountMetas)]
    pub struct RequestRemoveInsuranceFundStakeAccountMetas<'info> {
        pub spot_market: &'info AccountMeta,
        pub insurance_fund_stake: &'info AccountMeta,
        pub user_stats: &'info AccountMeta,
        pub authority: &'info AccountMeta,
        pub insurance_fund_vault: &'info AccountMeta,
    }

    #[derive(TryFromAccountMetas)]
    pub struct CancelRequestRemoveInsuranceFundStakeAccountMetas<'info> {
        pub spot_market: &'info AccountMeta,
        pub insurance_fund_stake: &'info AccountMeta,
        pub user_stats: &'info AccountMeta,
        pub authority: &'info AccountMeta,
        pub insurance_fund_vault: &'info AccountMeta,
    }

    #[derive(TryFromAccountMetas)]
    pub struct RemoveInsuranceFundStakeAccountMetas<'info> {
        pub state: &'info AccountMeta,
        pub spot_market: &'info AccountMeta,
        pub insurance_fund_stake: &'info AccountMeta,
        pub user_stats: &'info AccountMeta,
        pub authority: &'info AccountMeta,
        pub insurance_fund_vault: &'info AccountMeta,
        pub drift_signer: &'info AccountMeta,
        pub user_token_account: &'info AccountMeta,
        pub token_program: &'info AccountMeta,
    }

    #[derive(TryFromAccountMetas)]
    pub struct TransferProtocolIfSharesAccountMetas<'info> {
        pub signer: &'info AccountMeta,
        pub transfer_config: &'info AccountMeta,
        pub state: &'info AccountMeta,
        pub spot_market: &'info AccountMeta,
        pub insurance_fund_stake: &'info AccountMeta,
        pub user_stats: &'info AccountMeta,
        pub authority: &'info AccountMeta,
        pub insurance_fund_vault: &'info AccountMeta,
    }

    #[derive(TryFromAccountMetas)]
    pub struct UpdatePythPullOracleAccountMetas<'info> {
        pub keeper: &'info AccountMeta,
        pub pyth_solana_receiver: &'info AccountMeta,
        pub encoded_vaa: &'info AccountMeta,
        pub price_feed: &'info AccountMeta,
    }

    #[derive(TryFromAccountMetas)]
    pub struct PostPythPullOracleUpdateAtomicAccountMetas<'info> {
        pub keeper: &'info AccountMeta,
        pub pyth_solana_receiver: &'info AccountMeta,
        pub guardian_set: &'info AccountMeta,
        pub price_feed: &'info AccountMeta,
    }

    #[derive(TryFromAccountMetas)]
    pub struct PostMultiPythPullOracleUpdatesAtomicAccountMetas<'info> {
        pub keeper: &'info AccountMeta,
        pub pyth_solana_receiver: &'info AccountMeta,
        pub guardian_set: &'info AccountMeta,
    }

    #[derive(TryFromAccountMetas)]
    pub struct InitializeAccountMetas<'info> {
        pub admin: &'info AccountMeta,
        pub state: &'info AccountMeta,
        pub quote_asset_mint: &'info AccountMeta,
        pub drift_signer: &'info AccountMeta,
        pub rent: &'info AccountMeta,
        pub system_program: &'info AccountMeta,
        pub token_program: &'info AccountMeta,
    }

    #[derive(TryFromAccountMetas)]
    pub struct InitializeSpotMarketAccountMetas<'info> {
        pub spot_market: &'info AccountMeta,
        pub spot_market_mint: &'info AccountMeta,
        pub spot_market_vault: &'info AccountMeta,
        pub insurance_fund_vault: &'info AccountMeta,
        pub drift_signer: &'info AccountMeta,
        pub state: &'info AccountMeta,
        pub oracle: &'info AccountMeta,
        pub admin: &'info AccountMeta,
        pub rent: &'info AccountMeta,
        pub system_program: &'info AccountMeta,
        pub token_program: &'info AccountMeta,
    }

    #[derive(TryFromAccountMetas)]
    pub struct DeleteInitializedSpotMarketAccountMetas<'info> {
        pub admin: &'info AccountMeta,
        pub state: &'info AccountMeta,
        pub spot_market: &'info AccountMeta,
        pub spot_market_vault: &'info AccountMeta,
        pub insurance_fund_vault: &'info AccountMeta,
        pub drift_signer: &'info AccountMeta,
        pub token_program: &'info AccountMeta,
    }

    #[derive(TryFromAccountMetas)]
    pub struct InitializeSerumFulfillmentConfigAccountMetas<'info> {
        pub base_spot_market: &'info AccountMeta,
        pub quote_spot_market: &'info AccountMeta,
        pub state: &'info AccountMeta,
        pub serum_program: &'info AccountMeta,
        pub serum_market: &'info AccountMeta,
        pub serum_open_orders: &'info AccountMeta,
        pub drift_signer: &'info AccountMeta,
        pub serum_fulfillment_config: &'info AccountMeta,
        pub admin: &'info AccountMeta,
        pub rent: &'info AccountMeta,
        pub system_program: &'info AccountMeta,
    }

    #[derive(TryFromAccountMetas)]
    pub struct UpdateSerumFulfillmentConfigStatusAccountMetas<'info> {
        pub state: &'info AccountMeta,
        pub serum_fulfillment_config: &'info AccountMeta,
        pub admin: &'info AccountMeta,
    }

    #[derive(TryFromAccountMetas)]
    pub struct InitializeOpenbookV2FulfillmentConfigAccountMetas<'info> {
        pub base_spot_market: &'info AccountMeta,
        pub quote_spot_market: &'info AccountMeta,
        pub state: &'info AccountMeta,
        pub openbook_v_2_program: &'info AccountMeta,
        pub openbook_v_2_market: &'info AccountMeta,
        pub drift_signer: &'info AccountMeta,
        pub openbook_v_2_fulfillment_config: &'info AccountMeta,
        pub admin: &'info AccountMeta,
        pub rent: &'info AccountMeta,
        pub system_program: &'info AccountMeta,
    }

    #[derive(TryFromAccountMetas)]
    pub struct OpenbookV2FulfillmentConfigStatusAccountMetas<'info> {
        pub state: &'info AccountMeta,
        pub openbook_v_2_fulfillment_config: &'info AccountMeta,
        pub admin: &'info AccountMeta,
    }

    #[derive(TryFromAccountMetas)]
    pub struct InitializePhoenixFulfillmentConfigAccountMetas<'info> {
        pub base_spot_market: &'info AccountMeta,
        pub quote_spot_market: &'info AccountMeta,
        pub state: &'info AccountMeta,
        pub phoenix_program: &'info AccountMeta,
        pub phoenix_market: &'info AccountMeta,
        pub drift_signer: &'info AccountMeta,
        pub phoenix_fulfillment_config: &'info AccountMeta,
        pub admin: &'info AccountMeta,
        pub rent: &'info AccountMeta,
        pub system_program: &'info AccountMeta,
    }

    #[derive(TryFromAccountMetas)]
    pub struct PhoenixFulfillmentConfigStatusAccountMetas<'info> {
        pub state: &'info AccountMeta,
        pub phoenix_fulfillment_config: &'info AccountMeta,
        pub admin: &'info AccountMeta,
    }

    #[derive(TryFromAccountMetas)]
    pub struct UpdateSerumVaultAccountMetas<'info> {
        pub state: &'info AccountMeta,
        pub admin: &'info AccountMeta,
        pub srm_vault: &'info AccountMeta,
    }

    #[derive(TryFromAccountMetas)]
    pub struct InitializePerpMarketAccountMetas<'info> {
        pub admin: &'info AccountMeta,
        pub state: &'info AccountMeta,
        pub perp_market: &'info AccountMeta,
        pub oracle: &'info AccountMeta,
        pub rent: &'info AccountMeta,
        pub system_program: &'info AccountMeta,
    }

    #[derive(TryFromAccountMetas)]
    pub struct InitializePredictionMarketAccountMetas<'info> {
        pub admin: &'info AccountMeta,
        pub state: &'info AccountMeta,
        pub perp_market: &'info AccountMeta,
    }

    #[derive(TryFromAccountMetas)]
    pub struct DeleteInitializedPerpMarketAccountMetas<'info> {
        pub admin: &'info AccountMeta,
        pub state: &'info AccountMeta,
        pub perp_market: &'info AccountMeta,
    }

    #[derive(TryFromAccountMetas)]
    pub struct MoveAmmPriceAccountMetas<'info> {
        pub admin: &'info AccountMeta,
        pub state: &'info AccountMeta,
        pub perp_market: &'info AccountMeta,
    }

    #[derive(TryFromAccountMetas)]
    pub struct RecenterPerpMarketAmmAccountMetas<'info> {
        pub admin: &'info AccountMeta,
        pub state: &'info AccountMeta,
        pub perp_market: &'info AccountMeta,
    }

    #[derive(TryFromAccountMetas)]
    pub struct UpdatePerpMarketAmmSummaryStatsAccountMetas<'info> {
        pub admin: &'info AccountMeta,
        pub state: &'info AccountMeta,
        pub perp_market: &'info AccountMeta,
        pub spot_market: &'info AccountMeta,
        pub oracle: &'info AccountMeta,
    }

    #[derive(TryFromAccountMetas)]
    pub struct UpdatePerpMarketExpiryAccountMetas<'info> {
        pub admin: &'info AccountMeta,
        pub state: &'info AccountMeta,
        pub perp_market: &'info AccountMeta,
    }

    #[derive(TryFromAccountMetas)]
    pub struct SettleExpiredMarketPoolsToRevenuePoolAccountMetas<'info> {
        pub state: &'info AccountMeta,
        pub admin: &'info AccountMeta,
        pub spot_market: &'info AccountMeta,
        pub perp_market: &'info AccountMeta,
    }

    #[derive(TryFromAccountMetas)]
    pub struct DepositIntoPerpMarketFeePoolAccountMetas<'info> {
        pub state: &'info AccountMeta,
        pub perp_market: &'info AccountMeta,
        pub admin: &'info AccountMeta,
        pub source_vault: &'info AccountMeta,
        pub drift_signer: &'info AccountMeta,
        pub quote_spot_market: &'info AccountMeta,
        pub spot_market_vault: &'info AccountMeta,
        pub token_program: &'info AccountMeta,
    }

    #[derive(TryFromAccountMetas)]
    pub struct DepositIntoSpotMarketVaultAccountMetas<'info> {
        pub state: &'info AccountMeta,
        pub spot_market: &'info AccountMeta,
        pub admin: &'info AccountMeta,
        pub source_vault: &'info AccountMeta,
        pub spot_market_vault: &'info AccountMeta,
        pub token_program: &'info AccountMeta,
    }

    #[derive(TryFromAccountMetas)]
    pub struct DepositIntoSpotMarketRevenuePoolAccountMetas<'info> {
        pub state: &'info AccountMeta,
        pub spot_market: &'info AccountMeta,
        pub authority: &'info AccountMeta,
        pub spot_market_vault: &'info AccountMeta,
        pub user_token_account: &'info AccountMeta,
        pub token_program: &'info AccountMeta,
    }

    #[derive(TryFromAccountMetas)]
    pub struct RepegAmmCurveAccountMetas<'info> {
        pub state: &'info AccountMeta,
        pub perp_market: &'info AccountMeta,
        pub oracle: &'info AccountMeta,
        pub admin: &'info AccountMeta,
    }

    #[derive(TryFromAccountMetas)]
    pub struct UpdatePerpMarketAmmOracleTwapAccountMetas<'info> {
        pub state: &'info AccountMeta,
        pub perp_market: &'info AccountMeta,
        pub oracle: &'info AccountMeta,
        pub admin: &'info AccountMeta,
    }

    #[derive(TryFromAccountMetas)]
    pub struct ResetPerpMarketAmmOracleTwapAccountMetas<'info> {
        pub state: &'info AccountMeta,
        pub perp_market: &'info AccountMeta,
        pub oracle: &'info AccountMeta,
        pub admin: &'info AccountMeta,
    }

    #[derive(TryFromAccountMetas)]
    pub struct UpdateKAccountMetas<'info> {
        pub admin: &'info AccountMeta,
        pub state: &'info AccountMeta,
        pub perp_market: &'info AccountMeta,
        pub oracle: &'info AccountMeta,
    }

    #[derive(TryFromAccountMetas)]
    pub struct UpdatePerpMarketMarginRatioAccountMetas<'info> {
        pub admin: &'info AccountMeta,
        pub state: &'info AccountMeta,
        pub perp_market: &'info AccountMeta,
    }

    #[derive(TryFromAccountMetas)]
    pub struct UpdatePerpMarketFundingPeriodAccountMetas<'info> {
        pub admin: &'info AccountMeta,
        pub state: &'info AccountMeta,
        pub perp_market: &'info AccountMeta,
    }

    #[derive(TryFromAccountMetas)]
    pub struct UpdatePerpMarketMaxImbalancesAccountMetas<'info> {
        pub admin: &'info AccountMeta,
        pub state: &'info AccountMeta,
        pub perp_market: &'info AccountMeta,
    }

    #[derive(TryFromAccountMetas)]
    pub struct UpdatePerpMarketLiquidationFeeAccountMetas<'info> {
        pub admin: &'info AccountMeta,
        pub state: &'info AccountMeta,
        pub perp_market: &'info AccountMeta,
    }

    #[derive(TryFromAccountMetas)]
    pub struct UpdateInsuranceFundUnstakingPeriodAccountMetas<'info> {
        pub admin: &'info AccountMeta,
        pub state: &'info AccountMeta,
        pub spot_market: &'info AccountMeta,
    }

    #[derive(TryFromAccountMetas)]
    pub struct UpdateSpotMarketLiquidationFeeAccountMetas<'info> {
        pub admin: &'info AccountMeta,
        pub state: &'info AccountMeta,
        pub spot_market: &'info AccountMeta,
    }

    #[derive(TryFromAccountMetas)]
    pub struct UpdateWithdrawGuardThresholdAccountMetas<'info> {
        pub admin: &'info AccountMeta,
        pub state: &'info AccountMeta,
        pub spot_market: &'info AccountMeta,
    }

    #[derive(TryFromAccountMetas)]
    pub struct UpdateSpotMarketIfFactorAccountMetas<'info> {
        pub admin: &'info AccountMeta,
        pub state: &'info AccountMeta,
        pub spot_market: &'info AccountMeta,
    }

    #[derive(TryFromAccountMetas)]
    pub struct UpdateSpotMarketRevenueSettlePeriodAccountMetas<'info> {
        pub admin: &'info AccountMeta,
        pub state: &'info AccountMeta,
        pub spot_market: &'info AccountMeta,
    }

    #[derive(TryFromAccountMetas)]
    pub struct UpdateSpotMarketStatusAccountMetas<'info> {
        pub admin: &'info AccountMeta,
        pub state: &'info AccountMeta,
        pub spot_market: &'info AccountMeta,
    }

    #[derive(TryFromAccountMetas)]
    pub struct UpdateSpotMarketPausedOperationsAccountMetas<'info> {
        pub admin: &'info AccountMeta,
        pub state: &'info AccountMeta,
        pub spot_market: &'info AccountMeta,
    }

    #[derive(TryFromAccountMetas)]
    pub struct UpdateSpotMarketAssetTierAccountMetas<'info> {
        pub admin: &'info AccountMeta,
        pub state: &'info AccountMeta,
        pub spot_market: &'info AccountMeta,
    }

    #[derive(TryFromAccountMetas)]
    pub struct UpdateSpotMarketMarginWeightsAccountMetas<'info> {
        pub admin: &'info AccountMeta,
        pub state: &'info AccountMeta,
        pub spot_market: &'info AccountMeta,
    }

    #[derive(TryFromAccountMetas)]
    pub struct UpdateSpotMarketBorrowRateAccountMetas<'info> {
        pub admin: &'info AccountMeta,
        pub state: &'info AccountMeta,
        pub spot_market: &'info AccountMeta,
    }

    #[derive(TryFromAccountMetas)]
    pub struct UpdateSpotMarketMaxTokenDepositsAccountMetas<'info> {
        pub admin: &'info AccountMeta,
        pub state: &'info AccountMeta,
        pub spot_market: &'info AccountMeta,
    }

    #[derive(TryFromAccountMetas)]
    pub struct UpdateSpotMarketMaxTokenBorrowsAccountMetas<'info> {
        pub admin: &'info AccountMeta,
        pub state: &'info AccountMeta,
        pub spot_market: &'info AccountMeta,
    }

    #[derive(TryFromAccountMetas)]
    pub struct UpdateSpotMarketScaleInitialAssetWeightStartAccountMetas<'info> {
        pub admin: &'info AccountMeta,
        pub state: &'info AccountMeta,
        pub spot_market: &'info AccountMeta,
    }

    #[derive(TryFromAccountMetas)]
    pub struct UpdateSpotMarketOracleAccountMetas<'info> {
        pub admin: &'info AccountMeta,
        pub state: &'info AccountMeta,
        pub spot_market: &'info AccountMeta,
        pub oracle: &'info AccountMeta,
    }

    #[derive(TryFromAccountMetas)]
    pub struct UpdateSpotMarketStepSizeAndTickSizeAccountMetas<'info> {
        pub admin: &'info AccountMeta,
        pub state: &'info AccountMeta,
        pub spot_market: &'info AccountMeta,
    }

    #[derive(TryFromAccountMetas)]
    pub struct UpdateSpotMarketMinOrderSizeAccountMetas<'info> {
        pub admin: &'info AccountMeta,
        pub state: &'info AccountMeta,
        pub spot_market: &'info AccountMeta,
    }

    #[derive(TryFromAccountMetas)]
    pub struct UpdateSpotMarketOrdersEnabledAccountMetas<'info> {
        pub admin: &'info AccountMeta,
        pub state: &'info AccountMeta,
        pub spot_market: &'info AccountMeta,
    }

    #[derive(TryFromAccountMetas)]
    pub struct UpdateSpotMarketIfPausedOperationsAccountMetas<'info> {
        pub admin: &'info AccountMeta,
        pub state: &'info AccountMeta,
        pub spot_market: &'info AccountMeta,
    }

    #[derive(TryFromAccountMetas)]
    pub struct UpdateSpotMarketNameAccountMetas<'info> {
        pub admin: &'info AccountMeta,
        pub state: &'info AccountMeta,
        pub spot_market: &'info AccountMeta,
    }

    #[derive(TryFromAccountMetas)]
    pub struct UpdatePerpMarketStatusAccountMetas<'info> {
        pub admin: &'info AccountMeta,
        pub state: &'info AccountMeta,
        pub perp_market: &'info AccountMeta,
    }

    #[derive(TryFromAccountMetas)]
    pub struct UpdatePerpMarketPausedOperationsAccountMetas<'info> {
        pub admin: &'info AccountMeta,
        pub state: &'info AccountMeta,
        pub perp_market: &'info AccountMeta,
    }

    #[derive(TryFromAccountMetas)]
    pub struct UpdatePerpMarketContractTierAccountMetas<'info> {
        pub admin: &'info AccountMeta,
        pub state: &'info AccountMeta,
        pub perp_market: &'info AccountMeta,
    }

    #[derive(TryFromAccountMetas)]
    pub struct UpdatePerpMarketImfFactorAccountMetas<'info> {
        pub admin: &'info AccountMeta,
        pub state: &'info AccountMeta,
        pub perp_market: &'info AccountMeta,
    }

    #[derive(TryFromAccountMetas)]
    pub struct UpdatePerpMarketUnrealizedAssetWeightAccountMetas<'info> {
        pub admin: &'info AccountMeta,
        pub state: &'info AccountMeta,
        pub perp_market: &'info AccountMeta,
    }

    #[derive(TryFromAccountMetas)]
    pub struct UpdatePerpMarketConcentrationCoefAccountMetas<'info> {
        pub admin: &'info AccountMeta,
        pub state: &'info AccountMeta,
        pub perp_market: &'info AccountMeta,
    }

    #[derive(TryFromAccountMetas)]
    pub struct UpdatePerpMarketCurveUpdateIntensityAccountMetas<'info> {
        pub admin: &'info AccountMeta,
        pub state: &'info AccountMeta,
        pub perp_market: &'info AccountMeta,
    }

    #[derive(TryFromAccountMetas)]
    pub struct UpdatePerpMarketTargetBaseAssetAmountPerLpAccountMetas<'info> {
        pub admin: &'info AccountMeta,
        pub state: &'info AccountMeta,
        pub perp_market: &'info AccountMeta,
    }

    #[derive(TryFromAccountMetas)]
    pub struct UpdatePerpMarketPerLpBaseAccountMetas<'info> {
        pub admin: &'info AccountMeta,
        pub state: &'info AccountMeta,
        pub perp_market: &'info AccountMeta,
    }

    #[derive(TryFromAccountMetas)]
    pub struct UpdateLpCooldownTimeAccountMetas<'info> {
        pub admin: &'info AccountMeta,
        pub state: &'info AccountMeta,
    }

    #[derive(TryFromAccountMetas)]
    pub struct UpdatePerpFeeStructureAccountMetas<'info> {
        pub admin: &'info AccountMeta,
        pub state: &'info AccountMeta,
    }

    #[derive(TryFromAccountMetas)]
    pub struct UpdateSpotFeeStructureAccountMetas<'info> {
        pub admin: &'info AccountMeta,
        pub state: &'info AccountMeta,
    }

    #[derive(TryFromAccountMetas)]
    pub struct UpdateInitialPctToLiquidateAccountMetas<'info> {
        pub admin: &'info AccountMeta,
        pub state: &'info AccountMeta,
    }

    #[derive(TryFromAccountMetas)]
    pub struct UpdateLiquidationDurationAccountMetas<'info> {
        pub admin: &'info AccountMeta,
        pub state: &'info AccountMeta,
    }

    #[derive(TryFromAccountMetas)]
    pub struct UpdateLiquidationMarginBufferRatioAccountMetas<'info> {
        pub admin: &'info AccountMeta,
        pub state: &'info AccountMeta,
    }

    #[derive(TryFromAccountMetas)]
    pub struct UpdateOracleGuardRailsAccountMetas<'info> {
        pub admin: &'info AccountMeta,
        pub state: &'info AccountMeta,
    }

    #[derive(TryFromAccountMetas)]
    pub struct UpdateStateSettlementDurationAccountMetas<'info> {
        pub admin: &'info AccountMeta,
        pub state: &'info AccountMeta,
    }

    #[derive(TryFromAccountMetas)]
    pub struct UpdateStateMaxNumberOfSubAccountsAccountMetas<'info> {
        pub admin: &'info AccountMeta,
        pub state: &'info AccountMeta,
    }

    #[derive(TryFromAccountMetas)]
    pub struct UpdateStateMaxInitializeUserFeeAccountMetas<'info> {
        pub admin: &'info AccountMeta,
        pub state: &'info AccountMeta,
    }

    #[derive(TryFromAccountMetas)]
    pub struct UpdatePerpMarketOracleAccountMetas<'info> {
        pub state: &'info AccountMeta,
        pub perp_market: &'info AccountMeta,
        pub oracle: &'info AccountMeta,
        pub admin: &'info AccountMeta,
    }

    #[derive(TryFromAccountMetas)]
    pub struct UpdatePerpMarketBaseSpreadAccountMetas<'info> {
        pub admin: &'info AccountMeta,
        pub state: &'info AccountMeta,
        pub perp_market: &'info AccountMeta,
    }

    #[derive(TryFromAccountMetas)]
    pub struct UpdateAmmJitIntensityAccountMetas<'info> {
        pub admin: &'info AccountMeta,
        pub state: &'info AccountMeta,
        pub perp_market: &'info AccountMeta,
    }

    #[derive(TryFromAccountMetas)]
    pub struct UpdatePerpMarketMaxSpreadAccountMetas<'info> {
        pub admin: &'info AccountMeta,
        pub state: &'info AccountMeta,
        pub perp_market: &'info AccountMeta,
    }

    #[derive(TryFromAccountMetas)]
    pub struct UpdatePerpMarketStepSizeAndTickSizeAccountMetas<'info> {
        pub admin: &'info AccountMeta,
        pub state: &'info AccountMeta,
        pub perp_market: &'info AccountMeta,
    }

    #[derive(TryFromAccountMetas)]
    pub struct UpdatePerpMarketNameAccountMetas<'info> {
        pub admin: &'info AccountMeta,
        pub state: &'info AccountMeta,
        pub perp_market: &'info AccountMeta,
    }

    #[derive(TryFromAccountMetas)]
    pub struct UpdatePerpMarketMinOrderSizeAccountMetas<'info> {
        pub admin: &'info AccountMeta,
        pub state: &'info AccountMeta,
        pub perp_market: &'info AccountMeta,
    }

    #[derive(TryFromAccountMetas)]
    pub struct UpdatePerpMarketMaxSlippageRatioAccountMetas<'info> {
        pub admin: &'info AccountMeta,
        pub state: &'info AccountMeta,
        pub perp_market: &'info AccountMeta,
    }

    #[derive(TryFromAccountMetas)]
    pub struct UpdatePerpMarketMaxFillReserveFractionAccountMetas<'info> {
        pub admin: &'info AccountMeta,
        pub state: &'info AccountMeta,
        pub perp_market: &'info AccountMeta,
    }

    #[derive(TryFromAccountMetas)]
    pub struct UpdatePerpMarketMaxOpenInterestAccountMetas<'info> {
        pub admin: &'info AccountMeta,
        pub state: &'info AccountMeta,
        pub perp_market: &'info AccountMeta,
    }

    #[derive(TryFromAccountMetas)]
    pub struct UpdatePerpMarketNumberOfUsersAccountMetas<'info> {
        pub admin: &'info AccountMeta,
        pub state: &'info AccountMeta,
        pub perp_market: &'info AccountMeta,
    }

    #[derive(TryFromAccountMetas)]
    pub struct UpdatePerpMarketFeeAdjustmentAccountMetas<'info> {
        pub admin: &'info AccountMeta,
        pub state: &'info AccountMeta,
        pub perp_market: &'info AccountMeta,
    }

    #[derive(TryFromAccountMetas)]
    pub struct UpdateSpotMarketFeeAdjustmentAccountMetas<'info> {
        pub admin: &'info AccountMeta,
        pub state: &'info AccountMeta,
        pub spot_market: &'info AccountMeta,
    }

    #[derive(TryFromAccountMetas)]
    pub struct UpdatePerpMarketFuelAccountMetas<'info> {
        pub admin: &'info AccountMeta,
        pub state: &'info AccountMeta,
        pub perp_market: &'info AccountMeta,
    }

    #[derive(TryFromAccountMetas)]
    pub struct UpdateSpotMarketFuelAccountMetas<'info> {
        pub admin: &'info AccountMeta,
        pub state: &'info AccountMeta,
        pub spot_market: &'info AccountMeta,
    }

    #[derive(TryFromAccountMetas)]
    pub struct InitUserFuelAccountMetas<'info> {
        pub admin: &'info AccountMeta,
        pub state: &'info AccountMeta,
        pub user: &'info AccountMeta,
        pub user_stats: &'info AccountMeta,
    }

    #[derive(TryFromAccountMetas)]
    pub struct UpdateAdminAccountMetas<'info> {
        pub admin: &'info AccountMeta,
        pub state: &'info AccountMeta,
    }

    #[derive(TryFromAccountMetas)]
    pub struct UpdateWhitelistMintAccountMetas<'info> {
        pub admin: &'info AccountMeta,
        pub state: &'info AccountMeta,
    }

    #[derive(TryFromAccountMetas)]
    pub struct UpdateDiscountMintAccountMetas<'info> {
        pub admin: &'info AccountMeta,
        pub state: &'info AccountMeta,
    }

    #[derive(TryFromAccountMetas)]
    pub struct UpdateExchangeStatusAccountMetas<'info> {
        pub admin: &'info AccountMeta,
        pub state: &'info AccountMeta,
    }

    #[derive(TryFromAccountMetas)]
    pub struct UpdatePerpAuctionDurationAccountMetas<'info> {
        pub admin: &'info AccountMeta,
        pub state: &'info AccountMeta,
    }

    #[derive(TryFromAccountMetas)]
    pub struct UpdateSpotAuctionDurationAccountMetas<'info> {
        pub admin: &'info AccountMeta,
        pub state: &'info AccountMeta,
    }

    #[derive(TryFromAccountMetas)]
    pub struct InitializeProtocolIfSharesTransferConfigAccountMetas<'info> {
        pub admin: &'info AccountMeta,
        pub protocol_if_shares_transfer_config: &'info AccountMeta,
        pub state: &'info AccountMeta,
        pub rent: &'info AccountMeta,
        pub system_program: &'info AccountMeta,
    }

    #[derive(TryFromAccountMetas)]
    pub struct UpdateProtocolIfSharesTransferConfigAccountMetas<'info> {
        pub admin: &'info AccountMeta,
        pub protocol_if_shares_transfer_config: &'info AccountMeta,
        pub state: &'info AccountMeta,
    }

    #[derive(TryFromAccountMetas)]
    pub struct InitializePrelaunchOracleAccountMetas<'info> {
        pub admin: &'info AccountMeta,
        pub prelaunch_oracle: &'info AccountMeta,
        pub state: &'info AccountMeta,
        pub rent: &'info AccountMeta,
        pub system_program: &'info AccountMeta,
    }

    #[derive(TryFromAccountMetas)]
    pub struct UpdatePrelaunchOracleParamsAccountMetas<'info> {
        pub admin: &'info AccountMeta,
        pub prelaunch_oracle: &'info AccountMeta,
        pub perp_market: &'info AccountMeta,
        pub state: &'info AccountMeta,
    }

    #[derive(TryFromAccountMetas)]
    pub struct DeletePrelaunchOracleAccountMetas<'info> {
        pub admin: &'info AccountMeta,
        pub prelaunch_oracle: &'info AccountMeta,
        pub perp_market: &'info AccountMeta,
        pub state: &'info AccountMeta,
    }

    #[derive(TryFromAccountMetas)]
    pub struct InitializePythPullOracleAccountMetas<'info> {
        pub admin: &'info AccountMeta,
        pub pyth_solana_receiver: &'info AccountMeta,
        pub price_feed: &'info AccountMeta,
        pub system_program: &'info AccountMeta,
        pub state: &'info AccountMeta,
    }
}

// Instructions
pub mod instructions {
    use anchor_lang::prelude::*;
    use anchor_i11n::prelude::*;
    use anchor_lang::Discriminator;
    use super::*;

    #[derive(AnchorDiscriminator, AnchorSerialize, AnchorDeserialize)]
    pub struct InitializeUser {
        pub sub_account_id: u16,
        pub name: [u8;32],
    }
    
    impl anchor_lang::InstructionData for InitializeUser {
        fn data(&self) -> Vec<u8> {
            let mut data = Vec::with_capacity(256);
            data.extend_from_slice(&Self::DISCRIMINATOR);
            self.serialize(&mut data).unwrap();
            data
        }
    
        fn write_to(&self, mut data: &mut Vec<u8>) {
            data.clear();
            data.extend_from_slice(&Self::DISCRIMINATOR);
            self.serialize(&mut data).unwrap()
        }
    }
    

    #[derive(AnchorDiscriminator, AnchorSerialize, AnchorDeserialize)]
    pub struct InitializeUserStats {

    }
    
    impl anchor_lang::InstructionData for InitializeUserStats {
        fn data(&self) -> Vec<u8> {
            let mut data = Vec::with_capacity(256);
            data.extend_from_slice(&Self::DISCRIMINATOR);
            self.serialize(&mut data).unwrap();
            data
        }
    
        fn write_to(&self, mut data: &mut Vec<u8>) {
            data.clear();
            data.extend_from_slice(&Self::DISCRIMINATOR);
            self.serialize(&mut data).unwrap()
        }
    }
    

    #[derive(AnchorDiscriminator, AnchorSerialize, AnchorDeserialize)]
    pub struct InitializeReferrerName {
        pub name: [u8;32],
    }
    
    impl anchor_lang::InstructionData for InitializeReferrerName {
        fn data(&self) -> Vec<u8> {
            let mut data = Vec::with_capacity(256);
            data.extend_from_slice(&Self::DISCRIMINATOR);
            self.serialize(&mut data).unwrap();
            data
        }
    
        fn write_to(&self, mut data: &mut Vec<u8>) {
            data.clear();
            data.extend_from_slice(&Self::DISCRIMINATOR);
            self.serialize(&mut data).unwrap()
        }
    }
    

    #[derive(AnchorDiscriminator, AnchorSerialize, AnchorDeserialize)]
    pub struct Deposit {
        pub market_index: u16,
        pub amount: u64,
        pub reduce_only: bool,
    }
    
    impl anchor_lang::InstructionData for Deposit {
        fn data(&self) -> Vec<u8> {
            let mut data = Vec::with_capacity(256);
            data.extend_from_slice(&Self::DISCRIMINATOR);
            self.serialize(&mut data).unwrap();
            data
        }
    
        fn write_to(&self, mut data: &mut Vec<u8>) {
            data.clear();
            data.extend_from_slice(&Self::DISCRIMINATOR);
            self.serialize(&mut data).unwrap()
        }
    }
    

    #[derive(AnchorDiscriminator, AnchorSerialize, AnchorDeserialize)]
    pub struct Withdraw {
        pub market_index: u16,
        pub amount: u64,
        pub reduce_only: bool,
    }
    
    impl anchor_lang::InstructionData for Withdraw {
        fn data(&self) -> Vec<u8> {
            let mut data = Vec::with_capacity(256);
            data.extend_from_slice(&Self::DISCRIMINATOR);
            self.serialize(&mut data).unwrap();
            data
        }
    
        fn write_to(&self, mut data: &mut Vec<u8>) {
            data.clear();
            data.extend_from_slice(&Self::DISCRIMINATOR);
            self.serialize(&mut data).unwrap()
        }
    }
    

    #[derive(AnchorDiscriminator, AnchorSerialize, AnchorDeserialize)]
    pub struct TransferDeposit {
        pub market_index: u16,
        pub amount: u64,
    }
    
    impl anchor_lang::InstructionData for TransferDeposit {
        fn data(&self) -> Vec<u8> {
            let mut data = Vec::with_capacity(256);
            data.extend_from_slice(&Self::DISCRIMINATOR);
            self.serialize(&mut data).unwrap();
            data
        }
    
        fn write_to(&self, mut data: &mut Vec<u8>) {
            data.clear();
            data.extend_from_slice(&Self::DISCRIMINATOR);
            self.serialize(&mut data).unwrap()
        }
    }
    

    #[derive(AnchorDiscriminator, AnchorSerialize, AnchorDeserialize)]
    pub struct PlacePerpOrder {
        pub params: OrderParams,
    }
    
    impl anchor_lang::InstructionData for PlacePerpOrder {
        fn data(&self) -> Vec<u8> {
            let mut data = Vec::with_capacity(256);
            data.extend_from_slice(&Self::DISCRIMINATOR);
            self.serialize(&mut data).unwrap();
            data
        }
    
        fn write_to(&self, mut data: &mut Vec<u8>) {
            data.clear();
            data.extend_from_slice(&Self::DISCRIMINATOR);
            self.serialize(&mut data).unwrap()
        }
    }
    

    #[derive(AnchorDiscriminator, AnchorSerialize, AnchorDeserialize)]
    pub struct CancelOrder {
        pub order_id: Option<u32>,
    }
    
    impl anchor_lang::InstructionData for CancelOrder {
        fn data(&self) -> Vec<u8> {
            let mut data = Vec::with_capacity(256);
            data.extend_from_slice(&Self::DISCRIMINATOR);
            self.serialize(&mut data).unwrap();
            data
        }
    
        fn write_to(&self, mut data: &mut Vec<u8>) {
            data.clear();
            data.extend_from_slice(&Self::DISCRIMINATOR);
            self.serialize(&mut data).unwrap()
        }
    }
    

    #[derive(AnchorDiscriminator, AnchorSerialize, AnchorDeserialize)]
    pub struct CancelOrderByUserId {
        pub user_order_id: u8,
    }
    
    impl anchor_lang::InstructionData for CancelOrderByUserId {
        fn data(&self) -> Vec<u8> {
            let mut data = Vec::with_capacity(256);
            data.extend_from_slice(&Self::DISCRIMINATOR);
            self.serialize(&mut data).unwrap();
            data
        }
    
        fn write_to(&self, mut data: &mut Vec<u8>) {
            data.clear();
            data.extend_from_slice(&Self::DISCRIMINATOR);
            self.serialize(&mut data).unwrap()
        }
    }
    

    #[derive(AnchorDiscriminator, AnchorSerialize, AnchorDeserialize)]
    pub struct CancelOrders {
        pub market_type: Option<MarketType>,
        pub market_index: Option<u16>,
        pub direction: Option<PositionDirection>,
    }
    
    impl anchor_lang::InstructionData for CancelOrders {
        fn data(&self) -> Vec<u8> {
            let mut data = Vec::with_capacity(256);
            data.extend_from_slice(&Self::DISCRIMINATOR);
            self.serialize(&mut data).unwrap();
            data
        }
    
        fn write_to(&self, mut data: &mut Vec<u8>) {
            data.clear();
            data.extend_from_slice(&Self::DISCRIMINATOR);
            self.serialize(&mut data).unwrap()
        }
    }
    

    #[derive(AnchorDiscriminator, AnchorSerialize, AnchorDeserialize)]
    pub struct CancelOrdersByIds {
        pub order_ids: Vec<u32>,
    }
    
    impl anchor_lang::InstructionData for CancelOrdersByIds {
        fn data(&self) -> Vec<u8> {
            let mut data = Vec::with_capacity(256);
            data.extend_from_slice(&Self::DISCRIMINATOR);
            self.serialize(&mut data).unwrap();
            data
        }
    
        fn write_to(&self, mut data: &mut Vec<u8>) {
            data.clear();
            data.extend_from_slice(&Self::DISCRIMINATOR);
            self.serialize(&mut data).unwrap()
        }
    }
    

    #[derive(AnchorDiscriminator, AnchorSerialize, AnchorDeserialize)]
    pub struct ModifyOrder {
        pub order_id: Option<u32>,
        pub modify_order_params: ModifyOrderParams,
    }
    
    impl anchor_lang::InstructionData for ModifyOrder {
        fn data(&self) -> Vec<u8> {
            let mut data = Vec::with_capacity(256);
            data.extend_from_slice(&Self::DISCRIMINATOR);
            self.serialize(&mut data).unwrap();
            data
        }
    
        fn write_to(&self, mut data: &mut Vec<u8>) {
            data.clear();
            data.extend_from_slice(&Self::DISCRIMINATOR);
            self.serialize(&mut data).unwrap()
        }
    }
    

    #[derive(AnchorDiscriminator, AnchorSerialize, AnchorDeserialize)]
    pub struct ModifyOrderByUserId {
        pub user_order_id: u8,
        pub modify_order_params: ModifyOrderParams,
    }
    
    impl anchor_lang::InstructionData for ModifyOrderByUserId {
        fn data(&self) -> Vec<u8> {
            let mut data = Vec::with_capacity(256);
            data.extend_from_slice(&Self::DISCRIMINATOR);
            self.serialize(&mut data).unwrap();
            data
        }
    
        fn write_to(&self, mut data: &mut Vec<u8>) {
            data.clear();
            data.extend_from_slice(&Self::DISCRIMINATOR);
            self.serialize(&mut data).unwrap()
        }
    }
    

    #[derive(AnchorDiscriminator, AnchorSerialize, AnchorDeserialize)]
    pub struct PlaceAndTakePerpOrder {
        pub params: OrderParams,
        pub maker_order_id: Option<u32>,
    }
    
    impl anchor_lang::InstructionData for PlaceAndTakePerpOrder {
        fn data(&self) -> Vec<u8> {
            let mut data = Vec::with_capacity(256);
            data.extend_from_slice(&Self::DISCRIMINATOR);
            self.serialize(&mut data).unwrap();
            data
        }
    
        fn write_to(&self, mut data: &mut Vec<u8>) {
            data.clear();
            data.extend_from_slice(&Self::DISCRIMINATOR);
            self.serialize(&mut data).unwrap()
        }
    }
    

    #[derive(AnchorDiscriminator, AnchorSerialize, AnchorDeserialize)]
    pub struct PlaceAndMakePerpOrder {
        pub params: OrderParams,
        pub taker_order_id: u32,
    }
    
    impl anchor_lang::InstructionData for PlaceAndMakePerpOrder {
        fn data(&self) -> Vec<u8> {
            let mut data = Vec::with_capacity(256);
            data.extend_from_slice(&Self::DISCRIMINATOR);
            self.serialize(&mut data).unwrap();
            data
        }
    
        fn write_to(&self, mut data: &mut Vec<u8>) {
            data.clear();
            data.extend_from_slice(&Self::DISCRIMINATOR);
            self.serialize(&mut data).unwrap()
        }
    }
    

    #[derive(AnchorDiscriminator, AnchorSerialize, AnchorDeserialize)]
    pub struct PlaceSpotOrder {
        pub params: OrderParams,
    }
    
    impl anchor_lang::InstructionData for PlaceSpotOrder {
        fn data(&self) -> Vec<u8> {
            let mut data = Vec::with_capacity(256);
            data.extend_from_slice(&Self::DISCRIMINATOR);
            self.serialize(&mut data).unwrap();
            data
        }
    
        fn write_to(&self, mut data: &mut Vec<u8>) {
            data.clear();
            data.extend_from_slice(&Self::DISCRIMINATOR);
            self.serialize(&mut data).unwrap()
        }
    }
    

    #[derive(AnchorDiscriminator, AnchorSerialize, AnchorDeserialize)]
    pub struct PlaceAndTakeSpotOrder {
        pub params: OrderParams,
        pub fulfillment_type: Option<SpotFulfillmentType>,
        pub maker_order_id: Option<u32>,
    }
    
    impl anchor_lang::InstructionData for PlaceAndTakeSpotOrder {
        fn data(&self) -> Vec<u8> {
            let mut data = Vec::with_capacity(256);
            data.extend_from_slice(&Self::DISCRIMINATOR);
            self.serialize(&mut data).unwrap();
            data
        }
    
        fn write_to(&self, mut data: &mut Vec<u8>) {
            data.clear();
            data.extend_from_slice(&Self::DISCRIMINATOR);
            self.serialize(&mut data).unwrap()
        }
    }
    

    #[derive(AnchorDiscriminator, AnchorSerialize, AnchorDeserialize)]
    pub struct PlaceAndMakeSpotOrder {
        pub params: OrderParams,
        pub taker_order_id: u32,
        pub fulfillment_type: Option<SpotFulfillmentType>,
    }
    
    impl anchor_lang::InstructionData for PlaceAndMakeSpotOrder {
        fn data(&self) -> Vec<u8> {
            let mut data = Vec::with_capacity(256);
            data.extend_from_slice(&Self::DISCRIMINATOR);
            self.serialize(&mut data).unwrap();
            data
        }
    
        fn write_to(&self, mut data: &mut Vec<u8>) {
            data.clear();
            data.extend_from_slice(&Self::DISCRIMINATOR);
            self.serialize(&mut data).unwrap()
        }
    }
    

    #[derive(AnchorDiscriminator, AnchorSerialize, AnchorDeserialize)]
    pub struct PlaceOrders {
        pub params: Vec<OrderParams>,
    }
    
    impl anchor_lang::InstructionData for PlaceOrders {
        fn data(&self) -> Vec<u8> {
            let mut data = Vec::with_capacity(256);
            data.extend_from_slice(&Self::DISCRIMINATOR);
            self.serialize(&mut data).unwrap();
            data
        }
    
        fn write_to(&self, mut data: &mut Vec<u8>) {
            data.clear();
            data.extend_from_slice(&Self::DISCRIMINATOR);
            self.serialize(&mut data).unwrap()
        }
    }
    

    #[derive(AnchorDiscriminator, AnchorSerialize, AnchorDeserialize)]
    pub struct BeginSwap {
        pub in_market_index: u16,
        pub out_market_index: u16,
        pub amount_in: u64,
    }
    
    impl anchor_lang::InstructionData for BeginSwap {
        fn data(&self) -> Vec<u8> {
            let mut data = Vec::with_capacity(256);
            data.extend_from_slice(&Self::DISCRIMINATOR);
            self.serialize(&mut data).unwrap();
            data
        }
    
        fn write_to(&self, mut data: &mut Vec<u8>) {
            data.clear();
            data.extend_from_slice(&Self::DISCRIMINATOR);
            self.serialize(&mut data).unwrap()
        }
    }
    

    #[derive(AnchorDiscriminator, AnchorSerialize, AnchorDeserialize)]
    pub struct EndSwap {
        pub in_market_index: u16,
        pub out_market_index: u16,
        pub limit_price: Option<u64>,
        pub reduce_only: Option<SwapReduceOnly>,
    }
    
    impl anchor_lang::InstructionData for EndSwap {
        fn data(&self) -> Vec<u8> {
            let mut data = Vec::with_capacity(256);
            data.extend_from_slice(&Self::DISCRIMINATOR);
            self.serialize(&mut data).unwrap();
            data
        }
    
        fn write_to(&self, mut data: &mut Vec<u8>) {
            data.clear();
            data.extend_from_slice(&Self::DISCRIMINATOR);
            self.serialize(&mut data).unwrap()
        }
    }
    

    #[derive(AnchorDiscriminator, AnchorSerialize, AnchorDeserialize)]
    pub struct AddPerpLpShares {
        pub n_shares: u64,
        pub market_index: u16,
    }
    
    impl anchor_lang::InstructionData for AddPerpLpShares {
        fn data(&self) -> Vec<u8> {
            let mut data = Vec::with_capacity(256);
            data.extend_from_slice(&Self::DISCRIMINATOR);
            self.serialize(&mut data).unwrap();
            data
        }
    
        fn write_to(&self, mut data: &mut Vec<u8>) {
            data.clear();
            data.extend_from_slice(&Self::DISCRIMINATOR);
            self.serialize(&mut data).unwrap()
        }
    }
    

    #[derive(AnchorDiscriminator, AnchorSerialize, AnchorDeserialize)]
    pub struct RemovePerpLpShares {
        pub shares_to_burn: u64,
        pub market_index: u16,
    }
    
    impl anchor_lang::InstructionData for RemovePerpLpShares {
        fn data(&self) -> Vec<u8> {
            let mut data = Vec::with_capacity(256);
            data.extend_from_slice(&Self::DISCRIMINATOR);
            self.serialize(&mut data).unwrap();
            data
        }
    
        fn write_to(&self, mut data: &mut Vec<u8>) {
            data.clear();
            data.extend_from_slice(&Self::DISCRIMINATOR);
            self.serialize(&mut data).unwrap()
        }
    }
    

    #[derive(AnchorDiscriminator, AnchorSerialize, AnchorDeserialize)]
    pub struct RemovePerpLpSharesInExpiringMarket {
        pub shares_to_burn: u64,
        pub market_index: u16,
    }
    
    impl anchor_lang::InstructionData for RemovePerpLpSharesInExpiringMarket {
        fn data(&self) -> Vec<u8> {
            let mut data = Vec::with_capacity(256);
            data.extend_from_slice(&Self::DISCRIMINATOR);
            self.serialize(&mut data).unwrap();
            data
        }
    
        fn write_to(&self, mut data: &mut Vec<u8>) {
            data.clear();
            data.extend_from_slice(&Self::DISCRIMINATOR);
            self.serialize(&mut data).unwrap()
        }
    }
    

    #[derive(AnchorDiscriminator, AnchorSerialize, AnchorDeserialize)]
    pub struct UpdateUserName {
        pub sub_account_id: u16,
        pub name: [u8;32],
    }
    
    impl anchor_lang::InstructionData for UpdateUserName {
        fn data(&self) -> Vec<u8> {
            let mut data = Vec::with_capacity(256);
            data.extend_from_slice(&Self::DISCRIMINATOR);
            self.serialize(&mut data).unwrap();
            data
        }
    
        fn write_to(&self, mut data: &mut Vec<u8>) {
            data.clear();
            data.extend_from_slice(&Self::DISCRIMINATOR);
            self.serialize(&mut data).unwrap()
        }
    }
    

    #[derive(AnchorDiscriminator, AnchorSerialize, AnchorDeserialize)]
    pub struct UpdateUserCustomMarginRatio {
        pub sub_account_id: u16,
        pub margin_ratio: u32,
    }
    
    impl anchor_lang::InstructionData for UpdateUserCustomMarginRatio {
        fn data(&self) -> Vec<u8> {
            let mut data = Vec::with_capacity(256);
            data.extend_from_slice(&Self::DISCRIMINATOR);
            self.serialize(&mut data).unwrap();
            data
        }
    
        fn write_to(&self, mut data: &mut Vec<u8>) {
            data.clear();
            data.extend_from_slice(&Self::DISCRIMINATOR);
            self.serialize(&mut data).unwrap()
        }
    }
    

    #[derive(AnchorDiscriminator, AnchorSerialize, AnchorDeserialize)]
    pub struct UpdateUserMarginTradingEnabled {
        pub sub_account_id: u16,
        pub margin_trading_enabled: bool,
    }
    
    impl anchor_lang::InstructionData for UpdateUserMarginTradingEnabled {
        fn data(&self) -> Vec<u8> {
            let mut data = Vec::with_capacity(256);
            data.extend_from_slice(&Self::DISCRIMINATOR);
            self.serialize(&mut data).unwrap();
            data
        }
    
        fn write_to(&self, mut data: &mut Vec<u8>) {
            data.clear();
            data.extend_from_slice(&Self::DISCRIMINATOR);
            self.serialize(&mut data).unwrap()
        }
    }
    

    #[derive(AnchorDiscriminator, AnchorSerialize, AnchorDeserialize)]
    pub struct UpdateUserDelegate {
        pub sub_account_id: u16,
        pub delegate: Pubkey,
    }
    
    impl anchor_lang::InstructionData for UpdateUserDelegate {
        fn data(&self) -> Vec<u8> {
            let mut data = Vec::with_capacity(256);
            data.extend_from_slice(&Self::DISCRIMINATOR);
            self.serialize(&mut data).unwrap();
            data
        }
    
        fn write_to(&self, mut data: &mut Vec<u8>) {
            data.clear();
            data.extend_from_slice(&Self::DISCRIMINATOR);
            self.serialize(&mut data).unwrap()
        }
    }
    

    #[derive(AnchorDiscriminator, AnchorSerialize, AnchorDeserialize)]
    pub struct UpdateUserReduceOnly {
        pub sub_account_id: u16,
        pub reduce_only: bool,
    }
    
    impl anchor_lang::InstructionData for UpdateUserReduceOnly {
        fn data(&self) -> Vec<u8> {
            let mut data = Vec::with_capacity(256);
            data.extend_from_slice(&Self::DISCRIMINATOR);
            self.serialize(&mut data).unwrap();
            data
        }
    
        fn write_to(&self, mut data: &mut Vec<u8>) {
            data.clear();
            data.extend_from_slice(&Self::DISCRIMINATOR);
            self.serialize(&mut data).unwrap()
        }
    }
    

    #[derive(AnchorDiscriminator, AnchorSerialize, AnchorDeserialize)]
    pub struct UpdateUserAdvancedLp {
        pub sub_account_id: u16,
        pub advanced_lp: bool,
    }
    
    impl anchor_lang::InstructionData for UpdateUserAdvancedLp {
        fn data(&self) -> Vec<u8> {
            let mut data = Vec::with_capacity(256);
            data.extend_from_slice(&Self::DISCRIMINATOR);
            self.serialize(&mut data).unwrap();
            data
        }
    
        fn write_to(&self, mut data: &mut Vec<u8>) {
            data.clear();
            data.extend_from_slice(&Self::DISCRIMINATOR);
            self.serialize(&mut data).unwrap()
        }
    }
    

    #[derive(AnchorDiscriminator, AnchorSerialize, AnchorDeserialize)]
    pub struct DeleteUser {

    }
    
    impl anchor_lang::InstructionData for DeleteUser {
        fn data(&self) -> Vec<u8> {
            let mut data = Vec::with_capacity(256);
            data.extend_from_slice(&Self::DISCRIMINATOR);
            self.serialize(&mut data).unwrap();
            data
        }
    
        fn write_to(&self, mut data: &mut Vec<u8>) {
            data.clear();
            data.extend_from_slice(&Self::DISCRIMINATOR);
            self.serialize(&mut data).unwrap()
        }
    }
    

    #[derive(AnchorDiscriminator, AnchorSerialize, AnchorDeserialize)]
    pub struct ReclaimRent {

    }
    
    impl anchor_lang::InstructionData for ReclaimRent {
        fn data(&self) -> Vec<u8> {
            let mut data = Vec::with_capacity(256);
            data.extend_from_slice(&Self::DISCRIMINATOR);
            self.serialize(&mut data).unwrap();
            data
        }
    
        fn write_to(&self, mut data: &mut Vec<u8>) {
            data.clear();
            data.extend_from_slice(&Self::DISCRIMINATOR);
            self.serialize(&mut data).unwrap()
        }
    }
    

    #[derive(AnchorDiscriminator, AnchorSerialize, AnchorDeserialize)]
    pub struct FillPerpOrder {
        pub order_id: Option<u32>,
        pub maker_order_id: Option<u32>,
    }
    
    impl anchor_lang::InstructionData for FillPerpOrder {
        fn data(&self) -> Vec<u8> {
            let mut data = Vec::with_capacity(256);
            data.extend_from_slice(&Self::DISCRIMINATOR);
            self.serialize(&mut data).unwrap();
            data
        }
    
        fn write_to(&self, mut data: &mut Vec<u8>) {
            data.clear();
            data.extend_from_slice(&Self::DISCRIMINATOR);
            self.serialize(&mut data).unwrap()
        }
    }
    

    #[derive(AnchorDiscriminator, AnchorSerialize, AnchorDeserialize)]
    pub struct RevertFill {

    }
    
    impl anchor_lang::InstructionData for RevertFill {
        fn data(&self) -> Vec<u8> {
            let mut data = Vec::with_capacity(256);
            data.extend_from_slice(&Self::DISCRIMINATOR);
            self.serialize(&mut data).unwrap();
            data
        }
    
        fn write_to(&self, mut data: &mut Vec<u8>) {
            data.clear();
            data.extend_from_slice(&Self::DISCRIMINATOR);
            self.serialize(&mut data).unwrap()
        }
    }
    

    #[derive(AnchorDiscriminator, AnchorSerialize, AnchorDeserialize)]
    pub struct FillSpotOrder {
        pub order_id: Option<u32>,
        pub fulfillment_type: Option<SpotFulfillmentType>,
        pub maker_order_id: Option<u32>,
    }
    
    impl anchor_lang::InstructionData for FillSpotOrder {
        fn data(&self) -> Vec<u8> {
            let mut data = Vec::with_capacity(256);
            data.extend_from_slice(&Self::DISCRIMINATOR);
            self.serialize(&mut data).unwrap();
            data
        }
    
        fn write_to(&self, mut data: &mut Vec<u8>) {
            data.clear();
            data.extend_from_slice(&Self::DISCRIMINATOR);
            self.serialize(&mut data).unwrap()
        }
    }
    

    #[derive(AnchorDiscriminator, AnchorSerialize, AnchorDeserialize)]
    pub struct TriggerOrder {
        pub order_id: u32,
    }
    
    impl anchor_lang::InstructionData for TriggerOrder {
        fn data(&self) -> Vec<u8> {
            let mut data = Vec::with_capacity(256);
            data.extend_from_slice(&Self::DISCRIMINATOR);
            self.serialize(&mut data).unwrap();
            data
        }
    
        fn write_to(&self, mut data: &mut Vec<u8>) {
            data.clear();
            data.extend_from_slice(&Self::DISCRIMINATOR);
            self.serialize(&mut data).unwrap()
        }
    }
    

    #[derive(AnchorDiscriminator, AnchorSerialize, AnchorDeserialize)]
    pub struct ForceCancelOrders {

    }
    
    impl anchor_lang::InstructionData for ForceCancelOrders {
        fn data(&self) -> Vec<u8> {
            let mut data = Vec::with_capacity(256);
            data.extend_from_slice(&Self::DISCRIMINATOR);
            self.serialize(&mut data).unwrap();
            data
        }
    
        fn write_to(&self, mut data: &mut Vec<u8>) {
            data.clear();
            data.extend_from_slice(&Self::DISCRIMINATOR);
            self.serialize(&mut data).unwrap()
        }
    }
    

    #[derive(AnchorDiscriminator, AnchorSerialize, AnchorDeserialize)]
    pub struct UpdateUserIdle {

    }
    
    impl anchor_lang::InstructionData for UpdateUserIdle {
        fn data(&self) -> Vec<u8> {
            let mut data = Vec::with_capacity(256);
            data.extend_from_slice(&Self::DISCRIMINATOR);
            self.serialize(&mut data).unwrap();
            data
        }
    
        fn write_to(&self, mut data: &mut Vec<u8>) {
            data.clear();
            data.extend_from_slice(&Self::DISCRIMINATOR);
            self.serialize(&mut data).unwrap()
        }
    }
    

    #[derive(AnchorDiscriminator, AnchorSerialize, AnchorDeserialize)]
    pub struct UpdateUserOpenOrdersCount {

    }
    
    impl anchor_lang::InstructionData for UpdateUserOpenOrdersCount {
        fn data(&self) -> Vec<u8> {
            let mut data = Vec::with_capacity(256);
            data.extend_from_slice(&Self::DISCRIMINATOR);
            self.serialize(&mut data).unwrap();
            data
        }
    
        fn write_to(&self, mut data: &mut Vec<u8>) {
            data.clear();
            data.extend_from_slice(&Self::DISCRIMINATOR);
            self.serialize(&mut data).unwrap()
        }
    }
    

    #[derive(AnchorDiscriminator, AnchorSerialize, AnchorDeserialize)]
    pub struct AdminDisableUpdatePerpBidAskTwap {
        pub disable: bool,
    }
    
    impl anchor_lang::InstructionData for AdminDisableUpdatePerpBidAskTwap {
        fn data(&self) -> Vec<u8> {
            let mut data = Vec::with_capacity(256);
            data.extend_from_slice(&Self::DISCRIMINATOR);
            self.serialize(&mut data).unwrap();
            data
        }
    
        fn write_to(&self, mut data: &mut Vec<u8>) {
            data.clear();
            data.extend_from_slice(&Self::DISCRIMINATOR);
            self.serialize(&mut data).unwrap()
        }
    }
    

    #[derive(AnchorDiscriminator, AnchorSerialize, AnchorDeserialize)]
    pub struct SettlePnl {
        pub market_index: u16,
    }
    
    impl anchor_lang::InstructionData for SettlePnl {
        fn data(&self) -> Vec<u8> {
            let mut data = Vec::with_capacity(256);
            data.extend_from_slice(&Self::DISCRIMINATOR);
            self.serialize(&mut data).unwrap();
            data
        }
    
        fn write_to(&self, mut data: &mut Vec<u8>) {
            data.clear();
            data.extend_from_slice(&Self::DISCRIMINATOR);
            self.serialize(&mut data).unwrap()
        }
    }
    

    #[derive(AnchorDiscriminator, AnchorSerialize, AnchorDeserialize)]
    pub struct SettleMultiplePnls {
        pub market_indexes: Vec<u16>,
        pub mode: SettlePnlMode,
    }
    
    impl anchor_lang::InstructionData for SettleMultiplePnls {
        fn data(&self) -> Vec<u8> {
            let mut data = Vec::with_capacity(256);
            data.extend_from_slice(&Self::DISCRIMINATOR);
            self.serialize(&mut data).unwrap();
            data
        }
    
        fn write_to(&self, mut data: &mut Vec<u8>) {
            data.clear();
            data.extend_from_slice(&Self::DISCRIMINATOR);
            self.serialize(&mut data).unwrap()
        }
    }
    

    #[derive(AnchorDiscriminator, AnchorSerialize, AnchorDeserialize)]
    pub struct SettleFundingPayment {

    }
    
    impl anchor_lang::InstructionData for SettleFundingPayment {
        fn data(&self) -> Vec<u8> {
            let mut data = Vec::with_capacity(256);
            data.extend_from_slice(&Self::DISCRIMINATOR);
            self.serialize(&mut data).unwrap();
            data
        }
    
        fn write_to(&self, mut data: &mut Vec<u8>) {
            data.clear();
            data.extend_from_slice(&Self::DISCRIMINATOR);
            self.serialize(&mut data).unwrap()
        }
    }
    

    #[derive(AnchorDiscriminator, AnchorSerialize, AnchorDeserialize)]
    pub struct SettleLp {
        pub market_index: u16,
    }
    
    impl anchor_lang::InstructionData for SettleLp {
        fn data(&self) -> Vec<u8> {
            let mut data = Vec::with_capacity(256);
            data.extend_from_slice(&Self::DISCRIMINATOR);
            self.serialize(&mut data).unwrap();
            data
        }
    
        fn write_to(&self, mut data: &mut Vec<u8>) {
            data.clear();
            data.extend_from_slice(&Self::DISCRIMINATOR);
            self.serialize(&mut data).unwrap()
        }
    }
    

    #[derive(AnchorDiscriminator, AnchorSerialize, AnchorDeserialize)]
    pub struct SettleExpiredMarket {
        pub market_index: u16,
    }
    
    impl anchor_lang::InstructionData for SettleExpiredMarket {
        fn data(&self) -> Vec<u8> {
            let mut data = Vec::with_capacity(256);
            data.extend_from_slice(&Self::DISCRIMINATOR);
            self.serialize(&mut data).unwrap();
            data
        }
    
        fn write_to(&self, mut data: &mut Vec<u8>) {
            data.clear();
            data.extend_from_slice(&Self::DISCRIMINATOR);
            self.serialize(&mut data).unwrap()
        }
    }
    

    #[derive(AnchorDiscriminator, AnchorSerialize, AnchorDeserialize)]
    pub struct LiquidatePerp {
        pub market_index: u16,
        pub liquidator_max_base_asset_amount: u64,
        pub limit_price: Option<u64>,
    }
    
    impl anchor_lang::InstructionData for LiquidatePerp {
        fn data(&self) -> Vec<u8> {
            let mut data = Vec::with_capacity(256);
            data.extend_from_slice(&Self::DISCRIMINATOR);
            self.serialize(&mut data).unwrap();
            data
        }
    
        fn write_to(&self, mut data: &mut Vec<u8>) {
            data.clear();
            data.extend_from_slice(&Self::DISCRIMINATOR);
            self.serialize(&mut data).unwrap()
        }
    }
    

    #[derive(AnchorDiscriminator, AnchorSerialize, AnchorDeserialize)]
    pub struct LiquidatePerpWithFill {
        pub market_index: u16,
    }
    
    impl anchor_lang::InstructionData for LiquidatePerpWithFill {
        fn data(&self) -> Vec<u8> {
            let mut data = Vec::with_capacity(256);
            data.extend_from_slice(&Self::DISCRIMINATOR);
            self.serialize(&mut data).unwrap();
            data
        }
    
        fn write_to(&self, mut data: &mut Vec<u8>) {
            data.clear();
            data.extend_from_slice(&Self::DISCRIMINATOR);
            self.serialize(&mut data).unwrap()
        }
    }
    

    #[derive(AnchorDiscriminator, AnchorSerialize, AnchorDeserialize)]
    pub struct LiquidateSpot {
        pub asset_market_index: u16,
        pub liability_market_index: u16,
        pub liquidator_max_liability_transfer: u128,
        pub limit_price: Option<u64>,
    }
    
    impl anchor_lang::InstructionData for LiquidateSpot {
        fn data(&self) -> Vec<u8> {
            let mut data = Vec::with_capacity(256);
            data.extend_from_slice(&Self::DISCRIMINATOR);
            self.serialize(&mut data).unwrap();
            data
        }
    
        fn write_to(&self, mut data: &mut Vec<u8>) {
            data.clear();
            data.extend_from_slice(&Self::DISCRIMINATOR);
            self.serialize(&mut data).unwrap()
        }
    }
    

    #[derive(AnchorDiscriminator, AnchorSerialize, AnchorDeserialize)]
    pub struct LiquidateBorrowForPerpPnl {
        pub perp_market_index: u16,
        pub spot_market_index: u16,
        pub liquidator_max_liability_transfer: u128,
        pub limit_price: Option<u64>,
    }
    
    impl anchor_lang::InstructionData for LiquidateBorrowForPerpPnl {
        fn data(&self) -> Vec<u8> {
            let mut data = Vec::with_capacity(256);
            data.extend_from_slice(&Self::DISCRIMINATOR);
            self.serialize(&mut data).unwrap();
            data
        }
    
        fn write_to(&self, mut data: &mut Vec<u8>) {
            data.clear();
            data.extend_from_slice(&Self::DISCRIMINATOR);
            self.serialize(&mut data).unwrap()
        }
    }
    

    #[derive(AnchorDiscriminator, AnchorSerialize, AnchorDeserialize)]
    pub struct LiquidatePerpPnlForDeposit {
        pub perp_market_index: u16,
        pub spot_market_index: u16,
        pub liquidator_max_pnl_transfer: u128,
        pub limit_price: Option<u64>,
    }
    
    impl anchor_lang::InstructionData for LiquidatePerpPnlForDeposit {
        fn data(&self) -> Vec<u8> {
            let mut data = Vec::with_capacity(256);
            data.extend_from_slice(&Self::DISCRIMINATOR);
            self.serialize(&mut data).unwrap();
            data
        }
    
        fn write_to(&self, mut data: &mut Vec<u8>) {
            data.clear();
            data.extend_from_slice(&Self::DISCRIMINATOR);
            self.serialize(&mut data).unwrap()
        }
    }
    

    #[derive(AnchorDiscriminator, AnchorSerialize, AnchorDeserialize)]
    pub struct SetUserStatusToBeingLiquidated {

    }
    
    impl anchor_lang::InstructionData for SetUserStatusToBeingLiquidated {
        fn data(&self) -> Vec<u8> {
            let mut data = Vec::with_capacity(256);
            data.extend_from_slice(&Self::DISCRIMINATOR);
            self.serialize(&mut data).unwrap();
            data
        }
    
        fn write_to(&self, mut data: &mut Vec<u8>) {
            data.clear();
            data.extend_from_slice(&Self::DISCRIMINATOR);
            self.serialize(&mut data).unwrap()
        }
    }
    

    #[derive(AnchorDiscriminator, AnchorSerialize, AnchorDeserialize)]
    pub struct ResolvePerpPnlDeficit {
        pub spot_market_index: u16,
        pub perp_market_index: u16,
    }
    
    impl anchor_lang::InstructionData for ResolvePerpPnlDeficit {
        fn data(&self) -> Vec<u8> {
            let mut data = Vec::with_capacity(256);
            data.extend_from_slice(&Self::DISCRIMINATOR);
            self.serialize(&mut data).unwrap();
            data
        }
    
        fn write_to(&self, mut data: &mut Vec<u8>) {
            data.clear();
            data.extend_from_slice(&Self::DISCRIMINATOR);
            self.serialize(&mut data).unwrap()
        }
    }
    

    #[derive(AnchorDiscriminator, AnchorSerialize, AnchorDeserialize)]
    pub struct ResolvePerpBankruptcy {
        pub quote_spot_market_index: u16,
        pub market_index: u16,
    }
    
    impl anchor_lang::InstructionData for ResolvePerpBankruptcy {
        fn data(&self) -> Vec<u8> {
            let mut data = Vec::with_capacity(256);
            data.extend_from_slice(&Self::DISCRIMINATOR);
            self.serialize(&mut data).unwrap();
            data
        }
    
        fn write_to(&self, mut data: &mut Vec<u8>) {
            data.clear();
            data.extend_from_slice(&Self::DISCRIMINATOR);
            self.serialize(&mut data).unwrap()
        }
    }
    

    #[derive(AnchorDiscriminator, AnchorSerialize, AnchorDeserialize)]
    pub struct ResolveSpotBankruptcy {
        pub market_index: u16,
    }
    
    impl anchor_lang::InstructionData for ResolveSpotBankruptcy {
        fn data(&self) -> Vec<u8> {
            let mut data = Vec::with_capacity(256);
            data.extend_from_slice(&Self::DISCRIMINATOR);
            self.serialize(&mut data).unwrap();
            data
        }
    
        fn write_to(&self, mut data: &mut Vec<u8>) {
            data.clear();
            data.extend_from_slice(&Self::DISCRIMINATOR);
            self.serialize(&mut data).unwrap()
        }
    }
    

    #[derive(AnchorDiscriminator, AnchorSerialize, AnchorDeserialize)]
    pub struct SettleRevenueToInsuranceFund {
        pub spot_market_index: u16,
    }
    
    impl anchor_lang::InstructionData for SettleRevenueToInsuranceFund {
        fn data(&self) -> Vec<u8> {
            let mut data = Vec::with_capacity(256);
            data.extend_from_slice(&Self::DISCRIMINATOR);
            self.serialize(&mut data).unwrap();
            data
        }
    
        fn write_to(&self, mut data: &mut Vec<u8>) {
            data.clear();
            data.extend_from_slice(&Self::DISCRIMINATOR);
            self.serialize(&mut data).unwrap()
        }
    }
    

    #[derive(AnchorDiscriminator, AnchorSerialize, AnchorDeserialize)]
    pub struct UpdateFundingRate {
        pub market_index: u16,
    }
    
    impl anchor_lang::InstructionData for UpdateFundingRate {
        fn data(&self) -> Vec<u8> {
            let mut data = Vec::with_capacity(256);
            data.extend_from_slice(&Self::DISCRIMINATOR);
            self.serialize(&mut data).unwrap();
            data
        }
    
        fn write_to(&self, mut data: &mut Vec<u8>) {
            data.clear();
            data.extend_from_slice(&Self::DISCRIMINATOR);
            self.serialize(&mut data).unwrap()
        }
    }
    

    #[derive(AnchorDiscriminator, AnchorSerialize, AnchorDeserialize)]
    pub struct UpdatePrelaunchOracle {

    }
    
    impl anchor_lang::InstructionData for UpdatePrelaunchOracle {
        fn data(&self) -> Vec<u8> {
            let mut data = Vec::with_capacity(256);
            data.extend_from_slice(&Self::DISCRIMINATOR);
            self.serialize(&mut data).unwrap();
            data
        }
    
        fn write_to(&self, mut data: &mut Vec<u8>) {
            data.clear();
            data.extend_from_slice(&Self::DISCRIMINATOR);
            self.serialize(&mut data).unwrap()
        }
    }
    

    #[derive(AnchorDiscriminator, AnchorSerialize, AnchorDeserialize)]
    pub struct UpdatePerpBidAskTwap {

    }
    
    impl anchor_lang::InstructionData for UpdatePerpBidAskTwap {
        fn data(&self) -> Vec<u8> {
            let mut data = Vec::with_capacity(256);
            data.extend_from_slice(&Self::DISCRIMINATOR);
            self.serialize(&mut data).unwrap();
            data
        }
    
        fn write_to(&self, mut data: &mut Vec<u8>) {
            data.clear();
            data.extend_from_slice(&Self::DISCRIMINATOR);
            self.serialize(&mut data).unwrap()
        }
    }
    

    #[derive(AnchorDiscriminator, AnchorSerialize, AnchorDeserialize)]
    pub struct UpdateSpotMarketCumulativeInterest {

    }
    
    impl anchor_lang::InstructionData for UpdateSpotMarketCumulativeInterest {
        fn data(&self) -> Vec<u8> {
            let mut data = Vec::with_capacity(256);
            data.extend_from_slice(&Self::DISCRIMINATOR);
            self.serialize(&mut data).unwrap();
            data
        }
    
        fn write_to(&self, mut data: &mut Vec<u8>) {
            data.clear();
            data.extend_from_slice(&Self::DISCRIMINATOR);
            self.serialize(&mut data).unwrap()
        }
    }
    

    #[derive(AnchorDiscriminator, AnchorSerialize, AnchorDeserialize)]
    pub struct UpdateAmms {
        pub market_indexes: [u16;5],
    }
    
    impl anchor_lang::InstructionData for UpdateAmms {
        fn data(&self) -> Vec<u8> {
            let mut data = Vec::with_capacity(256);
            data.extend_from_slice(&Self::DISCRIMINATOR);
            self.serialize(&mut data).unwrap();
            data
        }
    
        fn write_to(&self, mut data: &mut Vec<u8>) {
            data.clear();
            data.extend_from_slice(&Self::DISCRIMINATOR);
            self.serialize(&mut data).unwrap()
        }
    }
    

    #[derive(AnchorDiscriminator, AnchorSerialize, AnchorDeserialize)]
    pub struct UpdateSpotMarketExpiry {
        pub expiry_ts: i64,
    }
    
    impl anchor_lang::InstructionData for UpdateSpotMarketExpiry {
        fn data(&self) -> Vec<u8> {
            let mut data = Vec::with_capacity(256);
            data.extend_from_slice(&Self::DISCRIMINATOR);
            self.serialize(&mut data).unwrap();
            data
        }
    
        fn write_to(&self, mut data: &mut Vec<u8>) {
            data.clear();
            data.extend_from_slice(&Self::DISCRIMINATOR);
            self.serialize(&mut data).unwrap()
        }
    }
    

    #[derive(AnchorDiscriminator, AnchorSerialize, AnchorDeserialize)]
    pub struct UpdateUserQuoteAssetInsuranceStake {

    }
    
    impl anchor_lang::InstructionData for UpdateUserQuoteAssetInsuranceStake {
        fn data(&self) -> Vec<u8> {
            let mut data = Vec::with_capacity(256);
            data.extend_from_slice(&Self::DISCRIMINATOR);
            self.serialize(&mut data).unwrap();
            data
        }
    
        fn write_to(&self, mut data: &mut Vec<u8>) {
            data.clear();
            data.extend_from_slice(&Self::DISCRIMINATOR);
            self.serialize(&mut data).unwrap()
        }
    }
    

    #[derive(AnchorDiscriminator, AnchorSerialize, AnchorDeserialize)]
    pub struct UpdateUserGovTokenInsuranceStake {

    }
    
    impl anchor_lang::InstructionData for UpdateUserGovTokenInsuranceStake {
        fn data(&self) -> Vec<u8> {
            let mut data = Vec::with_capacity(256);
            data.extend_from_slice(&Self::DISCRIMINATOR);
            self.serialize(&mut data).unwrap();
            data
        }
    
        fn write_to(&self, mut data: &mut Vec<u8>) {
            data.clear();
            data.extend_from_slice(&Self::DISCRIMINATOR);
            self.serialize(&mut data).unwrap()
        }
    }
    

    #[derive(AnchorDiscriminator, AnchorSerialize, AnchorDeserialize)]
    pub struct InitializeInsuranceFundStake {
        pub market_index: u16,
    }
    
    impl anchor_lang::InstructionData for InitializeInsuranceFundStake {
        fn data(&self) -> Vec<u8> {
            let mut data = Vec::with_capacity(256);
            data.extend_from_slice(&Self::DISCRIMINATOR);
            self.serialize(&mut data).unwrap();
            data
        }
    
        fn write_to(&self, mut data: &mut Vec<u8>) {
            data.clear();
            data.extend_from_slice(&Self::DISCRIMINATOR);
            self.serialize(&mut data).unwrap()
        }
    }
    

    #[derive(AnchorDiscriminator, AnchorSerialize, AnchorDeserialize)]
    pub struct AddInsuranceFundStake {
        pub market_index: u16,
        pub amount: u64,
    }
    
    impl anchor_lang::InstructionData for AddInsuranceFundStake {
        fn data(&self) -> Vec<u8> {
            let mut data = Vec::with_capacity(256);
            data.extend_from_slice(&Self::DISCRIMINATOR);
            self.serialize(&mut data).unwrap();
            data
        }
    
        fn write_to(&self, mut data: &mut Vec<u8>) {
            data.clear();
            data.extend_from_slice(&Self::DISCRIMINATOR);
            self.serialize(&mut data).unwrap()
        }
    }
    

    #[derive(AnchorDiscriminator, AnchorSerialize, AnchorDeserialize)]
    pub struct RequestRemoveInsuranceFundStake {
        pub market_index: u16,
        pub amount: u64,
    }
    
    impl anchor_lang::InstructionData for RequestRemoveInsuranceFundStake {
        fn data(&self) -> Vec<u8> {
            let mut data = Vec::with_capacity(256);
            data.extend_from_slice(&Self::DISCRIMINATOR);
            self.serialize(&mut data).unwrap();
            data
        }
    
        fn write_to(&self, mut data: &mut Vec<u8>) {
            data.clear();
            data.extend_from_slice(&Self::DISCRIMINATOR);
            self.serialize(&mut data).unwrap()
        }
    }
    

    #[derive(AnchorDiscriminator, AnchorSerialize, AnchorDeserialize)]
    pub struct CancelRequestRemoveInsuranceFundStake {
        pub market_index: u16,
    }
    
    impl anchor_lang::InstructionData for CancelRequestRemoveInsuranceFundStake {
        fn data(&self) -> Vec<u8> {
            let mut data = Vec::with_capacity(256);
            data.extend_from_slice(&Self::DISCRIMINATOR);
            self.serialize(&mut data).unwrap();
            data
        }
    
        fn write_to(&self, mut data: &mut Vec<u8>) {
            data.clear();
            data.extend_from_slice(&Self::DISCRIMINATOR);
            self.serialize(&mut data).unwrap()
        }
    }
    

    #[derive(AnchorDiscriminator, AnchorSerialize, AnchorDeserialize)]
    pub struct RemoveInsuranceFundStake {
        pub market_index: u16,
    }
    
    impl anchor_lang::InstructionData for RemoveInsuranceFundStake {
        fn data(&self) -> Vec<u8> {
            let mut data = Vec::with_capacity(256);
            data.extend_from_slice(&Self::DISCRIMINATOR);
            self.serialize(&mut data).unwrap();
            data
        }
    
        fn write_to(&self, mut data: &mut Vec<u8>) {
            data.clear();
            data.extend_from_slice(&Self::DISCRIMINATOR);
            self.serialize(&mut data).unwrap()
        }
    }
    

    #[derive(AnchorDiscriminator, AnchorSerialize, AnchorDeserialize)]
    pub struct TransferProtocolIfShares {
        pub market_index: u16,
        pub shares: u128,
    }
    
    impl anchor_lang::InstructionData for TransferProtocolIfShares {
        fn data(&self) -> Vec<u8> {
            let mut data = Vec::with_capacity(256);
            data.extend_from_slice(&Self::DISCRIMINATOR);
            self.serialize(&mut data).unwrap();
            data
        }
    
        fn write_to(&self, mut data: &mut Vec<u8>) {
            data.clear();
            data.extend_from_slice(&Self::DISCRIMINATOR);
            self.serialize(&mut data).unwrap()
        }
    }
    

    #[derive(AnchorDiscriminator, AnchorSerialize, AnchorDeserialize)]
    pub struct UpdatePythPullOracle {
        pub feed_id: [u8;32],
        pub params: Vec<u8>,
    }
    
    impl anchor_lang::InstructionData for UpdatePythPullOracle {
        fn data(&self) -> Vec<u8> {
            let mut data = Vec::with_capacity(256);
            data.extend_from_slice(&Self::DISCRIMINATOR);
            self.serialize(&mut data).unwrap();
            data
        }
    
        fn write_to(&self, mut data: &mut Vec<u8>) {
            data.clear();
            data.extend_from_slice(&Self::DISCRIMINATOR);
            self.serialize(&mut data).unwrap()
        }
    }
    

    #[derive(AnchorDiscriminator, AnchorSerialize, AnchorDeserialize)]
    pub struct PostPythPullOracleUpdateAtomic {
        pub feed_id: [u8;32],
        pub params: Vec<u8>,
    }
    
    impl anchor_lang::InstructionData for PostPythPullOracleUpdateAtomic {
        fn data(&self) -> Vec<u8> {
            let mut data = Vec::with_capacity(256);
            data.extend_from_slice(&Self::DISCRIMINATOR);
            self.serialize(&mut data).unwrap();
            data
        }
    
        fn write_to(&self, mut data: &mut Vec<u8>) {
            data.clear();
            data.extend_from_slice(&Self::DISCRIMINATOR);
            self.serialize(&mut data).unwrap()
        }
    }
    

    #[derive(AnchorDiscriminator, AnchorSerialize, AnchorDeserialize)]
    pub struct PostMultiPythPullOracleUpdatesAtomic {
        pub params: Vec<u8>,
    }
    
    impl anchor_lang::InstructionData for PostMultiPythPullOracleUpdatesAtomic {
        fn data(&self) -> Vec<u8> {
            let mut data = Vec::with_capacity(256);
            data.extend_from_slice(&Self::DISCRIMINATOR);
            self.serialize(&mut data).unwrap();
            data
        }
    
        fn write_to(&self, mut data: &mut Vec<u8>) {
            data.clear();
            data.extend_from_slice(&Self::DISCRIMINATOR);
            self.serialize(&mut data).unwrap()
        }
    }
    

    #[derive(AnchorDiscriminator, AnchorSerialize, AnchorDeserialize)]
    pub struct Initialize {

    }
    
    impl anchor_lang::InstructionData for Initialize {
        fn data(&self) -> Vec<u8> {
            let mut data = Vec::with_capacity(256);
            data.extend_from_slice(&Self::DISCRIMINATOR);
            self.serialize(&mut data).unwrap();
            data
        }
    
        fn write_to(&self, mut data: &mut Vec<u8>) {
            data.clear();
            data.extend_from_slice(&Self::DISCRIMINATOR);
            self.serialize(&mut data).unwrap()
        }
    }
    

    #[derive(AnchorDiscriminator, AnchorSerialize, AnchorDeserialize)]
    pub struct InitializeSpotMarket {
        pub optimal_utilization: u32,
        pub optimal_borrow_rate: u32,
        pub max_borrow_rate: u32,
        pub oracle_source: OracleSource,
        pub initial_asset_weight: u32,
        pub maintenance_asset_weight: u32,
        pub initial_liability_weight: u32,
        pub maintenance_liability_weight: u32,
        pub imf_factor: u32,
        pub liquidator_fee: u32,
        pub if_liquidation_fee: u32,
        pub active_status: bool,
        pub asset_tier: AssetTier,
        pub scale_initial_asset_weight_start: u64,
        pub withdraw_guard_threshold: u64,
        pub order_tick_size: u64,
        pub order_step_size: u64,
        pub if_total_factor: u32,
        pub name: [u8;32],
    }
    
    impl anchor_lang::InstructionData for InitializeSpotMarket {
        fn data(&self) -> Vec<u8> {
            let mut data = Vec::with_capacity(256);
            data.extend_from_slice(&Self::DISCRIMINATOR);
            self.serialize(&mut data).unwrap();
            data
        }
    
        fn write_to(&self, mut data: &mut Vec<u8>) {
            data.clear();
            data.extend_from_slice(&Self::DISCRIMINATOR);
            self.serialize(&mut data).unwrap()
        }
    }
    

    #[derive(AnchorDiscriminator, AnchorSerialize, AnchorDeserialize)]
    pub struct DeleteInitializedSpotMarket {
        pub market_index: u16,
    }
    
    impl anchor_lang::InstructionData for DeleteInitializedSpotMarket {
        fn data(&self) -> Vec<u8> {
            let mut data = Vec::with_capacity(256);
            data.extend_from_slice(&Self::DISCRIMINATOR);
            self.serialize(&mut data).unwrap();
            data
        }
    
        fn write_to(&self, mut data: &mut Vec<u8>) {
            data.clear();
            data.extend_from_slice(&Self::DISCRIMINATOR);
            self.serialize(&mut data).unwrap()
        }
    }
    

    #[derive(AnchorDiscriminator, AnchorSerialize, AnchorDeserialize)]
    pub struct InitializeSerumFulfillmentConfig {
        pub market_index: u16,
    }
    
    impl anchor_lang::InstructionData for InitializeSerumFulfillmentConfig {
        fn data(&self) -> Vec<u8> {
            let mut data = Vec::with_capacity(256);
            data.extend_from_slice(&Self::DISCRIMINATOR);
            self.serialize(&mut data).unwrap();
            data
        }
    
        fn write_to(&self, mut data: &mut Vec<u8>) {
            data.clear();
            data.extend_from_slice(&Self::DISCRIMINATOR);
            self.serialize(&mut data).unwrap()
        }
    }
    

    #[derive(AnchorDiscriminator, AnchorSerialize, AnchorDeserialize)]
    pub struct UpdateSerumFulfillmentConfigStatus {
        pub status: SpotFulfillmentConfigStatus,
    }
    
    impl anchor_lang::InstructionData for UpdateSerumFulfillmentConfigStatus {
        fn data(&self) -> Vec<u8> {
            let mut data = Vec::with_capacity(256);
            data.extend_from_slice(&Self::DISCRIMINATOR);
            self.serialize(&mut data).unwrap();
            data
        }
    
        fn write_to(&self, mut data: &mut Vec<u8>) {
            data.clear();
            data.extend_from_slice(&Self::DISCRIMINATOR);
            self.serialize(&mut data).unwrap()
        }
    }
    

    #[derive(AnchorDiscriminator, AnchorSerialize, AnchorDeserialize)]
    pub struct InitializeOpenbookV2FulfillmentConfig {
        pub market_index: u16,
    }
    
    impl anchor_lang::InstructionData for InitializeOpenbookV2FulfillmentConfig {
        fn data(&self) -> Vec<u8> {
            let mut data = Vec::with_capacity(256);
            data.extend_from_slice(&Self::DISCRIMINATOR);
            self.serialize(&mut data).unwrap();
            data
        }
    
        fn write_to(&self, mut data: &mut Vec<u8>) {
            data.clear();
            data.extend_from_slice(&Self::DISCRIMINATOR);
            self.serialize(&mut data).unwrap()
        }
    }
    

    #[derive(AnchorDiscriminator, AnchorSerialize, AnchorDeserialize)]
    pub struct OpenbookV2FulfillmentConfigStatus {
        pub status: SpotFulfillmentConfigStatus,
    }
    
    impl anchor_lang::InstructionData for OpenbookV2FulfillmentConfigStatus {
        fn data(&self) -> Vec<u8> {
            let mut data = Vec::with_capacity(256);
            data.extend_from_slice(&Self::DISCRIMINATOR);
            self.serialize(&mut data).unwrap();
            data
        }
    
        fn write_to(&self, mut data: &mut Vec<u8>) {
            data.clear();
            data.extend_from_slice(&Self::DISCRIMINATOR);
            self.serialize(&mut data).unwrap()
        }
    }
    

    #[derive(AnchorDiscriminator, AnchorSerialize, AnchorDeserialize)]
    pub struct InitializePhoenixFulfillmentConfig {
        pub market_index: u16,
    }
    
    impl anchor_lang::InstructionData for InitializePhoenixFulfillmentConfig {
        fn data(&self) -> Vec<u8> {
            let mut data = Vec::with_capacity(256);
            data.extend_from_slice(&Self::DISCRIMINATOR);
            self.serialize(&mut data).unwrap();
            data
        }
    
        fn write_to(&self, mut data: &mut Vec<u8>) {
            data.clear();
            data.extend_from_slice(&Self::DISCRIMINATOR);
            self.serialize(&mut data).unwrap()
        }
    }
    

    #[derive(AnchorDiscriminator, AnchorSerialize, AnchorDeserialize)]
    pub struct PhoenixFulfillmentConfigStatus {
        pub status: SpotFulfillmentConfigStatus,
    }
    
    impl anchor_lang::InstructionData for PhoenixFulfillmentConfigStatus {
        fn data(&self) -> Vec<u8> {
            let mut data = Vec::with_capacity(256);
            data.extend_from_slice(&Self::DISCRIMINATOR);
            self.serialize(&mut data).unwrap();
            data
        }
    
        fn write_to(&self, mut data: &mut Vec<u8>) {
            data.clear();
            data.extend_from_slice(&Self::DISCRIMINATOR);
            self.serialize(&mut data).unwrap()
        }
    }
    

    #[derive(AnchorDiscriminator, AnchorSerialize, AnchorDeserialize)]
    pub struct UpdateSerumVault {

    }
    
    impl anchor_lang::InstructionData for UpdateSerumVault {
        fn data(&self) -> Vec<u8> {
            let mut data = Vec::with_capacity(256);
            data.extend_from_slice(&Self::DISCRIMINATOR);
            self.serialize(&mut data).unwrap();
            data
        }
    
        fn write_to(&self, mut data: &mut Vec<u8>) {
            data.clear();
            data.extend_from_slice(&Self::DISCRIMINATOR);
            self.serialize(&mut data).unwrap()
        }
    }
    

    #[derive(AnchorDiscriminator, AnchorSerialize, AnchorDeserialize)]
    pub struct InitializePerpMarket {
        pub market_index: u16,
        pub amm_base_asset_reserve: u128,
        pub amm_quote_asset_reserve: u128,
        pub amm_periodicity: i64,
        pub amm_peg_multiplier: u128,
        pub oracle_source: OracleSource,
        pub contract_tier: ContractTier,
        pub margin_ratio_initial: u32,
        pub margin_ratio_maintenance: u32,
        pub liquidator_fee: u32,
        pub if_liquidation_fee: u32,
        pub imf_factor: u32,
        pub active_status: bool,
        pub base_spread: u32,
        pub max_spread: u32,
        pub max_open_interest: u128,
        pub max_revenue_withdraw_per_period: u64,
        pub quote_max_insurance: u64,
        pub order_step_size: u64,
        pub order_tick_size: u64,
        pub min_order_size: u64,
        pub concentration_coef_scale: u128,
        pub curve_update_intensity: u8,
        pub amm_jit_intensity: u8,
        pub name: [u8;32],
    }
    
    impl anchor_lang::InstructionData for InitializePerpMarket {
        fn data(&self) -> Vec<u8> {
            let mut data = Vec::with_capacity(256);
            data.extend_from_slice(&Self::DISCRIMINATOR);
            self.serialize(&mut data).unwrap();
            data
        }
    
        fn write_to(&self, mut data: &mut Vec<u8>) {
            data.clear();
            data.extend_from_slice(&Self::DISCRIMINATOR);
            self.serialize(&mut data).unwrap()
        }
    }
    

    #[derive(AnchorDiscriminator, AnchorSerialize, AnchorDeserialize)]
    pub struct InitializePredictionMarket {

    }
    
    impl anchor_lang::InstructionData for InitializePredictionMarket {
        fn data(&self) -> Vec<u8> {
            let mut data = Vec::with_capacity(256);
            data.extend_from_slice(&Self::DISCRIMINATOR);
            self.serialize(&mut data).unwrap();
            data
        }
    
        fn write_to(&self, mut data: &mut Vec<u8>) {
            data.clear();
            data.extend_from_slice(&Self::DISCRIMINATOR);
            self.serialize(&mut data).unwrap()
        }
    }
    

    #[derive(AnchorDiscriminator, AnchorSerialize, AnchorDeserialize)]
    pub struct DeleteInitializedPerpMarket {
        pub market_index: u16,
    }
    
    impl anchor_lang::InstructionData for DeleteInitializedPerpMarket {
        fn data(&self) -> Vec<u8> {
            let mut data = Vec::with_capacity(256);
            data.extend_from_slice(&Self::DISCRIMINATOR);
            self.serialize(&mut data).unwrap();
            data
        }
    
        fn write_to(&self, mut data: &mut Vec<u8>) {
            data.clear();
            data.extend_from_slice(&Self::DISCRIMINATOR);
            self.serialize(&mut data).unwrap()
        }
    }
    

    #[derive(AnchorDiscriminator, AnchorSerialize, AnchorDeserialize)]
    pub struct MoveAmmPrice {
        pub base_asset_reserve: u128,
        pub quote_asset_reserve: u128,
        pub sqrt_k: u128,
    }
    
    impl anchor_lang::InstructionData for MoveAmmPrice {
        fn data(&self) -> Vec<u8> {
            let mut data = Vec::with_capacity(256);
            data.extend_from_slice(&Self::DISCRIMINATOR);
            self.serialize(&mut data).unwrap();
            data
        }
    
        fn write_to(&self, mut data: &mut Vec<u8>) {
            data.clear();
            data.extend_from_slice(&Self::DISCRIMINATOR);
            self.serialize(&mut data).unwrap()
        }
    }
    

    #[derive(AnchorDiscriminator, AnchorSerialize, AnchorDeserialize)]
    pub struct RecenterPerpMarketAmm {
        pub peg_multiplier: u128,
        pub sqrt_k: u128,
    }
    
    impl anchor_lang::InstructionData for RecenterPerpMarketAmm {
        fn data(&self) -> Vec<u8> {
            let mut data = Vec::with_capacity(256);
            data.extend_from_slice(&Self::DISCRIMINATOR);
            self.serialize(&mut data).unwrap();
            data
        }
    
        fn write_to(&self, mut data: &mut Vec<u8>) {
            data.clear();
            data.extend_from_slice(&Self::DISCRIMINATOR);
            self.serialize(&mut data).unwrap()
        }
    }
    

    #[derive(AnchorDiscriminator, AnchorSerialize, AnchorDeserialize)]
    pub struct UpdatePerpMarketAmmSummaryStats {
        pub params: UpdatePerpMarketSummaryStatsParams,
    }
    
    impl anchor_lang::InstructionData for UpdatePerpMarketAmmSummaryStats {
        fn data(&self) -> Vec<u8> {
            let mut data = Vec::with_capacity(256);
            data.extend_from_slice(&Self::DISCRIMINATOR);
            self.serialize(&mut data).unwrap();
            data
        }
    
        fn write_to(&self, mut data: &mut Vec<u8>) {
            data.clear();
            data.extend_from_slice(&Self::DISCRIMINATOR);
            self.serialize(&mut data).unwrap()
        }
    }
    

    #[derive(AnchorDiscriminator, AnchorSerialize, AnchorDeserialize)]
    pub struct UpdatePerpMarketExpiry {
        pub expiry_ts: i64,
    }
    
    impl anchor_lang::InstructionData for UpdatePerpMarketExpiry {
        fn data(&self) -> Vec<u8> {
            let mut data = Vec::with_capacity(256);
            data.extend_from_slice(&Self::DISCRIMINATOR);
            self.serialize(&mut data).unwrap();
            data
        }
    
        fn write_to(&self, mut data: &mut Vec<u8>) {
            data.clear();
            data.extend_from_slice(&Self::DISCRIMINATOR);
            self.serialize(&mut data).unwrap()
        }
    }
    

    #[derive(AnchorDiscriminator, AnchorSerialize, AnchorDeserialize)]
    pub struct SettleExpiredMarketPoolsToRevenuePool {

    }
    
    impl anchor_lang::InstructionData for SettleExpiredMarketPoolsToRevenuePool {
        fn data(&self) -> Vec<u8> {
            let mut data = Vec::with_capacity(256);
            data.extend_from_slice(&Self::DISCRIMINATOR);
            self.serialize(&mut data).unwrap();
            data
        }
    
        fn write_to(&self, mut data: &mut Vec<u8>) {
            data.clear();
            data.extend_from_slice(&Self::DISCRIMINATOR);
            self.serialize(&mut data).unwrap()
        }
    }
    

    #[derive(AnchorDiscriminator, AnchorSerialize, AnchorDeserialize)]
    pub struct DepositIntoPerpMarketFeePool {
        pub amount: u64,
    }
    
    impl anchor_lang::InstructionData for DepositIntoPerpMarketFeePool {
        fn data(&self) -> Vec<u8> {
            let mut data = Vec::with_capacity(256);
            data.extend_from_slice(&Self::DISCRIMINATOR);
            self.serialize(&mut data).unwrap();
            data
        }
    
        fn write_to(&self, mut data: &mut Vec<u8>) {
            data.clear();
            data.extend_from_slice(&Self::DISCRIMINATOR);
            self.serialize(&mut data).unwrap()
        }
    }
    

    #[derive(AnchorDiscriminator, AnchorSerialize, AnchorDeserialize)]
    pub struct DepositIntoSpotMarketVault {
        pub amount: u64,
    }
    
    impl anchor_lang::InstructionData for DepositIntoSpotMarketVault {
        fn data(&self) -> Vec<u8> {
            let mut data = Vec::with_capacity(256);
            data.extend_from_slice(&Self::DISCRIMINATOR);
            self.serialize(&mut data).unwrap();
            data
        }
    
        fn write_to(&self, mut data: &mut Vec<u8>) {
            data.clear();
            data.extend_from_slice(&Self::DISCRIMINATOR);
            self.serialize(&mut data).unwrap()
        }
    }
    

    #[derive(AnchorDiscriminator, AnchorSerialize, AnchorDeserialize)]
    pub struct DepositIntoSpotMarketRevenuePool {
        pub amount: u64,
    }
    
    impl anchor_lang::InstructionData for DepositIntoSpotMarketRevenuePool {
        fn data(&self) -> Vec<u8> {
            let mut data = Vec::with_capacity(256);
            data.extend_from_slice(&Self::DISCRIMINATOR);
            self.serialize(&mut data).unwrap();
            data
        }
    
        fn write_to(&self, mut data: &mut Vec<u8>) {
            data.clear();
            data.extend_from_slice(&Self::DISCRIMINATOR);
            self.serialize(&mut data).unwrap()
        }
    }
    

    #[derive(AnchorDiscriminator, AnchorSerialize, AnchorDeserialize)]
    pub struct RepegAmmCurve {
        pub new_peg_candidate: u128,
    }
    
    impl anchor_lang::InstructionData for RepegAmmCurve {
        fn data(&self) -> Vec<u8> {
            let mut data = Vec::with_capacity(256);
            data.extend_from_slice(&Self::DISCRIMINATOR);
            self.serialize(&mut data).unwrap();
            data
        }
    
        fn write_to(&self, mut data: &mut Vec<u8>) {
            data.clear();
            data.extend_from_slice(&Self::DISCRIMINATOR);
            self.serialize(&mut data).unwrap()
        }
    }
    

    #[derive(AnchorDiscriminator, AnchorSerialize, AnchorDeserialize)]
    pub struct UpdatePerpMarketAmmOracleTwap {

    }
    
    impl anchor_lang::InstructionData for UpdatePerpMarketAmmOracleTwap {
        fn data(&self) -> Vec<u8> {
            let mut data = Vec::with_capacity(256);
            data.extend_from_slice(&Self::DISCRIMINATOR);
            self.serialize(&mut data).unwrap();
            data
        }
    
        fn write_to(&self, mut data: &mut Vec<u8>) {
            data.clear();
            data.extend_from_slice(&Self::DISCRIMINATOR);
            self.serialize(&mut data).unwrap()
        }
    }
    

    #[derive(AnchorDiscriminator, AnchorSerialize, AnchorDeserialize)]
    pub struct ResetPerpMarketAmmOracleTwap {

    }
    
    impl anchor_lang::InstructionData for ResetPerpMarketAmmOracleTwap {
        fn data(&self) -> Vec<u8> {
            let mut data = Vec::with_capacity(256);
            data.extend_from_slice(&Self::DISCRIMINATOR);
            self.serialize(&mut data).unwrap();
            data
        }
    
        fn write_to(&self, mut data: &mut Vec<u8>) {
            data.clear();
            data.extend_from_slice(&Self::DISCRIMINATOR);
            self.serialize(&mut data).unwrap()
        }
    }
    

    #[derive(AnchorDiscriminator, AnchorSerialize, AnchorDeserialize)]
    pub struct UpdateK {
        pub sqrt_k: u128,
    }
    
    impl anchor_lang::InstructionData for UpdateK {
        fn data(&self) -> Vec<u8> {
            let mut data = Vec::with_capacity(256);
            data.extend_from_slice(&Self::DISCRIMINATOR);
            self.serialize(&mut data).unwrap();
            data
        }
    
        fn write_to(&self, mut data: &mut Vec<u8>) {
            data.clear();
            data.extend_from_slice(&Self::DISCRIMINATOR);
            self.serialize(&mut data).unwrap()
        }
    }
    

    #[derive(AnchorDiscriminator, AnchorSerialize, AnchorDeserialize)]
    pub struct UpdatePerpMarketMarginRatio {
        pub margin_ratio_initial: u32,
        pub margin_ratio_maintenance: u32,
    }
    
    impl anchor_lang::InstructionData for UpdatePerpMarketMarginRatio {
        fn data(&self) -> Vec<u8> {
            let mut data = Vec::with_capacity(256);
            data.extend_from_slice(&Self::DISCRIMINATOR);
            self.serialize(&mut data).unwrap();
            data
        }
    
        fn write_to(&self, mut data: &mut Vec<u8>) {
            data.clear();
            data.extend_from_slice(&Self::DISCRIMINATOR);
            self.serialize(&mut data).unwrap()
        }
    }
    

    #[derive(AnchorDiscriminator, AnchorSerialize, AnchorDeserialize)]
    pub struct UpdatePerpMarketFundingPeriod {
        pub funding_period: i64,
    }
    
    impl anchor_lang::InstructionData for UpdatePerpMarketFundingPeriod {
        fn data(&self) -> Vec<u8> {
            let mut data = Vec::with_capacity(256);
            data.extend_from_slice(&Self::DISCRIMINATOR);
            self.serialize(&mut data).unwrap();
            data
        }
    
        fn write_to(&self, mut data: &mut Vec<u8>) {
            data.clear();
            data.extend_from_slice(&Self::DISCRIMINATOR);
            self.serialize(&mut data).unwrap()
        }
    }
    

    #[derive(AnchorDiscriminator, AnchorSerialize, AnchorDeserialize)]
    pub struct UpdatePerpMarketMaxImbalances {
        pub unrealized_max_imbalance: u64,
        pub max_revenue_withdraw_per_period: u64,
        pub quote_max_insurance: u64,
    }
    
    impl anchor_lang::InstructionData for UpdatePerpMarketMaxImbalances {
        fn data(&self) -> Vec<u8> {
            let mut data = Vec::with_capacity(256);
            data.extend_from_slice(&Self::DISCRIMINATOR);
            self.serialize(&mut data).unwrap();
            data
        }
    
        fn write_to(&self, mut data: &mut Vec<u8>) {
            data.clear();
            data.extend_from_slice(&Self::DISCRIMINATOR);
            self.serialize(&mut data).unwrap()
        }
    }
    

    #[derive(AnchorDiscriminator, AnchorSerialize, AnchorDeserialize)]
    pub struct UpdatePerpMarketLiquidationFee {
        pub liquidator_fee: u32,
        pub if_liquidation_fee: u32,
    }
    
    impl anchor_lang::InstructionData for UpdatePerpMarketLiquidationFee {
        fn data(&self) -> Vec<u8> {
            let mut data = Vec::with_capacity(256);
            data.extend_from_slice(&Self::DISCRIMINATOR);
            self.serialize(&mut data).unwrap();
            data
        }
    
        fn write_to(&self, mut data: &mut Vec<u8>) {
            data.clear();
            data.extend_from_slice(&Self::DISCRIMINATOR);
            self.serialize(&mut data).unwrap()
        }
    }
    

    #[derive(AnchorDiscriminator, AnchorSerialize, AnchorDeserialize)]
    pub struct UpdateInsuranceFundUnstakingPeriod {
        pub insurance_fund_unstaking_period: i64,
    }
    
    impl anchor_lang::InstructionData for UpdateInsuranceFundUnstakingPeriod {
        fn data(&self) -> Vec<u8> {
            let mut data = Vec::with_capacity(256);
            data.extend_from_slice(&Self::DISCRIMINATOR);
            self.serialize(&mut data).unwrap();
            data
        }
    
        fn write_to(&self, mut data: &mut Vec<u8>) {
            data.clear();
            data.extend_from_slice(&Self::DISCRIMINATOR);
            self.serialize(&mut data).unwrap()
        }
    }
    

    #[derive(AnchorDiscriminator, AnchorSerialize, AnchorDeserialize)]
    pub struct UpdateSpotMarketLiquidationFee {
        pub liquidator_fee: u32,
        pub if_liquidation_fee: u32,
    }
    
    impl anchor_lang::InstructionData for UpdateSpotMarketLiquidationFee {
        fn data(&self) -> Vec<u8> {
            let mut data = Vec::with_capacity(256);
            data.extend_from_slice(&Self::DISCRIMINATOR);
            self.serialize(&mut data).unwrap();
            data
        }
    
        fn write_to(&self, mut data: &mut Vec<u8>) {
            data.clear();
            data.extend_from_slice(&Self::DISCRIMINATOR);
            self.serialize(&mut data).unwrap()
        }
    }
    

    #[derive(AnchorDiscriminator, AnchorSerialize, AnchorDeserialize)]
    pub struct UpdateWithdrawGuardThreshold {
        pub withdraw_guard_threshold: u64,
    }
    
    impl anchor_lang::InstructionData for UpdateWithdrawGuardThreshold {
        fn data(&self) -> Vec<u8> {
            let mut data = Vec::with_capacity(256);
            data.extend_from_slice(&Self::DISCRIMINATOR);
            self.serialize(&mut data).unwrap();
            data
        }
    
        fn write_to(&self, mut data: &mut Vec<u8>) {
            data.clear();
            data.extend_from_slice(&Self::DISCRIMINATOR);
            self.serialize(&mut data).unwrap()
        }
    }
    

    #[derive(AnchorDiscriminator, AnchorSerialize, AnchorDeserialize)]
    pub struct UpdateSpotMarketIfFactor {
        pub spot_market_index: u16,
        pub user_if_factor: u32,
        pub total_if_factor: u32,
    }
    
    impl anchor_lang::InstructionData for UpdateSpotMarketIfFactor {
        fn data(&self) -> Vec<u8> {
            let mut data = Vec::with_capacity(256);
            data.extend_from_slice(&Self::DISCRIMINATOR);
            self.serialize(&mut data).unwrap();
            data
        }
    
        fn write_to(&self, mut data: &mut Vec<u8>) {
            data.clear();
            data.extend_from_slice(&Self::DISCRIMINATOR);
            self.serialize(&mut data).unwrap()
        }
    }
    

    #[derive(AnchorDiscriminator, AnchorSerialize, AnchorDeserialize)]
    pub struct UpdateSpotMarketRevenueSettlePeriod {
        pub revenue_settle_period: i64,
    }
    
    impl anchor_lang::InstructionData for UpdateSpotMarketRevenueSettlePeriod {
        fn data(&self) -> Vec<u8> {
            let mut data = Vec::with_capacity(256);
            data.extend_from_slice(&Self::DISCRIMINATOR);
            self.serialize(&mut data).unwrap();
            data
        }
    
        fn write_to(&self, mut data: &mut Vec<u8>) {
            data.clear();
            data.extend_from_slice(&Self::DISCRIMINATOR);
            self.serialize(&mut data).unwrap()
        }
    }
    

    #[derive(AnchorDiscriminator, AnchorSerialize, AnchorDeserialize)]
    pub struct UpdateSpotMarketStatus {
        pub status: MarketStatus,
    }
    
    impl anchor_lang::InstructionData for UpdateSpotMarketStatus {
        fn data(&self) -> Vec<u8> {
            let mut data = Vec::with_capacity(256);
            data.extend_from_slice(&Self::DISCRIMINATOR);
            self.serialize(&mut data).unwrap();
            data
        }
    
        fn write_to(&self, mut data: &mut Vec<u8>) {
            data.clear();
            data.extend_from_slice(&Self::DISCRIMINATOR);
            self.serialize(&mut data).unwrap()
        }
    }
    

    #[derive(AnchorDiscriminator, AnchorSerialize, AnchorDeserialize)]
    pub struct UpdateSpotMarketPausedOperations {
        pub paused_operations: u8,
    }
    
    impl anchor_lang::InstructionData for UpdateSpotMarketPausedOperations {
        fn data(&self) -> Vec<u8> {
            let mut data = Vec::with_capacity(256);
            data.extend_from_slice(&Self::DISCRIMINATOR);
            self.serialize(&mut data).unwrap();
            data
        }
    
        fn write_to(&self, mut data: &mut Vec<u8>) {
            data.clear();
            data.extend_from_slice(&Self::DISCRIMINATOR);
            self.serialize(&mut data).unwrap()
        }
    }
    

    #[derive(AnchorDiscriminator, AnchorSerialize, AnchorDeserialize)]
    pub struct UpdateSpotMarketAssetTier {
        pub asset_tier: AssetTier,
    }
    
    impl anchor_lang::InstructionData for UpdateSpotMarketAssetTier {
        fn data(&self) -> Vec<u8> {
            let mut data = Vec::with_capacity(256);
            data.extend_from_slice(&Self::DISCRIMINATOR);
            self.serialize(&mut data).unwrap();
            data
        }
    
        fn write_to(&self, mut data: &mut Vec<u8>) {
            data.clear();
            data.extend_from_slice(&Self::DISCRIMINATOR);
            self.serialize(&mut data).unwrap()
        }
    }
    

    #[derive(AnchorDiscriminator, AnchorSerialize, AnchorDeserialize)]
    pub struct UpdateSpotMarketMarginWeights {
        pub initial_asset_weight: u32,
        pub maintenance_asset_weight: u32,
        pub initial_liability_weight: u32,
        pub maintenance_liability_weight: u32,
        pub imf_factor: u32,
    }
    
    impl anchor_lang::InstructionData for UpdateSpotMarketMarginWeights {
        fn data(&self) -> Vec<u8> {
            let mut data = Vec::with_capacity(256);
            data.extend_from_slice(&Self::DISCRIMINATOR);
            self.serialize(&mut data).unwrap();
            data
        }
    
        fn write_to(&self, mut data: &mut Vec<u8>) {
            data.clear();
            data.extend_from_slice(&Self::DISCRIMINATOR);
            self.serialize(&mut data).unwrap()
        }
    }
    

    #[derive(AnchorDiscriminator, AnchorSerialize, AnchorDeserialize)]
    pub struct UpdateSpotMarketBorrowRate {
        pub optimal_utilization: u32,
        pub optimal_borrow_rate: u32,
        pub max_borrow_rate: u32,
        pub min_borrow_rate: Option<u8>,
    }
    
    impl anchor_lang::InstructionData for UpdateSpotMarketBorrowRate {
        fn data(&self) -> Vec<u8> {
            let mut data = Vec::with_capacity(256);
            data.extend_from_slice(&Self::DISCRIMINATOR);
            self.serialize(&mut data).unwrap();
            data
        }
    
        fn write_to(&self, mut data: &mut Vec<u8>) {
            data.clear();
            data.extend_from_slice(&Self::DISCRIMINATOR);
            self.serialize(&mut data).unwrap()
        }
    }
    

    #[derive(AnchorDiscriminator, AnchorSerialize, AnchorDeserialize)]
    pub struct UpdateSpotMarketMaxTokenDeposits {
        pub max_token_deposits: u64,
    }
    
    impl anchor_lang::InstructionData for UpdateSpotMarketMaxTokenDeposits {
        fn data(&self) -> Vec<u8> {
            let mut data = Vec::with_capacity(256);
            data.extend_from_slice(&Self::DISCRIMINATOR);
            self.serialize(&mut data).unwrap();
            data
        }
    
        fn write_to(&self, mut data: &mut Vec<u8>) {
            data.clear();
            data.extend_from_slice(&Self::DISCRIMINATOR);
            self.serialize(&mut data).unwrap()
        }
    }
    

    #[derive(AnchorDiscriminator, AnchorSerialize, AnchorDeserialize)]
    pub struct UpdateSpotMarketMaxTokenBorrows {
        pub max_token_borrows_fraction: u16,
    }
    
    impl anchor_lang::InstructionData for UpdateSpotMarketMaxTokenBorrows {
        fn data(&self) -> Vec<u8> {
            let mut data = Vec::with_capacity(256);
            data.extend_from_slice(&Self::DISCRIMINATOR);
            self.serialize(&mut data).unwrap();
            data
        }
    
        fn write_to(&self, mut data: &mut Vec<u8>) {
            data.clear();
            data.extend_from_slice(&Self::DISCRIMINATOR);
            self.serialize(&mut data).unwrap()
        }
    }
    

    #[derive(AnchorDiscriminator, AnchorSerialize, AnchorDeserialize)]
    pub struct UpdateSpotMarketScaleInitialAssetWeightStart {
        pub scale_initial_asset_weight_start: u64,
    }
    
    impl anchor_lang::InstructionData for UpdateSpotMarketScaleInitialAssetWeightStart {
        fn data(&self) -> Vec<u8> {
            let mut data = Vec::with_capacity(256);
            data.extend_from_slice(&Self::DISCRIMINATOR);
            self.serialize(&mut data).unwrap();
            data
        }
    
        fn write_to(&self, mut data: &mut Vec<u8>) {
            data.clear();
            data.extend_from_slice(&Self::DISCRIMINATOR);
            self.serialize(&mut data).unwrap()
        }
    }
    

    #[derive(AnchorDiscriminator, AnchorSerialize, AnchorDeserialize)]
    pub struct UpdateSpotMarketOracle {
        pub oracle: Pubkey,
        pub oracle_source: OracleSource,
    }
    
    impl anchor_lang::InstructionData for UpdateSpotMarketOracle {
        fn data(&self) -> Vec<u8> {
            let mut data = Vec::with_capacity(256);
            data.extend_from_slice(&Self::DISCRIMINATOR);
            self.serialize(&mut data).unwrap();
            data
        }
    
        fn write_to(&self, mut data: &mut Vec<u8>) {
            data.clear();
            data.extend_from_slice(&Self::DISCRIMINATOR);
            self.serialize(&mut data).unwrap()
        }
    }
    

    #[derive(AnchorDiscriminator, AnchorSerialize, AnchorDeserialize)]
    pub struct UpdateSpotMarketStepSizeAndTickSize {
        pub step_size: u64,
        pub tick_size: u64,
    }
    
    impl anchor_lang::InstructionData for UpdateSpotMarketStepSizeAndTickSize {
        fn data(&self) -> Vec<u8> {
            let mut data = Vec::with_capacity(256);
            data.extend_from_slice(&Self::DISCRIMINATOR);
            self.serialize(&mut data).unwrap();
            data
        }
    
        fn write_to(&self, mut data: &mut Vec<u8>) {
            data.clear();
            data.extend_from_slice(&Self::DISCRIMINATOR);
            self.serialize(&mut data).unwrap()
        }
    }
    

    #[derive(AnchorDiscriminator, AnchorSerialize, AnchorDeserialize)]
    pub struct UpdateSpotMarketMinOrderSize {
        pub order_size: u64,
    }
    
    impl anchor_lang::InstructionData for UpdateSpotMarketMinOrderSize {
        fn data(&self) -> Vec<u8> {
            let mut data = Vec::with_capacity(256);
            data.extend_from_slice(&Self::DISCRIMINATOR);
            self.serialize(&mut data).unwrap();
            data
        }
    
        fn write_to(&self, mut data: &mut Vec<u8>) {
            data.clear();
            data.extend_from_slice(&Self::DISCRIMINATOR);
            self.serialize(&mut data).unwrap()
        }
    }
    

    #[derive(AnchorDiscriminator, AnchorSerialize, AnchorDeserialize)]
    pub struct UpdateSpotMarketOrdersEnabled {
        pub orders_enabled: bool,
    }
    
    impl anchor_lang::InstructionData for UpdateSpotMarketOrdersEnabled {
        fn data(&self) -> Vec<u8> {
            let mut data = Vec::with_capacity(256);
            data.extend_from_slice(&Self::DISCRIMINATOR);
            self.serialize(&mut data).unwrap();
            data
        }
    
        fn write_to(&self, mut data: &mut Vec<u8>) {
            data.clear();
            data.extend_from_slice(&Self::DISCRIMINATOR);
            self.serialize(&mut data).unwrap()
        }
    }
    

    #[derive(AnchorDiscriminator, AnchorSerialize, AnchorDeserialize)]
    pub struct UpdateSpotMarketIfPausedOperations {
        pub paused_operations: u8,
    }
    
    impl anchor_lang::InstructionData for UpdateSpotMarketIfPausedOperations {
        fn data(&self) -> Vec<u8> {
            let mut data = Vec::with_capacity(256);
            data.extend_from_slice(&Self::DISCRIMINATOR);
            self.serialize(&mut data).unwrap();
            data
        }
    
        fn write_to(&self, mut data: &mut Vec<u8>) {
            data.clear();
            data.extend_from_slice(&Self::DISCRIMINATOR);
            self.serialize(&mut data).unwrap()
        }
    }
    

    #[derive(AnchorDiscriminator, AnchorSerialize, AnchorDeserialize)]
    pub struct UpdateSpotMarketName {
        pub name: [u8;32],
    }
    
    impl anchor_lang::InstructionData for UpdateSpotMarketName {
        fn data(&self) -> Vec<u8> {
            let mut data = Vec::with_capacity(256);
            data.extend_from_slice(&Self::DISCRIMINATOR);
            self.serialize(&mut data).unwrap();
            data
        }
    
        fn write_to(&self, mut data: &mut Vec<u8>) {
            data.clear();
            data.extend_from_slice(&Self::DISCRIMINATOR);
            self.serialize(&mut data).unwrap()
        }
    }
    

    #[derive(AnchorDiscriminator, AnchorSerialize, AnchorDeserialize)]
    pub struct UpdatePerpMarketStatus {
        pub status: MarketStatus,
    }
    
    impl anchor_lang::InstructionData for UpdatePerpMarketStatus {
        fn data(&self) -> Vec<u8> {
            let mut data = Vec::with_capacity(256);
            data.extend_from_slice(&Self::DISCRIMINATOR);
            self.serialize(&mut data).unwrap();
            data
        }
    
        fn write_to(&self, mut data: &mut Vec<u8>) {
            data.clear();
            data.extend_from_slice(&Self::DISCRIMINATOR);
            self.serialize(&mut data).unwrap()
        }
    }
    

    #[derive(AnchorDiscriminator, AnchorSerialize, AnchorDeserialize)]
    pub struct UpdatePerpMarketPausedOperations {
        pub paused_operations: u8,
    }
    
    impl anchor_lang::InstructionData for UpdatePerpMarketPausedOperations {
        fn data(&self) -> Vec<u8> {
            let mut data = Vec::with_capacity(256);
            data.extend_from_slice(&Self::DISCRIMINATOR);
            self.serialize(&mut data).unwrap();
            data
        }
    
        fn write_to(&self, mut data: &mut Vec<u8>) {
            data.clear();
            data.extend_from_slice(&Self::DISCRIMINATOR);
            self.serialize(&mut data).unwrap()
        }
    }
    

    #[derive(AnchorDiscriminator, AnchorSerialize, AnchorDeserialize)]
    pub struct UpdatePerpMarketContractTier {
        pub contract_tier: ContractTier,
    }
    
    impl anchor_lang::InstructionData for UpdatePerpMarketContractTier {
        fn data(&self) -> Vec<u8> {
            let mut data = Vec::with_capacity(256);
            data.extend_from_slice(&Self::DISCRIMINATOR);
            self.serialize(&mut data).unwrap();
            data
        }
    
        fn write_to(&self, mut data: &mut Vec<u8>) {
            data.clear();
            data.extend_from_slice(&Self::DISCRIMINATOR);
            self.serialize(&mut data).unwrap()
        }
    }
    

    #[derive(AnchorDiscriminator, AnchorSerialize, AnchorDeserialize)]
    pub struct UpdatePerpMarketImfFactor {
        pub imf_factor: u32,
        pub unrealized_pnl_imf_factor: u32,
    }
    
    impl anchor_lang::InstructionData for UpdatePerpMarketImfFactor {
        fn data(&self) -> Vec<u8> {
            let mut data = Vec::with_capacity(256);
            data.extend_from_slice(&Self::DISCRIMINATOR);
            self.serialize(&mut data).unwrap();
            data
        }
    
        fn write_to(&self, mut data: &mut Vec<u8>) {
            data.clear();
            data.extend_from_slice(&Self::DISCRIMINATOR);
            self.serialize(&mut data).unwrap()
        }
    }
    

    #[derive(AnchorDiscriminator, AnchorSerialize, AnchorDeserialize)]
    pub struct UpdatePerpMarketUnrealizedAssetWeight {
        pub unrealized_initial_asset_weight: u32,
        pub unrealized_maintenance_asset_weight: u32,
    }
    
    impl anchor_lang::InstructionData for UpdatePerpMarketUnrealizedAssetWeight {
        fn data(&self) -> Vec<u8> {
            let mut data = Vec::with_capacity(256);
            data.extend_from_slice(&Self::DISCRIMINATOR);
            self.serialize(&mut data).unwrap();
            data
        }
    
        fn write_to(&self, mut data: &mut Vec<u8>) {
            data.clear();
            data.extend_from_slice(&Self::DISCRIMINATOR);
            self.serialize(&mut data).unwrap()
        }
    }
    

    #[derive(AnchorDiscriminator, AnchorSerialize, AnchorDeserialize)]
    pub struct UpdatePerpMarketConcentrationCoef {
        pub concentration_scale: u128,
    }
    
    impl anchor_lang::InstructionData for UpdatePerpMarketConcentrationCoef {
        fn data(&self) -> Vec<u8> {
            let mut data = Vec::with_capacity(256);
            data.extend_from_slice(&Self::DISCRIMINATOR);
            self.serialize(&mut data).unwrap();
            data
        }
    
        fn write_to(&self, mut data: &mut Vec<u8>) {
            data.clear();
            data.extend_from_slice(&Self::DISCRIMINATOR);
            self.serialize(&mut data).unwrap()
        }
    }
    

    #[derive(AnchorDiscriminator, AnchorSerialize, AnchorDeserialize)]
    pub struct UpdatePerpMarketCurveUpdateIntensity {
        pub curve_update_intensity: u8,
    }
    
    impl anchor_lang::InstructionData for UpdatePerpMarketCurveUpdateIntensity {
        fn data(&self) -> Vec<u8> {
            let mut data = Vec::with_capacity(256);
            data.extend_from_slice(&Self::DISCRIMINATOR);
            self.serialize(&mut data).unwrap();
            data
        }
    
        fn write_to(&self, mut data: &mut Vec<u8>) {
            data.clear();
            data.extend_from_slice(&Self::DISCRIMINATOR);
            self.serialize(&mut data).unwrap()
        }
    }
    

    #[derive(AnchorDiscriminator, AnchorSerialize, AnchorDeserialize)]
    pub struct UpdatePerpMarketTargetBaseAssetAmountPerLp {
        pub target_base_asset_amount_per_lp: i32,
    }
    
    impl anchor_lang::InstructionData for UpdatePerpMarketTargetBaseAssetAmountPerLp {
        fn data(&self) -> Vec<u8> {
            let mut data = Vec::with_capacity(256);
            data.extend_from_slice(&Self::DISCRIMINATOR);
            self.serialize(&mut data).unwrap();
            data
        }
    
        fn write_to(&self, mut data: &mut Vec<u8>) {
            data.clear();
            data.extend_from_slice(&Self::DISCRIMINATOR);
            self.serialize(&mut data).unwrap()
        }
    }
    

    #[derive(AnchorDiscriminator, AnchorSerialize, AnchorDeserialize)]
    pub struct UpdatePerpMarketPerLpBase {
        pub per_lp_base: i8,
    }
    
    impl anchor_lang::InstructionData for UpdatePerpMarketPerLpBase {
        fn data(&self) -> Vec<u8> {
            let mut data = Vec::with_capacity(256);
            data.extend_from_slice(&Self::DISCRIMINATOR);
            self.serialize(&mut data).unwrap();
            data
        }
    
        fn write_to(&self, mut data: &mut Vec<u8>) {
            data.clear();
            data.extend_from_slice(&Self::DISCRIMINATOR);
            self.serialize(&mut data).unwrap()
        }
    }
    

    #[derive(AnchorDiscriminator, AnchorSerialize, AnchorDeserialize)]
    pub struct UpdateLpCooldownTime {
        pub lp_cooldown_time: u64,
    }
    
    impl anchor_lang::InstructionData for UpdateLpCooldownTime {
        fn data(&self) -> Vec<u8> {
            let mut data = Vec::with_capacity(256);
            data.extend_from_slice(&Self::DISCRIMINATOR);
            self.serialize(&mut data).unwrap();
            data
        }
    
        fn write_to(&self, mut data: &mut Vec<u8>) {
            data.clear();
            data.extend_from_slice(&Self::DISCRIMINATOR);
            self.serialize(&mut data).unwrap()
        }
    }
    

    #[derive(AnchorDiscriminator, AnchorSerialize, AnchorDeserialize)]
    pub struct UpdatePerpFeeStructure {
        pub fee_structure: FeeStructure,
    }
    
    impl anchor_lang::InstructionData for UpdatePerpFeeStructure {
        fn data(&self) -> Vec<u8> {
            let mut data = Vec::with_capacity(256);
            data.extend_from_slice(&Self::DISCRIMINATOR);
            self.serialize(&mut data).unwrap();
            data
        }
    
        fn write_to(&self, mut data: &mut Vec<u8>) {
            data.clear();
            data.extend_from_slice(&Self::DISCRIMINATOR);
            self.serialize(&mut data).unwrap()
        }
    }
    

    #[derive(AnchorDiscriminator, AnchorSerialize, AnchorDeserialize)]
    pub struct UpdateSpotFeeStructure {
        pub fee_structure: FeeStructure,
    }
    
    impl anchor_lang::InstructionData for UpdateSpotFeeStructure {
        fn data(&self) -> Vec<u8> {
            let mut data = Vec::with_capacity(256);
            data.extend_from_slice(&Self::DISCRIMINATOR);
            self.serialize(&mut data).unwrap();
            data
        }
    
        fn write_to(&self, mut data: &mut Vec<u8>) {
            data.clear();
            data.extend_from_slice(&Self::DISCRIMINATOR);
            self.serialize(&mut data).unwrap()
        }
    }
    

    #[derive(AnchorDiscriminator, AnchorSerialize, AnchorDeserialize)]
    pub struct UpdateInitialPctToLiquidate {
        pub initial_pct_to_liquidate: u16,
    }
    
    impl anchor_lang::InstructionData for UpdateInitialPctToLiquidate {
        fn data(&self) -> Vec<u8> {
            let mut data = Vec::with_capacity(256);
            data.extend_from_slice(&Self::DISCRIMINATOR);
            self.serialize(&mut data).unwrap();
            data
        }
    
        fn write_to(&self, mut data: &mut Vec<u8>) {
            data.clear();
            data.extend_from_slice(&Self::DISCRIMINATOR);
            self.serialize(&mut data).unwrap()
        }
    }
    

    #[derive(AnchorDiscriminator, AnchorSerialize, AnchorDeserialize)]
    pub struct UpdateLiquidationDuration {
        pub liquidation_duration: u8,
    }
    
    impl anchor_lang::InstructionData for UpdateLiquidationDuration {
        fn data(&self) -> Vec<u8> {
            let mut data = Vec::with_capacity(256);
            data.extend_from_slice(&Self::DISCRIMINATOR);
            self.serialize(&mut data).unwrap();
            data
        }
    
        fn write_to(&self, mut data: &mut Vec<u8>) {
            data.clear();
            data.extend_from_slice(&Self::DISCRIMINATOR);
            self.serialize(&mut data).unwrap()
        }
    }
    

    #[derive(AnchorDiscriminator, AnchorSerialize, AnchorDeserialize)]
    pub struct UpdateLiquidationMarginBufferRatio {
        pub liquidation_margin_buffer_ratio: u32,
    }
    
    impl anchor_lang::InstructionData for UpdateLiquidationMarginBufferRatio {
        fn data(&self) -> Vec<u8> {
            let mut data = Vec::with_capacity(256);
            data.extend_from_slice(&Self::DISCRIMINATOR);
            self.serialize(&mut data).unwrap();
            data
        }
    
        fn write_to(&self, mut data: &mut Vec<u8>) {
            data.clear();
            data.extend_from_slice(&Self::DISCRIMINATOR);
            self.serialize(&mut data).unwrap()
        }
    }
    

    #[derive(AnchorDiscriminator, AnchorSerialize, AnchorDeserialize)]
    pub struct UpdateOracleGuardRails {
        pub oracle_guard_rails: OracleGuardRails,
    }
    
    impl anchor_lang::InstructionData for UpdateOracleGuardRails {
        fn data(&self) -> Vec<u8> {
            let mut data = Vec::with_capacity(256);
            data.extend_from_slice(&Self::DISCRIMINATOR);
            self.serialize(&mut data).unwrap();
            data
        }
    
        fn write_to(&self, mut data: &mut Vec<u8>) {
            data.clear();
            data.extend_from_slice(&Self::DISCRIMINATOR);
            self.serialize(&mut data).unwrap()
        }
    }
    

    #[derive(AnchorDiscriminator, AnchorSerialize, AnchorDeserialize)]
    pub struct UpdateStateSettlementDuration {
        pub settlement_duration: u16,
    }
    
    impl anchor_lang::InstructionData for UpdateStateSettlementDuration {
        fn data(&self) -> Vec<u8> {
            let mut data = Vec::with_capacity(256);
            data.extend_from_slice(&Self::DISCRIMINATOR);
            self.serialize(&mut data).unwrap();
            data
        }
    
        fn write_to(&self, mut data: &mut Vec<u8>) {
            data.clear();
            data.extend_from_slice(&Self::DISCRIMINATOR);
            self.serialize(&mut data).unwrap()
        }
    }
    

    #[derive(AnchorDiscriminator, AnchorSerialize, AnchorDeserialize)]
    pub struct UpdateStateMaxNumberOfSubAccounts {
        pub max_number_of_sub_accounts: u16,
    }
    
    impl anchor_lang::InstructionData for UpdateStateMaxNumberOfSubAccounts {
        fn data(&self) -> Vec<u8> {
            let mut data = Vec::with_capacity(256);
            data.extend_from_slice(&Self::DISCRIMINATOR);
            self.serialize(&mut data).unwrap();
            data
        }
    
        fn write_to(&self, mut data: &mut Vec<u8>) {
            data.clear();
            data.extend_from_slice(&Self::DISCRIMINATOR);
            self.serialize(&mut data).unwrap()
        }
    }
    

    #[derive(AnchorDiscriminator, AnchorSerialize, AnchorDeserialize)]
    pub struct UpdateStateMaxInitializeUserFee {
        pub max_initialize_user_fee: u16,
    }
    
    impl anchor_lang::InstructionData for UpdateStateMaxInitializeUserFee {
        fn data(&self) -> Vec<u8> {
            let mut data = Vec::with_capacity(256);
            data.extend_from_slice(&Self::DISCRIMINATOR);
            self.serialize(&mut data).unwrap();
            data
        }
    
        fn write_to(&self, mut data: &mut Vec<u8>) {
            data.clear();
            data.extend_from_slice(&Self::DISCRIMINATOR);
            self.serialize(&mut data).unwrap()
        }
    }
    

    #[derive(AnchorDiscriminator, AnchorSerialize, AnchorDeserialize)]
    pub struct UpdatePerpMarketOracle {
        pub oracle: Pubkey,
        pub oracle_source: OracleSource,
    }
    
    impl anchor_lang::InstructionData for UpdatePerpMarketOracle {
        fn data(&self) -> Vec<u8> {
            let mut data = Vec::with_capacity(256);
            data.extend_from_slice(&Self::DISCRIMINATOR);
            self.serialize(&mut data).unwrap();
            data
        }
    
        fn write_to(&self, mut data: &mut Vec<u8>) {
            data.clear();
            data.extend_from_slice(&Self::DISCRIMINATOR);
            self.serialize(&mut data).unwrap()
        }
    }
    

    #[derive(AnchorDiscriminator, AnchorSerialize, AnchorDeserialize)]
    pub struct UpdatePerpMarketBaseSpread {
        pub base_spread: u32,
    }
    
    impl anchor_lang::InstructionData for UpdatePerpMarketBaseSpread {
        fn data(&self) -> Vec<u8> {
            let mut data = Vec::with_capacity(256);
            data.extend_from_slice(&Self::DISCRIMINATOR);
            self.serialize(&mut data).unwrap();
            data
        }
    
        fn write_to(&self, mut data: &mut Vec<u8>) {
            data.clear();
            data.extend_from_slice(&Self::DISCRIMINATOR);
            self.serialize(&mut data).unwrap()
        }
    }
    

    #[derive(AnchorDiscriminator, AnchorSerialize, AnchorDeserialize)]
    pub struct UpdateAmmJitIntensity {
        pub amm_jit_intensity: u8,
    }
    
    impl anchor_lang::InstructionData for UpdateAmmJitIntensity {
        fn data(&self) -> Vec<u8> {
            let mut data = Vec::with_capacity(256);
            data.extend_from_slice(&Self::DISCRIMINATOR);
            self.serialize(&mut data).unwrap();
            data
        }
    
        fn write_to(&self, mut data: &mut Vec<u8>) {
            data.clear();
            data.extend_from_slice(&Self::DISCRIMINATOR);
            self.serialize(&mut data).unwrap()
        }
    }
    

    #[derive(AnchorDiscriminator, AnchorSerialize, AnchorDeserialize)]
    pub struct UpdatePerpMarketMaxSpread {
        pub max_spread: u32,
    }
    
    impl anchor_lang::InstructionData for UpdatePerpMarketMaxSpread {
        fn data(&self) -> Vec<u8> {
            let mut data = Vec::with_capacity(256);
            data.extend_from_slice(&Self::DISCRIMINATOR);
            self.serialize(&mut data).unwrap();
            data
        }
    
        fn write_to(&self, mut data: &mut Vec<u8>) {
            data.clear();
            data.extend_from_slice(&Self::DISCRIMINATOR);
            self.serialize(&mut data).unwrap()
        }
    }
    

    #[derive(AnchorDiscriminator, AnchorSerialize, AnchorDeserialize)]
    pub struct UpdatePerpMarketStepSizeAndTickSize {
        pub step_size: u64,
        pub tick_size: u64,
    }
    
    impl anchor_lang::InstructionData for UpdatePerpMarketStepSizeAndTickSize {
        fn data(&self) -> Vec<u8> {
            let mut data = Vec::with_capacity(256);
            data.extend_from_slice(&Self::DISCRIMINATOR);
            self.serialize(&mut data).unwrap();
            data
        }
    
        fn write_to(&self, mut data: &mut Vec<u8>) {
            data.clear();
            data.extend_from_slice(&Self::DISCRIMINATOR);
            self.serialize(&mut data).unwrap()
        }
    }
    

    #[derive(AnchorDiscriminator, AnchorSerialize, AnchorDeserialize)]
    pub struct UpdatePerpMarketName {
        pub name: [u8;32],
    }
    
    impl anchor_lang::InstructionData for UpdatePerpMarketName {
        fn data(&self) -> Vec<u8> {
            let mut data = Vec::with_capacity(256);
            data.extend_from_slice(&Self::DISCRIMINATOR);
            self.serialize(&mut data).unwrap();
            data
        }
    
        fn write_to(&self, mut data: &mut Vec<u8>) {
            data.clear();
            data.extend_from_slice(&Self::DISCRIMINATOR);
            self.serialize(&mut data).unwrap()
        }
    }
    

    #[derive(AnchorDiscriminator, AnchorSerialize, AnchorDeserialize)]
    pub struct UpdatePerpMarketMinOrderSize {
        pub order_size: u64,
    }
    
    impl anchor_lang::InstructionData for UpdatePerpMarketMinOrderSize {
        fn data(&self) -> Vec<u8> {
            let mut data = Vec::with_capacity(256);
            data.extend_from_slice(&Self::DISCRIMINATOR);
            self.serialize(&mut data).unwrap();
            data
        }
    
        fn write_to(&self, mut data: &mut Vec<u8>) {
            data.clear();
            data.extend_from_slice(&Self::DISCRIMINATOR);
            self.serialize(&mut data).unwrap()
        }
    }
    

    #[derive(AnchorDiscriminator, AnchorSerialize, AnchorDeserialize)]
    pub struct UpdatePerpMarketMaxSlippageRatio {
        pub max_slippage_ratio: u16,
    }
    
    impl anchor_lang::InstructionData for UpdatePerpMarketMaxSlippageRatio {
        fn data(&self) -> Vec<u8> {
            let mut data = Vec::with_capacity(256);
            data.extend_from_slice(&Self::DISCRIMINATOR);
            self.serialize(&mut data).unwrap();
            data
        }
    
        fn write_to(&self, mut data: &mut Vec<u8>) {
            data.clear();
            data.extend_from_slice(&Self::DISCRIMINATOR);
            self.serialize(&mut data).unwrap()
        }
    }
    

    #[derive(AnchorDiscriminator, AnchorSerialize, AnchorDeserialize)]
    pub struct UpdatePerpMarketMaxFillReserveFraction {
        pub max_fill_reserve_fraction: u16,
    }
    
    impl anchor_lang::InstructionData for UpdatePerpMarketMaxFillReserveFraction {
        fn data(&self) -> Vec<u8> {
            let mut data = Vec::with_capacity(256);
            data.extend_from_slice(&Self::DISCRIMINATOR);
            self.serialize(&mut data).unwrap();
            data
        }
    
        fn write_to(&self, mut data: &mut Vec<u8>) {
            data.clear();
            data.extend_from_slice(&Self::DISCRIMINATOR);
            self.serialize(&mut data).unwrap()
        }
    }
    

    #[derive(AnchorDiscriminator, AnchorSerialize, AnchorDeserialize)]
    pub struct UpdatePerpMarketMaxOpenInterest {
        pub max_open_interest: u128,
    }
    
    impl anchor_lang::InstructionData for UpdatePerpMarketMaxOpenInterest {
        fn data(&self) -> Vec<u8> {
            let mut data = Vec::with_capacity(256);
            data.extend_from_slice(&Self::DISCRIMINATOR);
            self.serialize(&mut data).unwrap();
            data
        }
    
        fn write_to(&self, mut data: &mut Vec<u8>) {
            data.clear();
            data.extend_from_slice(&Self::DISCRIMINATOR);
            self.serialize(&mut data).unwrap()
        }
    }
    

    #[derive(AnchorDiscriminator, AnchorSerialize, AnchorDeserialize)]
    pub struct UpdatePerpMarketNumberOfUsers {
        pub number_of_users: Option<u32>,
        pub number_of_users_with_base: Option<u32>,
    }
    
    impl anchor_lang::InstructionData for UpdatePerpMarketNumberOfUsers {
        fn data(&self) -> Vec<u8> {
            let mut data = Vec::with_capacity(256);
            data.extend_from_slice(&Self::DISCRIMINATOR);
            self.serialize(&mut data).unwrap();
            data
        }
    
        fn write_to(&self, mut data: &mut Vec<u8>) {
            data.clear();
            data.extend_from_slice(&Self::DISCRIMINATOR);
            self.serialize(&mut data).unwrap()
        }
    }
    

    #[derive(AnchorDiscriminator, AnchorSerialize, AnchorDeserialize)]
    pub struct UpdatePerpMarketFeeAdjustment {
        pub fee_adjustment: i16,
    }
    
    impl anchor_lang::InstructionData for UpdatePerpMarketFeeAdjustment {
        fn data(&self) -> Vec<u8> {
            let mut data = Vec::with_capacity(256);
            data.extend_from_slice(&Self::DISCRIMINATOR);
            self.serialize(&mut data).unwrap();
            data
        }
    
        fn write_to(&self, mut data: &mut Vec<u8>) {
            data.clear();
            data.extend_from_slice(&Self::DISCRIMINATOR);
            self.serialize(&mut data).unwrap()
        }
    }
    

    #[derive(AnchorDiscriminator, AnchorSerialize, AnchorDeserialize)]
    pub struct UpdateSpotMarketFeeAdjustment {
        pub fee_adjustment: i16,
    }
    
    impl anchor_lang::InstructionData for UpdateSpotMarketFeeAdjustment {
        fn data(&self) -> Vec<u8> {
            let mut data = Vec::with_capacity(256);
            data.extend_from_slice(&Self::DISCRIMINATOR);
            self.serialize(&mut data).unwrap();
            data
        }
    
        fn write_to(&self, mut data: &mut Vec<u8>) {
            data.clear();
            data.extend_from_slice(&Self::DISCRIMINATOR);
            self.serialize(&mut data).unwrap()
        }
    }
    

    #[derive(AnchorDiscriminator, AnchorSerialize, AnchorDeserialize)]
    pub struct UpdatePerpMarketFuel {
        pub fuel_boost_taker: Option<u8>,
        pub fuel_boost_maker: Option<u8>,
        pub fuel_boost_position: Option<u8>,
    }
    
    impl anchor_lang::InstructionData for UpdatePerpMarketFuel {
        fn data(&self) -> Vec<u8> {
            let mut data = Vec::with_capacity(256);
            data.extend_from_slice(&Self::DISCRIMINATOR);
            self.serialize(&mut data).unwrap();
            data
        }
    
        fn write_to(&self, mut data: &mut Vec<u8>) {
            data.clear();
            data.extend_from_slice(&Self::DISCRIMINATOR);
            self.serialize(&mut data).unwrap()
        }
    }
    

    #[derive(AnchorDiscriminator, AnchorSerialize, AnchorDeserialize)]
    pub struct UpdateSpotMarketFuel {
        pub fuel_boost_deposits: Option<u8>,
        pub fuel_boost_borrows: Option<u8>,
        pub fuel_boost_taker: Option<u8>,
        pub fuel_boost_maker: Option<u8>,
        pub fuel_boost_insurance: Option<u8>,
    }
    
    impl anchor_lang::InstructionData for UpdateSpotMarketFuel {
        fn data(&self) -> Vec<u8> {
            let mut data = Vec::with_capacity(256);
            data.extend_from_slice(&Self::DISCRIMINATOR);
            self.serialize(&mut data).unwrap();
            data
        }
    
        fn write_to(&self, mut data: &mut Vec<u8>) {
            data.clear();
            data.extend_from_slice(&Self::DISCRIMINATOR);
            self.serialize(&mut data).unwrap()
        }
    }
    

    #[derive(AnchorDiscriminator, AnchorSerialize, AnchorDeserialize)]
    pub struct InitUserFuel {
        pub fuel_boost_deposits: Option<u32>,
        pub fuel_boost_borrows: Option<u32>,
        pub fuel_boost_taker: Option<u32>,
        pub fuel_boost_maker: Option<u32>,
        pub fuel_boost_insurance: Option<u32>,
    }
    
    impl anchor_lang::InstructionData for InitUserFuel {
        fn data(&self) -> Vec<u8> {
            let mut data = Vec::with_capacity(256);
            data.extend_from_slice(&Self::DISCRIMINATOR);
            self.serialize(&mut data).unwrap();
            data
        }
    
        fn write_to(&self, mut data: &mut Vec<u8>) {
            data.clear();
            data.extend_from_slice(&Self::DISCRIMINATOR);
            self.serialize(&mut data).unwrap()
        }
    }
    

    #[derive(AnchorDiscriminator, AnchorSerialize, AnchorDeserialize)]
    pub struct UpdateAdmin {
        pub admin: Pubkey,
    }
    
    impl anchor_lang::InstructionData for UpdateAdmin {
        fn data(&self) -> Vec<u8> {
            let mut data = Vec::with_capacity(256);
            data.extend_from_slice(&Self::DISCRIMINATOR);
            self.serialize(&mut data).unwrap();
            data
        }
    
        fn write_to(&self, mut data: &mut Vec<u8>) {
            data.clear();
            data.extend_from_slice(&Self::DISCRIMINATOR);
            self.serialize(&mut data).unwrap()
        }
    }
    

    #[derive(AnchorDiscriminator, AnchorSerialize, AnchorDeserialize)]
    pub struct UpdateWhitelistMint {
        pub whitelist_mint: Pubkey,
    }
    
    impl anchor_lang::InstructionData for UpdateWhitelistMint {
        fn data(&self) -> Vec<u8> {
            let mut data = Vec::with_capacity(256);
            data.extend_from_slice(&Self::DISCRIMINATOR);
            self.serialize(&mut data).unwrap();
            data
        }
    
        fn write_to(&self, mut data: &mut Vec<u8>) {
            data.clear();
            data.extend_from_slice(&Self::DISCRIMINATOR);
            self.serialize(&mut data).unwrap()
        }
    }
    

    #[derive(AnchorDiscriminator, AnchorSerialize, AnchorDeserialize)]
    pub struct UpdateDiscountMint {
        pub discount_mint: Pubkey,
    }
    
    impl anchor_lang::InstructionData for UpdateDiscountMint {
        fn data(&self) -> Vec<u8> {
            let mut data = Vec::with_capacity(256);
            data.extend_from_slice(&Self::DISCRIMINATOR);
            self.serialize(&mut data).unwrap();
            data
        }
    
        fn write_to(&self, mut data: &mut Vec<u8>) {
            data.clear();
            data.extend_from_slice(&Self::DISCRIMINATOR);
            self.serialize(&mut data).unwrap()
        }
    }
    

    #[derive(AnchorDiscriminator, AnchorSerialize, AnchorDeserialize)]
    pub struct UpdateExchangeStatus {
        pub exchange_status: u8,
    }
    
    impl anchor_lang::InstructionData for UpdateExchangeStatus {
        fn data(&self) -> Vec<u8> {
            let mut data = Vec::with_capacity(256);
            data.extend_from_slice(&Self::DISCRIMINATOR);
            self.serialize(&mut data).unwrap();
            data
        }
    
        fn write_to(&self, mut data: &mut Vec<u8>) {
            data.clear();
            data.extend_from_slice(&Self::DISCRIMINATOR);
            self.serialize(&mut data).unwrap()
        }
    }
    

    #[derive(AnchorDiscriminator, AnchorSerialize, AnchorDeserialize)]
    pub struct UpdatePerpAuctionDuration {
        pub min_perp_auction_duration: u8,
    }
    
    impl anchor_lang::InstructionData for UpdatePerpAuctionDuration {
        fn data(&self) -> Vec<u8> {
            let mut data = Vec::with_capacity(256);
            data.extend_from_slice(&Self::DISCRIMINATOR);
            self.serialize(&mut data).unwrap();
            data
        }
    
        fn write_to(&self, mut data: &mut Vec<u8>) {
            data.clear();
            data.extend_from_slice(&Self::DISCRIMINATOR);
            self.serialize(&mut data).unwrap()
        }
    }
    

    #[derive(AnchorDiscriminator, AnchorSerialize, AnchorDeserialize)]
    pub struct UpdateSpotAuctionDuration {
        pub default_spot_auction_duration: u8,
    }
    
    impl anchor_lang::InstructionData for UpdateSpotAuctionDuration {
        fn data(&self) -> Vec<u8> {
            let mut data = Vec::with_capacity(256);
            data.extend_from_slice(&Self::DISCRIMINATOR);
            self.serialize(&mut data).unwrap();
            data
        }
    
        fn write_to(&self, mut data: &mut Vec<u8>) {
            data.clear();
            data.extend_from_slice(&Self::DISCRIMINATOR);
            self.serialize(&mut data).unwrap()
        }
    }
    

    #[derive(AnchorDiscriminator, AnchorSerialize, AnchorDeserialize)]
    pub struct InitializeProtocolIfSharesTransferConfig {

    }
    
    impl anchor_lang::InstructionData for InitializeProtocolIfSharesTransferConfig {
        fn data(&self) -> Vec<u8> {
            let mut data = Vec::with_capacity(256);
            data.extend_from_slice(&Self::DISCRIMINATOR);
            self.serialize(&mut data).unwrap();
            data
        }
    
        fn write_to(&self, mut data: &mut Vec<u8>) {
            data.clear();
            data.extend_from_slice(&Self::DISCRIMINATOR);
            self.serialize(&mut data).unwrap()
        }
    }
    

    #[derive(AnchorDiscriminator, AnchorSerialize, AnchorDeserialize)]
    pub struct UpdateProtocolIfSharesTransferConfig {
        pub whitelisted_signers: Option<[Pubkey;4]>,
        pub max_transfer_per_epoch: Option<u128>,
    }
    
    impl anchor_lang::InstructionData for UpdateProtocolIfSharesTransferConfig {
        fn data(&self) -> Vec<u8> {
            let mut data = Vec::with_capacity(256);
            data.extend_from_slice(&Self::DISCRIMINATOR);
            self.serialize(&mut data).unwrap();
            data
        }
    
        fn write_to(&self, mut data: &mut Vec<u8>) {
            data.clear();
            data.extend_from_slice(&Self::DISCRIMINATOR);
            self.serialize(&mut data).unwrap()
        }
    }
    

    #[derive(AnchorDiscriminator, AnchorSerialize, AnchorDeserialize)]
    pub struct InitializePrelaunchOracle {
        pub params: PrelaunchOracleParams,
    }
    
    impl anchor_lang::InstructionData for InitializePrelaunchOracle {
        fn data(&self) -> Vec<u8> {
            let mut data = Vec::with_capacity(256);
            data.extend_from_slice(&Self::DISCRIMINATOR);
            self.serialize(&mut data).unwrap();
            data
        }
    
        fn write_to(&self, mut data: &mut Vec<u8>) {
            data.clear();
            data.extend_from_slice(&Self::DISCRIMINATOR);
            self.serialize(&mut data).unwrap()
        }
    }
    

    #[derive(AnchorDiscriminator, AnchorSerialize, AnchorDeserialize)]
    pub struct UpdatePrelaunchOracleParams {
        pub params: PrelaunchOracleParams,
    }
    
    impl anchor_lang::InstructionData for UpdatePrelaunchOracleParams {
        fn data(&self) -> Vec<u8> {
            let mut data = Vec::with_capacity(256);
            data.extend_from_slice(&Self::DISCRIMINATOR);
            self.serialize(&mut data).unwrap();
            data
        }
    
        fn write_to(&self, mut data: &mut Vec<u8>) {
            data.clear();
            data.extend_from_slice(&Self::DISCRIMINATOR);
            self.serialize(&mut data).unwrap()
        }
    }
    

    #[derive(AnchorDiscriminator, AnchorSerialize, AnchorDeserialize)]
    pub struct DeletePrelaunchOracle {
        pub perp_market_index: u16,
    }
    
    impl anchor_lang::InstructionData for DeletePrelaunchOracle {
        fn data(&self) -> Vec<u8> {
            let mut data = Vec::with_capacity(256);
            data.extend_from_slice(&Self::DISCRIMINATOR);
            self.serialize(&mut data).unwrap();
            data
        }
    
        fn write_to(&self, mut data: &mut Vec<u8>) {
            data.clear();
            data.extend_from_slice(&Self::DISCRIMINATOR);
            self.serialize(&mut data).unwrap()
        }
    }
    

    #[derive(AnchorDiscriminator, AnchorSerialize, AnchorDeserialize)]
    pub struct InitializePythPullOracle {
        pub feed_id: [u8;32],
    }
    
    impl anchor_lang::InstructionData for InitializePythPullOracle {
        fn data(&self) -> Vec<u8> {
            let mut data = Vec::with_capacity(256);
            data.extend_from_slice(&Self::DISCRIMINATOR);
            self.serialize(&mut data).unwrap();
            data
        }
    
        fn write_to(&self, mut data: &mut Vec<u8>) {
            data.clear();
            data.extend_from_slice(&Self::DISCRIMINATOR);
            self.serialize(&mut data).unwrap()
        }
    }
            
}

// Events
#[cfg(feature="events")]
pub mod events {
    use super::*;
    use anchor_i11n::AnchorDiscriminator;
    use anchor_lang::Discriminator;

    #[cfg_attr(not(target_os="solana"), derive(Debug))]
    #[derive(AnchorDiscriminator, AnchorSerialize, AnchorDeserialize)]
    pub struct NewUserRecord {
                pub ts: i64,
                pub user_authority: Pubkey,
                pub user: Pubkey,
                pub sub_account_id: u16,
                pub name: [u8;32],
                pub referrer: Pubkey
    }
        
    impl anchor_lang::Event for NewUserRecord {
        fn data(&self) -> Vec<u8> {
            let mut data = Self::DISCRIMINATOR.to_vec();
            self.serialize(&mut data).unwrap();
            data
        }
    }
    
    #[cfg_attr(not(target_os="solana"), derive(Debug))]
    #[derive(AnchorDiscriminator, AnchorSerialize, AnchorDeserialize)]
    pub struct DepositRecord {
                pub ts: i64,
                pub user_authority: Pubkey,
                pub user: Pubkey,
                pub direction: DepositDirection,
                pub deposit_record_id: u64,
                pub amount: u64,
                pub market_index: u16,
                pub oracle_price: i64,
                pub market_deposit_balance: u128,
                pub market_withdraw_balance: u128,
                pub market_cumulative_deposit_interest: u128,
                pub market_cumulative_borrow_interest: u128,
                pub total_deposits_after: u64,
                pub total_withdraws_after: u64,
                pub explanation: DepositExplanation,
                pub transfer_user: Option<Pubkey>
    }
        
    impl anchor_lang::Event for DepositRecord {
        fn data(&self) -> Vec<u8> {
            let mut data = Self::DISCRIMINATOR.to_vec();
            self.serialize(&mut data).unwrap();
            data
        }
    }
    
    #[cfg_attr(not(target_os="solana"), derive(Debug))]
    #[derive(AnchorDiscriminator, AnchorSerialize, AnchorDeserialize)]
    pub struct SpotInterestRecord {
                pub ts: i64,
                pub market_index: u16,
                pub deposit_balance: u128,
                pub cumulative_deposit_interest: u128,
                pub borrow_balance: u128,
                pub cumulative_borrow_interest: u128,
                pub optimal_utilization: u32,
                pub optimal_borrow_rate: u32,
                pub max_borrow_rate: u32
    }
        
    impl anchor_lang::Event for SpotInterestRecord {
        fn data(&self) -> Vec<u8> {
            let mut data = Self::DISCRIMINATOR.to_vec();
            self.serialize(&mut data).unwrap();
            data
        }
    }
    
    #[cfg_attr(not(target_os="solana"), derive(Debug))]
    #[derive(AnchorDiscriminator, AnchorSerialize, AnchorDeserialize)]
    pub struct FundingPaymentRecord {
                pub ts: i64,
                pub user_authority: Pubkey,
                pub user: Pubkey,
                pub market_index: u16,
                pub funding_payment: i64,
                pub base_asset_amount: i64,
                pub user_last_cumulative_funding: i64,
                pub amm_cumulative_funding_long: i128,
                pub amm_cumulative_funding_short: i128
    }
        
    impl anchor_lang::Event for FundingPaymentRecord {
        fn data(&self) -> Vec<u8> {
            let mut data = Self::DISCRIMINATOR.to_vec();
            self.serialize(&mut data).unwrap();
            data
        }
    }
    
    #[cfg_attr(not(target_os="solana"), derive(Debug))]
    #[derive(AnchorDiscriminator, AnchorSerialize, AnchorDeserialize)]
    pub struct FundingRateRecord {
                pub ts: i64,
                pub record_id: u64,
                pub market_index: u16,
                pub funding_rate: i64,
                pub funding_rate_long: i128,
                pub funding_rate_short: i128,
                pub cumulative_funding_rate_long: i128,
                pub cumulative_funding_rate_short: i128,
                pub oracle_price_twap: i64,
                pub mark_price_twap: u64,
                pub period_revenue: i64,
                pub base_asset_amount_with_amm: i128,
                pub base_asset_amount_with_unsettled_lp: i128
    }
        
    impl anchor_lang::Event for FundingRateRecord {
        fn data(&self) -> Vec<u8> {
            let mut data = Self::DISCRIMINATOR.to_vec();
            self.serialize(&mut data).unwrap();
            data
        }
    }
    
    #[cfg_attr(not(target_os="solana"), derive(Debug))]
    #[derive(AnchorDiscriminator, AnchorSerialize, AnchorDeserialize)]
    pub struct CurveRecord {
                pub ts: i64,
                pub record_id: u64,
                pub peg_multiplier_before: u128,
                pub base_asset_reserve_before: u128,
                pub quote_asset_reserve_before: u128,
                pub sqrt_k_before: u128,
                pub peg_multiplier_after: u128,
                pub base_asset_reserve_after: u128,
                pub quote_asset_reserve_after: u128,
                pub sqrt_k_after: u128,
                pub base_asset_amount_long: u128,
                pub base_asset_amount_short: u128,
                pub base_asset_amount_with_amm: i128,
                pub total_fee: i128,
                pub total_fee_minus_distributions: i128,
                pub adjustment_cost: i128,
                pub oracle_price: i64,
                pub fill_record: u128,
                pub number_of_users: u32,
                pub market_index: u16
    }
        
    impl anchor_lang::Event for CurveRecord {
        fn data(&self) -> Vec<u8> {
            let mut data = Self::DISCRIMINATOR.to_vec();
            self.serialize(&mut data).unwrap();
            data
        }
    }
    
    #[cfg_attr(not(target_os="solana"), derive(Debug))]
    #[derive(AnchorDiscriminator, AnchorSerialize, AnchorDeserialize)]
    pub struct OrderRecord {
                pub ts: i64,
                pub user: Pubkey,
                pub order: Order
    }
        
    impl anchor_lang::Event for OrderRecord {
        fn data(&self) -> Vec<u8> {
            let mut data = Self::DISCRIMINATOR.to_vec();
            self.serialize(&mut data).unwrap();
            data
        }
    }
    
    #[cfg_attr(not(target_os="solana"), derive(Debug))]
    #[derive(AnchorDiscriminator, AnchorSerialize, AnchorDeserialize)]
    pub struct OrderActionRecord {
                pub ts: i64,
                pub action: OrderAction,
                pub action_explanation: OrderActionExplanation,
                pub market_index: u16,
                pub market_type: MarketType,
                pub filler: Option<Pubkey>,
                pub filler_reward: Option<u64>,
                pub fill_record_id: Option<u64>,
                pub base_asset_amount_filled: Option<u64>,
                pub quote_asset_amount_filled: Option<u64>,
                pub taker_fee: Option<u64>,
                pub maker_fee: Option<i64>,
                pub referrer_reward: Option<u32>,
                pub quote_asset_amount_surplus: Option<i64>,
                pub spot_fulfillment_method_fee: Option<u64>,
                pub taker: Option<Pubkey>,
                pub taker_order_id: Option<u32>,
                pub taker_order_direction: Option<PositionDirection>,
                pub taker_order_base_asset_amount: Option<u64>,
                pub taker_order_cumulative_base_asset_amount_filled: Option<u64>,
                pub taker_order_cumulative_quote_asset_amount_filled: Option<u64>,
                pub maker: Option<Pubkey>,
                pub maker_order_id: Option<u32>,
                pub maker_order_direction: Option<PositionDirection>,
                pub maker_order_base_asset_amount: Option<u64>,
                pub maker_order_cumulative_base_asset_amount_filled: Option<u64>,
                pub maker_order_cumulative_quote_asset_amount_filled: Option<u64>,
                pub oracle_price: i64
    }
        
    impl anchor_lang::Event for OrderActionRecord {
        fn data(&self) -> Vec<u8> {
            let mut data = Self::DISCRIMINATOR.to_vec();
            self.serialize(&mut data).unwrap();
            data
        }
    }
    
    #[cfg_attr(not(target_os="solana"), derive(Debug))]
    #[derive(AnchorDiscriminator, AnchorSerialize, AnchorDeserialize)]
    pub struct LpRecord {
                pub ts: i64,
                pub user: Pubkey,
                pub action: LPAction,
                pub n_shares: u64,
                pub market_index: u16,
                pub delta_base_asset_amount: i64,
                pub delta_quote_asset_amount: i64,
                pub pnl: i64
    }
        
    impl anchor_lang::Event for LpRecord {
        fn data(&self) -> Vec<u8> {
            let mut data = Self::DISCRIMINATOR.to_vec();
            self.serialize(&mut data).unwrap();
            data
        }
    }
    
    #[cfg_attr(not(target_os="solana"), derive(Debug))]
    #[derive(AnchorDiscriminator, AnchorSerialize, AnchorDeserialize)]
    pub struct LiquidationRecord {
                pub ts: i64,
                pub liquidation_type: LiquidationType,
                pub user: Pubkey,
                pub liquidator: Pubkey,
                pub margin_requirement: u128,
                pub total_collateral: i128,
                pub margin_freed: u64,
                pub liquidation_id: u16,
                pub bankrupt: bool,
                pub canceled_order_ids: Vec<u32>,
                pub liquidate_perp: LiquidatePerpRecord,
                pub liquidate_spot: LiquidateSpotRecord,
                pub liquidate_borrow_for_perp_pnl: LiquidateBorrowForPerpPnlRecord,
                pub liquidate_perp_pnl_for_deposit: LiquidatePerpPnlForDepositRecord,
                pub perp_bankruptcy: PerpBankruptcyRecord,
                pub spot_bankruptcy: SpotBankruptcyRecord
    }
        
    impl anchor_lang::Event for LiquidationRecord {
        fn data(&self) -> Vec<u8> {
            let mut data = Self::DISCRIMINATOR.to_vec();
            self.serialize(&mut data).unwrap();
            data
        }
    }
    
    #[cfg_attr(not(target_os="solana"), derive(Debug))]
    #[derive(AnchorDiscriminator, AnchorSerialize, AnchorDeserialize)]
    pub struct SettlePnlRecord {
                pub ts: i64,
                pub user: Pubkey,
                pub market_index: u16,
                pub pnl: i128,
                pub base_asset_amount: i64,
                pub quote_asset_amount_after: i64,
                pub quote_entry_amount: i64,
                pub settle_price: i64,
                pub explanation: SettlePnlExplanation
    }
        
    impl anchor_lang::Event for SettlePnlRecord {
        fn data(&self) -> Vec<u8> {
            let mut data = Self::DISCRIMINATOR.to_vec();
            self.serialize(&mut data).unwrap();
            data
        }
    }
    
    #[cfg_attr(not(target_os="solana"), derive(Debug))]
    #[derive(AnchorDiscriminator, AnchorSerialize, AnchorDeserialize)]
    pub struct InsuranceFundRecord {
                pub ts: i64,
                pub spot_market_index: u16,
                pub perp_market_index: u16,
                pub user_if_factor: u32,
                pub total_if_factor: u32,
                pub vault_amount_before: u64,
                pub insurance_vault_amount_before: u64,
                pub total_if_shares_before: u128,
                pub total_if_shares_after: u128,
                pub amount: i64
    }
        
    impl anchor_lang::Event for InsuranceFundRecord {
        fn data(&self) -> Vec<u8> {
            let mut data = Self::DISCRIMINATOR.to_vec();
            self.serialize(&mut data).unwrap();
            data
        }
    }
    
    #[cfg_attr(not(target_os="solana"), derive(Debug))]
    #[derive(AnchorDiscriminator, AnchorSerialize, AnchorDeserialize)]
    pub struct InsuranceFundStakeRecord {
                pub ts: i64,
                pub user_authority: Pubkey,
                pub action: StakeAction,
                pub amount: u64,
                pub market_index: u16,
                pub insurance_vault_amount_before: u64,
                pub if_shares_before: u128,
                pub user_if_shares_before: u128,
                pub total_if_shares_before: u128,
                pub if_shares_after: u128,
                pub user_if_shares_after: u128,
                pub total_if_shares_after: u128
    }
        
    impl anchor_lang::Event for InsuranceFundStakeRecord {
        fn data(&self) -> Vec<u8> {
            let mut data = Self::DISCRIMINATOR.to_vec();
            self.serialize(&mut data).unwrap();
            data
        }
    }
    
    #[cfg_attr(not(target_os="solana"), derive(Debug))]
    #[derive(AnchorDiscriminator, AnchorSerialize, AnchorDeserialize)]
    pub struct SwapRecord {
                pub ts: i64,
                pub user: Pubkey,
                pub amount_out: u64,
                pub amount_in: u64,
                pub out_market_index: u16,
                pub in_market_index: u16,
                pub out_oracle_price: i64,
                pub in_oracle_price: i64,
                pub fee: u64
    }
        
    impl anchor_lang::Event for SwapRecord {
        fn data(&self) -> Vec<u8> {
            let mut data = Self::DISCRIMINATOR.to_vec();
            self.serialize(&mut data).unwrap();
            data
        }
    }
    
    #[cfg_attr(not(target_os="solana"), derive(Debug))]
    #[derive(AnchorDiscriminator, AnchorSerialize, AnchorDeserialize)]
    pub struct SpotMarketVaultDepositRecord {
                pub ts: i64,
                pub market_index: u16,
                pub deposit_balance: u128,
                pub cumulative_deposit_interest_before: u128,
                pub cumulative_deposit_interest_after: u128,
                pub deposit_token_amount_before: u64,
                pub amount: u64
    }
        
    impl anchor_lang::Event for SpotMarketVaultDepositRecord {
        fn data(&self) -> Vec<u8> {
            let mut data = Self::DISCRIMINATOR.to_vec();
            self.serialize(&mut data).unwrap();
            data
        }
    }
}

// Accounts
pub mod accounts {
    #![allow(unused)]
    use super::*;

    #[account]
    pub struct OpenbookV2FulfillmentConfig {
        pub pubkey: Pubkey,
        pub openbook_v_2_program_id: Pubkey,
        pub openbook_v_2_market: Pubkey,
        pub openbook_v_2_market_authority: Pubkey,
        pub openbook_v_2_event_heap: Pubkey,
        pub openbook_v_2_bids: Pubkey,
        pub openbook_v_2_asks: Pubkey,
        pub openbook_v_2_base_vault: Pubkey,
        pub openbook_v_2_quote_vault: Pubkey,
        pub market_index: u16,
        pub fulfillment_type: SpotFulfillmentType,
        pub status: SpotFulfillmentConfigStatus,
        pub padding: [u8;4]
    }

    #[account]
    pub struct PhoenixV1FulfillmentConfig {
        pub pubkey: Pubkey,
        pub phoenix_program_id: Pubkey,
        pub phoenix_log_authority: Pubkey,
        pub phoenix_market: Pubkey,
        pub phoenix_base_vault: Pubkey,
        pub phoenix_quote_vault: Pubkey,
        pub market_index: u16,
        pub fulfillment_type: SpotFulfillmentType,
        pub status: SpotFulfillmentConfigStatus,
        pub padding: [u8;4]
    }

    #[account]
    pub struct SerumV3FulfillmentConfig {
        pub pubkey: Pubkey,
        pub serum_program_id: Pubkey,
        pub serum_market: Pubkey,
        pub serum_request_queue: Pubkey,
        pub serum_event_queue: Pubkey,
        pub serum_bids: Pubkey,
        pub serum_asks: Pubkey,
        pub serum_base_vault: Pubkey,
        pub serum_quote_vault: Pubkey,
        pub serum_open_orders: Pubkey,
        pub serum_signer_nonce: u64,
        pub market_index: u16,
        pub fulfillment_type: SpotFulfillmentType,
        pub status: SpotFulfillmentConfigStatus,
        pub padding: [u8;4]
    }

    #[account]
    pub struct InsuranceFundStake {
        pub authority: Pubkey,
        pub if_shares: u128,
        pub last_withdraw_request_shares: u128,
        pub if_base: u128,
        pub last_valid_ts: i64,
        pub last_withdraw_request_value: u64,
        pub last_withdraw_request_ts: i64,
        pub cost_basis: i64,
        pub market_index: u16,
        pub padding: [u8;14]
    }

    #[account]
    pub struct ProtocolIfSharesTransferConfig {
        pub whitelisted_signers: [Pubkey;4],
        pub max_transfer_per_epoch: u128,
        pub current_epoch_transfer: u128,
        pub next_epoch_ts: i64,
        pub padding: [u128;8]
    }

    #[account]
    pub struct PrelaunchOracle {
        pub price: i64,
        pub max_price: i64,
        pub confidence: u64,
        pub last_update_slot: u64,
        pub amm_last_update_slot: u64,
        pub perp_market_index: u16,
        pub padding: [u8;70]
    }

    #[account]
    pub struct PerpMarket {
        pub pubkey: Pubkey,
        pub amm: AMM,
        pub pnl_pool: PoolBalance,
        pub name: [u8;32],
        pub insurance_claim: InsuranceClaim,
        pub unrealized_pnl_max_imbalance: u64,
        pub expiry_ts: i64,
        pub expiry_price: i64,
        pub next_fill_record_id: u64,
        pub next_funding_rate_record_id: u64,
        pub next_curve_record_id: u64,
        pub imf_factor: u32,
        pub unrealized_pnl_imf_factor: u32,
        pub liquidator_fee: u32,
        pub if_liquidation_fee: u32,
        pub margin_ratio_initial: u32,
        pub margin_ratio_maintenance: u32,
        pub unrealized_pnl_initial_asset_weight: u32,
        pub unrealized_pnl_maintenance_asset_weight: u32,
        pub number_of_users_with_base: u32,
        pub number_of_users: u32,
        pub market_index: u16,
        pub status: MarketStatus,
        pub contract_type: ContractType,
        pub contract_tier: ContractTier,
        pub paused_operations: u8,
        pub quote_spot_market_index: u16,
        pub fee_adjustment: i16,
        pub fuel_boost_position: u8,
        pub fuel_boost_taker: u8,
        pub fuel_boost_maker: u8,
        pub padding: [u8;43]
    }

    #[account]
    pub struct SpotMarket {
        pub pubkey: Pubkey,
        pub oracle: Pubkey,
        pub mint: Pubkey,
        pub vault: Pubkey,
        pub name: [u8;32],
        pub historical_oracle_data: HistoricalOracleData,
        pub historical_index_data: HistoricalIndexData,
        pub revenue_pool: PoolBalance,
        pub spot_fee_pool: PoolBalance,
        pub insurance_fund: InsuranceFund,
        pub total_spot_fee: u128,
        pub deposit_balance: u128,
        pub borrow_balance: u128,
        pub cumulative_deposit_interest: u128,
        pub cumulative_borrow_interest: u128,
        pub total_social_loss: u128,
        pub total_quote_social_loss: u128,
        pub withdraw_guard_threshold: u64,
        pub max_token_deposits: u64,
        pub deposit_token_twap: u64,
        pub borrow_token_twap: u64,
        pub utilization_twap: u64,
        pub last_interest_ts: u64,
        pub last_twap_ts: u64,
        pub expiry_ts: i64,
        pub order_step_size: u64,
        pub order_tick_size: u64,
        pub min_order_size: u64,
        pub max_position_size: u64,
        pub next_fill_record_id: u64,
        pub next_deposit_record_id: u64,
        pub initial_asset_weight: u32,
        pub maintenance_asset_weight: u32,
        pub initial_liability_weight: u32,
        pub maintenance_liability_weight: u32,
        pub imf_factor: u32,
        pub liquidator_fee: u32,
        pub if_liquidation_fee: u32,
        pub optimal_utilization: u32,
        pub optimal_borrow_rate: u32,
        pub max_borrow_rate: u32,
        pub decimals: u32,
        pub market_index: u16,
        pub orders_enabled: bool,
        pub oracle_source: OracleSource,
        pub status: MarketStatus,
        pub asset_tier: AssetTier,
        pub paused_operations: u8,
        pub if_paused_operations: u8,
        pub fee_adjustment: i16,
        pub max_token_borrows_fraction: u16,
        pub flash_loan_amount: u64,
        pub flash_loan_initial_token_amount: u64,
        pub total_swap_fee: u64,
        pub scale_initial_asset_weight_start: u64,
        pub min_borrow_rate: u8,
        pub fuel_boost_deposits: u8,
        pub fuel_boost_borrows: u8,
        pub fuel_boost_taker: u8,
        pub fuel_boost_maker: u8,
        pub fuel_boost_insurance: u8,
        pub token_program: u8,
        pub padding: [u8;41]
    }

    #[account]
    pub struct State {
        pub admin: Pubkey,
        pub whitelist_mint: Pubkey,
        pub discount_mint: Pubkey,
        pub signer: Pubkey,
        pub srm_vault: Pubkey,
        pub perp_fee_structure: FeeStructure,
        pub spot_fee_structure: FeeStructure,
        pub oracle_guard_rails: OracleGuardRails,
        pub number_of_authorities: u64,
        pub number_of_sub_accounts: u64,
        pub lp_cooldown_time: u64,
        pub liquidation_margin_buffer_ratio: u32,
        pub settlement_duration: u16,
        pub number_of_markets: u16,
        pub number_of_spot_markets: u16,
        pub signer_nonce: u8,
        pub min_perp_auction_duration: u8,
        pub default_market_order_time_in_force: u8,
        pub default_spot_auction_duration: u8,
        pub exchange_status: u8,
        pub liquidation_duration: u8,
        pub initial_pct_to_liquidate: u16,
        pub max_number_of_sub_accounts: u16,
        pub max_initialize_user_fee: u16,
        pub padding: [u8;10]
    }

    #[account]
    pub struct User {
        pub authority: Pubkey,
        pub delegate: Pubkey,
        pub name: [u8;32],
        pub spot_positions: [SpotPosition;8],
        pub perp_positions: [PerpPosition;8],
        pub orders: [Order;32],
        pub last_add_perp_lp_shares_ts: i64,
        pub total_deposits: u64,
        pub total_withdraws: u64,
        pub total_social_loss: u64,
        pub settled_perp_pnl: i64,
        pub cumulative_spot_fees: i64,
        pub cumulative_perp_funding: i64,
        pub liquidation_margin_freed: u64,
        pub last_active_slot: u64,
        pub next_order_id: u32,
        pub max_margin_ratio: u32,
        pub next_liquidation_id: u16,
        pub sub_account_id: u16,
        pub status: u8,
        pub is_margin_trading_enabled: bool,
        pub idle: bool,
        pub open_orders: u8,
        pub has_open_order: bool,
        pub open_auctions: u8,
        pub has_open_auction: bool,
        pub padding_1: [u8;5],
        pub last_fuel_bonus_update_ts: u32,
        pub padding: [u8;12]
    }

    #[account]
    pub struct UserStats {
        pub authority: Pubkey,
        pub referrer: Pubkey,
        pub fees: UserFees,
        pub next_epoch_ts: i64,
        pub maker_volume_30_d: u64,
        pub taker_volume_30_d: u64,
        pub filler_volume_30_d: u64,
        pub last_maker_volume_30_d_ts: i64,
        pub last_taker_volume_30_d_ts: i64,
        pub last_filler_volume_30_d_ts: i64,
        pub if_staked_quote_asset_amount: u64,
        pub number_of_sub_accounts: u16,
        pub number_of_sub_accounts_created: u16,
        pub is_referrer: bool,
        pub disable_update_perp_bid_ask_twap: bool,
        pub padding_1: [u8;2],
        pub fuel_insurance: u32,
        pub fuel_deposits: u32,
        pub fuel_borrows: u32,
        pub fuel_positions: u32,
        pub fuel_taker: u32,
        pub fuel_maker: u32,
        pub if_staked_gov_token_amount: u64,
        pub last_fuel_if_bonus_update_ts: u32,
        pub padding: [u8;12]
    }

    #[account]
    pub struct ReferrerName {
        pub authority: Pubkey,
        pub user: Pubkey,
        pub user_stats: Pubkey,
        pub name: [u8;32]
    }  
}
        
// Defined types
#[cfg_attr(not(target_os="solana"), derive(Debug))]
#[derive(Clone, AnchorSerialize, AnchorDeserialize)]
pub struct UpdatePerpMarketSummaryStatsParams {
    pub quote_asset_amount_with_unsettled_lp: Option<i64>,
    pub net_unsettled_funding_pnl: Option<i64>,
    pub update_amm_summary_stats: Option<bool>,
}

#[cfg_attr(not(target_os="solana"), derive(Debug))]
#[derive(Clone, AnchorSerialize, AnchorDeserialize)]
pub struct LiquidatePerpRecord {
    pub market_index: u16,
    pub oracle_price: i64,
    pub base_asset_amount: i64,
    pub quote_asset_amount: i64,
    pub lp_shares: u64,
    pub fill_record_id: u64,
    pub user_order_id: u32,
    pub liquidator_order_id: u32,
    pub liquidator_fee: u64,
    pub if_fee: u64,
}

#[cfg_attr(not(target_os="solana"), derive(Debug))]
#[derive(Clone, AnchorSerialize, AnchorDeserialize)]
pub struct LiquidateSpotRecord {
    pub asset_market_index: u16,
    pub asset_price: i64,
    pub asset_transfer: u128,
    pub liability_market_index: u16,
    pub liability_price: i64,
    pub liability_transfer: u128,
    pub if_fee: u64,
}

#[cfg_attr(not(target_os="solana"), derive(Debug))]
#[derive(Clone, AnchorSerialize, AnchorDeserialize)]
pub struct LiquidateBorrowForPerpPnlRecord {
    pub perp_market_index: u16,
    pub market_oracle_price: i64,
    pub pnl_transfer: u128,
    pub liability_market_index: u16,
    pub liability_price: i64,
    pub liability_transfer: u128,
}

#[cfg_attr(not(target_os="solana"), derive(Debug))]
#[derive(Clone, AnchorSerialize, AnchorDeserialize)]
pub struct LiquidatePerpPnlForDepositRecord {
    pub perp_market_index: u16,
    pub market_oracle_price: i64,
    pub pnl_transfer: u128,
    pub asset_market_index: u16,
    pub asset_price: i64,
    pub asset_transfer: u128,
}

#[cfg_attr(not(target_os="solana"), derive(Debug))]
#[derive(Clone, AnchorSerialize, AnchorDeserialize)]
pub struct PerpBankruptcyRecord {
    pub market_index: u16,
    pub pnl: i128,
    pub if_payment: u128,
    pub clawback_user: Option<Pubkey>,
    pub clawback_user_payment: Option<u128>,
    pub cumulative_funding_rate_delta: i128,
}

#[cfg_attr(not(target_os="solana"), derive(Debug))]
#[derive(Clone, AnchorSerialize, AnchorDeserialize)]
pub struct SpotBankruptcyRecord {
    pub market_index: u16,
    pub borrow_amount: u128,
    pub if_payment: u128,
    pub cumulative_deposit_interest_delta: u128,
}

#[cfg_attr(not(target_os="solana"), derive(Debug))]
#[derive(Clone, AnchorSerialize, AnchorDeserialize)]
pub struct MarketIdentifier {
    pub market_type: MarketType,
    pub market_index: u16,
}

#[cfg_attr(not(target_os="solana"), derive(Debug))]
#[derive(Clone, AnchorSerialize, AnchorDeserialize)]
pub struct HistoricalOracleData {
    pub last_oracle_price: i64,
    pub last_oracle_conf: u64,
    pub last_oracle_delay: i64,
    pub last_oracle_price_twap: i64,
    pub last_oracle_price_twap_5_min: i64,
    pub last_oracle_price_twap_ts: i64,
}

#[cfg_attr(not(target_os="solana"), derive(Debug))]
#[derive(Clone, AnchorSerialize, AnchorDeserialize)]
pub struct HistoricalIndexData {
    pub last_index_bid_price: u64,
    pub last_index_ask_price: u64,
    pub last_index_price_twap: u64,
    pub last_index_price_twap_5_min: u64,
    pub last_index_price_twap_ts: i64,
}

#[cfg_attr(not(target_os="solana"), derive(Debug))]
#[derive(Clone, AnchorSerialize, AnchorDeserialize)]
pub struct PrelaunchOracleParams {
    pub perp_market_index: u16,
    pub price: Option<i64>,
    pub max_price: Option<i64>,
}

#[cfg_attr(not(target_os="solana"), derive(Debug))]
#[derive(Clone, AnchorSerialize, AnchorDeserialize)]
pub struct OrderParams {
    pub order_type: OrderType,
    pub market_type: MarketType,
    pub direction: PositionDirection,
    pub user_order_id: u8,
    pub base_asset_amount: u64,
    pub price: u64,
    pub market_index: u16,
    pub reduce_only: bool,
    pub post_only: PostOnlyParam,
    pub immediate_or_cancel: bool,
    pub max_ts: Option<i64>,
    pub trigger_price: Option<u64>,
    pub trigger_condition: OrderTriggerCondition,
    pub oracle_price_offset: Option<i32>,
    pub auction_duration: Option<u8>,
    pub auction_start_price: Option<i64>,
    pub auction_end_price: Option<i64>,
}

#[cfg_attr(not(target_os="solana"), derive(Debug))]
#[derive(Clone, AnchorSerialize, AnchorDeserialize)]
pub struct ModifyOrderParams {
    pub direction: Option<PositionDirection>,
    pub base_asset_amount: Option<u64>,
    pub price: Option<u64>,
    pub reduce_only: Option<bool>,
    pub post_only: Option<PostOnlyParam>,
    pub immediate_or_cancel: Option<bool>,
    pub max_ts: Option<i64>,
    pub trigger_price: Option<u64>,
    pub trigger_condition: Option<OrderTriggerCondition>,
    pub oracle_price_offset: Option<i32>,
    pub auction_duration: Option<u8>,
    pub auction_start_price: Option<i64>,
    pub auction_end_price: Option<i64>,
    pub policy: Option<ModifyOrderPolicy>,
}

#[cfg_attr(not(target_os="solana"), derive(Debug))]
#[derive(Clone, AnchorSerialize, AnchorDeserialize)]
pub struct InsuranceClaim {
    pub revenue_withdraw_since_last_settle: i64,
    pub max_revenue_withdraw_per_period: u64,
    pub quote_max_insurance: u64,
    pub quote_settled_insurance: u64,
    pub last_revenue_withdraw_ts: i64,
}

#[cfg_attr(not(target_os="solana"), derive(Debug))]
#[derive(Clone, AnchorSerialize, AnchorDeserialize)]
pub struct PoolBalance {
    pub scaled_balance: u128,
    pub market_index: u16,
    pub padding: [u8;6],
}

#[cfg_attr(not(target_os="solana"), derive(Debug))]
#[derive(Clone, AnchorSerialize, AnchorDeserialize)]
pub struct AMM {
    pub oracle: Pubkey,
    pub historical_oracle_data: HistoricalOracleData,
    pub base_asset_amount_per_lp: i128,
    pub quote_asset_amount_per_lp: i128,
    pub fee_pool: PoolBalance,
    pub base_asset_reserve: u128,
    pub quote_asset_reserve: u128,
    pub concentration_coef: u128,
    pub min_base_asset_reserve: u128,
    pub max_base_asset_reserve: u128,
    pub sqrt_k: u128,
    pub peg_multiplier: u128,
    pub terminal_quote_asset_reserve: u128,
    pub base_asset_amount_long: i128,
    pub base_asset_amount_short: i128,
    pub base_asset_amount_with_amm: i128,
    pub base_asset_amount_with_unsettled_lp: i128,
    pub max_open_interest: u128,
    pub quote_asset_amount: i128,
    pub quote_entry_amount_long: i128,
    pub quote_entry_amount_short: i128,
    pub quote_break_even_amount_long: i128,
    pub quote_break_even_amount_short: i128,
    pub user_lp_shares: u128,
    pub last_funding_rate: i64,
    pub last_funding_rate_long: i64,
    pub last_funding_rate_short: i64,
    pub last_24_h_avg_funding_rate: i64,
    pub total_fee: i128,
    pub total_mm_fee: i128,
    pub total_exchange_fee: u128,
    pub total_fee_minus_distributions: i128,
    pub total_fee_withdrawn: u128,
    pub total_liquidation_fee: u128,
    pub cumulative_funding_rate_long: i128,
    pub cumulative_funding_rate_short: i128,
    pub total_social_loss: u128,
    pub ask_base_asset_reserve: u128,
    pub ask_quote_asset_reserve: u128,
    pub bid_base_asset_reserve: u128,
    pub bid_quote_asset_reserve: u128,
    pub last_oracle_normalised_price: i64,
    pub last_oracle_reserve_price_spread_pct: i64,
    pub last_bid_price_twap: u64,
    pub last_ask_price_twap: u64,
    pub last_mark_price_twap: u64,
    pub last_mark_price_twap_5_min: u64,
    pub last_update_slot: u64,
    pub last_oracle_conf_pct: u64,
    pub net_revenue_since_last_funding: i64,
    pub last_funding_rate_ts: i64,
    pub funding_period: i64,
    pub order_step_size: u64,
    pub order_tick_size: u64,
    pub min_order_size: u64,
    pub max_position_size: u64,
    pub volume_24_h: u64,
    pub long_intensity_volume: u64,
    pub short_intensity_volume: u64,
    pub last_trade_ts: i64,
    pub mark_std: u64,
    pub oracle_std: u64,
    pub last_mark_price_twap_ts: i64,
    pub base_spread: u32,
    pub max_spread: u32,
    pub long_spread: u32,
    pub short_spread: u32,
    pub long_intensity_count: u32,
    pub short_intensity_count: u32,
    pub max_fill_reserve_fraction: u16,
    pub max_slippage_ratio: u16,
    pub curve_update_intensity: u8,
    pub amm_jit_intensity: u8,
    pub oracle_source: OracleSource,
    pub last_oracle_valid: bool,
    pub target_base_asset_amount_per_lp: i32,
    pub per_lp_base: i8,
    pub padding_1: u8,
    pub padding_2: u16,
    pub total_fee_earned_per_lp: u64,
    pub net_unsettled_funding_pnl: i64,
    pub quote_asset_amount_with_unsettled_lp: i64,
    pub reference_price_offset: i32,
    pub padding: [u8;12],
}

#[cfg_attr(not(target_os="solana"), derive(Debug))]
#[derive(Clone, AnchorSerialize, AnchorDeserialize)]
pub struct InsuranceFund {
    pub vault: Pubkey,
    pub total_shares: u128,
    pub user_shares: u128,
    pub shares_base: u128,
    pub unstaking_period: i64,
    pub last_revenue_settle_ts: i64,
    pub revenue_settle_period: i64,
    pub total_factor: u32,
    pub user_factor: u32,
}

#[cfg_attr(not(target_os="solana"), derive(Debug))]
#[derive(Clone, AnchorSerialize, AnchorDeserialize)]
pub struct OracleGuardRails {
    pub price_divergence: PriceDivergenceGuardRails,
    pub validity: ValidityGuardRails,
}

#[cfg_attr(not(target_os="solana"), derive(Debug))]
#[derive(Clone, AnchorSerialize, AnchorDeserialize)]
pub struct PriceDivergenceGuardRails {
    pub mark_oracle_percent_divergence: u64,
    pub oracle_twap_5_min_percent_divergence: u64,
}

#[cfg_attr(not(target_os="solana"), derive(Debug))]
#[derive(Clone, AnchorSerialize, AnchorDeserialize)]
pub struct ValidityGuardRails {
    pub slots_before_stale_for_amm: i64,
    pub slots_before_stale_for_margin: i64,
    pub confidence_interval_max_size: u64,
    pub too_volatile_ratio: i64,
}

#[cfg_attr(not(target_os="solana"), derive(Debug))]
#[derive(Clone, AnchorSerialize, AnchorDeserialize)]
pub struct FeeStructure {
    pub fee_tiers: [FeeTier;10],
    pub filler_reward_structure: OrderFillerRewardStructure,
    pub referrer_reward_epoch_upper_bound: u64,
    pub flat_filler_fee: u64,
}

#[cfg_attr(not(target_os="solana"), derive(Debug))]
#[derive(Clone, AnchorSerialize, AnchorDeserialize)]
pub struct FeeTier {
    pub fee_numerator: u32,
    pub fee_denominator: u32,
    pub maker_rebate_numerator: u32,
    pub maker_rebate_denominator: u32,
    pub referrer_reward_numerator: u32,
    pub referrer_reward_denominator: u32,
    pub referee_fee_numerator: u32,
    pub referee_fee_denominator: u32,
}

#[cfg_attr(not(target_os="solana"), derive(Debug))]
#[derive(Clone, AnchorSerialize, AnchorDeserialize)]
pub struct OrderFillerRewardStructure {
    pub reward_numerator: u32,
    pub reward_denominator: u32,
    pub time_based_reward_lower_bound: u128,
}

#[cfg_attr(not(target_os="solana"), derive(Debug))]
#[derive(Clone, AnchorSerialize, AnchorDeserialize)]
pub struct UserFees {
    pub total_fee_paid: u64,
    pub total_fee_rebate: u64,
    pub total_token_discount: u64,
    pub total_referee_discount: u64,
    pub total_referrer_reward: u64,
    pub current_epoch_referrer_reward: u64,
}

#[cfg_attr(not(target_os="solana"), derive(Debug))]
#[derive(Clone, AnchorSerialize, AnchorDeserialize)]
pub struct SpotPosition {
    pub scaled_balance: u64,
    pub open_bids: i64,
    pub open_asks: i64,
    pub cumulative_deposits: i64,
    pub market_index: u16,
    pub balance_type: SpotBalanceType,
    pub open_orders: u8,
    pub padding: [u8;4],
}

#[cfg_attr(not(target_os="solana"), derive(Debug))]
#[derive(Clone, AnchorSerialize, AnchorDeserialize)]
pub struct PerpPosition {
    pub last_cumulative_funding_rate: i64,
    pub base_asset_amount: i64,
    pub quote_asset_amount: i64,
    pub quote_break_even_amount: i64,
    pub quote_entry_amount: i64,
    pub open_bids: i64,
    pub open_asks: i64,
    pub settled_pnl: i64,
    pub lp_shares: u64,
    pub last_base_asset_amount_per_lp: i64,
    pub last_quote_asset_amount_per_lp: i64,
    pub remainder_base_asset_amount: i32,
    pub market_index: u16,
    pub open_orders: u8,
    pub per_lp_base: i8,
}

#[cfg_attr(not(target_os="solana"), derive(Debug))]
#[derive(Clone, AnchorSerialize, AnchorDeserialize)]
pub struct Order {
    pub slot: u64,
    pub price: u64,
    pub base_asset_amount: u64,
    pub base_asset_amount_filled: u64,
    pub quote_asset_amount_filled: u64,
    pub trigger_price: u64,
    pub auction_start_price: i64,
    pub auction_end_price: i64,
    pub max_ts: i64,
    pub oracle_price_offset: i32,
    pub order_id: u32,
    pub market_index: u16,
    pub status: OrderStatus,
    pub order_type: OrderType,
    pub market_type: MarketType,
    pub user_order_id: u8,
    pub existing_position_direction: PositionDirection,
    pub direction: PositionDirection,
    pub reduce_only: bool,
    pub post_only: bool,
    pub immediate_or_cancel: bool,
    pub trigger_condition: OrderTriggerCondition,
    pub auction_duration: u8,
    pub padding: [u8;3],
}

#[cfg_attr(not(target_os="solana"), derive(Debug))]
#[derive(Clone, AnchorSerialize, AnchorDeserialize, Copy, PartialEq, Eq)]
pub enum SwapDirection {
    Add,
    Remove
}

#[cfg_attr(not(target_os="solana"), derive(Debug))]
#[derive(Clone, AnchorSerialize, AnchorDeserialize, Copy, PartialEq, Eq)]
pub enum ModifyOrderId {
    UserOrderId,
    OrderId
}

#[cfg_attr(not(target_os="solana"), derive(Debug))]
#[derive(Clone, AnchorSerialize, AnchorDeserialize, Copy, PartialEq, Eq)]
pub enum PositionDirection {
    Long,
    Short
}

#[cfg_attr(not(target_os="solana"), derive(Debug))]
#[derive(Clone, AnchorSerialize, AnchorDeserialize, Copy, PartialEq, Eq)]
pub enum SpotFulfillmentType {
    SerumV3,
    Match,
    PhoenixV1,
    OpenbookV2
}

#[cfg_attr(not(target_os="solana"), derive(Debug))]
#[derive(Clone, AnchorSerialize, AnchorDeserialize, Copy, PartialEq, Eq)]
pub enum SwapReduceOnly {
    In,
    Out
}

#[cfg_attr(not(target_os="solana"), derive(Debug))]
#[derive(Clone, AnchorSerialize, AnchorDeserialize, Copy, PartialEq, Eq)]
pub enum TwapPeriod {
    FundingPeriod,
    FiveMin
}

#[cfg_attr(not(target_os="solana"), derive(Debug))]
#[derive(Clone, AnchorSerialize, AnchorDeserialize, Copy, PartialEq, Eq)]
pub enum LiquidationMultiplierType {
    Discount,
    Premium
}

#[cfg_attr(not(target_os="solana"), derive(Debug))]
#[derive(Clone, AnchorSerialize, AnchorDeserialize, Copy, PartialEq, Eq)]
pub enum MarginRequirementType {
    Initial,
    Fill,
    Maintenance
}

#[cfg_attr(not(target_os="solana"), derive(Debug))]
#[derive(Clone, AnchorSerialize, AnchorDeserialize, Copy, PartialEq, Eq)]
pub enum OracleValidity {
    NonPositive,
    TooVolatile,
    TooUncertain,
    StaleForMargin,
    InsufficientDataPoints,
    StaleForAmm,
    Valid
}

#[cfg_attr(not(target_os="solana"), derive(Debug))]
#[derive(Clone, AnchorSerialize, AnchorDeserialize, Copy, PartialEq, Eq)]
pub enum DriftAction {
    UpdateFunding,
    SettlePnl,
    TriggerOrder,
    FillOrderMatch,
    FillOrderAmm,
    Liquidate,
    MarginCalc,
    UpdateTwap,
    UpdateAmmCurve,
    OracleOrderPrice
}

#[cfg_attr(not(target_os="solana"), derive(Debug))]
#[derive(Clone, AnchorSerialize, AnchorDeserialize, Copy, PartialEq, Eq)]
pub enum PositionUpdateType {
    Open,
    Increase,
    Reduce,
    Close,
    Flip
}

#[cfg_attr(not(target_os="solana"), derive(Debug))]
#[derive(Clone, AnchorSerialize, AnchorDeserialize, Copy, PartialEq, Eq)]
pub enum DepositExplanation {
    None,
    Transfer,
    Borrow,
    RepayBorrow
}

#[cfg_attr(not(target_os="solana"), derive(Debug))]
#[derive(Clone, AnchorSerialize, AnchorDeserialize, Copy, PartialEq, Eq)]
pub enum DepositDirection {
    Deposit,
    Withdraw
}

#[cfg_attr(not(target_os="solana"), derive(Debug))]
#[derive(Clone, AnchorSerialize, AnchorDeserialize, Copy, PartialEq, Eq)]
pub enum OrderAction {
    Place,
    Cancel,
    Fill,
    Trigger,
    Expire
}

#[cfg_attr(not(target_os="solana"), derive(Debug))]
#[derive(Clone, AnchorSerialize, AnchorDeserialize, Copy, PartialEq, Eq)]
pub enum OrderActionExplanation {
    None,
    InsufficientFreeCollateral,
    OraclePriceBreachedLimitPrice,
    MarketOrderFilledToLimitPrice,
    OrderExpired,
    Liquidation,
    OrderFilledWithAmm,
    OrderFilledWithAmmJit,
    OrderFilledWithMatch,
    OrderFilledWithMatchJit,
    MarketExpired,
    RiskingIncreasingOrder,
    ReduceOnlyOrderIncreasedPosition,
    OrderFillWithSerum,
    NoBorrowLiquidity,
    OrderFillWithPhoenix,
    OrderFilledWithAmmJitLpSplit,
    OrderFilledWithLpJit,
    DeriskLp,
    OrderFilledWithOpenbookV2
}

#[cfg_attr(not(target_os="solana"), derive(Debug))]
#[derive(Clone, AnchorSerialize, AnchorDeserialize, Copy, PartialEq, Eq)]
pub enum LPAction {
    AddLiquidity,
    RemoveLiquidity,
    SettleLiquidity,
    RemoveLiquidityDerisk
}

#[cfg_attr(not(target_os="solana"), derive(Debug))]
#[derive(Clone, AnchorSerialize, AnchorDeserialize, Copy, PartialEq, Eq)]
pub enum LiquidationType {
    LiquidatePerp,
    LiquidateSpot,
    LiquidateBorrowForPerpPnl,
    LiquidatePerpPnlForDeposit,
    PerpBankruptcy,
    SpotBankruptcy
}

#[cfg_attr(not(target_os="solana"), derive(Debug))]
#[derive(Clone, AnchorSerialize, AnchorDeserialize, Copy, PartialEq, Eq)]
pub enum SettlePnlExplanation {
    None,
    ExpiredPosition
}

#[cfg_attr(not(target_os="solana"), derive(Debug))]
#[derive(Clone, AnchorSerialize, AnchorDeserialize, Copy, PartialEq, Eq)]
pub enum StakeAction {
    Stake,
    UnstakeRequest,
    UnstakeCancelRequest,
    Unstake,
    UnstakeTransfer,
    StakeTransfer
}

#[cfg_attr(not(target_os="solana"), derive(Debug))]
#[derive(Clone, AnchorSerialize, AnchorDeserialize, Copy, PartialEq, Eq)]
pub enum FillMode {
    Fill,
    PlaceAndMake,
    PlaceAndTake,
    Liquidation
}

#[cfg_attr(not(target_os="solana"), derive(Debug))]
#[derive(Clone, AnchorSerialize, AnchorDeserialize, Copy, PartialEq, Eq)]
pub enum PerpFulfillmentMethod {
    Amm,
    Match
}

#[cfg_attr(not(target_os="solana"), derive(Debug))]
#[derive(Clone, AnchorSerialize, AnchorDeserialize, Copy, PartialEq, Eq)]
pub enum SpotFulfillmentMethod {
    ExternalMarket,
    Match
}

#[cfg_attr(not(target_os="solana"), derive(Debug))]
#[derive(Clone, AnchorSerialize, AnchorDeserialize, Copy, PartialEq, Eq)]
pub enum MarginCalculationMode {
    Standard,
    Liquidation
}

#[cfg_attr(not(target_os="solana"), derive(Debug))]
#[derive(Clone, AnchorSerialize, AnchorDeserialize, Copy, PartialEq, Eq)]
pub enum OracleSource {
    Pyth,
    Switchboard,
    QuoteAsset,
    Pyth1K,
    Pyth1M,
    PythStableCoin,
    Prelaunch,
    PythPull,
    Pyth1KPull,
    Pyth1MPull,
    PythStableCoinPull,
    SwitchboardOnDemand
}

#[cfg_attr(not(target_os="solana"), derive(Debug))]
#[derive(Clone, AnchorSerialize, AnchorDeserialize, Copy, PartialEq, Eq)]
pub enum PostOnlyParam {
    None,
    MustPostOnly,
    TryPostOnly,
    Slide
}

#[cfg_attr(not(target_os="solana"), derive(Debug))]
#[derive(Clone, AnchorSerialize, AnchorDeserialize, Copy, PartialEq, Eq)]
pub enum ModifyOrderPolicy {
    TryModify,
    MustModify
}

#[cfg_attr(not(target_os="solana"), derive(Debug))]
#[derive(Clone, AnchorSerialize, AnchorDeserialize, Copy, PartialEq, Eq)]
pub enum PerpOperation {
    UpdateFunding,
    AmmFill,
    Fill,
    SettlePnl,
    SettlePnlWithPosition,
    Liquidation
}

#[cfg_attr(not(target_os="solana"), derive(Debug))]
#[derive(Clone, AnchorSerialize, AnchorDeserialize, Copy, PartialEq, Eq)]
pub enum SpotOperation {
    UpdateCumulativeInterest,
    Fill,
    Deposit,
    Withdraw,
    Liquidation
}

#[cfg_attr(not(target_os="solana"), derive(Debug))]
#[derive(Clone, AnchorSerialize, AnchorDeserialize, Copy, PartialEq, Eq)]
pub enum InsuranceFundOperation {
    Init,
    Add,
    RequestRemove,
    Remove
}

#[cfg_attr(not(target_os="solana"), derive(Debug))]
#[derive(Clone, AnchorSerialize, AnchorDeserialize, Copy, PartialEq, Eq)]
pub enum MarketStatus {
    Initialized,
    Active,
    FundingPaused,
    AmmPaused,
    FillPaused,
    WithdrawPaused,
    ReduceOnly,
    Settlement,
    Delisted
}

#[cfg_attr(not(target_os="solana"), derive(Debug))]
#[derive(Clone, AnchorSerialize, AnchorDeserialize, Copy, PartialEq, Eq)]
pub enum ContractType {
    Perpetual,
    Future,
    Prediction
}

#[cfg_attr(not(target_os="solana"), derive(Debug))]
#[derive(Clone, AnchorSerialize, AnchorDeserialize, Copy, PartialEq, Eq)]
pub enum ContractTier {
    A,
    B,
    C,
    Speculative,
    HighlySpeculative,
    Isolated
}

#[cfg_attr(not(target_os="solana"), derive(Debug))]
#[derive(Clone, AnchorSerialize, AnchorDeserialize, Copy, PartialEq, Eq)]
pub enum AMMLiquiditySplit {
    ProtocolOwned,
    LpOwned,
    Shared
}

#[cfg_attr(not(target_os="solana"), derive(Debug))]
#[derive(Clone, AnchorSerialize, AnchorDeserialize, Copy, PartialEq, Eq)]
pub enum SettlePnlMode {
    MustSettle,
    TrySettle
}

#[cfg_attr(not(target_os="solana"), derive(Debug))]
#[derive(Clone, AnchorSerialize, AnchorDeserialize, Copy, PartialEq, Eq)]
pub enum SpotBalanceType {
    Deposit,
    Borrow
}

#[cfg_attr(not(target_os="solana"), derive(Debug))]
#[derive(Clone, AnchorSerialize, AnchorDeserialize, Copy, PartialEq, Eq)]
pub enum SpotFulfillmentConfigStatus {
    Enabled,
    Disabled
}

#[cfg_attr(not(target_os="solana"), derive(Debug))]
#[derive(Clone, AnchorSerialize, AnchorDeserialize, Copy, PartialEq, Eq)]
pub enum AssetTier {
    Collateral,
    Protected,
    Cross,
    Isolated,
    Unlisted
}

#[cfg_attr(not(target_os="solana"), derive(Debug))]
#[derive(Clone, AnchorSerialize, AnchorDeserialize, Copy, PartialEq, Eq)]
pub enum ExchangeStatus {
    DepositPaused,
    WithdrawPaused,
    AmmPaused,
    FillPaused,
    LiqPaused,
    FundingPaused,
    SettlePnlPaused
}

#[cfg_attr(not(target_os="solana"), derive(Debug))]
#[derive(Clone, AnchorSerialize, AnchorDeserialize, Copy, PartialEq, Eq)]
pub enum UserStatus {
    BeingLiquidated,
    Bankrupt,
    ReduceOnly,
    AdvancedLp
}

#[cfg_attr(not(target_os="solana"), derive(Debug))]
#[derive(Clone, AnchorSerialize, AnchorDeserialize, Copy, PartialEq, Eq)]
pub enum AssetType {
    Base,
    Quote
}

#[cfg_attr(not(target_os="solana"), derive(Debug))]
#[derive(Clone, AnchorSerialize, AnchorDeserialize, Copy, PartialEq, Eq)]
pub enum OrderStatus {
    Init,
    Open,
    Filled,
    Canceled
}

#[cfg_attr(not(target_os="solana"), derive(Debug))]
#[derive(Clone, AnchorSerialize, AnchorDeserialize, Copy, PartialEq, Eq)]
pub enum OrderType {
    Market,
    Limit,
    TriggerMarket,
    TriggerLimit,
    Oracle
}

#[cfg_attr(not(target_os="solana"), derive(Debug))]
#[derive(Clone, AnchorSerialize, AnchorDeserialize, Copy, PartialEq, Eq)]
pub enum OrderTriggerCondition {
    Above,
    Below,
    TriggeredAbove,
    TriggeredBelow
}

#[cfg_attr(not(target_os="solana"), derive(Debug))]
#[derive(Clone, AnchorSerialize, AnchorDeserialize, Copy, PartialEq, Eq)]
pub enum MarketType {
    Spot,
    Perp
}