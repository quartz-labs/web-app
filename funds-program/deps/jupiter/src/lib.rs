use anchor_lang::prelude::*;

declare_id!("JUP6LkbZbjS1jKKwapdHNy74zcZ3tLUZoi5QNyVTaV4");

// I11n
pub mod i11n {
    use anchor_lang::prelude::*;
    use anchor_i11n::prelude::*;
    use super::{instructions::*, ID};

    // Route
    #[derive(TryFromInstruction)]
    pub struct RouteI11n<'info> {
        pub accounts: RouteAccountMetas<'info>,
        pub args: Route,
        pub remaining_accounts: Vec<&'info AccountMeta>,
    }

    // RouteWithTokenLedger
    #[derive(TryFromInstruction)]
    pub struct RouteWithTokenLedgerI11n<'info> {
        pub accounts: RouteWithTokenLedgerAccountMetas<'info>,
        pub args: RouteWithTokenLedger,
        pub remaining_accounts: Vec<&'info AccountMeta>,
    }

    // ExactOutRoute
    #[derive(TryFromInstruction)]
    pub struct ExactOutRouteI11n<'info> {
        pub accounts: ExactOutRouteAccountMetas<'info>,
        pub args: ExactOutRoute,
        pub remaining_accounts: Vec<&'info AccountMeta>,
    }

    // SharedAccountsRoute
    #[derive(TryFromInstruction)]
    pub struct SharedAccountsRouteI11n<'info> {
        pub accounts: SharedAccountsRouteAccountMetas<'info>,
        pub args: SharedAccountsRoute,
        pub remaining_accounts: Vec<&'info AccountMeta>,
    }

    // SharedAccountsRouteWithTokenLedger
    #[derive(TryFromInstruction)]
    pub struct SharedAccountsRouteWithTokenLedgerI11n<'info> {
        pub accounts: SharedAccountsRouteWithTokenLedgerAccountMetas<'info>,
        pub args: SharedAccountsRouteWithTokenLedger,
        pub remaining_accounts: Vec<&'info AccountMeta>,
    }

    // SharedAccountsExactOutRoute
    #[derive(TryFromInstruction)]
    pub struct SharedAccountsExactOutRouteI11n<'info> {
        pub accounts: SharedAccountsExactOutRouteAccountMetas<'info>,
        pub args: SharedAccountsExactOutRoute,
        pub remaining_accounts: Vec<&'info AccountMeta>,
    }

    // SetTokenLedger
    #[derive(TryFromInstruction)]
    pub struct SetTokenLedgerI11n<'info> {
        pub accounts: SetTokenLedgerAccountMetas<'info>,
        pub args: SetTokenLedger,
        pub remaining_accounts: Vec<&'info AccountMeta>,
    }

    // CreateOpenOrders
    #[derive(TryFromInstruction)]
    pub struct CreateOpenOrdersI11n<'info> {
        pub accounts: CreateOpenOrdersAccountMetas<'info>,
        pub args: CreateOpenOrders,
        pub remaining_accounts: Vec<&'info AccountMeta>,
    }

    // CreateTokenAccount
    #[derive(TryFromInstruction)]
    pub struct CreateTokenAccountI11n<'info> {
        pub accounts: CreateTokenAccountAccountMetas<'info>,
        pub args: CreateTokenAccount,
        pub remaining_accounts: Vec<&'info AccountMeta>,
    }

    // CreateProgramOpenOrders
    #[derive(TryFromInstruction)]
    pub struct CreateProgramOpenOrdersI11n<'info> {
        pub accounts: CreateProgramOpenOrdersAccountMetas<'info>,
        pub args: CreateProgramOpenOrders,
        pub remaining_accounts: Vec<&'info AccountMeta>,
    }

    // Claim
    #[derive(TryFromInstruction)]
    pub struct ClaimI11n<'info> {
        pub accounts: ClaimAccountMetas<'info>,
        pub args: Claim,
        pub remaining_accounts: Vec<&'info AccountMeta>,
    }

    // ClaimToken
    #[derive(TryFromInstruction)]
    pub struct ClaimTokenI11n<'info> {
        pub accounts: ClaimTokenAccountMetas<'info>,
        pub args: ClaimToken,
        pub remaining_accounts: Vec<&'info AccountMeta>,
    }

    // CreateTokenLedger
    #[derive(TryFromInstruction)]
    pub struct CreateTokenLedgerI11n<'info> {
        pub accounts: CreateTokenLedgerAccountMetas<'info>,
        pub args: CreateTokenLedger,
        pub remaining_accounts: Vec<&'info AccountMeta>,
    }

    // MercurialSwap
    #[derive(TryFromInstruction)]
    pub struct MercurialSwapI11n<'info> {
        pub accounts: MercurialSwapAccountMetas<'info>,
        pub args: MercurialSwap,
        pub remaining_accounts: Vec<&'info AccountMeta>,
    }

    // CykuraSwap
    #[derive(TryFromInstruction)]
    pub struct CykuraSwapI11n<'info> {
        pub accounts: CykuraSwapAccountMetas<'info>,
        pub args: CykuraSwap,
        pub remaining_accounts: Vec<&'info AccountMeta>,
    }

    // SerumSwap
    #[derive(TryFromInstruction)]
    pub struct SerumSwapI11n<'info> {
        pub accounts: SerumSwapAccountMetas<'info>,
        pub args: SerumSwap,
        pub remaining_accounts: Vec<&'info AccountMeta>,
    }

    // SaberSwap
    #[derive(TryFromInstruction)]
    pub struct SaberSwapI11n<'info> {
        pub accounts: SaberSwapAccountMetas<'info>,
        pub args: SaberSwap,
        pub remaining_accounts: Vec<&'info AccountMeta>,
    }

    // SaberAddDecimals
    #[derive(TryFromInstruction)]
    pub struct SaberAddDecimalsI11n<'info> {
        pub accounts: SaberAddDecimalsAccountMetas<'info>,
        pub args: SaberAddDecimals,
        pub remaining_accounts: Vec<&'info AccountMeta>,
    }

    // TokenSwap
    #[derive(TryFromInstruction)]
    pub struct TokenSwapI11n<'info> {
        pub accounts: TokenSwapAccountMetas<'info>,
        pub args: TokenSwap,
        pub remaining_accounts: Vec<&'info AccountMeta>,
    }

    // TokenSwapV2
    #[derive(TryFromInstruction)]
    pub struct TokenSwapV2I11n<'info> {
        pub accounts: TokenSwapV2AccountMetas<'info>,
        pub args: TokenSwapV2,
        pub remaining_accounts: Vec<&'info AccountMeta>,
    }

    // SenchaSwap
    #[derive(TryFromInstruction)]
    pub struct SenchaSwapI11n<'info> {
        pub accounts: SenchaSwapAccountMetas<'info>,
        pub args: SenchaSwap,
        pub remaining_accounts: Vec<&'info AccountMeta>,
    }

    // StepSwap
    #[derive(TryFromInstruction)]
    pub struct StepSwapI11n<'info> {
        pub accounts: StepSwapAccountMetas<'info>,
        pub args: StepSwap,
        pub remaining_accounts: Vec<&'info AccountMeta>,
    }

    // CropperSwap
    #[derive(TryFromInstruction)]
    pub struct CropperSwapI11n<'info> {
        pub accounts: CropperSwapAccountMetas<'info>,
        pub args: CropperSwap,
        pub remaining_accounts: Vec<&'info AccountMeta>,
    }

    // RaydiumSwap
    #[derive(TryFromInstruction)]
    pub struct RaydiumSwapI11n<'info> {
        pub accounts: RaydiumSwapAccountMetas<'info>,
        pub args: RaydiumSwap,
        pub remaining_accounts: Vec<&'info AccountMeta>,
    }

    // CremaSwap
    #[derive(TryFromInstruction)]
    pub struct CremaSwapI11n<'info> {
        pub accounts: CremaSwapAccountMetas<'info>,
        pub args: CremaSwap,
        pub remaining_accounts: Vec<&'info AccountMeta>,
    }

    // LifinitySwap
    #[derive(TryFromInstruction)]
    pub struct LifinitySwapI11n<'info> {
        pub accounts: LifinitySwapAccountMetas<'info>,
        pub args: LifinitySwap,
        pub remaining_accounts: Vec<&'info AccountMeta>,
    }

    // MarinadeDeposit
    #[derive(TryFromInstruction)]
    pub struct MarinadeDepositI11n<'info> {
        pub accounts: MarinadeDepositAccountMetas<'info>,
        pub args: MarinadeDeposit,
        pub remaining_accounts: Vec<&'info AccountMeta>,
    }

    // MarinadeUnstake
    #[derive(TryFromInstruction)]
    pub struct MarinadeUnstakeI11n<'info> {
        pub accounts: MarinadeUnstakeAccountMetas<'info>,
        pub args: MarinadeUnstake,
        pub remaining_accounts: Vec<&'info AccountMeta>,
    }

    // AldrinSwap
    #[derive(TryFromInstruction)]
    pub struct AldrinSwapI11n<'info> {
        pub accounts: AldrinSwapAccountMetas<'info>,
        pub args: AldrinSwap,
        pub remaining_accounts: Vec<&'info AccountMeta>,
    }

    // AldrinV2Swap
    #[derive(TryFromInstruction)]
    pub struct AldrinV2SwapI11n<'info> {
        pub accounts: AldrinV2SwapAccountMetas<'info>,
        pub args: AldrinV2Swap,
        pub remaining_accounts: Vec<&'info AccountMeta>,
    }

    // WhirlpoolSwap
    #[derive(TryFromInstruction)]
    pub struct WhirlpoolSwapI11n<'info> {
        pub accounts: WhirlpoolSwapAccountMetas<'info>,
        pub args: WhirlpoolSwap,
        pub remaining_accounts: Vec<&'info AccountMeta>,
    }

    // WhirlpoolSwapV2
    #[derive(TryFromInstruction)]
    pub struct WhirlpoolSwapV2I11n<'info> {
        pub accounts: WhirlpoolSwapV2AccountMetas<'info>,
        pub args: WhirlpoolSwapV2,
        pub remaining_accounts: Vec<&'info AccountMeta>,
    }

    // InvariantSwap
    #[derive(TryFromInstruction)]
    pub struct InvariantSwapI11n<'info> {
        pub accounts: InvariantSwapAccountMetas<'info>,
        pub args: InvariantSwap,
        pub remaining_accounts: Vec<&'info AccountMeta>,
    }

    // MeteoraSwap
    #[derive(TryFromInstruction)]
    pub struct MeteoraSwapI11n<'info> {
        pub accounts: MeteoraSwapAccountMetas<'info>,
        pub args: MeteoraSwap,
        pub remaining_accounts: Vec<&'info AccountMeta>,
    }

    // GoosefxSwap
    #[derive(TryFromInstruction)]
    pub struct GoosefxSwapI11n<'info> {
        pub accounts: GoosefxSwapAccountMetas<'info>,
        pub args: GoosefxSwap,
        pub remaining_accounts: Vec<&'info AccountMeta>,
    }

    // DeltafiSwap
    #[derive(TryFromInstruction)]
    pub struct DeltafiSwapI11n<'info> {
        pub accounts: DeltafiSwapAccountMetas<'info>,
        pub args: DeltafiSwap,
        pub remaining_accounts: Vec<&'info AccountMeta>,
    }

    // BalansolSwap
    #[derive(TryFromInstruction)]
    pub struct BalansolSwapI11n<'info> {
        pub accounts: BalansolSwapAccountMetas<'info>,
        pub args: BalansolSwap,
        pub remaining_accounts: Vec<&'info AccountMeta>,
    }

    // MarcoPoloSwap
    #[derive(TryFromInstruction)]
    pub struct MarcoPoloSwapI11n<'info> {
        pub accounts: MarcoPoloSwapAccountMetas<'info>,
        pub args: MarcoPoloSwap,
        pub remaining_accounts: Vec<&'info AccountMeta>,
    }

    // DradexSwap
    #[derive(TryFromInstruction)]
    pub struct DradexSwapI11n<'info> {
        pub accounts: DradexSwapAccountMetas<'info>,
        pub args: DradexSwap,
        pub remaining_accounts: Vec<&'info AccountMeta>,
    }

    // LifinityV2Swap
    #[derive(TryFromInstruction)]
    pub struct LifinityV2SwapI11n<'info> {
        pub accounts: LifinityV2SwapAccountMetas<'info>,
        pub args: LifinityV2Swap,
        pub remaining_accounts: Vec<&'info AccountMeta>,
    }

    // RaydiumClmmSwap
    #[derive(TryFromInstruction)]
    pub struct RaydiumClmmSwapI11n<'info> {
        pub accounts: RaydiumClmmSwapAccountMetas<'info>,
        pub args: RaydiumClmmSwap,
        pub remaining_accounts: Vec<&'info AccountMeta>,
    }

    // RaydiumClmmSwapV2
    #[derive(TryFromInstruction)]
    pub struct RaydiumClmmSwapV2I11n<'info> {
        pub accounts: RaydiumClmmSwapV2AccountMetas<'info>,
        pub args: RaydiumClmmSwapV2,
        pub remaining_accounts: Vec<&'info AccountMeta>,
    }

    // PhoenixSwap
    #[derive(TryFromInstruction)]
    pub struct PhoenixSwapI11n<'info> {
        pub accounts: PhoenixSwapAccountMetas<'info>,
        pub args: PhoenixSwap,
        pub remaining_accounts: Vec<&'info AccountMeta>,
    }

    // SymmetrySwap
    #[derive(TryFromInstruction)]
    pub struct SymmetrySwapI11n<'info> {
        pub accounts: SymmetrySwapAccountMetas<'info>,
        pub args: SymmetrySwap,
        pub remaining_accounts: Vec<&'info AccountMeta>,
    }

    // HeliumTreasuryManagementRedeemV0
    #[derive(TryFromInstruction)]
    pub struct HeliumTreasuryManagementRedeemV0I11n<'info> {
        pub accounts: HeliumTreasuryManagementRedeemV0AccountMetas<'info>,
        pub args: HeliumTreasuryManagementRedeemV0,
        pub remaining_accounts: Vec<&'info AccountMeta>,
    }

    // GoosefxV2Swap
    #[derive(TryFromInstruction)]
    pub struct GoosefxV2SwapI11n<'info> {
        pub accounts: GoosefxV2SwapAccountMetas<'info>,
        pub args: GoosefxV2Swap,
        pub remaining_accounts: Vec<&'info AccountMeta>,
    }

    // PerpsSwap
    #[derive(TryFromInstruction)]
    pub struct PerpsSwapI11n<'info> {
        pub accounts: PerpsSwapAccountMetas<'info>,
        pub args: PerpsSwap,
        pub remaining_accounts: Vec<&'info AccountMeta>,
    }

    // PerpsAddLiquidity
    #[derive(TryFromInstruction)]
    pub struct PerpsAddLiquidityI11n<'info> {
        pub accounts: PerpsAddLiquidityAccountMetas<'info>,
        pub args: PerpsAddLiquidity,
        pub remaining_accounts: Vec<&'info AccountMeta>,
    }

    // PerpsRemoveLiquidity
    #[derive(TryFromInstruction)]
    pub struct PerpsRemoveLiquidityI11n<'info> {
        pub accounts: PerpsRemoveLiquidityAccountMetas<'info>,
        pub args: PerpsRemoveLiquidity,
        pub remaining_accounts: Vec<&'info AccountMeta>,
    }

    // MeteoraDlmmSwap
    #[derive(TryFromInstruction)]
    pub struct MeteoraDlmmSwapI11n<'info> {
        pub accounts: MeteoraDlmmSwapAccountMetas<'info>,
        pub args: MeteoraDlmmSwap,
        pub remaining_accounts: Vec<&'info AccountMeta>,
    }

    // OpenBookV2Swap
    #[derive(TryFromInstruction)]
    pub struct OpenBookV2SwapI11n<'info> {
        pub accounts: OpenBookV2SwapAccountMetas<'info>,
        pub args: OpenBookV2Swap,
        pub remaining_accounts: Vec<&'info AccountMeta>,
    }

    // CloneSwap
    #[derive(TryFromInstruction)]
    pub struct CloneSwapI11n<'info> {
        pub accounts: CloneSwapAccountMetas<'info>,
        pub args: CloneSwap,
        pub remaining_accounts: Vec<&'info AccountMeta>,
    }

    // RaydiumCpSwap
    #[derive(TryFromInstruction)]
    pub struct RaydiumCpSwapI11n<'info> {
        pub accounts: RaydiumCpSwapAccountMetas<'info>,
        pub args: RaydiumCpSwap,
        pub remaining_accounts: Vec<&'info AccountMeta>,
    }

    // OneIntroSwap
    #[derive(TryFromInstruction)]
    pub struct OneIntroSwapI11n<'info> {
        pub accounts: OneIntroSwapAccountMetas<'info>,
        pub args: OneIntroSwap,
        pub remaining_accounts: Vec<&'info AccountMeta>,
    }

    // PumpdotfunWrappedBuy
    #[derive(TryFromInstruction)]
    pub struct PumpdotfunWrappedBuyI11n<'info> {
        pub accounts: PumpdotfunWrappedBuyAccountMetas<'info>,
        pub args: PumpdotfunWrappedBuy,
        pub remaining_accounts: Vec<&'info AccountMeta>,
    }

    // PumpdotfunWrappedSell
    #[derive(TryFromInstruction)]
    pub struct PumpdotfunWrappedSellI11n<'info> {
        pub accounts: PumpdotfunWrappedSellAccountMetas<'info>,
        pub args: PumpdotfunWrappedSell,
        pub remaining_accounts: Vec<&'info AccountMeta>,
    }

    // PerpsV2Swap
    #[derive(TryFromInstruction)]
    pub struct PerpsV2SwapI11n<'info> {
        pub accounts: PerpsV2SwapAccountMetas<'info>,
        pub args: PerpsV2Swap,
        pub remaining_accounts: Vec<&'info AccountMeta>,
    }

    // PerpsV2AddLiquidity
    #[derive(TryFromInstruction)]
    pub struct PerpsV2AddLiquidityI11n<'info> {
        pub accounts: PerpsV2AddLiquidityAccountMetas<'info>,
        pub args: PerpsV2AddLiquidity,
        pub remaining_accounts: Vec<&'info AccountMeta>,
    }

    // PerpsV2RemoveLiquidity
    #[derive(TryFromInstruction)]
    pub struct PerpsV2RemoveLiquidityI11n<'info> {
        pub accounts: PerpsV2RemoveLiquidityAccountMetas<'info>,
        pub args: PerpsV2RemoveLiquidity,
        pub remaining_accounts: Vec<&'info AccountMeta>,
    }

    // MoonshotWrappedBuy
    #[derive(TryFromInstruction)]
    pub struct MoonshotWrappedBuyI11n<'info> {
        pub accounts: MoonshotWrappedBuyAccountMetas<'info>,
        pub args: MoonshotWrappedBuy,
        pub remaining_accounts: Vec<&'info AccountMeta>,
    }

    // MoonshotWrappedSell
    #[derive(TryFromInstruction)]
    pub struct MoonshotWrappedSellI11n<'info> {
        pub accounts: MoonshotWrappedSellAccountMetas<'info>,
        pub args: MoonshotWrappedSell,
        pub remaining_accounts: Vec<&'info AccountMeta>,
    }

    // StabbleStableSwap
    #[derive(TryFromInstruction)]
    pub struct StabbleStableSwapI11n<'info> {
        pub accounts: StabbleStableSwapAccountMetas<'info>,
        pub args: StabbleStableSwap,
        pub remaining_accounts: Vec<&'info AccountMeta>,
    }

    // StabbleWeightedSwap
    #[derive(TryFromInstruction)]
    pub struct StabbleWeightedSwapI11n<'info> {
        pub accounts: StabbleWeightedSwapAccountMetas<'info>,
        pub args: StabbleWeightedSwap,
        pub remaining_accounts: Vec<&'info AccountMeta>,
    }

    // ObricSwap
    #[derive(TryFromInstruction)]
    pub struct ObricSwapI11n<'info> {
        pub accounts: ObricSwapAccountMetas<'info>,
        pub args: ObricSwap,
        pub remaining_accounts: Vec<&'info AccountMeta>,
    }

    // FoxBuyFromEstimatedCost
    #[derive(TryFromInstruction)]
    pub struct FoxBuyFromEstimatedCostI11n<'info> {
        pub accounts: FoxBuyFromEstimatedCostAccountMetas<'info>,
        pub args: FoxBuyFromEstimatedCost,
        pub remaining_accounts: Vec<&'info AccountMeta>,
    }

    // FoxClaimPartial
    #[derive(TryFromInstruction)]
    pub struct FoxClaimPartialI11n<'info> {
        pub accounts: FoxClaimPartialAccountMetas<'info>,
        pub args: FoxClaimPartial,
        pub remaining_accounts: Vec<&'info AccountMeta>,
    }

    // SolFiSwap
    #[derive(TryFromInstruction)]
    pub struct SolFiSwapI11n<'info> {
        pub accounts: SolFiSwapAccountMetas<'info>,
        pub args: SolFiSwap,
        pub remaining_accounts: Vec<&'info AccountMeta>,
    }

    //Accounts
    #[derive(TryFromAccountMetas)]
    pub struct RouteAccountMetas<'info> {
        pub token_program: &'info AccountMeta,
        pub user_transfer_authority: &'info AccountMeta,
        pub user_source_token_account: &'info AccountMeta,
        pub user_destination_token_account: &'info AccountMeta,
        pub destination_token_account: Option<&'info AccountMeta>,
        pub destination_mint: &'info AccountMeta,
        pub platform_fee_account: Option<&'info AccountMeta>,
        pub event_authority: &'info AccountMeta,
        pub program: &'info AccountMeta,
    }

    #[derive(TryFromAccountMetas)]
    pub struct RouteWithTokenLedgerAccountMetas<'info> {
        pub token_program: &'info AccountMeta,
        pub user_transfer_authority: &'info AccountMeta,
        pub user_source_token_account: &'info AccountMeta,
        pub user_destination_token_account: &'info AccountMeta,
        pub destination_token_account: Option<&'info AccountMeta>,
        pub destination_mint: &'info AccountMeta,
        pub platform_fee_account: Option<&'info AccountMeta>,
        pub token_ledger: &'info AccountMeta,
        pub event_authority: &'info AccountMeta,
        pub program: &'info AccountMeta,
    }

    #[derive(TryFromAccountMetas)]
    pub struct ExactOutRouteAccountMetas<'info> {
        pub token_program: &'info AccountMeta,
        pub user_transfer_authority: &'info AccountMeta,
        pub user_source_token_account: &'info AccountMeta,
        pub user_destination_token_account: &'info AccountMeta,
        pub destination_token_account: Option<&'info AccountMeta>,
        pub source_mint: &'info AccountMeta,
        pub destination_mint: &'info AccountMeta,
        pub platform_fee_account: Option<&'info AccountMeta>,
        pub token_2022_program: Option<&'info AccountMeta>,
        pub event_authority: &'info AccountMeta,
        pub program: &'info AccountMeta,
    }

    #[derive(TryFromAccountMetas)]
    pub struct SharedAccountsRouteAccountMetas<'info> {
        pub token_program: &'info AccountMeta,
        pub program_authority: &'info AccountMeta,
        pub user_transfer_authority: &'info AccountMeta,
        pub source_token_account: &'info AccountMeta,
        pub program_source_token_account: &'info AccountMeta,
        pub program_destination_token_account: &'info AccountMeta,
        pub destination_token_account: &'info AccountMeta,
        pub source_mint: &'info AccountMeta,
        pub destination_mint: &'info AccountMeta,
        pub platform_fee_account: Option<&'info AccountMeta>,
        pub token_2022_program: Option<&'info AccountMeta>,
        pub event_authority: &'info AccountMeta,
        pub program: &'info AccountMeta,
    }

    #[derive(TryFromAccountMetas)]
    pub struct SharedAccountsRouteWithTokenLedgerAccountMetas<'info> {
        pub token_program: &'info AccountMeta,
        pub program_authority: &'info AccountMeta,
        pub user_transfer_authority: &'info AccountMeta,
        pub source_token_account: &'info AccountMeta,
        pub program_source_token_account: &'info AccountMeta,
        pub program_destination_token_account: &'info AccountMeta,
        pub destination_token_account: &'info AccountMeta,
        pub source_mint: &'info AccountMeta,
        pub destination_mint: &'info AccountMeta,
        pub platform_fee_account: Option<&'info AccountMeta>,
        pub token_2022_program: Option<&'info AccountMeta>,
        pub token_ledger: &'info AccountMeta,
        pub event_authority: &'info AccountMeta,
        pub program: &'info AccountMeta,
    }

    #[derive(TryFromAccountMetas)]
    pub struct SharedAccountsExactOutRouteAccountMetas<'info> {
        pub token_program: &'info AccountMeta,
        pub program_authority: &'info AccountMeta,
        pub user_transfer_authority: &'info AccountMeta,
        pub source_token_account: &'info AccountMeta,
        pub program_source_token_account: &'info AccountMeta,
        pub program_destination_token_account: &'info AccountMeta,
        pub destination_token_account: &'info AccountMeta,
        pub source_mint: &'info AccountMeta,
        pub destination_mint: &'info AccountMeta,
        pub platform_fee_account: Option<&'info AccountMeta>,
        pub token_2022_program: Option<&'info AccountMeta>,
        pub event_authority: &'info AccountMeta,
        pub program: &'info AccountMeta,
    }

    #[derive(TryFromAccountMetas)]
    pub struct SetTokenLedgerAccountMetas<'info> {
        pub token_ledger: &'info AccountMeta,
        pub token_account: &'info AccountMeta,
    }

    #[derive(TryFromAccountMetas)]
    pub struct CreateOpenOrdersAccountMetas<'info> {
        pub open_orders: &'info AccountMeta,
        pub payer: &'info AccountMeta,
        pub dex_program: &'info AccountMeta,
        pub system_program: &'info AccountMeta,
        pub rent: &'info AccountMeta,
        pub market: &'info AccountMeta,
    }

    #[derive(TryFromAccountMetas)]
    pub struct CreateTokenAccountAccountMetas<'info> {
        pub token_account: &'info AccountMeta,
        pub user: &'info AccountMeta,
        pub mint: &'info AccountMeta,
        pub token_program: &'info AccountMeta,
        pub system_program: &'info AccountMeta,
    }

    #[derive(TryFromAccountMetas)]
    pub struct CreateProgramOpenOrdersAccountMetas<'info> {
        pub open_orders: &'info AccountMeta,
        pub payer: &'info AccountMeta,
        pub program_authority: &'info AccountMeta,
        pub dex_program: &'info AccountMeta,
        pub system_program: &'info AccountMeta,
        pub rent: &'info AccountMeta,
        pub market: &'info AccountMeta,
    }

    #[derive(TryFromAccountMetas)]
    pub struct ClaimAccountMetas<'info> {
        pub wallet: &'info AccountMeta,
        pub program_authority: &'info AccountMeta,
        pub system_program: &'info AccountMeta,
    }

    #[derive(TryFromAccountMetas)]
    pub struct ClaimTokenAccountMetas<'info> {
        pub payer: &'info AccountMeta,
        pub wallet: &'info AccountMeta,
        pub program_authority: &'info AccountMeta,
        pub program_token_account: &'info AccountMeta,
        pub destination_token_account: &'info AccountMeta,
        pub mint: &'info AccountMeta,
        pub associated_token_token_program: &'info AccountMeta,
        pub associated_token_program: &'info AccountMeta,
        pub system_program: &'info AccountMeta,
    }

    #[derive(TryFromAccountMetas)]
    pub struct CreateTokenLedgerAccountMetas<'info> {
        pub token_ledger: &'info AccountMeta,
        pub payer: &'info AccountMeta,
        pub system_program: &'info AccountMeta,
    }

    #[derive(TryFromAccountMetas)]
    pub struct MercurialSwapAccountMetas<'info> {
        pub swap_program: &'info AccountMeta,
        pub swap_state: &'info AccountMeta,
        pub token_program: &'info AccountMeta,
        pub pool_authority: &'info AccountMeta,
        pub user_transfer_authority: &'info AccountMeta,
        pub source_token_account: &'info AccountMeta,
        pub destination_token_account: &'info AccountMeta,
    }

    #[derive(TryFromAccountMetas)]
    pub struct CykuraSwapAccountMetas<'info> {
        pub swap_program: &'info AccountMeta,
        pub signer: &'info AccountMeta,
        pub factory_state: &'info AccountMeta,
        pub pool_state: &'info AccountMeta,
        pub input_token_account: &'info AccountMeta,
        pub output_token_account: &'info AccountMeta,
        pub input_vault: &'info AccountMeta,
        pub output_vault: &'info AccountMeta,
        pub last_observation_state: &'info AccountMeta,
        pub core_program: &'info AccountMeta,
        pub token_program: &'info AccountMeta,
    }

    #[derive(TryFromAccountMetas)]
    pub struct SerumSwapAccountMetas<'info> {
        pub market: &'info AccountMeta,
        pub authority: &'info AccountMeta,
        pub order_payer_token_account: &'info AccountMeta,
        pub coin_wallet: &'info AccountMeta,
        pub pc_wallet: &'info AccountMeta,
        pub dex_program: &'info AccountMeta,
        pub token_program: &'info AccountMeta,
        pub rent: &'info AccountMeta,
    }

    #[derive(TryFromAccountMetas)]
    pub struct SaberSwapAccountMetas<'info> {
        pub swap_program: &'info AccountMeta,
        pub token_program: &'info AccountMeta,
        pub swap: &'info AccountMeta,
        pub swap_authority: &'info AccountMeta,
        pub user_authority: &'info AccountMeta,
        pub input_user_account: &'info AccountMeta,
        pub input_token_account: &'info AccountMeta,
        pub output_user_account: &'info AccountMeta,
        pub output_token_account: &'info AccountMeta,
        pub fees_token_account: &'info AccountMeta,
    }

    #[derive(TryFromAccountMetas)]
    pub struct SaberAddDecimalsAccountMetas<'info> {
        pub add_decimals_program: &'info AccountMeta,
        pub wrapper: &'info AccountMeta,
        pub wrapper_mint: &'info AccountMeta,
        pub wrapper_underlying_tokens: &'info AccountMeta,
        pub owner: &'info AccountMeta,
        pub user_underlying_tokens: &'info AccountMeta,
        pub user_wrapped_tokens: &'info AccountMeta,
        pub token_program: &'info AccountMeta,
    }

    #[derive(TryFromAccountMetas)]
    pub struct TokenSwapAccountMetas<'info> {
        pub token_swap_program: &'info AccountMeta,
        pub token_program: &'info AccountMeta,
        pub swap: &'info AccountMeta,
        pub authority: &'info AccountMeta,
        pub user_transfer_authority: &'info AccountMeta,
        pub source: &'info AccountMeta,
        pub swap_source: &'info AccountMeta,
        pub swap_destination: &'info AccountMeta,
        pub destination: &'info AccountMeta,
        pub pool_mint: &'info AccountMeta,
        pub pool_fee: &'info AccountMeta,
    }

    #[derive(TryFromAccountMetas)]
    pub struct TokenSwapV2AccountMetas<'info> {
        pub swap_program: &'info AccountMeta,
        pub swap: &'info AccountMeta,
        pub authority: &'info AccountMeta,
        pub user_transfer_authority: &'info AccountMeta,
        pub source: &'info AccountMeta,
        pub swap_source: &'info AccountMeta,
        pub swap_destination: &'info AccountMeta,
        pub destination: &'info AccountMeta,
        pub pool_mint: &'info AccountMeta,
        pub pool_fee: &'info AccountMeta,
        pub source_mint: &'info AccountMeta,
        pub destination_mint: &'info AccountMeta,
        pub source_token_program: &'info AccountMeta,
        pub destination_token_program: &'info AccountMeta,
        pub pool_token_program: &'info AccountMeta,
    }

    #[derive(TryFromAccountMetas)]
    pub struct SenchaSwapAccountMetas<'info> {
        pub swap_program: &'info AccountMeta,
        pub token_program: &'info AccountMeta,
        pub swap: &'info AccountMeta,
        pub user_authority: &'info AccountMeta,
        pub input_user_account: &'info AccountMeta,
        pub input_token_account: &'info AccountMeta,
        pub input_fees_account: &'info AccountMeta,
        pub output_user_account: &'info AccountMeta,
        pub output_token_account: &'info AccountMeta,
        pub output_fees_account: &'info AccountMeta,
    }

    #[derive(TryFromAccountMetas)]
    pub struct StepSwapAccountMetas<'info> {
        pub token_swap_program: &'info AccountMeta,
        pub token_program: &'info AccountMeta,
        pub swap: &'info AccountMeta,
        pub authority: &'info AccountMeta,
        pub user_transfer_authority: &'info AccountMeta,
        pub source: &'info AccountMeta,
        pub swap_source: &'info AccountMeta,
        pub swap_destination: &'info AccountMeta,
        pub destination: &'info AccountMeta,
        pub pool_mint: &'info AccountMeta,
        pub pool_fee: &'info AccountMeta,
    }

    #[derive(TryFromAccountMetas)]
    pub struct CropperSwapAccountMetas<'info> {
        pub token_swap_program: &'info AccountMeta,
        pub token_program: &'info AccountMeta,
        pub swap: &'info AccountMeta,
        pub swap_state: &'info AccountMeta,
        pub authority: &'info AccountMeta,
        pub user_transfer_authority: &'info AccountMeta,
        pub source: &'info AccountMeta,
        pub swap_source: &'info AccountMeta,
        pub swap_destination: &'info AccountMeta,
        pub destination: &'info AccountMeta,
        pub pool_mint: &'info AccountMeta,
        pub pool_fee: &'info AccountMeta,
    }

    #[derive(TryFromAccountMetas)]
    pub struct RaydiumSwapAccountMetas<'info> {
        pub swap_program: &'info AccountMeta,
        pub token_program: &'info AccountMeta,
        pub amm_id: &'info AccountMeta,
        pub amm_authority: &'info AccountMeta,
        pub amm_open_orders: &'info AccountMeta,
        pub pool_coin_token_account: &'info AccountMeta,
        pub pool_pc_token_account: &'info AccountMeta,
        pub serum_program_id: &'info AccountMeta,
        pub serum_market: &'info AccountMeta,
        pub serum_bids: &'info AccountMeta,
        pub serum_asks: &'info AccountMeta,
        pub serum_event_queue: &'info AccountMeta,
        pub serum_coin_vault_account: &'info AccountMeta,
        pub serum_pc_vault_account: &'info AccountMeta,
        pub serum_vault_signer: &'info AccountMeta,
        pub user_source_token_account: &'info AccountMeta,
        pub user_destination_token_account: &'info AccountMeta,
        pub user_source_owner: &'info AccountMeta,
    }

    #[derive(TryFromAccountMetas)]
    pub struct CremaSwapAccountMetas<'info> {
        pub swap_program: &'info AccountMeta,
        pub clmm_config: &'info AccountMeta,
        pub clmmpool: &'info AccountMeta,
        pub token_a: &'info AccountMeta,
        pub token_b: &'info AccountMeta,
        pub account_a: &'info AccountMeta,
        pub account_b: &'info AccountMeta,
        pub token_a_vault: &'info AccountMeta,
        pub token_b_vault: &'info AccountMeta,
        pub tick_array_map: &'info AccountMeta,
        pub owner: &'info AccountMeta,
        pub partner: &'info AccountMeta,
        pub partner_ata_a: &'info AccountMeta,
        pub partner_ata_b: &'info AccountMeta,
        pub token_program: &'info AccountMeta,
    }

    #[derive(TryFromAccountMetas)]
    pub struct LifinitySwapAccountMetas<'info> {
        pub swap_program: &'info AccountMeta,
        pub authority: &'info AccountMeta,
        pub amm: &'info AccountMeta,
        pub user_transfer_authority: &'info AccountMeta,
        pub source_info: &'info AccountMeta,
        pub destination_info: &'info AccountMeta,
        pub swap_source: &'info AccountMeta,
        pub swap_destination: &'info AccountMeta,
        pub pool_mint: &'info AccountMeta,
        pub fee_account: &'info AccountMeta,
        pub token_program: &'info AccountMeta,
        pub pyth_account: &'info AccountMeta,
        pub pyth_pc_account: &'info AccountMeta,
        pub config_account: &'info AccountMeta,
    }

    #[derive(TryFromAccountMetas)]
    pub struct MarinadeDepositAccountMetas<'info> {
        pub marinade_finance_program: &'info AccountMeta,
        pub state: &'info AccountMeta,
        pub msol_mint: &'info AccountMeta,
        pub liq_pool_sol_leg_pda: &'info AccountMeta,
        pub liq_pool_msol_leg: &'info AccountMeta,
        pub liq_pool_msol_leg_authority: &'info AccountMeta,
        pub reserve_pda: &'info AccountMeta,
        pub transfer_from: &'info AccountMeta,
        pub mint_to: &'info AccountMeta,
        pub msol_mint_authority: &'info AccountMeta,
        pub system_program: &'info AccountMeta,
        pub token_program: &'info AccountMeta,
        pub user_wsol_token_account: &'info AccountMeta,
        pub temp_wsol_token_account: &'info AccountMeta,
        pub user_transfer_authority: &'info AccountMeta,
        pub payer: &'info AccountMeta,
        pub wsol_mint: &'info AccountMeta,
        pub rent: &'info AccountMeta,
    }

    #[derive(TryFromAccountMetas)]
    pub struct MarinadeUnstakeAccountMetas<'info> {
        pub marinade_finance_program: &'info AccountMeta,
        pub state: &'info AccountMeta,
        pub msol_mint: &'info AccountMeta,
        pub liq_pool_sol_leg_pda: &'info AccountMeta,
        pub liq_pool_msol_leg: &'info AccountMeta,
        pub treasury_msol_account: &'info AccountMeta,
        pub get_msol_from: &'info AccountMeta,
        pub get_msol_from_authority: &'info AccountMeta,
        pub transfer_sol_to: &'info AccountMeta,
        pub system_program: &'info AccountMeta,
        pub token_program: &'info AccountMeta,
        pub user_wsol_token_account: &'info AccountMeta,
    }

    #[derive(TryFromAccountMetas)]
    pub struct AldrinSwapAccountMetas<'info> {
        pub swap_program: &'info AccountMeta,
        pub pool: &'info AccountMeta,
        pub pool_signer: &'info AccountMeta,
        pub pool_mint: &'info AccountMeta,
        pub base_token_vault: &'info AccountMeta,
        pub quote_token_vault: &'info AccountMeta,
        pub fee_pool_token_account: &'info AccountMeta,
        pub wallet_authority: &'info AccountMeta,
        pub user_base_token_account: &'info AccountMeta,
        pub user_quote_token_account: &'info AccountMeta,
        pub token_program: &'info AccountMeta,
    }

    #[derive(TryFromAccountMetas)]
    pub struct AldrinV2SwapAccountMetas<'info> {
        pub swap_program: &'info AccountMeta,
        pub pool: &'info AccountMeta,
        pub pool_signer: &'info AccountMeta,
        pub pool_mint: &'info AccountMeta,
        pub base_token_vault: &'info AccountMeta,
        pub quote_token_vault: &'info AccountMeta,
        pub fee_pool_token_account: &'info AccountMeta,
        pub wallet_authority: &'info AccountMeta,
        pub user_base_token_account: &'info AccountMeta,
        pub user_quote_token_account: &'info AccountMeta,
        pub curve: &'info AccountMeta,
        pub token_program: &'info AccountMeta,
    }

    #[derive(TryFromAccountMetas)]
    pub struct WhirlpoolSwapAccountMetas<'info> {
        pub swap_program: &'info AccountMeta,
        pub token_program: &'info AccountMeta,
        pub token_authority: &'info AccountMeta,
        pub whirlpool: &'info AccountMeta,
        pub token_owner_account_a: &'info AccountMeta,
        pub token_vault_a: &'info AccountMeta,
        pub token_owner_account_b: &'info AccountMeta,
        pub token_vault_b: &'info AccountMeta,
        pub tick_array_0: &'info AccountMeta,
        pub tick_array_1: &'info AccountMeta,
        pub tick_array_2: &'info AccountMeta,
        pub oracle: &'info AccountMeta,
    }

    #[derive(TryFromAccountMetas)]
    pub struct WhirlpoolSwapV2AccountMetas<'info> {
        pub swap_program: &'info AccountMeta,
        pub token_program_a: &'info AccountMeta,
        pub token_program_b: &'info AccountMeta,
        pub memo_program: &'info AccountMeta,
        pub token_authority: &'info AccountMeta,
        pub whirlpool: &'info AccountMeta,
        pub token_mint_a: &'info AccountMeta,
        pub token_mint_b: &'info AccountMeta,
        pub token_owner_account_a: &'info AccountMeta,
        pub token_vault_a: &'info AccountMeta,
        pub token_owner_account_b: &'info AccountMeta,
        pub token_vault_b: &'info AccountMeta,
        pub tick_array_0: &'info AccountMeta,
        pub tick_array_1: &'info AccountMeta,
        pub tick_array_2: &'info AccountMeta,
        pub oracle: &'info AccountMeta,
    }

    #[derive(TryFromAccountMetas)]
    pub struct InvariantSwapAccountMetas<'info> {
        pub swap_program: &'info AccountMeta,
        pub state: &'info AccountMeta,
        pub pool: &'info AccountMeta,
        pub tickmap: &'info AccountMeta,
        pub account_x: &'info AccountMeta,
        pub account_y: &'info AccountMeta,
        pub reserve_x: &'info AccountMeta,
        pub reserve_y: &'info AccountMeta,
        pub owner: &'info AccountMeta,
        pub program_authority: &'info AccountMeta,
        pub token_program: &'info AccountMeta,
    }

    #[derive(TryFromAccountMetas)]
    pub struct MeteoraSwapAccountMetas<'info> {
        pub swap_program: &'info AccountMeta,
        pub pool: &'info AccountMeta,
        pub user_source_token: &'info AccountMeta,
        pub user_destination_token: &'info AccountMeta,
        pub a_vault: &'info AccountMeta,
        pub b_vault: &'info AccountMeta,
        pub a_token_vault: &'info AccountMeta,
        pub b_token_vault: &'info AccountMeta,
        pub a_vault_lp_mint: &'info AccountMeta,
        pub b_vault_lp_mint: &'info AccountMeta,
        pub a_vault_lp: &'info AccountMeta,
        pub b_vault_lp: &'info AccountMeta,
        pub admin_token_fee: &'info AccountMeta,
        pub user: &'info AccountMeta,
        pub vault_program: &'info AccountMeta,
        pub token_program: &'info AccountMeta,
    }

    #[derive(TryFromAccountMetas)]
    pub struct GoosefxSwapAccountMetas<'info> {
        pub swap_program: &'info AccountMeta,
        pub controller: &'info AccountMeta,
        pub pair: &'info AccountMeta,
        pub ssl_in: &'info AccountMeta,
        pub ssl_out: &'info AccountMeta,
        pub liability_vault_in: &'info AccountMeta,
        pub swapped_liability_vault_in: &'info AccountMeta,
        pub liability_vault_out: &'info AccountMeta,
        pub swapped_liability_vault_out: &'info AccountMeta,
        pub user_in_ata: &'info AccountMeta,
        pub user_out_ata: &'info AccountMeta,
        pub fee_collector_ata: &'info AccountMeta,
        pub user_wallet: &'info AccountMeta,
        pub fee_collector: &'info AccountMeta,
        pub token_program: &'info AccountMeta,
    }

    #[derive(TryFromAccountMetas)]
    pub struct DeltafiSwapAccountMetas<'info> {
        pub swap_program: &'info AccountMeta,
        pub market_config: &'info AccountMeta,
        pub swap_info: &'info AccountMeta,
        pub user_source_token: &'info AccountMeta,
        pub user_destination_token: &'info AccountMeta,
        pub swap_source_token: &'info AccountMeta,
        pub swap_destination_token: &'info AccountMeta,
        pub deltafi_user: &'info AccountMeta,
        pub admin_destination_token: &'info AccountMeta,
        pub pyth_price_base: &'info AccountMeta,
        pub pyth_price_quote: &'info AccountMeta,
        pub user_authority: &'info AccountMeta,
        pub token_program: &'info AccountMeta,
    }

    #[derive(TryFromAccountMetas)]
    pub struct BalansolSwapAccountMetas<'info> {
        pub swap_program: &'info AccountMeta,
        pub authority: &'info AccountMeta,
        pub pool: &'info AccountMeta,
        pub tax_man: &'info AccountMeta,
        pub bid_mint: &'info AccountMeta,
        pub treasurer: &'info AccountMeta,
        pub src_treasury: &'info AccountMeta,
        pub src_associated_token_account: &'info AccountMeta,
        pub ask_mint: &'info AccountMeta,
        pub dst_treasury: &'info AccountMeta,
        pub dst_associated_token_account: &'info AccountMeta,
        pub dst_token_account_taxman: &'info AccountMeta,
        pub system_program: &'info AccountMeta,
        pub token_program: &'info AccountMeta,
        pub associated_token_program: &'info AccountMeta,
        pub rent: &'info AccountMeta,
    }

    #[derive(TryFromAccountMetas)]
    pub struct MarcoPoloSwapAccountMetas<'info> {
        pub swap_program: &'info AccountMeta,
        pub state: &'info AccountMeta,
        pub pool: &'info AccountMeta,
        pub token_x: &'info AccountMeta,
        pub token_y: &'info AccountMeta,
        pub pool_x_account: &'info AccountMeta,
        pub pool_y_account: &'info AccountMeta,
        pub swapper_x_account: &'info AccountMeta,
        pub swapper_y_account: &'info AccountMeta,
        pub swapper: &'info AccountMeta,
        pub referrer_x_account: &'info AccountMeta,
        pub referrer_y_account: &'info AccountMeta,
        pub referrer: &'info AccountMeta,
        pub program_authority: &'info AccountMeta,
        pub system_program: &'info AccountMeta,
        pub token_program: &'info AccountMeta,
        pub associated_token_program: &'info AccountMeta,
        pub rent: &'info AccountMeta,
    }

    #[derive(TryFromAccountMetas)]
    pub struct DradexSwapAccountMetas<'info> {
        pub swap_program: &'info AccountMeta,
        pub pair: &'info AccountMeta,
        pub market: &'info AccountMeta,
        pub event_queue: &'info AccountMeta,
        pub dex_user: &'info AccountMeta,
        pub market_user: &'info AccountMeta,
        pub bids: &'info AccountMeta,
        pub asks: &'info AccountMeta,
        pub t_0_vault: &'info AccountMeta,
        pub t_1_vault: &'info AccountMeta,
        pub t_0_user: &'info AccountMeta,
        pub t_1_user: &'info AccountMeta,
        pub master: &'info AccountMeta,
        pub signer: &'info AccountMeta,
        pub system_program: &'info AccountMeta,
        pub token_program: &'info AccountMeta,
        pub logger: &'info AccountMeta,
    }

    #[derive(TryFromAccountMetas)]
    pub struct LifinityV2SwapAccountMetas<'info> {
        pub swap_program: &'info AccountMeta,
        pub authority: &'info AccountMeta,
        pub amm: &'info AccountMeta,
        pub user_transfer_authority: &'info AccountMeta,
        pub source_info: &'info AccountMeta,
        pub destination_info: &'info AccountMeta,
        pub swap_source: &'info AccountMeta,
        pub swap_destination: &'info AccountMeta,
        pub pool_mint: &'info AccountMeta,
        pub fee_account: &'info AccountMeta,
        pub token_program: &'info AccountMeta,
        pub oracle_main_account: &'info AccountMeta,
        pub oracle_sub_account: &'info AccountMeta,
        pub oracle_pc_account: &'info AccountMeta,
    }

    #[derive(TryFromAccountMetas)]
    pub struct RaydiumClmmSwapAccountMetas<'info> {
        pub swap_program: &'info AccountMeta,
        pub payer: &'info AccountMeta,
        pub amm_config: &'info AccountMeta,
        pub pool_state: &'info AccountMeta,
        pub input_token_account: &'info AccountMeta,
        pub output_token_account: &'info AccountMeta,
        pub input_vault: &'info AccountMeta,
        pub output_vault: &'info AccountMeta,
        pub observation_state: &'info AccountMeta,
        pub token_program: &'info AccountMeta,
        pub tick_array: &'info AccountMeta,
    }

    #[derive(TryFromAccountMetas)]
    pub struct RaydiumClmmSwapV2AccountMetas<'info> {
        pub swap_program: &'info AccountMeta,
        pub payer: &'info AccountMeta,
        pub amm_config: &'info AccountMeta,
        pub pool_state: &'info AccountMeta,
        pub input_token_account: &'info AccountMeta,
        pub output_token_account: &'info AccountMeta,
        pub input_vault: &'info AccountMeta,
        pub output_vault: &'info AccountMeta,
        pub observation_state: &'info AccountMeta,
        pub token_program: &'info AccountMeta,
        pub token_program_2022: &'info AccountMeta,
        pub memo_program: &'info AccountMeta,
        pub input_vault_mint: &'info AccountMeta,
        pub output_vault_mint: &'info AccountMeta,
    }

    #[derive(TryFromAccountMetas)]
    pub struct PhoenixSwapAccountMetas<'info> {
        pub swap_program: &'info AccountMeta,
        pub log_authority: &'info AccountMeta,
        pub market: &'info AccountMeta,
        pub trader: &'info AccountMeta,
        pub base_account: &'info AccountMeta,
        pub quote_account: &'info AccountMeta,
        pub base_vault: &'info AccountMeta,
        pub quote_vault: &'info AccountMeta,
        pub token_program: &'info AccountMeta,
    }

    #[derive(TryFromAccountMetas)]
    pub struct SymmetrySwapAccountMetas<'info> {
        pub swap_program: &'info AccountMeta,
        pub buyer: &'info AccountMeta,
        pub fund_state: &'info AccountMeta,
        pub pda_account: &'info AccountMeta,
        pub pda_from_token_account: &'info AccountMeta,
        pub buyer_from_token_account: &'info AccountMeta,
        pub pda_to_token_account: &'info AccountMeta,
        pub buyer_to_token_account: &'info AccountMeta,
        pub swap_fee_account: &'info AccountMeta,
        pub host_fee_account: &'info AccountMeta,
        pub manager_fee_account: &'info AccountMeta,
        pub token_list: &'info AccountMeta,
        pub prism_data: &'info AccountMeta,
        pub token_program: &'info AccountMeta,
    }

    #[derive(TryFromAccountMetas)]
    pub struct HeliumTreasuryManagementRedeemV0AccountMetas<'info> {
        pub swap_program: &'info AccountMeta,
        pub treasury_management: &'info AccountMeta,
        pub treasury_mint: &'info AccountMeta,
        pub supply_mint: &'info AccountMeta,
        pub treasury: &'info AccountMeta,
        pub circuit_breaker: &'info AccountMeta,
        pub from: &'info AccountMeta,
        pub to: &'info AccountMeta,
        pub owner: &'info AccountMeta,
        pub circuit_breaker_program: &'info AccountMeta,
        pub token_program: &'info AccountMeta,
    }

    #[derive(TryFromAccountMetas)]
    pub struct GoosefxV2SwapAccountMetas<'info> {
        pub swap_program: &'info AccountMeta,
        pub pair: &'info AccountMeta,
        pub pool_registry: &'info AccountMeta,
        pub user_wallet: &'info AccountMeta,
        pub ssl_pool_in_signer: &'info AccountMeta,
        pub ssl_pool_out_signer: &'info AccountMeta,
        pub user_ata_in: &'info AccountMeta,
        pub user_ata_out: &'info AccountMeta,
        pub ssl_out_main_vault: &'info AccountMeta,
        pub ssl_out_secondary_vault: &'info AccountMeta,
        pub ssl_in_main_vault: &'info AccountMeta,
        pub ssl_in_secondary_vault: &'info AccountMeta,
        pub ssl_out_fee_vault: &'info AccountMeta,
        pub fee_destination: &'info AccountMeta,
        pub output_token_price_history: &'info AccountMeta,
        pub output_token_oracle: &'info AccountMeta,
        pub input_token_price_history: &'info AccountMeta,
        pub input_token_oracle: &'info AccountMeta,
        pub event_emitter: &'info AccountMeta,
        pub token_program: &'info AccountMeta,
    }

    #[derive(TryFromAccountMetas)]
    pub struct PerpsSwapAccountMetas<'info> {
        pub swap_program: &'info AccountMeta,
        pub owner: &'info AccountMeta,
        pub funding_account: &'info AccountMeta,
        pub receiving_account: &'info AccountMeta,
        pub transfer_authority: &'info AccountMeta,
        pub perpetuals: &'info AccountMeta,
        pub pool: &'info AccountMeta,
        pub receiving_custody: &'info AccountMeta,
        pub receiving_custody_oracle_account: &'info AccountMeta,
        pub receiving_custody_token_account: &'info AccountMeta,
        pub dispensing_custody: &'info AccountMeta,
        pub dispensing_custody_oracle_account: &'info AccountMeta,
        pub dispensing_custody_token_account: &'info AccountMeta,
        pub token_program: &'info AccountMeta,
        pub event_authority: &'info AccountMeta,
        pub program: &'info AccountMeta,
    }

    #[derive(TryFromAccountMetas)]
    pub struct PerpsAddLiquidityAccountMetas<'info> {
        pub swap_program: &'info AccountMeta,
        pub owner: &'info AccountMeta,
        pub funding_or_receiving_account: &'info AccountMeta,
        pub lp_token_account: &'info AccountMeta,
        pub transfer_authority: &'info AccountMeta,
        pub perpetuals: &'info AccountMeta,
        pub pool: &'info AccountMeta,
        pub custody: &'info AccountMeta,
        pub custody_oracle_account: &'info AccountMeta,
        pub custody_token_account: &'info AccountMeta,
        pub lp_token_mint: &'info AccountMeta,
        pub token_program: &'info AccountMeta,
        pub event_authority: &'info AccountMeta,
        pub program: &'info AccountMeta,
    }

    #[derive(TryFromAccountMetas)]
    pub struct PerpsRemoveLiquidityAccountMetas<'info> {
        pub swap_program: &'info AccountMeta,
        pub owner: &'info AccountMeta,
        pub funding_or_receiving_account: &'info AccountMeta,
        pub lp_token_account: &'info AccountMeta,
        pub transfer_authority: &'info AccountMeta,
        pub perpetuals: &'info AccountMeta,
        pub pool: &'info AccountMeta,
        pub custody: &'info AccountMeta,
        pub custody_oracle_account: &'info AccountMeta,
        pub custody_token_account: &'info AccountMeta,
        pub lp_token_mint: &'info AccountMeta,
        pub token_program: &'info AccountMeta,
        pub event_authority: &'info AccountMeta,
        pub program: &'info AccountMeta,
    }

    #[derive(TryFromAccountMetas)]
    pub struct MeteoraDlmmSwapAccountMetas<'info> {
        pub swap_program: &'info AccountMeta,
        pub lb_pair: &'info AccountMeta,
        pub bin_array_bitmap_extension: &'info AccountMeta,
        pub reserve_x: &'info AccountMeta,
        pub reserve_y: &'info AccountMeta,
        pub user_token_in: &'info AccountMeta,
        pub user_token_out: &'info AccountMeta,
        pub token_x_mint: &'info AccountMeta,
        pub token_y_mint: &'info AccountMeta,
        pub oracle: &'info AccountMeta,
        pub host_fee_in: &'info AccountMeta,
        pub user: &'info AccountMeta,
        pub token_x_program: &'info AccountMeta,
        pub token_y_program: &'info AccountMeta,
        pub event_authority: &'info AccountMeta,
        pub program: &'info AccountMeta,
    }

    #[derive(TryFromAccountMetas)]
    pub struct OpenBookV2SwapAccountMetas<'info> {
        pub swap_program: &'info AccountMeta,
        pub signer: &'info AccountMeta,
        pub penalty_payer: &'info AccountMeta,
        pub market: &'info AccountMeta,
        pub market_authority: &'info AccountMeta,
        pub bids: &'info AccountMeta,
        pub asks: &'info AccountMeta,
        pub market_base_vault: &'info AccountMeta,
        pub market_quote_vault: &'info AccountMeta,
        pub event_heap: &'info AccountMeta,
        pub user_base_account: &'info AccountMeta,
        pub user_quote_account: &'info AccountMeta,
        pub oracle_a: &'info AccountMeta,
        pub oracle_b: &'info AccountMeta,
        pub token_program: &'info AccountMeta,
        pub system_program: &'info AccountMeta,
        pub open_orders_admin: &'info AccountMeta,
    }

    #[derive(TryFromAccountMetas)]
    pub struct CloneSwapAccountMetas<'info> {
        pub swap_program: &'info AccountMeta,
        pub user: &'info AccountMeta,
        pub clone: &'info AccountMeta,
        pub pools: &'info AccountMeta,
        pub oracles: &'info AccountMeta,
        pub user_collateral_token_account: &'info AccountMeta,
        pub user_onasset_token_account: &'info AccountMeta,
        pub onasset_mint: &'info AccountMeta,
        pub collateral_mint: &'info AccountMeta,
        pub collateral_vault: &'info AccountMeta,
        pub treasury_onasset_token_account: &'info AccountMeta,
        pub treasury_collateral_token_account: &'info AccountMeta,
        pub token_program: &'info AccountMeta,
        pub clone_staking: &'info AccountMeta,
        pub user_staking_account: &'info AccountMeta,
        pub clone_staking_program: &'info AccountMeta,
    }

    #[derive(TryFromAccountMetas)]
    pub struct RaydiumCpSwapAccountMetas<'info> {
        pub swap_program: &'info AccountMeta,
        pub payer: &'info AccountMeta,
        pub authority: &'info AccountMeta,
        pub amm_config: &'info AccountMeta,
        pub pool_state: &'info AccountMeta,
        pub input_token_account: &'info AccountMeta,
        pub output_token_account: &'info AccountMeta,
        pub input_vault: &'info AccountMeta,
        pub output_vault: &'info AccountMeta,
        pub input_token_program: &'info AccountMeta,
        pub output_token_program: &'info AccountMeta,
        pub input_token_mint: &'info AccountMeta,
        pub output_token_mint: &'info AccountMeta,
        pub observation_state: &'info AccountMeta,
    }

    #[derive(TryFromAccountMetas)]
    pub struct OneIntroSwapAccountMetas<'info> {
        pub swap_program: &'info AccountMeta,
        pub metadata_state: &'info AccountMeta,
        pub pool_state: &'info AccountMeta,
        pub pool_auth_pda: &'info AccountMeta,
        pub pool_token_in_account: &'info AccountMeta,
        pub pool_token_out_account: &'info AccountMeta,
        pub user: &'info AccountMeta,
        pub user_token_in_account: &'info AccountMeta,
        pub user_token_out_account: &'info AccountMeta,
        pub metadata_swap_fee_account: &'info AccountMeta,
        pub referral_token_account: &'info AccountMeta,
        pub token_program: &'info AccountMeta,
    }

    #[derive(TryFromAccountMetas)]
    pub struct PumpdotfunWrappedBuyAccountMetas<'info> {
        pub swap_program: &'info AccountMeta,
        pub global: &'info AccountMeta,
        pub fee_recipient: &'info AccountMeta,
        pub mint: &'info AccountMeta,
        pub bonding_curve: &'info AccountMeta,
        pub associated_bonding_curve: &'info AccountMeta,
        pub associated_user: &'info AccountMeta,
        pub user: &'info AccountMeta,
        pub system_program: &'info AccountMeta,
        pub token_program: &'info AccountMeta,
        pub rent: &'info AccountMeta,
        pub event_authority: &'info AccountMeta,
        pub program: &'info AccountMeta,
        pub user_wsol_token_account: &'info AccountMeta,
        pub temp_wsol_token_account: &'info AccountMeta,
        pub wsol_mint: &'info AccountMeta,
    }

    #[derive(TryFromAccountMetas)]
    pub struct PumpdotfunWrappedSellAccountMetas<'info> {
        pub swap_program: &'info AccountMeta,
        pub global: &'info AccountMeta,
        pub fee_recipient: &'info AccountMeta,
        pub mint: &'info AccountMeta,
        pub bonding_curve: &'info AccountMeta,
        pub associated_bonding_curve: &'info AccountMeta,
        pub associated_user: &'info AccountMeta,
        pub user: &'info AccountMeta,
        pub system_program: &'info AccountMeta,
        pub associated_token_program: &'info AccountMeta,
        pub token_program: &'info AccountMeta,
        pub event_authority: &'info AccountMeta,
        pub program: &'info AccountMeta,
        pub user_wsol_token_account: &'info AccountMeta,
    }

    #[derive(TryFromAccountMetas)]
    pub struct PerpsV2SwapAccountMetas<'info> {
        pub swap_program: &'info AccountMeta,
        pub owner: &'info AccountMeta,
        pub funding_account: &'info AccountMeta,
        pub receiving_account: &'info AccountMeta,
        pub transfer_authority: &'info AccountMeta,
        pub perpetuals: &'info AccountMeta,
        pub pool: &'info AccountMeta,
        pub receiving_custody: &'info AccountMeta,
        pub receiving_custody_doves_price_account: &'info AccountMeta,
        pub receiving_custody_pythnet_price_account: &'info AccountMeta,
        pub receiving_custody_token_account: &'info AccountMeta,
        pub dispensing_custody: &'info AccountMeta,
        pub dispensing_custody_doves_price_account: &'info AccountMeta,
        pub dispensing_custody_pythnet_price_account: &'info AccountMeta,
        pub dispensing_custody_token_account: &'info AccountMeta,
        pub token_program: &'info AccountMeta,
        pub event_authority: &'info AccountMeta,
        pub program: &'info AccountMeta,
    }

    #[derive(TryFromAccountMetas)]
    pub struct PerpsV2AddLiquidityAccountMetas<'info> {
        pub swap_program: &'info AccountMeta,
        pub owner: &'info AccountMeta,
        pub funding_or_receiving_account: &'info AccountMeta,
        pub lp_token_account: &'info AccountMeta,
        pub transfer_authority: &'info AccountMeta,
        pub perpetuals: &'info AccountMeta,
        pub pool: &'info AccountMeta,
        pub custody: &'info AccountMeta,
        pub custody_doves_price_account: &'info AccountMeta,
        pub custody_pythnet_price_account: &'info AccountMeta,
        pub custody_token_account: &'info AccountMeta,
        pub lp_token_mint: &'info AccountMeta,
        pub token_program: &'info AccountMeta,
        pub event_authority: &'info AccountMeta,
        pub program: &'info AccountMeta,
    }

    #[derive(TryFromAccountMetas)]
    pub struct PerpsV2RemoveLiquidityAccountMetas<'info> {
        pub swap_program: &'info AccountMeta,
        pub owner: &'info AccountMeta,
        pub funding_or_receiving_account: &'info AccountMeta,
        pub lp_token_account: &'info AccountMeta,
        pub transfer_authority: &'info AccountMeta,
        pub perpetuals: &'info AccountMeta,
        pub pool: &'info AccountMeta,
        pub custody: &'info AccountMeta,
        pub custody_doves_price_account: &'info AccountMeta,
        pub custody_pythnet_price_account: &'info AccountMeta,
        pub custody_token_account: &'info AccountMeta,
        pub lp_token_mint: &'info AccountMeta,
        pub token_program: &'info AccountMeta,
        pub event_authority: &'info AccountMeta,
        pub program: &'info AccountMeta,
    }

    #[derive(TryFromAccountMetas)]
    pub struct MoonshotWrappedBuyAccountMetas<'info> {
        pub swap_program: &'info AccountMeta,
        pub sender: &'info AccountMeta,
        pub sender_token_account: &'info AccountMeta,
        pub curve_account: &'info AccountMeta,
        pub curve_token_account: &'info AccountMeta,
        pub dex_fee: &'info AccountMeta,
        pub helio_fee: &'info AccountMeta,
        pub mint: &'info AccountMeta,
        pub config_account: &'info AccountMeta,
        pub token_program: &'info AccountMeta,
        pub associated_token_program: &'info AccountMeta,
        pub system_program: &'info AccountMeta,
        pub user_wsol_token_account: &'info AccountMeta,
        pub temp_wsol_token_account: &'info AccountMeta,
        pub wsol_mint: &'info AccountMeta,
    }

    #[derive(TryFromAccountMetas)]
    pub struct MoonshotWrappedSellAccountMetas<'info> {
        pub swap_program: &'info AccountMeta,
        pub sender: &'info AccountMeta,
        pub sender_token_account: &'info AccountMeta,
        pub curve_account: &'info AccountMeta,
        pub curve_token_account: &'info AccountMeta,
        pub dex_fee: &'info AccountMeta,
        pub helio_fee: &'info AccountMeta,
        pub mint: &'info AccountMeta,
        pub config_account: &'info AccountMeta,
        pub token_program: &'info AccountMeta,
        pub associated_token_program: &'info AccountMeta,
        pub system_program: &'info AccountMeta,
        pub user_wsol_token_account: &'info AccountMeta,
    }

    #[derive(TryFromAccountMetas)]
    pub struct StabbleStableSwapAccountMetas<'info> {
        pub swap_program: &'info AccountMeta,
        pub user: &'info AccountMeta,
        pub user_token_in: &'info AccountMeta,
        pub user_token_out: &'info AccountMeta,
        pub vault_token_in: &'info AccountMeta,
        pub vault_token_out: &'info AccountMeta,
        pub beneficiary_token_out: &'info AccountMeta,
        pub pool: &'info AccountMeta,
        pub withdraw_authority: &'info AccountMeta,
        pub vault: &'info AccountMeta,
        pub vault_authority: &'info AccountMeta,
        pub vault_program: &'info AccountMeta,
        pub token_program: &'info AccountMeta,
    }

    #[derive(TryFromAccountMetas)]
    pub struct StabbleWeightedSwapAccountMetas<'info> {
        pub swap_program: &'info AccountMeta,
        pub user: &'info AccountMeta,
        pub user_token_in: &'info AccountMeta,
        pub user_token_out: &'info AccountMeta,
        pub vault_token_in: &'info AccountMeta,
        pub vault_token_out: &'info AccountMeta,
        pub beneficiary_token_out: &'info AccountMeta,
        pub pool: &'info AccountMeta,
        pub withdraw_authority: &'info AccountMeta,
        pub vault: &'info AccountMeta,
        pub vault_authority: &'info AccountMeta,
        pub vault_program: &'info AccountMeta,
        pub token_program: &'info AccountMeta,
    }

    #[derive(TryFromAccountMetas)]
    pub struct ObricSwapAccountMetas<'info> {
        pub swap_program: &'info AccountMeta,
        pub trading_pair: &'info AccountMeta,
        pub mint_x: &'info AccountMeta,
        pub mint_y: &'info AccountMeta,
        pub reserve_x: &'info AccountMeta,
        pub reserve_y: &'info AccountMeta,
        pub user_token_account_x: &'info AccountMeta,
        pub user_token_account_y: &'info AccountMeta,
        pub protocol_fee: &'info AccountMeta,
        pub x_price_feed: &'info AccountMeta,
        pub y_price_feed: &'info AccountMeta,
        pub user: &'info AccountMeta,
        pub token_program: &'info AccountMeta,
    }

    #[derive(TryFromAccountMetas)]
    pub struct FoxBuyFromEstimatedCostAccountMetas<'info> {
        pub swap_program: &'info AccountMeta,
        pub user: &'info AccountMeta,
        pub config: &'info AccountMeta,
        pub mint_base: &'info AccountMeta,
        pub mint_y: &'info AccountMeta,
        pub mint_n: &'info AccountMeta,
        pub pot: &'info AccountMeta,
        pub user_ata_base: &'info AccountMeta,
        pub user_ata_buy: &'info AccountMeta,
        pub token_program: &'info AccountMeta,
    }

    #[derive(TryFromAccountMetas)]
    pub struct FoxClaimPartialAccountMetas<'info> {
        pub swap_program: &'info AccountMeta,
        pub user: &'info AccountMeta,
        pub config: &'info AccountMeta,
        pub mint_base: &'info AccountMeta,
        pub mint_y: &'info AccountMeta,
        pub mint_n: &'info AccountMeta,
        pub pot: &'info AccountMeta,
        pub user_ata_base: &'info AccountMeta,
        pub user_ata_y: &'info AccountMeta,
        pub user_ata_n: &'info AccountMeta,
        pub token_program: &'info AccountMeta,
    }

    #[derive(TryFromAccountMetas)]
    pub struct SolFiSwapAccountMetas<'info> {
        pub swap_program: &'info AccountMeta,
        pub token_transfer_authority: &'info AccountMeta,
        pub market_account: &'info AccountMeta,
        pub base_vault: &'info AccountMeta,
        pub quote_vault: &'info AccountMeta,
        pub user_base_ata: &'info AccountMeta,
        pub user_quote_ata: &'info AccountMeta,
        pub token_program: &'info AccountMeta,
        pub instructions_sysvar: &'info AccountMeta,
    }
}

