use anchor_lang::prelude::*;
use solana_program::instruction::Instruction;
use crate::errors::ErrorCode;

pub fn get_jup_exact_out_route_platform_fees(instruction: &Instruction) -> Result<u8> {
    let platform_fee_index = instruction.data.len() - 8;
    let platform_fee_bps = instruction.data[platform_fee_index..]
        .try_into()
        .map_err(|_| ErrorCode::DeserializationError)?;
    Ok(u8::from_le_bytes(platform_fee_bps))
}
