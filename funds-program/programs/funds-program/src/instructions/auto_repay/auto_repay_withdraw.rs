use anchor_lang::{
    prelude::*, 
    solana_program::{
        instruction::Instruction, 
        native_token::LAMPORTS_PER_SOL, 
        sysvar::instructions::{
            self,
            load_current_index_checked, 
            load_instruction_at_checked
        }
    }, 
    Discriminator
};
use anchor_spl::token::{self, Mint, Token, TokenAccount};
use drift::{
    cpi::{accounts::Withdraw as DriftWithdraw, withdraw as drift_withdraw},
    program::Drift, 
    state::{
        state::State as DriftState, 
        user::User as DriftUser
    }
};
use pyth_solana_receiver_sdk::price_update::{get_feed_id_from_hex, PriceUpdateV2};
use crate::{
    check, 
    constants::{AUTO_REPAY_MAX_SLIPPAGE_BPS, AUTO_REPAY_MIN_HEALTH_RESULT, BASE_UNITS_PER_USDC, DRIFT_MARKET_INDEX_SOL, JUPITER_EXACT_OUT_ROUTE_DISCRIMINATOR, JUPITER_ID, MAX_PRICE_AGE_SECONDS_SOL, MAX_PRICE_AGE_SECONDS_USDC, PYTH_FEED_SOL_USD, PYTH_FEED_USDC_USD, WSOL_MINT}, 
    errors::QuartzError, 
    helpers::get_jup_exact_out_route_out_amount, 
    load_mut, 
    math::{get_drift_margin_calculation, get_quartz_account_health}, 
    state::Vault
};

#[derive(Accounts)]
pub struct AutoRepayWithdraw<'info> {
    #[account(
        mut,
        seeds = [b"vault".as_ref(), owner.key().as_ref()],
        bump = vault.bump,
        has_one = owner
    )]
    pub vault: Box<Account<'info, Vault>>,

    #[account(
        mut,
        seeds = [vault.key().as_ref(), spl_mint.key().as_ref()],
        bump,
        token::mint = spl_mint,
        token::authority = vault
    )]
    pub vault_spl: Box<Account<'info, TokenAccount>>,

    /// CHECK: Can be any account, once it has a Vault
    pub owner: UncheckedAccount<'info>,

    #[account(mut)]
    pub caller: Signer<'info>,

    #[account(
        mut,
        associated_token::mint = spl_mint,
        associated_token::authority = caller
    )]
    pub caller_spl: Box<Account<'info, TokenAccount>>,

    #[account(
        constraint = spl_mint.key().eq(&WSOL_MINT) @ QuartzError::InvalidRepayMint
    )]
    pub spl_mint: Box<Account<'info, Mint>>,

    #[account(
        mut,
        seeds = [b"user".as_ref(), vault.key().as_ref(), (0u16).to_le_bytes().as_ref()],
        seeds::program = drift_program.key(),
        bump
    )]
    pub drift_user: AccountLoader<'info, DriftUser>,
    
    /// CHECK: This account is passed through to the Drift CPI, which performs the security checks
    #[account(mut)]
    pub drift_user_stats: UncheckedAccount<'info>,

    #[account(
        mut,
        seeds = [b"drift_state".as_ref()],
        seeds::program = drift_program.key(),
        bump
    )]
    pub drift_state: Box<Account<'info, DriftState>>,

    /// CHECK: This account is passed through to the Drift CPI, which performs the security checks
    #[account(mut)]
    pub spot_market_vault: UncheckedAccount<'info>,
    
    /// CHECK: This account is passed through to the Drift CPI, which performs the security checks
    pub drift_signer: UncheckedAccount<'info>,

    pub token_program: Program<'info, Token>,

    pub drift_program: Program<'info, Drift>,

    pub system_program: Program<'info, System>,

    pub deposit_price_update: Box<Account<'info, PriceUpdateV2>>,

    pub withdraw_price_update: Box<Account<'info, PriceUpdateV2>>,

    /// CHECK: Account is safe once address is correct
    #[account(address = instructions::ID)]
    instructions: UncheckedAccount<'info>,
}