// Instructions
pub mod instructions {
    use anchor_lang::prelude::*;
    use anchor_i11n::prelude::*;
    use super::*;

    #[derive(AnchorDiscriminator, AnchorSerialize, AnchorDeserialize)]
    pub struct Route {
        pub route_plan: Vec<RoutePlanStep>,
        pub in_amount: u64,
        pub quoted_out_amount: u64,
        pub slippage_bps: u16,
        pub platform_fee_bps: u8,
    }

    #[derive(AnchorDiscriminator, AnchorSerialize, AnchorDeserialize)]
    pub struct RouteWithTokenLedger {
        pub route_plan: Vec<RoutePlanStep>,
        pub quoted_out_amount: u64,
        pub slippage_bps: u16,
        pub platform_fee_bps: u8,
    }

    #[derive(AnchorDiscriminator, AnchorSerialize, AnchorDeserialize)]
    pub struct ExactOutRoute {
        pub route_plan: Vec<RoutePlanStep>,
        pub out_amount: u64,
        pub quoted_in_amount: u64,
        pub slippage_bps: u16,
        pub platform_fee_bps: u8,
    }

    #[derive(AnchorDiscriminator, AnchorSerialize, AnchorDeserialize)]
    pub struct SharedAccountsRoute {
        pub id: u8,
        pub route_plan: Vec<RoutePlanStep>,
        pub in_amount: u64,
        pub quoted_out_amount: u64,
        pub slippage_bps: u16,
        pub platform_fee_bps: u8,
    }

