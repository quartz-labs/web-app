import { ModalVariation } from "../types/enums/ModalVariation.enum";
import AddFundsModal from "@/src/components/Modal/Variations/AddFunds.Modal";
import CloseAccountModal from "@/src/components/Modal/Variations/CloseAccount.Modal";
import NotificationsModal from "@/src/components/Modal/Variations/Notifications.Modal";
import RepayLoanModal from "@/src/components/Modal/Variations/RepayLoan.Modal";
import WithdrawModal from "@/src/components/Modal/Variations/Withdraw.Modal";
import BorrowModal from "../components/Modal/Variations/Borrow.Modal";
import CardSignupModal from "../components/Modal/Variations/CardSignup.Modal";
import CardKycModal from "../components/Modal/Variations/CardKyc.Modal";
import CardTopupModal from "../components/Modal/CardTopup/CardTopup.Modal";

export const ModalComponents = {
    [ModalVariation.NOTIFICATIONS]: NotificationsModal,
    [ModalVariation.ADD_FUNDS]: AddFundsModal,
    [ModalVariation.WITHDRAW]: WithdrawModal,
    [ModalVariation.BORROW]: BorrowModal,
    [ModalVariation.REPAY]: RepayLoanModal,
    [ModalVariation.REPAY_LOAN]: RepayLoanModal,
    [ModalVariation.CLOSE_ACCOUNT]: CloseAccountModal,
    [ModalVariation.CARD_SIGNUP]: CardSignupModal,
    [ModalVariation.CARD_KYC]: CardKycModal,
    [ModalVariation.CARD_TOPUP]: CardTopupModal
};