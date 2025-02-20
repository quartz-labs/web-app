import styles from "./Dashboard.module.css";
import { useStore } from "@/src/utils/store";
import Balances from "./Balances/Balances";
import Health from "./RepayWarning/RepayWarning";
import ButtonRow from "./ButtonRow/ButtonRow";
import Assets from "./Assets/Assets";
import Modal from "../Modal/Modal";
import CardDetails from "./Card/CardDetails";
import { formatDollarValue } from "@/src/utils/helpers";

export default function Dashboard() {
  const { isInitialized, spendLimitTransactionCents: spendLimitTransaction, spendLimitTimeframeCents: spendLimitTimeframe, timeframe } = useStore();

  const spendLimitTransactionDollars = spendLimitTransaction ? spendLimitTransaction / 100 : 0;
  const spendLimitTimeframeDollars = spendLimitTimeframe ? spendLimitTimeframe / 100 : 0;

  const slotsPerHour = Math.trunc(2.5 * 60 * 60);
  const timeframeInHours = timeframe ? timeframe / slotsPerHour : 0;

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
              <div>
                <h2>Spend Limit</h2>
                <p>Transaction Limit: {formatDollarValue(spendLimitTransactionDollars, 2)}</p>
                <p>Timeframe Limit: {formatDollarValue(spendLimitTimeframeDollars, 2)}</p>
                <p>Timeframe (hours): {timeframeInHours}</p>
              </div>
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

          <h2 className={styles.title}>Assets</h2>
          <Assets />
        </div>
      </div>
    </>
  );
}