    #[derive(AnchorDiscriminator, AnchorSerialize, AnchorDeserialize)]
    pub struct SharedAccountsRouteWithTokenLedger {
        pub id: u8,
        pub route_plan: Vec<RoutePlanStep>,
        pub quoted_out_amount: u64,
        pub slippage_bps: u16,
        pub platform_fee_bps: u8,
    }

    #[derive(AnchorDiscriminator, AnchorSerialize, AnchorDeserialize)]
    pub struct SharedAccountsExactOutRoute {
        pub id: u8,
        pub route_plan: Vec<RoutePlanStep>,
        pub out_amount: u64,
        pub quoted_in_amount: u64,
        pub slippage_bps: u16,
        pub platform_fee_bps: u8,
    }

    #[derive(AnchorDiscriminator, AnchorSerialize, AnchorDeserialize)]
    pub struct SetTokenLedger {

    }

    #[derive(AnchorDiscriminator, AnchorSerialize, AnchorDeserialize)]
    pub struct CreateOpenOrders {

    }

    #[derive(AnchorDiscriminator, AnchorSerialize, AnchorDeserialize)]
    pub struct CreateTokenAccount {
        pub bump: u8,
    }

    #[derive(AnchorDiscriminator, AnchorSerialize, AnchorDeserialize)]
    pub struct CreateProgramOpenOrders {
        pub id: u8,
    }

