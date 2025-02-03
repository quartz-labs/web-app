import styles from "./OtherViews.module.css";

export default function NoBetaKey() {
  return (
    <div className={"glass panel center-content"}>
      <div className={"central-container"}>
        <h1 className={styles.titleError}>No Quartz Pin beta key found in wallet</h1>
        <p>The private beta is currently only available to select members from our <a href="https://discord.gg/K3byNmnKNm" target="_blank" rel="noopener noreferrer" className={"no-wrap"}>Discord community</a>.</p>
        <p>If you&apos;ve been given beta access, please ensure you&apos;re using the wallet where you received the beta key NFT.</p>
      </div>
    </div>
  );
}
