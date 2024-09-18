use anchor_lang::prelude::*;
use crate::constants::{ANCHOR_DISCRIMINATOR, PUBKEY_SIZE, U8_SIZE};

#[account]
pub struct Vault {
    pub backup: Pubkey,
    pub user: Pubkey,
    pub init_payer: Pubkey,
    pub bump: u8
}

impl Space for Vault {
    const INIT_SPACE: usize = ANCHOR_DISCRIMINATOR + PUBKEY_SIZE + PUBKEY_SIZE + PUBKEY_SIZE + U8_SIZE;
}