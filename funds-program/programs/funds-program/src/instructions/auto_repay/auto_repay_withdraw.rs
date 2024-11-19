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
use anchor_spl::{
    associated_token::AssociatedToken, token::{self, Mint, Token, TokenAccount}
};
use drift::{
    cpi::{accounts::Withdraw as DriftWithdraw, withdraw as drift_withdraw}, 
    load_mut, 
    program::Drift, 
    state::{
        state::State as DriftState, 
        user::{User as DriftUser, UserStats as DriftUserStats}
    }
};
use jupiter::i11n::ExactOutRouteI11n;
use pyth_solana_receiver_sdk::price_update::{get_feed_id_from_hex, PriceUpdateV2};
use crate::{
    check, 
    constants::{AUTO_REPAY_MAX_SLIPPAGE_BPS, BASE_UNITS_PER_USDC, DRIFT_MARKET_INDEX_SOL, MAX_PRICE_AGE_SECONDS_SOL, MAX_PRICE_AGE_SECONDS_USDC, PYTH_FEED_SOL_USD, PYTH_FEED_USDC_USD, WSOL_MINT}, 
    errors::ErrorCode, 
    math::get_margin_calculation, 
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
        init,
        seeds = [vault.key().as_ref(), spl_mint.key().as_ref()],
        bump,
        payer = owner,
        token::mint = spl_mint,
        token::authority = vault
    )]
    pub vault_spl: Box<Account<'info, TokenAccount>>,

    #[account(mut)]
    pub owner: Signer<'info>,

    #[account(
        mut,
        associated_token::mint = spl_mint,
        associated_token::authority = owner
    )]
    pub owner_spl: Box<Account<'info, TokenAccount>>,

    #[account(
        constraint = spl_mint.key().eq(&WSOL_MINT) @ ErrorCode::InvalidRepayMint
    )]
    pub spl_mint: Box<Account<'info, Mint>>,

    /// CHECK: This account is passed through to the Drift CPI, which performs the security checks
    #[account(
        mut,
        seeds = [b"user".as_ref(), vault.key().as_ref(), (0u16).to_le_bytes().as_ref()],
        seeds::program = drift_program.key(),
        bump
    )]
    pub drift_user: AccountLoader<'info, DriftUser>,
    
    /// CHECK: This account is passed through to the Drift CPI, which performs the security checks
    #[account(
        mut,
        seeds = [b"user_stats".as_ref(), vault.key().as_ref()],
        seeds::program = drift_program.key(),
        bump
    )]
    pub drift_user_stats: AccountLoader<'info, DriftUserStats>,

    /// CHECK: This account is passed through to the Drift CPI, which performs the security checks
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

    pub associated_token_program: Program<'info, AssociatedToken>,

    pub drift_program: Program<'info, Drift>,

    pub system_program: Program<'info, System>,

    pub deposit_price_update: Account<'info, PriceUpdateV2>,

    pub withdraw_price_update: Account<'info, PriceUpdateV2>,

    /// CHECK: Account is safe once address is correct
    #[account(address = instructions::ID)]
    instructions: UncheckedAccount<'info>,
}

fn validate_instruction_order<'info>(
    start_instruction: &Instruction,
    swap_instruction: &Instruction,
    deposit_instruction: &Instruction
) -> Result<()> {
    // Check the 1st instruction is auto_repay_start
    check!(
        start_instruction.program_id.eq(&crate::id()),
        ErrorCode::IllegalAutoRepayInstructions
    );

    check!(
        start_instruction.data[..8]
            .eq(&crate::instruction::AutoRepayStart::DISCRIMINATOR),
        ErrorCode::IllegalAutoRepayInstructions
    );

    // Check the 2nd instruction is Jupiter's exact_out_route
    check!(
        swap_instruction.program_id.eq(&jupiter::ID),
        ErrorCode::IllegalAutoRepayInstructions
    );

    check!(
        swap_instruction.data[..8]
            .eq(&jupiter::instructions::ExactOutRoute::DISCRIMINATOR),
        ErrorCode::IllegalAutoRepayInstructions
    );
    
    // Check the 3rd instruction is auto_repay_deposit
    check!(
        deposit_instruction.program_id.eq(&crate::id()),
        ErrorCode::IllegalAutoRepayInstructions
    );

    check!(
        deposit_instruction.data[..8]
            .eq(&crate::instruction::AutoRepayDeposit::DISCRIMINATOR),
        ErrorCode::IllegalAutoRepayInstructions
    );

    // This instruction is the 4th instruction

    Ok(())
}

