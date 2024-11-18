use anchor_lang::prelude::*;

declare_id!("JUP6LkbZbjS1jKKwapdHNy74zcZ3tLUZoi5QNyVTaV4");

// Accounts
#[derive(Accounts)]
pub struct Route<'info> {
    /// CHECK: Skip check
    pub token_program: AccountInfo<'info>,
    #[account(mut, signer)]
    /// CHECK: Skip check
    pub user_transfer_authority: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub user_source_token_account: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub user_destination_token_account: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub destination_token_account: Option<AccountInfo<'info>>,
    /// CHECK: Skip check
    pub destination_mint: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub platform_fee_account: Option<AccountInfo<'info>>,
    /// CHECK: Skip check
    pub event_authority: AccountInfo<'info>,
    /// CHECK: Skip check
    pub program: AccountInfo<'info>,
}

#[derive(Accounts)]
pub struct RouteWithTokenLedger<'info> {
    /// CHECK: Skip check
    pub token_program: AccountInfo<'info>,
    #[account(mut, signer)]
    /// CHECK: Skip check
    pub user_transfer_authority: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub user_source_token_account: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub user_destination_token_account: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub destination_token_account: Option<AccountInfo<'info>>,
    /// CHECK: Skip check
    pub destination_mint: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub platform_fee_account: Option<AccountInfo<'info>>,
    /// CHECK: Skip check
    pub token_ledger: AccountInfo<'info>,
    /// CHECK: Skip check
    pub event_authority: AccountInfo<'info>,
    /// CHECK: Skip check
    pub program: AccountInfo<'info>,
}

#[derive(Accounts)]
pub struct ExactOutRoute<'info> {
    /// CHECK: Skip check
    pub token_program: AccountInfo<'info>,
    #[account(mut, signer)]
    /// CHECK: Skip check
    pub user_transfer_authority: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub user_source_token_account: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub user_destination_token_account: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub destination_token_account: Option<AccountInfo<'info>>,
    /// CHECK: Skip check
    pub source_mint: AccountInfo<'info>,
    /// CHECK: Skip check
    pub destination_mint: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub platform_fee_account: Option<AccountInfo<'info>>,
    /// CHECK: Skip check
    pub token_2022_program: Option<AccountInfo<'info>>,
    /// CHECK: Skip check
    pub event_authority: AccountInfo<'info>,
    /// CHECK: Skip check
    pub program: AccountInfo<'info>,
}

#[derive(Accounts)]
pub struct SharedAccountsRoute<'info> {
    /// CHECK: Skip check
    pub token_program: AccountInfo<'info>,
    /// CHECK: Skip check
    pub program_authority: AccountInfo<'info>,
    #[account(mut, signer)]
    /// CHECK: Skip check
    pub user_transfer_authority: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub source_token_account: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub program_source_token_account: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub program_destination_token_account: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub destination_token_account: AccountInfo<'info>,
    /// CHECK: Skip check
    pub source_mint: AccountInfo<'info>,
    /// CHECK: Skip check
    pub destination_mint: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub platform_fee_account: Option<AccountInfo<'info>>,
    /// CHECK: Skip check
    pub token_2022_program: Option<AccountInfo<'info>>,
    /// CHECK: Skip check
    pub event_authority: AccountInfo<'info>,
    /// CHECK: Skip check
    pub program: AccountInfo<'info>,
}

#[derive(Accounts)]
pub struct SharedAccountsRouteWithTokenLedger<'info> {
    /// CHECK: Skip check
    pub token_program: AccountInfo<'info>,
    /// CHECK: Skip check
    pub program_authority: AccountInfo<'info>,
    #[account(mut, signer)]
    /// CHECK: Skip check
    pub user_transfer_authority: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub source_token_account: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub program_source_token_account: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub program_destination_token_account: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub destination_token_account: AccountInfo<'info>,
    /// CHECK: Skip check
    pub source_mint: AccountInfo<'info>,
    /// CHECK: Skip check
    pub destination_mint: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub platform_fee_account: Option<AccountInfo<'info>>,
    /// CHECK: Skip check
    pub token_2022_program: Option<AccountInfo<'info>>,
    /// CHECK: Skip check
    pub token_ledger: AccountInfo<'info>,
    /// CHECK: Skip check
    pub event_authority: AccountInfo<'info>,
    /// CHECK: Skip check
    pub program: AccountInfo<'info>,
}

#[derive(Accounts)]
pub struct SharedAccountsExactOutRoute<'info> {
    /// CHECK: Skip check
    pub token_program: AccountInfo<'info>,
    /// CHECK: Skip check
    pub program_authority: AccountInfo<'info>,
    #[account(mut, signer)]
    /// CHECK: Skip check
    pub user_transfer_authority: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub source_token_account: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub program_source_token_account: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub program_destination_token_account: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub destination_token_account: AccountInfo<'info>,
    /// CHECK: Skip check
    pub source_mint: AccountInfo<'info>,
    /// CHECK: Skip check
    pub destination_mint: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub platform_fee_account: Option<AccountInfo<'info>>,
    /// CHECK: Skip check
    pub token_2022_program: Option<AccountInfo<'info>>,
    /// CHECK: Skip check
    pub event_authority: AccountInfo<'info>,
    /// CHECK: Skip check
    pub program: AccountInfo<'info>,
}

#[derive(Accounts)]
pub struct SetTokenLedger<'info> {
    #[account(mut)]
    /// CHECK: Skip check
    pub token_ledger: AccountInfo<'info>,
    /// CHECK: Skip check
    pub token_account: AccountInfo<'info>,
}

#[derive(Accounts)]
pub struct CreateOpenOrders<'info> {
    #[account(mut)]
    /// CHECK: Skip check
    pub open_orders: AccountInfo<'info>,
    #[account(mut, signer)]
    /// CHECK: Skip check
    pub payer: AccountInfo<'info>,
    /// CHECK: Skip check
    pub dex_program: AccountInfo<'info>,
    /// CHECK: Skip check
    pub system_program: AccountInfo<'info>,
    /// CHECK: Skip check
    pub rent: AccountInfo<'info>,
    /// CHECK: Skip check
    pub market: AccountInfo<'info>,
}

#[derive(Accounts)]
pub struct CreateTokenAccount<'info> {
    #[account(mut)]
    /// CHECK: Skip check
    pub token_account: AccountInfo<'info>,
    #[account(mut, signer)]
    /// CHECK: Skip check
    pub user: AccountInfo<'info>,
    /// CHECK: Skip check
    pub mint: AccountInfo<'info>,
    /// CHECK: Skip check
    pub token_program: AccountInfo<'info>,
    /// CHECK: Skip check
    pub system_program: AccountInfo<'info>,
}

#[derive(Accounts)]
pub struct CreateProgramOpenOrders<'info> {
    #[account(mut)]
    /// CHECK: Skip check
    pub open_orders: AccountInfo<'info>,
    #[account(mut, signer)]
    /// CHECK: Skip check
    pub payer: AccountInfo<'info>,
    /// CHECK: Skip check
    pub program_authority: AccountInfo<'info>,
    /// CHECK: Skip check
    pub dex_program: AccountInfo<'info>,
    /// CHECK: Skip check
    pub system_program: AccountInfo<'info>,
    /// CHECK: Skip check
    pub rent: AccountInfo<'info>,
    /// CHECK: Skip check
    pub market: AccountInfo<'info>,
}

#[derive(Accounts)]
pub struct Claim<'info> {
    #[account(mut)]
    /// CHECK: Skip check
    pub wallet: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub program_authority: AccountInfo<'info>,
    /// CHECK: Skip check
    pub system_program: AccountInfo<'info>,
}

#[derive(Accounts)]
pub struct ClaimToken<'info> {
    #[account(mut, signer)]
    /// CHECK: Skip check
    pub payer: AccountInfo<'info>,
    /// CHECK: Skip check
    pub wallet: AccountInfo<'info>,
    /// CHECK: Skip check
    pub program_authority: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub program_token_account: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub destination_token_account: AccountInfo<'info>,
    /// CHECK: Skip check
    pub mint: AccountInfo<'info>,
    /// CHECK: Skip check
    pub associated_token_token_program: AccountInfo<'info>,
    /// CHECK: Skip check
    pub associated_token_program: AccountInfo<'info>,
    /// CHECK: Skip check
    pub system_program: AccountInfo<'info>,
}

#[derive(Accounts)]
pub struct CreateTokenLedger<'info> {
    #[account(mut, signer)]
    /// CHECK: Skip check
    pub token_ledger: AccountInfo<'info>,
    #[account(mut, signer)]
    /// CHECK: Skip check
    pub payer: AccountInfo<'info>,
    /// CHECK: Skip check
    pub system_program: AccountInfo<'info>,
}

#[derive(Accounts)]
pub struct MercurialSwap<'info> {
    /// CHECK: Skip check
    pub swap_program: AccountInfo<'info>,
    /// CHECK: Skip check
    pub swap_state: AccountInfo<'info>,
    /// CHECK: Skip check
    pub token_program: AccountInfo<'info>,
    /// CHECK: Skip check
    pub pool_authority: AccountInfo<'info>,
    /// CHECK: Skip check
    pub user_transfer_authority: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub source_token_account: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub destination_token_account: AccountInfo<'info>,
}

#[derive(Accounts)]
pub struct CykuraSwap<'info> {
    /// CHECK: Skip check
    pub swap_program: AccountInfo<'info>,
    /// CHECK: Skip check
    pub signer: AccountInfo<'info>,
    /// CHECK: Skip check
    pub factory_state: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub pool_state: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub input_token_account: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub output_token_account: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub input_vault: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub output_vault: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub last_observation_state: AccountInfo<'info>,
    /// CHECK: Skip check
    pub core_program: AccountInfo<'info>,
    /// CHECK: Skip check
    pub token_program: AccountInfo<'info>,
}

#[derive(Accounts)]
pub struct SerumSwap<'info> {
    /// CHECK: Skip check
    pub market: AccountInfo<'info>,
    /// CHECK: Skip check
    pub authority: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub order_payer_token_account: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub coin_wallet: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub pc_wallet: AccountInfo<'info>,
    /// CHECK: Skip check
    pub dex_program: AccountInfo<'info>,
    /// CHECK: Skip check
    pub token_program: AccountInfo<'info>,
    /// CHECK: Skip check
    pub rent: AccountInfo<'info>,
}

#[derive(Accounts)]
pub struct SaberSwap<'info> {
    /// CHECK: Skip check
    pub swap_program: AccountInfo<'info>,
    /// CHECK: Skip check
    pub token_program: AccountInfo<'info>,
    /// CHECK: Skip check
    pub swap: AccountInfo<'info>,
    /// CHECK: Skip check
    pub swap_authority: AccountInfo<'info>,
    /// CHECK: Skip check
    pub user_authority: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub input_user_account: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub input_token_account: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub output_user_account: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub output_token_account: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub fees_token_account: AccountInfo<'info>,
}

#[derive(Accounts)]
pub struct SaberAddDecimals<'info> {
    /// CHECK: Skip check
    pub add_decimals_program: AccountInfo<'info>,
    /// CHECK: Skip check
    pub wrapper: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub wrapper_mint: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub wrapper_underlying_tokens: AccountInfo<'info>,
    /// CHECK: Skip check
    pub owner: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub user_underlying_tokens: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub user_wrapped_tokens: AccountInfo<'info>,
    /// CHECK: Skip check
    pub token_program: AccountInfo<'info>,
}

#[derive(Accounts)]
pub struct TokenSwap<'info> {
    /// CHECK: Skip check
    pub token_swap_program: AccountInfo<'info>,
    /// CHECK: Skip check
    pub token_program: AccountInfo<'info>,
    /// CHECK: Skip check
    pub swap: AccountInfo<'info>,
    /// CHECK: Skip check
    pub authority: AccountInfo<'info>,
    /// CHECK: Skip check
    pub user_transfer_authority: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub source: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub swap_source: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub swap_destination: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub destination: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub pool_mint: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub pool_fee: AccountInfo<'info>,
}

#[derive(Accounts)]
pub struct TokenSwapV2<'info> {
    /// CHECK: Skip check
    pub swap_program: AccountInfo<'info>,
    /// CHECK: Skip check
    pub swap: AccountInfo<'info>,
    /// CHECK: Skip check
    pub authority: AccountInfo<'info>,
    /// CHECK: Skip check
    pub user_transfer_authority: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub source: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub swap_source: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub swap_destination: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub destination: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub pool_mint: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub pool_fee: AccountInfo<'info>,
    /// CHECK: Skip check
    pub source_mint: AccountInfo<'info>,
    /// CHECK: Skip check
    pub destination_mint: AccountInfo<'info>,
    /// CHECK: Skip check
    pub source_token_program: AccountInfo<'info>,
    /// CHECK: Skip check
    pub destination_token_program: AccountInfo<'info>,
    /// CHECK: Skip check
    pub pool_token_program: AccountInfo<'info>,
}

#[derive(Accounts)]
pub struct SenchaSwap<'info> {
    /// CHECK: Skip check
    pub swap_program: AccountInfo<'info>,
    /// CHECK: Skip check
    pub token_program: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub swap: AccountInfo<'info>,
    /// CHECK: Skip check
    pub user_authority: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub input_user_account: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub input_token_account: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub input_fees_account: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub output_user_account: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub output_token_account: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub output_fees_account: AccountInfo<'info>,
}

#[derive(Accounts)]
pub struct StepSwap<'info> {
    /// CHECK: Skip check
    pub token_swap_program: AccountInfo<'info>,
    /// CHECK: Skip check
    pub token_program: AccountInfo<'info>,
    /// CHECK: Skip check
    pub swap: AccountInfo<'info>,
    /// CHECK: Skip check
    pub authority: AccountInfo<'info>,
    /// CHECK: Skip check
    pub user_transfer_authority: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub source: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub swap_source: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub swap_destination: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub destination: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub pool_mint: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub pool_fee: AccountInfo<'info>,
}

#[derive(Accounts)]
pub struct CropperSwap<'info> {
    /// CHECK: Skip check
    pub token_swap_program: AccountInfo<'info>,
    /// CHECK: Skip check
    pub token_program: AccountInfo<'info>,
    /// CHECK: Skip check
    pub swap: AccountInfo<'info>,
    /// CHECK: Skip check
    pub swap_state: AccountInfo<'info>,
    /// CHECK: Skip check
    pub authority: AccountInfo<'info>,
    /// CHECK: Skip check
    pub user_transfer_authority: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub source: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub swap_source: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub swap_destination: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub destination: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub pool_mint: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub pool_fee: AccountInfo<'info>,
}

#[derive(Accounts)]
pub struct RaydiumSwap<'info> {
    /// CHECK: Skip check
    pub swap_program: AccountInfo<'info>,
    /// CHECK: Skip check
    pub token_program: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub amm_id: AccountInfo<'info>,
    /// CHECK: Skip check
    pub amm_authority: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub amm_open_orders: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub pool_coin_token_account: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub pool_pc_token_account: AccountInfo<'info>,
    /// CHECK: Skip check
    pub serum_program_id: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub serum_market: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub serum_bids: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub serum_asks: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub serum_event_queue: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub serum_coin_vault_account: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub serum_pc_vault_account: AccountInfo<'info>,
    /// CHECK: Skip check
    pub serum_vault_signer: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub user_source_token_account: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub user_destination_token_account: AccountInfo<'info>,
    /// CHECK: Skip check
    pub user_source_owner: AccountInfo<'info>,
}

#[derive(Accounts)]
pub struct CremaSwap<'info> {
    /// CHECK: Skip check
    pub swap_program: AccountInfo<'info>,
    /// CHECK: Skip check
    pub clmm_config: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub clmmpool: AccountInfo<'info>,
    /// CHECK: Skip check
    pub token_a: AccountInfo<'info>,
    /// CHECK: Skip check
    pub token_b: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub account_a: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub account_b: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub token_a_vault: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub token_b_vault: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub tick_array_map: AccountInfo<'info>,
    /// CHECK: Skip check
    pub owner: AccountInfo<'info>,
    /// CHECK: Skip check
    pub partner: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub partner_ata_a: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub partner_ata_b: AccountInfo<'info>,
    /// CHECK: Skip check
    pub token_program: AccountInfo<'info>,
}

#[derive(Accounts)]
pub struct LifinitySwap<'info> {
    /// CHECK: Skip check
    pub swap_program: AccountInfo<'info>,
    /// CHECK: Skip check
    pub authority: AccountInfo<'info>,
    /// CHECK: Skip check
    pub amm: AccountInfo<'info>,
    /// CHECK: Skip check
    pub user_transfer_authority: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub source_info: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub destination_info: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub swap_source: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub swap_destination: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub pool_mint: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub fee_account: AccountInfo<'info>,
    /// CHECK: Skip check
    pub token_program: AccountInfo<'info>,
    /// CHECK: Skip check
    pub pyth_account: AccountInfo<'info>,
    /// CHECK: Skip check
    pub pyth_pc_account: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub config_account: AccountInfo<'info>,
}

#[derive(Accounts)]
pub struct MarinadeDeposit<'info> {
    /// CHECK: Skip check
    pub marinade_finance_program: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub state: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub msol_mint: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub liq_pool_sol_leg_pda: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub liq_pool_msol_leg: AccountInfo<'info>,
    /// CHECK: Skip check
    pub liq_pool_msol_leg_authority: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub reserve_pda: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub transfer_from: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub mint_to: AccountInfo<'info>,
    /// CHECK: Skip check
    pub msol_mint_authority: AccountInfo<'info>,
    /// CHECK: Skip check
    pub system_program: AccountInfo<'info>,
    /// CHECK: Skip check
    pub token_program: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub user_wsol_token_account: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub temp_wsol_token_account: AccountInfo<'info>,
    /// CHECK: Skip check
    pub user_transfer_authority: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub payer: AccountInfo<'info>,
    /// CHECK: Skip check
    pub wsol_mint: AccountInfo<'info>,
    /// CHECK: Skip check
    pub rent: AccountInfo<'info>,
}

#[derive(Accounts)]
pub struct MarinadeUnstake<'info> {
    /// CHECK: Skip check
    pub marinade_finance_program: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub state: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub msol_mint: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub liq_pool_sol_leg_pda: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub liq_pool_msol_leg: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub treasury_msol_account: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub get_msol_from: AccountInfo<'info>,
    /// CHECK: Skip check
    pub get_msol_from_authority: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub transfer_sol_to: AccountInfo<'info>,
    /// CHECK: Skip check
    pub system_program: AccountInfo<'info>,
    /// CHECK: Skip check
    pub token_program: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub user_wsol_token_account: AccountInfo<'info>,
}

#[derive(Accounts)]
pub struct AldrinSwap<'info> {
    /// CHECK: Skip check
    pub swap_program: AccountInfo<'info>,
    /// CHECK: Skip check
    pub pool: AccountInfo<'info>,
    /// CHECK: Skip check
    pub pool_signer: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub pool_mint: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub base_token_vault: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub quote_token_vault: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub fee_pool_token_account: AccountInfo<'info>,
    /// CHECK: Skip check
    pub wallet_authority: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub user_base_token_account: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub user_quote_token_account: AccountInfo<'info>,
    /// CHECK: Skip check
    pub token_program: AccountInfo<'info>,
}

#[derive(Accounts)]
pub struct AldrinV2Swap<'info> {
    /// CHECK: Skip check
    pub swap_program: AccountInfo<'info>,
    /// CHECK: Skip check
    pub pool: AccountInfo<'info>,
    /// CHECK: Skip check
    pub pool_signer: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub pool_mint: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub base_token_vault: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub quote_token_vault: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub fee_pool_token_account: AccountInfo<'info>,
    /// CHECK: Skip check
    pub wallet_authority: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub user_base_token_account: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub user_quote_token_account: AccountInfo<'info>,
    /// CHECK: Skip check
    pub curve: AccountInfo<'info>,
    /// CHECK: Skip check
    pub token_program: AccountInfo<'info>,
}

#[derive(Accounts)]
pub struct WhirlpoolSwap<'info> {
    /// CHECK: Skip check
    pub swap_program: AccountInfo<'info>,
    /// CHECK: Skip check
    pub token_program: AccountInfo<'info>,
    /// CHECK: Skip check
    pub token_authority: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub whirlpool: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub token_owner_account_a: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub token_vault_a: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub token_owner_account_b: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub token_vault_b: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub tick_array_0: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub tick_array_1: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub tick_array_2: AccountInfo<'info>,
    /// CHECK: Skip check
    pub oracle: AccountInfo<'info>,
}