    #[derive(AnchorDiscriminator, AnchorSerialize, AnchorDeserialize)]
    pub struct Claim {
        pub id: u8,
    }

    #[derive(AnchorDiscriminator, AnchorSerialize, AnchorDeserialize)]
    pub struct ClaimToken {
        pub id: u8,
    }

    #[derive(AnchorDiscriminator, AnchorSerialize, AnchorDeserialize)]
    pub struct CreateTokenLedger {

    }

    #[derive(AnchorDiscriminator, AnchorSerialize, AnchorDeserialize)]
    pub struct MercurialSwap {

    }

    #[derive(AnchorDiscriminator, AnchorSerialize, AnchorDeserialize)]
    pub struct CykuraSwap {

    }

    #[derive(AnchorDiscriminator, AnchorSerialize, AnchorDeserialize)]
    pub struct SerumSwap {

    }

    #[derive(AnchorDiscriminator, AnchorSerialize, AnchorDeserialize)]
    pub struct SaberSwap {

    }

    #[derive(AnchorDiscriminator, AnchorSerialize, AnchorDeserialize)]
    pub struct SaberAddDecimals {

    }

    #[derive(AnchorDiscriminator, AnchorSerialize, AnchorDeserialize)]
    pub struct TokenSwap {

    }

    #[derive(AnchorDiscriminator, AnchorSerialize, AnchorDeserialize)]
    pub struct TokenSwapV2 {

    }

