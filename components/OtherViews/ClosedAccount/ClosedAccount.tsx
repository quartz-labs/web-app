import styles from "../OtherViews.module.css";

export default function ClosedAccount() {
  return (
    <div className={"glass panel center-content"}>
      <div className={"central-container"}>
        <h1 className={styles.title}>This account has been closed</h1>
        <p>Please use another wallet to open a new account.</p>
      </div>
    </div>
  );
}
