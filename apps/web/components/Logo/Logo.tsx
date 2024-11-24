import Image from "next/image";
import styles from "./Logo.module.css";

export default function Logo() {
  return (
    <a href="https://quartzpay.io/" className={styles.logoContainer}>
      <Image className={styles.logo} src="/logo.svg" alt="Quartz" fill style={{ objectFit: "contain" }} />
    </a>
  );
}
