use anchor_lang::prelude::*;
use crate::constants::*;

#[account]
pub struct Vault {
    pub user: Pubkey
}

impl Space for Vault {
    const INIT_SPACE: usize = ANCHOR_DISCRIMINATOR + PUBKEY_SIZE;
}