use anchor_lang::prelude::*;

#[error_code]
pub enum QuartzError {
    #[msg("Illegal auto repay instructions")]
    IllegalAutoRepayInstructions,
    #[msg("Repay amounts do not match swap amounts")]
    UnbalancedSwap,
    #[msg("Repay mints do not match swap mints")]
    InvalidMint,
    #[msg("Price slippage is above maximum")]
    MaxSlippageExceeded,
}