#[derive(Accounts)]
pub struct WhirlpoolSwapV2<'info> {
    /// CHECK: Skip check
    pub swap_program: AccountInfo<'info>,
    /// CHECK: Skip check
    pub token_program_a: AccountInfo<'info>,
    /// CHECK: Skip check
    pub token_program_b: AccountInfo<'info>,
    /// CHECK: Skip check
    pub memo_program: AccountInfo<'info>,
    /// CHECK: Skip check
    pub token_authority: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub whirlpool: AccountInfo<'info>,
    /// CHECK: Skip check
    pub token_mint_a: AccountInfo<'info>,
    /// CHECK: Skip check
    pub token_mint_b: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub token_owner_account_a: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub token_vault_a: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub token_owner_account_b: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub token_vault_b: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub tick_array_0: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub tick_array_1: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub tick_array_2: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub oracle: AccountInfo<'info>,
}

#[derive(Accounts)]
pub struct InvariantSwap<'info> {
    /// CHECK: Skip check
    pub swap_program: AccountInfo<'info>,
    /// CHECK: Skip check
    pub state: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub pool: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub tickmap: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub account_x: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub account_y: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub reserve_x: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub reserve_y: AccountInfo<'info>,
    /// CHECK: Skip check
    pub owner: AccountInfo<'info>,
    /// CHECK: Skip check
    pub program_authority: AccountInfo<'info>,
    /// CHECK: Skip check
    pub token_program: AccountInfo<'info>,
}

#[derive(Accounts)]
pub struct MeteoraSwap<'info> {
    /// CHECK: Skip check
    pub swap_program: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub pool: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub user_source_token: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub user_destination_token: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub a_vault: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub b_vault: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub a_token_vault: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub b_token_vault: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub a_vault_lp_mint: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub b_vault_lp_mint: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub a_vault_lp: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub b_vault_lp: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub admin_token_fee: AccountInfo<'info>,
    /// CHECK: Skip check
    pub user: AccountInfo<'info>,
    /// CHECK: Skip check
    pub vault_program: AccountInfo<'info>,
    /// CHECK: Skip check
    pub token_program: AccountInfo<'info>,
}

#[derive(Accounts)]
pub struct GoosefxSwap<'info> {
    /// CHECK: Skip check
    pub swap_program: AccountInfo<'info>,
    /// CHECK: Skip check
    pub controller: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub pair: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub ssl_in: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub ssl_out: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub liability_vault_in: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub swapped_liability_vault_in: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub liability_vault_out: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub swapped_liability_vault_out: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub user_in_ata: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub user_out_ata: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub fee_collector_ata: AccountInfo<'info>,
    /// CHECK: Skip check
    pub user_wallet: AccountInfo<'info>,
    /// CHECK: Skip check
    pub fee_collector: AccountInfo<'info>,
    /// CHECK: Skip check
    pub token_program: AccountInfo<'info>,
}

#[derive(Accounts)]
pub struct DeltafiSwap<'info> {
    /// CHECK: Skip check
    pub swap_program: AccountInfo<'info>,
    /// CHECK: Skip check
    pub market_config: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub swap_info: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub user_source_token: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub user_destination_token: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub swap_source_token: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub swap_destination_token: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub deltafi_user: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub admin_destination_token: AccountInfo<'info>,
    /// CHECK: Skip check
    pub pyth_price_base: AccountInfo<'info>,
    /// CHECK: Skip check
    pub pyth_price_quote: AccountInfo<'info>,
    /// CHECK: Skip check
    pub user_authority: AccountInfo<'info>,
    /// CHECK: Skip check
    pub token_program: AccountInfo<'info>,
}

#[derive(Accounts)]
pub struct BalansolSwap<'info> {
    /// CHECK: Skip check
    pub swap_program: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub authority: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub pool: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub tax_man: AccountInfo<'info>,
    /// CHECK: Skip check
    pub bid_mint: AccountInfo<'info>,
    /// CHECK: Skip check
    pub treasurer: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub src_treasury: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub src_associated_token_account: AccountInfo<'info>,
    /// CHECK: Skip check
    pub ask_mint: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub dst_treasury: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub dst_associated_token_account: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub dst_token_account_taxman: AccountInfo<'info>,
    /// CHECK: Skip check
    pub system_program: AccountInfo<'info>,
    /// CHECK: Skip check
    pub token_program: AccountInfo<'info>,
    /// CHECK: Skip check
    pub associated_token_program: AccountInfo<'info>,
    /// CHECK: Skip check
    pub rent: AccountInfo<'info>,
}

#[derive(Accounts)]
pub struct MarcoPoloSwap<'info> {
    /// CHECK: Skip check
    pub swap_program: AccountInfo<'info>,
    /// CHECK: Skip check
    pub state: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub pool: AccountInfo<'info>,
    /// CHECK: Skip check
    pub token_x: AccountInfo<'info>,
    /// CHECK: Skip check
    pub token_y: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub pool_x_account: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub pool_y_account: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub swapper_x_account: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub swapper_y_account: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub swapper: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub referrer_x_account: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub referrer_y_account: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub referrer: AccountInfo<'info>,
    /// CHECK: Skip check
    pub program_authority: AccountInfo<'info>,
    /// CHECK: Skip check
    pub system_program: AccountInfo<'info>,
    /// CHECK: Skip check
    pub token_program: AccountInfo<'info>,
    /// CHECK: Skip check
    pub associated_token_program: AccountInfo<'info>,
    /// CHECK: Skip check
    pub rent: AccountInfo<'info>,
}

#[derive(Accounts)]
pub struct DradexSwap<'info> {
    /// CHECK: Skip check
    pub swap_program: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub pair: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub market: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub event_queue: AccountInfo<'info>,
    /// CHECK: Skip check
    pub dex_user: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub market_user: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub bids: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub asks: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub t_0_vault: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub t_1_vault: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub t_0_user: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub t_1_user: AccountInfo<'info>,
    /// CHECK: Skip check
    pub master: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub signer: AccountInfo<'info>,
    /// CHECK: Skip check
    pub system_program: AccountInfo<'info>,
    /// CHECK: Skip check
    pub token_program: AccountInfo<'info>,
    /// CHECK: Skip check
    pub logger: AccountInfo<'info>,
}

#[derive(Accounts)]
pub struct LifinityV2Swap<'info> {
    /// CHECK: Skip check
    pub swap_program: AccountInfo<'info>,
    /// CHECK: Skip check
    pub authority: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub amm: AccountInfo<'info>,
    /// CHECK: Skip check
    pub user_transfer_authority: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub source_info: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub destination_info: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub swap_source: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub swap_destination: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub pool_mint: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub fee_account: AccountInfo<'info>,
    /// CHECK: Skip check
    pub token_program: AccountInfo<'info>,
    /// CHECK: Skip check
    pub oracle_main_account: AccountInfo<'info>,
    /// CHECK: Skip check
    pub oracle_sub_account: AccountInfo<'info>,
    /// CHECK: Skip check
    pub oracle_pc_account: AccountInfo<'info>,
}

#[derive(Accounts)]
pub struct RaydiumClmmSwap<'info> {
    /// CHECK: Skip check
    pub swap_program: AccountInfo<'info>,
    /// CHECK: Skip check
    pub payer: AccountInfo<'info>,
    /// CHECK: Skip check
    pub amm_config: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub pool_state: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub input_token_account: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub output_token_account: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub input_vault: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub output_vault: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub observation_state: AccountInfo<'info>,
    /// CHECK: Skip check
    pub token_program: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub tick_array: AccountInfo<'info>,
}

#[derive(Accounts)]
pub struct RaydiumClmmSwapV2<'info> {
    /// CHECK: Skip check
    pub swap_program: AccountInfo<'info>,
    /// CHECK: Skip check
    pub payer: AccountInfo<'info>,
    /// CHECK: Skip check
    pub amm_config: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub pool_state: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub input_token_account: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub output_token_account: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub input_vault: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub output_vault: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub observation_state: AccountInfo<'info>,
    /// CHECK: Skip check
    pub token_program: AccountInfo<'info>,
    /// CHECK: Skip check
    pub token_program_2022: AccountInfo<'info>,
    /// CHECK: Skip check
    pub memo_program: AccountInfo<'info>,
    /// CHECK: Skip check
    pub input_vault_mint: AccountInfo<'info>,
    /// CHECK: Skip check
    pub output_vault_mint: AccountInfo<'info>,
}

#[derive(Accounts)]
pub struct PhoenixSwap<'info> {
    /// CHECK: Skip check
    pub swap_program: AccountInfo<'info>,
    /// CHECK: Skip check
    pub log_authority: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub market: AccountInfo<'info>,
    /// CHECK: Skip check
    pub trader: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub base_account: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub quote_account: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub base_vault: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub quote_vault: AccountInfo<'info>,
    /// CHECK: Skip check
    pub token_program: AccountInfo<'info>,
}

#[derive(Accounts)]
pub struct SymmetrySwap<'info> {
    /// CHECK: Skip check
    pub swap_program: AccountInfo<'info>,
    /// CHECK: Skip check
    pub buyer: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub fund_state: AccountInfo<'info>,
    /// CHECK: Skip check
    pub pda_account: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub pda_from_token_account: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub buyer_from_token_account: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub pda_to_token_account: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub buyer_to_token_account: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub swap_fee_account: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub host_fee_account: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub manager_fee_account: AccountInfo<'info>,
    /// CHECK: Skip check
    pub token_list: AccountInfo<'info>,
    /// CHECK: Skip check
    pub prism_data: AccountInfo<'info>,
    /// CHECK: Skip check
    pub token_program: AccountInfo<'info>,
}

#[derive(Accounts)]
pub struct HeliumTreasuryManagementRedeemV0<'info> {
    /// CHECK: Skip check
    pub swap_program: AccountInfo<'info>,
    /// CHECK: Skip check
    pub treasury_management: AccountInfo<'info>,
    /// CHECK: Skip check
    pub treasury_mint: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub supply_mint: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub treasury: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub circuit_breaker: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub from: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub to: AccountInfo<'info>,
    /// CHECK: Skip check
    pub owner: AccountInfo<'info>,
    /// CHECK: Skip check
    pub circuit_breaker_program: AccountInfo<'info>,
    /// CHECK: Skip check
    pub token_program: AccountInfo<'info>,
}

#[derive(Accounts)]
pub struct GoosefxV2Swap<'info> {
    /// CHECK: Skip check
    pub swap_program: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub pair: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub pool_registry: AccountInfo<'info>,
    /// CHECK: Skip check
    pub user_wallet: AccountInfo<'info>,
    /// CHECK: Skip check
    pub ssl_pool_in_signer: AccountInfo<'info>,
    /// CHECK: Skip check
    pub ssl_pool_out_signer: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub user_ata_in: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub user_ata_out: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub ssl_out_main_vault: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub ssl_out_secondary_vault: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub ssl_in_main_vault: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub ssl_in_secondary_vault: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub ssl_out_fee_vault: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub fee_destination: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub output_token_price_history: AccountInfo<'info>,
    /// CHECK: Skip check
    pub output_token_oracle: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub input_token_price_history: AccountInfo<'info>,
    /// CHECK: Skip check
    pub input_token_oracle: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub event_emitter: AccountInfo<'info>,
    /// CHECK: Skip check
    pub token_program: AccountInfo<'info>,
}

#[derive(Accounts)]
pub struct PerpsSwap<'info> {
    /// CHECK: Skip check
    pub swap_program: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub owner: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub funding_account: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub receiving_account: AccountInfo<'info>,
    /// CHECK: Skip check
    pub transfer_authority: AccountInfo<'info>,
    /// CHECK: Skip check
    pub perpetuals: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub pool: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub receiving_custody: AccountInfo<'info>,
    /// CHECK: Skip check
    pub receiving_custody_oracle_account: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub receiving_custody_token_account: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub dispensing_custody: AccountInfo<'info>,
    /// CHECK: Skip check
    pub dispensing_custody_oracle_account: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub dispensing_custody_token_account: AccountInfo<'info>,
    /// CHECK: Skip check
    pub token_program: AccountInfo<'info>,
    /// CHECK: Skip check
    pub event_authority: AccountInfo<'info>,
    /// CHECK: Skip check
    pub program: AccountInfo<'info>,
}

#[derive(Accounts)]
pub struct PerpsAddLiquidity<'info> {
    /// CHECK: Skip check
    pub swap_program: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub owner: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub funding_or_receiving_account: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub lp_token_account: AccountInfo<'info>,
    /// CHECK: Skip check
    pub transfer_authority: AccountInfo<'info>,
    /// CHECK: Skip check
    pub perpetuals: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub pool: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub custody: AccountInfo<'info>,
    /// CHECK: Skip check
    pub custody_oracle_account: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub custody_token_account: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub lp_token_mint: AccountInfo<'info>,
    /// CHECK: Skip check
    pub token_program: AccountInfo<'info>,
    /// CHECK: Skip check
    pub event_authority: AccountInfo<'info>,
    /// CHECK: Skip check
    pub program: AccountInfo<'info>,
}

#[derive(Accounts)]
pub struct PerpsRemoveLiquidity<'info> {
    /// CHECK: Skip check
    pub swap_program: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub owner: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub funding_or_receiving_account: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub lp_token_account: AccountInfo<'info>,
    /// CHECK: Skip check
    pub transfer_authority: AccountInfo<'info>,
    /// CHECK: Skip check
    pub perpetuals: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub pool: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub custody: AccountInfo<'info>,
    /// CHECK: Skip check
    pub custody_oracle_account: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub custody_token_account: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub lp_token_mint: AccountInfo<'info>,
    /// CHECK: Skip check
    pub token_program: AccountInfo<'info>,
    /// CHECK: Skip check
    pub event_authority: AccountInfo<'info>,
    /// CHECK: Skip check
    pub program: AccountInfo<'info>,
}

#[derive(Accounts)]
pub struct MeteoraDlmmSwap<'info> {
    /// CHECK: Skip check
    pub swap_program: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub lb_pair: AccountInfo<'info>,
    /// CHECK: Skip check
    pub bin_array_bitmap_extension: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub reserve_x: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub reserve_y: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub user_token_in: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub user_token_out: AccountInfo<'info>,
    /// CHECK: Skip check
    pub token_x_mint: AccountInfo<'info>,
    /// CHECK: Skip check
    pub token_y_mint: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub oracle: AccountInfo<'info>,
    /// CHECK: Skip check
    pub host_fee_in: AccountInfo<'info>,
    /// CHECK: Skip check
    pub user: AccountInfo<'info>,
    /// CHECK: Skip check
    pub token_x_program: AccountInfo<'info>,
    /// CHECK: Skip check
    pub token_y_program: AccountInfo<'info>,
    /// CHECK: Skip check
    pub event_authority: AccountInfo<'info>,
    /// CHECK: Skip check
    pub program: AccountInfo<'info>,
}

#[derive(Accounts)]
pub struct OpenBookV2Swap<'info> {
    /// CHECK: Skip check
    pub swap_program: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub signer: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub penalty_payer: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub market: AccountInfo<'info>,
    /// CHECK: Skip check
    pub market_authority: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub bids: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub asks: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub market_base_vault: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub market_quote_vault: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub event_heap: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub user_base_account: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub user_quote_account: AccountInfo<'info>,
    /// CHECK: Skip check
    pub oracle_a: AccountInfo<'info>,
    /// CHECK: Skip check
    pub oracle_b: AccountInfo<'info>,
    /// CHECK: Skip check
    pub token_program: AccountInfo<'info>,
    /// CHECK: Skip check
    pub system_program: AccountInfo<'info>,
    /// CHECK: Skip check
    pub open_orders_admin: AccountInfo<'info>,
}

#[derive(Accounts)]
pub struct CloneSwap<'info> {
    /// CHECK: Skip check
    pub swap_program: AccountInfo<'info>,
    /// CHECK: Skip check
    pub user: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub clone: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub pools: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub oracles: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub user_collateral_token_account: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub user_onasset_token_account: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub onasset_mint: AccountInfo<'info>,
    /// CHECK: Skip check
    pub collateral_mint: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub collateral_vault: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub treasury_onasset_token_account: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub treasury_collateral_token_account: AccountInfo<'info>,
    /// CHECK: Skip check
    pub token_program: AccountInfo<'info>,
    /// CHECK: Skip check
    pub clone_staking: AccountInfo<'info>,
    /// CHECK: Skip check
    pub user_staking_account: AccountInfo<'info>,
    /// CHECK: Skip check
    pub clone_staking_program: AccountInfo<'info>,
}

#[derive(Accounts)]
pub struct RaydiumCpSwap<'info> {
    /// CHECK: Skip check
    pub swap_program: AccountInfo<'info>,
    /// CHECK: Skip check
    pub payer: AccountInfo<'info>,
    /// CHECK: Skip check
    pub authority: AccountInfo<'info>,
    /// CHECK: Skip check
    pub amm_config: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub pool_state: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub input_token_account: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub output_token_account: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub input_vault: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub output_vault: AccountInfo<'info>,
    /// CHECK: Skip check
    pub input_token_program: AccountInfo<'info>,
    /// CHECK: Skip check
    pub output_token_program: AccountInfo<'info>,
    /// CHECK: Skip check
    pub input_token_mint: AccountInfo<'info>,
    /// CHECK: Skip check
    pub output_token_mint: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub observation_state: AccountInfo<'info>,
}

#[derive(Accounts)]
pub struct OneIntroSwap<'info> {
    /// CHECK: Skip check
    pub swap_program: AccountInfo<'info>,
    /// CHECK: Skip check
    pub metadata_state: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub pool_state: AccountInfo<'info>,
    /// CHECK: Skip check
    pub pool_auth_pda: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub pool_token_in_account: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub pool_token_out_account: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub user: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub user_token_in_account: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub user_token_out_account: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub metadata_swap_fee_account: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub referral_token_account: AccountInfo<'info>,
    /// CHECK: Skip check
    pub token_program: AccountInfo<'info>,
}

#[derive(Accounts)]
pub struct PumpdotfunWrappedBuy<'info> {
    /// CHECK: Skip check
    pub swap_program: AccountInfo<'info>,
    /// CHECK: Skip check
    pub global: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub fee_recipient: AccountInfo<'info>,
    /// CHECK: Skip check
    pub mint: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub bonding_curve: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub associated_bonding_curve: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub associated_user: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub user: AccountInfo<'info>,
    /// CHECK: Skip check
    pub system_program: AccountInfo<'info>,
    /// CHECK: Skip check
    pub token_program: AccountInfo<'info>,
    /// CHECK: Skip check
    pub rent: AccountInfo<'info>,
    /// CHECK: Skip check
    pub event_authority: AccountInfo<'info>,
    /// CHECK: Skip check
    pub program: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub user_wsol_token_account: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub temp_wsol_token_account: AccountInfo<'info>,
    /// CHECK: Skip check
    pub wsol_mint: AccountInfo<'info>,
}

#[derive(Accounts)]
pub struct PumpdotfunWrappedSell<'info> {
    /// CHECK: Skip check
    pub swap_program: AccountInfo<'info>,
    /// CHECK: Skip check
    pub global: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub fee_recipient: AccountInfo<'info>,
    /// CHECK: Skip check
    pub mint: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub bonding_curve: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub associated_bonding_curve: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub associated_user: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub user: AccountInfo<'info>,
    /// CHECK: Skip check
    pub system_program: AccountInfo<'info>,
    /// CHECK: Skip check
    pub associated_token_program: AccountInfo<'info>,
    /// CHECK: Skip check
    pub token_program: AccountInfo<'info>,
    /// CHECK: Skip check
    pub event_authority: AccountInfo<'info>,
    /// CHECK: Skip check
    pub program: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub user_wsol_token_account: AccountInfo<'info>,
}

#[derive(Accounts)]
pub struct PerpsV2Swap<'info> {
    /// CHECK: Skip check
    pub swap_program: AccountInfo<'info>,
    /// CHECK: Skip check
    pub owner: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub funding_account: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub receiving_account: AccountInfo<'info>,
    /// CHECK: Skip check
    pub transfer_authority: AccountInfo<'info>,
    /// CHECK: Skip check
    pub perpetuals: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub pool: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub receiving_custody: AccountInfo<'info>,
    /// CHECK: Skip check
    pub receiving_custody_doves_price_account: AccountInfo<'info>,
    /// CHECK: Skip check
    pub receiving_custody_pythnet_price_account: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub receiving_custody_token_account: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub dispensing_custody: AccountInfo<'info>,
    /// CHECK: Skip check
    pub dispensing_custody_doves_price_account: AccountInfo<'info>,
    /// CHECK: Skip check
    pub dispensing_custody_pythnet_price_account: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub dispensing_custody_token_account: AccountInfo<'info>,
    /// CHECK: Skip check
    pub token_program: AccountInfo<'info>,
    /// CHECK: Skip check
    pub event_authority: AccountInfo<'info>,
    /// CHECK: Skip check
    pub program: AccountInfo<'info>,
}

