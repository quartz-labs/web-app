use std::collections::BTreeSet;
use anchor_lang::prelude::*;
use drift::{
    instructions::optional_accounts::{load_maps, AccountMaps}, 
    math::margin::calculate_margin_requirement_and_total_collateral_and_liability_info, 
    state::{
        margin_calculation::{MarginCalculation, MarginContext, MarketIdentifier}, 
        spot_market_map::get_writable_spot_market_set, state::State, user::User
    }  
};

use crate::{constants::ACCOUNT_HEALTH_BUFFER_PERCENTAGE, errors::QuartzError};

pub(crate) type MarketSet = BTreeSet<u16>;

pub fn get_drift_margin_calculation<'info>(
    drift_user: &User,
    drift_state: &State,
    drift_market_index: u16,
    remaining_accounts: &'info [AccountInfo<'info>],
) -> Result<MarginCalculation> {
    let liquidation_margin_buffer_ratio = drift_state.liquidation_margin_buffer_ratio;
    let clock = Clock::get()?;
    let now = clock.unix_timestamp;

    let remaining_accounts_iter = &mut remaining_accounts.iter().peekable();
    let AccountMaps {
        perp_market_map,
        spot_market_map,
        mut oracle_map,
    } = load_maps(
        remaining_accounts_iter,
        &MarketSet::new(),
        &get_writable_spot_market_set(drift_market_index),
        clock.slot,
        Some(drift_state.oracle_guard_rails),
    )?;

    let margin_calculation = calculate_margin_requirement_and_total_collateral_and_liability_info(
        drift_user,
        &perp_market_map,
        &spot_market_map,
        &mut oracle_map,
        MarginContext::liquidation(liquidation_margin_buffer_ratio)
            .track_market_margin_requirement(MarketIdentifier::spot(
                1u16,
            ))?
            .fuel_numerator(drift_user, now),
    )?;

    Ok(margin_calculation)
}

pub fn _get_drift_account_health<'info>(
    margin_calculation: MarginCalculation,
) -> Result<u8> {
    let total_collateral = margin_calculation.total_collateral;
    let margin_requirement = margin_calculation.margin_requirement;

    if total_collateral < 0 {
        return Ok(0);
    }

    let total_collateral_unsigned = total_collateral as u128;

    if margin_requirement > total_collateral_unsigned {
        return Ok(0);
    }

    if margin_requirement == 0 {
        return Ok(100);
    }

    let health = total_collateral_unsigned.checked_sub(margin_requirement)
        .ok_or(QuartzError::MathOverflow)?
        .checked_mul(100)
        .ok_or(QuartzError::MathOverflow)?
        .checked_div(total_collateral_unsigned)
        .ok_or(QuartzError::MathOverflow)?;

    Ok(health as u8)
}

pub fn get_quartz_account_health(
    margin_calculation: MarginCalculation,
) -> Result<u8> {
    let total_collateral = margin_calculation.total_collateral;
    let margin_requirement = margin_calculation.margin_requirement;

    if total_collateral < 0 || ACCOUNT_HEALTH_BUFFER_PERCENTAGE >= 100 {
        return Ok(0);
    }

    let total_collateral_unsigned = total_collateral as u128;

    let buffer_multiplier = 100u128.checked_sub(ACCOUNT_HEALTH_BUFFER_PERCENTAGE as u128)
        .ok_or(QuartzError::MathOverflow)?;
    
    let adjusted_total_collateral = total_collateral_unsigned
        .checked_mul(buffer_multiplier)
        .ok_or(QuartzError::MathOverflow)?
        .checked_div(100)
        .ok_or(QuartzError::MathOverflow)?;

    if margin_requirement > adjusted_total_collateral {
        return Ok(0);
    }

    if margin_requirement == 0 {
        return Ok(100);
    }

    let health = adjusted_total_collateral
        .checked_sub(margin_requirement)
        .ok_or(QuartzError::MathOverflow)?
        .checked_mul(100)
        .ok_or(QuartzError::MathOverflow)?
        .checked_div(adjusted_total_collateral)
        .ok_or(QuartzError::MathOverflow)?;

    Ok(health as u8)
}