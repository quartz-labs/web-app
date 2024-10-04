use anchor_lang::prelude::*;

use super::Swap;

pub fn end_swap_handler(ctx: Context<Swap>) {
    let vault_bump = ctx.accounts.vault.bump;
    let owner = ctx.accounts.owner.key();
    let seeds = &[
        b"vault",
        owner.as_ref(),
        &[vault_bump]
    ];
    let signer_seeds = &[&seeds[..]];

    
}
