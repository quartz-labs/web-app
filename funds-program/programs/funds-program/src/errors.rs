use anchor_lang::prelude::*;

#[error_code]
pub enum ErrorCode {
    #[msg("Invalid Quartz account")]
    InvalidQuartzAccount,
    #[msg("Invalid init_payer")]
    InvalidInitPayer,
    #[msg("Insufficent funds for transaction")]
    InsufficientFunds,
}