    #[derive(AnchorDiscriminator, AnchorSerialize, AnchorDeserialize)]
    pub struct SenchaSwap {

    }

    #[derive(AnchorDiscriminator, AnchorSerialize, AnchorDeserialize)]
    pub struct StepSwap {

    }

    #[derive(AnchorDiscriminator, AnchorSerialize, AnchorDeserialize)]
    pub struct CropperSwap {

    }

    #[derive(AnchorDiscriminator, AnchorSerialize, AnchorDeserialize)]
    pub struct RaydiumSwap {

    }

    #[derive(AnchorDiscriminator, AnchorSerialize, AnchorDeserialize)]
    pub struct CremaSwap {

    }

    #[derive(AnchorDiscriminator, AnchorSerialize, AnchorDeserialize)]
    pub struct LifinitySwap {

    }

    #[derive(AnchorDiscriminator, AnchorSerialize, AnchorDeserialize)]
    pub struct MarinadeDeposit {

    }

    #[derive(AnchorDiscriminator, AnchorSerialize, AnchorDeserialize)]
    pub struct MarinadeUnstake {

    }

    #[derive(AnchorDiscriminator, AnchorSerialize, AnchorDeserialize)]
    pub struct AldrinSwap {

    }

    #[derive(AnchorDiscriminator, AnchorSerialize, AnchorDeserialize)]
    pub struct AldrinV2Swap {

    }

