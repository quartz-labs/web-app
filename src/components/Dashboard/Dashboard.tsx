import styles from "./Dashboard.module.css";
import { useStore } from "@/src/utils/store";
import Balances from "./Balances/Balances";
import RepayWarning from "./RepayWarning/RepayWarning";
import ButtonRow from "./ButtonRow/ButtonRow";
import Assets from "./Assets/Assets";
import Modal from "../Modal/Modal";
import CardDetails from "./Card/CardDetails";
import TransactionHistory from "./Transaction/TransactionHistory";

export default function Dashboard() {
  const { isInitialized, txHistory } = useStore();

  return (
    <>
      <Modal />

      <div className={`glass panel ${styles.mainPanel}`}>
        <div className={styles.mainPanelContent}>
          <h1 className={styles.title}>Available Credit</h1>

          <Balances />

          {isInitialized && (
            <>
              <RepayWarning />
              <ButtonRow />
            </>
          )}

          {(!isInitialized) && (
            <p className={styles.notInitialized}>Connecting wallet...</p>
          )}

          <Assets />
        </div>
      </div>

      <div className={`glass panel ${styles.assetsPanel}`}>
        <div className={styles.assetsPanelContent}>
          {isInitialized && (
            <>
              <CardDetails />
              <TransactionHistory transactions={txHistory ?? []}/>
            </>
          )}
        </div>
      </div>
    </>
  );
}
