use anchor_lang::prelude::*;

#[error_code]
pub enum ErrorCode {
    #[msg("Invalid Quartz account")]
    InvalidQuartzAccount,
    #[msg("Invalid init_payer")]
    InvalidInitPayer,
    #[msg("Insufficent funds for transaction")]
    InsufficientFunds,
    #[msg("Invalid SPL token mint address")]
    InvalidMintAddress,
    #[msg("Invalid Drift program address")]
    InvalidDriftAddress,
    #[msg("Unable to load account loader")]
    UnableToLoadAccountLoader
}