    #[derive(AnchorDiscriminator, AnchorSerialize, AnchorDeserialize)]
    pub struct WhirlpoolSwap {

    }

    #[derive(AnchorDiscriminator, AnchorSerialize, AnchorDeserialize)]
    pub struct WhirlpoolSwapV2 {

    }

    #[derive(AnchorDiscriminator, AnchorSerialize, AnchorDeserialize)]
    pub struct InvariantSwap {

    }

    #[derive(AnchorDiscriminator, AnchorSerialize, AnchorDeserialize)]
    pub struct MeteoraSwap {

    }

    #[derive(AnchorDiscriminator, AnchorSerialize, AnchorDeserialize)]
    pub struct GoosefxSwap {

    }

    #[derive(AnchorDiscriminator, AnchorSerialize, AnchorDeserialize)]
    pub struct DeltafiSwap {

    }

    #[derive(AnchorDiscriminator, AnchorSerialize, AnchorDeserialize)]
    pub struct BalansolSwap {

    }

    #[derive(AnchorDiscriminator, AnchorSerialize, AnchorDeserialize)]
    pub struct MarcoPoloSwap {

    }

    #[derive(AnchorDiscriminator, AnchorSerialize, AnchorDeserialize)]
    pub struct DradexSwap {

    }

    #[derive(AnchorDiscriminator, AnchorSerialize, AnchorDeserialize)]
    pub struct LifinityV2Swap {

    }

