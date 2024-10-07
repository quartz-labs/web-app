use anchor_lang::prelude::*;
use anchor_lang::system_program::ID;

#[account(zero_copy(unsafe))]
#[derive(Default, Eq, PartialEq, Debug)]
#[repr(C)]
pub struct User {
    /// The owner/authority of the account
    pub authority: Pubkey,
    /// An addresses that can control the account on the authority's behalf. Has limited power, cant withdraw
    pub delegate: Pubkey,
    /// Encoded display name e.g. "toly"
    pub name: [u8; 32],
    /// The user's spot positions
    pub spot_positions: [SpotPosition; 8],
    /// The user's perp positions
    pub perp_positions: [PerpPosition; 8],
    /// The user's orders
    pub orders: [Order; 32],
    /// The last time the user added perp lp positions
    pub last_add_perp_lp_shares_ts: i64,
    /// The total values of deposits the user has made
    /// precision: QUOTE_PRECISION
    pub total_deposits: u64,
    /// The total values of withdrawals the user has made
    /// precision: QUOTE_PRECISION
    pub total_withdraws: u64,
    /// The total socialized loss the users has incurred upon the protocol
    /// precision: QUOTE_PRECISION
    pub total_social_loss: u64,
    /// Fees (taker fees, maker rebate, referrer reward, filler reward) and pnl for perps
    /// precision: QUOTE_PRECISION
    pub settled_perp_pnl: i64,
    /// Fees (taker fees, maker rebate, filler reward) for spot
    /// precision: QUOTE_PRECISION
    pub cumulative_spot_fees: i64,
    /// Cumulative funding paid/received for perps
    /// precision: QUOTE_PRECISION
    pub cumulative_perp_funding: i64,
    /// The amount of margin freed during liquidation. Used to force the liquidation to occur over a period of time
    /// Defaults to zero when not being liquidated
    /// precision: QUOTE_PRECISION
    pub liquidation_margin_freed: u64,
    /// The last slot a user was active. Used to determine if a user is idle
    pub last_active_slot: u64,
    /// Every user order has an order id. This is the next order id to be used
    pub next_order_id: u32,
    /// Custom max initial margin ratio for the user
    pub max_margin_ratio: u32,
    /// The next liquidation id to be used for user
    pub next_liquidation_id: u16,
    /// The sub account id for this user
    pub sub_account_id: u16,
    /// Whether the user is active, being liquidated or bankrupt
    pub status: u8,
    /// Whether the user has enabled margin trading
    pub is_margin_trading_enabled: bool,
    /// User is idle if they haven't interacted with the protocol in 1 week and they have no orders, perp positions or borrows
    /// Off-chain keeper bots can ignore users that are idle
    pub idle: bool,
    /// number of open orders
    pub open_orders: u8,
    /// Whether or not user has open order
    pub has_open_order: bool,
    /// number of open orders with auction
    pub open_auctions: u8,
    /// Whether or not user has open order with auction
    pub has_open_auction: bool,
    pub padding1: [u8; 5],
    pub last_fuel_bonus_update_ts: u32,
    pub padding: [u8; 12],
}

impl Size for User {
    const SIZE: usize = 4376;
}

pub trait Size {
    const SIZE: usize;
}

#[zero_copy(unsafe)]
#[derive(Default, Eq, PartialEq, Debug)]
#[repr(C)]
pub struct SpotPosition {
    /// The scaled balance of the position. To get the token amount, multiply by the cumulative deposit/borrow
    /// interest of corresponding market.
    /// precision: SPOT_BALANCE_PRECISION
    pub scaled_balance: u64,
    /// How many spot bids the user has open
    /// precision: token mint precision
    pub open_bids: i64,
    /// How many spot asks the user has open
    /// precision: token mint precision
    pub open_asks: i64,
    /// The cumulative deposits/borrows a user has made into a market
    /// precision: token mint precision
    pub cumulative_deposits: i64,
    /// The market index of the corresponding spot market
    pub market_index: u16,
    /// Whether the position is deposit or borrow
    pub balance_type: SpotBalanceType,
    /// Number of open orders
    pub open_orders: u8,
    pub padding: [u8; 4],
}

#[derive(Clone, Copy, AnchorSerialize, AnchorDeserialize, PartialEq, Eq, Debug, Default)]
#[repr(u8)]
pub enum SpotBalanceType {
    #[default]
    Deposit,
    Borrow,
}

