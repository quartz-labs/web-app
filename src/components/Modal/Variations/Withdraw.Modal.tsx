import { useRefetchAccountData, useRefetchWithdrawLimits } from "@/src/utils/hooks";
import { useEffect } from "react";

export default function WithdrawModal() {
    const refetchAccountData = useRefetchAccountData();
    const refetchWithdrawLimits = useRefetchWithdrawLimits();

    useEffect(() => {
        refetchAccountData();
        
        const interval = setInterval(refetchWithdrawLimits, 3_000);
        return () => clearInterval(interval);
    }, [refetchAccountData, refetchWithdrawLimits]);
    
    return (
        <div>
            <h2>Withdraw</h2>
        </div>
    )
}