    #[derive(AnchorDiscriminator, AnchorSerialize, AnchorDeserialize)]
    pub struct RaydiumClmmSwap {

    }

    #[derive(AnchorDiscriminator, AnchorSerialize, AnchorDeserialize)]
    pub struct RaydiumClmmSwapV2 {

    }

    #[derive(AnchorDiscriminator, AnchorSerialize, AnchorDeserialize)]
    pub struct PhoenixSwap {

    }

    #[derive(AnchorDiscriminator, AnchorSerialize, AnchorDeserialize)]
    pub struct SymmetrySwap {

    }

    #[derive(AnchorDiscriminator, AnchorSerialize, AnchorDeserialize)]
    pub struct HeliumTreasuryManagementRedeemV0 {

    }

    #[derive(AnchorDiscriminator, AnchorSerialize, AnchorDeserialize)]
    pub struct GoosefxV2Swap {

    }

    #[derive(AnchorDiscriminator, AnchorSerialize, AnchorDeserialize)]
    pub struct PerpsSwap {

    }

    #[derive(AnchorDiscriminator, AnchorSerialize, AnchorDeserialize)]
    pub struct PerpsAddLiquidity {

    }

    #[derive(AnchorDiscriminator, AnchorSerialize, AnchorDeserialize)]
    pub struct PerpsRemoveLiquidity {

    }