#[derive(Accounts)]
pub struct PerpsV2AddLiquidity<'info> {
    /// CHECK: Skip check
    pub swap_program: AccountInfo<'info>,
    /// CHECK: Skip check
    pub owner: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub funding_or_receiving_account: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub lp_token_account: AccountInfo<'info>,
    /// CHECK: Skip check
    pub transfer_authority: AccountInfo<'info>,
    /// CHECK: Skip check
    pub perpetuals: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub pool: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub custody: AccountInfo<'info>,
    /// CHECK: Skip check
    pub custody_doves_price_account: AccountInfo<'info>,
    /// CHECK: Skip check
    pub custody_pythnet_price_account: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub custody_token_account: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub lp_token_mint: AccountInfo<'info>,
    /// CHECK: Skip check
    pub token_program: AccountInfo<'info>,
    /// CHECK: Skip check
    pub event_authority: AccountInfo<'info>,
    /// CHECK: Skip check
    pub program: AccountInfo<'info>,
}

#[derive(Accounts)]
pub struct PerpsV2RemoveLiquidity<'info> {
    /// CHECK: Skip check
    pub swap_program: AccountInfo<'info>,
    /// CHECK: Skip check
    pub owner: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub funding_or_receiving_account: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub lp_token_account: AccountInfo<'info>,
    /// CHECK: Skip check
    pub transfer_authority: AccountInfo<'info>,
    /// CHECK: Skip check
    pub perpetuals: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub pool: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub custody: AccountInfo<'info>,
    /// CHECK: Skip check
    pub custody_doves_price_account: AccountInfo<'info>,
    /// CHECK: Skip check
    pub custody_pythnet_price_account: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub custody_token_account: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub lp_token_mint: AccountInfo<'info>,
    /// CHECK: Skip check
    pub token_program: AccountInfo<'info>,
    /// CHECK: Skip check
    pub event_authority: AccountInfo<'info>,
    /// CHECK: Skip check
    pub program: AccountInfo<'info>,
}

#[derive(Accounts)]
pub struct MoonshotWrappedBuy<'info> {
    /// CHECK: Skip check
    pub swap_program: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub sender: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub sender_token_account: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub curve_account: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub curve_token_account: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub dex_fee: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub helio_fee: AccountInfo<'info>,
    /// CHECK: Skip check
    pub mint: AccountInfo<'info>,
    /// CHECK: Skip check
    pub config_account: AccountInfo<'info>,
    /// CHECK: Skip check
    pub token_program: AccountInfo<'info>,
    /// CHECK: Skip check
    pub associated_token_program: AccountInfo<'info>,
    /// CHECK: Skip check
    pub system_program: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub user_wsol_token_account: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub temp_wsol_token_account: AccountInfo<'info>,
    /// CHECK: Skip check
    pub wsol_mint: AccountInfo<'info>,
}

#[derive(Accounts)]
pub struct MoonshotWrappedSell<'info> {
    /// CHECK: Skip check
    pub swap_program: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub sender: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub sender_token_account: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub curve_account: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub curve_token_account: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub dex_fee: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub helio_fee: AccountInfo<'info>,
    /// CHECK: Skip check
    pub mint: AccountInfo<'info>,
    /// CHECK: Skip check
    pub config_account: AccountInfo<'info>,
    /// CHECK: Skip check
    pub token_program: AccountInfo<'info>,
    /// CHECK: Skip check
    pub associated_token_program: AccountInfo<'info>,
    /// CHECK: Skip check
    pub system_program: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub user_wsol_token_account: AccountInfo<'info>,
}

#[derive(Accounts)]
pub struct StabbleStableSwap<'info> {
    /// CHECK: Skip check
    pub swap_program: AccountInfo<'info>,
    /// CHECK: Skip check
    pub user: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub user_token_in: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub user_token_out: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub vault_token_in: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub vault_token_out: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub beneficiary_token_out: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub pool: AccountInfo<'info>,
    /// CHECK: Skip check
    pub withdraw_authority: AccountInfo<'info>,
    /// CHECK: Skip check
    pub vault: AccountInfo<'info>,
    /// CHECK: Skip check
    pub vault_authority: AccountInfo<'info>,
    /// CHECK: Skip check
    pub vault_program: AccountInfo<'info>,
    /// CHECK: Skip check
    pub token_program: AccountInfo<'info>,
}

#[derive(Accounts)]
pub struct StabbleWeightedSwap<'info> {
    /// CHECK: Skip check
    pub swap_program: AccountInfo<'info>,
    /// CHECK: Skip check
    pub user: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub user_token_in: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub user_token_out: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub vault_token_in: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub vault_token_out: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub beneficiary_token_out: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub pool: AccountInfo<'info>,
    /// CHECK: Skip check
    pub withdraw_authority: AccountInfo<'info>,
    /// CHECK: Skip check
    pub vault: AccountInfo<'info>,
    /// CHECK: Skip check
    pub vault_authority: AccountInfo<'info>,
    /// CHECK: Skip check
    pub vault_program: AccountInfo<'info>,
    /// CHECK: Skip check
    pub token_program: AccountInfo<'info>,
}

#[derive(Accounts)]
pub struct ObricSwap<'info> {
    /// CHECK: Skip check
    pub swap_program: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub trading_pair: AccountInfo<'info>,
    /// CHECK: Skip check
    pub mint_x: AccountInfo<'info>,
    /// CHECK: Skip check
    pub mint_y: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub reserve_x: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub reserve_y: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub user_token_account_x: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub user_token_account_y: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub protocol_fee: AccountInfo<'info>,
    /// CHECK: Skip check
    pub x_price_feed: AccountInfo<'info>,
    /// CHECK: Skip check
    pub y_price_feed: AccountInfo<'info>,
    /// CHECK: Skip check
    pub user: AccountInfo<'info>,
    /// CHECK: Skip check
    pub token_program: AccountInfo<'info>,
}

#[derive(Accounts)]
pub struct FoxBuyFromEstimatedCost<'info> {
    /// CHECK: Skip check
    pub swap_program: AccountInfo<'info>,
    /// CHECK: Skip check
    pub user: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub config: AccountInfo<'info>,
    /// CHECK: Skip check
    pub mint_base: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub mint_y: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub mint_n: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub pot: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub user_ata_base: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub user_ata_buy: AccountInfo<'info>,
    /// CHECK: Skip check
    pub token_program: AccountInfo<'info>,
}

#[derive(Accounts)]
pub struct FoxClaimPartial<'info> {
    /// CHECK: Skip check
    pub swap_program: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub user: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub config: AccountInfo<'info>,
    /// CHECK: Skip check
    pub mint_base: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub mint_y: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub mint_n: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub pot: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub user_ata_base: AccountInfo<'info>,
    /// CHECK: Skip check
    pub user_ata_y: AccountInfo<'info>,
    /// CHECK: Skip check
    pub user_ata_n: AccountInfo<'info>,
    /// CHECK: Skip check
    pub token_program: AccountInfo<'info>,
}

#[derive(Accounts)]
pub struct SolFiSwap<'info> {
    /// CHECK: Skip check
    pub swap_program: AccountInfo<'info>,
    /// CHECK: Skip check
    pub token_transfer_authority: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub market_account: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub base_vault: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub quote_vault: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub user_base_ata: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Skip check
    pub user_quote_ata: AccountInfo<'info>,
    /// CHECK: Skip check
    pub token_program: AccountInfo<'info>,
    /// CHECK: Skip check
    pub instructions_sysvar: AccountInfo<'info>,
}

// CPI
#[cfg(all(target_os = "solana", feature="cpi"))]
pub mod cpi {
    #![allow(unused)]
    use anchor_lang::Discriminator;
    use super::*;

