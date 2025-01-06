import config from "@/src/config/config";
import styles from "./OtherViews.module.css";

export default function Unavailable() {
  return (
    <div className={"glass panel center-content"}>
      <div className={styles.unavailableContainer}>
        <h1 className={styles.title}>We&apos;re currently deploying a program upgrade</h1>
        {config.NEXT_PUBLIC_UNAVAILABLE_TIME && (
          <p>The web app will be available again at {config.NEXT_PUBLIC_UNAVAILABLE_TIME} UTC.</p>
        )}
        {!config.NEXT_PUBLIC_UNAVAILABLE_TIME && (
          <p>The web app will be available again soon.</p>
        )}
      </div>
    </div>
  );
}