#[zero_copy(unsafe)]
#[derive(Default, Debug, Eq, PartialEq)]
#[repr(C)]
pub struct PerpPosition {
    /// The perp market's last cumulative funding rate. Used to calculate the funding payment owed to user
    /// precision: FUNDING_RATE_PRECISION
    pub last_cumulative_funding_rate: i64,
    /// the size of the users perp position
    /// precision: BASE_PRECISION
    pub base_asset_amount: i64,
    /// Used to calculate the users pnl. Upon entry, is equal to base_asset_amount * avg entry price - fees
    /// Updated when the user open/closes position or settles pnl. Includes fees/funding
    /// precision: QUOTE_PRECISION
    pub quote_asset_amount: i64,
    /// The amount of quote the user would need to exit their position at to break even
    /// Updated when the user open/closes position or settles pnl. Includes fees/funding
    /// precision: QUOTE_PRECISION
    pub quote_break_even_amount: i64,
    /// The amount quote the user entered the position with. Equal to base asset amount * avg entry price
    /// Updated when the user open/closes position. Excludes fees/funding
    /// precision: QUOTE_PRECISION
    pub quote_entry_amount: i64,
    /// The amount of open bids the user has in this perp market
    /// precision: BASE_PRECISION
    pub open_bids: i64,
    /// The amount of open asks the user has in this perp market
    /// precision: BASE_PRECISION
    pub open_asks: i64,
    /// The amount of pnl settled in this market since opening the position
    /// precision: QUOTE_PRECISION
    pub settled_pnl: i64,
    /// The number of lp (liquidity provider) shares the user has in this perp market
    /// LP shares allow users to provide liquidity via the AMM
    /// precision: BASE_PRECISION
    pub lp_shares: u64,
    /// The last base asset amount per lp the amm had
    /// Used to settle the users lp position
    /// precision: BASE_PRECISION
    pub last_base_asset_amount_per_lp: i64,
    /// The last quote asset amount per lp the amm had
    /// Used to settle the users lp position
    /// precision: QUOTE_PRECISION
    pub last_quote_asset_amount_per_lp: i64,
    /// Settling LP position can lead to a small amount of base asset being left over smaller than step size
    /// This records that remainder so it can be settled later on
    /// precision: BASE_PRECISION
    pub remainder_base_asset_amount: i32,
    /// The market index for the perp market
    pub market_index: u16,
    /// The number of open orders
    pub open_orders: u8,
    pub per_lp_base: i8,
}

#[repr(C)]
#[derive(AnchorSerialize, AnchorDeserialize, PartialEq, Debug, Eq, Default, Copy, Clone)]
pub struct Order {
    /// The slot the order was placed
    pub slot: u64,
    /// The limit price for the order (can be 0 for market orders)
    /// For orders with an auction, this price isn't used until the auction is complete
    /// precision: PRICE_PRECISION
    pub price: u64,
    /// The size of the order
    /// precision for perps: BASE_PRECISION
    /// precision for spot: token mint precision
    pub base_asset_amount: u64,
    /// The amount of the order filled
    /// precision for perps: BASE_PRECISION
    /// precision for spot: token mint precision
    pub base_asset_amount_filled: u64,
    /// The amount of quote filled for the order
    /// precision: QUOTE_PRECISION
    pub quote_asset_amount_filled: u64,
    /// At what price the order will be triggered. Only relevant for trigger orders
    /// precision: PRICE_PRECISION
    pub trigger_price: u64,
    /// The start price for the auction. Only relevant for market/oracle orders
    /// precision: PRICE_PRECISION
    pub auction_start_price: i64,
    /// The end price for the auction. Only relevant for market/oracle orders
    /// precision: PRICE_PRECISION
    pub auction_end_price: i64,
    /// The time when the order will expire
    pub max_ts: i64,
    /// If set, the order limit price is the oracle price + this offset
    /// precision: PRICE_PRECISION
    pub oracle_price_offset: i32,
    /// The id for the order. Each users has their own order id space
    pub order_id: u32,
    /// The perp/spot market index
    pub market_index: u16,
    /// Whether the order is open or unused
    pub status: OrderStatus,
    /// The type of order
    pub order_type: OrderType,
    /// Whether market is spot or perp
    pub market_type: MarketType,
    /// User generated order id. Can make it easier to place/cancel orders
    pub user_order_id: u8,
    /// What the users position was when the order was placed
    pub existing_position_direction: PositionDirection,
    /// Whether the user is going long or short. LONG = bid, SHORT = ask
    pub direction: PositionDirection,
    /// Whether the order is allowed to only reduce position size
    pub reduce_only: bool,
    /// Whether the order must be a maker
    pub post_only: bool,
    /// Whether the order must be canceled the same slot it is placed
    pub immediate_or_cancel: bool,
    /// Whether the order is triggered above or below the trigger price. Only relevant for trigger orders
    pub trigger_condition: OrderTriggerCondition,
    /// How many slots the auction lasts
    pub auction_duration: u8,
    pub padding: [u8; 3],
}

