use anchor_lang::prelude::*;

mod drift {
    use anchor_lang::declare_id;
    declare_id!("dRiftyHA39MWEi3m9aunc5MzRF1JYuBsbn6VPcn33UH");
}

#[derive(Clone)]
pub struct Drift;

impl anchor_lang::Id for Drift {
    fn id() -> Pubkey {
        drift::id()
    }
}