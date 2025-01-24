import styles from "./Dashboard.module.css";
import { useStore } from "@/src/utils/store";
import Balances from "./Balances/Balances";
import Health from "./Health/Health";
import ButtonRow from "./ButtonRow/ButtonRow";
import Assets from "./Assets/Assets";
import Modal from "../Modal/Modal";
import Card from "./Card/Card";

export default function Dashboard() {
  const { isInitialized } = useStore();

  return (
    <>
      <Modal />

      <div className={`glass panel ${styles.mainPanel}`}>
        <div className={styles.mainPanelContent}>
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
      </div>

      <div className={`glass panel ${styles.assetsPanel}`}>
        <div className={styles.assetsPanelContent}>
          <h2 className={styles.title}>Card</h2>
          <Card />
          <h2 className={styles.title}>Assets</h2>
          <Assets />
        </div>
      </div>
    </>
  );
}