#[derive(Clone, Copy, AnchorSerialize, AnchorDeserialize, PartialEq, Debug, Eq, Default)]
#[repr(u8)] 
pub enum OrderType {
    Market,
    #[default]
    Limit,
    TriggerMarket,
    TriggerLimit,
    /// Market order where the auction prices are oracle offsets
    Oracle,
}

#[derive(Default, Clone, Copy, AnchorSerialize, AnchorDeserialize, PartialEq, Debug, Eq)]
#[repr(u8)] 
pub enum MarketType {
    #[default]
    Spot,
    Perp,
}

#[derive(Clone, Copy, AnchorSerialize, AnchorDeserialize, PartialEq, Eq, Debug, Default)]
pub enum OrderStatus {
    /// The order is not in use
    #[default]
    Init,
    /// Order is open
    Open,
    /// Order has been filled
    Filled,
    /// Order has been canceled
    Canceled,
}

#[derive(Clone, Copy, AnchorSerialize, AnchorDeserialize, PartialEq, Debug, Eq, Default)]
pub enum PositionDirection {
    #[default]
    Long,
    Short,
}

#[derive(Clone, Copy, AnchorSerialize, AnchorDeserialize, PartialEq, Debug, Eq, Default)]
pub enum OrderTriggerCondition {
    #[default]
    Above,
    Below,
    TriggeredAbove, // above condition has been triggered
    TriggeredBelow, // below condition has been triggered
}

#[account(zero_copy(unsafe))]
#[derive(Eq, PartialEq, Debug)]
#[repr(C)]
#[derive(Default)]
pub struct UserStats {
    /// The authority for all of a users sub accounts
    pub authority: Pubkey,
    /// The address that referred this user
    pub referrer: Pubkey,
    /// Stats on the fees paid by the user
    pub fees: UserFees,

    /// The timestamp of the next epoch
    /// Epoch is used to limit referrer rewards earned in single epoch
    pub next_epoch_ts: i64,

    /// Rolling 30day maker volume for user
    /// precision: QUOTE_PRECISION
    pub maker_volume_30d: u64,
    /// Rolling 30day taker volume for user
    /// precision: QUOTE_PRECISION
    pub taker_volume_30d: u64,
    /// Rolling 30day filler volume for user
    /// precision: QUOTE_PRECISION
    pub filler_volume_30d: u64,
    /// last time the maker volume was updated
    pub last_maker_volume_30d_ts: i64,
    /// last time the taker volume was updated
    pub last_taker_volume_30d_ts: i64,
    /// last time the filler volume was updated
    pub last_filler_volume_30d_ts: i64,

    /// The amount of tokens staked in the quote spot markets if
    pub if_staked_quote_asset_amount: u64,
    /// The current number of sub accounts
    pub number_of_sub_accounts: u16,
    /// The number of sub accounts created. Can be greater than the number of sub accounts if user
    /// has deleted sub accounts
    pub number_of_sub_accounts_created: u16,
    /// Whether the user is a referrer. Sub account 0 can not be deleted if user is a referrer
    pub is_referrer: bool,
    pub disable_update_perp_bid_ask_twap: bool,
    pub padding1: [u8; 2],
    /// accumulated fuel for token amounts of insurance
    pub fuel_insurance: u32,
    /// accumulated fuel for notional of deposits
    pub fuel_deposits: u32,
    /// accumulate fuel bonus for notional of borrows
    pub fuel_borrows: u32,
    /// accumulated fuel for perp open interest
    pub fuel_positions: u32,
    /// accumulate fuel bonus for taker volume
    pub fuel_taker: u32,
    /// accumulate fuel bonus for maker volume
    pub fuel_maker: u32,

    /// The amount of tokens staked in the governance spot markets if
    pub if_staked_gov_token_amount: u64,

