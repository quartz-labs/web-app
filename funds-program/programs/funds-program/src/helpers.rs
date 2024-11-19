use anchor_lang::prelude::*;
use solana_program::instruction::Instruction;
use crate::{constants::{U16_SIZE, U64_SIZE, U8_SIZE}, errors::QuartzError};

pub fn get_jup_exact_out_route_platform_fees(instruction: &Instruction) -> Result<u8> {
    let platform_fee_index_start = instruction.data.len() - (U8_SIZE * 8);

    let platform_fee_bps = instruction.data[platform_fee_index_start..]
        .try_into()
        .map_err(|_| QuartzError::DeserializationError)?;

    Ok(u8::from_le_bytes(platform_fee_bps))
}

pub fn get_jup_exact_out_route_out_amount(instruction: &Instruction) -> Result<u64> {
    let out_amount_index_start = instruction.data.len() - ((U8_SIZE + U16_SIZE + U64_SIZE + U64_SIZE) * 8);
    let out_amount_index_end = out_amount_index_start + (U64_SIZE * 8);

    let out_amount = instruction.data[out_amount_index_start..out_amount_index_end]
        .try_into()
        .map_err(|_| QuartzError::DeserializationError)?;

    Ok(u64::from_le_bytes(out_amount))
}