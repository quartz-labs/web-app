use anchor_lang::prelude::*;

declare_id!("8QGSGBtq2dfVC3mtEyCnHBJV7vVby4nuj44wS46viY8G");

#[program]
pub mod funds_program {
    use super::*;

    pub fn initialize(ctx: Context<Initialize>) -> Result<()> {
        msg!("Greetings from: {:?}", ctx.program_id);
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize {}
