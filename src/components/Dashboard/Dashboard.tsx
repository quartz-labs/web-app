import styles from "./Dashboard.module.css";
import { useStore } from "@/src/utils/store";
import Balances from "./Balances/Balances";
import Health from "./RepayWarning/RepayWarning";
import ButtonRow from "./ButtonRow/ButtonRow";
import Assets from "./Assets/Assets";
import Modal from "../Modal/Modal";
import CardDetails from "./Card/CardDetails";

export default function Dashboard() {
  const { isInitialized } = useStore();

  return (
    <>
      <Modal />

      <div className={`glass panel ${styles.mainPanel}`}>
        <div className={styles.mainPanelContent}>
          <h1 className={styles.title}>Available Credit</h1>
          <Balances />
        
          {isInitialized && (
            <>
              <Health />
              <ButtonRow />
              <Assets />
            </>
          )}

          {!isInitialized && (
            <p className={styles.notInitialized}>No wallet connected</p>
          )}
        </div>
      </div>

      <div className={`glass panel ${styles.assetsPanel}`}>
        <div className={styles.assetsPanelContent}>
          {isInitialized && (
            <CardDetails />
          )}
        </div>
      </div>
    </>
  );
}