fn validate_user_accounts<'info>(
    ctx: &Context<'_, '_, '_, 'info, AutoRepayWithdraw<'info>>,
    deposit_instruction: &Instruction
) -> Result<()> {
    let deposit_vault = deposit_instruction.accounts[0].pubkey;
    msg!("deposit vault: {:?}", deposit_vault);
    check!(
        ctx.accounts.vault.key().eq(&deposit_vault),
        ErrorCode::InvalidUserAccounts
    );

    let deposit_owner = deposit_instruction.accounts[2].pubkey;
    msg!("deposit owner: {:?}", deposit_owner);
    check!(
        ctx.accounts.owner.key().eq(&deposit_owner),
        ErrorCode::InvalidUserAccounts
    );

    let deposit_drift_user = deposit_instruction.accounts[5].pubkey;
    msg!("deposit drift user: {:?}", deposit_drift_user);
    check!(
        ctx.accounts.drift_user.key().eq(&deposit_drift_user),
        ErrorCode::InvalidUserAccounts
    );

    let deposit_drift_user_stats = deposit_instruction.accounts[6].pubkey;
    msg!("deposit drift user stats: {:?}", deposit_drift_user_stats);
    check!(
        ctx.accounts.drift_user_stats.key().eq(&deposit_drift_user_stats),
        ErrorCode::InvalidUserAccounts
    );

    Ok(())
}

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
        ErrorCode::NegativeOraclePrice
    );
    let deposit_lowest_price = (deposit_price.price as u64).checked_sub(deposit_price.conf)
        .ok_or(ErrorCode::NegativeOraclePrice)?;

    // Get the withdraw price, assuming worst case of highest end of confidence interval
    let withdraw_feed_id: [u8; 32] = get_feed_id_from_hex(PYTH_FEED_SOL_USD)?;
    let withdraw_price = ctx.accounts.withdraw_price_update.get_price_no_older_than(
        &Clock::get()?,
        MAX_PRICE_AGE_SECONDS_SOL,
        &withdraw_feed_id
    )?;
    check!(
        withdraw_price.price > 0,
        ErrorCode::NegativeOraclePrice
    );
    let withdraw_highest_price = (withdraw_price.price as u64) + withdraw_price.conf;

    // Check that the exponents are the same
    // TODO - Normalize the exponenets if they don't match
    check!(
        withdraw_price.exponent == deposit_price.exponent,
        ErrorCode::InvalidPriceExponent
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
        .ok_or(ErrorCode::MathOverflow)?;
    let withdraw_slippage_check_value = (withdraw_value as u128).checked_mul(multiplier_withdraw)
        .ok_or(ErrorCode::MathOverflow)?;

    check!(
        deposit_slippage_check_value >= withdraw_slippage_check_value,
        ErrorCode::MaxSlippageExceeded
    );

    msg!("The deposit price is ({} ± {}) * 10^{}", deposit_price.price, deposit_price.conf, deposit_price.exponent);
    msg!("The withdraw price is ({} ± {}) * 10^{}", withdraw_price.price, withdraw_price.conf, withdraw_price.exponent);
    msg!("deposit slippage check value: {:?}", deposit_slippage_check_value);
    msg!("withdraw slippage check value: {:?}", withdraw_slippage_check_value);

    Ok(())
}

fn validate_account_health<'info>(
    ctx: &Context<'_, '_, 'info, 'info, AutoRepayWithdraw<'info>>,
    drift_market_index: u16
) -> Result<()> {
    let user = &mut load_mut!(ctx.accounts.drift_user)?;
    let margin_calculation = get_margin_calculation(
        user, 
        &ctx.accounts.drift_state, 
        drift_market_index, 
        &ctx.remaining_accounts
    )?;

    msg!("margin calculation: {:?}", margin_calculation);
    msg!("margin context: {:?}", margin_calculation.context);

    Ok(())
}

pub fn auto_repay_withdraw_handler<'info>(
    ctx: Context<'_, '_, 'info, 'info, AutoRepayWithdraw<'info>>,
    drift_market_index: u16
) -> Result<()> {
    check!(
        drift_market_index == DRIFT_MARKET_INDEX_SOL,
        ErrorCode::UnsupportedDriftMarketIndex
    );

    let index: usize = load_current_index_checked(&ctx.accounts.instructions.to_account_info())?.into();
    let start_instruction = load_instruction_at_checked(index - 3, &ctx.accounts.instructions.to_account_info())?;
    let swap_instruction = load_instruction_at_checked(index - 2, &ctx.accounts.instructions.to_account_info())?;
    let deposit_instruction = load_instruction_at_checked(index - 1, &ctx.accounts.instructions.to_account_info())?;

    validate_instruction_order(&start_instruction, &swap_instruction, &deposit_instruction)?;

    validate_user_accounts(&ctx, &deposit_instruction)?;

    // Validate mint and ATA are the same as swap
    let swap_i11n = ExactOutRouteI11n::try_from(&swap_instruction)?;
    msg!("source mint: {:?}", swap_i11n.accounts.source_mint.pubkey);
    check!(
        swap_i11n.accounts.source_mint.pubkey.eq(&ctx.accounts.spl_mint.key()),
        ErrorCode::InvalidRepayMint
    );

    msg!("source token account: {:?}", swap_i11n.accounts.user_source_token_account.pubkey);
    check!(
        swap_i11n.accounts.user_source_token_account.pubkey.eq(&ctx.accounts.owner_spl.key()),
        ErrorCode::InvalidSourceTokenAccount
    );
    
    // Get amount actually swapped in Jupiter
    let start_balance = u64::from_le_bytes(
        start_instruction.data[8..16].try_into().unwrap()
    );
    let end_balance = ctx.accounts.owner_spl.amount;
    let withdraw_amount = start_balance - end_balance;

    // Validate values of deposit_amount and withdraw_amount are within slippage
    let deposit_amount = swap_i11n.args.out_amount;
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

    // Transfer tokens from vault's ATA to owner's ATA
    token::transfer(
        CpiContext::new_with_signer(
            ctx.accounts.token_program.to_account_info(), 
            token::Transfer { 
                from: ctx.accounts.vault_spl.to_account_info(), 
                to: ctx.accounts.owner_spl.to_account_info(), 
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
            destination: ctx.accounts.owner.to_account_info(),
            authority: ctx.accounts.vault.to_account_info(),
        },
        signer_seeds_vault
    );
    token::close_account(cpi_ctx_close)?;

    validate_account_health(&ctx, drift_market_index)?;

    Ok(())
}