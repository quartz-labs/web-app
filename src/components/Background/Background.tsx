import Image from "next/image";
import styles from "./Background.module.css";

export default function Background() {
  return (
    <div className={styles.background}>
      <Image 
        src="/gem-left.webp" 
        alt="" 
        priority 
        className={`${styles.gem} ${styles.imageLeft}`} 
        // Initial size values below are changed by css class
        width={100}
        height={100}
      />
      <Image 
        src="/gemRight.png" 
        alt="" 
        priority 
        className={`${styles.gem} ${styles.imageRight}`} 
        // Initial size values below are changed by css class
        width={100}
        height={100}
      />
    </div>
  );
}