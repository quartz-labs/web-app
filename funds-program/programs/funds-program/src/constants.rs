use anchor_lang::prelude::*;

pub const ANCHOR_DISCRIMINATOR: usize = 8;
pub const PUBKEY_SIZE: usize = 32;
pub const U8_SIZE: usize = 1;

pub const DRIFT_MARKET_INDEX_USDC: u16 = 0;
pub const DRIFT_MARKET_INDEX_SOL: u16 = 1;

pub const DRIFT_PROGRAM_ID: Pubkey = pubkey!("dRiftyHA39MWEi3m9aunc5MzRF1JYuBsbn6VPcn33UH");


#[cfg(feature = "local")]
#[constant]
pub const USDC_MINT_ADDRESS: Pubkey = pubkey!("envrJbV6GbhBTi8Pu6h9MwNViLuAmu3mFFRq7gE9Cp3");

#[cfg(feature = "devnet")]
#[constant]
// pub const USDC_MINT_ADDRESS: Pubkey = pubkey!("4zMMC9srt5Ri5X14GAgXhaHii3GnPAEERYPJgZJDncDU");  // True USDC token
pub const USDC_MINT_ADDRESS: Pubkey = pubkey!("8zGuJQqwhZafTah7Uc7Z4tXRnguqkn5KLFAP8oV6PHe2");   // Drift's token

#[cfg(not(any(feature = "local", feature = "devnet")))]
#[constant]
pub const USDC_MINT_ADDRESS: Pubkey = pubkey!("EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v");

#[cfg(feature = "local")]
#[constant]
pub const WSOL_MINT_ADDRESS: Pubkey = pubkey!("");

#[cfg(not(feature = "local"))]
#[constant]
pub const WSOL_MINT_ADDRESS: Pubkey = pubkey!("So11111111111111111111111111111111111111112");
