use anchor_lang::prelude::*;
use solana_program::pubkey;

pub const ANCHOR_DISCRIMINATOR: usize = 8;
pub const PUBKEY_SIZE: usize = 32;
pub const U8_SIZE: usize = 1;
pub const U16_SIZE: usize = 2;
pub const U64_SIZE: usize = 8;

pub const BASE_UNITS_PER_USDC: u64 = 1_000_000;

pub const USDC_MINT: Pubkey = pubkey!("EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v");
pub const WSOL_MINT: Pubkey = pubkey!("So11111111111111111111111111111111111111112");

pub const JUPITER_ID: Pubkey = pubkey!("JUP6LkbZbjS1jKKwapdHNy74zcZ3tLUZoi5QNyVTaV4");
pub const JUPITER_EXACT_OUT_ROUTE_DISCRIMINATOR: [u8; 8] = [208, 51, 239, 151, 123, 43, 237, 92];

pub const ACCOUNT_HEALTH_BUFFER_PERCENTAGE: u8 = 10;
pub const AUTO_REPAY_MIN_HEALTH_RESULT: u8 = 30;
// pub const AUTO_REPAY_MAX_HEALTH_RESULT: u8 = 50;
pub const AUTO_REPAY_MAX_SLIPPAGE_BPS: u16 = 100;

pub const DRIFT_MARKET_INDEX_USDC: u16 = 0;
pub const DRIFT_MARKET_INDEX_SOL: u16 = 1;

pub const MAX_PRICE_AGE_SECONDS_USDC: u64 = 60;
pub const MAX_PRICE_AGE_SECONDS_SOL: u64 = 30;

pub const PYTH_FEED_SOL_USD: &str = "0xef0d8b6fda2ceba41da15d4095d1da392a0d2f8ed0c6c7bc0f4cfac8c280b56d";
pub const PYTH_FEED_USDC_USD: &str = "0xeaa020c61cc479712813461ce153894a96a6c00b21ed0cfc2798d1f9a9e9c94a";
