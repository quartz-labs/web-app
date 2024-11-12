import styles from "./DefaultLayout.module.css";

interface ModalDefaultContentProps {
    title: string;
    subtitle?: string;
    denomination: string;
    amountStr: string;
    setAmountStr: (amount: string) => void;
    setMaxAmount: () => void;
    setHalfAmount: () => void;
}

export default function ModalDefaultContent(
    {title, subtitle, denomination, amountStr, setAmountStr, setMaxAmount, setHalfAmount} : ModalDefaultContentProps
) {
    return (
        <div className={styles.contentWrapper}>
            <h2 className={styles.heading}>{title}</h2>

            {(subtitle !== undefined) &&
                <h3 className={styles.subheading}>{subtitle}</h3>
            }
        
            <div className={styles.inputSection}>
                <div className={styles.stretchWidth}>
                    <p>Amount</p>

                    <div className={styles.amountButtons}>
                        <button className={`glass-button ghost ${styles.balanceButton}`} onClick={setHalfAmount}>
                            Half
                        </button>
                        <button className={`glass-button ghost ${styles.balanceButton}`} onClick={setMaxAmount}>
                            Max
                        </button>
                    </div>
                </div>

                <div className={styles.inputFieldWrapper}>
                    <input 
                        className={styles.inputField}
                        type="text" 
                        placeholder={"0.0 " + denomination} 
                        value={amountStr} 
                        onChange={(e) => 
                            setAmountStr(e.target.value.replace(/[^0-9.]/g, '').replace(/(\..*?)\..*/g, '$1'))
                        }
                    />
                </div>
            </div>
        </div>
    )
}