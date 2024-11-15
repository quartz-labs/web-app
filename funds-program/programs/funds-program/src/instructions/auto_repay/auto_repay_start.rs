use anchor_lang::{
    prelude::*,
    Discriminator,
    solana_program::{
        instruction::Instruction,
        sysvar::instructions::{
            self,
            load_current_index_checked,
            load_instruction_at_checked
        }
    }
};
use anchor_spl::{
    associated_token::AssociatedToken, token::{self, Mint, Token, TokenAccount}
};
use jupiter::i11n::ExactOutRouteI11n;
use crate::{check, constants::MAX_SLIPPAGE_BPS, errors::QuartzError, state::Mule};

#[derive(Accounts)]
pub struct AutoRepayStart<'info> {
    #[account(mut)]
    pub caller: Signer<'info>,

    #[account(
        mut,
        associated_token::mint = spl_mint,
        associated_token::authority = caller
    )]
    pub caller_spl: Box<Account<'info, TokenAccount>>,

    #[account(
        seeds = [b"auto_repay_mule".as_ref()],
        bump
    )]
    pub mule: Box<Account<'info, Mule>>,

    #[account(
        init,
        seeds = [mule.key().as_ref(), caller.key().as_ref(), spl_mint.key().as_ref()],
        bump,
        payer = caller,
        token::mint = spl_mint,
        token::authority = mule
    )]
    pub mule_spl: Box<Account<'info, TokenAccount>>,

    pub spl_mint: Box<Account<'info, Mint>>,

    pub token_program: Program<'info, Token>,
    
    pub associated_token_program: Program<'info, AssociatedToken>,

    pub system_program: Program<'info, System>,

    /// CHECK: Account is safe once address is correct
    #[account(address = instructions::ID)]
    instructions: UncheckedAccount<'info>,
}

pub fn validate_instruction_order<'info>(
    deposit_instruction: &Instruction,
    withdraw_instruction: &Instruction,
    swap_instruction: &Instruction
) -> Result<()> {
    // This instruction is the 1st instruction

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

    // Check the 4th instruction is auto_repay_withdraw
    check!(
        withdraw_instruction.program_id.eq(&crate::id()),
        QuartzError::IllegalAutoRepayInstructions
    );

    check!(
        withdraw_instruction.data[..8]
            .eq(&crate::instruction::AutoRepayWithdraw::DISCRIMINATOR),
        QuartzError::IllegalAutoRepayInstructions
    );

    Ok(())
}

fn validate_swap_data<'info>(
    ctx: &Context<'_, '_, '_, 'info, AutoRepayStart<'info>>,
    swap_instruction: &Instruction,
) -> Result<()> {
    let swap_i11n = ExactOutRouteI11n::try_from(swap_instruction)?;

    check!(
        swap_i11n.args.slippage_bps < MAX_SLIPPAGE_BPS,
        QuartzError::MaxSlippageExceeded
    );

    check!(
        swap_i11n.args.platform_fee_bps.eq(&0),
        QuartzError::InvalidPlatformFee
    );

    check!(
        swap_i11n.accounts.source_mint.pubkey.eq(&ctx.accounts.spl_mint.key()),
        QuartzError::InvalidMint
    );

    check!(
        swap_i11n.accounts.user_source_token_account.pubkey.eq(&ctx.accounts.mule_spl.key()),
        QuartzError::InvalidSourceTokenAccount
    );

    Ok(())
}

pub fn auto_repay_start_handler<'info>(
    ctx: Context<'_, '_, '_, 'info, AutoRepayStart<'info>>,
    amount_base_units: u64
) -> Result<()> {
    let index: usize = load_current_index_checked(&ctx.accounts.instructions.to_account_info())?.into();
    let swap_instruction = load_instruction_at_checked(index + 1, &ctx.accounts.instructions.to_account_info())?;
    let deposit_instruction = load_instruction_at_checked(index + 2, &ctx.accounts.instructions.to_account_info())?;
    let withdraw_instruction = load_instruction_at_checked(index + 3, &ctx.accounts.instructions.to_account_info())?;

    validate_instruction_order(&swap_instruction, &deposit_instruction, &withdraw_instruction)?;

    validate_swap_data(&ctx, &swap_instruction)?;

    // Deposit tokens to mule
    token::transfer(
        CpiContext::new(
            ctx.accounts.token_program.to_account_info(), 
            token::Transfer { 
                from: ctx.accounts.caller_spl.to_account_info(), 
                to: ctx.accounts.mule_spl.to_account_info(), 
                authority: ctx.accounts.caller.to_account_info()
            }
        ),
        amount_base_units
    )?;

    Ok(())
}