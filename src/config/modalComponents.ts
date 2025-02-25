import { ModalVariation } from "../types/enums/ModalVariation.enum";
import AddFundsModal from "@/src/components/Modal/Variations/Balance/AddFunds.Modal";
import CloseAccountModal from "@/src/components/Modal/Variations/CloseAccount.Modal";
import NotificationsModal from "@/src/components/Modal/Variations/Notifications.Modal";
import RepayLoanModal from "@/src/components/Modal/Variations/Balance/RepayLoan.Modal";
import WithdrawModal from "@/src/components/Modal/Variations/Balance/Withdraw.Modal";
import BorrowModal from "../components/Modal/Variations/Balance/Borrow.Modal";
import AcceptTandcsModal from "../components/Modal/Variations/AcceptTandcs.Modal";
import SpendLimitsModal from "../components/Modal/Variations/SpendLimits.Modal";

export const ModalComponents = {
    [ModalVariation.NOTIFICATIONS]: NotificationsModal,
    [ModalVariation.ADD_FUNDS]: AddFundsModal,
    [ModalVariation.WITHDRAW]: WithdrawModal,
    [ModalVariation.BORROW]: BorrowModal,
    [ModalVariation.REPAY]: RepayLoanModal,
    [ModalVariation.REPAY_LOAN]: RepayLoanModal,
    [ModalVariation.CLOSE_ACCOUNT]: CloseAccountModal,
    [ModalVariation.ACCEPT_TANDCS]: AcceptTandcsModal,
    [ModalVariation.SPEND_LIMITS]: SpendLimitsModal
};