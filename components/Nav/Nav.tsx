import Image from "next/image";
import styles from "./Nav.module.css";

export default function Nav() {
  return (
    <div className={styles["nav"]}>
      <a href="https://quartzpay.io/" className={styles.logoContainer}>
        <Image 
            className={styles.logo}
            src="/logo.svg" 
            alt="Quartz" 
            priority
            // Initial size values below are changed by css class
            width={115}
            height={45} 
        />
      </a>

      <div className={styles.navItems}>
        <a href="/">Notifications</a>
        <a href="/">Wallet</a>
      </div>
    </div>
  );
}