    pub fn route<'a, 'b, 'c, 'info>(
        ctx: CpiContext<'a, 'b, 'c, 'info, Route<'info>>,
        route_plan: Vec<RoutePlanStep>,
        in_amount: u64,
        quoted_out_amount: u64,
        slippage_bps: u16,
        platform_fee_bps: u8
    ) -> anchor_lang::Result<()> {
        let ix = {
            let ix = instructions::Route { route_plan, in_amount, quoted_out_amount, slippage_bps, platform_fee_bps };
            let mut data = Vec::with_capacity(256);
            data.extend_from_slice(&instructions::Route::DISCRIMINATOR);
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

    pub fn route_with_token_ledger<'a, 'b, 'c, 'info>(
        ctx: CpiContext<'a, 'b, 'c, 'info, RouteWithTokenLedger<'info>>,
        route_plan: Vec<RoutePlanStep>,
        quoted_out_amount: u64,
        slippage_bps: u16,
        platform_fee_bps: u8
    ) -> anchor_lang::Result<()> {
        let ix = {
            let ix = instructions::RouteWithTokenLedger { route_plan, quoted_out_amount, slippage_bps, platform_fee_bps };
            let mut data = Vec::with_capacity(256);
            data.extend_from_slice(&instructions::RouteWithTokenLedger::DISCRIMINATOR);
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

    pub fn exact_out_route<'a, 'b, 'c, 'info>(
        ctx: CpiContext<'a, 'b, 'c, 'info, ExactOutRoute<'info>>,
        route_plan: Vec<RoutePlanStep>,
        out_amount: u64,
        quoted_in_amount: u64,
        slippage_bps: u16,
        platform_fee_bps: u8
    ) -> anchor_lang::Result<()> {
        let ix = {
            let ix = instructions::ExactOutRoute { route_plan, out_amount, quoted_in_amount, slippage_bps, platform_fee_bps };
            let mut data = Vec::with_capacity(256);
            data.extend_from_slice(&instructions::ExactOutRoute::DISCRIMINATOR);
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

    pub fn shared_accounts_route<'a, 'b, 'c, 'info>(
        ctx: CpiContext<'a, 'b, 'c, 'info, SharedAccountsRoute<'info>>,
        id: u8,
        route_plan: Vec<RoutePlanStep>,
        in_amount: u64,
        quoted_out_amount: u64,
        slippage_bps: u16,
        platform_fee_bps: u8
    ) -> anchor_lang::Result<()> {
        let ix = {
            let ix = instructions::SharedAccountsRoute { id, route_plan, in_amount, quoted_out_amount, slippage_bps, platform_fee_bps };
            let mut data = Vec::with_capacity(256);
            data.extend_from_slice(&instructions::SharedAccountsRoute::DISCRIMINATOR);
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

    pub fn shared_accounts_route_with_token_ledger<'a, 'b, 'c, 'info>(
        ctx: CpiContext<'a, 'b, 'c, 'info, SharedAccountsRouteWithTokenLedger<'info>>,
        id: u8,
        route_plan: Vec<RoutePlanStep>,
        quoted_out_amount: u64,
        slippage_bps: u16,
        platform_fee_bps: u8
    ) -> anchor_lang::Result<()> {
        let ix = {
            let ix = instructions::SharedAccountsRouteWithTokenLedger { id, route_plan, quoted_out_amount, slippage_bps, platform_fee_bps };
            let mut data = Vec::with_capacity(256);
            data.extend_from_slice(&instructions::SharedAccountsRouteWithTokenLedger::DISCRIMINATOR);
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

    pub fn shared_accounts_exact_out_route<'a, 'b, 'c, 'info>(
        ctx: CpiContext<'a, 'b, 'c, 'info, SharedAccountsExactOutRoute<'info>>,
        id: u8,
        route_plan: Vec<RoutePlanStep>,
        out_amount: u64,
        quoted_in_amount: u64,
        slippage_bps: u16,
        platform_fee_bps: u8
    ) -> anchor_lang::Result<()> {
        let ix = {
            let ix = instructions::SharedAccountsExactOutRoute { id, route_plan, out_amount, quoted_in_amount, slippage_bps, platform_fee_bps };
            let mut data = Vec::with_capacity(256);
            data.extend_from_slice(&instructions::SharedAccountsExactOutRoute::DISCRIMINATOR);
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

    pub fn set_token_ledger<'a, 'b, 'c, 'info>(
        ctx: CpiContext<'a, 'b, 'c, 'info, SetTokenLedger<'info>>
    ) -> anchor_lang::Result<()> {
        let ix = {
            let ix = instructions::SetTokenLedger {  };
            let mut data = Vec::with_capacity(256);
            data.extend_from_slice(&instructions::SetTokenLedger::DISCRIMINATOR);
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

    pub fn create_open_orders<'a, 'b, 'c, 'info>(
        ctx: CpiContext<'a, 'b, 'c, 'info, CreateOpenOrders<'info>>
    ) -> anchor_lang::Result<()> {
        let ix = {
            let ix = instructions::CreateOpenOrders {  };
            let mut data = Vec::with_capacity(256);
            data.extend_from_slice(&instructions::CreateOpenOrders::DISCRIMINATOR);
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

    pub fn create_token_account<'a, 'b, 'c, 'info>(
        ctx: CpiContext<'a, 'b, 'c, 'info, CreateTokenAccount<'info>>,
        bump: u8
    ) -> anchor_lang::Result<()> {
        let ix = {
            let ix = instructions::CreateTokenAccount { bump };
            let mut data = Vec::with_capacity(256);
            data.extend_from_slice(&instructions::CreateTokenAccount::DISCRIMINATOR);
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

    pub fn create_program_open_orders<'a, 'b, 'c, 'info>(
        ctx: CpiContext<'a, 'b, 'c, 'info, CreateProgramOpenOrders<'info>>,
        id: u8
    ) -> anchor_lang::Result<()> {
        let ix = {
            let ix = instructions::CreateProgramOpenOrders { id };
            let mut data = Vec::with_capacity(256);
            data.extend_from_slice(&instructions::CreateProgramOpenOrders::DISCRIMINATOR);
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

    pub fn claim<'a, 'b, 'c, 'info>(
        ctx: CpiContext<'a, 'b, 'c, 'info, Claim<'info>>,
        id: u8
    ) -> anchor_lang::Result<()> {
        let ix = {
            let ix = instructions::Claim { id };
            let mut data = Vec::with_capacity(256);
            data.extend_from_slice(&instructions::Claim::DISCRIMINATOR);
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

    pub fn claim_token<'a, 'b, 'c, 'info>(
        ctx: CpiContext<'a, 'b, 'c, 'info, ClaimToken<'info>>,
        id: u8
    ) -> anchor_lang::Result<()> {
        let ix = {
            let ix = instructions::ClaimToken { id };
            let mut data = Vec::with_capacity(256);
            data.extend_from_slice(&instructions::ClaimToken::DISCRIMINATOR);
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

    pub fn create_token_ledger<'a, 'b, 'c, 'info>(
        ctx: CpiContext<'a, 'b, 'c, 'info, CreateTokenLedger<'info>>
    ) -> anchor_lang::Result<()> {
        let ix = {
            let ix = instructions::CreateTokenLedger {  };
            let mut data = Vec::with_capacity(256);
            data.extend_from_slice(&instructions::CreateTokenLedger::DISCRIMINATOR);
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

    pub fn mercurial_swap<'a, 'b, 'c, 'info>(
        ctx: CpiContext<'a, 'b, 'c, 'info, MercurialSwap<'info>>
    ) -> anchor_lang::Result<()> {
        let ix = {
            let ix = instructions::MercurialSwap {  };
            let mut data = Vec::with_capacity(256);
            data.extend_from_slice(&instructions::MercurialSwap::DISCRIMINATOR);
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

    pub fn cykura_swap<'a, 'b, 'c, 'info>(
        ctx: CpiContext<'a, 'b, 'c, 'info, CykuraSwap<'info>>
    ) -> anchor_lang::Result<()> {
        let ix = {
            let ix = instructions::CykuraSwap {  };
            let mut data = Vec::with_capacity(256);
            data.extend_from_slice(&instructions::CykuraSwap::DISCRIMINATOR);
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

    pub fn serum_swap<'a, 'b, 'c, 'info>(
        ctx: CpiContext<'a, 'b, 'c, 'info, SerumSwap<'info>>
    ) -> anchor_lang::Result<()> {
        let ix = {
            let ix = instructions::SerumSwap {  };
            let mut data = Vec::with_capacity(256);
            data.extend_from_slice(&instructions::SerumSwap::DISCRIMINATOR);
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

    pub fn saber_swap<'a, 'b, 'c, 'info>(
        ctx: CpiContext<'a, 'b, 'c, 'info, SaberSwap<'info>>
    ) -> anchor_lang::Result<()> {
        let ix = {
            let ix = instructions::SaberSwap {  };
            let mut data = Vec::with_capacity(256);
            data.extend_from_slice(&instructions::SaberSwap::DISCRIMINATOR);
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

    pub fn saber_add_decimals<'a, 'b, 'c, 'info>(
        ctx: CpiContext<'a, 'b, 'c, 'info, SaberAddDecimals<'info>>
    ) -> anchor_lang::Result<()> {
        let ix = {
            let ix = instructions::SaberAddDecimals {  };
            let mut data = Vec::with_capacity(256);
            data.extend_from_slice(&instructions::SaberAddDecimals::DISCRIMINATOR);
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

    pub fn token_swap<'a, 'b, 'c, 'info>(
        ctx: CpiContext<'a, 'b, 'c, 'info, TokenSwap<'info>>
    ) -> anchor_lang::Result<()> {
        let ix = {
            let ix = instructions::TokenSwap {  };
            let mut data = Vec::with_capacity(256);
            data.extend_from_slice(&instructions::TokenSwap::DISCRIMINATOR);
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

    pub fn token_swap_v_2<'a, 'b, 'c, 'info>(
        ctx: CpiContext<'a, 'b, 'c, 'info, TokenSwapV2<'info>>
    ) -> anchor_lang::Result<()> {
        let ix = {
            let ix = instructions::TokenSwapV2 {  };
            let mut data = Vec::with_capacity(256);
            data.extend_from_slice(&instructions::TokenSwapV2::DISCRIMINATOR);
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

    pub fn sencha_swap<'a, 'b, 'c, 'info>(
        ctx: CpiContext<'a, 'b, 'c, 'info, SenchaSwap<'info>>
    ) -> anchor_lang::Result<()> {
        let ix = {
            let ix = instructions::SenchaSwap {  };
            let mut data = Vec::with_capacity(256);
            data.extend_from_slice(&instructions::SenchaSwap::DISCRIMINATOR);
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

    pub fn step_swap<'a, 'b, 'c, 'info>(
        ctx: CpiContext<'a, 'b, 'c, 'info, StepSwap<'info>>
    ) -> anchor_lang::Result<()> {
        let ix = {
            let ix = instructions::StepSwap {  };
            let mut data = Vec::with_capacity(256);
            data.extend_from_slice(&instructions::StepSwap::DISCRIMINATOR);
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

    pub fn cropper_swap<'a, 'b, 'c, 'info>(
        ctx: CpiContext<'a, 'b, 'c, 'info, CropperSwap<'info>>
    ) -> anchor_lang::Result<()> {
        let ix = {
            let ix = instructions::CropperSwap {  };
            let mut data = Vec::with_capacity(256);
            data.extend_from_slice(&instructions::CropperSwap::DISCRIMINATOR);
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

    pub fn raydium_swap<'a, 'b, 'c, 'info>(
        ctx: CpiContext<'a, 'b, 'c, 'info, RaydiumSwap<'info>>
    ) -> anchor_lang::Result<()> {
        let ix = {
            let ix = instructions::RaydiumSwap {  };
            let mut data = Vec::with_capacity(256);
            data.extend_from_slice(&instructions::RaydiumSwap::DISCRIMINATOR);
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

    pub fn crema_swap<'a, 'b, 'c, 'info>(
        ctx: CpiContext<'a, 'b, 'c, 'info, CremaSwap<'info>>
    ) -> anchor_lang::Result<()> {
        let ix = {
            let ix = instructions::CremaSwap {  };
            let mut data = Vec::with_capacity(256);
            data.extend_from_slice(&instructions::CremaSwap::DISCRIMINATOR);
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

    pub fn lifinity_swap<'a, 'b, 'c, 'info>(
        ctx: CpiContext<'a, 'b, 'c, 'info, LifinitySwap<'info>>
    ) -> anchor_lang::Result<()> {
        let ix = {
            let ix = instructions::LifinitySwap {  };
            let mut data = Vec::with_capacity(256);
            data.extend_from_slice(&instructions::LifinitySwap::DISCRIMINATOR);
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

    pub fn marinade_deposit<'a, 'b, 'c, 'info>(
        ctx: CpiContext<'a, 'b, 'c, 'info, MarinadeDeposit<'info>>
    ) -> anchor_lang::Result<()> {
        let ix = {
            let ix = instructions::MarinadeDeposit {  };
            let mut data = Vec::with_capacity(256);
            data.extend_from_slice(&instructions::MarinadeDeposit::DISCRIMINATOR);
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

    pub fn marinade_unstake<'a, 'b, 'c, 'info>(
        ctx: CpiContext<'a, 'b, 'c, 'info, MarinadeUnstake<'info>>
    ) -> anchor_lang::Result<()> {
        let ix = {
            let ix = instructions::MarinadeUnstake {  };
            let mut data = Vec::with_capacity(256);
            data.extend_from_slice(&instructions::MarinadeUnstake::DISCRIMINATOR);
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

    pub fn aldrin_swap<'a, 'b, 'c, 'info>(
        ctx: CpiContext<'a, 'b, 'c, 'info, AldrinSwap<'info>>
    ) -> anchor_lang::Result<()> {
        let ix = {
            let ix = instructions::AldrinSwap {  };
            let mut data = Vec::with_capacity(256);
            data.extend_from_slice(&instructions::AldrinSwap::DISCRIMINATOR);
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

    pub fn aldrin_v_2_swap<'a, 'b, 'c, 'info>(
        ctx: CpiContext<'a, 'b, 'c, 'info, AldrinV2Swap<'info>>
    ) -> anchor_lang::Result<()> {
        let ix = {
            let ix = instructions::AldrinV2Swap {  };
            let mut data = Vec::with_capacity(256);
            data.extend_from_slice(&instructions::AldrinV2Swap::DISCRIMINATOR);
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

    pub fn whirlpool_swap<'a, 'b, 'c, 'info>(
        ctx: CpiContext<'a, 'b, 'c, 'info, WhirlpoolSwap<'info>>
    ) -> anchor_lang::Result<()> {
        let ix = {
            let ix = instructions::WhirlpoolSwap {  };
            let mut data = Vec::with_capacity(256);
            data.extend_from_slice(&instructions::WhirlpoolSwap::DISCRIMINATOR);
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

    pub fn whirlpool_swap_v_2<'a, 'b, 'c, 'info>(
        ctx: CpiContext<'a, 'b, 'c, 'info, WhirlpoolSwapV2<'info>>
    ) -> anchor_lang::Result<()> {
        let ix = {
            let ix = instructions::WhirlpoolSwapV2 {  };
            let mut data = Vec::with_capacity(256);
            data.extend_from_slice(&instructions::WhirlpoolSwapV2::DISCRIMINATOR);
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

    pub fn invariant_swap<'a, 'b, 'c, 'info>(
        ctx: CpiContext<'a, 'b, 'c, 'info, InvariantSwap<'info>>
    ) -> anchor_lang::Result<()> {
        let ix = {
            let ix = instructions::InvariantSwap {  };
            let mut data = Vec::with_capacity(256);
            data.extend_from_slice(&instructions::InvariantSwap::DISCRIMINATOR);
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

    pub fn meteora_swap<'a, 'b, 'c, 'info>(
        ctx: CpiContext<'a, 'b, 'c, 'info, MeteoraSwap<'info>>
    ) -> anchor_lang::Result<()> {
        let ix = {
            let ix = instructions::MeteoraSwap {  };
            let mut data = Vec::with_capacity(256);
            data.extend_from_slice(&instructions::MeteoraSwap::DISCRIMINATOR);
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

    pub fn goosefx_swap<'a, 'b, 'c, 'info>(
        ctx: CpiContext<'a, 'b, 'c, 'info, GoosefxSwap<'info>>
    ) -> anchor_lang::Result<()> {
        let ix = {
            let ix = instructions::GoosefxSwap {  };
            let mut data = Vec::with_capacity(256);
            data.extend_from_slice(&instructions::GoosefxSwap::DISCRIMINATOR);
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

    pub fn deltafi_swap<'a, 'b, 'c, 'info>(
        ctx: CpiContext<'a, 'b, 'c, 'info, DeltafiSwap<'info>>
    ) -> anchor_lang::Result<()> {
        let ix = {
            let ix = instructions::DeltafiSwap {  };
            let mut data = Vec::with_capacity(256);
            data.extend_from_slice(&instructions::DeltafiSwap::DISCRIMINATOR);
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

    pub fn balansol_swap<'a, 'b, 'c, 'info>(
        ctx: CpiContext<'a, 'b, 'c, 'info, BalansolSwap<'info>>
    ) -> anchor_lang::Result<()> {
        let ix = {
            let ix = instructions::BalansolSwap {  };
            let mut data = Vec::with_capacity(256);
            data.extend_from_slice(&instructions::BalansolSwap::DISCRIMINATOR);
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

    pub fn marco_polo_swap<'a, 'b, 'c, 'info>(
        ctx: CpiContext<'a, 'b, 'c, 'info, MarcoPoloSwap<'info>>
    ) -> anchor_lang::Result<()> {
        let ix = {
            let ix = instructions::MarcoPoloSwap {  };
            let mut data = Vec::with_capacity(256);
            data.extend_from_slice(&instructions::MarcoPoloSwap::DISCRIMINATOR);
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

    pub fn dradex_swap<'a, 'b, 'c, 'info>(
        ctx: CpiContext<'a, 'b, 'c, 'info, DradexSwap<'info>>
    ) -> anchor_lang::Result<()> {
        let ix = {
            let ix = instructions::DradexSwap {  };
            let mut data = Vec::with_capacity(256);
            data.extend_from_slice(&instructions::DradexSwap::DISCRIMINATOR);
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

    pub fn lifinity_v_2_swap<'a, 'b, 'c, 'info>(
        ctx: CpiContext<'a, 'b, 'c, 'info, LifinityV2Swap<'info>>
    ) -> anchor_lang::Result<()> {
        let ix = {
            let ix = instructions::LifinityV2Swap {  };
            let mut data = Vec::with_capacity(256);
            data.extend_from_slice(&instructions::LifinityV2Swap::DISCRIMINATOR);
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

    pub fn raydium_clmm_swap<'a, 'b, 'c, 'info>(
        ctx: CpiContext<'a, 'b, 'c, 'info, RaydiumClmmSwap<'info>>
    ) -> anchor_lang::Result<()> {
        let ix = {
            let ix = instructions::RaydiumClmmSwap {  };
            let mut data = Vec::with_capacity(256);
            data.extend_from_slice(&instructions::RaydiumClmmSwap::DISCRIMINATOR);
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

    pub fn raydium_clmm_swap_v_2<'a, 'b, 'c, 'info>(
        ctx: CpiContext<'a, 'b, 'c, 'info, RaydiumClmmSwapV2<'info>>
    ) -> anchor_lang::Result<()> {
        let ix = {
            let ix = instructions::RaydiumClmmSwapV2 {  };
            let mut data = Vec::with_capacity(256);
            data.extend_from_slice(&instructions::RaydiumClmmSwapV2::DISCRIMINATOR);
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

    pub fn phoenix_swap<'a, 'b, 'c, 'info>(
        ctx: CpiContext<'a, 'b, 'c, 'info, PhoenixSwap<'info>>
    ) -> anchor_lang::Result<()> {
        let ix = {
            let ix = instructions::PhoenixSwap {  };
            let mut data = Vec::with_capacity(256);
            data.extend_from_slice(&instructions::PhoenixSwap::DISCRIMINATOR);
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

    pub fn symmetry_swap<'a, 'b, 'c, 'info>(
        ctx: CpiContext<'a, 'b, 'c, 'info, SymmetrySwap<'info>>
    ) -> anchor_lang::Result<()> {
        let ix = {
            let ix = instructions::SymmetrySwap {  };
            let mut data = Vec::with_capacity(256);
            data.extend_from_slice(&instructions::SymmetrySwap::DISCRIMINATOR);
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

    pub fn helium_treasury_management_redeem_v_0<'a, 'b, 'c, 'info>(
        ctx: CpiContext<'a, 'b, 'c, 'info, HeliumTreasuryManagementRedeemV0<'info>>
    ) -> anchor_lang::Result<()> {
        let ix = {
            let ix = instructions::HeliumTreasuryManagementRedeemV0 {  };
            let mut data = Vec::with_capacity(256);
            data.extend_from_slice(&instructions::HeliumTreasuryManagementRedeemV0::DISCRIMINATOR);
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

    pub fn goosefx_v_2_swap<'a, 'b, 'c, 'info>(
        ctx: CpiContext<'a, 'b, 'c, 'info, GoosefxV2Swap<'info>>
    ) -> anchor_lang::Result<()> {
        let ix = {
            let ix = instructions::GoosefxV2Swap {  };
            let mut data = Vec::with_capacity(256);
            data.extend_from_slice(&instructions::GoosefxV2Swap::DISCRIMINATOR);
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

    pub fn perps_swap<'a, 'b, 'c, 'info>(
        ctx: CpiContext<'a, 'b, 'c, 'info, PerpsSwap<'info>>
    ) -> anchor_lang::Result<()> {
        let ix = {
            let ix = instructions::PerpsSwap {  };
            let mut data = Vec::with_capacity(256);
            data.extend_from_slice(&instructions::PerpsSwap::DISCRIMINATOR);
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

    pub fn perps_add_liquidity<'a, 'b, 'c, 'info>(
        ctx: CpiContext<'a, 'b, 'c, 'info, PerpsAddLiquidity<'info>>
    ) -> anchor_lang::Result<()> {
        let ix = {
            let ix = instructions::PerpsAddLiquidity {  };
            let mut data = Vec::with_capacity(256);
            data.extend_from_slice(&instructions::PerpsAddLiquidity::DISCRIMINATOR);
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

    pub fn perps_remove_liquidity<'a, 'b, 'c, 'info>(
        ctx: CpiContext<'a, 'b, 'c, 'info, PerpsRemoveLiquidity<'info>>
    ) -> anchor_lang::Result<()> {
        let ix = {
            let ix = instructions::PerpsRemoveLiquidity {  };
            let mut data = Vec::with_capacity(256);
            data.extend_from_slice(&instructions::PerpsRemoveLiquidity::DISCRIMINATOR);
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

    pub fn meteora_dlmm_swap<'a, 'b, 'c, 'info>(
        ctx: CpiContext<'a, 'b, 'c, 'info, MeteoraDlmmSwap<'info>>
    ) -> anchor_lang::Result<()> {
        let ix = {
            let ix = instructions::MeteoraDlmmSwap {  };
            let mut data = Vec::with_capacity(256);
            data.extend_from_slice(&instructions::MeteoraDlmmSwap::DISCRIMINATOR);
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

    pub fn open_book_v_2_swap<'a, 'b, 'c, 'info>(
        ctx: CpiContext<'a, 'b, 'c, 'info, OpenBookV2Swap<'info>>
    ) -> anchor_lang::Result<()> {
        let ix = {
            let ix = instructions::OpenBookV2Swap {  };
            let mut data = Vec::with_capacity(256);
            data.extend_from_slice(&instructions::OpenBookV2Swap::DISCRIMINATOR);
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

    pub fn clone_swap<'a, 'b, 'c, 'info>(
        ctx: CpiContext<'a, 'b, 'c, 'info, CloneSwap<'info>>
    ) -> anchor_lang::Result<()> {
        let ix = {
            let ix = instructions::CloneSwap {  };
            let mut data = Vec::with_capacity(256);
            data.extend_from_slice(&instructions::CloneSwap::DISCRIMINATOR);
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

    pub fn raydium_cp_swap<'a, 'b, 'c, 'info>(
        ctx: CpiContext<'a, 'b, 'c, 'info, RaydiumCpSwap<'info>>
    ) -> anchor_lang::Result<()> {
        let ix = {
            let ix = instructions::RaydiumCpSwap {  };
            let mut data = Vec::with_capacity(256);
            data.extend_from_slice(&instructions::RaydiumCpSwap::DISCRIMINATOR);
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

    pub fn one_intro_swap<'a, 'b, 'c, 'info>(
        ctx: CpiContext<'a, 'b, 'c, 'info, OneIntroSwap<'info>>
    ) -> anchor_lang::Result<()> {
        let ix = {
            let ix = instructions::OneIntroSwap {  };
            let mut data = Vec::with_capacity(256);
            data.extend_from_slice(&instructions::OneIntroSwap::DISCRIMINATOR);
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

    pub fn pumpdotfun_wrapped_buy<'a, 'b, 'c, 'info>(
        ctx: CpiContext<'a, 'b, 'c, 'info, PumpdotfunWrappedBuy<'info>>
    ) -> anchor_lang::Result<()> {
        let ix = {
            let ix = instructions::PumpdotfunWrappedBuy {  };
            let mut data = Vec::with_capacity(256);
            data.extend_from_slice(&instructions::PumpdotfunWrappedBuy::DISCRIMINATOR);
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

    pub fn pumpdotfun_wrapped_sell<'a, 'b, 'c, 'info>(
        ctx: CpiContext<'a, 'b, 'c, 'info, PumpdotfunWrappedSell<'info>>
    ) -> anchor_lang::Result<()> {
        let ix = {
            let ix = instructions::PumpdotfunWrappedSell {  };
            let mut data = Vec::with_capacity(256);
            data.extend_from_slice(&instructions::PumpdotfunWrappedSell::DISCRIMINATOR);
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

    pub fn perps_v_2_swap<'a, 'b, 'c, 'info>(
        ctx: CpiContext<'a, 'b, 'c, 'info, PerpsV2Swap<'info>>
    ) -> anchor_lang::Result<()> {
        let ix = {
            let ix = instructions::PerpsV2Swap {  };
            let mut data = Vec::with_capacity(256);
            data.extend_from_slice(&instructions::PerpsV2Swap::DISCRIMINATOR);
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

    pub fn perps_v_2_add_liquidity<'a, 'b, 'c, 'info>(
        ctx: CpiContext<'a, 'b, 'c, 'info, PerpsV2AddLiquidity<'info>>
    ) -> anchor_lang::Result<()> {
        let ix = {
            let ix = instructions::PerpsV2AddLiquidity {  };
            let mut data = Vec::with_capacity(256);
            data.extend_from_slice(&instructions::PerpsV2AddLiquidity::DISCRIMINATOR);
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

    pub fn perps_v_2_remove_liquidity<'a, 'b, 'c, 'info>(
        ctx: CpiContext<'a, 'b, 'c, 'info, PerpsV2RemoveLiquidity<'info>>
    ) -> anchor_lang::Result<()> {
        let ix = {
            let ix = instructions::PerpsV2RemoveLiquidity {  };
            let mut data = Vec::with_capacity(256);
            data.extend_from_slice(&instructions::PerpsV2RemoveLiquidity::DISCRIMINATOR);
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

    pub fn moonshot_wrapped_buy<'a, 'b, 'c, 'info>(
        ctx: CpiContext<'a, 'b, 'c, 'info, MoonshotWrappedBuy<'info>>
    ) -> anchor_lang::Result<()> {
        let ix = {
            let ix = instructions::MoonshotWrappedBuy {  };
            let mut data = Vec::with_capacity(256);
            data.extend_from_slice(&instructions::MoonshotWrappedBuy::DISCRIMINATOR);
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

    pub fn moonshot_wrapped_sell<'a, 'b, 'c, 'info>(
        ctx: CpiContext<'a, 'b, 'c, 'info, MoonshotWrappedSell<'info>>
    ) -> anchor_lang::Result<()> {
        let ix = {
            let ix = instructions::MoonshotWrappedSell {  };
            let mut data = Vec::with_capacity(256);
            data.extend_from_slice(&instructions::MoonshotWrappedSell::DISCRIMINATOR);
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

    pub fn stabble_stable_swap<'a, 'b, 'c, 'info>(
        ctx: CpiContext<'a, 'b, 'c, 'info, StabbleStableSwap<'info>>
    ) -> anchor_lang::Result<()> {
        let ix = {
            let ix = instructions::StabbleStableSwap {  };
            let mut data = Vec::with_capacity(256);
            data.extend_from_slice(&instructions::StabbleStableSwap::DISCRIMINATOR);
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

    pub fn stabble_weighted_swap<'a, 'b, 'c, 'info>(
        ctx: CpiContext<'a, 'b, 'c, 'info, StabbleWeightedSwap<'info>>
    ) -> anchor_lang::Result<()> {
        let ix = {
            let ix = instructions::StabbleWeightedSwap {  };
            let mut data = Vec::with_capacity(256);
            data.extend_from_slice(&instructions::StabbleWeightedSwap::DISCRIMINATOR);
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

    pub fn obric_swap<'a, 'b, 'c, 'info>(
        ctx: CpiContext<'a, 'b, 'c, 'info, ObricSwap<'info>>
    ) -> anchor_lang::Result<()> {
        let ix = {
            let ix = instructions::ObricSwap {  };
            let mut data = Vec::with_capacity(256);
            data.extend_from_slice(&instructions::ObricSwap::DISCRIMINATOR);
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

    pub fn fox_buy_from_estimated_cost<'a, 'b, 'c, 'info>(
        ctx: CpiContext<'a, 'b, 'c, 'info, FoxBuyFromEstimatedCost<'info>>
    ) -> anchor_lang::Result<()> {
        let ix = {
            let ix = instructions::FoxBuyFromEstimatedCost {  };
            let mut data = Vec::with_capacity(256);
            data.extend_from_slice(&instructions::FoxBuyFromEstimatedCost::DISCRIMINATOR);
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

    pub fn fox_claim_partial<'a, 'b, 'c, 'info>(
        ctx: CpiContext<'a, 'b, 'c, 'info, FoxClaimPartial<'info>>
    ) -> anchor_lang::Result<()> {
        let ix = {
            let ix = instructions::FoxClaimPartial {  };
            let mut data = Vec::with_capacity(256);
            data.extend_from_slice(&instructions::FoxClaimPartial::DISCRIMINATOR);
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

    pub fn sol_fi_swap<'a, 'b, 'c, 'info>(
        ctx: CpiContext<'a, 'b, 'c, 'info, SolFiSwap<'info>>
    ) -> anchor_lang::Result<()> {
        let ix = {
            let ix = instructions::SolFiSwap {  };
            let mut data = Vec::with_capacity(256);
            data.extend_from_slice(&instructions::SolFiSwap::DISCRIMINATOR);
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
    pub struct Route {
            pub token_program: Pubkey,
            pub user_transfer_authority: Pubkey,
            pub user_source_token_account: Pubkey,
            pub user_destination_token_account: Pubkey,
            pub destination_token_account: Pubkey,
            pub destination_mint: Pubkey,
            pub platform_fee_account: Pubkey,
            pub event_authority: Pubkey,
            pub program: Pubkey,
    }
    
        impl anchor_lang::ToAccountMetas for Route {
            fn to_account_metas(
                &self,
                is_signer: Option<bool>,
            ) -> Vec<anchor_lang::solana_program::instruction::AccountMeta> {
                let mut account_metas = vec![];
                account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.token_program,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.user_transfer_authority,
                true,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.user_source_token_account,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.user_destination_token_account,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.destination_token_account,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.destination_mint,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.platform_fee_account,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.event_authority,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.program,
                false,
            ));
                account_metas
            }
        }
    
    #[cfg_attr(not(target_os="solana"), derive(Debug))]
    #[derive(AnchorSerialize)]
    pub struct RouteWithTokenLedger {
            pub token_program: Pubkey,
            pub user_transfer_authority: Pubkey,
            pub user_source_token_account: Pubkey,
            pub user_destination_token_account: Pubkey,
            pub destination_token_account: Pubkey,
            pub destination_mint: Pubkey,
            pub platform_fee_account: Pubkey,
            pub token_ledger: Pubkey,
            pub event_authority: Pubkey,
            pub program: Pubkey,
    }
    
        impl anchor_lang::ToAccountMetas for RouteWithTokenLedger {
            fn to_account_metas(
                &self,
                is_signer: Option<bool>,
            ) -> Vec<anchor_lang::solana_program::instruction::AccountMeta> {
                let mut account_metas = vec![];
                account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.token_program,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.user_transfer_authority,
                true,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.user_source_token_account,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.user_destination_token_account,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.destination_token_account,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.destination_mint,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.platform_fee_account,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.token_ledger,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.event_authority,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.program,
                false,
            ));
                account_metas
            }
        }
    
    #[cfg_attr(not(target_os="solana"), derive(Debug))]
    #[derive(AnchorSerialize)]
    pub struct ExactOutRoute {
            pub token_program: Pubkey,
            pub user_transfer_authority: Pubkey,
            pub user_source_token_account: Pubkey,
            pub user_destination_token_account: Pubkey,
            pub destination_token_account: Pubkey,
            pub source_mint: Pubkey,
            pub destination_mint: Pubkey,
            pub platform_fee_account: Pubkey,
            pub token_2022_program: Pubkey,
            pub event_authority: Pubkey,
            pub program: Pubkey,
    }
    
        impl anchor_lang::ToAccountMetas for ExactOutRoute {
            fn to_account_metas(
                &self,
                is_signer: Option<bool>,
            ) -> Vec<anchor_lang::solana_program::instruction::AccountMeta> {
                let mut account_metas = vec![];
                account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.token_program,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.user_transfer_authority,
                true,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.user_source_token_account,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.user_destination_token_account,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.destination_token_account,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.source_mint,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.destination_mint,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.platform_fee_account,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.token_2022_program,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.event_authority,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.program,
                false,
            ));
                account_metas
            }
        }
    
    #[cfg_attr(not(target_os="solana"), derive(Debug))]
    #[derive(AnchorSerialize)]
    pub struct SharedAccountsRoute {
            pub token_program: Pubkey,
            pub program_authority: Pubkey,
            pub user_transfer_authority: Pubkey,
            pub source_token_account: Pubkey,
            pub program_source_token_account: Pubkey,
            pub program_destination_token_account: Pubkey,
            pub destination_token_account: Pubkey,
            pub source_mint: Pubkey,
            pub destination_mint: Pubkey,
            pub platform_fee_account: Pubkey,
            pub token_2022_program: Pubkey,
            pub event_authority: Pubkey,
            pub program: Pubkey,
    }
    
        impl anchor_lang::ToAccountMetas for SharedAccountsRoute {
            fn to_account_metas(
                &self,
                is_signer: Option<bool>,
            ) -> Vec<anchor_lang::solana_program::instruction::AccountMeta> {
                let mut account_metas = vec![];
                account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.token_program,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.program_authority,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.user_transfer_authority,
                true,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.source_token_account,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.program_source_token_account,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.program_destination_token_account,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.destination_token_account,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.source_mint,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.destination_mint,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.platform_fee_account,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.token_2022_program,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.event_authority,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.program,
                false,
            ));
                account_metas
            }
        }
    
    #[cfg_attr(not(target_os="solana"), derive(Debug))]
    #[derive(AnchorSerialize)]
    pub struct SharedAccountsRouteWithTokenLedger {
            pub token_program: Pubkey,
            pub program_authority: Pubkey,
            pub user_transfer_authority: Pubkey,
            pub source_token_account: Pubkey,
            pub program_source_token_account: Pubkey,
            pub program_destination_token_account: Pubkey,
            pub destination_token_account: Pubkey,
            pub source_mint: Pubkey,
            pub destination_mint: Pubkey,
            pub platform_fee_account: Pubkey,
            pub token_2022_program: Pubkey,
            pub token_ledger: Pubkey,
            pub event_authority: Pubkey,
            pub program: Pubkey,
    }
    
        impl anchor_lang::ToAccountMetas for SharedAccountsRouteWithTokenLedger {
            fn to_account_metas(
                &self,
                is_signer: Option<bool>,
            ) -> Vec<anchor_lang::solana_program::instruction::AccountMeta> {
                let mut account_metas = vec![];
                account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.token_program,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.program_authority,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.user_transfer_authority,
                true,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.source_token_account,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.program_source_token_account,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.program_destination_token_account,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.destination_token_account,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.source_mint,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.destination_mint,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.platform_fee_account,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.token_2022_program,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.token_ledger,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.event_authority,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.program,
                false,
            ));
                account_metas
            }
        }
    
    #[cfg_attr(not(target_os="solana"), derive(Debug))]
    #[derive(AnchorSerialize)]
    pub struct SharedAccountsExactOutRoute {
            pub token_program: Pubkey,
            pub program_authority: Pubkey,
            pub user_transfer_authority: Pubkey,
            pub source_token_account: Pubkey,
            pub program_source_token_account: Pubkey,
            pub program_destination_token_account: Pubkey,
            pub destination_token_account: Pubkey,
            pub source_mint: Pubkey,
            pub destination_mint: Pubkey,
            pub platform_fee_account: Pubkey,
            pub token_2022_program: Pubkey,
            pub event_authority: Pubkey,
            pub program: Pubkey,
    }
    
        impl anchor_lang::ToAccountMetas for SharedAccountsExactOutRoute {
            fn to_account_metas(
                &self,
                is_signer: Option<bool>,
            ) -> Vec<anchor_lang::solana_program::instruction::AccountMeta> {
                let mut account_metas = vec![];
                account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.token_program,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.program_authority,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.user_transfer_authority,
                true,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.source_token_account,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.program_source_token_account,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.program_destination_token_account,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.destination_token_account,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.source_mint,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.destination_mint,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.platform_fee_account,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.token_2022_program,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.event_authority,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.program,
                false,
            ));
                account_metas
            }
        }
    
    #[cfg_attr(not(target_os="solana"), derive(Debug))]
    #[derive(AnchorSerialize)]
    pub struct SetTokenLedger {
            pub token_ledger: Pubkey,
            pub token_account: Pubkey,
    }
    
        impl anchor_lang::ToAccountMetas for SetTokenLedger {
            fn to_account_metas(
                &self,
                is_signer: Option<bool>,
            ) -> Vec<anchor_lang::solana_program::instruction::AccountMeta> {
                let mut account_metas = vec![];
                account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.token_ledger,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.token_account,
                false,
            ));
                account_metas
            }
        }
    
    #[cfg_attr(not(target_os="solana"), derive(Debug))]
    #[derive(AnchorSerialize)]
    pub struct CreateOpenOrders {
            pub open_orders: Pubkey,
            pub payer: Pubkey,
            pub dex_program: Pubkey,
            pub system_program: Pubkey,
            pub rent: Pubkey,
            pub market: Pubkey,
    }
    
        impl anchor_lang::ToAccountMetas for CreateOpenOrders {
            fn to_account_metas(
                &self,
                is_signer: Option<bool>,
            ) -> Vec<anchor_lang::solana_program::instruction::AccountMeta> {
                let mut account_metas = vec![];
                account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.open_orders,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.payer,
                true,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.dex_program,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.system_program,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.rent,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.market,
                false,
            ));
                account_metas
            }
        }
    
    #[cfg_attr(not(target_os="solana"), derive(Debug))]
    #[derive(AnchorSerialize)]
    pub struct CreateTokenAccount {
            pub token_account: Pubkey,
            pub user: Pubkey,
            pub mint: Pubkey,
            pub token_program: Pubkey,
            pub system_program: Pubkey,
    }
    
        impl anchor_lang::ToAccountMetas for CreateTokenAccount {
            fn to_account_metas(
                &self,
                is_signer: Option<bool>,
            ) -> Vec<anchor_lang::solana_program::instruction::AccountMeta> {
                let mut account_metas = vec![];
                account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.token_account,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.user,
                true,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.mint,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.token_program,
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
    pub struct CreateProgramOpenOrders {
            pub open_orders: Pubkey,
            pub payer: Pubkey,
            pub program_authority: Pubkey,
            pub dex_program: Pubkey,
            pub system_program: Pubkey,
            pub rent: Pubkey,
            pub market: Pubkey,
    }
    
        impl anchor_lang::ToAccountMetas for CreateProgramOpenOrders {
            fn to_account_metas(
                &self,
                is_signer: Option<bool>,
            ) -> Vec<anchor_lang::solana_program::instruction::AccountMeta> {
                let mut account_metas = vec![];
                account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.open_orders,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.payer,
                true,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.program_authority,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.dex_program,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.system_program,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.rent,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.market,
                false,
            ));
                account_metas
            }
        }
    
    #[cfg_attr(not(target_os="solana"), derive(Debug))]
    #[derive(AnchorSerialize)]
    pub struct Claim {
            pub wallet: Pubkey,
            pub program_authority: Pubkey,
            pub system_program: Pubkey,
    }
    
        impl anchor_lang::ToAccountMetas for Claim {
            fn to_account_metas(
                &self,
                is_signer: Option<bool>,
            ) -> Vec<anchor_lang::solana_program::instruction::AccountMeta> {
                let mut account_metas = vec![];
                account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.wallet,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.program_authority,
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
    pub struct ClaimToken {
            pub payer: Pubkey,
            pub wallet: Pubkey,
            pub program_authority: Pubkey,
            pub program_token_account: Pubkey,
            pub destination_token_account: Pubkey,
            pub mint: Pubkey,
            pub associated_token_token_program: Pubkey,
            pub associated_token_program: Pubkey,
            pub system_program: Pubkey,
    }
    
        impl anchor_lang::ToAccountMetas for ClaimToken {
            fn to_account_metas(
                &self,
                is_signer: Option<bool>,
            ) -> Vec<anchor_lang::solana_program::instruction::AccountMeta> {
                let mut account_metas = vec![];
                account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.payer,
                true,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.wallet,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.program_authority,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.program_token_account,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.destination_token_account,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.mint,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.associated_token_token_program,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.associated_token_program,
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
    pub struct CreateTokenLedger {
            pub token_ledger: Pubkey,
            pub payer: Pubkey,
            pub system_program: Pubkey,
    }
    
        impl anchor_lang::ToAccountMetas for CreateTokenLedger {
            fn to_account_metas(
                &self,
                is_signer: Option<bool>,
            ) -> Vec<anchor_lang::solana_program::instruction::AccountMeta> {
                let mut account_metas = vec![];
                account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.token_ledger,
                true,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.payer,
                true,
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
    pub struct MercurialSwap {
            pub swap_program: Pubkey,
            pub swap_state: Pubkey,
            pub token_program: Pubkey,
            pub pool_authority: Pubkey,
            pub user_transfer_authority: Pubkey,
            pub source_token_account: Pubkey,
            pub destination_token_account: Pubkey,
    }
    
        impl anchor_lang::ToAccountMetas for MercurialSwap {
            fn to_account_metas(
                &self,
                is_signer: Option<bool>,
            ) -> Vec<anchor_lang::solana_program::instruction::AccountMeta> {
                let mut account_metas = vec![];
                account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.swap_program,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.swap_state,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.token_program,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.pool_authority,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.user_transfer_authority,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.source_token_account,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.destination_token_account,
                false,
            ));
                account_metas
            }
        }
    
    #[cfg_attr(not(target_os="solana"), derive(Debug))]
    #[derive(AnchorSerialize)]
    pub struct CykuraSwap {
            pub swap_program: Pubkey,
            pub signer: Pubkey,
            pub factory_state: Pubkey,
            pub pool_state: Pubkey,
            pub input_token_account: Pubkey,
            pub output_token_account: Pubkey,
            pub input_vault: Pubkey,
            pub output_vault: Pubkey,
            pub last_observation_state: Pubkey,
            pub core_program: Pubkey,
            pub token_program: Pubkey,
    }
    
        impl anchor_lang::ToAccountMetas for CykuraSwap {
            fn to_account_metas(
                &self,
                is_signer: Option<bool>,
            ) -> Vec<anchor_lang::solana_program::instruction::AccountMeta> {
                let mut account_metas = vec![];
                account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.swap_program,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.signer,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.factory_state,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.pool_state,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.input_token_account,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.output_token_account,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.input_vault,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.output_vault,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.last_observation_state,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.core_program,
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
    pub struct SerumSwap {
            pub market: Pubkey,
            pub authority: Pubkey,
            pub order_payer_token_account: Pubkey,
            pub coin_wallet: Pubkey,
            pub pc_wallet: Pubkey,
            pub dex_program: Pubkey,
            pub token_program: Pubkey,
            pub rent: Pubkey,
    }
    
        impl anchor_lang::ToAccountMetas for SerumSwap {
            fn to_account_metas(
                &self,
                is_signer: Option<bool>,
            ) -> Vec<anchor_lang::solana_program::instruction::AccountMeta> {
                let mut account_metas = vec![];
                account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.market,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.authority,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.order_payer_token_account,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.coin_wallet,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.pc_wallet,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.dex_program,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.token_program,
                false,
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
    pub struct SaberSwap {
            pub swap_program: Pubkey,
            pub token_program: Pubkey,
            pub swap: Pubkey,
            pub swap_authority: Pubkey,
            pub user_authority: Pubkey,
            pub input_user_account: Pubkey,
            pub input_token_account: Pubkey,
            pub output_user_account: Pubkey,
            pub output_token_account: Pubkey,
            pub fees_token_account: Pubkey,
    }
    
        impl anchor_lang::ToAccountMetas for SaberSwap {
            fn to_account_metas(
                &self,
                is_signer: Option<bool>,
            ) -> Vec<anchor_lang::solana_program::instruction::AccountMeta> {
                let mut account_metas = vec![];
                account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.swap_program,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.token_program,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.swap,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.swap_authority,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.user_authority,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.input_user_account,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.input_token_account,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.output_user_account,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.output_token_account,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.fees_token_account,
                false,
            ));
                account_metas
            }
        }
    
    #[cfg_attr(not(target_os="solana"), derive(Debug))]
    #[derive(AnchorSerialize)]
    pub struct SaberAddDecimals {
            pub add_decimals_program: Pubkey,
            pub wrapper: Pubkey,
            pub wrapper_mint: Pubkey,
            pub wrapper_underlying_tokens: Pubkey,
            pub owner: Pubkey,
            pub user_underlying_tokens: Pubkey,
            pub user_wrapped_tokens: Pubkey,
            pub token_program: Pubkey,
    }
    
        impl anchor_lang::ToAccountMetas for SaberAddDecimals {
            fn to_account_metas(
                &self,
                is_signer: Option<bool>,
            ) -> Vec<anchor_lang::solana_program::instruction::AccountMeta> {
                let mut account_metas = vec![];
                account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.add_decimals_program,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.wrapper,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.wrapper_mint,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.wrapper_underlying_tokens,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.owner,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.user_underlying_tokens,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.user_wrapped_tokens,
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
    pub struct TokenSwap {
            pub token_swap_program: Pubkey,
            pub token_program: Pubkey,
            pub swap: Pubkey,
            pub authority: Pubkey,
            pub user_transfer_authority: Pubkey,
            pub source: Pubkey,
            pub swap_source: Pubkey,
            pub swap_destination: Pubkey,
            pub destination: Pubkey,
            pub pool_mint: Pubkey,
            pub pool_fee: Pubkey,
    }
    
        impl anchor_lang::ToAccountMetas for TokenSwap {
            fn to_account_metas(
                &self,
                is_signer: Option<bool>,
            ) -> Vec<anchor_lang::solana_program::instruction::AccountMeta> {
                let mut account_metas = vec![];
                account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.token_swap_program,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.token_program,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.swap,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.authority,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.user_transfer_authority,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.source,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.swap_source,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.swap_destination,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.destination,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.pool_mint,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.pool_fee,
                false,
            ));
                account_metas
            }
        }
    
    #[cfg_attr(not(target_os="solana"), derive(Debug))]
    #[derive(AnchorSerialize)]
    pub struct TokenSwapV2 {
            pub swap_program: Pubkey,
            pub swap: Pubkey,
            pub authority: Pubkey,
            pub user_transfer_authority: Pubkey,
            pub source: Pubkey,
            pub swap_source: Pubkey,
            pub swap_destination: Pubkey,
            pub destination: Pubkey,
            pub pool_mint: Pubkey,
            pub pool_fee: Pubkey,
            pub source_mint: Pubkey,
            pub destination_mint: Pubkey,
            pub source_token_program: Pubkey,
            pub destination_token_program: Pubkey,
            pub pool_token_program: Pubkey,
    }
    
        impl anchor_lang::ToAccountMetas for TokenSwapV2 {
            fn to_account_metas(
                &self,
                is_signer: Option<bool>,
            ) -> Vec<anchor_lang::solana_program::instruction::AccountMeta> {
                let mut account_metas = vec![];
                account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.swap_program,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.swap,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.authority,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.user_transfer_authority,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.source,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.swap_source,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.swap_destination,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.destination,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.pool_mint,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.pool_fee,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.source_mint,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.destination_mint,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.source_token_program,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.destination_token_program,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.pool_token_program,
                false,
            ));
                account_metas
            }
        }
    
    #[cfg_attr(not(target_os="solana"), derive(Debug))]
    #[derive(AnchorSerialize)]
    pub struct SenchaSwap {
            pub swap_program: Pubkey,
            pub token_program: Pubkey,
            pub swap: Pubkey,
            pub user_authority: Pubkey,
            pub input_user_account: Pubkey,
            pub input_token_account: Pubkey,
            pub input_fees_account: Pubkey,
            pub output_user_account: Pubkey,
            pub output_token_account: Pubkey,
            pub output_fees_account: Pubkey,
    }
    
        impl anchor_lang::ToAccountMetas for SenchaSwap {
            fn to_account_metas(
                &self,
                is_signer: Option<bool>,
            ) -> Vec<anchor_lang::solana_program::instruction::AccountMeta> {
                let mut account_metas = vec![];
                account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.swap_program,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.token_program,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.swap,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.user_authority,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.input_user_account,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.input_token_account,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.input_fees_account,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.output_user_account,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.output_token_account,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.output_fees_account,
                false,
            ));
                account_metas
            }
        }
    
    #[cfg_attr(not(target_os="solana"), derive(Debug))]
    #[derive(AnchorSerialize)]
    pub struct StepSwap {
            pub token_swap_program: Pubkey,
            pub token_program: Pubkey,
            pub swap: Pubkey,
            pub authority: Pubkey,
            pub user_transfer_authority: Pubkey,
            pub source: Pubkey,
            pub swap_source: Pubkey,
            pub swap_destination: Pubkey,
            pub destination: Pubkey,
            pub pool_mint: Pubkey,
            pub pool_fee: Pubkey,
    }
    
        impl anchor_lang::ToAccountMetas for StepSwap {
            fn to_account_metas(
                &self,
                is_signer: Option<bool>,
            ) -> Vec<anchor_lang::solana_program::instruction::AccountMeta> {
                let mut account_metas = vec![];
                account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.token_swap_program,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.token_program,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.swap,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.authority,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.user_transfer_authority,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.source,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.swap_source,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.swap_destination,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.destination,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.pool_mint,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.pool_fee,
                false,
            ));
                account_metas
            }
        }
    
    #[cfg_attr(not(target_os="solana"), derive(Debug))]
    #[derive(AnchorSerialize)]
    pub struct CropperSwap {
            pub token_swap_program: Pubkey,
            pub token_program: Pubkey,
            pub swap: Pubkey,
            pub swap_state: Pubkey,
            pub authority: Pubkey,
            pub user_transfer_authority: Pubkey,
            pub source: Pubkey,
            pub swap_source: Pubkey,
            pub swap_destination: Pubkey,
            pub destination: Pubkey,
            pub pool_mint: Pubkey,
            pub pool_fee: Pubkey,
    }
    
        impl anchor_lang::ToAccountMetas for CropperSwap {
            fn to_account_metas(
                &self,
                is_signer: Option<bool>,
            ) -> Vec<anchor_lang::solana_program::instruction::AccountMeta> {
                let mut account_metas = vec![];
                account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.token_swap_program,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.token_program,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.swap,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.swap_state,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.authority,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.user_transfer_authority,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.source,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.swap_source,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.swap_destination,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.destination,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.pool_mint,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.pool_fee,
                false,
            ));
                account_metas
            }
        }
    
    #[cfg_attr(not(target_os="solana"), derive(Debug))]
    #[derive(AnchorSerialize)]
    pub struct RaydiumSwap {
            pub swap_program: Pubkey,
            pub token_program: Pubkey,
            pub amm_id: Pubkey,
            pub amm_authority: Pubkey,
            pub amm_open_orders: Pubkey,
            pub pool_coin_token_account: Pubkey,
            pub pool_pc_token_account: Pubkey,
            pub serum_program_id: Pubkey,
            pub serum_market: Pubkey,
            pub serum_bids: Pubkey,
            pub serum_asks: Pubkey,
            pub serum_event_queue: Pubkey,
            pub serum_coin_vault_account: Pubkey,
            pub serum_pc_vault_account: Pubkey,
            pub serum_vault_signer: Pubkey,
            pub user_source_token_account: Pubkey,
            pub user_destination_token_account: Pubkey,
            pub user_source_owner: Pubkey,
    }
    
        impl anchor_lang::ToAccountMetas for RaydiumSwap {
            fn to_account_metas(
                &self,
                is_signer: Option<bool>,
            ) -> Vec<anchor_lang::solana_program::instruction::AccountMeta> {
                let mut account_metas = vec![];
                account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.swap_program,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.token_program,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.amm_id,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.amm_authority,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.amm_open_orders,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.pool_coin_token_account,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.pool_pc_token_account,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.serum_program_id,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.serum_market,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.serum_bids,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.serum_asks,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.serum_event_queue,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.serum_coin_vault_account,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.serum_pc_vault_account,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.serum_vault_signer,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.user_source_token_account,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.user_destination_token_account,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.user_source_owner,
                false,
            ));
                account_metas
            }
        }
    
    #[cfg_attr(not(target_os="solana"), derive(Debug))]
    #[derive(AnchorSerialize)]
    pub struct CremaSwap {
            pub swap_program: Pubkey,
            pub clmm_config: Pubkey,
            pub clmmpool: Pubkey,
            pub token_a: Pubkey,
            pub token_b: Pubkey,
            pub account_a: Pubkey,
            pub account_b: Pubkey,
            pub token_a_vault: Pubkey,
            pub token_b_vault: Pubkey,
            pub tick_array_map: Pubkey,
            pub owner: Pubkey,
            pub partner: Pubkey,
            pub partner_ata_a: Pubkey,
            pub partner_ata_b: Pubkey,
            pub token_program: Pubkey,
    }
    
        impl anchor_lang::ToAccountMetas for CremaSwap {
            fn to_account_metas(
                &self,
                is_signer: Option<bool>,
            ) -> Vec<anchor_lang::solana_program::instruction::AccountMeta> {
                let mut account_metas = vec![];
                account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.swap_program,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.clmm_config,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.clmmpool,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.token_a,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.token_b,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.account_a,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.account_b,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.token_a_vault,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.token_b_vault,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.tick_array_map,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.owner,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.partner,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.partner_ata_a,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.partner_ata_b,
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
    pub struct LifinitySwap {
            pub swap_program: Pubkey,
            pub authority: Pubkey,
            pub amm: Pubkey,
            pub user_transfer_authority: Pubkey,
            pub source_info: Pubkey,
            pub destination_info: Pubkey,
            pub swap_source: Pubkey,
            pub swap_destination: Pubkey,
            pub pool_mint: Pubkey,
            pub fee_account: Pubkey,
            pub token_program: Pubkey,
            pub pyth_account: Pubkey,
            pub pyth_pc_account: Pubkey,
            pub config_account: Pubkey,
    }
    
        impl anchor_lang::ToAccountMetas for LifinitySwap {
            fn to_account_metas(
                &self,
                is_signer: Option<bool>,
            ) -> Vec<anchor_lang::solana_program::instruction::AccountMeta> {
                let mut account_metas = vec![];
                account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.swap_program,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.authority,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.amm,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.user_transfer_authority,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.source_info,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.destination_info,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.swap_source,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.swap_destination,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.pool_mint,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.fee_account,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.token_program,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.pyth_account,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.pyth_pc_account,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.config_account,
                false,
            ));
                account_metas
            }
        }
    
    #[cfg_attr(not(target_os="solana"), derive(Debug))]
    #[derive(AnchorSerialize)]
    pub struct MarinadeDeposit {
            pub marinade_finance_program: Pubkey,
            pub state: Pubkey,
            pub msol_mint: Pubkey,
            pub liq_pool_sol_leg_pda: Pubkey,
            pub liq_pool_msol_leg: Pubkey,
            pub liq_pool_msol_leg_authority: Pubkey,
            pub reserve_pda: Pubkey,
            pub transfer_from: Pubkey,
            pub mint_to: Pubkey,
            pub msol_mint_authority: Pubkey,
            pub system_program: Pubkey,
            pub token_program: Pubkey,
            pub user_wsol_token_account: Pubkey,
            pub temp_wsol_token_account: Pubkey,
            pub user_transfer_authority: Pubkey,
            pub payer: Pubkey,
            pub wsol_mint: Pubkey,
            pub rent: Pubkey,
    }
    
        impl anchor_lang::ToAccountMetas for MarinadeDeposit {
            fn to_account_metas(
                &self,
                is_signer: Option<bool>,
            ) -> Vec<anchor_lang::solana_program::instruction::AccountMeta> {
                let mut account_metas = vec![];
                account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.marinade_finance_program,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.state,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.msol_mint,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.liq_pool_sol_leg_pda,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.liq_pool_msol_leg,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.liq_pool_msol_leg_authority,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.reserve_pda,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.transfer_from,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.mint_to,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.msol_mint_authority,
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
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.user_wsol_token_account,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.temp_wsol_token_account,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.user_transfer_authority,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.payer,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.wsol_mint,
                false,
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
    pub struct MarinadeUnstake {
            pub marinade_finance_program: Pubkey,
            pub state: Pubkey,
            pub msol_mint: Pubkey,
            pub liq_pool_sol_leg_pda: Pubkey,
            pub liq_pool_msol_leg: Pubkey,
            pub treasury_msol_account: Pubkey,
            pub get_msol_from: Pubkey,
            pub get_msol_from_authority: Pubkey,
            pub transfer_sol_to: Pubkey,
            pub system_program: Pubkey,
            pub token_program: Pubkey,
            pub user_wsol_token_account: Pubkey,
    }
    
        impl anchor_lang::ToAccountMetas for MarinadeUnstake {
            fn to_account_metas(
                &self,
                is_signer: Option<bool>,
            ) -> Vec<anchor_lang::solana_program::instruction::AccountMeta> {
                let mut account_metas = vec![];
                account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.marinade_finance_program,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.state,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.msol_mint,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.liq_pool_sol_leg_pda,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.liq_pool_msol_leg,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.treasury_msol_account,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.get_msol_from,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.get_msol_from_authority,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.transfer_sol_to,
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
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.user_wsol_token_account,
                false,
            ));
                account_metas
            }
        }
    
    #[cfg_attr(not(target_os="solana"), derive(Debug))]
    #[derive(AnchorSerialize)]
    pub struct AldrinSwap {
            pub swap_program: Pubkey,
            pub pool: Pubkey,
            pub pool_signer: Pubkey,
            pub pool_mint: Pubkey,
            pub base_token_vault: Pubkey,
            pub quote_token_vault: Pubkey,
            pub fee_pool_token_account: Pubkey,
            pub wallet_authority: Pubkey,
            pub user_base_token_account: Pubkey,
            pub user_quote_token_account: Pubkey,
            pub token_program: Pubkey,
    }
    
        impl anchor_lang::ToAccountMetas for AldrinSwap {
            fn to_account_metas(
                &self,
                is_signer: Option<bool>,
            ) -> Vec<anchor_lang::solana_program::instruction::AccountMeta> {
                let mut account_metas = vec![];
                account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.swap_program,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.pool,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.pool_signer,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.pool_mint,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.base_token_vault,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.quote_token_vault,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.fee_pool_token_account,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.wallet_authority,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.user_base_token_account,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.user_quote_token_account,
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
    pub struct AldrinV2Swap {
            pub swap_program: Pubkey,
            pub pool: Pubkey,
            pub pool_signer: Pubkey,
            pub pool_mint: Pubkey,
            pub base_token_vault: Pubkey,
            pub quote_token_vault: Pubkey,
            pub fee_pool_token_account: Pubkey,
            pub wallet_authority: Pubkey,
            pub user_base_token_account: Pubkey,
            pub user_quote_token_account: Pubkey,
            pub curve: Pubkey,
            pub token_program: Pubkey,
    }
    
        impl anchor_lang::ToAccountMetas for AldrinV2Swap {
            fn to_account_metas(
                &self,
                is_signer: Option<bool>,
            ) -> Vec<anchor_lang::solana_program::instruction::AccountMeta> {
                let mut account_metas = vec![];
                account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.swap_program,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.pool,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.pool_signer,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.pool_mint,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.base_token_vault,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.quote_token_vault,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.fee_pool_token_account,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.wallet_authority,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.user_base_token_account,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.user_quote_token_account,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.curve,
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
    pub struct WhirlpoolSwap {
            pub swap_program: Pubkey,
            pub token_program: Pubkey,
            pub token_authority: Pubkey,
            pub whirlpool: Pubkey,
            pub token_owner_account_a: Pubkey,
            pub token_vault_a: Pubkey,
            pub token_owner_account_b: Pubkey,
            pub token_vault_b: Pubkey,
            pub tick_array_0: Pubkey,
            pub tick_array_1: Pubkey,
            pub tick_array_2: Pubkey,
            pub oracle: Pubkey,
    }
    
        impl anchor_lang::ToAccountMetas for WhirlpoolSwap {
            fn to_account_metas(
                &self,
                is_signer: Option<bool>,
            ) -> Vec<anchor_lang::solana_program::instruction::AccountMeta> {
                let mut account_metas = vec![];
                account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.swap_program,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.token_program,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.token_authority,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.whirlpool,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.token_owner_account_a,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.token_vault_a,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.token_owner_account_b,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.token_vault_b,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.tick_array_0,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.tick_array_1,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.tick_array_2,
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
    pub struct WhirlpoolSwapV2 {
            pub swap_program: Pubkey,
            pub token_program_a: Pubkey,
            pub token_program_b: Pubkey,
            pub memo_program: Pubkey,
            pub token_authority: Pubkey,
            pub whirlpool: Pubkey,
            pub token_mint_a: Pubkey,
            pub token_mint_b: Pubkey,
            pub token_owner_account_a: Pubkey,
            pub token_vault_a: Pubkey,
            pub token_owner_account_b: Pubkey,
            pub token_vault_b: Pubkey,
            pub tick_array_0: Pubkey,
            pub tick_array_1: Pubkey,
            pub tick_array_2: Pubkey,
            pub oracle: Pubkey,
    }
    
        impl anchor_lang::ToAccountMetas for WhirlpoolSwapV2 {
            fn to_account_metas(
                &self,
                is_signer: Option<bool>,
            ) -> Vec<anchor_lang::solana_program::instruction::AccountMeta> {
                let mut account_metas = vec![];
                account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.swap_program,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.token_program_a,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.token_program_b,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.memo_program,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.token_authority,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.whirlpool,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.token_mint_a,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.token_mint_b,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.token_owner_account_a,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.token_vault_a,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.token_owner_account_b,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.token_vault_b,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.tick_array_0,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.tick_array_1,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.tick_array_2,
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
    pub struct InvariantSwap {
            pub swap_program: Pubkey,
            pub state: Pubkey,
            pub pool: Pubkey,
            pub tickmap: Pubkey,
            pub account_x: Pubkey,
            pub account_y: Pubkey,
            pub reserve_x: Pubkey,
            pub reserve_y: Pubkey,
            pub owner: Pubkey,
            pub program_authority: Pubkey,
            pub token_program: Pubkey,
    }
    
        impl anchor_lang::ToAccountMetas for InvariantSwap {
            fn to_account_metas(
                &self,
                is_signer: Option<bool>,
            ) -> Vec<anchor_lang::solana_program::instruction::AccountMeta> {
                let mut account_metas = vec![];
                account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.swap_program,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.state,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.pool,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.tickmap,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.account_x,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.account_y,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.reserve_x,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.reserve_y,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.owner,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.program_authority,
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
    pub struct MeteoraSwap {
            pub swap_program: Pubkey,
            pub pool: Pubkey,
            pub user_source_token: Pubkey,
            pub user_destination_token: Pubkey,
            pub a_vault: Pubkey,
            pub b_vault: Pubkey,
            pub a_token_vault: Pubkey,
            pub b_token_vault: Pubkey,
            pub a_vault_lp_mint: Pubkey,
            pub b_vault_lp_mint: Pubkey,
            pub a_vault_lp: Pubkey,
            pub b_vault_lp: Pubkey,
            pub admin_token_fee: Pubkey,
            pub user: Pubkey,
            pub vault_program: Pubkey,
            pub token_program: Pubkey,
    }
    
        impl anchor_lang::ToAccountMetas for MeteoraSwap {
            fn to_account_metas(
                &self,
                is_signer: Option<bool>,
            ) -> Vec<anchor_lang::solana_program::instruction::AccountMeta> {
                let mut account_metas = vec![];
                account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.swap_program,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.pool,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.user_source_token,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.user_destination_token,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.a_vault,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.b_vault,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.a_token_vault,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.b_token_vault,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.a_vault_lp_mint,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.b_vault_lp_mint,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.a_vault_lp,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.b_vault_lp,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.admin_token_fee,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.user,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.vault_program,
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
    pub struct GoosefxSwap {
            pub swap_program: Pubkey,
            pub controller: Pubkey,
            pub pair: Pubkey,
            pub ssl_in: Pubkey,
            pub ssl_out: Pubkey,
            pub liability_vault_in: Pubkey,
            pub swapped_liability_vault_in: Pubkey,
            pub liability_vault_out: Pubkey,
            pub swapped_liability_vault_out: Pubkey,
            pub user_in_ata: Pubkey,
            pub user_out_ata: Pubkey,
            pub fee_collector_ata: Pubkey,
            pub user_wallet: Pubkey,
            pub fee_collector: Pubkey,
            pub token_program: Pubkey,
    }
    
        impl anchor_lang::ToAccountMetas for GoosefxSwap {
            fn to_account_metas(
                &self,
                is_signer: Option<bool>,
            ) -> Vec<anchor_lang::solana_program::instruction::AccountMeta> {
                let mut account_metas = vec![];
                account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.swap_program,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.controller,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.pair,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.ssl_in,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.ssl_out,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.liability_vault_in,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.swapped_liability_vault_in,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.liability_vault_out,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.swapped_liability_vault_out,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.user_in_ata,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.user_out_ata,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.fee_collector_ata,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.user_wallet,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.fee_collector,
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
    pub struct DeltafiSwap {
            pub swap_program: Pubkey,
            pub market_config: Pubkey,
            pub swap_info: Pubkey,
            pub user_source_token: Pubkey,
            pub user_destination_token: Pubkey,
            pub swap_source_token: Pubkey,
            pub swap_destination_token: Pubkey,
            pub deltafi_user: Pubkey,
            pub admin_destination_token: Pubkey,
            pub pyth_price_base: Pubkey,
            pub pyth_price_quote: Pubkey,
            pub user_authority: Pubkey,
            pub token_program: Pubkey,
    }
    
        impl anchor_lang::ToAccountMetas for DeltafiSwap {
            fn to_account_metas(
                &self,
                is_signer: Option<bool>,
            ) -> Vec<anchor_lang::solana_program::instruction::AccountMeta> {
                let mut account_metas = vec![];
                account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.swap_program,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.market_config,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.swap_info,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.user_source_token,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.user_destination_token,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.swap_source_token,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.swap_destination_token,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.deltafi_user,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.admin_destination_token,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.pyth_price_base,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.pyth_price_quote,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.user_authority,
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
    pub struct BalansolSwap {
            pub swap_program: Pubkey,
            pub authority: Pubkey,
            pub pool: Pubkey,
            pub tax_man: Pubkey,
            pub bid_mint: Pubkey,
            pub treasurer: Pubkey,
            pub src_treasury: Pubkey,
            pub src_associated_token_account: Pubkey,
            pub ask_mint: Pubkey,
            pub dst_treasury: Pubkey,
            pub dst_associated_token_account: Pubkey,
            pub dst_token_account_taxman: Pubkey,
            pub system_program: Pubkey,
            pub token_program: Pubkey,
            pub associated_token_program: Pubkey,
            pub rent: Pubkey,
    }
    
        impl anchor_lang::ToAccountMetas for BalansolSwap {
            fn to_account_metas(
                &self,
                is_signer: Option<bool>,
            ) -> Vec<anchor_lang::solana_program::instruction::AccountMeta> {
                let mut account_metas = vec![];
                account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.swap_program,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.authority,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.pool,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.tax_man,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.bid_mint,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.treasurer,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.src_treasury,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.src_associated_token_account,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.ask_mint,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.dst_treasury,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.dst_associated_token_account,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.dst_token_account_taxman,
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
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.associated_token_program,
                false,
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
    pub struct MarcoPoloSwap {
            pub swap_program: Pubkey,
            pub state: Pubkey,
            pub pool: Pubkey,
            pub token_x: Pubkey,
            pub token_y: Pubkey,
            pub pool_x_account: Pubkey,
            pub pool_y_account: Pubkey,
            pub swapper_x_account: Pubkey,
            pub swapper_y_account: Pubkey,
            pub swapper: Pubkey,
            pub referrer_x_account: Pubkey,
            pub referrer_y_account: Pubkey,
            pub referrer: Pubkey,
            pub program_authority: Pubkey,
            pub system_program: Pubkey,
            pub token_program: Pubkey,
            pub associated_token_program: Pubkey,
            pub rent: Pubkey,
    }
    
        impl anchor_lang::ToAccountMetas for MarcoPoloSwap {
            fn to_account_metas(
                &self,
                is_signer: Option<bool>,
            ) -> Vec<anchor_lang::solana_program::instruction::AccountMeta> {
                let mut account_metas = vec![];
                account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.swap_program,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.state,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.pool,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.token_x,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.token_y,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.pool_x_account,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.pool_y_account,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.swapper_x_account,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.swapper_y_account,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.swapper,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.referrer_x_account,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.referrer_y_account,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.referrer,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.program_authority,
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
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.associated_token_program,
                false,
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
    pub struct DradexSwap {
            pub swap_program: Pubkey,
            pub pair: Pubkey,
            pub market: Pubkey,
            pub event_queue: Pubkey,
            pub dex_user: Pubkey,
            pub market_user: Pubkey,
            pub bids: Pubkey,
            pub asks: Pubkey,
            pub t_0_vault: Pubkey,
            pub t_1_vault: Pubkey,
            pub t_0_user: Pubkey,
            pub t_1_user: Pubkey,
            pub master: Pubkey,
            pub signer: Pubkey,
            pub system_program: Pubkey,
            pub token_program: Pubkey,
            pub logger: Pubkey,
    }
    
        impl anchor_lang::ToAccountMetas for DradexSwap {
            fn to_account_metas(
                &self,
                is_signer: Option<bool>,
            ) -> Vec<anchor_lang::solana_program::instruction::AccountMeta> {
                let mut account_metas = vec![];
                account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.swap_program,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.pair,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.market,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.event_queue,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.dex_user,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.market_user,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.bids,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.asks,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.t_0_vault,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.t_1_vault,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.t_0_user,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.t_1_user,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.master,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.signer,
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
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.logger,
                false,
            ));
                account_metas
            }
        }
    
    #[cfg_attr(not(target_os="solana"), derive(Debug))]
    #[derive(AnchorSerialize)]
    pub struct LifinityV2Swap {
            pub swap_program: Pubkey,
            pub authority: Pubkey,
            pub amm: Pubkey,
            pub user_transfer_authority: Pubkey,
            pub source_info: Pubkey,
            pub destination_info: Pubkey,
            pub swap_source: Pubkey,
            pub swap_destination: Pubkey,
            pub pool_mint: Pubkey,
            pub fee_account: Pubkey,
            pub token_program: Pubkey,
            pub oracle_main_account: Pubkey,
            pub oracle_sub_account: Pubkey,
            pub oracle_pc_account: Pubkey,
    }
    
        impl anchor_lang::ToAccountMetas for LifinityV2Swap {
            fn to_account_metas(
                &self,
                is_signer: Option<bool>,
            ) -> Vec<anchor_lang::solana_program::instruction::AccountMeta> {
                let mut account_metas = vec![];
                account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.swap_program,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.authority,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.amm,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.user_transfer_authority,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.source_info,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.destination_info,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.swap_source,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.swap_destination,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.pool_mint,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.fee_account,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.token_program,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.oracle_main_account,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.oracle_sub_account,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.oracle_pc_account,
                false,
            ));
                account_metas
            }
        }
    
    #[cfg_attr(not(target_os="solana"), derive(Debug))]
    #[derive(AnchorSerialize)]
    pub struct RaydiumClmmSwap {
            pub swap_program: Pubkey,
            pub payer: Pubkey,
            pub amm_config: Pubkey,
            pub pool_state: Pubkey,
            pub input_token_account: Pubkey,
            pub output_token_account: Pubkey,
            pub input_vault: Pubkey,
            pub output_vault: Pubkey,
            pub observation_state: Pubkey,
            pub token_program: Pubkey,
            pub tick_array: Pubkey,
    }
    
        impl anchor_lang::ToAccountMetas for RaydiumClmmSwap {
            fn to_account_metas(
                &self,
                is_signer: Option<bool>,
            ) -> Vec<anchor_lang::solana_program::instruction::AccountMeta> {
                let mut account_metas = vec![];
                account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.swap_program,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.payer,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.amm_config,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.pool_state,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.input_token_account,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.output_token_account,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.input_vault,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.output_vault,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.observation_state,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.token_program,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.tick_array,
                false,
            ));
                account_metas
            }
        }
    
    #[cfg_attr(not(target_os="solana"), derive(Debug))]
    #[derive(AnchorSerialize)]
    pub struct RaydiumClmmSwapV2 {
            pub swap_program: Pubkey,
            pub payer: Pubkey,
            pub amm_config: Pubkey,
            pub pool_state: Pubkey,
            pub input_token_account: Pubkey,
            pub output_token_account: Pubkey,
            pub input_vault: Pubkey,
            pub output_vault: Pubkey,
            pub observation_state: Pubkey,
            pub token_program: Pubkey,
            pub token_program_2022: Pubkey,
            pub memo_program: Pubkey,
            pub input_vault_mint: Pubkey,
            pub output_vault_mint: Pubkey,
    }
    
        impl anchor_lang::ToAccountMetas for RaydiumClmmSwapV2 {
            fn to_account_metas(
                &self,
                is_signer: Option<bool>,
            ) -> Vec<anchor_lang::solana_program::instruction::AccountMeta> {
                let mut account_metas = vec![];
                account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.swap_program,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.payer,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.amm_config,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.pool_state,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.input_token_account,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.output_token_account,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.input_vault,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.output_vault,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.observation_state,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.token_program,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.token_program_2022,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.memo_program,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.input_vault_mint,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.output_vault_mint,
                false,
            ));
                account_metas
            }
        }
    
    #[cfg_attr(not(target_os="solana"), derive(Debug))]
    #[derive(AnchorSerialize)]
    pub struct PhoenixSwap {
            pub swap_program: Pubkey,
            pub log_authority: Pubkey,
            pub market: Pubkey,
            pub trader: Pubkey,
            pub base_account: Pubkey,
            pub quote_account: Pubkey,
            pub base_vault: Pubkey,
            pub quote_vault: Pubkey,
            pub token_program: Pubkey,
    }
    
        impl anchor_lang::ToAccountMetas for PhoenixSwap {
            fn to_account_metas(
                &self,
                is_signer: Option<bool>,
            ) -> Vec<anchor_lang::solana_program::instruction::AccountMeta> {
                let mut account_metas = vec![];
                account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.swap_program,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.log_authority,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.market,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.trader,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.base_account,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.quote_account,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.base_vault,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.quote_vault,
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
    pub struct SymmetrySwap {
            pub swap_program: Pubkey,
            pub buyer: Pubkey,
            pub fund_state: Pubkey,
            pub pda_account: Pubkey,
            pub pda_from_token_account: Pubkey,
            pub buyer_from_token_account: Pubkey,
            pub pda_to_token_account: Pubkey,
            pub buyer_to_token_account: Pubkey,
            pub swap_fee_account: Pubkey,
            pub host_fee_account: Pubkey,
            pub manager_fee_account: Pubkey,
            pub token_list: Pubkey,
            pub prism_data: Pubkey,
            pub token_program: Pubkey,
    }
    
        impl anchor_lang::ToAccountMetas for SymmetrySwap {
            fn to_account_metas(
                &self,
                is_signer: Option<bool>,
            ) -> Vec<anchor_lang::solana_program::instruction::AccountMeta> {
                let mut account_metas = vec![];
                account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.swap_program,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.buyer,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.fund_state,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.pda_account,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.pda_from_token_account,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.buyer_from_token_account,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.pda_to_token_account,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.buyer_to_token_account,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.swap_fee_account,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.host_fee_account,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.manager_fee_account,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.token_list,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.prism_data,
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
    pub struct HeliumTreasuryManagementRedeemV0 {
            pub swap_program: Pubkey,
            pub treasury_management: Pubkey,
            pub treasury_mint: Pubkey,
            pub supply_mint: Pubkey,
            pub treasury: Pubkey,
            pub circuit_breaker: Pubkey,
            pub from: Pubkey,
            pub to: Pubkey,
            pub owner: Pubkey,
            pub circuit_breaker_program: Pubkey,
            pub token_program: Pubkey,
    }
    
        impl anchor_lang::ToAccountMetas for HeliumTreasuryManagementRedeemV0 {
            fn to_account_metas(
                &self,
                is_signer: Option<bool>,
            ) -> Vec<anchor_lang::solana_program::instruction::AccountMeta> {
                let mut account_metas = vec![];
                account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.swap_program,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.treasury_management,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.treasury_mint,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.supply_mint,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.treasury,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.circuit_breaker,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.from,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.to,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.owner,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.circuit_breaker_program,
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
    pub struct GoosefxV2Swap {
            pub swap_program: Pubkey,
            pub pair: Pubkey,
            pub pool_registry: Pubkey,
            pub user_wallet: Pubkey,
            pub ssl_pool_in_signer: Pubkey,
            pub ssl_pool_out_signer: Pubkey,
            pub user_ata_in: Pubkey,
            pub user_ata_out: Pubkey,
            pub ssl_out_main_vault: Pubkey,
            pub ssl_out_secondary_vault: Pubkey,
            pub ssl_in_main_vault: Pubkey,
            pub ssl_in_secondary_vault: Pubkey,
            pub ssl_out_fee_vault: Pubkey,
            pub fee_destination: Pubkey,
            pub output_token_price_history: Pubkey,
            pub output_token_oracle: Pubkey,
            pub input_token_price_history: Pubkey,
            pub input_token_oracle: Pubkey,
            pub event_emitter: Pubkey,
            pub token_program: Pubkey,
    }
    
        impl anchor_lang::ToAccountMetas for GoosefxV2Swap {
            fn to_account_metas(
                &self,
                is_signer: Option<bool>,
            ) -> Vec<anchor_lang::solana_program::instruction::AccountMeta> {
                let mut account_metas = vec![];
                account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.swap_program,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.pair,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.pool_registry,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.user_wallet,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.ssl_pool_in_signer,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.ssl_pool_out_signer,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.user_ata_in,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.user_ata_out,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.ssl_out_main_vault,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.ssl_out_secondary_vault,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.ssl_in_main_vault,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.ssl_in_secondary_vault,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.ssl_out_fee_vault,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.fee_destination,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.output_token_price_history,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.output_token_oracle,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.input_token_price_history,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.input_token_oracle,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.event_emitter,
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
    pub struct PerpsSwap {
            pub swap_program: Pubkey,
            pub owner: Pubkey,
            pub funding_account: Pubkey,
            pub receiving_account: Pubkey,
            pub transfer_authority: Pubkey,
            pub perpetuals: Pubkey,
            pub pool: Pubkey,
            pub receiving_custody: Pubkey,
            pub receiving_custody_oracle_account: Pubkey,
            pub receiving_custody_token_account: Pubkey,
            pub dispensing_custody: Pubkey,
            pub dispensing_custody_oracle_account: Pubkey,
            pub dispensing_custody_token_account: Pubkey,
            pub token_program: Pubkey,
            pub event_authority: Pubkey,
            pub program: Pubkey,
    }
    
        impl anchor_lang::ToAccountMetas for PerpsSwap {
            fn to_account_metas(
                &self,
                is_signer: Option<bool>,
            ) -> Vec<anchor_lang::solana_program::instruction::AccountMeta> {
                let mut account_metas = vec![];
                account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.swap_program,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.owner,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.funding_account,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.receiving_account,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.transfer_authority,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.perpetuals,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.pool,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.receiving_custody,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.receiving_custody_oracle_account,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.receiving_custody_token_account,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.dispensing_custody,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.dispensing_custody_oracle_account,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.dispensing_custody_token_account,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.token_program,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.event_authority,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.program,
                false,
            ));
                account_metas
            }
        }
    
    #[cfg_attr(not(target_os="solana"), derive(Debug))]
    #[derive(AnchorSerialize)]
    pub struct PerpsAddLiquidity {
            pub swap_program: Pubkey,
            pub owner: Pubkey,
            pub funding_or_receiving_account: Pubkey,
            pub lp_token_account: Pubkey,
            pub transfer_authority: Pubkey,
            pub perpetuals: Pubkey,
            pub pool: Pubkey,
            pub custody: Pubkey,
            pub custody_oracle_account: Pubkey,
            pub custody_token_account: Pubkey,
            pub lp_token_mint: Pubkey,
            pub token_program: Pubkey,
            pub event_authority: Pubkey,
            pub program: Pubkey,
    }
    
        impl anchor_lang::ToAccountMetas for PerpsAddLiquidity {
            fn to_account_metas(
                &self,
                is_signer: Option<bool>,
            ) -> Vec<anchor_lang::solana_program::instruction::AccountMeta> {
                let mut account_metas = vec![];
                account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.swap_program,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.owner,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.funding_or_receiving_account,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.lp_token_account,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.transfer_authority,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.perpetuals,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.pool,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.custody,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.custody_oracle_account,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.custody_token_account,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.lp_token_mint,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.token_program,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.event_authority,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.program,
                false,
            ));
                account_metas
            }
        }
    
    #[cfg_attr(not(target_os="solana"), derive(Debug))]
    #[derive(AnchorSerialize)]
    pub struct PerpsRemoveLiquidity {
            pub swap_program: Pubkey,
            pub owner: Pubkey,
            pub funding_or_receiving_account: Pubkey,
            pub lp_token_account: Pubkey,
            pub transfer_authority: Pubkey,
            pub perpetuals: Pubkey,
            pub pool: Pubkey,
            pub custody: Pubkey,
            pub custody_oracle_account: Pubkey,
            pub custody_token_account: Pubkey,
            pub lp_token_mint: Pubkey,
            pub token_program: Pubkey,
            pub event_authority: Pubkey,
            pub program: Pubkey,
    }
    
        impl anchor_lang::ToAccountMetas for PerpsRemoveLiquidity {
            fn to_account_metas(
                &self,
                is_signer: Option<bool>,
            ) -> Vec<anchor_lang::solana_program::instruction::AccountMeta> {
                let mut account_metas = vec![];
                account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.swap_program,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.owner,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.funding_or_receiving_account,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.lp_token_account,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.transfer_authority,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.perpetuals,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.pool,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.custody,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.custody_oracle_account,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.custody_token_account,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.lp_token_mint,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.token_program,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.event_authority,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.program,
                false,
            ));
                account_metas
            }
        }
    
    #[cfg_attr(not(target_os="solana"), derive(Debug))]
    #[derive(AnchorSerialize)]
    pub struct MeteoraDlmmSwap {
            pub swap_program: Pubkey,
            pub lb_pair: Pubkey,
            pub bin_array_bitmap_extension: Pubkey,
            pub reserve_x: Pubkey,
            pub reserve_y: Pubkey,
            pub user_token_in: Pubkey,
            pub user_token_out: Pubkey,
            pub token_x_mint: Pubkey,
            pub token_y_mint: Pubkey,
            pub oracle: Pubkey,
            pub host_fee_in: Pubkey,
            pub user: Pubkey,
            pub token_x_program: Pubkey,
            pub token_y_program: Pubkey,
            pub event_authority: Pubkey,
            pub program: Pubkey,
    }
    
        impl anchor_lang::ToAccountMetas for MeteoraDlmmSwap {
            fn to_account_metas(
                &self,
                is_signer: Option<bool>,
            ) -> Vec<anchor_lang::solana_program::instruction::AccountMeta> {
                let mut account_metas = vec![];
                account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.swap_program,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.lb_pair,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.bin_array_bitmap_extension,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.reserve_x,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.reserve_y,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.user_token_in,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.user_token_out,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.token_x_mint,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.token_y_mint,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.oracle,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.host_fee_in,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.user,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.token_x_program,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.token_y_program,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.event_authority,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.program,
                false,
            ));
                account_metas
            }
        }
    
    #[cfg_attr(not(target_os="solana"), derive(Debug))]
    #[derive(AnchorSerialize)]
    pub struct OpenBookV2Swap {
            pub swap_program: Pubkey,
            pub signer: Pubkey,
            pub penalty_payer: Pubkey,
            pub market: Pubkey,
            pub market_authority: Pubkey,
            pub bids: Pubkey,
            pub asks: Pubkey,
            pub market_base_vault: Pubkey,
            pub market_quote_vault: Pubkey,
            pub event_heap: Pubkey,
            pub user_base_account: Pubkey,
            pub user_quote_account: Pubkey,
            pub oracle_a: Pubkey,
            pub oracle_b: Pubkey,
            pub token_program: Pubkey,
            pub system_program: Pubkey,
            pub open_orders_admin: Pubkey,
    }
    
        impl anchor_lang::ToAccountMetas for OpenBookV2Swap {
            fn to_account_metas(
                &self,
                is_signer: Option<bool>,
            ) -> Vec<anchor_lang::solana_program::instruction::AccountMeta> {
                let mut account_metas = vec![];
                account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.swap_program,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.signer,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.penalty_payer,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.market,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.market_authority,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.bids,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.asks,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.market_base_vault,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.market_quote_vault,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.event_heap,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.user_base_account,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.user_quote_account,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.oracle_a,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.oracle_b,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.token_program,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.system_program,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.open_orders_admin,
                false,
            ));
                account_metas
            }
        }
    
    #[cfg_attr(not(target_os="solana"), derive(Debug))]
    #[derive(AnchorSerialize)]
    pub struct CloneSwap {
            pub swap_program: Pubkey,
            pub user: Pubkey,
            pub clone: Pubkey,
            pub pools: Pubkey,
            pub oracles: Pubkey,
            pub user_collateral_token_account: Pubkey,
            pub user_onasset_token_account: Pubkey,
            pub onasset_mint: Pubkey,
            pub collateral_mint: Pubkey,
            pub collateral_vault: Pubkey,
            pub treasury_onasset_token_account: Pubkey,
            pub treasury_collateral_token_account: Pubkey,
            pub token_program: Pubkey,
            pub clone_staking: Pubkey,
            pub user_staking_account: Pubkey,
            pub clone_staking_program: Pubkey,
    }
    
        impl anchor_lang::ToAccountMetas for CloneSwap {
            fn to_account_metas(
                &self,
                is_signer: Option<bool>,
            ) -> Vec<anchor_lang::solana_program::instruction::AccountMeta> {
                let mut account_metas = vec![];
                account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.swap_program,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.user,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.clone,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.pools,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.oracles,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.user_collateral_token_account,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.user_onasset_token_account,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.onasset_mint,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.collateral_mint,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.collateral_vault,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.treasury_onasset_token_account,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.treasury_collateral_token_account,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.token_program,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.clone_staking,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.user_staking_account,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.clone_staking_program,
                false,
            ));
                account_metas
            }
        }
    
    #[cfg_attr(not(target_os="solana"), derive(Debug))]
    #[derive(AnchorSerialize)]
    pub struct RaydiumCpSwap {
            pub swap_program: Pubkey,
            pub payer: Pubkey,
            pub authority: Pubkey,
            pub amm_config: Pubkey,
            pub pool_state: Pubkey,
            pub input_token_account: Pubkey,
            pub output_token_account: Pubkey,
            pub input_vault: Pubkey,
            pub output_vault: Pubkey,
            pub input_token_program: Pubkey,
            pub output_token_program: Pubkey,
            pub input_token_mint: Pubkey,
            pub output_token_mint: Pubkey,
            pub observation_state: Pubkey,
    }
    
        impl anchor_lang::ToAccountMetas for RaydiumCpSwap {
            fn to_account_metas(
                &self,
                is_signer: Option<bool>,
            ) -> Vec<anchor_lang::solana_program::instruction::AccountMeta> {
                let mut account_metas = vec![];
                account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.swap_program,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.payer,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.authority,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.amm_config,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.pool_state,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.input_token_account,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.output_token_account,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.input_vault,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.output_vault,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.input_token_program,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.output_token_program,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.input_token_mint,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.output_token_mint,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.observation_state,
                false,
            ));
                account_metas
            }
        }
    
    #[cfg_attr(not(target_os="solana"), derive(Debug))]
    #[derive(AnchorSerialize)]
    pub struct OneIntroSwap {
            pub swap_program: Pubkey,
            pub metadata_state: Pubkey,
            pub pool_state: Pubkey,
            pub pool_auth_pda: Pubkey,
            pub pool_token_in_account: Pubkey,
            pub pool_token_out_account: Pubkey,
            pub user: Pubkey,
            pub user_token_in_account: Pubkey,
            pub user_token_out_account: Pubkey,
            pub metadata_swap_fee_account: Pubkey,
            pub referral_token_account: Pubkey,
            pub token_program: Pubkey,
    }
    
        impl anchor_lang::ToAccountMetas for OneIntroSwap {
            fn to_account_metas(
                &self,
                is_signer: Option<bool>,
            ) -> Vec<anchor_lang::solana_program::instruction::AccountMeta> {
                let mut account_metas = vec![];
                account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.swap_program,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.metadata_state,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.pool_state,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.pool_auth_pda,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.pool_token_in_account,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.pool_token_out_account,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.user,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.user_token_in_account,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.user_token_out_account,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.metadata_swap_fee_account,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.referral_token_account,
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
    pub struct PumpdotfunWrappedBuy {
            pub swap_program: Pubkey,
            pub global: Pubkey,
            pub fee_recipient: Pubkey,
            pub mint: Pubkey,
            pub bonding_curve: Pubkey,
            pub associated_bonding_curve: Pubkey,
            pub associated_user: Pubkey,
            pub user: Pubkey,
            pub system_program: Pubkey,
            pub token_program: Pubkey,
            pub rent: Pubkey,
            pub event_authority: Pubkey,
            pub program: Pubkey,
            pub user_wsol_token_account: Pubkey,
            pub temp_wsol_token_account: Pubkey,
            pub wsol_mint: Pubkey,
    }
    
        impl anchor_lang::ToAccountMetas for PumpdotfunWrappedBuy {
            fn to_account_metas(
                &self,
                is_signer: Option<bool>,
            ) -> Vec<anchor_lang::solana_program::instruction::AccountMeta> {
                let mut account_metas = vec![];
                account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.swap_program,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.global,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.fee_recipient,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.mint,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.bonding_curve,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.associated_bonding_curve,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.associated_user,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.user,
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
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.rent,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.event_authority,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.program,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.user_wsol_token_account,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.temp_wsol_token_account,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.wsol_mint,
                false,
            ));
                account_metas
            }
        }
    
    #[cfg_attr(not(target_os="solana"), derive(Debug))]
    #[derive(AnchorSerialize)]
    pub struct PumpdotfunWrappedSell {
            pub swap_program: Pubkey,
            pub global: Pubkey,
            pub fee_recipient: Pubkey,
            pub mint: Pubkey,
            pub bonding_curve: Pubkey,
            pub associated_bonding_curve: Pubkey,
            pub associated_user: Pubkey,
            pub user: Pubkey,
            pub system_program: Pubkey,
            pub associated_token_program: Pubkey,
            pub token_program: Pubkey,
            pub event_authority: Pubkey,
            pub program: Pubkey,
            pub user_wsol_token_account: Pubkey,
    }
    
        impl anchor_lang::ToAccountMetas for PumpdotfunWrappedSell {
            fn to_account_metas(
                &self,
                is_signer: Option<bool>,
            ) -> Vec<anchor_lang::solana_program::instruction::AccountMeta> {
                let mut account_metas = vec![];
                account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.swap_program,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.global,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.fee_recipient,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.mint,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.bonding_curve,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.associated_bonding_curve,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.associated_user,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.user,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.system_program,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.associated_token_program,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.token_program,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.event_authority,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.program,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.user_wsol_token_account,
                false,
            ));
                account_metas
            }
        }
    
    #[cfg_attr(not(target_os="solana"), derive(Debug))]
    #[derive(AnchorSerialize)]
    pub struct PerpsV2Swap {
            pub swap_program: Pubkey,
            pub owner: Pubkey,
            pub funding_account: Pubkey,
            pub receiving_account: Pubkey,
            pub transfer_authority: Pubkey,
            pub perpetuals: Pubkey,
            pub pool: Pubkey,
            pub receiving_custody: Pubkey,
            pub receiving_custody_doves_price_account: Pubkey,
            pub receiving_custody_pythnet_price_account: Pubkey,
            pub receiving_custody_token_account: Pubkey,
            pub dispensing_custody: Pubkey,
            pub dispensing_custody_doves_price_account: Pubkey,
            pub dispensing_custody_pythnet_price_account: Pubkey,
            pub dispensing_custody_token_account: Pubkey,
            pub token_program: Pubkey,
            pub event_authority: Pubkey,
            pub program: Pubkey,
    }
    
        impl anchor_lang::ToAccountMetas for PerpsV2Swap {
            fn to_account_metas(
                &self,
                is_signer: Option<bool>,
            ) -> Vec<anchor_lang::solana_program::instruction::AccountMeta> {
                let mut account_metas = vec![];
                account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.swap_program,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.owner,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.funding_account,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.receiving_account,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.transfer_authority,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.perpetuals,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.pool,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.receiving_custody,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.receiving_custody_doves_price_account,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.receiving_custody_pythnet_price_account,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.receiving_custody_token_account,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.dispensing_custody,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.dispensing_custody_doves_price_account,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.dispensing_custody_pythnet_price_account,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.dispensing_custody_token_account,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.token_program,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.event_authority,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.program,
                false,
            ));
                account_metas
            }
        }
    
    #[cfg_attr(not(target_os="solana"), derive(Debug))]
    #[derive(AnchorSerialize)]
    pub struct PerpsV2AddLiquidity {
            pub swap_program: Pubkey,
            pub owner: Pubkey,
            pub funding_or_receiving_account: Pubkey,
            pub lp_token_account: Pubkey,
            pub transfer_authority: Pubkey,
            pub perpetuals: Pubkey,
            pub pool: Pubkey,
            pub custody: Pubkey,
            pub custody_doves_price_account: Pubkey,
            pub custody_pythnet_price_account: Pubkey,
            pub custody_token_account: Pubkey,
            pub lp_token_mint: Pubkey,
            pub token_program: Pubkey,
            pub event_authority: Pubkey,
            pub program: Pubkey,
    }
    
        impl anchor_lang::ToAccountMetas for PerpsV2AddLiquidity {
            fn to_account_metas(
                &self,
                is_signer: Option<bool>,
            ) -> Vec<anchor_lang::solana_program::instruction::AccountMeta> {
                let mut account_metas = vec![];
                account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.swap_program,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.owner,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.funding_or_receiving_account,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.lp_token_account,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.transfer_authority,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.perpetuals,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.pool,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.custody,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.custody_doves_price_account,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.custody_pythnet_price_account,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.custody_token_account,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.lp_token_mint,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.token_program,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.event_authority,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.program,
                false,
            ));
                account_metas
            }
        }
    
    #[cfg_attr(not(target_os="solana"), derive(Debug))]
    #[derive(AnchorSerialize)]
    pub struct PerpsV2RemoveLiquidity {
            pub swap_program: Pubkey,
            pub owner: Pubkey,
            pub funding_or_receiving_account: Pubkey,
            pub lp_token_account: Pubkey,
            pub transfer_authority: Pubkey,
            pub perpetuals: Pubkey,
            pub pool: Pubkey,
            pub custody: Pubkey,
            pub custody_doves_price_account: Pubkey,
            pub custody_pythnet_price_account: Pubkey,
            pub custody_token_account: Pubkey,
            pub lp_token_mint: Pubkey,
            pub token_program: Pubkey,
            pub event_authority: Pubkey,
            pub program: Pubkey,
    }
    
        impl anchor_lang::ToAccountMetas for PerpsV2RemoveLiquidity {
            fn to_account_metas(
                &self,
                is_signer: Option<bool>,
            ) -> Vec<anchor_lang::solana_program::instruction::AccountMeta> {
                let mut account_metas = vec![];
                account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.swap_program,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.owner,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.funding_or_receiving_account,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.lp_token_account,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.transfer_authority,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.perpetuals,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.pool,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.custody,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.custody_doves_price_account,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.custody_pythnet_price_account,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.custody_token_account,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.lp_token_mint,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.token_program,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.event_authority,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.program,
                false,
            ));
                account_metas
            }
        }
    
    #[cfg_attr(not(target_os="solana"), derive(Debug))]
    #[derive(AnchorSerialize)]
    pub struct MoonshotWrappedBuy {
            pub swap_program: Pubkey,
            pub sender: Pubkey,
            pub sender_token_account: Pubkey,
            pub curve_account: Pubkey,
            pub curve_token_account: Pubkey,
            pub dex_fee: Pubkey,
            pub helio_fee: Pubkey,
            pub mint: Pubkey,
            pub config_account: Pubkey,
            pub token_program: Pubkey,
            pub associated_token_program: Pubkey,
            pub system_program: Pubkey,
            pub user_wsol_token_account: Pubkey,
            pub temp_wsol_token_account: Pubkey,
            pub wsol_mint: Pubkey,
    }
    
        impl anchor_lang::ToAccountMetas for MoonshotWrappedBuy {
            fn to_account_metas(
                &self,
                is_signer: Option<bool>,
            ) -> Vec<anchor_lang::solana_program::instruction::AccountMeta> {
                let mut account_metas = vec![];
                account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.swap_program,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.sender,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.sender_token_account,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.curve_account,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.curve_token_account,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.dex_fee,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.helio_fee,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.mint,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.config_account,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.token_program,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.associated_token_program,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.system_program,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.user_wsol_token_account,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.temp_wsol_token_account,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.wsol_mint,
                false,
            ));
                account_metas
            }
        }
    
    #[cfg_attr(not(target_os="solana"), derive(Debug))]
    #[derive(AnchorSerialize)]
    pub struct MoonshotWrappedSell {
            pub swap_program: Pubkey,
            pub sender: Pubkey,
            pub sender_token_account: Pubkey,
            pub curve_account: Pubkey,
            pub curve_token_account: Pubkey,
            pub dex_fee: Pubkey,
            pub helio_fee: Pubkey,
            pub mint: Pubkey,
            pub config_account: Pubkey,
            pub token_program: Pubkey,
            pub associated_token_program: Pubkey,
            pub system_program: Pubkey,
            pub user_wsol_token_account: Pubkey,
    }
    
        impl anchor_lang::ToAccountMetas for MoonshotWrappedSell {
            fn to_account_metas(
                &self,
                is_signer: Option<bool>,
            ) -> Vec<anchor_lang::solana_program::instruction::AccountMeta> {
                let mut account_metas = vec![];
                account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.swap_program,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.sender,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.sender_token_account,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.curve_account,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.curve_token_account,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.dex_fee,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.helio_fee,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.mint,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.config_account,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.token_program,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.associated_token_program,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.system_program,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.user_wsol_token_account,
                false,
            ));
                account_metas
            }
        }
    
    #[cfg_attr(not(target_os="solana"), derive(Debug))]
    #[derive(AnchorSerialize)]
    pub struct StabbleStableSwap {
            pub swap_program: Pubkey,
            pub user: Pubkey,
            pub user_token_in: Pubkey,
            pub user_token_out: Pubkey,
            pub vault_token_in: Pubkey,
            pub vault_token_out: Pubkey,
            pub beneficiary_token_out: Pubkey,
            pub pool: Pubkey,
            pub withdraw_authority: Pubkey,
            pub vault: Pubkey,
            pub vault_authority: Pubkey,
            pub vault_program: Pubkey,
            pub token_program: Pubkey,
    }
    
        impl anchor_lang::ToAccountMetas for StabbleStableSwap {
            fn to_account_metas(
                &self,
                is_signer: Option<bool>,
            ) -> Vec<anchor_lang::solana_program::instruction::AccountMeta> {
                let mut account_metas = vec![];
                account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.swap_program,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.user,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.user_token_in,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.user_token_out,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.vault_token_in,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.vault_token_out,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.beneficiary_token_out,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.pool,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.withdraw_authority,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.vault,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.vault_authority,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.vault_program,
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
    pub struct StabbleWeightedSwap {
            pub swap_program: Pubkey,
            pub user: Pubkey,
            pub user_token_in: Pubkey,
            pub user_token_out: Pubkey,
            pub vault_token_in: Pubkey,
            pub vault_token_out: Pubkey,
            pub beneficiary_token_out: Pubkey,
            pub pool: Pubkey,
            pub withdraw_authority: Pubkey,
            pub vault: Pubkey,
            pub vault_authority: Pubkey,
            pub vault_program: Pubkey,
            pub token_program: Pubkey,
    }
    
        impl anchor_lang::ToAccountMetas for StabbleWeightedSwap {
            fn to_account_metas(
                &self,
                is_signer: Option<bool>,
            ) -> Vec<anchor_lang::solana_program::instruction::AccountMeta> {
                let mut account_metas = vec![];
                account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.swap_program,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.user,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.user_token_in,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.user_token_out,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.vault_token_in,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.vault_token_out,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.beneficiary_token_out,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.pool,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.withdraw_authority,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.vault,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.vault_authority,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.vault_program,
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
    pub struct ObricSwap {
            pub swap_program: Pubkey,
            pub trading_pair: Pubkey,
            pub mint_x: Pubkey,
            pub mint_y: Pubkey,
            pub reserve_x: Pubkey,
            pub reserve_y: Pubkey,
            pub user_token_account_x: Pubkey,
            pub user_token_account_y: Pubkey,
            pub protocol_fee: Pubkey,
            pub x_price_feed: Pubkey,
            pub y_price_feed: Pubkey,
            pub user: Pubkey,
            pub token_program: Pubkey,
    }
    
        impl anchor_lang::ToAccountMetas for ObricSwap {
            fn to_account_metas(
                &self,
                is_signer: Option<bool>,
            ) -> Vec<anchor_lang::solana_program::instruction::AccountMeta> {
                let mut account_metas = vec![];
                account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.swap_program,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.trading_pair,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.mint_x,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.mint_y,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.reserve_x,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.reserve_y,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.user_token_account_x,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.user_token_account_y,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.protocol_fee,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.x_price_feed,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.y_price_feed,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.user,
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
    pub struct FoxBuyFromEstimatedCost {
            pub swap_program: Pubkey,
            pub user: Pubkey,
            pub config: Pubkey,
            pub mint_base: Pubkey,
            pub mint_y: Pubkey,
            pub mint_n: Pubkey,
            pub pot: Pubkey,
            pub user_ata_base: Pubkey,
            pub user_ata_buy: Pubkey,
            pub token_program: Pubkey,
    }
    
        impl anchor_lang::ToAccountMetas for FoxBuyFromEstimatedCost {
            fn to_account_metas(
                &self,
                is_signer: Option<bool>,
            ) -> Vec<anchor_lang::solana_program::instruction::AccountMeta> {
                let mut account_metas = vec![];
                account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.swap_program,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.user,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.config,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.mint_base,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.mint_y,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.mint_n,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.pot,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.user_ata_base,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.user_ata_buy,
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
    pub struct FoxClaimPartial {
            pub swap_program: Pubkey,
            pub user: Pubkey,
            pub config: Pubkey,
            pub mint_base: Pubkey,
            pub mint_y: Pubkey,
            pub mint_n: Pubkey,
            pub pot: Pubkey,
            pub user_ata_base: Pubkey,
            pub user_ata_y: Pubkey,
            pub user_ata_n: Pubkey,
            pub token_program: Pubkey,
    }
    
        impl anchor_lang::ToAccountMetas for FoxClaimPartial {
            fn to_account_metas(
                &self,
                is_signer: Option<bool>,
            ) -> Vec<anchor_lang::solana_program::instruction::AccountMeta> {
                let mut account_metas = vec![];
                account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.swap_program,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.user,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.config,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.mint_base,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.mint_y,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.mint_n,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.pot,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.user_ata_base,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.user_ata_y,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.user_ata_n,
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
    pub struct SolFiSwap {
            pub swap_program: Pubkey,
            pub token_transfer_authority: Pubkey,
            pub market_account: Pubkey,
            pub base_vault: Pubkey,
            pub quote_vault: Pubkey,
            pub user_base_ata: Pubkey,
            pub user_quote_ata: Pubkey,
            pub token_program: Pubkey,
            pub instructions_sysvar: Pubkey,
    }
    
        impl anchor_lang::ToAccountMetas for SolFiSwap {
            fn to_account_metas(
                &self,
                is_signer: Option<bool>,
            ) -> Vec<anchor_lang::solana_program::instruction::AccountMeta> {
                let mut account_metas = vec![];
                account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.swap_program,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.token_transfer_authority,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.market_account,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.base_vault,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.quote_vault,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.user_base_ata,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new(
                self.user_quote_ata,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.token_program,
                false,
            ));
            account_metas.push(anchor_lang::solana_program::instruction::AccountMeta::new_readonly(
                self.instructions_sysvar,
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
    use anchor_lang::Discriminator;
    use super::*;

    #[derive(AnchorDiscriminator, AnchorSerialize, AnchorDeserialize)]
    pub struct Route {
        pub route_plan: Vec<RoutePlanStep>,
        pub in_amount: u64,
        pub quoted_out_amount: u64,
        pub slippage_bps: u16,
        pub platform_fee_bps: u8,
    }
    
    impl anchor_lang::InstructionData for Route {
        fn data(&self) -> Vec<u8> {
            let mut data = Vec::with_capacity(256);
            data.extend_from_slice(&Self::DISCRIMINATOR);
            self.serialize(&mut data).unwrap();
            data
        }
    }
    

    #[derive(AnchorDiscriminator, AnchorSerialize, AnchorDeserialize)]
    pub struct RouteWithTokenLedger {
        pub route_plan: Vec<RoutePlanStep>,
        pub quoted_out_amount: u64,
        pub slippage_bps: u16,
        pub platform_fee_bps: u8,
    }
    
    impl anchor_lang::InstructionData for RouteWithTokenLedger {
        fn data(&self) -> Vec<u8> {
            let mut data = Vec::with_capacity(256);
            data.extend_from_slice(&Self::DISCRIMINATOR);
            self.serialize(&mut data).unwrap();
            data
        }
    }
    

    #[derive(AnchorDiscriminator, AnchorSerialize, AnchorDeserialize)]
    pub struct ExactOutRoute {
        pub route_plan: Vec<RoutePlanStep>,
        pub out_amount: u64,
        pub quoted_in_amount: u64,
        pub slippage_bps: u16,
        pub platform_fee_bps: u8,
    }
    
    impl anchor_lang::InstructionData for ExactOutRoute {
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
    pub struct SharedAccountsRoute {
        pub id: u8,
        pub route_plan: Vec<RoutePlanStep>,
        pub in_amount: u64,
        pub quoted_out_amount: u64,
        pub slippage_bps: u16,
        pub platform_fee_bps: u8,
    }
    
    impl anchor_lang::InstructionData for SharedAccountsRoute {
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
    pub struct SharedAccountsRouteWithTokenLedger {
        pub id: u8,
        pub route_plan: Vec<RoutePlanStep>,
        pub quoted_out_amount: u64,
        pub slippage_bps: u16,
        pub platform_fee_bps: u8,
    }
    
    impl anchor_lang::InstructionData for SharedAccountsRouteWithTokenLedger {
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
    pub struct SharedAccountsExactOutRoute {
        pub id: u8,
        pub route_plan: Vec<RoutePlanStep>,
        pub out_amount: u64,
        pub quoted_in_amount: u64,
        pub slippage_bps: u16,
        pub platform_fee_bps: u8,
    }
    
    impl anchor_lang::InstructionData for SharedAccountsExactOutRoute {
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
    pub struct SetTokenLedger {

    }
    
    impl anchor_lang::InstructionData for SetTokenLedger {
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
    pub struct CreateOpenOrders {

    }
    
    impl anchor_lang::InstructionData for CreateOpenOrders {
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
    pub struct CreateTokenAccount {
        pub bump: u8,
    }
    
    impl anchor_lang::InstructionData for CreateTokenAccount {
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
    pub struct CreateProgramOpenOrders {
        pub id: u8,
    }
    
    impl anchor_lang::InstructionData for CreateProgramOpenOrders {
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
    pub struct Claim {
        pub id: u8,
    }
    
    impl anchor_lang::InstructionData for Claim {
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
    pub struct ClaimToken {
        pub id: u8,
    }
    
    impl anchor_lang::InstructionData for ClaimToken {
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
    pub struct CreateTokenLedger {

    }
    
    impl anchor_lang::InstructionData for CreateTokenLedger {
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
    pub struct MercurialSwap {

    }
    
    impl anchor_lang::InstructionData for MercurialSwap {
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
    pub struct CykuraSwap {

    }
    
    impl anchor_lang::InstructionData for CykuraSwap {
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
    pub struct SerumSwap {

    }
    
    impl anchor_lang::InstructionData for SerumSwap {
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
    pub struct SaberSwap {

    }
    
    impl anchor_lang::InstructionData for SaberSwap {
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
    pub struct SaberAddDecimals {

    }
    
    impl anchor_lang::InstructionData for SaberAddDecimals {
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
    pub struct TokenSwap {

    }
    
    impl anchor_lang::InstructionData for TokenSwap {
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
    pub struct TokenSwapV2 {

    }
    
    impl anchor_lang::InstructionData for TokenSwapV2 {
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
    pub struct SenchaSwap {

    }
    
    impl anchor_lang::InstructionData for SenchaSwap {
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
    pub struct StepSwap {

    }
    
    impl anchor_lang::InstructionData for StepSwap {
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
    pub struct CropperSwap {

    }
    
    impl anchor_lang::InstructionData for CropperSwap {
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
    pub struct RaydiumSwap {

    }
    
    impl anchor_lang::InstructionData for RaydiumSwap {
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
    pub struct CremaSwap {

    }
    
    impl anchor_lang::InstructionData for CremaSwap {
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
    pub struct LifinitySwap {

    }
    
    impl anchor_lang::InstructionData for LifinitySwap {
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
    pub struct MarinadeDeposit {

    }
    
    impl anchor_lang::InstructionData for MarinadeDeposit {
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
    pub struct MarinadeUnstake {

    }
    
    impl anchor_lang::InstructionData for MarinadeUnstake {
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
    pub struct AldrinSwap {

    }
    
    impl anchor_lang::InstructionData for AldrinSwap {
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
    pub struct AldrinV2Swap {

    }
    
    impl anchor_lang::InstructionData for AldrinV2Swap {
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
    pub struct WhirlpoolSwap {

    }
    
    impl anchor_lang::InstructionData for WhirlpoolSwap {
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
    pub struct WhirlpoolSwapV2 {

    }
    
    impl anchor_lang::InstructionData for WhirlpoolSwapV2 {
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
    pub struct InvariantSwap {

    }
    
    impl anchor_lang::InstructionData for InvariantSwap {
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
    pub struct MeteoraSwap {

    }
    
    impl anchor_lang::InstructionData for MeteoraSwap {
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
    pub struct GoosefxSwap {

    }
    
    impl anchor_lang::InstructionData for GoosefxSwap {
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
    pub struct DeltafiSwap {

    }
    
    impl anchor_lang::InstructionData for DeltafiSwap {
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
    pub struct BalansolSwap {

    }
    
    impl anchor_lang::InstructionData for BalansolSwap {
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
    pub struct MarcoPoloSwap {

    }
    
    impl anchor_lang::InstructionData for MarcoPoloSwap {
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
    pub struct DradexSwap {

    }
    
    impl anchor_lang::InstructionData for DradexSwap {
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
    pub struct LifinityV2Swap {

    }
    
    impl anchor_lang::InstructionData for LifinityV2Swap {
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
    pub struct RaydiumClmmSwap {

    }
    
    impl anchor_lang::InstructionData for RaydiumClmmSwap {
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
    pub struct RaydiumClmmSwapV2 {

    }
    
    impl anchor_lang::InstructionData for RaydiumClmmSwapV2 {
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
    pub struct PhoenixSwap {

    }
    
    impl anchor_lang::InstructionData for PhoenixSwap {
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
    pub struct SymmetrySwap {

    }
    
    impl anchor_lang::InstructionData for SymmetrySwap {
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
    pub struct HeliumTreasuryManagementRedeemV0 {

    }
    
    impl anchor_lang::InstructionData for HeliumTreasuryManagementRedeemV0 {
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
    pub struct GoosefxV2Swap {

    }
    
    impl anchor_lang::InstructionData for GoosefxV2Swap {
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
    pub struct PerpsSwap {

    }
    
    impl anchor_lang::InstructionData for PerpsSwap {
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
    pub struct PerpsAddLiquidity {

    }
    
    impl anchor_lang::InstructionData for PerpsAddLiquidity {
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
    pub struct PerpsRemoveLiquidity {

    }
    
    impl anchor_lang::InstructionData for PerpsRemoveLiquidity {
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
    pub struct MeteoraDlmmSwap {

    }
    
    impl anchor_lang::InstructionData for MeteoraDlmmSwap {
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
    pub struct OpenBookV2Swap {

    }
    
    impl anchor_lang::InstructionData for OpenBookV2Swap {
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
    pub struct CloneSwap {

    }
    
    impl anchor_lang::InstructionData for CloneSwap {
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
    pub struct RaydiumCpSwap {

    }
    
    impl anchor_lang::InstructionData for RaydiumCpSwap {
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
    pub struct OneIntroSwap {

    }
    
    impl anchor_lang::InstructionData for OneIntroSwap {
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
    pub struct PumpdotfunWrappedBuy {

    }
    
    impl anchor_lang::InstructionData for PumpdotfunWrappedBuy {
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
    pub struct PumpdotfunWrappedSell {

    }
    
    impl anchor_lang::InstructionData for PumpdotfunWrappedSell {
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
    pub struct PerpsV2Swap {

    }
    
    impl anchor_lang::InstructionData for PerpsV2Swap {
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
    pub struct PerpsV2AddLiquidity {

    }
    
    impl anchor_lang::InstructionData for PerpsV2AddLiquidity {
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
    pub struct PerpsV2RemoveLiquidity {

    }
    
    impl anchor_lang::InstructionData for PerpsV2RemoveLiquidity {
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
    pub struct MoonshotWrappedBuy {

    }
    
    impl anchor_lang::InstructionData for MoonshotWrappedBuy {
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
    pub struct MoonshotWrappedSell {

    }
    
    impl anchor_lang::InstructionData for MoonshotWrappedSell {
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
    pub struct StabbleStableSwap {

    }
    
    impl anchor_lang::InstructionData for StabbleStableSwap {
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
    pub struct StabbleWeightedSwap {

    }
    
    impl anchor_lang::InstructionData for StabbleWeightedSwap {
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
    pub struct ObricSwap {

    }
    
    impl anchor_lang::InstructionData for ObricSwap {
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
    pub struct FoxBuyFromEstimatedCost {

    }
    
    impl anchor_lang::InstructionData for FoxBuyFromEstimatedCost {
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
    pub struct FoxClaimPartial {

    }
    
    impl anchor_lang::InstructionData for FoxClaimPartial {
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
    pub struct SolFiSwap {

    }
    
    impl anchor_lang::InstructionData for SolFiSwap {
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
    pub struct SwapEvent {
                pub amm: Pubkey,
                pub input_mint: Pubkey,
                pub input_amount: u64,
                pub output_mint: Pubkey,
                pub output_amount: u64
    }
        
    impl anchor_lang::Event for SwapEvent {
        fn data(&self) -> Vec<u8> {
            let mut data = Self::DISCRIMINATOR.to_vec();
            self.serialize(&mut data).unwrap();
            data
        }
    }
    
    #[cfg_attr(not(target_os="solana"), derive(Debug))]
    #[derive(AnchorDiscriminator, AnchorSerialize, AnchorDeserialize)]
    pub struct FeeEvent {
                pub account: Pubkey,
                pub mint: Pubkey,
                pub amount: u64
    }
        
    impl anchor_lang::Event for FeeEvent {
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
    pub struct TokenLedger {
        pub token_account: Pubkey,
        pub amount: u64
    }  
}
        
// Defined types
#[cfg_attr(not(target_os="solana"), derive(Debug))]
#[derive(Clone, AnchorSerialize, AnchorDeserialize)]
pub struct AmountWithSlippage {
    pub amount: u64,
    pub slippage_bps: u16,
}

#[cfg_attr(not(target_os="solana"), derive(Debug))]
#[derive(Clone, AnchorSerialize, AnchorDeserialize)]
pub struct RoutePlanStep {
    pub swap: Swap,
    pub percent: u8,
    pub input_index: u8,
    pub output_index: u8,
}

#[cfg_attr(not(target_os="solana"), derive(Debug))]
#[derive(Clone, AnchorSerialize, AnchorDeserialize, Copy, PartialEq, Eq)]
pub enum Side {
    Bid,
    Ask
}

#[cfg_attr(not(target_os="solana"), derive(Debug))]
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

#[cfg_attr(not(target_os="solana"), derive(Debug))]
#[derive(Clone, AnchorSerialize, AnchorDeserialize)]
pub struct RemainingAccountsSlice {
    pub accounts_type: AccountsType,
    pub length: u8,
}

#[cfg_attr(not(target_os="solana"), derive(Debug))]
#[derive(Clone, AnchorSerialize, AnchorDeserialize)]
pub struct RemainingAccountsInfo {
    pub slices: Vec<RemainingAccountsSlice>,
}

#[cfg_attr(not(target_os="solana"), derive(Debug))]
#[derive(Clone, AnchorSerialize, AnchorDeserialize, Copy, PartialEq, Eq)]
pub enum AccountsType {
    TransferHookA,
    TransferHookB
}