#[inline(never)]
fn validate_instruction_order<'info>(
    start_instruction: &Instruction,
    swap_instruction: &Instruction,
    deposit_instruction: &Instruction
) -> Result<()> {
    // Check the 1st instruction is auto_repay_start
    check!(
        start_instruction.program_id.eq(&crate::id()),
        QuartzError::IllegalAutoRepayInstructions
    );

    check!(
        start_instruction.data[..8]
            .eq(&crate::instruction::AutoRepayStart::DISCRIMINATOR),
        QuartzError::IllegalAutoRepayInstructions
    );

    // Check the 2nd instruction is Jupiter's exact_out_route
    check!(
        swap_instruction.program_id.eq(&JUPITER_ID),
        QuartzError::IllegalAutoRepayInstructions
    );

    check!(
        swap_instruction.data[..8].eq(&JUPITER_EXACT_OUT_ROUTE_DISCRIMINATOR),
        QuartzError::IllegalAutoRepayInstructions
    );
    
    // Check the 3rd instruction is auto_repay_deposit
    check!(
        deposit_instruction.program_id.eq(&crate::id()),
        QuartzError::IllegalAutoRepayInstructions
    );

    check!(
        deposit_instruction.data[..8]
            .eq(&crate::instruction::AutoRepayDeposit::DISCRIMINATOR),
        QuartzError::IllegalAutoRepayInstructions
    );

    // This instruction is the 4th instruction

    Ok(())
}

#[inline(never)]
fn validate_user_accounts<'info>(
    ctx: &Context<'_, '_, '_, 'info, AutoRepayWithdraw<'info>>,
    start_instruction: &Instruction,
    deposit_instruction: &Instruction
) -> Result<()> {
    // Start instruction
    let start_owner = start_instruction.accounts[5].pubkey;
    check!(
        ctx.accounts.owner.key().eq(&start_owner),
        QuartzError::InvalidUserAccounts
    );

    let start_vault = start_instruction.accounts[3].pubkey;
    check!(
        ctx.accounts.vault.key().eq(&start_vault),
        QuartzError::InvalidUserAccounts
    );

    let start_vault_spl = start_instruction.accounts[4].pubkey;
    check!(
        ctx.accounts.vault_spl.key().eq(&start_vault_spl),
        QuartzError::InvalidUserAccounts
    );

    // Deposit instruction
    let deposit_vault = deposit_instruction.accounts[0].pubkey;
    check!(
        ctx.accounts.vault.key().eq(&deposit_vault),
        QuartzError::InvalidUserAccounts
    );

    let deposit_owner = deposit_instruction.accounts[2].pubkey;
    check!(
        ctx.accounts.owner.key().eq(&deposit_owner),
        QuartzError::InvalidUserAccounts
    );

    let deposit_caller = deposit_instruction.accounts[3].pubkey;
    check!(
        ctx.accounts.caller.key().eq(&deposit_caller),
        QuartzError::InvalidUserAccounts
    );

    let deposit_drift_user = deposit_instruction.accounts[6].pubkey;
    check!(
        ctx.accounts.drift_user.key().eq(&deposit_drift_user),
        QuartzError::InvalidUserAccounts
    );

    let deposit_drift_user_stats = deposit_instruction.accounts[7].pubkey;
    check!(
        ctx.accounts.drift_user_stats.key().eq(&deposit_drift_user_stats),
        QuartzError::InvalidUserAccounts
    );

    Ok(())
}

