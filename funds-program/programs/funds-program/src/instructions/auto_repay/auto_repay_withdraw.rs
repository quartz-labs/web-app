use anchor_lang::{
    prelude::*, solana_program::{instruction::Instruction, sysvar::instructions::{
        self,
        load_current_index_checked, 
        load_instruction_at_checked
    }}, Discriminator
};
use anchor_spl::{
    associated_token::AssociatedToken, token::{self, Mint, Token, TokenAccount}
};
use drift::{
    Drift,
    cpi::withdraw as drift_withdraw, 
    Withdraw as DriftWithdraw
};
use jupiter::i11n::ExactOutRouteI11n;
use crate::{check, errors::QuartzError, state::Vault};

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

    pub spl_mint: Box<Account<'info, Mint>>,

    /// CHECK: This account is passed through to the Drift CPI, which performs the security checks
    #[account(
        mut,
        seeds = [b"user".as_ref(), vault.key().as_ref(), (0u16).to_le_bytes().as_ref()],
        seeds::program = drift_program.key(),
        bump
    )]
    pub drift_user: UncheckedAccount<'info>,
    
    /// CHECK: This account is passed through to the Drift CPI, which performs the security checks
    #[account(
        mut,
        seeds = [b"user_stats".as_ref(), vault.key().as_ref()],
        seeds::program = drift_program.key(),
        bump
    )]
    pub drift_user_stats: UncheckedAccount<'info>,

    /// CHECK: This account is passed through to the Drift CPI, which performs the security checks
    #[account(
        mut,
        seeds = [b"drift_state".as_ref()],
        seeds::program = drift_program.key(),
        bump
    )]
    pub drift_state: UncheckedAccount<'info>,

    /// CHECK: This account is passed through to the Drift CPI, which performs the security checks
    #[account(mut)]
    pub spot_market_vault: UncheckedAccount<'info>,
    
    /// CHECK: This account is passed through to the Drift CPI, which performs the security checks
    pub drift_signer: UncheckedAccount<'info>,

    pub token_program: Program<'info, Token>,

    pub associated_token_program: Program<'info, AssociatedToken>,

    pub drift_program: Program<'info, Drift>,

    /// CHECK: Account is safe once address is correct
    #[account(address = instructions::ID)]
    instructions: UncheckedAccount<'info>,

    pub system_program: Program<'info, System>,
}

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
        swap_instruction.program_id.eq(&jupiter::ID),
        QuartzError::IllegalAutoRepayInstructions
    );

    check!(
        swap_instruction.data[..8]
            .eq(&jupiter::instructions::ExactOutRoute::DISCRIMINATOR),
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

fn validate_user_accounts<'info>(
    ctx: &Context<'_, '_, '_, 'info, AutoRepayWithdraw<'info>>,
    deposit_instruction: &Instruction
) -> Result<()> {
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

    let deposit_drift_user = deposit_instruction.accounts[5].pubkey;
    check!(
        ctx.accounts.drift_user.key().eq(&deposit_drift_user),
        QuartzError::InvalidUserAccounts
    );

    let deposit_drift_user_stats = deposit_instruction.accounts[6].pubkey;
    check!(
        ctx.accounts.drift_user_stats.key().eq(&deposit_drift_user_stats),
        QuartzError::InvalidUserAccounts
    );

    //Debug logs
    msg!("Deposit vault: {}", deposit_vault);
    msg!("Deposit owner: {}", deposit_owner);
    msg!("Deposit drift_user: {}", deposit_drift_user);
    msg!("Deposit drift_user_stats: {}", deposit_drift_user_stats);

    Ok(())
}

fn validate_account_health() -> Result<()> {
    // TODO: Implement

    Ok(())
}

pub fn auto_repay_withdraw_handler<'info>(
    ctx: Context<'_, '_, '_, 'info, AutoRepayWithdraw<'info>>,
    drift_market_index: u16
) -> Result<()> {
    let index: usize = load_current_index_checked(&ctx.accounts.instructions.to_account_info())?.into();
    let start_instruction = load_instruction_at_checked(index - 3, &ctx.accounts.instructions.to_account_info())?;
    let swap_instruction = load_instruction_at_checked(index - 2, &ctx.accounts.instructions.to_account_info())?;
    let deposit_instruction = load_instruction_at_checked(index - 1, &ctx.accounts.instructions.to_account_info())?;

    validate_instruction_order(&start_instruction, &swap_instruction, &deposit_instruction)?;

    validate_user_accounts(&ctx, &deposit_instruction)?;

    // Validate mint
    let swap_i11n = ExactOutRouteI11n::try_from(&swap_instruction)?;
    check!(
        swap_i11n.accounts.source_mint.pubkey.eq(&ctx.accounts.spl_mint.key()),
        QuartzError::InvalidMint
    );

    check!(
        swap_i11n.accounts.user_source_token_account.pubkey.eq(&ctx.accounts.vault_spl.key()),
        QuartzError::InvalidSourceTokenAccount
    );

    msg!("Swap mint: {}", swap_i11n.accounts.source_mint.pubkey);

    // Get amount actually swapped in Jupiter
    let start_balance = u64::from_le_bytes(
        start_instruction.data[8..16].try_into().unwrap()
    );
    let end_balance = ctx.accounts.owner_spl.amount;
    let withdraw_amount = start_balance - end_balance;

    msg!("Start balance: {}", start_balance);
    msg!("End balance: {}", end_balance);
    msg!("Withdraw amount: {}", withdraw_amount);

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

    validate_account_health()?;

    Ok(())
}