use anchor_lang::prelude::*;

pub const ANCHOR_DISCRIMINATOR: usize = 8;
pub const PUBKEY_SIZE: usize = 32;
pub const U8_SIZE: usize = 1;


pub const DRIFT_PROGRAM_ID: Pubkey = pubkey!("dRiftyHA39MWEi3m9aunc5MzRF1JYuBsbn6VPcn33UH");
// pub const QUARTZ_HOLDING_ADDRESS: Pubkey = pubkey!("5XY5pQbBjwv8ByBxKPNE7Xyb9dVcdFgd51xcxKDJjGWE");


#[cfg(feature = "local")]
#[constant]
pub const USDC_MINT_ADDRESS: Pubkey = pubkey!("envrJbV6GbhBTi8Pu6h9MwNViLuAmu3mFFRq7gE9Cp3");

#[cfg(feature = "local")]
#[constant]
pub const WSOL_MINT_ADDRESS: Pubkey = pubkey!("");


#[cfg(feature = "devnet")]
#[constant]
pub const USDC_MINT_ADDRESS: Pubkey = pubkey!("4zMMC9srt5Ri5X14GAgXhaHii3GnPAEERYPJgZJDncDU");

#[cfg(feature = "devnet")]
#[constant]
pub const WSOL_MINT_ADDRESS: Pubkey = pubkey!("So11111111111111111111111111111111111111112");


#[cfg(not(any(feature = "local", feature = "devnet")))]
#[constant]
pub const USDC_MINT_ADDRESS: Pubkey = pubkey!("EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v");

#[cfg(not(any(feature = "local", feature = "devnet")))]
#[constant]
pub const WSOL_MINT_ADDRESS: Pubkey = pubkey!("So11111111111111111111111111111111111111112");
