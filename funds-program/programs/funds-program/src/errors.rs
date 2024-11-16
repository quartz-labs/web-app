use anchor_lang::prelude::*;

#[error_code]
pub enum QuartzError {
    #[msg("Illegal auto repay instructions")]
    IllegalAutoRepayInstructions,
    #[msg("Repay mint does not match swap mint")]
    InvalidMint,
    #[msg("Price slippage is above maximum")]
    MaxSlippageExceeded,
    #[msg("Swap platform fee must be zero")]
    InvalidPlatformFee,
    #[msg("User accounts for deposit and withdraw do not match")]
    InvalidUserAccounts,
    #[msg("Swap source token account does not match withdraw")]
    InvalidSourceTokenAccount,
    #[msg("Swap destination token account does not match deposit")]
    InvalidDestinationTokenAccount,
    #[msg("Declared start balance is not accurate")]
    InvalidStartBalance,
}