    /// last unix ts user stats data was used to update if fuel (u32 to save space)
    pub last_fuel_if_bonus_update_ts: u32,

    pub padding: [u8; 12],
}

impl Size for UserStats {
    const SIZE: usize = 240;
}

#[zero_copy(unsafe)]
#[derive(Default, Eq, PartialEq, Debug)]
#[repr(C)]
pub struct UserFees {
    /// Total taker fee paid
    /// precision: QUOTE_PRECISION
    pub total_fee_paid: u64,
    /// Total maker fee rebate
    /// precision: QUOTE_PRECISION
    pub total_fee_rebate: u64,
    /// Total discount from holding token
    /// precision: QUOTE_PRECISION
    pub total_token_discount: u64,
    /// Total discount from being referred
    /// precision: QUOTE_PRECISION
    pub total_referee_discount: u64,
    /// Total reward to referrer
    /// precision: QUOTE_PRECISION
    pub total_referrer_reward: u64,
    /// Total reward to referrer this epoch
    /// precision: QUOTE_PRECISION
    pub current_epoch_referrer_reward: u64,
}

#[account]
#[derive(Default)]
#[repr(C)]
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
    pub padding: [u8; 10],
}

#[derive(AnchorSerialize, AnchorDeserialize, Clone, Debug)]
pub struct FeeStructure {
    pub fee_tiers: [FeeTier; 10],
    pub filler_reward_structure: OrderFillerRewardStructure,
    pub referrer_reward_epoch_upper_bound: u64,
    pub flat_filler_fee: u64,
}

impl Default for FeeStructure {
    fn default() -> Self {
        FeeStructure::perps_default()
    }
}

impl FeeStructure {
    pub fn perps_default() -> Self {
        let mut fee_tiers = [FeeTier::default(); 10];
        fee_tiers[0] = FeeTier {
            fee_numerator: 100,
            fee_denominator: FEE_DENOMINATOR, // 10 bps
            maker_rebate_numerator: 20,
            maker_rebate_denominator: FEE_DENOMINATOR, // 2bps
            referrer_reward_numerator: 15,
            referrer_reward_denominator: FEE_PERCENTAGE_DENOMINATOR, // 15% of taker fee
            referee_fee_numerator: 5,
            referee_fee_denominator: FEE_PERCENTAGE_DENOMINATOR, // 5%
        };
        fee_tiers[1] = FeeTier {
            fee_numerator: 90,
            fee_denominator: FEE_DENOMINATOR, // 8 bps
            maker_rebate_numerator: 20,
            maker_rebate_denominator: FEE_DENOMINATOR, // 2bps
            referrer_reward_numerator: 15,
            referrer_reward_denominator: FEE_PERCENTAGE_DENOMINATOR, // 15% of taker fee
            referee_fee_numerator: 5,
            referee_fee_denominator: FEE_PERCENTAGE_DENOMINATOR, // 5%
        };
        fee_tiers[2] = FeeTier {
            fee_numerator: 80,
            fee_denominator: FEE_DENOMINATOR, // 6 bps
            maker_rebate_numerator: 20,
            maker_rebate_denominator: FEE_DENOMINATOR, // 2bps
            referrer_reward_numerator: 15,
            referrer_reward_denominator: FEE_PERCENTAGE_DENOMINATOR, // 15% of taker fee
            referee_fee_numerator: 5,
            referee_fee_denominator: FEE_PERCENTAGE_DENOMINATOR, // 5%
        };
        fee_tiers[3] = FeeTier {
            fee_numerator: 70,
            fee_denominator: FEE_DENOMINATOR, // 5 bps
            maker_rebate_numerator: 20,
            maker_rebate_denominator: FEE_DENOMINATOR, // 2bps
            referrer_reward_numerator: 15,
            referrer_reward_denominator: FEE_PERCENTAGE_DENOMINATOR, // 15% of taker fee
            referee_fee_numerator: 5,
            referee_fee_denominator: FEE_PERCENTAGE_DENOMINATOR, // 5%
        };
        fee_tiers[4] = FeeTier {
            fee_numerator: 60,
            fee_denominator: FEE_DENOMINATOR, // 4 bps
            maker_rebate_numerator: 20,
            maker_rebate_denominator: FEE_DENOMINATOR, // 2bps
            referrer_reward_numerator: 15,
            referrer_reward_denominator: FEE_PERCENTAGE_DENOMINATOR, // 15% of taker fee
            referee_fee_numerator: 5,
            referee_fee_denominator: FEE_PERCENTAGE_DENOMINATOR, // 5%
        };
        fee_tiers[5] = FeeTier {
            fee_numerator: 50,
            fee_denominator: FEE_DENOMINATOR, // 3.5 bps
            maker_rebate_numerator: 20,
            maker_rebate_denominator: FEE_DENOMINATOR, // 2bps
            referrer_reward_numerator: 15,
            referrer_reward_denominator: FEE_PERCENTAGE_DENOMINATOR, // 15% of taker fee
            referee_fee_numerator: 5,
            referee_fee_denominator: FEE_PERCENTAGE_DENOMINATOR, // 5%
        };
        FeeStructure {
            fee_tiers,
            filler_reward_structure: OrderFillerRewardStructure {
                reward_numerator: 10,
                reward_denominator: FEE_PERCENTAGE_DENOMINATOR,
                time_based_reward_lower_bound: 10_000, // 1 cent
            },
            flat_filler_fee: 10_000,
            referrer_reward_epoch_upper_bound: MAX_REFERRER_REWARD_EPOCH_UPPER_BOUND,
        }
    }
}

