use anchor_lang::prelude::*;

#[error_code]
pub enum QuartzError {
    #[msg("Invalid Drift program address")]
    InvalidDriftProgram,
    #[msg("Illegal auto repay instructions")]
    IllegalAutoRepayInstructions,
}
