import styles from "./Dashboard.module.css";
import { useStore } from "@/utils/store";
import Balances from "./Balances/Balances";
import Health from "./Health/Health";

export default function Dashboard() {
  const { isInitialized } = useStore(); // TODO: Add not initialized view

  return (
    <>
      <div className={`glass panel ${styles.mainPanel}`}>
        <h1 className={styles.title}>Balance</h1>
        <Balances />
        <Health />
      </div>

      <div className={`glass panel ${styles.assetsPanel}`}>
        <h2 className={styles.title}>Assets</h2>
      </div>
    </>
  );
}