#[derive(AnchorSerialize, AnchorDeserialize, Copy, Clone, Debug)]
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

impl Default for FeeTier {
    fn default() -> Self {
        FeeTier {
            fee_numerator: 0,
            fee_denominator: FEE_DENOMINATOR,
            maker_rebate_numerator: 0,
            maker_rebate_denominator: FEE_DENOMINATOR,
            referrer_reward_numerator: 0,
            referrer_reward_denominator: FEE_PERCENTAGE_DENOMINATOR,
            referee_fee_numerator: 0,
            referee_fee_denominator: FEE_PERCENTAGE_DENOMINATOR,
        }
    }
}

pub const ONE_BPS_DENOMINATOR: u32 = 10000;
pub const FEE_DENOMINATOR: u32 = 10 * ONE_BPS_DENOMINATOR;
pub const FEE_PERCENTAGE_DENOMINATOR: u32 = 100;
pub const MAX_REFERRER_REWARD_EPOCH_UPPER_BOUND: u64 = (4000 * QUOTE_PRECISION) as u64;
pub const QUOTE_PRECISION: u128 = 1_000_000; // expo = -6

#[derive(AnchorSerialize, AnchorDeserialize, Default, Clone, Debug)]
pub struct OrderFillerRewardStructure {
    pub reward_numerator: u32,
    pub reward_denominator: u32,
    pub time_based_reward_lower_bound: u128, // minimum filler reward for time-based reward
}

#[derive(Copy, AnchorSerialize, AnchorDeserialize, Clone, Debug)]
pub struct OracleGuardRails {
    pub price_divergence: PriceDivergenceGuardRails,
    pub validity: ValidityGuardRails,
}

impl Default for OracleGuardRails {
    fn default() -> Self {
        OracleGuardRails {
            price_divergence: PriceDivergenceGuardRails::default(),
            validity: ValidityGuardRails {
                slots_before_stale_for_amm: 10,       // ~5 seconds
                slots_before_stale_for_margin: 120,   // ~60 seconds
                confidence_interval_max_size: 20_000, // 2% of price
                too_volatile_ratio: 5,                // 5x or 80% down
            },
        }
    }
}

#[derive(Copy, AnchorSerialize, AnchorDeserialize, Clone, Debug)]
pub struct PriceDivergenceGuardRails {
    pub mark_oracle_percent_divergence: u64,
    pub oracle_twap_5min_percent_divergence: u64,
}

impl Default for PriceDivergenceGuardRails {
    fn default() -> Self {
        PriceDivergenceGuardRails {
            mark_oracle_percent_divergence: PERCENTAGE_PRECISION_U64 / 10,
            oracle_twap_5min_percent_divergence: PERCENTAGE_PRECISION_U64 / 2,
        }
    }
}

pub const PERCENTAGE_PRECISION_U64: u64 = PERCENTAGE_PRECISION as u64;
pub const PERCENTAGE_PRECISION: u128 = 1_000_000;

#[derive(Copy, AnchorSerialize, AnchorDeserialize, Clone, Default, Debug)]
pub struct ValidityGuardRails {
    pub slots_before_stale_for_amm: i64,
    pub slots_before_stale_for_margin: i64,
    pub confidence_interval_max_size: u64,
    pub too_volatile_ratio: i64,
}