#[inline(never)]
fn validate_prices<'info>(
    ctx: &Context<'_, '_, '_, 'info, AutoRepayWithdraw<'info>>,
    deposit_amount: u64,
    withdraw_amount: u64
) -> Result<()> {
    // Get the deposit price, assuming worst case of lowest end of confidence interval
    let deposit_feed_id: [u8; 32] = get_feed_id_from_hex(PYTH_FEED_USDC_USD)?;
    let deposit_price = ctx.accounts.deposit_price_update.get_price_no_older_than(
        &Clock::get()?, 
        MAX_PRICE_AGE_SECONDS_USDC,
        &deposit_feed_id
    )?;
    check!(
        deposit_price.price > 0,
        QuartzError::NegativeOraclePrice
    );
    let deposit_lowest_price = (deposit_price.price as u64).checked_sub(deposit_price.conf)
        .ok_or(QuartzError::NegativeOraclePrice)?;

    // Get the withdraw price, assuming worst case of highest end of confidence interval
    let withdraw_feed_id: [u8; 32] = get_feed_id_from_hex(PYTH_FEED_SOL_USD)?;
    let withdraw_price = ctx.accounts.withdraw_price_update.get_price_no_older_than(
        &Clock::get()?,
        MAX_PRICE_AGE_SECONDS_SOL,
        &withdraw_feed_id
    )?;
    check!(
        withdraw_price.price > 0,
        QuartzError::NegativeOraclePrice
    );
    let withdraw_highest_price = (withdraw_price.price as u64) + withdraw_price.conf;

    // Check that the exponents are the same
    // TODO - Normalize the exponenets if they don't match
    check!(
        withdraw_price.exponent == deposit_price.exponent,
        QuartzError::InvalidPriceExponent
    );

    // Normalize usdc base units to the same decimals as SOL
    let deposit_amount_normalized = deposit_amount * (LAMPORTS_PER_SOL / BASE_UNITS_PER_USDC);

    // Calculate values
    let deposit_value = deposit_amount_normalized * deposit_lowest_price;
    let withdraw_value = withdraw_amount * withdraw_highest_price;
 
    // Allow for slippage, using integar multiplication to prevent floating point errors
    let multiplier_deposit = 100 * 100; // 100% x 100bps
    let multiplier_withdraw = multiplier_deposit - (AUTO_REPAY_MAX_SLIPPAGE_BPS as u128);

    let deposit_slippage_check_value = (deposit_value as u128).checked_mul(multiplier_deposit)
        .ok_or(QuartzError::MathOverflow)?;
    let withdraw_slippage_check_value = (withdraw_value as u128).checked_mul(multiplier_withdraw)
        .ok_or(QuartzError::MathOverflow)?;

    check!(
        deposit_slippage_check_value >= withdraw_slippage_check_value,
        QuartzError::MaxSlippageExceeded
    );

    Ok(())
}

#[inline(never)]
fn validate_account_health<'info>(
    ctx: &Context<'_, '_, 'info, 'info, AutoRepayWithdraw<'info>>,
    drift_market_index: u16
) -> Result<()> {
    let user = &mut load_mut!(ctx.accounts.drift_user)?;
    let margin_calculation = get_drift_margin_calculation(
        user, 
        &ctx.accounts.drift_state, 
        drift_market_index, 
        &ctx.remaining_accounts
    )?;

    let quartz_account_health = get_quartz_account_health(margin_calculation)?;

    check!(
        quartz_account_health >= AUTO_REPAY_MIN_HEALTH_RESULT,
        QuartzError::AutoRepayHealthTooLow
    );

    Ok(())
}

