use anchor_lang::prelude::*;

#[error_code]
pub enum ErrorCode {
    #[msg("Invalid Quartz account")]
    InvalidQuartzAccount,
    #[msg("Insufficent funds for transaction")]
    InsufficientFunds,
}