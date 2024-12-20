import { useRefetchAccountData } from "@/src/utils/hooks";
import { useEffect } from "react";

export default function AddFundsModal() {
    const refetchAccountData = useRefetchAccountData();

    useEffect(() => {
        refetchAccountData();
    }, [refetchAccountData]);
    
    return (
        <div>
            <h2>Add Funds</h2>
        </div>
    )
}