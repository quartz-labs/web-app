import Image from "next/image";
import styles from "./Nav.module.css";

export default function Nav() {
  return (
    <div className={styles["nav"]}>
      <a href="https://quartzpay.io/" className={styles.logo}>
        <Image 
            className={styles.logo}
            src="/logo.svg" 
            alt="Quartz" 
            fill
            style={{ objectFit: 'contain' }}
        />
      </a>
    </div>
  );
}