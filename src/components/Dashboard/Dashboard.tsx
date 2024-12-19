import styles from "./Dashboard.module.css";
import { useStore } from "@/src/utils/store";
import Balances from "./Balances/Balances";
import Health from "./Health/Health";
import ButtonRow from "./ButtonRow/ButtonRow";
import Assets from "./Assets/Assets";

export default function Dashboard() {
  const { isInitialized } = useStore();

  return (
    <>
      <div className={`glass panel ${styles.mainPanel}`}>
        <h1 className={styles.title}>Balance</h1>
        <Balances />

        {isInitialized && (
          <>
            <Health />
            <ButtonRow />
          </>
        )}

        {!isInitialized && (
          <p className={styles.notInitialized}>No wallet connected</p>
        )}
      </div>

      <div className={`glass panel ${styles.assetsPanel}`}>
        <h2 className={styles.title}>Assets</h2>
        <Assets />
      </div>
    </>
  );
}
