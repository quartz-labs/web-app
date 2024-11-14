use anchor_lang::{
    prelude::*,
    solana_program::sysvar::instructions::{
        self,
        load_current_index_checked, 
        load_instruction_at_checked
    }
};

#[derive(Accounts)]
pub struct AutoRepayCheck<'info> {
    #[account(mut)]
    pub caller: Signer<'info>,

    /// CHECK: Account is safe once address is correct
    #[account(address = instructions::ID)]
    instructions: UncheckedAccount<'info>,
}

pub fn auto_repay_check_handler<'info>(
    ctx: Context<'_, '_, '_, 'info, AutoRepayCheck<'info>>
) -> Result<()> {
    let index = load_current_index_checked(&ctx.accounts.instructions.to_account_info())?;
    let swap_instruction = load_instruction_at_checked(index as usize - 1, &ctx.accounts.instructions.to_account_info())?;
    let withdraw_instruction = load_instruction_at_checked(index as usize - 2, &ctx.accounts.instructions.to_account_info())?;
    let deposit_instruction = load_instruction_at_checked(index as usize - 3, &ctx.accounts.instructions.to_account_info())?;

    msg!("index: {}", index);
    msg!("swap_instruction: {:?}", swap_instruction.program_id);
    msg!("withdraw_instruction: {:?}", withdraw_instruction.program_id);
    msg!("deposit_instruction: {:?}", deposit_instruction.program_id);

    Ok(())
}