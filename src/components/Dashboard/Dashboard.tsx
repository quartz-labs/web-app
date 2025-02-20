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

  // const spendLimitTransactionDollars = spendLimitTransactionCents ? spendLimitTransactionCents / 100 : 0;
  // const spendLimitTimeframeDollars = spendLimitTimeframeCents ? spendLimitTimeframeCents / 100 : 0;

  // const slotsPerHour = Math.trunc(2.5 * 60 * 60);
  // const timeframeInHours = timeframe ? Math.trunc(timeframe / slotsPerHour) : 0;

  
  // <div>
  //   <h2>Spend Limit</h2>
  //   <p>Transaction Limit: ${formatDollarValue(spendLimitTransactionDollars, 2)[0]}</p>
  //   <p>Timeframe Limit: ${formatDollarValue(spendLimitTimeframeDollars, 2)[0]}</p>
  //   <p>Timeframe (hours): {timeframeInHours}</p>
  // </div>

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
