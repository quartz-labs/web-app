use anchor_lang::prelude::*;

pub const ANCHOR_DISCRIMINATOR: usize = 8;
pub const PUBKEY_SIZE: usize = 32;
pub const U8_SIZE: usize = 1;


pub const QUARTZ_HOLDING_ADDRESS: Pubkey = pubkey!("5XY5pQbBjwv8ByBxKPNE7Xyb9dVcdFgd51xcxKDJjGWE");

#[cfg(feature = "local")]
#[constant]
pub const USDC_MINT_ADDRESS: Pubkey = pubkey!("envrJbV6GbhBTi8Pu6h9MwNViLuAmu3mFFRq7gE9Cp3");       // Localnet mint address

#[cfg(feature = "devnet")]
#[constant]
pub const USDC_MINT_ADDRESS: Pubkey = pubkey!("4zMMC9srt5Ri5X14GAgXhaHii3GnPAEERYPJgZJDncDU");      // Devnet USDC address

#[cfg(not(any(feature = "local", feature = "devnet")))]
#[constant]
pub const USDC_MINT_ADDRESS: Pubkey = pubkey!("EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v");      // Mainnet USDC address
