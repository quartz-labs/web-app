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
use jupiter::i11n::ExactOutRouteI11n;
use crate::{check, errors::QuartzError};

#[derive(Accounts)]
pub struct AutoRepayCheck<'info> {
    #[account(mut)]
    pub caller: Signer<'info>,

    /// CHECK: Account is safe once address is correct
    #[account(address = instructions::ID)]
    instructions: UncheckedAccount<'info>,
}

fn validate_instruction_order<'info>(
    deposit_instruction: &Instruction,
    withdraw_instruction: &Instruction,
    swap_instruction: &Instruction
) -> Result<()> {
    // Check the 1st instruction is auto_repay_deposit
    check!(
        deposit_instruction.program_id.eq(&crate::id()),
        QuartzError::IllegalAutoRepayInstructions
    );

    check!(
        deposit_instruction.data[..8]
            .eq(&crate::instruction::AutoRepayDeposit::DISCRIMINATOR),
        QuartzError::IllegalAutoRepayInstructions
    );

    // Check the 2nd instruction is auto_repay_withdraw
    check!(
        withdraw_instruction.program_id.eq(&crate::id()),
        QuartzError::IllegalAutoRepayInstructions
    );

    check!(
        withdraw_instruction.data[..8]
            .eq(&crate::instruction::AutoRepayWithdraw::DISCRIMINATOR),
        QuartzError::IllegalAutoRepayInstructions
    );

    // Check the 3rd instruction is Jupiter's exact_out_route
    check!(
        swap_instruction.program_id.eq(&jupiter::ID),
        QuartzError::IllegalAutoRepayInstructions
    );

    check!(
        swap_instruction.data[..8]
            .eq(&jupiter::instructions::ExactOutRoute::DISCRIMINATOR),
        QuartzError::IllegalAutoRepayInstructions
    );

    Ok(())
}

fn validate_swap_args<'info>(
    deposit_instruction: &Instruction,
    withdraw_instruction: &Instruction,
    swap_instruction: &Instruction,
    max_slippage_bps: u16
) -> Result<()> {
    let swap_i11n = ExactOutRouteI11n::try_from(swap_instruction)?;

    // Check repay mints match swap mints
    let deposit_mint = deposit_instruction.accounts[4].pubkey;
    check!(
        swap_i11n.accounts.destination_mint.pubkey.eq(&deposit_mint),
        QuartzError::InvalidMint
    );

    let withdraw_mint = withdraw_instruction.accounts[4].pubkey;
    check!(
        swap_i11n.accounts.source_mint.pubkey.eq(&withdraw_mint),
        QuartzError::InvalidMint
    );

    // Check repay amounts match swap amounts
    let deposit_amount = u64::from_le_bytes(
        deposit_instruction.data[8..16].try_into().unwrap()
    );
    check!(
        swap_i11n.args.out_amount.eq(&deposit_amount),
        QuartzError::UnbalancedSwap
    );

    let withdraw_amount = u64::from_le_bytes(
        withdraw_instruction.data[8..16].try_into().unwrap()
    );
    check!(
        swap_i11n.args.quoted_in_amount.eq(&withdraw_amount),
        QuartzError::UnbalancedSwap
    );

    // Check slippage and platform fee are valid
    check!(
        swap_i11n.args.slippage_bps < max_slippage_bps,
        QuartzError::MaxSlippageExceeded
    );

    check!(
        swap_i11n.args.platform_fee_bps.eq(&0),
        QuartzError::InvalidPlatformFee
    );

    // Temporary debug logging
    msg!("Deposit mint: {}", deposit_mint);
    msg!("Withdraw mint: {}", withdraw_mint);
    msg!("Deposit amount: {}", deposit_amount);
    msg!("Withdraw amount: {}", withdraw_amount);
    msg!("Slippage: {}", swap_i11n.args.slippage_bps);
    msg!("Platform fee: {}", swap_i11n.args.platform_fee_bps);

    Ok(())
}

fn validate_swap_price<'info>() -> Result<()> {
    // TODO: Implement

    Ok(())
}

pub fn auto_repay_check_handler<'info>(
    ctx: Context<'_, '_, '_, 'info, AutoRepayCheck<'info>>
) -> Result<()> {
    let max_slippage_bps: u16 = 100;

    let index: usize = load_current_index_checked(&ctx.accounts.instructions.to_account_info())?.into();
    let deposit_instruction = load_instruction_at_checked(index - 3, &ctx.accounts.instructions.to_account_info())?;
    let withdraw_instruction = load_instruction_at_checked(index - 2, &ctx.accounts.instructions.to_account_info())?;
    let swap_instruction = load_instruction_at_checked(index - 1, &ctx.accounts.instructions.to_account_info())?;

    validate_instruction_order(&deposit_instruction, &withdraw_instruction, &swap_instruction)?;

    validate_swap_args(&deposit_instruction, &withdraw_instruction, &swap_instruction, max_slippage_bps)?;

    validate_swap_price()?;

    Ok(())
}