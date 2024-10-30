import styles from "./DefaultLayout.module.css";

interface ModalDefaultContentProps {
    title: string;
    denomination: string;
    amount: number;
    setAmount: (amount: number) => void;
}

export default function ModalDefaultContent(
    {title, denomination, amount, setAmount} : ModalDefaultContentProps
) {
    return (
        <div className={styles.contentWrapper}>
            <h2 className={styles.heading}>{title}</h2>
        
            <div className={styles.inputSection}>
                <p>Amount</p>

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