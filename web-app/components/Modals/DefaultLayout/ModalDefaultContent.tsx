import styles from "./DefaultLayout.module.css";

interface ModalDefaultContentProps {
    title: string;
    denomination: string;
    amount: number;
    maxAmount: number;
    setAmount: (amount: number) => void;
}

export default function ModalDefaultContent(
    {title, denomination, amount, maxAmount, setAmount} : ModalDefaultContentProps
) {
    return (
        <div className={styles.contentWrapper}>
            <h2 className={styles.heading}>{title}</h2>
        
            <div className={styles.inputSection}>
                <div className={styles.stretchWidth}>
                    <p>Amount</p>

                    <div className={styles.infoBalances}>
                        <button className={`glass-button ghost ${styles.balanceButton}`} onClick={() => setAmount(maxAmount / 2)}>
                            Half
                        </button>
                        <button className={`glass-button ghost ${styles.balanceButton}`} onClick={() => setAmount(maxAmount)}>
                            Max
                        </button>
                    </div>
                </div>

                <div className={styles.inputFieldWrapper}>
                    <input 
                        className={styles.inputField}
                        type="text" 
                        placeholder={"0.0 " + denomination} 
                        value={amount} 
                        onChange={(e) => 
                            setAmount(Number(e.target.value.replace(/[^0-9.]/g, '').replace(/(\..*?)\..*/g, '$1')))
                        }
                    />
                </div>
            </div>
        </div>
    )
}