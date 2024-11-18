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

pub(crate) type MarketSet = BTreeSet<u16>;

pub fn get_margin_calculation<'info>(
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