import { useRefetchAccountData } from "@/src/utils/hooks";
import { useEffect } from "react";

export default function RepayLoanModal() {
    const refetchAccountData = useRefetchAccountData();

    useEffect(() => {
        refetchAccountData();
    }, [refetchAccountData]);
    
    return (
        <div>
            <h2>Repay Loan</h2>
        </div>
    )
}