    #[derive(AnchorDiscriminator, AnchorSerialize, AnchorDeserialize)]
    pub struct MeteoraDlmmSwap {

    }

    #[derive(AnchorDiscriminator, AnchorSerialize, AnchorDeserialize)]
    pub struct OpenBookV2Swap {

    }

    #[derive(AnchorDiscriminator, AnchorSerialize, AnchorDeserialize)]
    pub struct CloneSwap {

    }

    #[derive(AnchorDiscriminator, AnchorSerialize, AnchorDeserialize)]
    pub struct RaydiumCpSwap {

    }

    #[derive(AnchorDiscriminator, AnchorSerialize, AnchorDeserialize)]
    pub struct OneIntroSwap {

    }

    #[derive(AnchorDiscriminator, AnchorSerialize, AnchorDeserialize)]
    pub struct PumpdotfunWrappedBuy {

    }

    #[derive(AnchorDiscriminator, AnchorSerialize, AnchorDeserialize)]
    pub struct PumpdotfunWrappedSell {

    }

    #[derive(AnchorDiscriminator, AnchorSerialize, AnchorDeserialize)]
    pub struct PerpsV2Swap {

    }

    #[derive(AnchorDiscriminator, AnchorSerialize, AnchorDeserialize)]
    pub struct PerpsV2AddLiquidity {

    }

    #[derive(AnchorDiscriminator, AnchorSerialize, AnchorDeserialize)]
    pub struct PerpsV2RemoveLiquidity {

    }

    #[derive(AnchorDiscriminator, AnchorSerialize, AnchorDeserialize)]
    pub struct MoonshotWrappedBuy {

    }

    #[derive(AnchorDiscriminator, AnchorSerialize, AnchorDeserialize)]
    pub struct MoonshotWrappedSell {

    }

    #[derive(AnchorDiscriminator, AnchorSerialize, AnchorDeserialize)]
    pub struct StabbleStableSwap {

    }

    #[derive(AnchorDiscriminator, AnchorSerialize, AnchorDeserialize)]
    pub struct StabbleWeightedSwap {

    }

    #[derive(AnchorDiscriminator, AnchorSerialize, AnchorDeserialize)]
    pub struct ObricSwap {

    }

    #[derive(AnchorDiscriminator, AnchorSerialize, AnchorDeserialize)]
    pub struct FoxBuyFromEstimatedCost {

    }

    #[derive(AnchorDiscriminator, AnchorSerialize, AnchorDeserialize)]
    pub struct FoxClaimPartial {

    }

    #[derive(AnchorDiscriminator, AnchorSerialize, AnchorDeserialize)]
    pub struct SolFiSwap {

    }        
}

// Accounts
pub mod accounts {
    #![allow(unused)]
    use super::*;

   #[account]
    pub struct TokenLedger {
        pub token_account: Pubkey,
        pub amount: u64
    }  
}
        
// Defined types
#[derive(Clone, AnchorSerialize, AnchorDeserialize)]
pub struct AmountWithSlippage {
    pub amount: u64,
    pub slippage_bps: u16,
}

#[derive(Clone, AnchorSerialize, AnchorDeserialize)]
pub struct RoutePlanStep {
    pub swap: Swap,
    pub percent: u8,
    pub input_index: u8,
    pub output_index: u8,
}

#[derive(Clone, AnchorSerialize, AnchorDeserialize, Copy, PartialEq, Eq)]
pub enum Side {
    Bid,
    Ask
}

#[derive(Clone, AnchorSerialize, AnchorDeserialize, Copy, PartialEq, Eq)]
pub enum Swap {
    Saber,
    SaberAddDecimalsDeposit,
    SaberAddDecimalsWithdraw,
    TokenSwap,
    Sencha,
    Step,
    Cropper,
    Raydium,
    Crema,
    Lifinity,
    Mercurial,
    Cykura,
    Serum,
    MarinadeDeposit,
    MarinadeUnstake,
    Aldrin,
    AldrinV2,
    Whirlpool,
    Invariant,
    Meteora,
    GooseFx,
    DeltaFi,
    Balansol,
    MarcoPolo,
    Dradex,
    LifinityV2,
    RaydiumClmm,
    Openbook,
    Phoenix,
    Symmetry,
    TokenSwapV2,
    HeliumTreasuryManagementRedeemV0,
    StakeDexStakeWrappedSol,
    StakeDexSwapViaStake,
    GooseFxv2,
    Perps,
    PerpsAddLiquidity,
    PerpsRemoveLiquidity,
    MeteoraDlmm,
    OpenBookV2,
    RaydiumClmmV2,
    StakeDexPrefundWithdrawStakeAndDepositStake,
    Clone,
    SanctumS,
    SanctumSAddLiquidity,
    SanctumSRemoveLiquidity,
    RaydiumCp,
    WhirlpoolSwapV2,
    OneIntro,
    PumpdotfunWrappedBuy,
    PumpdotfunWrappedSell,
    PerpsV2,
    PerpsV2AddLiquidity,
    PerpsV2RemoveLiquidity,
    MoonshotWrappedBuy,
    MoonshotWrappedSell,
    StabbleStableSwap,
    StabbleWeightedSwap,
    Obric,
    FoxBuyFromEstimatedCost,
    FoxClaimPartial,
    SolFi
}

#[derive(Clone, AnchorSerialize, AnchorDeserialize)]
pub struct RemainingAccountsSlice {
    pub accounts_type: AccountsType,
    pub length: u8,
}

#[derive(Clone, AnchorSerialize, AnchorDeserialize)]
pub struct RemainingAccountsInfo {
    pub slices: Vec<RemainingAccountsSlice>,
}

#[derive(Clone, AnchorSerialize, AnchorDeserialize, Copy, PartialEq, Eq)]
pub enum AccountsType {
    TransferHookA,
    TransferHookB
}