#[macro_export]
/// This macro will emit the provided custom program error and log where the error happened,
/// if the condition is not met.
macro_rules! check {
    ($cond:expr, $err:expr) => {
        if !($cond) {
            let error_code: $crate::errors::QuartzError = $err;
            anchor_lang::prelude::msg!(
                "Error \"{}\" thrown at {}:{}",
                error_code,
                file!(),
                line!()
            );
            return Err(error_code.into());
        }
    };

    ($cond:expr, $err:expr, $($arg:tt)*) => {
        if !($cond) {
            let error_code: $crate::errors::QuartzError = $err;
            anchor_lang::prelude::msg!(
                "Error \"{}\" thrown at {}:{}",
                error_code,
                file!(),
                line!()
            );
            anchor_lang::prelude::msg!($($arg)*);
            return Err(error_code.into());
        }
    };
}

#[macro_export]
macro_rules! load_mut {
    ($account_loader:expr) => {{
        $account_loader.load_mut().map_err(|e| {
            msg!("e {:?}", e);
            let error_code = QuartzError::UnableToLoadAccountLoader;
            msg!("Error {} thrown at {}:{}", error_code, file!(), line!());
            error_code
        })
    }};
}