pub fn auto_repay_withdraw_handler<'info>(
    ctx: Context<'_, '_, 'info, 'info, AutoRepayWithdraw<'info>>,
    drift_market_index: u16
) -> Result<()> {
    // TODO: Remove temporary guardrail check
    check!(
        ctx.accounts.owner.key() == ctx.accounts.caller.key(),
        QuartzError::InvalidUserAccounts
    );

    check!(
        drift_market_index == DRIFT_MARKET_INDEX_SOL,
        QuartzError::UnsupportedDriftMarketIndex
    );

    let index: usize = load_current_index_checked(&ctx.accounts.instructions.to_account_info())?.into();
    let start_instruction = load_instruction_at_checked(index - 3, &ctx.accounts.instructions.to_account_info())?;
    let swap_instruction = load_instruction_at_checked(index - 2, &ctx.accounts.instructions.to_account_info())?;
    let deposit_instruction = load_instruction_at_checked(index - 1, &ctx.accounts.instructions.to_account_info())?;

    validate_instruction_order(&start_instruction, &swap_instruction, &deposit_instruction)?;

    validate_user_accounts(&ctx, &start_instruction, &deposit_instruction)?;

    // Validate mint and ATA are the same as swap
    let swap_source_mint = swap_instruction.accounts[5].pubkey;
    check!(
        swap_source_mint.eq(&ctx.accounts.spl_mint.key()),
        QuartzError::InvalidRepayMint
    );

    let swap_source_token_account = swap_instruction.accounts[2].pubkey;
    check!(
        swap_source_token_account.eq(&ctx.accounts.caller_spl.key()),
        QuartzError::InvalidSourceTokenAccount
    );
    
    // Get amount actually swapped in Jupiter
    let start_balance = u64::from_le_bytes(
        start_instruction.data[8..16].try_into().unwrap()
    );
    let end_balance = ctx.accounts.caller_spl.amount;
    let withdraw_amount = start_balance - end_balance;

    // Validate values of deposit_amount and withdraw_amount are within slippage
    let deposit_amount = get_jup_exact_out_route_out_amount(&swap_instruction)?;
    validate_prices(&ctx, deposit_amount, withdraw_amount)?;

    let owner = ctx.accounts.owner.key();
    let vault_seeds = &[
        b"vault",
        owner.as_ref(),
        &[ctx.accounts.vault.bump]
    ];
    let signer_seeds_vault = &[&vault_seeds[..]];

    // Drift Withdraw CPI
    let mut cpi_ctx = CpiContext::new_with_signer(
        ctx.accounts.drift_program.to_account_info(),
        DriftWithdraw {
            state: ctx.accounts.drift_state.to_account_info(),
            user: ctx.accounts.drift_user.to_account_info(),
            user_stats: ctx.accounts.drift_user_stats.to_account_info(),
            authority: ctx.accounts.vault.to_account_info(),
            spot_market_vault: ctx.accounts.spot_market_vault.to_account_info(),
            drift_signer: ctx.accounts.drift_signer.to_account_info(),
            user_token_account: ctx.accounts.vault_spl.to_account_info(),
            token_program: ctx.accounts.token_program.to_account_info(),
        },
        signer_seeds_vault
    );

    cpi_ctx.remaining_accounts = ctx.remaining_accounts.to_vec();

    // reduce_only = true to prevent withdrawing more than the collateral position (which would create a new loan)
    drift_withdraw(cpi_ctx, drift_market_index, withdraw_amount, true)?;

    // Transfer tokens from vault's ATA to caller's ATA
    token::transfer(
        CpiContext::new_with_signer(
            ctx.accounts.token_program.to_account_info(), 
            token::Transfer { 
                from: ctx.accounts.vault_spl.to_account_info(), 
                to: ctx.accounts.caller_spl.to_account_info(), 
                authority: ctx.accounts.vault.to_account_info()
            }, 
            signer_seeds_vault
        ),
        withdraw_amount
    )?;

    // Close vault's ATA
    let cpi_ctx_close = CpiContext::new_with_signer(
        ctx.accounts.token_program.to_account_info(),
        token::CloseAccount {
            account: ctx.accounts.vault_spl.to_account_info(),
            destination: ctx.accounts.caller.to_account_info(),
            authority: ctx.accounts.vault.to_account_info(),
        },
        signer_seeds_vault
    );
    token::close_account(cpi_ctx_close)?;

    validate_account_health(&ctx, drift_market_index)?;

    Ok(())
}