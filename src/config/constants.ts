import { SUPPORTED_DRIFT_MARKETS } from "@quartz-labs/sdk";
import AddFundsModal from "@/src/components/Modal/Variations/AddFunds.Modal";
import CloseAccountModal from "@/src/components/Modal/Variations/CloseAccount.Modal";
import NotificationsModal from "@/src/components/Modal/Variations/Notifications.Modal";
import RepayLoanModal from "@/src/components/Modal/Variations/RepayLoan.Modal";
import WithdrawModal from "@/src/components/Modal/Variations/Withdraw.Modal";
import { ModalVariation } from "@/src/types/enums/ModalVariation.enum";

export type MarketIndex = typeof SUPPORTED_DRIFT_MARKETS[number];
export const DEFAULT_REFETCH_INTERVAL = 60_000;

export const ModalComponents = {
    [ModalVariation.NOTIFICATIONS]: NotificationsModal,
    [ModalVariation.ADD_FUNDS]: AddFundsModal,
    [ModalVariation.WITHDRAW]: WithdrawModal,
    [ModalVariation.REPAY]: RepayLoanModal,
    [ModalVariation.REPAY_LOAN]: RepayLoanModal,
    [ModalVariation.CLOSE_ACCOUNT]: CloseAccountModal,
};